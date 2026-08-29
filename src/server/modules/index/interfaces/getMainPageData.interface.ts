import {
  IReports,
  IReportsWithAccountedFinances,
} from '../../../database/interfaces/reports/index.interface.js';
import { IYearsPeriod } from '../../../database/interfaces/reportsTree.interface.js';
import { IReportLoadingStates } from '../../../database/interfaces/reportLoadingState.interface.js';

export interface IGetMainPageData {
  lastReports: IReports | [];
  reportLoadingStateUrl: string;
  reportTree: IYearsPeriod[] | [];
  reportLoadingState: IReportLoadingStates;
  reportsWithAccountedFinances: IReportsWithAccountedFinances[] | [];
}
