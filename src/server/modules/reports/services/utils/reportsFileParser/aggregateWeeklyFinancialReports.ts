import { aggregateSkuData } from './aggregateSkuData.js';
import { getSkuNamesAndIds } from './getSkuNamesAndIds.js';
import { calculateTotalStorageCost } from './calculateTotalStorageCost.js';
import { calculateAvrgStorageCostForEachReportItem } from './calculateAvrgStorageCostForEachReportItem.js';

import {
  IPaidStorageReports,
  IWeeklyFinancialReports,
} from './extractWorkSheetFromFile.js';
import {
  IWeeklyFinancialReportItem,
  IPaidStorageReportItem,
} from '../WBAPI/interfaces/getReports.interface.js';

export var aggregateWeeklyFinancialReports = (
  weeklyFinancialReports: IWeeklyFinancialReports[],
  paidStorageReport: IPaidStorageReportItem[],
): {
  weeklyFinancialReport: IWeeklyFinancialReportItem[];
  paidStorageReport: IPaidStorageReportItem[];
} => {
  var weeklyFinancialReport: IWeeklyFinancialReportItem[] = [];
  var paidStorageReportFromAvrgData: IPaidStorageReportItem[] = [];

  if (!weeklyFinancialReports || !weeklyFinancialReports.length) {
    return { weeklyFinancialReport, paidStorageReport };
  }

  for (var {
    dateFrom,
    dateTo,
    reportId,
    workSheet,
    workSheetData,
  } of weeklyFinancialReports) {
    var { columnsNames, requiredColumnsName } = workSheetData;

    var { skuNamesAndIds } = getSkuNamesAndIds(workSheet, columnsNames);

    if (!paidStorageReport.length) {
      var { totalStorageCost } = calculateTotalStorageCost(
        workSheet,
        requiredColumnsName.storageCostColumn!,
      );
      var { avrgStorageCostForEachItem } =
        calculateAvrgStorageCostForEachReportItem(
          totalStorageCost,
          skuNamesAndIds,
        );

      var { skus, avrgStorageDataForEachSku } = aggregateSkuData(
        workSheet,
        skuNamesAndIds,
        reportId,
        requiredColumnsName,
        dateFrom,
        dateTo,
        avrgStorageCostForEachItem,
      );

      paidStorageReportFromAvrgData.push(...avrgStorageDataForEachSku);
      weeklyFinancialReport.push(...skus);
    } else {
      var { skus } = aggregateSkuData(
        workSheet,
        skuNamesAndIds,
        reportId,
        requiredColumnsName,
        dateFrom,
        dateTo,
      );
      weeklyFinancialReport.push(...skus);
    }
  }

  if (!paidStorageReport.length) {
    return {
      weeklyFinancialReport,
      paidStorageReport: paidStorageReportFromAvrgData,
    };
  }

  return { weeklyFinancialReport, paidStorageReport };
};
