import { IWeeklyFinancialReportItem } from '../WBAPI/interfaces/getReports.interface.js';

export function getSkuByYear(
  skuFilteredReport: IWeeklyFinancialReportItem[],
  requiredYear: number,
): { skuByYear: IWeeklyFinancialReportItem[] } {
  var skuByYear: IWeeklyFinancialReportItem[] = [];

  if (!skuFilteredReport.length) {
    return { skuByYear };
  }

  var requiredYearAsStr: string = requiredYear + '';

  for (var sku of skuFilteredReport) {
    var saleYear: string = sku.saleDt.split('-')[0];

    if (saleYear === requiredYearAsStr) {
      skuByYear.push(sku);
    }
  }

  return { skuByYear };
}
