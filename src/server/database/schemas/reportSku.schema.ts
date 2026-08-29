import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class ReportSku {
  @Prop({ required: true })
  id!: number;

  @Prop({ required: true })
  skuName!: string;

  @Prop({ default: 0 })
  qty!: number;

  @Prop({ default: 0 })
  taxableAmount!: number;

  @Prop({ default: 0 })
  costPrice!: number;

  @Prop({ default: 0 })
  otherExpenses!: number;

  @Prop({ default: 0 })
  sellerPayoutAmount!: number;

  @Prop({ default: 0 })
  fines!: number;

  @Prop({ default: 0 })
  returnAmount!: number;

  @Prop({ default: 0 })
  retailAmount!: number;

  @Prop({ default: 0 })
  deliveryCost!: number;

  @Prop({ default: 0 })
  storageCost!: number;

  @Prop({ default: 0 })
  acceptance!: number;

  @Prop({ default: 0 })
  deductionOrPayment!: number;

  @Prop({ default: 0 })
  additionalPayment!: number;

  @Prop({ default: 0 })
  tax!: number;

  @Prop({ default: 0 })
  insuranceFee!: number;

  @Prop({ default: 0 })
  additionalInsuranceFee!: number;

  @Prop({ default: 0 })
  profit!: number;

  @Prop({ default: 0 })
  preTaxProfit!: number;

  @Prop({ default: 0 })
  finalProfit!: number;

  @Prop({ default: 0 })
  profitMargin!: number;

  @Prop({ default: false })
  isCostPriceSet!: boolean;

  @Prop({ default: false })
  isInsuranceFeeIncluded!: boolean;

  @Prop({ default: 0 })
  averageProfit!: number;

  @Prop({ default: 0 })
  averageStorageCost!: number;

  @Prop({ default: 0 })
  averageAdvertisingCost!: number;
}
