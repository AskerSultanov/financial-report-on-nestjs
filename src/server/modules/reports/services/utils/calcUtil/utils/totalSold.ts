import { IWeeklyFinancialReportItem } from '../../WBAPI/interfaces/getReports.interface.js';

export function calcTotalSold(report: IWeeklyFinancialReportItem[]): number {
  var sales: IWeeklyFinancialReportItem[] = report.filter(
    (sku) => sku.docTypeName === 'Продажа',
  );

  var totalSold: number = sales.reduce((acc, sku) => acc + +sku.quantity, 0);

  return totalSold;
}
