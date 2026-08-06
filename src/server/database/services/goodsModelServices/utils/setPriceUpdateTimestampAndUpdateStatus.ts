import { ClientSession } from 'mongoose';

var mskTimeOffsetInMs = 10_800_000;

var getLastModifiedDate = () => Date.now() + mskTimeOffsetInMs;

export interface IPriceData {
  nmID: number;
  status: number;
  errorText: string;
}

var createQuery = (priceData: IPriceData[]) => {
  var query: any = {};
  var arrayFilters: any[] = [];

  var count = 0;
  for (var { nmID, status, errorText } of priceData) {
    var isPriceUpdated = status === 2;

    /**
     * 2 - the product is error-free, and the price and/or discount have been updated
     * https://dev.wildberries.ru/openapi/work-with-products#tag/Ceny-i-skidki/paths/~1api~1v2~1history~1goods~1task/get
     */

    var priceStatusKey = `listGoods.$[elem${count}].isPriceUpdated`;
    query[priceStatusKey] = isPriceUpdated;

    var lastUpdated = getLastModifiedDate();
    var lastUpdatedKey = `listGoods.$[elem${count}].lastUpdated`;
    query[lastUpdatedKey] = lastUpdated;

    var errorTextKey = `listGoods.$[elem${count}].errorText`;
    query[errorTextKey] = errorText;

    var optionKey = `elem${count}.id`;
    arrayFilters.push({ [optionKey]: nmID });

    count++;
  }
  return { query, arrayFilters };
};

export async function setPriceUpdateTimestampAndUpdateStatus(
  userId: string,
  priceData: IPriceData[],
  session: ClientSession | null | undefined,
): Promise<void> {
  var sessionOpt = session ? { session: session } : {};
  var { query, arrayFilters } = createQuery(priceData);
  await this.goodsModel.updateOne(
    { userId },
    { $set: query },
    { arrayFilters, ...sessionOpt },
  );
}
