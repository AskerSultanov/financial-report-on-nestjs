import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
class Sku {
  @Prop({ required: true })
  skuName!: string;

  @Prop({ default: 0 })
  qty!: number;

  @Prop({ default: 0 })
  taxableAmount!: number;

  @Prop({ default: 0 })
  taxableAmountInCurrentYear!: number;

  @Prop({ default: 0 })
  taxableAmountInNextYear!: number;

  @Prop({ required: false })
  qtyInCurrentYear?: number;

  @Prop({ required: false })
  qtyInNextYear?: number;

  @Prop({ default: 0 })
  costPrice!: number;

  @Prop({ default: 0 })
  costPriceInCurrentYear!: number;

  @Prop({ default: 0 })
  costPriceInNextYear!: number;

  @Prop({ default: 0 })
  otherExpenses!: number;

  @Prop({ default: 0 })
  otherExpensesInCurrentYear!: number;

  @Prop({ default: 0 })
  otherExpensesInNextYear!: number;

  @Prop({ default: 0 })
  revenue!: number;

  @Prop({ required: false })
  revenueInCurrentYear?: number;

  @Prop({ required: false })
  revenueInNextYear?: number;

  @Prop({ default: 0 })
  sellerPayoutAmount!: number;

  @Prop({ required: false })
  sellerPayoutAmountInCurrentYear?: number;

  @Prop({ required: false })
  sellerPayoutAmountInNextYear?: number;

  @Prop({ default: 0 })
  fines!: number;

  @Prop({ required: false })
  finesInCurrentYear?: number;

  @Prop({ required: false })
  finesInNextYear?: number;

  @Prop({ default: 0 })
  returnAmount!: number;

  @Prop({ required: false })
  returnAmountInCurrentYear?: number;

  @Prop({ required: false })
  returnAmountInNextYear?: number;

  @Prop({ default: 0 })
  retailAmount!: number;

  @Prop({ required: false })
  retailAmountInCurrentYear?: number;

  @Prop({ required: false })
  retailAmountInNextYear?: number;

  @Prop({ default: 0 })
  deliveryCost!: number;

  @Prop({ required: false })
  deliveryCostInCurrentYear?: number;

  @Prop({ required: false })
  deliveryCostInNextYear?: number;

  @Prop({ default: 0 })
  storageCost!: number;

  @Prop({ required: false })
  storageCostInCurrentYear?: number;

  @Prop({ required: false })
  storageCostInNextYear?: number;

  @Prop({ default: 0 })
  acceptance!: number;

  @Prop({ required: false })
  acceptanceInCurrentYear?: number;

  @Prop({ required: false })
  acceptanceInNextYear?: number;

  @Prop({ default: 0 })
  deductionOrPayment!: number;

  @Prop({ required: false })
  deductionOrPaymentInCurrentYear?: number;

  @Prop({ required: false })
  deductionOrPaymentInNextYear?: number;

  @Prop({ default: 0 })
  additionalPayment!: number;

  @Prop({ required: false })
  additionalPaymentInCurrentYear?: number;

  @Prop({ required: false })
  additionalPaymentInNextYear?: number;

  @Prop({ default: 0 })
  tax!: number;

  @Prop({ required: false })
  taxInCurrentYear?: number;

  @Prop({ required: false })
  taxInNextYear?: number;

  @Prop({ default: 0 })
  insuranceFee!: number;

  @Prop({ required: false })
  insuranceFeeInCurrentYear?: number;

  @Prop({ required: false })
  insuranceFeeInNextYear?: number;

  @Prop({ default: 0 })
  additionalInsuranceFee!: number;

  @Prop({ required: false })
  additionalInsuranceFeeInCurrentYear?: number;

  @Prop({ required: false })
  additionalInsuranceFeeInNextYear?: number;

  @Prop({ default: 0 })
  profit!: number;

  @Prop({ required: false })
  profitInCurrentYear?: number;

  @Prop({ required: false })
  profitInNextYear?: number;

  @Prop({ default: 0 })
  preTaxProfit!: number;

  @Prop({ required: false })
  preTaxProfitInCurrentYear?: number;

  @Prop({ required: false })
  preTaxProfitInNextYear?: number;

  @Prop({ default: 0 })
  finalProfit!: number;

  @Prop({ required: false })
  finalProfitInCurrentYear?: number;

  @Prop({ required: false })
  finalProfitInNextYear?: number;

  @Prop({ default: 0 })
  profitMargin!: number;

