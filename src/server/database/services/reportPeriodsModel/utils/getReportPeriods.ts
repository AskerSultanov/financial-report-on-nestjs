import { ClientSession } from 'mongoose';
import { IReportPeriods } from '../../../interfaces/reportPeriods.interface.js';

export async function getReportPeriods(
  userId: string,
  session: ClientSession,
): Promise<{ reportPeriods: IReportPeriods }> {
  var sessionOption = session ? { session } : {};

  var { reportPeriods } = await this.reportPeriodsModel.findOne(
    { userId },
    {},
    { ...sessionOption },
  );

  return { reportPeriods };
}
