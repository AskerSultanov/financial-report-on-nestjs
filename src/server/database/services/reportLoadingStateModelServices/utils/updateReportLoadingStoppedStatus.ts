import { ClientSession } from 'mongoose';

export async function updateReportLoadingStoppedStatus(
  userId: string,
  newStatus: boolean,
  session: ClientSession | null | undefined,
): Promise<void> {
  var sessionOptions = session ? { session: session } : {};
  await this.reportLoadingStateModel.updateOne(
    { userId },
    { $set: { isReportLoadingIsStopped: newStatus } },
    { ...sessionOptions },
  );
}
