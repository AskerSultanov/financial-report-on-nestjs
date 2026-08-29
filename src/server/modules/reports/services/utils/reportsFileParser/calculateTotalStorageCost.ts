export var calculateTotalStorageCost = (
  workSheet: any,
  storageCostColumnName: string,
): { totalStorageCost: number } => {
  var firstRowNum: number = 2;
  var totalStorageCost: number = 0;

  while (firstRowNum <= workSheet.actualRowCount) {
    var storageDataCellAddress: string = storageCostColumnName + firstRowNum;
    totalStorageCost += workSheet.getCell(storageDataCellAddress)?.value || 0;

    firstRowNum++;
  }

  return { totalStorageCost };
};
