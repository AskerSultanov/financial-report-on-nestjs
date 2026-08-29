import { IAdvertisingReportItem } from '../WBAPI/interfaces/getReports.interface.js';

export function getAdvertisingReportByYear(
  advertisingReport: IAdvertisingReportItem[],
  requiredYear: number,
  isCrossYearPeriod: boolean,
): { advertisingReportByYear: IAdvertisingReportItem[] } {
  var advertisingReportByYear: IAdvertisingReportItem[] = [];

  if (!advertisingReport.length) {
    return { advertisingReportByYear };
  }

  if (!isCrossYearPeriod) {
    return { advertisingReportByYear: advertisingReport };
  }

  var requiredYearAsStr: string = requiredYear + '';

  for (var item of advertisingReport) {
    var year: string = item.updTime.split('-')[0];

    if (year === requiredYearAsStr) {
      advertisingReportByYear.push(item);
    }
  }

  return { advertisingReportByYear };
}
