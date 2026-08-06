import { ClientSession } from 'mongoose';
import { IWeeklyPricesAndDiscounts } from '../../../interfaces/weeklyPricesAndDiscounts.interface.js';

export async function setWeeklyPricesAndDiscounts(
  userId: string,
  weeklyPricesAndDiscounts: IWeeklyPricesAndDiscounts,
  session: ClientSession,
): Promise<boolean> {
  var result = await this.weeklyPricesAndDiscountsModel.updateOne(
    { userId },
    { $set: { weeklyPricesAndDiscounts } },
    { session: session },
  );

  return result.acknowledged;
}
