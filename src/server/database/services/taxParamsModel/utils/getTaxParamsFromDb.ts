import { ClientSession } from 'mongoose';
import { ITaxYear, IYears } from '../../../interfaces/taxParams.interface.js';

export async function getTaxParamsFromDb(
  userId: string,
  year: number,
  session: ClientSession | null | undefined,
): Promise<ITaxYear | IYears> {
  var sessionOpt = session ? { session: session } : {};
  var allTaxParams = await this.taxParamsModel.findOne({ userId }, null, {
    ...sessionOpt,
  });

  if (year) {
    return allTaxParams
      .toObject()
      .years.find((taxParam: ITaxYear) => taxParam.year == year);
  }

  return allTaxParams.toObject().years;
}
