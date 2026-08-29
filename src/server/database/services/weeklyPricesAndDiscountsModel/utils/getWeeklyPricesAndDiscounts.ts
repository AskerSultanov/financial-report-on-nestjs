import { IWeeklyPricesAndDiscounts } from '../../../interfaces/weeklyPricesAndDiscounts.interface.js';

export async function getWeeklyPricesAndDiscounts(
  userId: string,
): Promise<{ weeklyPricesAndDiscounts: IWeeklyPricesAndDiscounts }> {
  var { weeklyPricesAndDiscounts } =
    await this.weeklyPricesAndDiscountsModel.findOne({ userId });

  return { weeklyPricesAndDiscounts };
}
