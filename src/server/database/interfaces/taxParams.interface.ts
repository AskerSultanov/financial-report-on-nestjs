import { Document } from 'mongoose';

export interface ITaxYear {
  year: number;
  taxRate: number;
  paidTaxAmount: number;
  mandatoryInsuranceFee: number;
  insuranceFeePercentage: number;
  paidInsuranceFee: number;
  retailAmount: number;
  otherExpenses: number;
  taxableAmount: number;
  finalProfit: number;
  isInsuranceFeePaid: boolean;
  additionalInsuranceFee: number;
  requiresAdditionalInsuranceFee: boolean;
  excessIncomeForAdditionalInsuranceFee?: number;
  maxInsuranceFee?: number;
  mandatoryInsuranceFeeRate: number;
  hasExcessIncomeForInsurance: boolean;
  mandatoryInsuranceFeeIsPaid: boolean;
  additionalInsuranceFeeIsPaid: boolean;
  excessInsuranceRate: number;
  schemaVersion?: number;
}

export interface IYears {
  years: ITaxYear[];
}

export interface ITaxParams extends Document {
  userId: string;
  schemaVersion: number;
  years: ITaxYear[];
}
