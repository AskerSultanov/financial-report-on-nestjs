import truncateNum from "../../reportParsing/truncateNum.js";
import { ISku } from "../../../../../../database/interfaces/repots/index.interface.js";

export function  calcPreTaxProfit  (sku: ISku, propPostfix: string = ""): number {
  var productCosts: number;
  var qtyKey: string = 'qty' + propPostfix
  var profitKey: string = "profit" + propPostfix
  var costPricekey: string = 'costPrice' + propPostfix
  var otherExpensesKey: string = 'otherExpenses' + propPostfix  

  var qty = sku[qtyKey  as keyof ISku] as number
  var profit = sku[profitKey as keyof ISku] as number
  var costPrice = sku[costPricekey as keyof ISku] as number
  var otherExpenses = sku[otherExpensesKey as keyof ISku] as number

  if (profit === 0 || qty === 0) {
    productCosts = 0;
  } else {
    productCosts = qty * costPrice;
  }

  var preTaxProfit = profit - otherExpenses- productCosts;
  return truncateNum(preTaxProfit);
};

