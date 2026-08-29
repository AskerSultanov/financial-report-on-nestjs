import { IWeeklyFinancialReportItem } from '../../WBAPI/interfaces/getReports.interface.js';

export function calcReturnAmount(report: IWeeklyFinancialReportItem[]): number {
  var returns: IWeeklyFinancialReportItem[] = report.filter(
    (item) => item.docTypeName === 'Возврат',
  );

  var returnAmount: number = returns.length;

  return returnAmount;
}
