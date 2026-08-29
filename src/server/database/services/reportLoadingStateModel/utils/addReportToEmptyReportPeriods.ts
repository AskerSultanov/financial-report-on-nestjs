import { ClientSession } from 'mongoose';

export async function addReportToEmptyReportPeriods(
  userId: string,
  dateFrom: string,
  dateTo: string,
  session: ClientSession,
): Promise<void> {
  var sessionOptions = session ? { session } : {};

  await this.reportLoadingStateModel.updateOne(
    { userId },
    { $push: { emptyReportPeriods: { dateFrom, dateTo } } },
    { ...sessionOptions },
  );
}
