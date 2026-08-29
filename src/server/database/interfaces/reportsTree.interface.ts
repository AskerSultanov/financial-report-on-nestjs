import { Document } from 'mongoose';

export interface IReport {
  reportId: number;
  dateFrom: string;
  dateTo: string;
}

export interface IMonthPeriod {
  month: string;
  reportIds: IReport[] | null[];
}

export interface IYearsPeriod {
  year: number;
  months: IMonthPeriod[];
}

export interface IReportsTree extends Document {
  userId: string;
  years: IYearsPeriod[] | [];
}
