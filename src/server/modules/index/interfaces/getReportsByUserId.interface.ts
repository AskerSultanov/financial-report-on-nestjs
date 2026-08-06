import {
  IReports,
  IReportsWithAccountedFinances,
} from '../../../database/interfaces/reports.interface.js';

export interface IGetReportsByUserId {
  reports: IReports;
  reportsWithAccountedFinances: IReportsWithAccountedFinances[];
}
