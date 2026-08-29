import * as calcUtils from '../calcUtil/index.js';
import { truncateNum } from '../reportParsing/truncateNum.js';
import { recalculateFinalSkuMetrics } from './recalculateFinalSkuMetrics.js';

import { IPrevSkuData } from './getPrevSkuData.js';
import * as IGoods from '../../../../../database/interfaces/goods.interface.js';
import { ISku } from '.././../../../../database/interfaces/reports/index.interface.js';
import { ITaxYear } from '../../../../../database/interfaces/taxParams.interface.js';
import { ISkuForInit } from '../reportParsing/interfaces/sku.interface.js';

export interface IResultOfRestSkuParamsRecalculation {
  skuWithCalculatedParams: ISkuForInit;
  updatedTaxParams: ITaxYear;
}

var processOfSkuCostPriceSetting = async (
  sku: ISku,
  skuFromListGoods: IGoods.ISku,
  taxParams: ITaxYear,
  prevSkuData: IPrevSkuData,
  postfix: string,
) => {
  var year: number = taxParams.year;

  if (postfix) {
    var {
      skuWithCalculatedParams,
      updatedTaxParams,
    }: IResultOfRestSkuParamsRecalculation = calcUtils.calcRestSKUParams(
      sku,
      taxParams,
      postfix,
    );

    var skuFromListGoods: IGoods.ISku = recalculateFinalSkuMetrics(
      year,
      skuFromListGoods,
      skuWithCalculatedParams,
      prevSkuData,
      postfix,
    );

    var recalculatedPreTaxProfit =
      skuWithCalculatedParams.preTaxProfitInCurrentYear! +
      skuWithCalculatedParams.preTaxProfitInNextYear!;
    skuWithCalculatedParams.preTaxProfit = truncateNum(
      recalculatedPreTaxProfit,
    );

    var recalculatedFinalProfit =
      skuWithCalculatedParams.finalProfitInCurrentYear! +
      skuWithCalculatedParams.finalProfitInNextYear!;
    skuWithCalculatedParams.finalProfit = truncateNum(recalculatedFinalProfit);

    var recalculatedInsuranceFee =
      skuWithCalculatedParams.insuranceFeeInCurrentYear! +
      skuWithCalculatedParams.insuranceFeeInNextYear!;
    skuWithCalculatedParams.insuranceFee = truncateNum(
      recalculatedInsuranceFee,
    );

    skuWithCalculatedParams.profitMargin = calcUtils.calcProfitMargin(
      skuWithCalculatedParams.finalProfit,
      skuWithCalculatedParams.retailAmount!,
    );

    return {
      updatedSkuMetrics: skuFromListGoods.metrics,
      taxParams: updatedTaxParams,
      updatedSku: skuWithCalculatedParams,
    };
  } else {
    var {
      skuWithCalculatedParams,
      updatedTaxParams,
    }: IResultOfRestSkuParamsRecalculation = calcUtils.calcRestSKUParams(
      sku,
      taxParams,
    );

    skuFromListGoods = recalculateFinalSkuMetrics(
      year,
      skuFromListGoods,
      skuWithCalculatedParams,
      prevSkuData,
    );

    return {
      updatedSkuMetrics: skuFromListGoods.metrics,
      taxParams: updatedTaxParams,
      updatedSku: skuWithCalculatedParams,
    };
  }
};

export default processOfSkuCostPriceSetting;
