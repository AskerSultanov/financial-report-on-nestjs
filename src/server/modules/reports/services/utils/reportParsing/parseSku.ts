import { ReportTotals } from './index.js';
import { ISku } from '../../../../../database/interfaces/reportSku.interface.js';
import { IWeeklyFinancialReportItem } from '../WBAPI/interfaces/getReports.interface.js';

var costPrice = 0;
var otherExpenses = 0;
var insuranceFee = 0;
var preTaxProfit = 0;
var finalProfit = 0;
var profitMargin = 0;
var averageProfit = 0;
var isCostPriceSet = false;
var additionalInsuranceFee = 0;
var isInsuranceFeeIncluded = false;

export var parseSku = async function (
  skuName: string,
  skuQty: number,
  skuFilteredReport: IWeeklyFinancialReportItem[],
  storageCost: number,
  taxRate: number,
  totals: ReportTotals,
): Promise<ISku | null> {
  var { totalSold, totalStorageCost, totalAdvertisingCosts } = totals;

  if (!skuFilteredReport.length) {
    return null;
  }

  var id = skuFilteredReport[0].nmId;

  var year = +skuFilteredReport[0].saleDt.split('-')[0];

  var qty = this.calcUtils.quantity(skuFilteredReport);

  var taxableAmount = this.calcUtils.taxableAmount(skuFilteredReport);

  var fines = this.calcUtils.sum(skuFilteredReport, 'penalty', 'truncate-on');

  var acceptance = this.calcUtils.sum(
    skuFilteredReport,
    'paidAcceptance',
    'truncate-on',
  );

  var retailAmount = this.calcUtils.retailAmount(skuFilteredReport);

  var tax = this.calcUtils.taxAmount(taxableAmount, taxRate);

  var returnAmount = this.calcUtils.returnAmount(skuFilteredReport);

  var deliveryCost = this.calcUtils.sum(
    skuFilteredReport,
    'deliveryService',
    'truncate-on',
  );

  var deductionOrPayment = this.calcUtils.sum(
    skuFilteredReport,
    'deduction',
    'truncate-on',
  );

  var additionalPayment = this.calcUtils.sum(
    skuFilteredReport,
    'additionalPayment',
    'truncate-on',
  );

  var sellerPayoutAmount = this.calcUtils.sellerPayoutAmount(skuFilteredReport);

  var averageStorageCost = this.calcUtils.averageStorageCost(
    totalStorageCost,
    totalSold,
    qty,
  );

  var averageAdvertisingCost = this.calcUtils.averageAdvertisingCost(
    skuQty,
    totalAdvertisingCosts,
  );

  var profit =
    sellerPayoutAmount -
    fines -
    acceptance -
    additionalPayment -
    averageAdvertisingCost -
    storageCost -
    deliveryCost;

  var sku: ISku = {
    id,
    skuName,
    qty,
    tax,
    year,
    fines,
    costPrice,
    retailAmount,
    returnAmount,
    taxableAmount,
    deductionOrPayment,
    averageStorageCost,
    profit,
    insuranceFee,
    acceptance,
    additionalPayment,
    storageCost,
    deliveryCost,
    otherExpenses,
    isCostPriceSet,
    averageAdvertisingCost,
    sellerPayoutAmount,
    additionalInsuranceFee,
    isInsuranceFeeIncluded,
    preTaxProfit,
    finalProfit,
    profitMargin,
    averageProfit,
  };

  return sku;
};
