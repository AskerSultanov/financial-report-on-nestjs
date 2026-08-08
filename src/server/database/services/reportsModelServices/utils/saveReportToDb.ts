import { ClientSession } from 'mongoose';
import { IReports } from '../../../interfaces/repots/index.interface.js';

export async function saveReportToDb(
  userId: string,
  report: IReports,
  session: ClientSession,
): Promise<void> {
  await this.reportsModel.updateOne(
    { userId },
    {
      $push: {
        reports: { $each: [report], $position: 0 },
      },
    },
    {
      session: session,
    },
  );
}
