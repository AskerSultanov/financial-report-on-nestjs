export async function prependToReportsQueue(
  userId: string,
  dateFrom: string,
  dateTo: string,
): Promise<void> {
  await this.reportLoadingStateModel.updateOne(
    { userId },
    {
      $push: { reportsQueue: { $each: [{ dateFrom, dateTo }], $position: 0 } },
      $inc: { queueLength: 1, queueCapacity: 1 },
    },
  );
}
