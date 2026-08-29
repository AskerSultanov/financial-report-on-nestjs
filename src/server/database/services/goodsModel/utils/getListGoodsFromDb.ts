import { ClientSession } from 'mongodb';
import { ISku } from '../../../interfaces/goods.interface.js';

export async function getListGoodsFromDb(
  userId: string,
  skuNames: string[],
  selectedFields: {},
  session: ClientSession | null | undefined,
): Promise<{ listGoods: ISku[] }> {
  var sessionOption = session ? { session } : {};

  var data = await this.goodsModel
    .findOne({ userId }, null, { ...sessionOption })
    .select(selectedFields);

  if (Array.isArray(skuNames) && skuNames.length) {
    var requiredSkusFromListGoods = [];

    for (var sku of data?.listGoods) {
      var requiredSku = skuNames.find((skuName) => skuName === sku.skuName);

      if (requiredSku) {
        requiredSkusFromListGoods.push(sku);
      }
    }

    return { listGoods: requiredSkusFromListGoods };
  }

  return { listGoods: data?.listGoods ? data.listGoods.toObject() : [] };
}
