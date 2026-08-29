import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type GoodsDocument = HydratedDocument<Goods>;

var mskTimeOffsetInMs = 10_800_000;

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
}

@Schema()
export class Goods {
  @Prop({ required: true, unique: true })
  userId!: string;

  @Prop({ type: [Sku], required: true, default: [] })
  listGoods!: Sku[];
}

export var GoodsSchema = SchemaFactory.createForClass(Goods);

GoodsSchema.index({ userId: 1 });
