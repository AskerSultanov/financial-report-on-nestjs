import { truncateNum } from '../reportParsing/truncateNum.js';

import { ISkuNamesAndIds } from './getSkuNamesAndIds.js';

export var calculateAvrgStorageCostForEachReportItem = (
  totalStorageCost: number,
  skuNamesAndIds: ISkuNamesAndIds[],
): { avrgStorageCostForEachItem: number } => {
  var rowNums: number[] = skuNamesAndIds.map((sku) => sku.rowNums.length);
  var totalReportItems: number = rowNums.reduce((acc, item) => acc + +item, 0);
  var avrgStorageCostForEachItem: number = totalStorageCost / totalReportItems;
  avrgStorageCostForEachItem = truncateNum(avrgStorageCostForEachItem);
  return { avrgStorageCostForEachItem };
};