  @Prop({ required: false })
  profitMarginInCurrentYear?: number;

  @Prop({ required: false })
  profitMarginInNextYear?: number;

  @Prop({ default: false })
  isCostPriceSet!: boolean;

  @Prop({ default: false })
  isCostPriceSetInCurrentYear!: boolean;

  @Prop({ default: false })
  isCostPriceSetInNextYear!: boolean;

  @Prop({ type: Boolean })
  isInsuranceFeeIncluded!: boolean;

  @Prop({ type: Boolean })
  isInsuranceFeeIncludedInCurrentYear!: boolean;

  @Prop({ type: Boolean })
  isInsuranceFeeIncludedInNextYear!: boolean;

  @Prop({ default: 0 })
  averageProfit!: number;

  @Prop({ required: false })
  averageProfitInCurrentYear?: number;

  @Prop({ required: false })
  averageProfitInNextYear?: number;

  @Prop({ default: 0 })
  averageRetailPrice!: number;

  @Prop({ required: false })
  averageRetailPriceInCurrentYear?: number;

  @Prop({ required: false })
  averageRetailPriceInNextYear?: number;

  @Prop({ default: 0 })
  averageStorageCost!: number;

  @Prop({ required: false })
  averageStorageCostInCurrentYear?: number;

  @Prop({ required: false })
  averageStorageCostInNextYear?: number;

  @Prop({ default: 0 })
  averageAdvertisingCost!: number;

  @Prop({ required: false })
  averageAdvertisingCostInCurrentYear?: number;

  @Prop({ required: false })
  averageAdvertisingCostInNextYear?: number;

  @Prop()
  schemaVersion?: number;

  @Prop({ required: true })
  id!: number;
}

@Schema({ _id: false })
class RecordedTo {
  @Prop({ required: true })
  year!: number;

  @Prop({ required: true })
  month!: string;

  @Prop()
  schemaVersion?: number;
}

@Schema({ _id: false })
class Report {
  @Prop({ required: true })
  userId!: string;

  @Prop({ default: 0 })
  reportId!: number;

  @Prop({ required: true })
  dateFrom!: string;

  @Prop({ required: true })
  dateTo!: string;

  @Prop({ default: 0 })
  totalSellerPayoutAmount!: number;

  @Prop({ default: 0 })
  totalSold!: number;

  @Prop({ default: 0 })
  totalFines!: number;

  @Prop({ default: 0 })
  totalProductCosts!: number;

  @Prop({ default: 0 })
  totalReturnAmount!: number;

  @Prop({ default: 0 })
  totalStorageCost!: number;

  @Prop({ default: 0 })
  totalDeliveryCost!: number;

  @Prop({ default: 0 })
  totalRetailAmount!: number;

  @Prop({ default: 0 })
  totalPaidAcceptance!: number;

  @Prop({ default: 0 })
  totalAdvertisingCosts!: number;

  @Prop({ default: 0 })
  totalDeductionOrPayment!: number;

  @Prop({ default: 0 })
  totalAdditionalPayment!: number;

  @Prop({ default: 0 })
  totalTaxAmount!: number;

  @Prop({ default: 0 })
  totalInsuranceFee!: number;

  @Prop({ default: 0 })
  totalOtherExpenses!: number;

  @Prop({ default: 0 })
  totalTaxableAmount!: number;

  @Prop({ default: 0 })
  totalTaxableAmountInCurrentYear!: number;

  @Prop({ default: 0 })
  totalTaxableAmountInNextYear!: number;

  @Prop({ default: 0 })
  totalOtherExpensesInCurrentYear!: number;

  @Prop({ default: 0 })
  totalOtherExpensesInNextYear!: number;

  @Prop({ default: 0 })
  totalAdditionalInsuranceFee!: number;

  @Prop({ default: 0 })
  totalProfit!: number;

  @Prop({ default: 0 })
  totalPreTaxProfit!: number;

  @Prop({ default: 0 })
  totalFinalProfit!: number;

  @Prop({ default: 0 })
  totalProfitMargin!: number;

  @Prop({ default: 6 })
  taxRate!: number;

  @Prop({ required: false })
  nextYearTaxRate?: number;

  @Prop({ type: RecordedTo, required: true })
  recordedTo!: RecordedTo;

  @Prop()
  schemaVersion?: number;

  @Prop({ default: false })
  buybackReportIsExist!: boolean;

  @Prop({ default: false })
  isCrossYearPeriod!: boolean;

