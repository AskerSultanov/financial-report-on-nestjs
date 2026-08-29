export function calcAverageStorageCost(
  totalStorageCost: number,
  totalSold: number,
  qty: number,
): number {
  if (!qty) {
    return 0;
  }

  var averageStorageCost: number = (totalStorageCost / totalSold) * qty;

  return averageStorageCost;
}
