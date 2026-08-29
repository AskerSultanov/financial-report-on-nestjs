import { ClientSession } from 'mongoose';
import { IReport } from '../../../interfaces/report.interface.js';

export async function deleteReportFromDb(
  userId: string,
  reportId: number,
  session: ClientSession,
): Promise<{ reportBeforeDeletion: IReport }> {
  var report = await this.reportsModel.findOneAndUpdate(
    { userId, reportId },
    { returnDocument: 'before', session: session },
  );

  return { reportBeforeDeletion: report.toObject() };
}
