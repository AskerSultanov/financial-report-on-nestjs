import { ClientSession } from 'mongoose';
import { ISku } from '../../../interfaces/reportSku.interface.js';
import { IUpdatedReportSkus } from '../interfaces/updatedReportSkus.interface.js';

type SkuFilter = Record<`skuElem${number}.skuName`, string>;
type UpdateQuery = Partial<
  Record<`skus.$[skuElem${number}].${keyof ISku}`, number | boolean | string>
>;

var createQuery = (updatedSkus: IUpdatedReportSkus[]) => {
  var query: UpdateQuery = {};
  var arrayFilters: SkuFilter[] = [];

  if (Array.isArray(updatedSkus) && updatedSkus?.length) {
    var count: number = 0;

    for (var updatedSku of updatedSkus) {
      var data = updatedSku.data;
      var skuName = updatedSku.skuName;

      var keys = Object.keys(data) as (keyof ISku)[];

      for (var skuKey of keys) {
        const queryKey = `skus.$[skuElem${count}].${skuKey}` as const;
        query[queryKey] = data[skuKey];
      }

      arrayFilters.push({ [`skuElem${count}.skuName`]: skuName });

      count++;
    }
  }

  return { query, arrayFilters };
};

export async function saveUpdatedReport(
  userId: string,
  reportId: number,
  updatedSkus: IUpdatedReportSkus[],
  session: ClientSession,
): Promise<void> {
  var { query, arrayFilters } = createQuery(updatedSkus);
  await this.reportModel.updateOne(
    { userId, reportId },
    { $set: query },
    { arrayFilters, session: session },
  );
}
