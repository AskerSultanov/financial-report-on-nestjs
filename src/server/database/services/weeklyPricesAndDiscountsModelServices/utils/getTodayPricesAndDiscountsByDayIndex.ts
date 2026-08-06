import { ISku } from '../../../interfaces/weeklyPricesAndDiscounts.interface.js';

export async function getTodayPricesAndDiscountsByDayIndex(
  currentdayIndex: number,
): Promise<{ userId: string; currentyDayPricesAndDiscounts: ISku }[]> {
  return await this.weeklyPricesAndDiscountsModel.aggregate([
    {
      $project: {
        _id: 0,
        userId: 1,
        currentDayPricesAndDiscounts: {
          $arrayElemAt: ['$weeklyPricesAndDiscounts', currentdayIndex],
        },
      },
    },
  ]);
}
