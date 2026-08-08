import truncateNum from "../../reportParsing/truncateNum.js";
import {IWeeklyFinancialReportItem} from '../../WBAPI/interfaces/getReports.interface.js'

export function calcRetailAmount  (report: IWeeklyFinancialReportItem[]): number {
   var sales =  report.filter((item) => item.docTypeName === "Продажа")
  var retailAmountOfSales = sales.reduce((acc, item) => acc + +item.retailAmount, 0) 

var returns =  report.filter((item) => item.docTypeName === "Возврат")
var retailAmountOfReturns = returns.reduce((acc, item) => acc + +item.retailAmount, 0);

  var retailAmount: number = retailAmountOfSales - retailAmountOfReturns 

  return truncateNum(retailAmount);
};

