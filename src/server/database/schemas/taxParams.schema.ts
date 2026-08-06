import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({ _id: false })
export class TaxYear {
  @Prop({ required: true })
  year!: number;

  @Prop({ default: 6 })
  taxRate!: number;

  @Prop({ default: 0 })
  paidTaxAmount!: number;

  @Prop({ default: 0 })
  mandatoryInsuranceFee!: number;

  @Prop({ default: 10 })
  insuranceFeePercentage!: number;

  @Prop({ default: 0 })
  paidInsuranceFee!: number;

  @Prop({ default: 0 })
  retailAmount!: number;

  @Prop({ default: 0 })
  otherExpenses!: number;

  @Prop({ default: 0 })
  taxableAmount!: number;

  @Prop({ default: 0 })
  finalProfit!: number;

  @Prop({ default: false })
  isInsuranceFeePaid!: boolean;

  @Prop({ default: 0 })
  additionalInsuranceFee!: number;

  @Prop({ default: false })
  requiresAdditionalInsuranceFee!: boolean;

  @Prop()
  excessIncomeForAdditionalInsuranceFee!: number;

  @Prop()
  maxInsuranceFee!: number;

  @Prop({ default: 10 })
  mandatoryInsuranceFeeRate!: number;

  @Prop({ default: false })
  hasExcessIncomeForInsurance!: boolean;

  @Prop({ default: false })
  mandatoryInsuranceFeeIsPaid!: boolean;

  @Prop({ default: false })
  additionalInsuranceFeeIsPaid!: boolean;

  @Prop({ default: 1 })
  excessInsuranceRate!: number;

  @Prop()
  schemaVersion?: number;
}

export type TaxParamsDocument = HydratedDocument<TaxParams>;

@Schema()
export class TaxParams {
  @Prop({ required: true })
  userId!: string;

  @Prop({ type: [TaxYear], required: false, default: [] })
  years!: TaxYear[];

  @Prop()
  schemaVersion!: number;
}

export var TaxParamsSchema = SchemaFactory.createForClass(TaxParams);
