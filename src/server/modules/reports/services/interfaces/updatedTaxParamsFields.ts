export interface IUpdatedTaxParamsFields {
  finalProfit: number;
  otherExpenses: number;
  paidInsuranceFee: number;
  excessInsuranceRate?: number;
  isInsuranceFeePaid?: boolean;
  updatedTaxParamsFields?: boolean;
  mandatoryInsuranceFeeRate?: number;
  mandatoryInsuranceFeeIsPaid?: boolean;
  additionalInsuranceFeeIsPaid?: boolean;
  requiresAdditionalInsuranceFee?: boolean;
}
