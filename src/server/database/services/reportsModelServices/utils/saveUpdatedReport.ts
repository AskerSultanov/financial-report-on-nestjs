import { IReports } from '../../../interfaces/repots/index.interface.js';

export async function saveUpdatedReport(
  userId: string,
  reportId: number,
  report: IReports,
): Promise<void> {
  await this.reportsModel.updateOne(
    { userId, 'reports.reportId': reportId },
    {
      $set: { 'reports.$': report },
    },
  );
}
