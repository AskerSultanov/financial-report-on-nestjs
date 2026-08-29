import { ISku } from '../../../../../database/interfaces/reports/index.interface.js';
import { ISkusLastCostPrice } from '../../../../../database/services/goodsModel/utils/getSkusLastCostPrice.js';

export var filterCostsForReportSkus = (
  skusFromReport: ISku[],
  skusLastCostPrice: ISkusLastCostPrice[],
): { skusLastCostPrice: ISkusLastCostPrice[] } => {
  var filteredSkusLastCostPrice: ISkusLastCostPrice[] = [];

  for (var skuLastCostPriceData of skusLastCostPrice) {
    if (skuLastCostPriceData?.lastCostPrice) {
      if (
        skusFromReport.find(
          (sku) =>
            sku.id === skuLastCostPriceData!.id &&
            sku.skuName === skuLastCostPriceData!.skuName,
        )
      ) {
        filteredSkusLastCostPrice.push(skuLastCostPriceData);
      }
    }
  }

  return { skusLastCostPrice: filteredSkusLastCostPrice };
};
