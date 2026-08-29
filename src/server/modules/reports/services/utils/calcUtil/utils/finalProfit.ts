import { truncateNum } from '../../reportParsing/truncateNum.js';
import { ISku } from '../../../../../../database/interfaces/reportSku.interface.js';

export function calcFinalProfit(sku: ISku): number {
  var finalProfit: number =
    sku.preTaxProfit - sku.tax - sku.insuranceFee - sku.additionalInsuranceFee;

  return truncateNum(finalProfit);
}
