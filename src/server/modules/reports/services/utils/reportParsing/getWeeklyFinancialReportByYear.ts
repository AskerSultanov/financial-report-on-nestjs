import { IWeeklyFinancialReportItem } from '../WBAPI/interfaces/getReports.interface.js';

export function getWeeklyFinancialReportByYear(
  report: IWeeklyFinancialReportItem[],
  requiredYear: number,
  isCrossYearPeriod: boolean,
): { weeklyFinancialReportByYear: IWeeklyFinancialReportItem[] } {
  var weeklyFinancialReportByYear: IWeeklyFinancialReportItem[] = [];

  if (!report.length) {
    return { weeklyFinancialReportByYear };
  }

  if (!isCrossYearPeriod) {
    return { weeklyFinancialReportByYear: report };
  }

  var requiredYearAsStr: string = requiredYear + '';

  for (var item of report) {
    var saleYear: string = item.saleDt.split('-')[0];

    if (saleYear === requiredYearAsStr) {
      weeklyFinancialReportByYear.push(item);
    }
  }

  return { weeklyFinancialReportByYear };
}
