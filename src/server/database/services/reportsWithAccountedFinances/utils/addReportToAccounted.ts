import { ClientSession } from 'mongoose';

var mskTimeOffsetInMs: number = 10_800_000;

export async function addReportToAccounted(
  userId: string,
  reportId: number,
  dateFrom: string,
  dateTo: string,
  session: ClientSession,
): Promise<void> {
  var financesAccountedAt = Date.now() + mskTimeOffsetInMs;

  await this.reportsWithAccountedFinancesModel.create(
    [
      {
        userId,
        reportId,
        dateFrom,
        dateTo,
        financesAccountedAt,
      },
    ],
    { session: session },
  );
}
