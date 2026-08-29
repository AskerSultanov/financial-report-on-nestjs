import { truncateNum } from '../../reportParsing/truncateNum.js';
import { IWeeklyFinancialReportItem } from '../../WBAPI/interfaces/getReports.interface.js';

export function calcSellerPayoutAmount(
  report: IWeeklyFinancialReportItem[],
): number {
  var sales: IWeeklyFinancialReportItem[] = report.filter(
    (i) => i.docTypeName === 'Продажа',
  );

  var sellerPayoutAmountOfSales: number = sales.reduce(
    (acc, i) => acc + +i.forPay,
    0,
  );

  var returns: IWeeklyFinancialReportItem[] = report.filter(
    (i) => i.docTypeName === 'Возврат',
  );

  var sellerPayoutAmountOfReturns: number = returns.reduce(
    (acc, i) => acc + +i.forPay,
    0,
  );
  var sellerPayoutAmount: number = (sellerPayoutAmountOfSales =
    sellerPayoutAmountOfReturns);

  return truncateNum(sellerPayoutAmount);
}
