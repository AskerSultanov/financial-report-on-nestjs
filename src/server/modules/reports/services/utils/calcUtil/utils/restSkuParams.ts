import { calcFinalProfit } from './finalProfit.js';
import { calcProfitMargin } from './profitMargin.js';
import { calcInsuranceFee } from './insuranceFee.js';
import { calcPreTaxProfit } from './preTaxProfit.js';
import { truncateNum } from '../../reportParsing/truncateNum.js';

import { ISku } from '../../../../../../database/interfaces/reportSku.interface.js';
import { ITaxYear } from '../../../../../../database/interfaces/taxParams.interface.js';

type UpdatedSkuFields = Partial<ISku>;
type UpdatedTaxParamsFields = Partial<ITaxYear>;

export interface RecalculateInsuranceFeeResult {
  skuInsuranceFee: number;
  isInsuranceFeeIncluded: boolean;
  updatedTaxParamsFields: UpdatedTaxParamsFields;
}

export interface CalcRestSkuParamsResult {
  updatedSkuFields: UpdatedSkuFields;
  updatedTaxParamsFieldsBySku: UpdatedTaxParamsFields;
}

export function calcRestSkuParams(
  sku: ISku,
  prevSkuData: ISku,
  taxParams: ITaxYear,
): CalcRestSkuParamsResult {
  var updatedSkuFields: UpdatedSkuFields = {};

  updatedSkuFields.isCostPriceSet = true;
  updatedSkuFields.costPrice = sku.costPrice;
  updatedSkuFields.otherExpenses = sku.otherExpenses;

  var newPreTaxProfit = calcPreTaxProfit(sku);
  sku.preTaxProfit = newPreTaxProfit;
  updatedSkuFields.preTaxProfit = newPreTaxProfit;

  var prevSkuInsuranceFee: number = prevSkuData.insuranceFee;

  var { skuInsuranceFee, isInsuranceFeeIncluded, updatedTaxParamsFields } =
    recalculateInsuranceFee(prevSkuInsuranceFee, newPreTaxProfit, taxParams);

  sku.insuranceFee = skuInsuranceFee;
  updatedSkuFields.insuranceFee = skuInsuranceFee;
  updatedSkuFields.isInsuranceFeeIncluded = isInsuranceFeeIncluded;

  var newFinalProfit: number = calcFinalProfit(sku);
  var newProfitMargin: number = calcProfitMargin(
    newFinalProfit,
    sku.retailAmount,
  );

  updatedSkuFields.finalProfit = newFinalProfit;
  updatedSkuFields.profitMargin = newProfitMargin;

  return {
    updatedSkuFields,
    updatedTaxParamsFieldsBySku: updatedTaxParamsFields,
  };
}

var recalculateInsuranceFee = function (
  prevSkuInsuranceFee: number,
  preTaxProfit: number,
  taxParams: ITaxYear,
): RecalculateInsuranceFeeResult {
  var skuInsuranceFee: number = 0;
  var isInsuranceFeeIncluded: boolean = false;

  var updatedTaxParamsFields: UpdatedTaxParamsFields = {};
  updatedTaxParamsFields.finalProfit = taxParams.finalProfit;
  updatedTaxParamsFields.otherExpenses = taxParams.otherExpenses;
  updatedTaxParamsFields.paidInsuranceFee = taxParams.paidInsuranceFee;

  if (taxParams.mandatoryInsuranceFeeIsPaid) {
    return { skuInsuranceFee, isInsuranceFeeIncluded, updatedTaxParamsFields };
  }

  skuInsuranceFee = calcInsuranceFee(
    preTaxProfit,
    taxParams.mandatoryInsuranceFeeRate,
  );

  isInsuranceFeeIncluded = true;

  var recalculatedPaidInsuranceFee =
    taxParams.paidInsuranceFee - prevSkuInsuranceFee + skuInsuranceFee;
  updatedTaxParamsFields.paidInsuranceFee = truncateNum(
    recalculatedPaidInsuranceFee,
  );

  if (
    updatedTaxParamsFields.paidInsuranceFee >= taxParams.mandatoryInsuranceFee
  ) {
    var difference =
      updatedTaxParamsFields.paidInsuranceFee - taxParams.mandatoryInsuranceFee;

    skuInsuranceFee -= difference;

    if (skuInsuranceFee === 0) {
      isInsuranceFeeIncluded = false;
    }

    updatedTaxParamsFields.mandatoryInsuranceFeeRate = 0;
    updatedTaxParamsFields.mandatoryInsuranceFeeIsPaid = true;
    updatedTaxParamsFields.paidInsuranceFee = taxParams.mandatoryInsuranceFee;
  }

  var totalInsuranceFee =
    updatedTaxParamsFields.paidInsuranceFee + taxParams.additionalInsuranceFee;

  if (totalInsuranceFee >= taxParams.maxInsuranceFee!) {
    updatedTaxParamsFields.excessInsuranceRate = 0;
    updatedTaxParamsFields.isInsuranceFeePaid = true;
    updatedTaxParamsFields.mandatoryInsuranceFeeRate = 0;
    updatedTaxParamsFields.mandatoryInsuranceFeeIsPaid = true;
    updatedTaxParamsFields.additionalInsuranceFeeIsPaid = true;
    updatedTaxParamsFields.requiresAdditionalInsuranceFee = false;
  }

  return { skuInsuranceFee, isInsuranceFeeIncluded, updatedTaxParamsFields };
};
