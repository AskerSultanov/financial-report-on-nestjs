import { ClientSession } from 'mongoose';
import { ITaxYear } from '../../../interfaces/taxParams.interface.js';
import { IUpdatedTaxYear } from '../interfaces/updatedTaxYear.interface.js';

type TaxYearFilter = Record<`elem${number}.year`, number>;
type UpdateQuery = Partial<
  Record<`years.$[elem${number}].${keyof ITaxYear}`, number | boolean>
>;

export async function updateTaxParamsToDb(
  userId: string,
  updatedTaxParams: IUpdatedTaxYear[],
  session: ClientSession,
): Promise<void> {
  var count: number = 0;
  var query: UpdateQuery = {};
  var arrayFilters: TaxYearFilter[] = [];

  for (var { year, data } of updatedTaxParams) {
    var arrayFiltersKey: string = `elem${count}.year`;

    arrayFilters.push({ [arrayFiltersKey]: year });

    var keys = Object.keys(data) as (keyof ITaxYear)[];

    for (var key of keys) {
      const queryKey = `years.$[elem${count}].${key}` as const;
      query[queryKey] = data[key];
    }

    count++;
  }

  await this.taxParamsModel.updateOne(
    { userId },
    { $set: query },
    { arrayFilters, session: session },
  );
}
