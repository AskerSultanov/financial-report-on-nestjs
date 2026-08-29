import { ClientSession } from 'mongoose';

export async function removeReportFromAccounted(
  userId: string,
  reportId: number,
  session: ClientSession,
): Promise<void> {
  await this.reportsWithAccountedFinancesModel.deleteOne(
    { userId, reportId },
    { session: session },
  );
}
