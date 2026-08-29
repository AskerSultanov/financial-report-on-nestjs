var topCellNum: number = 1;
var skuNameTitleAlias: string = 'Артикул поставщика';
var skuIdTitleAlias: string = 'Код номенклатуры';

export interface ISkuNamesAndIds {
  skuId: number;
  skuName: string;
  rowNums: number[];
}

export var getSkuNamesAndIds = (
  workSheet: any,
  columnsNames: string[],
): { skuNamesAndIds: ISkuNamesAndIds[] | [] } => {
  for (var colName of columnsNames) {
    var skuIdColumnName: string | undefined;
    var skuNameColumnName: string | undefined;

    var cellAddress: string = colName + topCellNum;
    var columnTItle: string | undefined = workSheet.getCell(cellAddress)?.value;

    if (columnTItle === skuNameTitleAlias) {
      skuNameColumnName = colName;
    }

    if (columnTItle === skuIdTitleAlias) {
      skuIdColumnName = colName;
    }

    if (skuNameColumnName && skuIdColumnName) {
      break;
    }
  }

  var skuNamesAndIds: ISkuNamesAndIds[] = [];

  if (!skuNameColumnName || !skuIdColumnName) {
    return { skuNamesAndIds: [] };
  }

  var rowNum: number = 2;

  while (rowNum <= workSheet.actualRowCount) {
    var skuNameCellAddresss: string = skuNameColumnName + rowNum;

    var skuName: string | undefined =
      workSheet.getCell(skuNameCellAddresss)?.value;

    if (skuName) {
      var existSku: ISkuNamesAndIds | undefined = skuNamesAndIds.find(
        (sku: ISkuNamesAndIds) => sku?.skuName === skuName,
      );

      if (!existSku) {
        var skuIdCellAddress = skuIdColumnName + rowNum;
        var skuId: string | undefined =
          workSheet.getCell(skuIdCellAddress)?.value;

        if (skuId) {
          skuNamesAndIds.push({
            skuName,
            skuId: +skuId,
            rowNums: [rowNum],
          });
        }
      } else {
        existSku.rowNums.push(rowNum);
      }
    }

    rowNum++;
  }

  return { skuNamesAndIds };
};
