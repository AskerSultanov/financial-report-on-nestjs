import { IRawRequiredColumnsNameToPaidStorageReport } from './getRequiredColumnsNameFromPaidStorageReportFile.js';

var firstRowNum: number = 3;

export var getReportPeriodFromPaidStorageReportFile = (
  workSheet: any,
  requiredColumnsName: IRawRequiredColumnsNameToPaidStorageReport,
): { dateFrom: string; dateTo: string } => {
  var lastRowNum: number = workSheet.actualRowCount;

  var dateFromCellAddress: string =
    requiredColumnsName.dateColumn! + firstRowNum;
  var dateToCellAddress: string = requiredColumnsName.dateColumn! + lastRowNum;

  var dateFrom: string = workSheet.getCell(dateFromCellAddress).value;
  var dateTo: string = workSheet.getCell(dateToCellAddress).value;

  return { dateFrom, dateTo };
};
