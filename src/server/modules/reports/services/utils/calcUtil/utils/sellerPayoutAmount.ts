import truncateNum from "../../reportParsing/truncateNum.js";
import {IWeeklyFinancialReportItem} from '../../WBAPI/interfaces/getReports.interface.js'

export function calcSellerPayoutAmount (report: IWeeklyFinancialReportItem[]): string{
 var sales = report.filter((i) => i.docTypeName === "Продажа")
 var sellerPayoutAmountOfSales = sales.reduce((acc, i) => acc + +i.forPay, 0) 
var returns =     report.filter((i) => i.docTypeName === "Возврат")
var sellerPayoutAmountOfReturns = returns.reduce((acc, i) => acc + +i.forPay, 0);  
    var sellerPayoutAmount = sellerPayoutAmountOfSales = sellerPayoutAmountOfReturns
   

  return truncateNum(sellerPayoutAmount);
};

