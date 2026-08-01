/**
 * @param {'enable' | 'disable'} action
 */

var toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility = (action) =>
  (document.getElementById("upload-weekly-prices-and-discounts-file").hidden = action !== "enable");

export default toggleWeeklyPricesAndDiscountsFileUploadButtonVisibility;
