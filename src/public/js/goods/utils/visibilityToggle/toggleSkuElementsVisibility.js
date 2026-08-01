var elementsEnding = [
  "-price",
  "-price-expected",
  "-discount",
  "-discount-expected",
  "-discountedPrice",
  "-discountedPrice-expected",
  "-clubDiscountedPrice",
  "-clubDiscountedPrice-expected",
  "-modal",
];

/**
 * @param {'hide' | 'unhide'} isVisible
 */

var toggleSkuElementsVisibility = (skuName, isVisible) => {
  for (var end of elementsEnding) {
    var skuRowElem = document.getElementById(skuName + end);

    if (skuRowElem) skuRowElem.hidden = isVisible === "hide";
  }
};

export default toggleSkuElementsVisibility;
