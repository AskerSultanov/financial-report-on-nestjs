import { ISku } from '../../../../../database/interfaces/goods.interface.js';

export interface INewSku {
  id: number;
  skuName: string;
}

export function getNewSkusToListGoods(
  listGoods: ISku[],
  skusNamesFromFinancialReports: { name: string; id: number }[],
): { newSkus: INewSku[] } {
  var newSkus: INewSku[] = [];

  for (var { id, name } of skusNamesFromFinancialReports) {
    var listGoodsFilteredBySkuId: ISku[] = listGoods.filter(
      (item) => item.id === id,
    );

    var skuIsExist: ISku | undefined = listGoodsFilteredBySkuId.find(
      (item) => item.skuName === name,
    );

    if (!skuIsExist) {
      var newSku: INewSku = { id, skuName: name };
      newSkus.push(newSku);
    }
  }

  return { newSkus };
}
