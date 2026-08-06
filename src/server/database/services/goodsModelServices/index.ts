import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';

import { Goods, GoodsDocument } from '../../schemas/goods.schema.js';
import { ISku, ISkuMetrics } from '../../interfaces/goods.interface.js';

import { deleteListGoods } from './utils/deleteListGoods.js';
import { saveNewSkusToDb } from './utils/saveNewSkusToDb.js';
import { updateSkusFields } from './utils/updateSkusFields.js';
import { saveListGoodsToDb } from './utils/saveListGoodsToDb.js';
import { getListGoodsFromDb } from './utils/getListGoodsFromDb.js';
import { getSkuFromListGoods } from './utils/getSkuFromListGoods.js';
import { updateSkuInListGoods } from './utils/updateSkuInListGoods.js';
import { saveUpdatedSkuMetrics } from './utils/saveUpdatedSkuMetrics.js';
import { updateSkuDisableStatus } from './utils/updateSkuDisableStatus.js';
import { updateSingleSku, ISkuPriceData } from './utils/updateSingleSku.js';
import { updateSkusMetricsInListGoods } from './utils/updateSkusMetricsInListGoods.js';
import {
  getSkusLastCostPrice,
  ISkusLastCostPrice,
} from './utils/getSkusLastCostPrice.js';
import {
  setPriceUpdateTimestampAndUpdateStatus,
  IPriceData,
} from './utils/setPriceUpdateTimestampAndUpdateStatus.js';

@Injectable()
export class GoodsModelServices {
  constructor(
    @InjectModel(Goods.name) private goodsModel: Model<GoodsDocument>,
  ) {}

  getListGoodsFromDb: (
    userId: string,
    skuNames: string[],
    session: ClientSession | null | undefined,
  ) => Promise<{ listGoods: ISku[] }> = getListGoodsFromDb;

  getSkuFromListGoods: (
    userId: string,
    skuId: number,
    skuName: string,
    session: ClientSession,
  ) => Promise<{ skuFromListGoods: ISku }> = getSkuFromListGoods;

  getSkusLastCostPrice: (
    userId: string,
  ) => Promise<{ skusLastCostPrice: ISkusLastCostPrice[] }> =
    getSkusLastCostPrice;

  updateSkusFields: (
    userId: string,
    updatedSkus: ISku[],
    session: ClientSession | null | undefined,
  ) => Promise<void> = updateSkusFields;

  updateSingleSku: (
    userId: string,
    sku: ISkuPriceData,
    session: ClientSession | null | undefined,
  ) => Promise<void> = updateSingleSku;

  updateSkuInListGoods: (
    userId: string,
    skuName: string,
    data: ISku,
    session: ClientSession,
  ) => Promise<void> = updateSkuInListGoods;

  updateSkuDisableStatus: (
    userId: string,
    skuName: string,
    disabled: boolean,
  ) => Promise<void> = updateSkuDisableStatus;

  updateSkusMetricsInListGoods: (
    userId: string,
    updatedSkus: ISku[],
    session: ClientSession | null | undefined,
  ) => Promise<void> = updateSkusMetricsInListGoods;

  saveNewSkusToDb: (
    userId: string,
    newSkus: ISku[],
    session: ClientSession | null | undefined,
  ) => Promise<void> = saveNewSkusToDb;

  saveListGoodsToDb: (
    userId: string,
    listGoods: ISku[],
    session: ClientSession | null | undefined,
  ) => Promise<void> = saveListGoodsToDb;

  saveUpdatedSkuMetrics: (
    userId: string,
    skuId: number,
    metrics: ISkuMetrics[],
    session: ClientSession,
  ) => Promise<void> = saveUpdatedSkuMetrics;

  setPriceUpdateTimestampAndUpdateStatus: (
    userId: string,
    priceData: IPriceData[],
    session: ClientSession | null | undefined,
  ) => Promise<void> = setPriceUpdateTimestampAndUpdateStatus;

  deleteListGoods: (userId: string, session: ClientSession) => Promise<void> =
    deleteListGoods;
}
