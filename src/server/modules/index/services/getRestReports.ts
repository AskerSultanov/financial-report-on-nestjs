import { IReports } from '../../../database/interfaces/repots/index.interface.js';

var session: null = null;
var projectonFields: string[] = [
  'reports.reportId',
  'reports.totalTaxAmount',
  'reports.totalFinalProfit',
  'reports.totalProductCosts',
  'reports.isFinancesAccounted',
];

export async function getRestReports(
  userId: string,
  reportIds: number[],
): Promise<{ reports: IReports }> {
  return await this.reportsModelServices.getReportsByUserId(
    userId,
    session,
    projectonFields,
    reportIds,
  );
}
