import { truncateNum } from '../../reportParsing/truncateNum.js';

import {
  IReport,
  ISku,
} from '../../../../../../database/interfaces/reportSku.interface.js';

export function calcRestReportTotalParams(
  totals: IReport,
  prevSkuData: ISku,
  newSkuData: ISku,
  isCrossYearPeriod: boolean,
  postfix: string = '',
): { updatedTotals: IReport } {
  if (isCrossYearPeriod) {
    //preTaxProfit
    var totalPreTaxProfitKey: string = 'totalPreTaxProfit' + postfix;
    var prevSkuDataPreTaxProfitKey: string = 'preTaxProfit' + postfix;
    var newSkuDataPreTaxProfitKey: string = 'preTaxProfit' + postfix;

    var totalPreTaxProfit: number = totals[
      totalPreTaxProfitKey as keyof IReport
    ] as number;
    var prevSkuDataPreTaxProfit: number = prevSkuData[
      prevSkuDataPreTaxProfitKey as keyof ISku
    ] as number;
    var newSkuDataPreTaxProfit: number = newSkuData[
      newSkuDataPreTaxProfitKey as keyof ISku
    ] as number;
    var recalculatedPreTaxProfit: number =
      totalPreTaxProfit - prevSkuDataPreTaxProfit + newSkuDataPreTaxProfit;

    //finalProfit
    var totalFinalProfitKey: string = 'totalFinalProfit' + postfix;
    var prevSkuDataFinalProfitKey: string = 'finalProfit' + postfix;
    var newSkuDataFinalProfitKey: string = 'finalProfit' + postfix;

    var totalFinalProfit: number = totals[
      totalFinalProfitKey as keyof IReport
    ] as number;
    var prevSkuDataFinalProfit: number = prevSkuData[
      prevSkuDataFinalProfitKey as keyof ISku
    ] as number;
    var newSkuDataFinalProfit: number = newSkuData[
      newSkuDataFinalProfitKey as keyof ISku
    ] as number;
    var recalculatedFinalProfit: number =
      totalFinalProfit - prevSkuDataFinalProfit + newSkuDataFinalProfit;

    //productCosts
    var totalProductCostsKey: string = 'totalProductCosts' + postfix;
    var prevSkuDataProductCostsKey: string = 'productCosts' + postfix;
    var newSkuDataProductCostsKey: string = 'productCosts' + postfix;

    var totalProductCosts: number = totals[
      totalProductCostsKey as keyof IReport
    ] as number;
    var prevSkuDataProductCosts: number = prevSkuData[
      prevSkuDataProductCostsKey as keyof ISku
    ] as number;
    var newSkuDataProductCosts: number = newSkuData[
      newSkuDataProductCostsKey as keyof ISku
    ] as number;
    var recalculatedProductCosts: number =
      totalProductCosts - prevSkuDataProductCosts + newSkuDataProductCosts;

    //insuranceFee
    var totalInsuranceFeeKey: string = 'totalInsuranceFee' + postfix;
    var prevSkuDataInsuranceFeeKey: string = 'insuranceFee' + postfix;
    var newSkuDataInsuranceFeeKey: string = 'insuranceFee' + postfix;

    var totalInsuranceFee: number = totals[
      totalInsuranceFeeKey as keyof IReport
    ] as number;
    var prevSkuDataInsuranceFee: number = prevSkuData[
      prevSkuDataInsuranceFeeKey as keyof ISku
    ] as number;
    var newSkuDataInsuranceFee: number = newSkuData[
      newSkuDataInsuranceFeeKey as keyof ISku
    ] as number;
    var recalculatedInsuranceFee: number =
      totalInsuranceFee - prevSkuDataInsuranceFee + newSkuDataInsuranceFee;

    //otherExpenses
    var totalOtherExpensesKey: string = 'totalOtherExpenses' + postfix;
    var prevSkuDataOtherExpensesKey: string = 'otherExpenses' + postfix;
    var newSkuDataOtherExpensesKey: string = 'otherExpenses' + postfix;

    var totalOtherExpenses: number = totals[
      totalOtherExpensesKey as keyof IReport
    ] as number;
    var prevSkuDataOtherExpenses: number = prevSkuData[
      prevSkuDataOtherExpensesKey as keyof ISku
    ] as number;
    var newSkuDataOtherExpenses: number = newSkuData[
      newSkuDataOtherExpensesKey as keyof ISku
    ] as number;
    var recalculatedOtherExpenses: number =
      totalOtherExpenses - prevSkuDataOtherExpenses + newSkuDataOtherExpenses;

    //margin
    var totalProfitMarginKey: string = 'totalProfitMargin' + postfix;
    var totalFinalProfitKey: string = 'totalFinalProfit' + postfix;
    var totalRetailAmountKey: string = 'totalRetailAmount' + postfix;

    var totalFinalProfit: number = totals[
      totalFinalProfitKey as keyof IReport
    ] as number;
    var totalRetailAmount: number = totals[
      totalRetailAmountKey as keyof IReport
    ] as number;
    Object.assign(totals, {
      [totalPreTaxProfitKey]: truncateNum(recalculatedPreTaxProfit),
      [totalFinalProfitKey]: truncateNum(recalculatedFinalProfit),
      [totalProductCostsKey]: truncateNum(recalculatedProductCosts),
      [totalInsuranceFeeKey]: truncateNum(recalculatedInsuranceFee),
      [totalOtherExpensesKey]: truncateNum(recalculatedOtherExpenses),
      [totalProfitMarginKey]: this.calcProfitMargin(
        totalFinalProfit,
        totalRetailAmount,
      ),
    });

    //

    var recalculatedTotalPreTaxProfit: number =
      totals.totalPreTaxProfitInCurrentYear! +
      totals.totalPreTaxProfitInNextYear!;
    totals.totalPreTaxProfit = truncateNum(recalculatedTotalPreTaxProfit);

    var recalculatedTotalFinalProfit: number =
      totals.totalFinalProfitInCurrentYear! +
      totals.totalFinalProfitInNextYear!;
    totals.totalFinalProfit = truncateNum(recalculatedTotalFinalProfit);

    var recalculatedTotalProductCosts: number =
      totals.totalProductCostsInCurrentYear! +
      totals.totalProductCostsInNextYear!;
    totals.totalProductCosts = truncateNum(recalculatedTotalProductCosts);

    var recalculatedTotalInsuranceFee: number =
      totals.totalInsuranceFeeInCurrentYear! +
      totals.totalInsuranceFeeInNextYear!;
    totals.totalInsuranceFee = truncateNum(recalculatedTotalInsuranceFee);

    var recalculatedTotalOtherExpenses: number =
      totals.totalOtherExpensesInCurrentYear +
      totals.totalOtherExpensesInNextYear;
    totals.totalOtherExpenses = truncateNum(recalculatedTotalOtherExpenses);
  } else {
    var recalculatedTotalPreTaxProfit: number =
      totals.totalPreTaxProfit -
      prevSkuData.preTaxProfit +
      newSkuData.preTaxProfit;
    totals.totalPreTaxProfit = truncateNum(recalculatedTotalPreTaxProfit);

    var recalculatedTotalFinalProfit: number =
      totals.totalFinalProfit -
      prevSkuData.finalProfit +
      newSkuData.finalProfit;
    totals.totalFinalProfit = truncateNum(recalculatedTotalFinalProfit);

    var recalculatedTotalProductCosts: number =
      totals.totalProductCosts -
      prevSkuData.costPrice * prevSkuData.qty +
      newSkuData.costPrice * newSkuData.qty;
    totals.totalProductCosts = truncateNum(recalculatedTotalProductCosts);

    var recalculatedTotalInsuranceFee: number =
      totals.totalInsuranceFee -
      prevSkuData.insuranceFee +
      newSkuData.insuranceFee;
    totals.totalInsuranceFee = truncateNum(recalculatedTotalInsuranceFee);

    var recalculatedTotalOtherExpenses: number =
      totals.totalOtherExpenses -
      prevSkuData.otherExpenses +
      newSkuData.otherExpenses;
    totals.totalOtherExpenses = truncateNum(recalculatedTotalOtherExpenses);
  }

  totals.totalProfitMargin = this.calcProfitMargin(
    totals.totalFinalProfit,
    totals.totalRetailAmount,
  );

  return { updatedTotals: totals };
}

export default calcRestReportTotalParams;
