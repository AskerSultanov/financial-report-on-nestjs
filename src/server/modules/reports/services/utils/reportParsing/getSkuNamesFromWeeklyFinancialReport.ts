import { IWeeklyFinancialReportItem } from '../WBAPI/interfaces/getReports.interface.js';

export function getSkuNamesFromWeeklyFinancialReport(
  report: IWeeklyFinancialReportItem[],
): { skuNamesFromWeeklyFinancialReport: string[] } {
  var skuNamesFromWeeklyFinancialReport: string[] = [];

  for (var sku of report) {
    if (!skuNamesFromWeeklyFinancialReport.includes(sku.vendorCode)) {
      skuNamesFromWeeklyFinancialReport.push(sku.vendorCode);
    }
  }

  return { skuNamesFromWeeklyFinancialReport };
}
