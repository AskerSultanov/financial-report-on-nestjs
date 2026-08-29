import { ClientSession } from 'mongoose';

var mskTimeOffsetInMs = 10_800_000;

export async function setLastReportRequestTimestamp(
  userId: string,
  session: ClientSession,
): Promise<void> {
  await this.reportLoadingStateModel.updateOne(
    { userId },
    { $set: { lastReportRequestTimestamp: Date.now() + mskTimeOffsetInMs } },
    { session: session },
  );
}
