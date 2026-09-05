import { ClientSession } from 'mongoose';

export async function removeReportFromReportPeriods(
  userId: string,
  dateFrom: string,
  dateTo: string,
  session: ClientSession,
): Promise<void> {
  var sessionOption = session ? { session } : {};

  await this.reportPeriodsModel.updateOne(
    { userId },
    { $pull: { reportPeriods: { dateFrom, dateTo } } },
    { ...sessionOption },
  );
}
