import { truncateNum } from '../../reportParsing/truncateNum.js';
import { ISku } from '../../../../../../database/interfaces/reportSku.interface.js';

export function calcPreTaxProfit(sku: ISku): number {
  var productCosts: number;

  if (sku.profit === 0 || sku.qty === 0) {
    productCosts = 0;
  } else {
    productCosts = sku.qty * sku.costPrice;
  }

  var preTaxProfit: number = sku.profit - sku.otherExpenses - productCosts;
  return truncateNum(preTaxProfit);
}
