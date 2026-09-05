import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

var monthList: string[] = [
  'январь',
  'февраль',
  'марта',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
];

@Schema({ _id: false })
export class ReportPeriodItem {
  @Prop({ required: true })
  year!: number;

  @Prop({ required: true })
  dateFrom!: string;

  @Prop({ required: true })
  dateTo!: string;

  @Prop({ required: true })
  reportId!: number;

  @Prop({ required: true, enum: monthList })
  monthName!: string;

  @Prop({ requred: true, min: 0, max: 11 })
  monthIndex!: number;
}

@Schema()
export class ReportPeriods {
  @Prop({ required: true })
  userId!: string;

  @Prop({ default: [], type: [ReportPeriodItem] })
  reportPeriods!: ReportPeriodItem[];
}

export type ReportPeriodDocument = HydratedDocument<ReportPeriods>;

export var ReportPeriodsSchema = SchemaFactory.createForClass(ReportPeriods);

ReportPeriodsSchema.index({ userId: 1 }, { unique: true });
ReportPeriodsSchema.index(
  { userId: 1, 'reportPeriods.dateFrom': 1 },
  { unique: true },
);
