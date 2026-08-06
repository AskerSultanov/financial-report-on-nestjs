import { ClientSession } from 'mongoose';
import { ITaxYear } from '../../../interfaces/taxParams.interface.js';

export async function changeTaxParamsToDb(
  userId: string,
  session: ClientSession,
  ...updatedTaxParams: ITaxYear[]
): Promise<boolean> {
  var count = 0;
  var query: any = {};
  var arrayFilters = [];

  for (var taxParams of updatedTaxParams) {
    var arrayFiltersKey = `elem${count}.year`;
    var arrayFiltersValue = taxParams.year;
    arrayFilters.push({ [arrayFiltersKey]: arrayFiltersValue });

    for (var key of Object.keys(taxParams) as (keyof ITaxYear)[]) {
      query[`years.$[elem${count}].${key}`] = taxParams[key];
    }

    count++;
  }

  var result = await this.taxParamsModel.updateOne(
    { userId },
    { $set: query },
    { arrayFilters, session: session },
  );

  return result.acknowledged;
}
