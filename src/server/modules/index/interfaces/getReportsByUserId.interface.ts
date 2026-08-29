import {
  IReports,
  IReportsWithAccountedFinances,
} from '../../../database/interfaces/reports/index.interface.js';

export interface IGetReportsByUserId {
  reports: IReports;
  reportsWithAccountedFinances: IReportsWithAccountedFinances[];
}
