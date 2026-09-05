import { ClientSession } from 'mongoose';
import { IReportPeriodsItem } from '../../../interfaces/reportPeriods.interface.js';

export async function addReportToReportPeriods(
  userId: string,
  report: IReportPeriodsItem,
  session: ClientSession,
): Promise<void> {
  var sessionOption = session ? { session } : {};

  await this.reportPeriodsModel.updateOne(
    { userId },
    { $push: { reportPeriods: { ...report } } },
    { ...sessionOption },
  );
}
