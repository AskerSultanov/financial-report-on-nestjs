/**
 * @param {'enable' | 'disable'} action
 */

var toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility = (action) =>
  (document.getElementById("download-weekly-prices-file").hidden = action !== "enable");

export default toggleDownloadWeeklyPricesAndDiscountsFileButtonVisibility;
