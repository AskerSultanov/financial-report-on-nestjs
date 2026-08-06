import { Document } from 'mongoose';

export interface IReport {
  reportId: number;
  dateFrom: string;
  dateTo: string;
  schemaVersion?: number;
}

export interface IMonthPeriod {
  month?: string | null;
  reportIds?: IReport[] | null;
  schemaVersion?: number;
}

export interface IYearsPeriod {
  year: number;
  months: IMonthPeriod[];
}

export interface IReportsTree extends Document {
  userId: string;
  years?: IYearsPeriod[];
  schemaVersion?: number;
}
