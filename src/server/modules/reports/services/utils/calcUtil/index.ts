import { sum } from './utils/sum.js';
import { calcQuantity } from './utils/quantity.js';
import { calcTaxAmount } from './utils/taxAmount.js';
import { calcTotalSold } from './utils/totalSold.js';
import { calcFinalProfit } from './utils/finalProfit.js';
import { calcProfitMargin } from './utils/profitMargin.js';
import { calcPreTaxProfit } from './utils/preTaxProfit.js';
import { calcRetailAmount } from './utils/retailAmount.js';
import { calcInsuranceFee } from './utils/insuranceFee.js';
import { calcReturnAmount } from './utils/returnAmount.js';
import { calcAverageProfit } from './utils/averageProfit.js';
import {
  calcRestSkuParams,
  CalcRestSkuParamsResult,
} from './utils/restSkuParams.js';
import { calcTotalStorageCost } from './utils/totalStorageCost.js';
import { calcTotalProductCosts } from './utils/totalProductCosts.js';
import { IStorageData, calcStorageCost } from './utils/storageCost.js';
import { calcSellerPayoutAmount } from './utils/sellerPayoutAmount.js';
import { calcAverageStorageCost } from './utils/averageStorageCost.js';
import { calcTaxableAmountOfReport } from './utils/taxableAmountOfReport.js';
import { calcRestReportTotalParams } from './utils/restReportTotalParams.js';
import { recalculateInsuranceFee } from './utils/recalculateInsuranceFee.js';
import { caclAverageAdvertisingCost } from './utils/averageAdvertisingCost.js';
import { calcSkuStorageCostFromPaidStorageReport } from './utils/skuStorageCostFromPaidStorageReport.js';
import { calculateTotalAdvertisingCosts } from './utils/totalAdvertisingCosts.js';

import { ITaxYear } from '../../../../../database/interfaces/taxParams.interface.js';
import {
  IPaidStorageReportItem,
  IAdvertisingReportItem,
  IWeeklyFinancialReportItem,
} from '../WBAPI/interfaces/getReports.interface.js';
import { ISku } from '../../../../../database/interfaces/reportSku.interface.js';
import { IReport } from '../../../../../database/interfaces/report.interface.js';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CalcUtils {
  sum: <Item extends ISku | IWeeklyFinancialReportItem>(
    data: Item[],
    filedName: keyof Item,
    truncate: string,
  ) => number = sum;

  qty: (report: IWeeklyFinancialReportItem[]) => number = calcQuantity;

  taxAmount: (taxableAmount: number, taxRate: number) => number = calcTaxAmount;

  storageCost: (skuName: string, storageData: IStorageData[]) => number =
    calcStorageCost;

  retailAmount: (report: IWeeklyFinancialReportItem[]) => number =
    calcRetailAmount;

  returnAmount: (report: IWeeklyFinancialReportItem[]) => number =
    calcReturnAmount;

  sellerPayout: (report: IWeeklyFinancialReportItem[]) => number =
    calcSellerPayoutAmount;

  totalSold: (report: IWeeklyFinancialReportItem[]) => number = calcTotalSold;

  totalStorageCost: (report: IWeeklyFinancialReportItem[]) => number =
    calcTotalStorageCost;

  totalProductCosts: (skus: ISku[]) => number = calcTotalProductCosts;

  totalAdvertisingCosts: (adReport: IAdvertisingReportItem[]) => number =
    calculateTotalAdvertisingCosts;

  preTaxProfit: (sku: ISku) => number = calcPreTaxProfit;

  finalProfit: (sku: ISku) => number = calcFinalProfit;

  profitMargin: (finalProfit: number, retailAmount: number) => number =
    calcProfitMargin;

  insuranceFee: (
    preTaxProfit: number,
    insuranceFeePercentage: number,
  ) => number = calcInsuranceFee;

  taxableAmountOfReport: (report: IWeeklyFinancialReportItem[]) => number =
    calcTaxableAmountOfReport;

  recalculateInsuranceFee: (
    sku: ISku,
    taxParams: ITaxYear,
  ) => {
    skuWithRecalculatedInsuranceFee: ISku;
    taxParamsWithRecalculatedInsuranceFee: ITaxYear;
  } = recalculateInsuranceFee;

  restSkuParams: (
    sku: ISku,
    prevSkuData: ISku,
    taxParams: ITaxYear,
  ) => CalcRestSkuParamsResult = calcRestSkuParams;

  restReporTotalParams: (
    totals: IReport,
    prevSkuData: ISku,
    newSkuData: ISku,
    isCrossYearPeriod: boolean,
  ) => { updatedTotals: IReport } = calcRestReportTotalParams;

  skuStorageCostFromPaidStorageReport: (
    report: IPaidStorageReportItem[],
    skuName: string,
  ) => number = calcSkuStorageCostFromPaidStorageReport;

  avrgAdvertisingCost: (
    skuQty: number,
    totalAdvertisingCosts: number,
  ) => number = caclAverageAdvertisingCost;

  avrgProfit: (sku: ISku) => number = calcAverageProfit;

  avrgStorageCost: (
    totalStorageCost: number,
    totalSold: number,
    qty: number,
  ) => number = calcAverageStorageCost;
}

export {
  sum,
  calcQuantity,
  calcTaxAmount,
  calcTotalSold,
  calcFinalProfit,
  calcProfitMargin,
  calcPreTaxProfit,
  calcRetailAmount,
  calcInsuranceFee,
  calcReturnAmount,
  calcAverageProfit,
  calcRestSkuParams,
  calcTotalStorageCost,
  calcTotalProductCosts,
  calcStorageCost,
  calcSellerPayoutAmount,
  calcAverageStorageCost,
  calcTaxableAmountOfReport,
  calcRestReportTotalParams,
  recalculateInsuranceFee,
  caclAverageAdvertisingCost,
  calcSkuStorageCostFromPaidStorageReport,
};
