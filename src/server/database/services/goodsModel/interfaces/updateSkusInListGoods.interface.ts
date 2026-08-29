export interface IData {
  price?: number;
  discount?: number;
  discountedPrice?: number;
  clubDiscountedPrice?: number;
  deleted?: boolean;
  disabled?: boolean;
  lastFetch?: Date;
  lastUpdated?: Date;
  lastCostPrice?: number;
  isPriceUpdated?: boolean;
  errorText?: string;
}

export interface IUpdateSkusInListGoods {
  skuName?: string;
  data: IData;
}
