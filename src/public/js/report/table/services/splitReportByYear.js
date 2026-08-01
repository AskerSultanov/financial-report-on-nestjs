var startYearPostfix = "InCurrentYear";
var endYearPostfix = "InNextYear";

var reversedStartYearPostfix = startYearPostfix.split("").reverse().join("");
var reversedEndYearPostfix = endYearPostfix.split("").reverse().join("");

var setCommonFieldsToSku = (targetObj, sku) => {
  targetObj.id = sku.id;
  targetObj.skuName = sku.skuName;
};

var setCommonFieldsToReport = (targetObj, report) => {
  targetObj.userId = report.userId;
  targetObj.reportId = report.reportId;
  targetObj.dateFrom = report.dateFrom;
  targetObj.dateTo = report.dateTo;
  targetObj.recordedTo = report.recordedTo;
};

var removeKeyPostfix = (key, postfixLength) => {
  return { keyWithoutPostfix: key.slice(0, key.length - postfixLength) };
};

var splitReportByYear = (report, isGuestAccess) => {
  var startYearReportData = {};
  var startYearSkusData = [];
  var endYearReportData = {};
  var endYearSkusData = [];

  startYearReportData.year = +report.dateFrom.split("-")[0];
  endYearReportData.year = +report.dateTo.split("-")[0];

  setCommonFieldsToReport(startYearReportData, report);
  setCommonFieldsToReport(endYearReportData, report);

  for (var key of Object.keys(report)) {
    var reversedKey = key.split("").reverse().join("");

    if (reversedKey.startsWith(reversedStartYearPostfix)) {
      var { keyWithoutPostfix } = removeKeyPostfix(key, startYearPostfix.length);
      startYearReportData[keyWithoutPostfix] = report[key];
    }

    if (reversedKey.startsWith(reversedEndYearPostfix)) {
      var { keyWithoutPostfix } = removeKeyPostfix(key, endYearPostfix.length);
      endYearReportData[keyWithoutPostfix] = report[key];
    }
  }

  for (var sku of report.skus) {
    var startYearSkuData = {};
    var endYearSkuData = {};

    setCommonFieldsToSku(startYearSkuData, sku);
    setCommonFieldsToSku(endYearSkuData, sku);

    for (var key of Object.keys(sku)) {
      var reversedKey = key.split("").reverse().join("");

      if (reversedKey.startsWith(reversedStartYearPostfix)) {
        var { keyWithoutPostfix } = removeKeyPostfix(key, startYearPostfix.length);
        startYearSkuData[keyWithoutPostfix] = sku[key];
      }
      if (reversedKey.startsWith(reversedEndYearPostfix)) {
        var { keyWithoutPostfix } = removeKeyPostfix(key, endYearPostfix.length);
        endYearSkuData[keyWithoutPostfix] = sku[key];
      }
    }

    startYearSkusData.push(startYearSkuData);
    endYearSkusData.push(endYearSkuData);
  }

  startYearReportData.skus = startYearSkusData;
  endYearReportData.skus = endYearSkusData;

  if (isGuestAccess) {
    startYearReportData.taxRate = report.taxRate;
    endYearReportData.taxRate = report.taxRate;
  }

  return { startYearReportData, endYearReportData };
};

export default splitReportByYear;
