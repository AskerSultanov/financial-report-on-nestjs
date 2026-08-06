import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GoodsDocument = HydratedDocument<Goods>;

var mskTimeOffsetInMs = 10_800_000;

@Schema({ _id: false })
export class SkuMetric {
  @Prop({ required: true })
  year!: number;

  @Prop({ required: true, default: 0 })
  qty!: number;

  @Prop({ required: true, default: 0 })
  tax!: number;

  @Prop({ required: true, default: 0 })
  fines!: number;

  @Prop({ required: true, default: 0 })
  netProfit!: number;

  @Prop({ required: true, default: 0 })
  profitMargin!: number;

  @Prop({ required: true, default: 0 })
  retailAmount!: number;

  @Prop({ required: true, default: 0 })
  taxableAmount!: number;

  @Prop({ required: true, default: 0 })
  returnAmount!: number;

  @Prop({ required: true, default: 0 })
  storageCost!: number;

  @Prop({ required: true, default: 0 })
  deliveryCost!: number;

  @Prop({ required: true, default: 0 })
  acceptance!: number;

  @Prop({ required: true, default: 0 })
  insuranceFee!: number;

  @Prop({ required: true, default: 0 })
  otherExpenses!: number;

  @Prop({ required: true, default: 0 })
  sellerPayoutAmount!: number;

  @Prop({ required: true, default: 0 })
  deductionOrPayment!: number;

  @Prop({ required: true, default: 0 })
  additionalInsuranceFee!: number;
}

@Schema({ _id: false })
export class Sku {
  @Prop({ required: true })
  id!: number;

  @Prop({ required: true })
  skuName!: string;

  @Prop({ required: false })
  price?: number;

  @Prop({ required: false })
  discount?: number;

  @Prop({ required: false })
  discountedPrice?: number;

  @Prop({ required: false })
  clubDiscountedPrice?: number;

  @Prop({ default: false })
  disabled!: boolean;

  @Prop({ default: () => Date.now() + mskTimeOffsetInMs })
  lastFetch!: Date;

  @Prop({ required: false })
  lastUpdated?: Date;

  @Prop({ required: false })
  lastCostPrice?: number;

  @Prop({ required: false })
  isPriceUpdated?: boolean;

  @Prop({ required: false })
  errorText?: string;

  @Prop({ default: false })
  deleted!: boolean;

  @Prop({ type: [SkuMetric], required: false, default: [] })
  metrics!: SkuMetric[];
}

@Schema()
export class Goods {
  @Prop({ required: true })
  userId!: string;

  @Prop({ type: [Sku], required: true, default: [] })
  listGoods!: Sku[];
}

export var GoodsSchema = SchemaFactory.createForClass(Goods);
