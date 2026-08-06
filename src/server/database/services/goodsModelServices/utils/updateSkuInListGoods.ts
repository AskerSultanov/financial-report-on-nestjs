import { ClientSession } from 'mongoose';
import { ISku } from '../../../interfaces/goods.interface.js';

var createQuery = (skuName: string, data: ISku) => {
  var query: any = {};
  var arrayFilters: any[] = [];

  for (var key of Object.keys(data) as (keyof ISku)[]) {
    query[`listGoods.$[sku].${key}`] = data[key];
  }

  var arrayFilterObj = { [`sku.skuName`]: skuName };
  arrayFilters.push(arrayFilterObj);

  return { query, arrayFilters };
};

export async function updateSkuInListGoods(
  userId: string,
  skuName: string,
  data: ISku,
  session: ClientSession,
): Promise<void> {
  var { query, arrayFilters } = createQuery(skuName, data);
  await this.goodsModel.updateOne(
    { userId },
    { $set: query },
    { arrayFilters, session: session },
  );
}
