import * as IGoods from '../../../../../database/interfaces/goods.interface.js';
import { IDefaultSkuMetricsField } from './interfaces/addDefaultMetricsToSku.interface.js';

var defaultSkuMetricsField: IDefaultSkuMetricsField = {
  qty: 0,
  tax: 0,
  fines: 0,
  netProfit: 0,
  profitMargin: 0,
  retailAmount: 0,
  returnAmount: 0,
  storageCost: 0,
  deliveryCost: 0,
  taxableAmount: 0,
  acceptance: 0,
  insuranceFee: 0,
  otherExpenses: 0,
  sellerPayoutAmount: 0,
  deductionOrPayment: 0,
  additionalInsuranceFee: 0,
};

export var addDefaultMetricsToSku = (
  listGoods: IGoods.ISku[],
  isCrossYearPeriod: boolean,
  startYear: number,
  endYear: number,
): IGoods.ISku[] => {
  for (var sku of listGoods) {
    if (isCrossYearPeriod) {
      var startYearMetric: IGoods.ISkuMetrics | undefined = sku.metrics.find(
        (metric) => metric.year === startYear,
      );

      if (!startYearMetric) {
        sku.metrics.push({ ...defaultSkuMetricsField, year: startYear });
      }

      var endYearMetric: IGoods.ISkuMetrics | undefined = sku.metrics.find(
        (metric) => metric.year === endYear,
      );

      if (!endYearMetric) {
        sku.metrics.push({ ...defaultSkuMetricsField, year: endYear });
      }
    } else {
      var skuMetric: IGoods.ISkuMetrics | undefined = sku.metrics.find(
        (metric) => metric.year === startYear,
      );

      if (!skuMetric) {
        sku.metrics.push({ ...defaultSkuMetricsField, year: startYear });
      }
    }
  }

  return listGoods;
};
