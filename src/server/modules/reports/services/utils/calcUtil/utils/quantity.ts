import { IWeeklyFinancialReportItem } from '../../WBAPI/interfaces/getReports.interface.js';

export function calcQuantity(report: IWeeklyFinancialReportItem[]): number {
  var reportFilteredByDocTypeName: IWeeklyFinancialReportItem[] = report.filter(
    (item) => item.docTypeName === 'Продажа',
  );

  var qty: number = reportFilteredByDocTypeName.reduce(
    (acc, item) => acc + +item.quantity,
    0,
  );

  return qty;
}
