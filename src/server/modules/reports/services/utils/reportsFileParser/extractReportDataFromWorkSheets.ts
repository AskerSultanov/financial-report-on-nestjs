import { aggregatePaidStorageReportData } from './aggregatePaidStorageReportData.js';
import { aggregateWeeklyFinancialReports } from './aggregateWeeklyFinancialReports.js';

import { IOnePeriodReports } from './extractWorkSheetFromFile.js';
import {
  IPaidStorageReportItem,
  IWeeklyFinancialReportItem,
} from '../WBAPI/interfaces/getReports.interface.js';
var extractReportDataFromWorkSheets = async (
  onePeriodReports: IOnePeriodReports,
): Promise<{
  reportPeriodIsEmpty: boolean;
  reports: {
    advertisingReport: [];
    paidStorageReport: IPaidStorageReportItem[];
    weeklyFinancialReport: IWeeklyFinancialReportItem[];
  };
}> => {
  var { paidStorageReport } = aggregatePaidStorageReportData(
    onePeriodReports?.paidStorageReports!,
  );

  var { weeklyFinancialReport, paidStorageReport } =
    aggregateWeeklyFinancialReports(
      onePeriodReports.weeklyFinancialReports!,
      paidStorageReport,
    );

  return {
    reportPeriodIsEmpty: !weeklyFinancialReport.length,
    reports: {
      paidStorageReport,
      advertisingReport: [],
      weeklyFinancialReport,
    },
  };
};

export default extractReportDataFromWorkSheets;
