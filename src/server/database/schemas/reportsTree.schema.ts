import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
class Report {
  @Prop({ required: true })
  reportId!: number;

  @Prop({ required: true })
  dateFrom!: string;

  @Prop({ required: true })
  dateTo!: string;
}

@Schema({ _id: false })
class MonthPeriod {
  @Prop({ required: false })
  month?: string;

  @Prop({ type: [Report], required: false })
  reportIds?: Report[];
}

@Schema({ _id: false })
class YearsPeriod {
  @Prop({ required: false })
  year?: number;

  @Prop({ type: [MonthPeriod] })
  months?: MonthPeriod[];
}

export type ReportsTreeDocument = HydratedDocument<ReportsTree>;

@Schema()
export class ReportsTree {
  @Prop({ required: true, unique: true })
  userId!: string;

  @Prop({ type: [YearsPeriod], required: false })
  years?: YearsPeriod[];
}

export var ReportsTreeSchema = SchemaFactory.createForClass(ReportsTree);
ReportsTreeSchema.index({ userId: 1 }, { unique: true });
