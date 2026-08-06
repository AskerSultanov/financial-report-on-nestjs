import { ClientSession } from 'mongoose';
import { IQueueItem } from '../../../interfaces/reportLoadingState.interface.js';

export async function pushToReportsQueue(
  userId: string,
  periods: IQueueItem[],
  session: ClientSession | null | undefined,
  needToResetAbandonedReports: boolean = false,
): Promise<void> {
  var sessionOpt = session ? { session } : {};

  if (needToResetAbandonedReports) {
    await this.reportLoadingStateModel.updateOne(
      { userId },
      {
        $push: { reportsQueue: { $each: [...periods] } },
        $set: { abandonedReports: [] },
      },
      { ...sessionOpt },
    );
  } else {
    await this.reportLoadingStateModel.updateOne(
      { userId },
      { $push: { reportsQueue: { $each: [...periods] } } },
      { ...sessionOpt },
    );
  }
}
