import { ClientSession } from 'mongoose';
import { ISku } from '../../../interfaces/goods.interface.js';

export async function saveNewSkusToDb(
  userId: string,
  newSkus: ISku[],
  session: ClientSession| null | undefined,
): Promise<void> {
  var sessionOpt = session ? { session } : {};
  await this.goodsModel.updateOne(
    { userId },
    { $push: { listGoods: { $each: [...newSkus] } } },
    { ...sessionOpt },
  );
}
