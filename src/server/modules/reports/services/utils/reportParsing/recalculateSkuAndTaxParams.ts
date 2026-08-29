import { ISku } from '../../../../../database/interfaces/reportSku.interface.js';
import { ITaxYear } from '../../../../../database/interfaces/taxParams.interface.js';

interface IRecalculateInsuranceFeeResult {
  isInsuranceFeePaid: boolean;
  excessInsuranceRate: number;
  insuranceFeePercentage: number;
  mandatoryInsuranceFeeIsPaid: boolean;
  additionalInsuranceFeeIsPaid: boolean;
  requiresAdditionalInsuranceFee: boolean;
  newTaxParamsAdditionalInsuranceFee: number;
  recalculatedSkuAdditionalInsuranceFee: number;
}

export function recalculateSkuAndTaxParams(
  sku: ISku,
  taxParams: ITaxYear,
): { skuAdditionalInsuranceFee: number; updatedTaxParams: ITaxYear } {
  var updatedTaxParams: ITaxYear = { ...taxParams };

  var {
    skuAdditionalInsuranceFee,
    newTaxRetailAmount,
    hasExcessIncomeForInsurance,
    requiresAdditionalInsuranceFee,
  } = recalculateTaxParamRetailAmountAndSkuAdditionalInsuranceFee(
    sku.retailAmount,
    taxParams,
  );

  updatedTaxParams = Object.assign(updatedTaxParams, {
    hasExcessIncomeForInsurance,
    requiresAdditionalInsuranceFee,
    retailAmount: newTaxRetailAmount,
  });

  var {
    recalculatedSkuAdditionalInsuranceFee,
    newTaxParamsAdditionalInsuranceFee,
    ...restUpdatedTaxParams
  } = recalculateInsuranceFee(skuAdditionalInsuranceFee, updatedTaxParams);

  updatedTaxParams = Object.assign(updatedTaxParams, {
    additionalInsuranceFee: newTaxParamsAdditionalInsuranceFee,
    ...restUpdatedTaxParams,
  });

  updatedTaxParams.paidTaxAmount = taxParams.paidTaxAmount + sku.tax;

  updatedTaxParams.taxableAmount = taxParams.taxableAmount + sku.taxableAmount;

  return {
    skuAdditionalInsuranceFee: recalculatedSkuAdditionalInsuranceFee,
    updatedTaxParams,
  };
}

export default recalculateSkuAndTaxParams;

var recalculateTaxParamRetailAmountAndSkuAdditionalInsuranceFee = function (
  skuRetailAmount: number,
  taxParams: ITaxYear,
): {
  skuAdditionalInsuranceFee: number;
  hasExcessIncomeForInsurance: boolean;
  requiresAdditionalInsuranceFee: boolean;
  newTaxRetailAmount: number;
} {
  var prevRetailAmount: number = taxParams.retailAmount;
  var newTaxRetailAmount: number = taxParams.retailAmount + skuRetailAmount;

  var skuAdditionalInsuranceFee: number = 0;
  var hasExcessIncomeForInsurance: boolean = false;
  var requiresAdditionalInsuranceFee: boolean = false;

  if (newTaxRetailAmount > taxParams.excessIncomeForAdditionalInsuranceFee!) {
    hasExcessIncomeForInsurance = true;
    requiresAdditionalInsuranceFee = true;

    var difference: number =
      taxParams.excessIncomeForAdditionalInsuranceFee! - prevRetailAmount;

    if (difference > 0) {
      difference = skuRetailAmount - difference;
      skuAdditionalInsuranceFee = this.calcUtils.insuranceFee(
        difference,
        taxParams.excessInsuranceRate,
      );
    } else {
      skuAdditionalInsuranceFee = this.calcUtils.insuranceFee(
        skuRetailAmount,
        taxParams.excessInsuranceRate,
      );
    }
  }

  return {
    skuAdditionalInsuranceFee,
    hasExcessIncomeForInsurance,
    requiresAdditionalInsuranceFee,
    newTaxRetailAmount,
  };
};

var recalculateInsuranceFee = function (
  skuAdditionalInsuranceFee: number,
  taxParams: ITaxYear,
): IRecalculateInsuranceFeeResult {
  var isInsuranceFeePaid: boolean = false;
  var mandatoryInsuranceFeeIsPaid: boolean = true;
  var additionalInsuranceFeeIsPaid: boolean = false;
  var requiresAdditionalInsuranceFee: boolean = true;
  var excessInsuranceRate: number = taxParams.excessInsuranceRate;
  var insuranceFeePercentage: number = taxParams.insuranceFeePercentage;
  var recalculatedSkuAdditionalInsuranceFee: number = skuAdditionalInsuranceFee;
  var newTaxParamsAdditionalInsuranceFee: number =
    taxParams.additionalInsuranceFee + skuAdditionalInsuranceFee;

  if (!requiresAdditionalInsuranceFee) {
    return {
      isInsuranceFeePaid,
      excessInsuranceRate,
      insuranceFeePercentage,
      mandatoryInsuranceFeeIsPaid,
      additionalInsuranceFeeIsPaid,
      requiresAdditionalInsuranceFee,
      newTaxParamsAdditionalInsuranceFee,
      recalculatedSkuAdditionalInsuranceFee,
    };
  }

  var prevAdditionalInsuranceFee: number = taxParams.additionalInsuranceFee;

  var paidInsuranceFee: number =
    taxParams.paidInsuranceFee + newTaxParamsAdditionalInsuranceFee;

  var maxAdditionalInsuranceFee: number =
    taxParams.maxInsuranceFee! - taxParams.mandatoryInsuranceFee;

  if (newTaxParamsAdditionalInsuranceFee > maxAdditionalInsuranceFee) {
    additionalInsuranceFeeIsPaid = true;
    requiresAdditionalInsuranceFee = false;

    var difference: number =
      maxAdditionalInsuranceFee - prevAdditionalInsuranceFee;

    if (difference > 0) {
      var recalculatedSkuAdditionalInsuranceFee =
        skuAdditionalInsuranceFee + difference;
    }
  }

  if (paidInsuranceFee >= taxParams.maxInsuranceFee!) {
    isInsuranceFeePaid = true;
    mandatoryInsuranceFeeIsPaid = true;
    additionalInsuranceFeeIsPaid = true;
    requiresAdditionalInsuranceFee = false;

    excessInsuranceRate = 0;
    insuranceFeePercentage = 0;
  }

  if (newTaxParamsAdditionalInsuranceFee >= maxAdditionalInsuranceFee) {
    excessInsuranceRate = 0;
    additionalInsuranceFeeIsPaid = true;
    requiresAdditionalInsuranceFee = false;
  }

  return {
    isInsuranceFeePaid,
    excessInsuranceRate,
    insuranceFeePercentage,
    mandatoryInsuranceFeeIsPaid,
    additionalInsuranceFeeIsPaid,
    requiresAdditionalInsuranceFee,
    newTaxParamsAdditionalInsuranceFee,
    recalculatedSkuAdditionalInsuranceFee,
  };
};
