export function caclAverageAdvertisingCost (skuQty: number, totalAdvertisingCosts: number): number {
  if (!skuQty) {
    return 0;
  }

  var averageAdvertisingCost: number = totalAdvertisingCosts / skuQty;
  return averageAdvertisingCost;
};
