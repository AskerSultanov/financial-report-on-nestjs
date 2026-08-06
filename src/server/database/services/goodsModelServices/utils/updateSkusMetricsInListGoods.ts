import { ClientSession } from 'mongoose';
import { ISku } from '../../../interfaces/goods.interface.js';

var createQuery = (skus: ISku[]) => {
  var query: any = {};
  var arrayFilters = [];

  for (var { id, skuName, metrics } of skus) {
    query[`listGoods.$[sku${id}].metrics`] = metrics;

    var arrayFilterObj = { [`sku${id}.skuName`]: skuName };
    arrayFilters.push(arrayFilterObj);
  }

  return { query, arrayFilters };
};

export async function updateSkusMetricsInListGoods(
  userId: string,
  updatedSkus: ISku[],
  session: ClientSession | null | undefined,
): Promise<void> {
  var sessionOpt = session ? { session } : {};
  var { query, arrayFilters } = createQuery(updatedSkus);
  await this.goodsModel.updateOne(
    { userId },
    { $set: query },
    { arrayFilters, ...sessionOpt },
  );
}
