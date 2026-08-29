import { ClientSession } from 'mongoose';
import { ISku } from '../../../interfaces/goods.interface.js';

export async function getSkuFromListGoods(
  userId: string,
  skuId: number,
  skuName: string,
  session: ClientSession,
): Promise<{ skuFromListGoods: ISku }> {
  var data = await this.goodsModel.findOne(
    { userId, 'listGoods.id': skuId, 'listGoods.skuName': skuName },
    { 'listGoods.$': 1 },
    { session: session },
  );

  var skuFromListGoods = data.listGoods[0];
  return { skuFromListGoods };
}
