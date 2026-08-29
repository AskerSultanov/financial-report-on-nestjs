import ExcelJs from 'exceljs';
import { getReportPeriod } from './getReportPeriod.js';
import { generateColumnNames } from './generateColumnNames.js';
import { checkAndFixMonday, checkAndFixSunday } from './checkDate.js';
import { requiredColumnsNameCountIsValid } from './requiredColumnsNameCountIsValid.js';
import { getReportPeriodFromPaidStorageReportFile } from './getReportPeriodFromPaidStorageReportFile.js';
import {
  getRequiredColumnsNameFromPaidStorageReportFile,
  IRawRequiredColumnsNameToPaidStorageReport,
} from './getRequiredColumnsNameFromPaidStorageReportFile.js';
import {
  getRequiredColumnsNameFromWeeklyFinanfialReportFile,
  IRawRequiredColumnsNameToWeeklyFinancialReport,
} from './getRequiredColumnsNameFromWeeklyFinanfialReportFile.js';

var requiredColumnsCountToPaidStorageReport: number = 4;
var requiredColumnsCountToWeeklyFinancialReport: number = 15;

var requiredWeeklyFinancialReportFileWorkSheetName: string = 'Sheet1';
var requiredPaidStorageReportFileWorkSheetName: string = 'Детальная информация';

import { IWeeklyFinancialReportsBuffer } from './extractReportsFileBufferFromZip.js';

export interface IWeeklyFinancialReports {
  dateFrom: string;
  dateTo: string;
  reportId: number;
  workSheet: any;
  workSheetData: {
    columnsNames: string[];
    requiredColumnsName: IRawRequiredColumnsNameToWeeklyFinancialReport;
  };
}

export interface IOnePeriodReports {
  weeklyFinancialReports?: IWeeklyFinancialReports[];
  paidStorageReports?: IPaidStorageReports[];
}

export interface IPaidStorageReports {
  dateFrom: string;
  dateTo: string;
  workSheet: any;
  workSheetData: {
    requiredColumnsName: IRawRequiredColumnsNameToPaidStorageReport;
  };
}

export interface IWorkSheets {
  dateFrom: string;
  dateTo: string;
  onePeriodReports?: IOnePeriodReports;
}

export var extractWorkSheetFromFile = async (
  weeklyFinancialReportsBuffer: IWeeklyFinancialReportsBuffer[],
  paidStorageReportsBuffer: Buffer[],
): Promise<{ workSheets: IWorkSheets[] }> => {
  var workSheets: IWorkSheets[] = [];

  for (var { reportId, buffer } of weeklyFinancialReportsBuffer) {
    var wb = new ExcelJs.Workbook();
    await wb.xlsx.load(new Uint8Array(buffer).buffer);
    var workSheet: any = wb.getWorksheet(
      requiredWeeklyFinancialReportFileWorkSheetName,
    );

    if (!workSheet?.actualColumnCount) {
      continue;
    }

    var { columnsNames } = generateColumnNames(workSheet.actualColumnCount);
    var { requiredColumnsName } =
      getRequiredColumnsNameFromWeeklyFinanfialReportFile(
        workSheet,
        columnsNames,
      );

    if (
      requiredColumnsNameCountIsValid(
        requiredColumnsName,
        requiredColumnsCountToWeeklyFinancialReport,
      )
    ) {
      var { dateFrom, dateTo } = getReportPeriod(workSheet);
      var { dateFrom } = checkAndFixMonday(dateFrom);
      var { dateTo } = checkAndFixSunday(dateTo);

      var existReportPeriod = workSheets.find(
        (item) => item?.dateFrom >= dateFrom && item?.dateTo >= dateTo,
      );

      if (existReportPeriod) {
        var equalReportIsExist =
          existReportPeriod?.onePeriodReports?.weeklyFinancialReports?.find(
            (item) => item?.reportId === reportId,
          );

        if (!equalReportIsExist) {
          existReportPeriod?.onePeriodReports?.weeklyFinancialReports?.push({
            dateFrom,
            dateTo,
            reportId,
            workSheet,
            workSheetData: { columnsNames, requiredColumnsName },
          });
        }
      } else {
        workSheets.push({
          dateFrom,
          dateTo,
          onePeriodReports: {
            weeklyFinancialReports: [
              {
                dateFrom,
                dateTo,
                reportId,
                workSheet,
                workSheetData: { columnsNames, requiredColumnsName },
              },
            ],
          },
        });
      }
    }
  }

  if (weeklyFinancialReportsBuffer.length) {
    for (var buffer of paidStorageReportsBuffer) {
      var wb = new ExcelJs.Workbook();
      await wb.xlsx.load(new Uint8Array(buffer).buffer);
      var workSheet: any = wb.getWorksheet(
        requiredPaidStorageReportFileWorkSheetName,
      );

      if (!workSheet?.actualColumnCount) {
        continue;
      }

      var { columnsNames } = generateColumnNames(workSheet.actualColumnCount);
      let { requiredColumnsName } =
        getRequiredColumnsNameFromPaidStorageReportFile(
          workSheet,
          columnsNames,
        );

      if (
        requiredColumnsNameCountIsValid(
          requiredColumnsName,
          requiredColumnsCountToPaidStorageReport,
        )
      ) {
        var { dateFrom, dateTo } = getReportPeriodFromPaidStorageReportFile(
          workSheet,
          requiredColumnsName,
        );
        var { dateFrom } = checkAndFixMonday(dateFrom);
        var { dateTo } = checkAndFixSunday(dateTo);

        var existReportPeriod = workSheets.find(
          (item) => item?.dateFrom >= dateFrom && item?.dateTo >= dateTo,
        );

        if (existReportPeriod) {
          if (!existReportPeriod?.onePeriodReports?.paidStorageReports) {
            var paidStorageReports = [
              {
                dateFrom,
                dateTo,
                workSheet,
                workSheetData: { requiredColumnsName },
              },
            ];

            var onePeriodReports = { paidStorageReports };
            existReportPeriod.onePeriodReports = onePeriodReports;
          } else {
            var hasPaidStorageReportForPeriod =
              existReportPeriod.onePeriodReports.paidStorageReports.find(
                (paidStorageReport) =>
                  paidStorageReport.dateFrom === dateFrom &&
                  paidStorageReport.dateTo === dateTo,
              );

            if (!hasPaidStorageReportForPeriod) {
              existReportPeriod.onePeriodReports.paidStorageReports.push({
                dateFrom,
                dateTo,
                workSheet,
                workSheetData: { requiredColumnsName },
              });
            }
          }
        }
      }
    }
  }

  return { workSheets };
};
