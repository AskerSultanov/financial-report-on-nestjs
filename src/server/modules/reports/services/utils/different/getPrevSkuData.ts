import { ISku } from '../../../../../database/interfaces/reports/index.interface.js';

export interface IPrevSkuData {
  qty?: number;
  costPrice?: number;
  profitMargin?: number;
  finalProfit?: number;
  preTaxProfit?: number;
  insuranceFee?: number;
  otherExpenses?: number;
  qtyInCurrentYear?: number;
  costPriceInCurrentYear?: number;
  finalProfitInCurrentYear?: number;
  preTaxProfitInCurrentYear?: number;
  insuranceFeeInCurrentYear?: number;
  profitMarginInCurrentYear?: number;
  otherExpensesInCurrentYear?: number;
  qtyInNextYear?: number;
  costPriceInNextYear?: number;
  finalProfitInNextYear?: number;
  preTaxProfitInNextYear?: number;
  otherExpensesInNextYear?: number;
  profitMarginInNextYear?: number;
  insuranceFeeInNextYear?: number;
}

export var getPrevSkuData = (sku: ISku): IPrevSkuData => {
  var prevSkuData: IPrevSkuData = {};

  prevSkuData.qty = sku.qty;
  prevSkuData.costPrice = sku.costPrice;
  prevSkuData.profitMargin = sku.profitMargin;
  prevSkuData.finalProfit = sku.finalProfit;
  prevSkuData.preTaxProfit = sku.preTaxProfit;
  prevSkuData.insuranceFee = sku.insuranceFee;
  prevSkuData.otherExpenses = sku.otherExpenses;

  prevSkuData.qtyInCurrentYear = sku.qtyInCurrentYear;
  prevSkuData.costPriceInCurrentYear = sku.costPriceInCurrentYear;
  prevSkuData.finalProfitInCurrentYear = sku.finalProfitInCurrentYear;
  prevSkuData.preTaxProfitInCurrentYear = sku.preTaxProfitInCurrentYear;
  prevSkuData.insuranceFeeInCurrentYear = sku.insuranceFeeInCurrentYear;
  prevSkuData.profitMarginInCurrentYear = sku.profitMarginInCurrentYear;
  prevSkuData.otherExpensesInCurrentYear = sku.otherExpensesInCurrentYear;

  prevSkuData.qtyInNextYear = sku.qtyInNextYear;
  prevSkuData.costPriceInNextYear = sku.costPriceInNextYear;
  prevSkuData.finalProfitInNextYear = sku.finalProfitInNextYear;
  prevSkuData.preTaxProfitInNextYear = sku.preTaxProfitInNextYear;
  prevSkuData.otherExpensesInNextYear = sku.otherExpensesInNextYear;
  prevSkuData.profitMarginInNextYear = sku.profitMarginInNextYear;
  prevSkuData.insuranceFeeInNextYear = sku.insuranceFeeInNextYear;

  return prevSkuData;
};
