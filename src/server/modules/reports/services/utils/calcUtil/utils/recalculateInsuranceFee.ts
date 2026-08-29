import { ITaxYear } from '../../../../../../database/interfaces/taxParams.interface.js';
import { ISku } from '../../../../../../database/interfaces/reportSku.interface.js';

export function recalculateInsuranceFee(
  sku: ISku,
  taxParams: ITaxYear,
): {
  skuWithRecalculatedInsuranceFee: ISku;
  taxParamsWithRecalculatedInsuranceFee: ITaxYear;
} {
  if (taxParams.mandatoryInsuranceFeeIsPaid) {
    Object.assign(sku, {
      [insuranceFeeKey]: 0,
      [isInsuranceFeeIncludedKey]: false,
    });

    return {
      skuWithRecalculatedInsuranceFee: sku,
      taxParamsWithRecalculatedInsuranceFee: taxParams,
    };
  }

  var preTaxProfitKey: string = 'preTaxProfit' + propPostfix;
  var preTaxProfit = sku[preTaxProfitKey as keyof ISku] as number;
  var insuranceFee: number = this.calcInsuranceFee(
    preTaxProfit,
    taxParams.mandatoryInsuranceFeeRate,
  );
  Object.assign(sku, {
    [insuranceFeeKey]: insuranceFee,
    [isInsuranceFeeIncludedKey]: true,
  });

  taxParams.paidInsuranceFee += insuranceFee;

  if (taxParams.paidInsuranceFee >= taxParams.mandatoryInsuranceFee) {
    var difference =
      taxParams.paidInsuranceFee - taxParams.mandatoryInsuranceFee;

    var insuranceFee: number = sku[insuranceFeeKey as keyof ISku] as number;

    var newInsuranceFee = insuranceFee - difference;
    if (newInsuranceFee === 0) {
      Object.assign(sku, { [isInsuranceFeeIncludedKey]: false });
    }

    Object.assign(sku, { [insuranceFeeKey]: newInsuranceFee });

    taxParams.mandatoryInsuranceFeeRate = 0;
    taxParams.mandatoryInsuranceFeeIsPaid = true;
    taxParams.paidInsuranceFee = taxParams.mandatoryInsuranceFee;
  }

  var totalInsuranceFee =
    taxParams.paidInsuranceFee + taxParams.additionalInsuranceFee;

  if (totalInsuranceFee >= (taxParams?.maxInsuranceFee || 0)) {
    taxParams.excessInsuranceRate = 0;
    taxParams.isInsuranceFeePaid = true;
    taxParams.mandatoryInsuranceFeeRate = 0;
    taxParams.mandatoryInsuranceFeeIsPaid = true;
    taxParams.additionalInsuranceFeeIsPaid = true;
    taxParams.requiresAdditionalInsuranceFee = false;
  }

  return {
    skuWithRecalculatedInsuranceFee: sku,
    taxParamsWithRecalculatedInsuranceFee: taxParams,
  };
}
