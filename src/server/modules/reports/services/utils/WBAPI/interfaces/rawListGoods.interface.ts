interface ISize {
  sizeID: bigint;
  vendorCode: string;
  techSizeName: number;
  discountedPrice: number;
  clubDiscountedPrice: number;
}

interface IWholesaleDiscountThreshold {
  level: number;
  minQuantity: number;
  wholesaleDiscount: number;
}

export interface IRawListGoods {
  nmID: number;
  vendorCode: string;
  sizes: ISize[];
  currencyIsoCode4217: string;
  discount: number;
  clubDiscount: number;
  editableSizePrice: boolean;
  wholesaleDiscountThreshold: IWholesaleDiscountThreshold[];
  isBadTurnover: boolean;
}
