var dateFromIndex: number = 6;

export var getReportPeriodFromPaidStorageReportFileName = (
  fileName: string,
): { paidStorageReportPeriod: string } => {
  var splitedFileName: string[] = fileName.split('');
  var dateFrom: string = splitedFileName[dateFromIndex];
  var dateTo: string = splitedFileName[splitedFileName.length - 1];
  return { paidStorageReportPeriod: dateFrom + '-' + dateTo };
};
