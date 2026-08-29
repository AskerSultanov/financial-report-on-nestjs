import { truncateNum } from '../../reportParsing/truncateNum.js';
import { IWeeklyFinancialReportItem } from '../../WBAPI/interfaces/getReports.interface.js';

export function calcRetailAmount(report: IWeeklyFinancialReportItem[]): number {
  var sales: IWeeklyFinancialReportItem[] = report.filter(
    (item) => item.docTypeName === 'Продажа',
  );
  var retailAmountOfSales: number = sales.reduce(
    (acc, item) => acc + +item.retailAmount,
    0,
  );

  var returns: IWeeklyFinancialReportItem[] = report.filter(
    (item) => item.docTypeName === 'Возврат',
  );
  var retailAmountOfReturns: number = returns.reduce(
    (acc, item) => acc + +item.retailAmount,
    0,
  );

  var retailAmount: number = retailAmountOfSales - retailAmountOfReturns;

  return truncateNum(retailAmount);
}
