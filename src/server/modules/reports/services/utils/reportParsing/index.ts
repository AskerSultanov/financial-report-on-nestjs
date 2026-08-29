import { parseSku } from './parseSku.js';
import { Injectable } from '@nestjs/common';
import { CalcUtils } from '../calcUtil/index.js';
import { getSkuByYear } from './getSkuByYear.js';
import { truncateSkuNums } from './truncateSkuNums.js';
import {
  parsePaidStorageReport,
  ParsedPaidStorageReportResult,
} from './parsePaidStorageReport.js';
import { recalculateSkuAndTaxParams } from './recalculateSkuAndTaxParams.js';
import { getPaidStorageReportByYear } from './getPaidStorageReportByYear.js';
import { getAdvertisingReportByYear } from './getAdvertisingReportByYear.js';
import { getWeeklyFinancialReportByYear } from './getWeeklyFinancialReportByYear.js';
import { getSkuNamesFromPaidStorageReport } from './getSKUNamesFromPaidStorageReport.js';
import { getSkuNamesFromWeeklyFinancialReport } from './getSkuNamesFromWeeklyFinancialReport.js';

import {
  IWBAPIReports,
  IPaidStorageReportItem,
  IAdvertisingReportItem,
  IWeeklyFinancialReportItem,
} from '../WBAPI/interfaces/getReports.interface.js';
import { ISku } from '../../../../../database/interfaces/reportSku.interface.js';
import { ITaxYear } from '../../../../../database/interfaces/taxParams.interface.js';

export interface ReportTotals {
  totalSold: number;
  totalStorageCost: number;
  totalAdvertisingCosts: number;
}

@Injectable()
export class ProcessReportSkusService {
  constructor(private readonly calcUtils: CalcUtils) {}

  async processReportSkus(
    reports: IWBAPIReports,
    taxParams: ITaxYear,
    isCrossYearPeriod: boolean,
  ): Promise<{ skus: ISku[]; recalculatedTaxParams: ITaxYear }> {
    var recalculatedTaxParams: ITaxYear = { ...taxParams };

    var { weeklyFinancialReport, paidStorageReport, advertisingReport } =
      reports;

    var { storageReportByYear } = this.getPaidStorageReportByYear(
      paidStorageReport,
      taxParams.year,
      isCrossYearPeriod,
    );

    var { advertisingReportByYear } = this.getAdvertisingReportByYear(
      advertisingReport,
      taxParams.year,
      isCrossYearPeriod,
    );

    var { weeklyFinancialReportByYear } = this.getWeeklyFinancialReportByYear(
      weeklyFinancialReport,
      taxParams.year,
      isCrossYearPeriod,
    );

    var { parsedPaidStorageReport } =
      this.parsePaidStorageReport(storageReportByYear);

    var totalSold = this.calcUtils.totalSold(weeklyFinancialReportByYear);
    var totalStorageCost = this.calcUtils.totalStorageCost(
      weeklyFinancialReportByYear,
    );

    var totalAdvertisingCosts = this.calcUtils.totalAdvertisingCosts(
      advertisingReportByYear,
    );

    var reportTotals: ReportTotals = {
      totalSold,
      totalStorageCost,
      totalAdvertisingCosts,
    };

    var skus: ISku[] = [];
    var { skuNamesFromWeeklyFinancialReport } =
      this.getSkuNamesFromWeeklyFinancialReport(weeklyFinancialReportByYear);

    for (var name of skuNamesFromWeeklyFinancialReport) {
      var skuFilteredReport = weeklyFinancialReportByYear.filter(
        (sku) => sku.vendorCode === name,
      );
      var skuStorageCost =
        parsedPaidStorageReport.find((item) => item.name === name)
          ?.skuStorageCost || 0;

      var { skuByYear } = this.getSkuByYear(
        skuFilteredReport,
        recalculatedTaxParams.year,
      );

      var sku: ISku | null = await this.parseSku(
        name,
        skuNamesFromWeeklyFinancialReport.length,
        skuByYear,
        skuStorageCost,
        taxParams.taxRate,
        reportTotals,
      );

      if (sku) {
        var { skuAdditionalInsuranceFee, updatedTaxParams } =
          this.recalculateSkuAndTaxParams(sku, recalculatedTaxParams);

        recalculatedTaxParams = Object.assign(
          recalculatedTaxParams,
          updatedTaxParams,
        );
        sku.additionalInsuranceFee = skuAdditionalInsuranceFee;

        skus.push(sku);
      }

      skus = this.truncateSkuNums(skus);
    }

    return { skus, recalculatedTaxParams };
  }

  getSkuByYear: (
    skuFilteredReport: IWeeklyFinancialReportItem[],
    requiredYear: number,
  ) => { skuByYear: IWeeklyFinancialReportItem[] } = getSkuByYear;

  getPaidStorageReportByYear: (
    storageReport: IPaidStorageReportItem[],
    requiredYear: number,
    isCrossYearPeriod: boolean,
  ) => { storageReportByYear: IPaidStorageReportItem[] } =
    getPaidStorageReportByYear;

  getAdvertisingReportByYear: (
    advertisingReport: IAdvertisingReportItem[],
    requiredYear: number,
    isCrossYearPeriod: boolean,
  ) => { advertisingReportByYear: IAdvertisingReportItem[] } =
    getAdvertisingReportByYear;

  getWeeklyFinancialReportByYear: (
    report: IWeeklyFinancialReportItem[],
    requiredYear: number,
    isCrossYearPeriod: boolean,
  ) => { weeklyFinancialReportByYear: IWeeklyFinancialReportItem[] } =
    getWeeklyFinancialReportByYear;

  getSkuNamesFromPaidStorageReport: (
    paidStorageReport: IPaidStorageReportItem[],
  ) => { skuNamesFromPaidStorageReport: string[] } =
    getSkuNamesFromPaidStorageReport;

  getSkuNamesFromWeeklyFinancialReport: (
    report: IWeeklyFinancialReportItem[],
  ) => { skuNamesFromWeeklyFinancialReport: string[] } =
    getSkuNamesFromWeeklyFinancialReport;

  parseSku: (
    skuName: string,
    skuQty: number,
    skuFilteredReport: IWeeklyFinancialReportItem[],
    storageCost: number,
    taxRate: number,
    totals: ReportTotals,
  ) => Promise<ISku | null> = parseSku;

  parsePaidStorageReport: (paidStorageReport: IPaidStorageReportItem[]) => {
    parsedPaidStorageReport: ParsedPaidStorageReportResult[];
  } = parsePaidStorageReport;

  recalculateSkuAndTaxParams: (
    sku: ISku,
    taxParams: ITaxYear,
  ) => { skuAdditionalInsuranceFee: number; updatedTaxParams: ITaxYear } =
    recalculateSkuAndTaxParams;

  truncateSkuNums: (skus: ISku[]) => ISku[] = truncateSkuNums;
}
