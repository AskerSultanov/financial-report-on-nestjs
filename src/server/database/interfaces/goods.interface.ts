import { Document } from 'mongoose';

export interface ISkuMetrics {
  year: number;
  qty: number;
  tax: number;
  fines: number;
  netProfit: number;
  profitMargin: number;
  retailAmount: number;
  taxableAmount: number;
  returnAmount: number;
  storageCost: number;
  deliveryCost: number;
  acceptance: number;
  insuranceFee: number;
  otherExpenses: number;
  sellerPayoutAmount: number;
  deductionOrPayment: number;
  additionalInsuranceFee: number;
}

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
  metrics: ISkuMetrics[];
}

export interface IGoods extends Document {
  userId: string;
  listGoods: ISku[];
}
