export async function getUploadId(
  userId: string,
): Promise<{ uploadId: number | null }> {
  var { uploadId } = await this.weeklyPricesAndDiscountsModel.findOne({
    userId,
  });

  return { uploadId };
}
