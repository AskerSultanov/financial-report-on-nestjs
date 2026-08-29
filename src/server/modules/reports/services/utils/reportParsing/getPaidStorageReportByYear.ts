import { IPaidStorageReportItem } from '../WBAPI/interfaces/getReports.interface.js';

export function getPaidStorageReportByYear(
  storageReport: IPaidStorageReportItem[],
  requiredYear: number,
  isCrossYearPeriod: boolean,
):  { storageReportByYear: IPaidStorageReportItem[]} {
  var storageReportByYear: IPaidStorageReportItem[] = [];

  if (!storageReport.length) {
    return { storageReportByYear };
  }

  if (!isCrossYearPeriod) {
    return { storageReportByYear: storageReport };
  }

  var requiredYearAsStr: string = requiredYear + '';

  for (var item of storageReport) {
    if (item.date) {
      var year: string = item.date.split('-')[0];

      if (year === requiredYearAsStr) {
        storageReportByYear.push(item);
      }
    }
  }

  return { storageReportByYear };
}
