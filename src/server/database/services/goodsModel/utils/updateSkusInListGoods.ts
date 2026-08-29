import { ClientSession } from 'mongoose';

import {
  IData,
  IUpdateSkusInListGoods,
} from '../interfaces/updateSkusInListGoods.interface.js';

type SkuFilter = Record<`sku${number}.skuName`, string>;
type UpdateQuery = Partial<
  Record<
    `listGoods.$[sku${number}].${keyof IData}`,
    Exclude<IData[keyof IData], undefined>
  >
>;

type DataValue = Exclude<IData[keyof IData], undefined>;

var createQuery = (updatedSkus: IUpdateSkusInListGoods[]) => {
  var count: number = 0;
  var query: UpdateQuery = {};
  var arrayFilters: SkuFilter[] = [];

  for (var updatedSku of updatedSkus) {
    var { skuName, data } = updatedSku;

    var keys = Object.keys(data) as (keyof IData)[];

    for (var key of keys) {
      var value = data[key];
      var queryKey = `listGoods.$[sku${count}].${key}`;
      query[queryKey] = value as DataValue;
    }

    arrayFilters.push({ [`sku${count}.skuName`]: skuName });

    count++;
  }

  return { query, arrayFilters };
};

export async function updateSkusInListGoods(
  userId: string,
  updatedSkus: IUpdateSkusInListGoods[],
  session: ClientSession,
) {
  var sessionOpt = session ? { session: session } : {};

  var { query, arrayFilters } = createQuery(updatedSkus);

  if (arrayFilters.length) {
    await this.goodsModel.updateOne(
      { userId },
      { $set: query },
      { arrayFilters, ...sessionOpt },
    );
  }
}
