var firstRowNum: number = 2;

export var getReportPeriod = (
  workSheet: any,
): { dateFrom: string; dateTo: string } => {
  var lastRowNum: number = workSheet.actualRowCount;

  var dateFromCellAddress: string = 'M' + firstRowNum;
  var dateToCellAddress: string = 'M' + lastRowNum;

  var dateFrom: string = workSheet.getCell(dateFromCellAddress).value;
  var dateTo: string = workSheet.getCell(dateToCellAddress).value;

  return { dateFrom, dateTo };
};
