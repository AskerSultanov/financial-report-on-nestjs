import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';

import { Goods, GoodsDocument } from '../../schemas/goods.schema.js';
import { ISku } from '../../interfaces/goods.interface.js';

import { deleteListGoods } from './utils/deleteListGoods.js';
import { saveNewSkusToDb } from './utils/saveNewSkusToDb.js';
import { saveListGoodsToDb } from './utils/saveListGoodsToDb.js';
import { getListGoodsFromDb } from './utils/getListGoodsFromDb.js';
import { getSkuFromListGoods } from './utils/getSkuFromListGoods.js';
import { updateSkuInListGoods } from './utils/updateSkuInListGoods.js';
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
    selectedFields: {},
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

  updateSkuInListGoods: (
    userId: string,
    skuName: string,
    data: ISku,
    session: ClientSession,
  ) => Promise<void> = updateSkuInListGoods;

  saveNewSkusToDb: (
    userId: string,
    newSkus: { skuName: string; id: number }[],
    session: ClientSession | null | undefined,
  ) => Promise<void> = saveNewSkusToDb;

  saveListGoodsToDb: (
    userId: string,
    listGoods: ISku[],
    session: ClientSession | null | undefined,
  ) => Promise<void> = saveListGoodsToDb;

  setPriceUpdateTimestampAndUpdateStatus: (
    userId: string,
    priceData: IPriceData[],
    session: ClientSession | null | undefined,
  ) => Promise<void> = setPriceUpdateTimestampAndUpdateStatus;

  deleteListGoods: (userId: string, session: ClientSession) => Promise<void> =
    deleteListGoods;
}
