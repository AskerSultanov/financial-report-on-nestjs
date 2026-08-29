import { ReportSku } from './reportSku.schema.js';
import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
class RecordedTo {
  @Prop({ required: true })
  year!: number;

  @Prop({ required: true })
  month!: string;
}

@Schema()
export class Report {
  @Prop({ required: true })
  userId!: string;

  @Prop({ default: 0 })
  reportId!: number;

  @Prop({ required: true })
  dateFrom!: string;

  @Prop({ required: true })
  dateTo!: string;

  @Prop({ type: RecordedTo, required: true })
  recordedTo!: RecordedTo;

  @Prop({ default: false })
  buybackReportIsExist!: boolean;

  @Prop({ default: false })
  isCrossYearPeriod!: boolean;

  @Prop({ default: false })
  isFinancesAccounted!: boolean;

  @Prop({ type: [ReportSku], required: true })
  skus!: ReportSku[];
}

export type ReportDocument = HydratedDocument<Report>;

export var ReportSchema = SchemaFactory.createForClass(Report);

ReportSchema.index({ userId: 1, reportId: 1 }, { unique: true });
ReportSchema.index({ userId: 1, dateFrom: 1, dateTo: 1 }, { unique: true });
