import { ClientSession } from 'mongoose';

export async function saveNewSkusToDb(
  userId: string,
  newSkus: { skuName: string; id: number }[],
  session: ClientSession | null | undefined,
): Promise<void> {
  var sessionOpt = session ? { session } : {};

  await this.goodsModel.updateOne(
    { userId },
    { $push: { listGoods: { $each: [...newSkus] } } },
    { ...sessionOpt },
  );
}
