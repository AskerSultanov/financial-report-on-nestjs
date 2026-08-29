import { ClientSession } from 'mongoose';
import { ISku } from '../../../interfaces/reportSku.interface.js';
import { IUpdatedReport } from '../interfaces/updatedReportSkus.interface.js';

type SkuFilter = Record<`skuElem${number}.skuName`, string>;
type UpdateQuery = Partial<
  Record<`skus.$[${string}].${keyof ISku}`, number | boolean | string>
>;

interface BulkUpdateOperation {
  updateOne: {
    filter: { userId: string; reportId: number };
    update: { $set: UpdateQuery };
    arrayFilters: SkuFilter[];
  };
}

interface CreateQueryResult {
  bulkOptions: BulkUpdateOperation[];
}

var createQuery = (
  userId: string,
  updatedReports: IUpdatedReport[],
): CreateQueryResult => {
  var bulkOptions: BulkUpdateOperation[] = [];

  for (var { reportId, updatedSkus } of updatedReports) {
    var query: UpdateQuery = {};
    var arrayFilters: SkuFilter[] = [];

    if (Array.isArray(updatedSkus) && updatedSkus?.length) {
      var count = 0;

      for (var updatedSku of updatedSkus) {
        var { skuName, data } = updatedSku;

        var skuFilterName = `skuElem${count}`;
        arrayFilters.push({ [`${skuFilterName}.skuName`]: skuName });

        var keys = Object.keys(data) as (keyof ISku)[];

        for (const skuKey of keys) {
          const queryKey = `skus.$[${skuFilterName}].${skuKey}` as const;
          query[queryKey] = data[skuKey];
        }

        count++;
      }
    }

    if (arrayFilters.length) {
      bulkOptions.push({
        updateOne: {
          filter: { userId, reportId },
          update: { $set: query },
          arrayFilters,
        },
      });
    }
  }

  return { bulkOptions };
};

export async function saveUpdatedReports(
  userId: string,
  reports: IUpdatedReport[],
  session: ClientSession,
): Promise<void> {
  var { bulkOptions } = createQuery(userId, reports);

  await this.reportsModel.bulkWrite(bulkOptions, { session });
}
