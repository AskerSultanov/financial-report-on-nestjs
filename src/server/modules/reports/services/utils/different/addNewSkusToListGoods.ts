import { addDefaultMetricsToSku } from './addDefaultMetricsToSku.js';
import { IDefaultSkuMetricsField } from './interfaces/addDefaultMetricsToSku.interface.js';

import { IRawListGoods } from '../WBAPI/interfaces/rawListGoods.interface.js';
import * as IGoods from '../../../../../database/interfaces/goods.interface.js';
import { ISku } from '../../../../../database/interfaces/reports/index.interface.js';

export var addNewSkusToListGoods = (
  listGoods: IGoods.ISku[] | IRawListGoods[],
  skuFromReport: {
    id: number;
    name: string;
  }[],
  isCrossYearPeriod: boolean,
  startYear: number,
  endYear: number,
): { listGoodsWithNewSkus: IGoods.ISku[] | [] } => {
  if (!listGoods.length) {
    return { listGoodsWithNewSkus: [] };
  }

  var metrics: [] = [];

  for (var { name, id } of skuFromReport) {
    var listGoodsFilteredBySkuId = listGoods.filter((item) => item.id === id);
    var skuIsExist = listGoodsFilteredBySkuId.find(
      (item) => item.skuName === name,
    );

    if (!skuIsExist) {
      var newSku = { id, skuName: name, metrics, deleted: true };
      listGoods.push(newSku);
    }
  }

  listGoods = addDefaultMetricsToSku(
    listGoods,
    isCrossYearPeriod,
    startYear,
    endYear,
  );

  return { listGoodsWithNewSkus: listGoods };
};

