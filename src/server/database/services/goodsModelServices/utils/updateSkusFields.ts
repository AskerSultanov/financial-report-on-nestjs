import { ClientSession } from 'mongoose';
import { ISku } from '../../../interfaces/goods.interface.js';

var mskTimeOffsetInMs = 10_800_000;

var getCurrentTimestamp = () => Date.now() + mskTimeOffsetInMs;

var createQuery = (skus: ISku[]) => {
  var query: any = {};
  var arrayFilters: any[] = [];

  var count = 0;

  for (var sku of skus) {
    var priceKey = `listGoods.$[elem${count}].price`;
    query[priceKey] = sku.price;

    var discountKey = `listGoods.$[elem${count}].discount`;
    query[discountKey] = sku.discount;

    var discountedPriceKey = `listGoods.$[elem${count}].discountedPrice`;
    query[discountedPriceKey] = sku.discountedPrice;

    var clubDiscountedPriceKey = `listGoods.$[elem${count}].clubDiscountedPrice`;
    query[clubDiscountedPriceKey] = sku.clubDiscountedPrice;

    var lastFetchDateKey = `listGoods.$[elem${count}].lastFetch`;
    query[lastFetchDateKey] = getCurrentTimestamp();
    var optionKey = `elem${count}.id`;

    arrayFilters.push({ [optionKey]: sku.id });

    count++;
  }

  return { query, arrayFilters };
};

export async function updateSkusFields(
  userId: string,
  updatedSkus: ISku[],
  session: ClientSession | null | undefined,
) {
  var sessionOpt = session ? { session: session } : {};
  var { query, arrayFilters } = createQuery(updatedSkus);
  await this.goodsModel.updateOne(
    { userId },
    { $set: query },
    { arrayFilters, ...sessionOpt },
  );
}
