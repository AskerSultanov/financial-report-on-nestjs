import { ISku } from '../../../../../../database/interfaces/reportSku.interface.js';

export function calcTotalProductCosts(skus: ISku[]): number {
  var productCosts: number = skus.reduce(
    (acc, sku) => acc + sku.qty * sku.costPrice,
    0,
  );

  return productCosts;
}
