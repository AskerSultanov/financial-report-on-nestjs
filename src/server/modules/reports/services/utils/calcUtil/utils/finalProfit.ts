import truncateNum from "../../reportParsing/truncateNum.js";
import { ISku } from "../../../../../../database/interfaces/repots/index.interface.js";

export function calcFinalProfit (sku: ISku, propPostfix: string = "") {
  var preTaxProfitKey = 'preTaxProfit' + propPostfix;
  var taxKey = 'tax' + propPostfix
  var insuranceFeeKey = 'insuranceFee' + propPostfix
  var additionalInsuranceFeeKey = 'additionalInsuranceFee' + propPostfix

  var preTaxProfit = sku[preTaxProfitKey as keyof ISku] as number
  var tax = sku[taxKey as keyof ISku] as number
  var insuranceFee = sku[insuranceFeeKey as keyof ISku] as number
  var additionalInsuranceFee = sku[additionalInsuranceFeeKey as keyof ISku] as number

  var finalProfit: number = preTaxProfit - tax - insuranceFee - additionalInsuranceFee

  return truncateNum(finalProfit);
};
