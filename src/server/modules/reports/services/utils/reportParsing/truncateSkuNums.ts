import { ISku } from '../../../../../database/interfaces/reportSku.interface.js';
import { truncateNum } from './truncateNum.js';

export function truncateSkuNums(skus: ISku[]): ISku[] {
  skus.map((sku) => {
    for (var key in sku) {
      var value = sku[key as keyof ISku] as any;
      if (typeof value === 'number' && !isNaN(value)) {
        sku = Object.assign(sku, { [key]: truncateNum(value) });
      }
    }

    return sku;
  });
  return skus;
}
