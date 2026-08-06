export async function resetAbandonedReports(userId: string): Promise<void> {
  await this.reportLoadingStateModel.updateOne(
    { userId },
    { $set: { abandonedReports: [] } },
  );
}
