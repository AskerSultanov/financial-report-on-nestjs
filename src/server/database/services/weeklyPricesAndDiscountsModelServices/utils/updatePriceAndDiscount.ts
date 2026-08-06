import { ClientSession } from 'mongoose';
import { IPriceAndDiscount } from '../../../interfaces/weeklyPricesAndDiscounts.interface.js';

var createQuery = (
  skuId: number,
  skuDataToUpdate: IPriceAndDiscount,
  checkedWeekDays: number[],
) => {
  var query: any = {};
  var arrayFilters: any[] = [];

  var count = 0;
  for (var weekDayId of checkedWeekDays) {
    for (var key of Object.keys(
      skuDataToUpdate,
    ) as (keyof IPriceAndDiscount)[]) {
      var queryKey = `weeklyPricesAndDiscounts.${weekDayId}.$[elem${count}].${key}`;
      query[queryKey] = skuDataToUpdate[key];
    }

    var optionKey = `elem${count}.nmID`;

    arrayFilters.push({ [optionKey]: skuId });

    count++;
  }

  return { query, arrayFilters };
};

export async function updatePriceAndDiscount(
  userId: string,
  skuId: number,
  skuDataToUpdate: IPriceAndDiscount,
  checkedWeekDays: [number],
): Promise<boolean> {
  var { query, arrayFilters } = createQuery(
    skuId,
    skuDataToUpdate,
    checkedWeekDays,
  );

  var result = await this.weeklyPricesAndDiscountsModel.updateOne(
    { userId },
    { $set: query },
    { arrayFilters },
  );

  return result?.acknowledged;
}
