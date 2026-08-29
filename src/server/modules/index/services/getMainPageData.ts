import { BadRequestException } from '@nestjs/common';

import { cleanReportTree } from './utils/cleanReportTree .js';
import { getLastNonEmptyReportIds } from './utils/getLastNonEmptyReportIds.js';
import { IGetMainPageData } from '../interfaces/getMainPageData.interface.js';
import { ICleanYearPeriod } from './utils/interfaces/cleanReportTree.interface.js';
import { IGetReportsByUserId } from '../interfaces/getReportsByUserId.interface.js';
import { sortReportsByAccountingDate } from './utils/sortReportsByAccountingDate.js';
import { IReportsWithAccountedFinances } from '../../../database/interfaces/reports/index.interface.js';

var projectonFields: string[] = [
  'reports.reportId',
  'reports.totalTaxAmount',
  'reports.totalFinalProfit',
  'reports.totalProductCosts',
  'reports.isFinancesAccounted',
];

var session: null = null;

var selectedFieldsToLoadingState: string[] = [
  'queueLength',
  'reportsQueue',
  'queueCapacity',
  'abandonedReports',
  'loadingInProgress',
  'loadingStopReason',
  'isReportLoadingDelayed',
  'isReportLoadingIsStopped',
];

export async function getMainPageData(
  userId: string | undefined,
): Promise<IGetMainPageData> {
  if (!userId) {
    throw new BadRequestException();
  }

  var reportLoadingStateUrl: string = '/report/loading-state/' + userId + '/';

  var { reportTree } =
    await this.reportsTreeModelServices.getReportTree(userId);
  var reportLoadingState =
    await this.reportLoadingStateModelServices.getReportLoadingState(
      userId,
      session,
      selectedFieldsToLoadingState,
    );

  if (!reportTree.length) {
    return {
      reportLoadingState,
      reportLoadingStateUrl,
      reportTree: [],
      lastReports: [],
      reportsWithAccountedFinances: [],
    };
  }

  var cleanedReportTree: ICleanYearPeriod[] = cleanReportTree(reportTree);
  var lastYear = cleanedReportTree[0];

  var lastReportIds: number[] | [] | undefined =
    getLastNonEmptyReportIds(lastYear);

  if (!lastReportIds || !lastReportIds.length) {
    return {
      reportLoadingState,
      reportLoadingStateUrl,
      reportTree: [],
      lastReports: [],
      reportsWithAccountedFinances: [],
    };
  }

  var { reports, reportsWithAccountedFinances }: IGetReportsByUserId =
    await this.reportsModelServices.getReportsByUserId(
      userId,
      session,
      projectonFields,
      lastReportIds,
    );

  var sortedReportsWithAccountedFinances: IReportsWithAccountedFinances[] =
    sortReportsByAccountingDate(reportsWithAccountedFinances);

  return {
    reportLoadingState,
    reportLoadingStateUrl,
    lastReports: reports,
    reportTree: cleanedReportTree,
    reportsWithAccountedFinances: sortedReportsWithAccountedFinances,
  };
}
