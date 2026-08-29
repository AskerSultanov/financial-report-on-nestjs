import { ClientSession } from 'mongoose';

export async function setUploadId(
  userId: string,
  uploadId: number,
  session: ClientSession | null | undefined,
): Promise<void> {
  var sessionOpt = session ? { session: session } : {};
  await this.weeklyPricesAndDiscountsModel.updateOne(
    { userId },
    { $set: { uploadId } },
    { ...sessionOpt },
  );
}
