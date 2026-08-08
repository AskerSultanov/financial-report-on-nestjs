import sum from "./sum.js";
import calcProfitMargin from "./profitMargin.js";
import calcProductCosts from "./totalProductCosts.js";
import truncateNum from "../../reportParsing/truncateNum.js";

import {IReport, ISku} from '../../../../../../database/interfaces/repots/index.interface.js'

var calcRestReportTotalParams = (totals: IReport, prevSkuData: ISku, newSkuData: ISku, isCrossYearPeriod: boolean, postfix: string = ""): {updatedTotals: IReport} => {
  if (isCrossYearPeriod) {
    //preTaxProfit
    var totalPreTaxProfitKey = "totalPreTaxProfit" + postfix; 
    var prevSkuDataPreTaxProfitKey = "preTaxProfit" + postfix;
    var newSkuDataPreTaxProfitKey = "preTaxProfit" + postfix;

    var totalPreTaxProfit = totals[totalPreTaxProfitKey as keyof IReport] as number;
    var prevSkuDataPreTaxProfit = prevSkuData[prevSkuDataPreTaxProfitKey as keyof ISku] as number;
    var newSkuDataPreTaxProfit = newSkuData[newSkuDataPreTaxProfitKey as keyof ISku] as number;
    var recalculatedPreTaxProfit: number= totalPreTaxProfit - prevSkuDataPreTaxProfit + newSkuDataPreTaxProfit;
    Object.assign(totals, { [totalPreTaxProfitKey]: truncateNum(recalculatedPreTaxProfit) });

    //finalProfit
    var totalFinalProfitKey = 'totalFinalProfit' + postfix
    var prevSkuDataFinalProfitKey = "finalProfit" + postfix;
    var newSkuDataFinalProfitKey = "finalProfit" + postfix;

    var totalFinalProfit = totals[totalFinalProfitKey as keyof IReport] as number;
    var prevSkuDataFinalProfit = prevSkuData[prevSkuDataFinalProfitKey as keyof ISku] as number;
    var newSkuDataFinalProfit = newSkuData[newSkuDataFinalProfitKey as keyof ISku] as number;
    var recalculatedFinalProfit: number= totalFinalProfit - prevSkuDataFinalProfit + newSkuDataFinalProfit;
    Object.assign(totals, { [totalFinalProfitKey]: truncateNum(recalculatedFinalProfit) });

    //productCosts
        var totalProductCostsKey = 'totalProductCosts' + postfix
    var prevSkuDataProductCostsKey = "productCosts" + postfix;
    var newSkuDataProductCostsKey = "productCosts" + postfix;

    var totalProductCosts = totals[totalProductCostsKey as keyof IReport] as number;
    var prevSkuDataProductCosts = prevSkuData[prevSkuDataProductCostsKey as keyof ISku] as number;
    var newSkuDataProductCosts = newSkuData[newSkuDataProductCostsKey as keyof ISku] as number;
    var recalculatedProductCosts: number= totalProductCosts - prevSkuDataProductCosts + newSkuDataProductCosts;
    Object.assign(totals, { [totalProductCostsKey]: truncateNum(recalculatedProductCosts) });


    //insuranceFee
        var totalInsuranceFeeKey = 'totalInsuranceFee' + postfix
    var prevSkuDataInsuranceFeeKey = "insuranceFee" + postfix;
    var newSkuDataInsuranceFeeKey = "insuranceFee" + postfix;

    var totalInsuranceFee = totals[totalInsuranceFeeKey as keyof IReport] as number;
    var prevSkuDataInsuranceFee = prevSkuData[prevSkuDataInsuranceFeeKey as keyof ISku] as number;
    var newSkuDataInsuranceFee = newSkuData[newSkuDataInsuranceFeeKey as keyof ISku] as number;
    var recalculatedInsuranceFee: number= totalInsuranceFee - prevSkuDataInsuranceFee + newSkuDataInsuranceFee;
    Object.assign(totals, { [totalInsuranceFeeKey]: truncateNum(recalculatedInsuranceFee) });

    //otherExpenses
        var totalOtherExpensesKey = 'totalOtherExpenses' + postfix
    var prevSkuDataOtherExpensesKey = "otherExpenses" + postfix;
    var newSkuDataOtherExpensesKey = "otherExpenses" + postfix;

    var totalOtherExpenses = totals[totalOtherExpensesKey as keyof IReport] as number;
    var prevSkuDataOtherExpenses = prevSkuData[prevSkuDataOtherExpensesKey as keyof ISku] as number;
    var newSkuDataOtherExpenses = newSkuData[newSkuDataOtherExpensesKey as keyof ISku] as number;
    var recalculatedOtherExpenses: number= totalOtherExpenses - prevSkuDataOtherExpenses + newSkuDataOtherExpenses;
    Object.assign(totals, { [totalOtherExpensesKey]: truncateNum(recalculatedOtherExpenses) });



    //margin
        var totalProfitMarginKey = 'totalProfitMargin' + postfix
    var totalFinalProfitKey = "totalFinalProfit" + postfix;
    var totalRetailAmountKey = "totalRetailAmount" + postfix;

    var totalFinalProfit = totals[totalFinalProfitKey as keyof IReport] as number;
    var totalRetailAmount = totals[totalRetailAmountKey as keyof IReport] as number;
    Object.assign(totals, { [totalProfitMarginKey]: calcProfitMargin(totalFinalProfit, totalRetailAmount) });

    //


    var recalculatedTotalPreTaxProfit = totals.totalPreTaxProfitInCurrentYear! + totals.totalPreTaxProfitInNextYear!;
    totals.totalPreTaxProfit = truncateNum(recalculatedTotalPreTaxProfit);

    var recalculatedTotalFinalProfit = totals.totalFinalProfitInCurrentYear! + totals.totalFinalProfitInNextYear!;
    totals.totalFinalProfit = truncateNum(recalculatedTotalFinalProfit);

    var recalculatedTotalProductCosts = totals.totalProductCostsInCurrentYear! + totals.totalProductCostsInNextYear!;
    totals.totalProductCosts = truncateNum(recalculatedTotalProductCosts);

    var recalculatedTotalInsuranceFee = totals.totalInsuranceFeeInCurrentYear! + totals.totalInsuranceFeeInNextYear!;
    totals.totalInsuranceFee = truncateNum(recalculatedTotalInsuranceFee);

    var recalculatedTotalOtherExpenses = totals.totalOtherExpensesInCurrentYear + totals.totalOtherExpensesInNextYear;
    totals.totalOtherExpenses = truncateNum(recalculatedTotalOtherExpenses);
  } else {
    var recalculatedTotalPreTaxProfit = totals.totalPreTaxProfit - prevSkuData.preTaxProfit + newSkuData.preTaxProfit;
    totals.totalPreTaxProfit = truncateNum(recalculatedTotalPreTaxProfit);

    var recalculatedTotalFinalProfit = totals.totalFinalProfit - prevSkuData.finalProfit + newSkuData.finalProfit;
    totals.totalFinalProfit = truncateNum(recalculatedTotalFinalProfit);

    var recalculatedTotalProductCosts = totals.totalProductCosts - prevSkuData.costPrice * prevSkuData.qty + newSkuData.costPrice * newSkuData.qty;
    totals.totalProductCosts = truncateNum(recalculatedTotalProductCosts);

    var recalculatedTotalInsuranceFee = totals.totalInsuranceFee - prevSkuData.insuranceFee + newSkuData.insuranceFee;
    totals.totalInsuranceFee = truncateNum(recalculatedTotalInsuranceFee);

    var recalculatedTotalOtherExpenses = totals.totalOtherExpenses - prevSkuData.otherExpenses + newSkuData.otherExpenses;
    totals.totalOtherExpenses = truncateNum(recalculatedTotalOtherExpenses);
  }

  totals.totalProfitMargin = calcProfitMargin(totals.totalFinalProfit, totals.totalRetailAmount);

  return { updatedTotals: totals };
};

export default calcRestReportTotalParams;
