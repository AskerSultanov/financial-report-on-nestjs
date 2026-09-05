import { ClientSession } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { getNewSkusToListGoods } from './getNewSkusToListGoods.js';
import { ProcessReportSkusService } from '../reportParsing/index.js';
import { getReportTargetYearAndMonth } from './getReportTargetYearAndMonth.js';

import {
  GoodsModelServices,
  ReportsModelServices,
  TaxParamsModelServices,
  ReportLoadingStateModelServices,
  ReportPeriodsModelServices,
} from '../../../../../database/services/index.js';

import { IWBAPIReports } from '../WBAPI/interfaces/getReports.interface.js';
import { IReport } from '../../../../../database/interfaces/report.interface.js';
import { ISku } from '../../../../../database/interfaces/reportSku.interface.js';
import { IReportPeriodsItem } from '../../../../../database/interfaces/reportPeriods.interface.js';
import { IUpdatedTaxYear } from '../../../../../database/services/taxParamsModel/interfaces/updatedTaxYear.interface.js';

export interface ProcessReportsResult {
  reportPeriodIsEmpty: boolean;
  reportData: Partial<{
    year: number;
    month: string;
    dateTo: string;
    dateFrom: string;
    reportId: number;
  }>;
}

var selectedFields: string[] = ['listGoods.id', 'listGoods.skuName'];
var monthList: string[] = [
  'январь',
  'февраль',
  'марта',
  'апрель',
  'май',
  'июнь',
  'июль',
  'август',
  'сентябрь',
  'октябрь',
  'ноябрь',
  'декабрь',
];

@Injectable()
export class ReportsProcessingService {
  constructor(
    private readonly goodsModelServices: GoodsModelServices,
    private readonly reportModelServices: ReportsModelServices,
    private readonly taxParamsModelServices: TaxParamsModelServices,
    private readonly processReportSkusService: ProcessReportSkusService,
    private readonly reportPeriodsModelServices: ReportPeriodsModelServices,
    private readonly reportLoadingStateModelServices: ReportLoadingStateModelServices,
  ) {}

  async processReports(
    userId: string,
    dateFrom: string,
    dateTo: string,
    session: ClientSession,
    reports: IWBAPIReports,
    isReportFromFile: boolean = false,
  ): Promise<ProcessReportsResult> {
    var startYear: number = +dateFrom.split('-')[0];
    var endYear: number = +dateTo.split('-')[0];
    var isCrossYearPeriod: boolean = startYear !== endYear;
    var reportId: number = reports.weeklyFinancialReport[0].reportId;

    var reportSkus: ISku[] = [];
    var updatedTaxParams: IUpdatedTaxYear[] = [];

    var { targetYear, targetMonthIndex } = getReportTargetYearAndMonth(
      dateFrom,
      dateTo,
    );

    for (var currentYear = startYear; currentYear <= endYear; currentYear++) {
      var taxParams = await this.taxParamsModelServices.addNewTaxYearToDb(
        userId,
        currentYear,
        session,
      );

      if (!taxParams) {
        continue;
      }

      var { skus, recalculatedTaxParams } =
        await this.processReportSkusService.processReportSkus(
          reports,
          taxParams,
          isCrossYearPeriod,
        );

      reportSkus.push(...skus);
      updatedTaxParams.push({ year: currentYear, data: recalculatedTaxParams });
    }

    var report: IReport = {
      userId,
      reportId,
      dateFrom,
      dateTo,
      isCrossYearPeriod,
      skus: reportSkus,
      isFinancesAccounted: false,
      recordedTo: { year: targetYear, month: monthList[targetMonthIndex] },
      reportIsEmpty: !reportSkus.length,
    };

    var newReportPeriod: IReportPeriodsItem = {
      reportId,
      dateFrom,
      dateTo,
      year: targetYear,
      monthIndex: targetMonthIndex,
      monthName: monthList[targetMonthIndex],
    };

    await this.reportPeriodsModelServices.addReportToReportPeriods(
      userId,
      newReportPeriod,
      session,
    );

    await this.reportModelServices.saveReportToDb(report, session);

    if (!isReportFromFile) {
      await this.reportLoadingStateModelServices.setLastReportRequestTimestamp(
        userId,
        session,
      );
    }

    if (report.skus.length) {
      await this.taxParamsModelServices.updateTaxParamsToDb(
        userId,
        updatedTaxParams,
        session,
      );

      var skuNames: string[] = report.skus.map((sku) => sku.skuName);

      var { listGoods } = await this.goodsModelServices.getListGoodsFromDb(
        userId,
        skuNames,
        selectedFields,
        session,
      );

      var skuNamesAndIds: { name: string; id: number }[] = report.skus.map(
        (sku) => {
          return { name: sku.skuName, id: sku.id };
        },
      );

      var { newSkus } = getNewSkusToListGoods(listGoods, skuNamesAndIds);

      if (newSkus.length) {
        await this.goodsModelServices.saveNewSkusToDb(userId, newSkus, session);
      }
    } else {
      await this.reportLoadingStateModelServices.addReportToEmptyReportPeriods(
        userId,
        dateFrom,
        dateTo,
        session,
      );

      return { reportPeriodIsEmpty: report.reportIsEmpty, reportData: {} };
    }

    return {
      reportPeriodIsEmpty: report.reportIsEmpty,
      reportData: {
        reportId,
        dateFrom,
        dateTo,
        month: monthList[targetMonthIndex],
        year: targetYear,
      },
    };
  }
}
