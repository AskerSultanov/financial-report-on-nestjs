import { IReport } from '../../../../../database/interfaces/reportsTree.interface.js';

export interface ICleanMonthPeriod {
  month: string;
  reportIds: IReport[];
}

export interface ICleanYearPeriod {
  year: number;
  months: ICleanMonthPeriod[];
}

export interface ICleanReportTree {
  userId: string;
  years: ICleanYearPeriod[];
  schemaVersion?: number;
}
