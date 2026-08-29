import { truncateNum } from '../../reportParsing/truncateNum.js';

export function calcInsuranceFee(
  preTaxProfit: number,
  insuranceFeePercentage: number,
): number {
  if (insuranceFeePercentage <= 0 || preTaxProfit <= 0) {
    return 0;
  }

  var insuranceFee: number = (preTaxProfit * insuranceFeePercentage) / 100;

  return truncateNum(insuranceFee);
}
