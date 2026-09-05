import { ClientSession } from 'mongoose';
import { IReportPeriods } from '../../../interfaces/reportPeriods.interface.js';

export async function checkReportExistByDate(
  userId: string,
  dateFrom: string,
  session: ClientSession,
): Promise<null | { reportPeriods: IReportPeriods }> {
  var sessionOption = session ? { session } : {};

  var data = await this.reportPeriodsModel.findOne(
    { userId, 'reportPeriods.dateFrom': dateFrom },
    { _id: 0, userId: 0, reportPeriods: 1 },
    { ...sessionOption },
  );

  return data;
}
