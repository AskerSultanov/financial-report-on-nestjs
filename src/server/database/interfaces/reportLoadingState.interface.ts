import { Document } from 'mongoose';

interface ILastLoadedReport {
  readonly year: number;
  readonly month: string;
  readonly dateTo: string;
  readonly dateFrom: string;
  readonly reportId: number;
}

export interface IQueueItem {
  readonly index: number;
  readonly dateTo: string;
  readonly dateFrom: string;
  readonly failedCount: number;
}

export interface IReportLoadingStates extends Document {
  readonly userId: string;
  readonly queueLength: number;
  readonly queueCapacity: number;
  readonly reportsQueue?: IQueueItem[];
  readonly abandonedReports?: IQueueItem[];
  readonly loadingInProgress: boolean;
  readonly lastReportRequestTimestamp: number;
  readonly freshReportPeriodIndex?: number;
  readonly lastLoadedReport?: ILastLoadedReport;
  readonly isReportLoadingDelayed: boolean;
  readonly isReportLoadingIsStopped: boolean;
  readonly loadingStopReason: string;
  readonly emptyReportPeriodsIndexes?: number[];
}
