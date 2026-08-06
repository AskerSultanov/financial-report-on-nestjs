import calcDiscountedPrice from "../weekDaySelector/calcDiscountedPrice.js";

var updateSkuRowActualFields = (skuName, newPrice, newDiscount) => {
  var skuActualPriceTdElement = document.getElementById(skuName + "-price");
  skuActualPriceTdElement.textContent = newPrice;

  var skuActualDiscountTdElement = document.getElementById(skuName + "-discount");
  skuActualDiscountTdElement.textContent = newDiscount;

  var newDiscountedPriceValue = calcDiscountedPrice({ price: newPrice, discount: newDiscount });

  var skuActualDiscountedPriceTdElement = document.getElementById(skuName + "-discountedPrice");
  skuActualDiscountedPriceTdElement.textContent = newDiscountedPriceValue;

  var skuClubDiscountedPriceTdElement = document.getElementById(skuName + "-clubDiscountedPrice");
  skuClubDiscountedPriceTdElement.textContent = newDiscountedPriceValue;
};

export default updateSkuRowActualFields;
