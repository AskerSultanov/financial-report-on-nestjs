import { ClientSession } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { WBAPIUtils } from '../WBAPI/index.js';
import { sortYearsTree } from './sortYearTree.js';
import { getNewSkusToListGoods } from './getNewSkusToListGoods.js';
import { ProcessReportSkusService } from '../reportParsing/index.js';

import {
  GoodsModelServices,
  ReportsModelServices,
  TaxParamsModelServices,
  ReportsTreeModelServices,
  ReportLoadingStateModelServices,
} from '../../../../../database/services/index.js';
import { ReportTreeBuilderUtil } from '../reportTreeBuilder/index.js';

import { IWBAPIReports } from '../WBAPI/interfaces/getReports.interface.js';
import { IReport } from '../../../../../database/interfaces/report.interface.js';
import { ISku } from '../../../../../database/interfaces/reportSku.interface.js';
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

@Injectable()
export class ReportsProcessingService {
  constructor(
    private readonly goodsModelServices: GoodsModelServices,
    private readonly reportModelServices: ReportsModelServices,
    private readonly reportTreeBuilderUtil: ReportTreeBuilderUtil,
    private readonly taxParamsModelServices: TaxParamsModelServices,
    private readonly reportTreeModelServices: ReportsTreeModelServices,
    private readonly processReportSkusService: ProcessReportSkusService,
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

    var { reportTree } = await this.reportTreeModelServices.getReportTree(
      userId,
      session,
    );

    var { years, year, month } =
      this.reportTreeBuilderUtil.insertReportToReportTree(
        dateFrom,
        dateTo,
        reportId,
        reportTree,
      );

    var sortedYears = sortYearsTree(years);

    var report: IReport = {
      userId,
      reportId,
      dateFrom,
      dateTo,
      isCrossYearPeriod,
      skus: reportSkus,
      isFinancesAccounted: false,
      recordedTo: { year, month },
      reportIsEmpty: !reportSkus.length,
    };

    await this.reportModelServices.saveReportToDb(report, session);

    await this.reportTreeModelServices.updateReportsTree(
      userId,
      sortedYears,
      session,
    );

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
      reportData: { reportId, year, month, dateFrom, dateTo },
    };
  }
}
