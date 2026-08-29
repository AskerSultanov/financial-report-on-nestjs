import { ClientSession } from 'mongoose';
import { IReport } from '../../../interfaces/report.interface.js';

export async function saveReportToDb(
  report: IReport,
  session: ClientSession,
): Promise<void> {
  await this.reportsModel.create([report], {
    session: session,
  });
}
