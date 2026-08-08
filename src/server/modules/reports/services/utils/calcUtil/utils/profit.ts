import { ISku } from "../../../../../../database/interfaces/repots/index.interface.js";

export function calcProfit (sku: ISku, propPostfix = "") { 
  var sellerPayoutAmountKey = 'sellerPayoutAmount' + propPostfix
  var finesKey = 'fines' + propPostfix
  var acceptanceKey = 'acceptance' + propPostfix
  var storageCostKey = 'storageCost' + propPostfix
  var deliveryCostKey = 'deliveryCost' + propPostfix
  var additionalPaymentKey = 'additionalPayment' + propPostfix
  var averageAdvertisingCostKey = 'averageAdvertisingCost' + propPostfix

  var sellerPayoutAmount = sku[sellerPayoutAmountKey as keyof ISku] as number
  var fines = sku[finesKey as keyof ISku] as number
  var acceptance = sku[acceptanceKey as keyof ISku] as number
  var storageCost = sku[storageCostKey as keyof ISku] as number
  var deliveryCost = sku[deliveryCostKey as keyof ISku] as number
  var additionalPayment = sku[additionalPaymentKey as keyof ISku] as number
  var averageAdvertisingCost = sku[averageAdvertisingCostKey as keyof ISku] as number


  var profit: number = sellerPayoutAmount - fines - acceptance - storageCost - deliveryCost - additionalPayment - averageAdvertisingCost
  return profit
}
