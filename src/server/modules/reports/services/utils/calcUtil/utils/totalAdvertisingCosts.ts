import { IAdvertisingReportItem } from '../../WBAPI/interfaces/getReports.interface.js';

export function calculateTotalAdvertisingCosts(
  data: IAdvertisingReportItem[],
): number {
  var totalAdvertisingCosts: number = data.reduce(
    (acc, i) => acc + i.updSum,
    0,
  );
  return totalAdvertisingCosts;
}
