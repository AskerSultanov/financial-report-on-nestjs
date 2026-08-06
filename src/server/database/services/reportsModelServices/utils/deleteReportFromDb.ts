import { ClientSession } from 'mongoose';
import { IReports } from '../../../interfaces/reports.interface.js';

export async function deleteReportFromDb(
  userId: string,
  reportId: number,
  session: ClientSession,
): Promise<{ reportBeforeDeletion: IReports }> {
  var doc = await this.reportsModel.findOneAndUpdate(
    { userId },
    {
      $pull: {
        reports: { reportId },
        reportsWithAccountedFinances: { reportId },
      },
    },
    { returnDocument: 'before', session: session },
  );

  return { reportBeforeDeletion: doc.reports[0].toObject() };
}
