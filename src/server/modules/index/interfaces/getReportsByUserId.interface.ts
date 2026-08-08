import {
  IReports,
  IReportsWithAccountedFinances,
} from '../../../database/interfaces/repots/index.interface.js';

export interface IGetReportsByUserId {
  reports: IReports;
  reportsWithAccountedFinances: IReportsWithAccountedFinances[];
}
