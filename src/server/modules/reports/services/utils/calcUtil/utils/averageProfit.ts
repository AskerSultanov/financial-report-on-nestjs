import { ISku } from '../../../../../../database/interfaces/reportSku.interface.js';

export function calcAverageProfit(sku: ISku): number {
  if (sku.profit == 0 || sku.qty == 0) {
    return 0;
  }

  var averageProfit: number = sku.profit / sku.qty;

  return averageProfit;
}
