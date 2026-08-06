import { IReports } from '../../../interfaces/reports.interface.js';

export async function checkReportExistsToDb(
  userId: string,
  dateFrom: string,
  dateTo: string,
): Promise<IReports> {
  var report = await this.reportsModel.findOne({
    userId,
    'reports.dateFrom': dateFrom,
    'reports.dateTo': dateTo,
  });

  return report;
}
