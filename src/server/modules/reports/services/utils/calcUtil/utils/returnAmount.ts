import {IWeeklyFinancialReportItem} from '../../WBAPI/interfaces/getReports.interface.js'


export function calcReturnAmount  (report: IWeeklyFinancialReportItem[]): number {
  var returnAmount = report.filter((item) => item.docTypeName === "Возврат").length;

  return returnAmount;
};