  @Prop({ required: false })
  totalSellerPayoutAmountInCurrentYear?: number;

  @Prop({ required: false })
  totalSoldInCurrentYear?: number;

  @Prop({ required: false })
  totalSoldInNextYear?: number;

  @Prop({ required: false })
  totalFinesInCurrentYear?: number;

  @Prop({ required: false })
  totalProductCostsInCurrentYear?: number;

  @Prop({ required: false })
  totalReturnAmountInCurrentYear?: number;

  @Prop({ required: false })
  totalStorageCostInCurrentYear?: number;

  @Prop({ required: false })
  totalDeliveryCostInCurrentYear?: number;

  @Prop({ required: false })
  totalRetailAmountInCurrentYear?: number;

  @Prop({ required: false })
  totalPaidAcceptanceInCurrentYear?: number;

  @Prop({ required: false })
  totalAdvertisingCostsInCurrentYear?: number;

  @Prop({ required: false })
  totalDeductionOrPaymentInCurrentYear?: number;

  @Prop({ required: false })
  totalAdditionalPaymentInCurrentYear?: number;

  @Prop({ required: false })
  totalTaxAmountInCurrentYear?: number;

  @Prop({ required: false })
  totalInsuranceFeeInCurrentYear?: number;

  @Prop({ required: false })
  totalAdditionalInsuranceFeeInCurrentYear?: number;

  @Prop({ required: false })
  totalAdditionalInsuranceFeeInNextYear?: number;

  @Prop({ required: false })
  totalProfitInCurrentYear?: number;

  @Prop({ required: false })
  totalPreTaxProfitInCurrentYear?: number;

  @Prop({ required: false })
  totalFinalProfitInCurrentYear?: number;

  @Prop({ required: false })
  totalProfitMarginInCurrentYear?: number;

  @Prop({ required: false })
  totalSellerPayoutAmountInNextYear?: number;

  @Prop({ required: false })
  totalFinesInNextYear?: number;

  @Prop({ required: false })
  totalProductCostsInNextYear?: number;

  @Prop({ required: false })
  totalReturnAmountInNextYear?: number;

  @Prop({ required: false })
  totalStorageCostInNextYear?: number;

  @Prop({ required: false })
  totalDeliveryCostInNextYear?: number;

  @Prop({ required: false })
  totalRetailAmountInNextYear?: number;

  @Prop({ required: false })
  totalPaidAcceptanceInNextYear?: number;

  @Prop({ required: false })
  totalAdvertisingCostsInNextYear?: number;

  @Prop({ required: false })
  totalDeductionOrPaymentInNextYear?: number;

  @Prop({ required: false })
  totalAdditionalPaymentInNextYear?: number;

  @Prop({ required: false })
  totalTaxAmountInNextYear?: number;

  @Prop({ required: false })
  totalInsuranceFeeInNextYear?: number;

  @Prop({ required: false })
  totalProfitInNextYear?: number;

  @Prop({ required: false })
  totalPreTaxProfitInNextYear?: number;

  @Prop({ required: false })
  totalFinalProfitInNextYear?: number;

  @Prop({ required: false })
  totalProfitMarginInNextYear?: number;

  @Prop({ default: false })
  isFinancesAccounted!: boolean;

  @Prop({ type: [Sku], required: true })
  skus!: Sku[];
}

@Schema({ _id: false })
class ReportsWithAccountedFinances {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: true })
  dateFrom!: string;

  @Prop({ required: true })
  dateTo!: string;

  @Prop({ required: true })
  reportId!: number;

  @Prop({ required: true, default: 0 })
  tax!: number;

  @Prop({ required: true })
  financesAccountedAt!: Date;

  @Prop({ required: true, default: 0 })
  profit!: number;

  @Prop({ required: true, default: 0 })
  margin!: number;

  @Prop({ required: true, default: 0 })
  productCosts!: number;

  @Prop({ required: true, default: 0 })
  insuranceFee!: number;

  @Prop({ required: true, default: 0 })
  additionalInsuranceFee!: number;
}

export type ReportsDocument = HydratedDocument<Reports>;

@Schema()
export class Reports {
  @Prop({ required: true })
  userId!: string;

  @Prop({ type: [Report], required: false })
  reports?: Report[];

  @Prop({ type: [ReportsWithAccountedFinances], required: false })
  reportsWithAccountedFinances?: ReportsWithAccountedFinances[];

  @Prop()
  schemaVersion?: number;
}

export var ReportsSchema = SchemaFactory.createForClass(Reports);
