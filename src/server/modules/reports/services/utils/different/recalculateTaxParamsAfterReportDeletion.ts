import { truncateNum } from '../reportParsing/truncateNum.js';

import { ITaxYear } from '../../../../../database/interfaces/taxParams.interface.js';
import { IReport } from '../../.././../../database/interfaces/reports/index.interface.js';

export var recalculateTaxParamsAfterReportDeletion = (
  taxParams: ITaxYear,
  report: IReport,
  postfix: string = '',
): { updatedTaxParams: ITaxYear } => {
  var finalProfitKey: string = 'totalFinalProfit' + postfix;
  var finalProfit: number = report[finalProfitKey as keyof IReport] as number;

  if (finalProfit) {
    var recalculatedFinalProfit = taxParams.finalProfit - finalProfit;
    taxParams.finalProfit = truncateNum(recalculatedFinalProfit);

    var insuranceFeeKey: string = 'totalInsuranceFee' + postfix;
    var insuranceFee: number = report[
      insuranceFeeKey as keyof IReport
    ] as number;

    var recalculatedInsuranceFee = taxParams.paidInsuranceFee - insuranceFee;
    taxParams.paidInsuranceFee = truncateNum(recalculatedInsuranceFee);
  }

  var taxAmountKey: string = 'totalTaxAmount' + postfix;
  var taxAmount: number = report[taxAmountKey as keyof IReport] as number;
  var recalculatedTaxAmount = taxParams.paidTaxAmount - taxAmount;
  taxParams.paidTaxAmount = truncateNum(recalculatedTaxAmount);

  var retailAmountKey: string = 'totalRetailAmount' + postfix;
  var retailAmount: number = report[retailAmountKey as keyof IReport] as number;

  var recalculatedRetailAmount = taxParams.retailAmount - retailAmount;
  taxParams.retailAmount = truncateNum(recalculatedRetailAmount);

  var taxableAmountKey: string = 'totalTaxableAmount' + postfix;
  var taxableAmount: number = report[
    taxableAmountKey as keyof IReport
  ] as number;
  var recalculatedTaxableAmount = taxParams.taxableAmount - taxableAmount;
  taxParams.taxableAmount = truncateNum(recalculatedTaxableAmount);

  var additionalInsuranceFeeKey: string =
    'totalAdditionalInsuranceFee' + postfix;
  var additionalInsuranceFee: number = report[
    additionalInsuranceFeeKey as keyof IReport
  ] as number;

  var recalculatedAdditionalInsuranceFee =
    taxParams.additionalInsuranceFee - additionalInsuranceFee;
  taxParams.additionalInsuranceFee = truncateNum(
    recalculatedAdditionalInsuranceFee,
  );

  var otherExpensesKey: string = 'totalOtherExpenses' + postfix;
  var otherExpenses: number = report[
    otherExpensesKey as keyof IReport
  ] as number;
  var recalculatedOtherExpenses = taxParams.otherExpenses - otherExpenses;
  taxParams.otherExpenses = truncateNum(recalculatedOtherExpenses);

  return { updatedTaxParams: taxParams };
};
