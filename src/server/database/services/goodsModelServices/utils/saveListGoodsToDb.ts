import { ClientSession } from 'mongoose';
import { ISku } from '../../../interfaces/goods.interface.js';

export async function saveListGoodsToDb(
  userId: string,
  listGoods: ISku[],
  session: ClientSession | null | undefined,
): Promise<void> {
  var sessionOpt = session ? { session: session } : {};
  await this.goodsModel.updateOne(
    { userId },
    { $set: { listGoods } },
    { ...sessionOpt },
  );
}
