import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ _id: false })
class LastLoadedReport {
  @Prop({ required: true })
  year!: number;

  @Prop({ required: true })
  month!: string;

  @Prop({ required: true })
  dateTo!: string;

  @Prop({ required: true })
  dateFrom!: string;

  @Prop({ required: true })
  reportId!: number;
}

@Schema({ _id: false })
class QueueItem {
  @Prop({ required: true })
  dateTo!: string;

  @Prop({ required: true })
  dateFrom!: string;

  @Prop({ required: true, default: 0, min: 0, max: 3 })
  failedCount!: number;
}

export type ReportLoadingStatesDocument = HydratedDocument<ReportLoadingStates>;

@Schema()
export class ReportLoadingStates {
  @Prop({ required: true })
  userId!: string;

  @Prop({ default: 0, min: 0 })
  queueLength!: number;

  @Prop({ default: 0, min: 0 })
  queueCapacity!: number;

  @Prop({ type: [QueueItem], required: false })
  reportsQueue!: QueueItem[];

  @Prop({ type: [QueueItem], required: false })
  abandonedReports!: QueueItem[];

  @Prop({ default: false })
  loadingInProgress!: boolean;

  @Prop({ default: 0 })
  lastReportRequestTimestamp!: number;

  @Prop({ required: false })
  freshReportPeriodIndex!: number;

  @Prop({ type: LastLoadedReport, required: false })
  lastLoadedReport!: LastLoadedReport;

  @Prop({ required: true, default: false })
  isReportLoadingDelayed!: boolean;

  @Prop({ required: true, default: false })
  isReportLoadingIsStopped!: boolean;

  @Prop({ default: '', required: false })
  loadingStopReason!: string;

  @Prop({ type: [Number], required: false })
  emptyReportPeriodsIndexes!: number[];
}

export var ReportLoadingStatesSchema =
  SchemaFactory.createForClass(ReportLoadingStates);

ReportLoadingStatesSchema.index({ userId: 1 }, { unique: true });
