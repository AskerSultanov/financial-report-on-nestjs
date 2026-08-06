import calcDiscountedPrice from "../weekDaySelector/calcDiscountedPrice.js";

var createPriceInput = (skuName) => {
  var actualPrice = document.getElementById(skuName + "-price");
  var expectedPrice = document.getElementById(skuName + "-price-expected");

  var input = document.createElement("input");
  input.type = "text";
  input.className = "input";
  input.id = skuName + "-price-input-modal";
  input.value = expectedPrice?.textContent || actualPrice.textContent;

  input.addEventListener("keyup", function () {
    var price = +this.value;
    var discount = document.getElementById(skuName + "-discount-input-modal").value;

    var newDiscountedPriceValue = calcDiscountedPrice({ price, discount });

    if (typeof price === "number" && !isNaN(price)) {
      var modalDiscountedPriceElement = document.getElementById(skuName + "-discountedPrice-modal");

      modalDiscountedPriceElement.textContent = newDiscountedPriceValue;
    }
  });

  return input;
};

export default createPriceInput;
