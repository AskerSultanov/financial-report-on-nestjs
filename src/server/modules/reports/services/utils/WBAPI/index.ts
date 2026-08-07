import { getReports } from './reports/index.js';
import { getGoodsListFromWBAPI } from './goods/goodsInfo/getGoodsListFromWBAPI.js';
import { setPricesAndDiscounts } from './goods/pricesAndDiscounts/setPriceAndDiscount.js';
import { getPriceUploadDetails } from './goods/pricesAndDiscounts/getPriceUploadDetails.js';
import { getProcessedPricingInfo } from './goods/pricesAndDiscounts/getProcessedPricingInfo.js';
import { getPricesAndDiscountsByListGoods } from './goods/pricesAndDiscounts/getPricesAndDiscountsByListGoods.js';

import { IWBAPIReports } from './interfaces/getReports.interface.js';
import { IHistoryGoods } from './interfaces/historyGoods.interface.js';
import { IRawListGoods } from './interfaces/rawListGoods.interface.js';
import { IProcessedPricingInfo } from './interfaces/processedPricingInfo.interface.js';
import { IPriceAndDiscount } from './interfaces/weeklyPricesAndDiscounts.interface.js';

export class WBAPIUtils {
  constructor() {}

  getReports: (
    userId: string,
    dateFrom: string,
    dateTo: string,
    token: string,
  ) => Promise<IWBAPIReports> = getReports;

  getGoodsListFromWBAPI: (
    userId: string,
    token: string,
  ) => Promise<{ rawListGoogs: IRawListGoods } | undefined> =
    getGoodsListFromWBAPI;

  getPriceUploadDetails: (
    userId: string,
    uploadId: number,
    token: string,
  ) => Promise<{ historyGoods: IHistoryGoods }> = getPriceUploadDetails;

  getProcessedPricingInfo: (
    userId: string,
    uploadID: number,
    token: string,
  ) => Promise<IProcessedPricingInfo> = getProcessedPricingInfo;

  getPricesAndDiscountsByListGoods: (
    userId: string,
    token: string,
    nmList: number[],
  ) => Promise<{
    rawListGoods: IRawListGoods;
  }> = getPricesAndDiscountsByListGoods;

  setPricesAndDiscounts: (
    userId: string,
    token: string,
    weeklyPricesAndDiscounts: IPriceAndDiscount[],
  ) => Promise<{ id: number; alreadyExists: boolean }> = setPricesAndDiscounts;
}
