import { Document } from 'mongoose';

export interface ISku {
  id: number;
  skuName: string;
  price: number;
  discount: number;
  discountedPrice: number;
  clubDiscountedPrice: number;
  deleted: boolean;
  disabled: boolean;
  lastFetch: Date;
  lastUpdated: Date;
  lastCostPrice: number;
  isPriceUpdated: boolean;
  errorText: string;
}

export interface IGoods extends Document {
  userId: string;
  listGoods: ISku[];
}
