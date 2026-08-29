import { IWeeklyPricesAndDiscounts } from '../../../interfaces/weeklyPricesAndDiscounts.interface.js';

export async function getAllUserWeeklyPricesAndDiscounts(): Promise<
  IWeeklyPricesAndDiscounts[]
> {
  var data = await this.weeklyPricesAndDiscountsModel.find(
    {},
    { weeklyPricesAndDiscounts: 1, userId: 1, uploadId: 1, _id: 0 },
  );

  return data;
}
