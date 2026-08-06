export async function removeReportFromAccounted(
  userId: string,
  reportId: number,
): Promise<void> {
  await this.reportsModel.updateOne(
    { userId, 'reports.reportId': reportId },
    {
      $set: { 'reports.$.isFinancesAccounted': false },
      $pull: { reportsWithAccountedFinances: { reportId } },
    },
  );
}
