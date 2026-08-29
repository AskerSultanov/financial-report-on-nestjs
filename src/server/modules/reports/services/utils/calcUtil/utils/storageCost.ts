import { truncateNum } from '../../reportParsing/truncateNum.js';

export interface IStorageData {
  name: string;
  skuStorageCost: number;
}

export function calcStorageCost(
  skuName: string,
  storageData: IStorageData[],
): number {
  var sku: IStorageData | undefined = storageData.find(
    (item) => skuName === item.name,
  );

  var storageCost: number = sku?.skuStorageCost || 0;
  return truncateNum(storageCost);
}
