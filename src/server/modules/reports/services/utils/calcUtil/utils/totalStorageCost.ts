import { truncateNum } from '../../reportParsing/truncateNum.js';
import { IWeeklyFinancialReportItem } from '../../WBAPI/interfaces/getReports.interface.js';

export function calcTotalStorageCost(
  report: IWeeklyFinancialReportItem[],
): number {
  var totalStorageCost: number = report.reduce(
    (acc, item) => acc + +item.paidStorage,
    0,
  );

  return truncateNum(totalStorageCost);
}
