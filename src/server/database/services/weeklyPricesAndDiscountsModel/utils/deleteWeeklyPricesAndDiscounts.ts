export async function deleteWeeklyPricesAndDiscounts(
  userId: string,
): Promise<void> {
  await this.weeklyPricesAndDiscountsModel.updateOne(
    { userId },
    { $set: { weeklyPricesAndDiscounts: [], uploadId: 0 } },
  );
}
