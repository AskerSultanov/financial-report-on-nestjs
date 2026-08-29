import { truncateNum } from '../../reportParsing/truncateNum.js';
import { ISku } from '../../../../../../database/interfaces/reportSku.interface.js';
import { IWeeklyFinancialReportItem } from '../../WBAPI/interfaces/getReports.interface.js';

/**
 * @param {'truncate-on' | 'truncate-off'} truncate
 */

export function sum<Item extends ISku | IWeeklyFinancialReportItem>(
  data: Item[],
  filedName: keyof Item,
  truncate: string,
): number {
  var result: number = data.reduce((acc, item) => {
    var value: number = +item[filedName] || 0;
    var calculatedValue: number = acc + value;
    return calculatedValue;
  }, 0);

  if (truncate === 'truncate-on') {
    return truncateNum(result);
  }

  return result;
}
