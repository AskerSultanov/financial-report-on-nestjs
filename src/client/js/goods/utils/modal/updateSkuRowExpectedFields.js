import calcDiscountedPrice from "../weekDaySelector/calcDiscountedPrice.js";

var updateSkuRowExpectedFields = (skuName, newPrice, newDiscount) => {
  var skuExpectedPriceTdElement = document.getElementById(skuName + "-price-expected");
  skuExpectedPriceTdElement.textContent = newPrice;

  var skuExpectedDiscountTdElement = document.getElementById(skuName + "-discount-expected");
  skuExpectedDiscountTdElement.textContent = newDiscount;

  var newDiscountedPriceValue = calcDiscountedPrice({ price: newPrice, discount: newDiscount });

  var skuExpectedDiscountedPriceTdElement = document.getElementById(
    skuName + "-discountedPrice-expected"
  );
  skuExpectedDiscountedPriceTdElement.textContent = newDiscountedPriceValue;

  var skuExpectedClubDiscountedPriceTdElement = document.getElementById(
    skuName + "-clubDiscountedPrice-expected"
  );
  skuExpectedClubDiscountedPriceTdElement.textContent = newDiscountedPriceValue;
};

export default updateSkuRowExpectedFields;
