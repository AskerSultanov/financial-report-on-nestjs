import { IReport } from '../../../../../database/interfaces/reports/index.interface.js';

export interface IPrevReportTotals {
  totalFinalProfit?: number;
  totalProfitMargin?: number;
  totalInsuranceFee?: number;
  totalOtherExpenses?: number;
  totalFinalProfitInCurrentYear?: number;
  totalProfitMarginInCurrentYear?: number;
  totalInsuranceFeeInCurrentYear?: number;
  totalOtherExpensesInCurrentYear?: number;
  totalFinalProfitInNextYear?: number;
  totalProfitMarginInNextYear?: number;
  totalInsuranceFeeInNextYear?: number;
  totalOtherExpensesInNextYear?: number;
}

export var getPrevTotalsData = (totals: IReport): IPrevReportTotals => {
  var prevData: IPrevReportTotals = {};

  prevData.totalFinalProfit = totals.totalFinalProfit;
  prevData.totalProfitMargin = totals.totalProfitMargin;
  prevData.totalInsuranceFee = totals.totalInsuranceFee;
  prevData.totalOtherExpenses = totals.totalOtherExpenses;

  if (totals.isCrossYearPeriod) {
    prevData.totalFinalProfitInCurrentYear =
      totals.totalFinalProfitInCurrentYear;
    prevData.totalProfitMarginInCurrentYear =
      totals.totalProfitMarginInCurrentYear;
    prevData.totalInsuranceFeeInCurrentYear =
      totals.totalInsuranceFeeInCurrentYear;
    prevData.totalOtherExpensesInCurrentYear =
      totals.totalOtherExpensesInCurrentYear;

    prevData.totalFinalProfitInNextYear = totals.totalFinalProfitInNextYear;
    prevData.totalProfitMarginInNextYear = totals.totalProfitMarginInNextYear;
    prevData.totalInsuranceFeeInNextYear = totals.totalInsuranceFeeInNextYear;
    prevData.totalOtherExpensesInNextYear = totals.totalOtherExpensesInNextYear;
  }

  return prevData;
};
