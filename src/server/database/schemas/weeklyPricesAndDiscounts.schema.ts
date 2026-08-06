import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type WeeklyPricesAndDiscountsDocument =
  HydratedDocument<WeeklyPricesAndDiscounts>;

@Schema({ _id: false })
export class PriceAndDiscount {
  @Prop({ required: true })
  nmID!: number;

  @Prop({ required: true })
  price!: number;

  @Prop({ required: true })
  discount!: number;
}

@Schema({ _id: false })
class Sku {
  @Prop({ required: true })
  nmID!: number;

  @Prop({ required: false })
  dayIndex!: number;

  @Prop({ default: true })
  needToUpdate!: boolean;

  @Prop({ default: 0 })
  lastUpdatedTimestamp!: number;

  @Prop({ type: PriceAndDiscount, required: false })
  data!: PriceAndDiscount;

  @Prop({ default: '5m' })
  updateInterval!: string;

  @Prop({ default: 300_000 })
  updateIntervalInMs!: number;

  @Prop({ default: false })
  changePriceIfInPromo!: boolean;

  @Prop({ default: 'interval', enum: ['interval', 'oncePerDay'] })
  updateOption!: string;
}

@Schema()
export class WeeklyPricesAndDiscounts {
  @Prop({ required: true })
  userId!: string;

  @Prop({ required: false })
  uploadId!: number;

  @Prop({ type: [Sku], required: false })
  weeklyPricesAndDiscounts?: Sku[];
}

export var WeeklyPricesAndDiscountsSchema = SchemaFactory.createForClass(
  WeeklyPricesAndDiscounts,
);
