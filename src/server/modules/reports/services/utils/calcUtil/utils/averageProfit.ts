import { ISku } from "../../../../../../database/interfaces/repots/index.interface.js";

export function calcAverageProfit (sku: ISku, propPostfix: string = ""): number  {
  var qtyKey: string = 'qty' + propPostfix
  var profitKey: string = "profit" + propPostfix

  var qty = sku[qtyKey  as keyof ISku] as number
  var profit = sku[profitKey as keyof ISku] as number

  if (profit == 0 || qty == 0) {
    return 0;
  }

  var averageProfit: number = profit / qty

  return averageProfit;
};

