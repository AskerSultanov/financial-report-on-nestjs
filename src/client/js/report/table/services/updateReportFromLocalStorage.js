var updateReportFromLocalStorage = ({ userId, sku, totals }) => {
  var reportAsJSON = localStorage.getItem(userId);
  var report = JSON.parse(reportAsJSON);

  var skuFromLocalStorage = report.skus[sku.skuIndex];
  for (var fieldName of Object.keys(sku.data)) {
    skuFromLocalStorage[fieldName] = sku.data[fieldName];
  }

  for (var fieldName of Object.keys(totals.data)) {
    report[fieldName] = totals.data[fieldName];
  }

  localStorage.setItem(userId, JSON.stringify(report));
};

export default updateReportFromLocalStorage;
