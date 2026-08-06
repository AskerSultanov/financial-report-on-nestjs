import { Document } from 'mongoose';

export interface IPriceAndDiscount {
  nmID: number;
  price: number;
  discount: number;
}

export interface ISku {
  nmID: number;
  dayIndex?: number;
  needToUpdate: boolean;
  lastUpdatedTimestamp: number;
  data?: IPriceAndDiscount;
  updateInterval: string;
  changePriceIfInPromo: boolean;
  updateIntervalInMs: number;
  updateOption: 'interval' | 'oncePerDay';
}

export interface IWeeklyPricesAndDiscounts extends Document {
  userId: string;
  uploadId?: number;
  weeklyPricesAndDiscounts?: ISku[];
}
