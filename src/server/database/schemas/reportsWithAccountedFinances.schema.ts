import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ReportsWithAccountedFinances {
  @Prop({ required: true, unique: true })
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

export type ReportsWithAccountedFinancesDocument =
  HydratedDocument<ReportsWithAccountedFinances>;

export var ReportsWithAccountedFinancesSchema = SchemaFactory.createForClass(
  ReportsWithAccountedFinances,
);

ReportsWithAccountedFinancesSchema.index(
  { userId: 1, reportId: 1 },
  { unique: true },
);
