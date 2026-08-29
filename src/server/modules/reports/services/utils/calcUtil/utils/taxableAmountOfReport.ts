import { truncateNum } from '../../reportParsing/truncateNum.js';
import { IWeeklyFinancialReportItem } from '../../WBAPI/interfaces/getReports.interface.js';

export function calcTaxableAmountOfReport(
  report: IWeeklyFinancialReportItem[],
): number {
  var buybackReportIsExist: IWeeklyFinancialReportItem | undefined =
    report.find((item) => item.reportType !== 1);

  var taxableAmountOfBuybackReport: number = 0;

  if (buybackReportIsExist) {
    var buybackReport: IWeeklyFinancialReportItem[] = report.filter(
      (item) => item.reportType !== 1,
    );

    var deliveryCost: number = buybackReport.reduce(
      (acc, item) => acc + +item.deliveryService,
      0,
    );

    var sellerPayoutFromBuybackReport: IWeeklyFinancialReportItem[] =
      buybackReport.filter((item) => item.docTypeName === 'Продажа');

    var sellerPayoutExcludingReturns: number =
      sellerPayoutFromBuybackReport.reduce(
        (acc, item) => acc + (+item.forPay || +item.retailAmount),
        0,
      );

    taxableAmountOfBuybackReport = sellerPayoutExcludingReturns - deliveryCost;
  }

  var mainReport: IWeeklyFinancialReportItem[] | undefined = report.filter(
    (item) => item.reportType === 1,
  );

  var salesOfMainReport: IWeeklyFinancialReportItem[] = mainReport.filter(
    (item) => item.docTypeName === 'Продажа',
  );
  var returnsOfMainReport: IWeeklyFinancialReportItem[] = mainReport.filter(
    (item) => item.docTypeName === 'Возврат',
  );

  var taxableAmountOfSalesFromMainReport: number = salesOfMainReport.reduce(
    (acc, item) => acc + +item.retailAmount,
    0,
  );
  var taxableAmountOfReturnsFromMainReport: number = returnsOfMainReport.reduce(
    (acc, item) => acc + +item.retailAmount,
    0,
  );

  var taxableAmountOfMainReport: number =
    taxableAmountOfSalesFromMainReport - taxableAmountOfReturnsFromMainReport;

  var taxableAmount: number =
    taxableAmountOfMainReport + taxableAmountOfBuybackReport;

  return truncateNum(taxableAmount);
}
