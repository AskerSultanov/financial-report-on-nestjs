import { ClientSession } from 'mongoose';

export async function deleteReportLoadingStates(
  userId: string,
  session: ClientSession | null | undefined,
): Promise<void> {
  await this.reportLoadingStateModel.updateOne(
    { userId },
    {
      $set: {
        reportsQueue: [],
        loadingInProgress: false,
        abandonedReports: [],
        freshReportPeriodIndex: -1,
      },
    },
  );
}
