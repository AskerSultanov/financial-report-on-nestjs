import { truncateNum } from '../reportParsing/truncateNum.js';

import { IPrevReportTotals } from './getPrevTotalsData.js';
import { ITaxYear } from '../../../../../database/interfaces/taxParams.interface.js';

export var recalculateTaxParams = (
  taxParams: ITaxYear,
  prevReportTotals: IPrevReportTotals,
  currentReportTotals: IPrevReportTotals,
  postfix: string = '',
): { recalculatedTaxParams: ITaxYear } => {
  var finalProfitKey: string = 'totalFinalProfit' + postfix;
  var prevFinalProfit: number = prevReportTotals[
    finalProfitKey as keyof IPrevReportTotals
  ] as number;
  var currentFinalProfit: number = currentReportTotals[
    finalProfitKey as keyof IPrevReportTotals
  ] as number;
  var recalculatedFinalProfit: number =
    taxParams.finalProfit - prevFinalProfit + currentFinalProfit;

  var otherExpensesKey: string = 'totalOtherExpenses' + postfix;
  var prevOtherExpenses: number = prevReportTotals[
    otherExpensesKey as keyof IPrevReportTotals
  ] as number;
  var currentOtherExpenses: number = currentReportTotals[
    otherExpensesKey as keyof IPrevReportTotals
  ] as number;
  var recalculatedOtherExpenses: number =
    taxParams.otherExpenses - prevOtherExpenses + currentOtherExpenses;

  var insuranceFeeKey: string = 'totalInsuranceFee' + postfix;
  var prevInsuranceFee: number = prevReportTotals[
    insuranceFeeKey as keyof IPrevReportTotals
  ] as number;
  var currentInsuranceFee: number = currentReportTotals[
    insuranceFeeKey as keyof IPrevReportTotals
  ] as number;
  var recalculatedInsuranceFee =
    taxParams.paidInsuranceFee - prevInsuranceFee + currentInsuranceFee;

  taxParams.finalProfit = truncateNum(recalculatedFinalProfit);
  taxParams.otherExpenses = truncateNum(recalculatedOtherExpenses);
  taxParams.paidInsuranceFee = truncateNum(recalculatedInsuranceFee);

  return { recalculatedTaxParams: taxParams };
};
