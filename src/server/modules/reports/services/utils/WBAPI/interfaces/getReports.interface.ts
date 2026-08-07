export interface IWeeklyFinancialReportItem {
  nmId: number;
  rrdId: number;
  forPay: string;
  dateTo: string;
  dateFrom: string;
  saleDt: string;
  quantity: number;
  reportId: number;
  penalty: string;
  vendorCode: string;
  deduction: string;
  reportType: number;
  paidStorage: string;
  retailPrice: string;
  docTypeName: string;
  retailAmount: string;
  deliveryService: string;
  additionalPayment: string;
}

export interface IPaidStorageReportItem {
  date: string;
  logWarehouseCoef: number;
  officeId: number;
  warehouse: string;
  warehouseCoef: number;
  giId: number;
  chrtId: number;
  size: string;
  barcode: string;
  subject: string;
  brand: string;
  vendorCode: string;
  nmId: number;
  volume: number;
  calcType: string;
  warehousePrice: number;
  barcodesCount: number;
  palletPlaceCode: number;
  palletCount: number;
  originalDate: string;
  loyaltyDiscount: number;
  tariffFixDate: string;
  tariffLowerDate: string;
}

export interface IAdvertisingReportItem {
  updNum: number;
  updTime: string;
  updSum: number;
  advertId: number;
  campName: string;
  advertType: number;
  paymentType: string;
  advertStatus: number;
}

export interface IWBAPIReports {
  paidStorageReport: IPaidStorageReportItem[] | [];
  advertisingReport: IAdvertisingReportItem[] | [];
  weeklyFinancialReport: IWeeklyFinancialReportItem[] | [];
}
