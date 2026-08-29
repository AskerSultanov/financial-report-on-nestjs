import { truncateNum } from '../../reportParsing/truncateNum.js';

export function calcProfitMargin(
  finalProfit: number,
  retailAmount: number,
): number {
  var profitMargin: number = 0;

  if (finalProfit === 0 || retailAmount === 0) {
    return profitMargin;
  }

  profitMargin = (finalProfit * 100) / retailAmount;

  return truncateNum(profitMargin);
}
