import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ClientSession } from 'mongoose';
import {
  WeeklyPricesAndDiscounts,
  WeeklyPricesAndDiscountsDocument,
} from '../../schemas/weeklyPricesAndDiscounts.schema.js';

import {
  ISku,
  IPriceAndDiscount,
  IWeeklyPricesAndDiscounts,
} from '../../interfaces/weeklyPricesAndDiscounts.interface.js';

import { setUploadId } from './utils/setUploadId.js';
import { getUploadId } from './utils/getUploadId.js';
import { updatePriceAndDiscount } from './utils/updatePriceAndDiscount.js';
import { setWeeklyPricesAndDiscounts } from './utils/setWeeklyPricesAndDiscounts.js';
import { getWeeklyPricesAndDiscounts } from './utils/getWeeklyPricesAndDiscounts.js';
import { deleteWeeklyPricesAndDiscounts } from './utils/deleteWeeklyPricesAndDiscounts.js';
import { getAllUserWeeklyPricesAndDiscounts } from './utils/getAllUserWeeklyPricesAndDiscounts.js';
import { getTodayPricesAndDiscountsByDayIndex } from './utils/getTodayPricesAndDiscountsByDayIndex.js';

@Injectable()
export class WeeklyPricesAndDiscountsModelServices {
  constructor(
    @InjectModel(WeeklyPricesAndDiscounts.name)
    private weeklyPricesAndDiscountsModel: Model<WeeklyPricesAndDiscountsDocument>,
  ) {}

  getUploadId: (userId: string) => Promise<{ uploadId: number | null }> =
    getUploadId;

  getWeeklyPricesAndDiscounts: (
    userId: string,
  ) => Promise<{ weeklyPricesAndDiscounts: IWeeklyPricesAndDiscounts }> =
    getWeeklyPricesAndDiscounts;

  getAllUserWeeklyPricesAndDiscounts: () => Promise<
    IWeeklyPricesAndDiscounts[]
  > = getAllUserWeeklyPricesAndDiscounts;

  getTodayPricesAndDiscountsByDayIndex: (
    currentDayIndex: number,
  ) => Promise<{ userId: string; currentyDayPricesAndDiscounts: ISku }[]> =
    getTodayPricesAndDiscountsByDayIndex;

  updatePriceAndDiscount: (
    userId: string,
    skuId: number,
    skuDataToUpdate: IPriceAndDiscount,
    checkedWeekDays: [number],
  ) => Promise<boolean> = updatePriceAndDiscount;

  setUploadId: (
    userId: string,
    uploadId: number,
    session: ClientSession | null | undefined,
  ) => Promise<void> = setUploadId;

  setWeeklyPricesAndDiscounts: (
    userId: string,
    weeklyPricesAndDiscounts: IWeeklyPricesAndDiscounts,
    session: ClientSession,
  ) => Promise<boolean> = setWeeklyPricesAndDiscounts;

  deleteWeeklyPricesAndDiscounts: (userId: string) => Promise<void> =
    deleteWeeklyPricesAndDiscounts;
}
