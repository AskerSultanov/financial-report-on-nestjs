import { truncateNum } from '../reportParsing/truncateNum.js';

var startYearPropPostfix = 'InCurrentYear';
var endYearPropPostfix = 'InNextYear';

import * as IGoods from '../../../../../database/interfaces/goods.interface.js';
import {
  IReport,
  ISku,
} from '../../../../../database/interfaces/reports/index.interface.js';

var aggregateSkuMetrics = (
  skuMetric: IGoods.ISkuMetrics,
  sku: ISku,
  postfix: string = '',
): IGoods.ISkuMetrics => {
  var qtyKey = 'qty' + postfix;
  var qty: number = sku[qtyKey as keyof ISku] as number;
  skuMetric.qty += qty;

  var taxKey = 'tax' + postfix;
  var tax: number = sku[taxKey as keyof ISku] as number;
  skuMetric.tax += tax;

  var finesKey = 'fines' + postfix;
  var fines: number = sku[finesKey as keyof ISku] as number;
  skuMetric.fines += fines;

  var taxableAmountKey = 'taxableAmount' + postfix;
  var taxableAmount: number = sku[taxableAmountKey as keyof ISku] as number;
  skuMetric.taxableAmount += taxableAmount;

  var retailAmountKey = 'retailAmount' + postfix;
  var retailAmount: number = sku[retailAmountKey as keyof ISku] as number;
  skuMetric.retailAmount += retailAmount;

  var returnAmountKey = 'returnAmount' + postfix;
  var returnAmount: number = sku[returnAmountKey as keyof ISku] as number;
  skuMetric.returnAmount += returnAmount;

  var storageCostKey = 'storageCost' + postfix;
  var storageCost: number = sku[storageCostKey as keyof ISku] as number;
  skuMetric.storageCost += storageCost;

  var deliveryCostKey = 'deliveryCost' + postfix;
  var deliveryCost: number = sku[deliveryCostKey as keyof ISku] as number;
  skuMetric.deliveryCost += deliveryCost;

  var acceptanceKey = 'acceptance' + postfix;
  var acceptance: number = sku[acceptanceKey as keyof ISku] as number;
  skuMetric.acceptance += acceptance;

  var sellerPayoutAmountKey = 'sellerPayoutAmount' + postfix;
  var sellerPayoutAmount: number = sku[
    sellerPayoutAmountKey as keyof ISku
  ] as number;
  skuMetric.sellerPayoutAmount += sellerPayoutAmount;

  var deductionOrPaymentKey = 'deductionOrPayment' + postfix;
  var deductionOrPayment: number = sku[
    deductionOrPaymentKey as keyof ISku
  ] as number;
  skuMetric.deductionOrPayment += deductionOrPayment;

  var additionalInsuranceFeeKey = 'additionalInsuranceFee' + postfix;
  var additionalInsuranceFee: number = sku[
    additionalInsuranceFeeKey as keyof ISku
  ] as number;
  skuMetric.additionalInsuranceFee += additionalInsuranceFee;

  for (var key in skuMetric) {
    var value: number = skuMetric[key as keyof IGoods.ISkuMetrics] as number;
    skuMetric = Object.assign(skuMetric, {
      [key]: truncateNum(value),
    });
  }

  return skuMetric;
};

export var updateListGoodsMetrics = (
  report: IReport,
  listGoods: IGoods.ISku[],
): { listGoodsWithUpdatedSkuMetrics: IGoods.ISku[] } => {
  if (!report.skus.length || !listGoods.length) {
    return { listGoodsWithUpdatedSkuMetrics: [] };
  }

  if (report.isCrossYearPeriod) {
    var startYear: number = +report.dateFrom.split('-')[0];
    var endYear: number = +report.dateTo.split('-')[0];
  }

  var year: number = report.recordedTo.year;

  for (var sku of report.skus) {
    var skuFromListGoods: IGoods.ISku | undefined = listGoods.find(
      (i) => i.id === sku.id && i.skuName === sku.skuName,
    );

    if (skuFromListGoods) {
      if (report.isCrossYearPeriod) {
        var startYearMetric: IGoods.ISkuMetrics | undefined =
          skuFromListGoods?.metrics.find((i) => i.year === startYear);

        if (startYearMetric) {
          startYearMetric = aggregateSkuMetrics(
            startYearMetric,
            sku,
            startYearPropPostfix,
          );
        }
        var endYearMetric: IGoods.ISkuMetrics | undefined =
          skuFromListGoods?.metrics.find((i) => i.year === endYear);

        if (endYearMetric) {
          endYearMetric = aggregateSkuMetrics(
            endYearMetric,
            sku,
            endYearPropPostfix,
          );
        }
      } else {
        var skuMetric = skuFromListGoods?.metrics.find((i) => i.year === year);

        if (skuMetric) {
          skuMetric = aggregateSkuMetrics(skuMetric, sku);
        }
      }
    }
  }

  return { listGoodsWithUpdatedSkuMetrics: listGoods };
};
