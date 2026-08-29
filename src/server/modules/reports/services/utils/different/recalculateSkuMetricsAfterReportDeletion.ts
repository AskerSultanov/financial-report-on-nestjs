import * as calcUtils from '../calcUtil/index.js';
import { truncateNum } from '../reportParsing/truncateNum.js';

var startYearPostfix = 'InCurrentYear';
var endYearPostfix = 'InNextYear';

import { ISkuForInit } from '../reportParsing/interfaces/sku.interface.js';
import * as IGoods from '../../../../../database/interfaces/goods.interface.js';
import { IReport } from '../../../../../database/interfaces/reports/index.interface.js';

export var recalculateMetrics = (
  skuMetric: IGoods.ISkuMetrics,
  sku: ISkuForInit,
  postfix: string = '',
): IGoods.ISkuMetrics => {
  var qtyKey: string = 'qty' + postfix;
  var qty: number = sku[qtyKey as keyof ISkuForInit] as number;
  skuMetric.qty -= qty;

  var taxKey: string = 'tax' + postfix;
  var tax: number = sku[taxKey as keyof ISkuForInit] as number;
  skuMetric.tax -= tax;

  var finesKey: string = 'fines' + postfix;
  var fines: number = sku[finesKey as keyof ISkuForInit] as number;
  skuMetric.fines -= fines;

  var netProfitKey: string = 'finalProfit' + postfix;
  var netProfit: number = sku[netProfitKey as keyof ISkuForInit] as number;
  skuMetric.netProfit -= netProfit;

  var retailAmountKey: string = 'retailAmount' + postfix;
  var retailAmount: number = sku[
    retailAmountKey as keyof ISkuForInit
  ] as number;
  skuMetric.retailAmount -= retailAmount;

  var insuranceFeeKey: string = 'insuranceFee' + postfix;
  var insuranceFee: number = sku[
    insuranceFeeKey as keyof ISkuForInit
  ] as number;
  skuMetric.insuranceFee -= insuranceFee;

  var returnAmountKey: string = 'returnAmount' + postfix;
  var returnAmount: number = sku[
    returnAmountKey as keyof ISkuForInit
  ] as number;
  skuMetric.returnAmount -= returnAmount;

  var storageCostKey: string = 'storageCost' + postfix;
  var storageCost: number = sku[storageCostKey as keyof ISkuForInit] as number;
  skuMetric.storageCost -= storageCost;

  var deliveryCostKey: string = 'deliveryCost' + postfix;
  var deliveryCost: number = sku[
    deliveryCostKey as keyof ISkuForInit
  ] as number;
  skuMetric.deliveryCost -= deliveryCost;

  var acceptanceKey: string = 'acceptance' + postfix;
  var acceptance: number = sku[acceptanceKey as keyof ISkuForInit] as number;
  skuMetric.acceptance -= acceptance;

  var taxableAmountKey: string = 'taxableAmount' + postfix;
  var taxableAmount: number = sku[
    taxableAmountKey as keyof ISkuForInit
  ] as number;
  skuMetric.taxableAmount -= taxableAmount;

  var sellerPayoutAmountKey: string = 'sellerPayoutAmount' + postfix;
  var sellerPayoutAmount: number = sku[
    sellerPayoutAmountKey as keyof ISkuForInit
  ] as number;
  skuMetric.sellerPayoutAmount -= sellerPayoutAmount;

  var deductionOrPaymentKey: string = 'deductionOrPayment' + postfix;
  var deductionOrPayment: number = sku[
    deductionOrPaymentKey as keyof ISkuForInit
  ] as number;
  skuMetric.deductionOrPayment -= deductionOrPayment;

  var additionalInsuranceFeeKey: string = 'additionalInsuranceFee' + postfix;
  var additionalInsuranceFee: number = sku[
    additionalInsuranceFeeKey as keyof ISkuForInit
  ] as number;
  skuMetric.additionalInsuranceFee -= additionalInsuranceFee;

  for (var key in skuMetric) {
    var value: number = skuMetric[key as keyof IGoods.ISkuMetrics] as number;

    skuMetric = Object.assign(skuMetric, {
      [key]: truncateNum(value),
    });
  }

  skuMetric.profitMargin = calcUtils.calcProfitMargin(
    skuMetric.netProfit,
    skuMetric.retailAmount,
  );

  return skuMetric;
};

export var recalculateSkuMetricsAfterReportDeletion = (
  startYear: number,
  endYear: number,
  listGoods: IGoods.ISku[],
  report: IReport,
): { listGoodsWithRecalculatedSkuMetrics: IGoods.ISku[] } => {
  for (var sku of report.skus) {
    var skuFromListGoods: IGoods.ISku | undefined = listGoods.find(
      (i) => i.id === sku.id && i.skuName === sku.skuName,
    );

    if (skuFromListGoods) {
      if (report.isCrossYearPeriod) {
        var startYearMetric: IGoods.ISkuMetrics | undefined =
          skuFromListGoods?.metrics.find((i) => i.year === startYear);

        var endYearMetric: IGoods.ISkuMetrics | undefined =
          skuFromListGoods?.metrics.find((i) => i.year === endYear);

        if (startYearMetric) {
          startYearMetric = recalculateMetrics(
            startYearMetric,
            sku,
            startYearPostfix,
          );
        }

        if (endYearMetric) {
          endYearMetric = recalculateMetrics(
            endYearMetric,
            sku,
            endYearPostfix,
          );
        }
      } else {
        var skuMetric: IGoods.ISkuMetrics | undefined =
          skuFromListGoods?.metrics.find((i) => i.year === startYear);

        if (skuMetric) {
          skuMetric = recalculateMetrics(skuMetric, sku);
        }
      }
    }
  }

  return { listGoodsWithRecalculatedSkuMetrics: listGoods };
};
