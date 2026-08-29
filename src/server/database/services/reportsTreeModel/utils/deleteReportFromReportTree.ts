import { ClientSession } from 'mongoose';

export async function deleteReportFromReportTree(
  userId: string,
  year: number,
  month: string,
  reportId: number,
  session: ClientSession | null | undefined,
): Promise<void> {
  var sessionOpt = session ? { session: session } : {};

  await this.reportsTreeModel.updateOne(
    {
      userId,
      'years.year': year,
      'years.months.month': month,
      'years.months.reportIds.reportId': reportId,
    },
    {
      $set: {
        'years.$[y].months.$[m].reportIds.$[r]': null,
      },
    },
    {
      arrayFilters: [
        { 'y.year': year },
        { 'm.month': month },
        { 'r.reportId': reportId },
      ],
      ...sessionOpt,
    },
  );
}
