import { ClientSession } from 'mongoose';

var mskTimeOffsetInMs = 10_800_000;

export interface ISkuPriceData {
  nmID: number;
  price: number;
  discount: number;
}

export async function updateSingleSku(
  userId: string,
  sku: ISkuPriceData,
  session: ClientSession | null | undefined,
): Promise<void> {
  var { nmID, price, discount } = sku;

  var sessionOption = session ? { session } : {};

  var lastUpdatedDate = Date.now() + mskTimeOffsetInMs;
  var discountedPrice = price - (price * discount) / 100;

  var query = {
    ['listGoods.$[sku].price']: price,
    ['listGoods.$[sku].discount']: discount,
    ['listGoods.$[sku].lastUpdated']: lastUpdatedDate,
    ['listGoods.$[sku].discountedPrice']: discountedPrice,
    ['listGoods.$[sku].clubDiscountedPrice']: discountedPrice,
  };

  var arrayFilters = [{ 'sku.id': nmID }];

  await this.goodsModel.updateOne(
    { userId },
    { $set: query },
    { arrayFilters, ...sessionOption },
  );
}
