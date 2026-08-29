import * as calcUtils from '../calcUtil/index.js';
import { truncateNum } from '../reportParsing/truncateNum.js';

import { IPrevSkuData } from './getPrevSkuData.js';
import { ISkuForInit } from '../reportParsing/interfaces/sku.interface.js';
import * as IGoods from '../../../../../database/interfaces/goods.interface.js';
import { ISku } from '.././../../../../database/interfaces/reports/index.interface.js';

export var recalculateFinalSkuMetrics = (
  year: number,
  skuFromListGoods: IGoods.ISku,
  sku: ISkuForInit,
  prevSkuData: IPrevSkuData,
  postfix: string = '',
): IGoods.ISku => {
  var skuMetrics: IGoods.ISkuMetrics | undefined =
    skuFromListGoods.metrics.find((i) => i.year === year);

  if (!skuMetrics) {
    return skuFromListGoods;
  }

  var otherExpensesKey: string = 'otherExpenses' + postfix;
  var prevSkuOtherExpenses: number = prevSkuData[
    otherExpensesKey as keyof IPrevSkuData
  ] as number;

  var currentSkuOtherExpenses: number = sku[
    otherExpensesKey as keyof ISku
  ] as number;

  var recalculatedOtherExpenses: number =
    skuMetrics.otherExpenses - prevSkuOtherExpenses + currentSkuOtherExpenses;

  skuMetrics.otherExpenses = truncateNum(recalculatedOtherExpenses);

  var netProfitKey: string = 'otherExpenses' + postfix;
  var prevSkuNetProfit: number = prevSkuData[
    netProfitKey as keyof IPrevSkuData
  ] as number;

  var currentSkuNetProfit: number = sku[netProfitKey as keyof ISku] as number;

  var recalculatedNetProfit: number =
    skuMetrics.netProfit - prevSkuNetProfit + currentSkuNetProfit;

  skuMetrics.netProfit = truncateNum(recalculatedNetProfit);

  var insuranceFeeKey: string = 'insuranceFee' + postfix;
  var prevSkuInsuranceFee: number = prevSkuData[
    insuranceFeeKey as keyof IPrevSkuData
  ] as number;

  var currentSkuInsuranceFee: number = sku[
    insuranceFeeKey as keyof ISku
  ] as number;

  var recalculatedInsuranceFee: number =
    skuMetrics.insuranceFee - prevSkuInsuranceFee + currentSkuInsuranceFee;

  skuMetrics.insuranceFee = truncateNum(recalculatedInsuranceFee);

  skuMetrics.profitMargin = calcUtils.calcProfitMargin(
    skuMetrics.netProfit,
    skuMetrics.retailAmount,
  );

  return skuFromListGoods;
};
