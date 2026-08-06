export async function deleteReportTreeByUserId(userId: string): Promise<void> {
  await this.reportsTreeModel.updateOne(
    { userId },
    {
      $set: { years: [] },
    },
  );
}
