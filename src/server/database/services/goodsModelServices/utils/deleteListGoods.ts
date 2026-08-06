import { ClientSession } from 'mongoose';

export async function deleteListGoods(
  userId: string,
  session: ClientSession,
): Promise<void> {
  await this.goodsModel.updateOne(
    { userId },
    { $set: { listGoods: [] } },
    { session },
  );
}
