import calcDiscountedPrice from "../weekDaySelector/calcDiscountedPrice.js";

var createDiscountnput = (skuName) => {
  var actualDiscount = document.getElementById(skuName + "-discount");
  var expectedDiscount = document.getElementById(skuName + "-discount-expected");

  var input = document.createElement("input");
  input.type = "text";
  input.className = "input";
  input.id = skuName + "-discount-input-modal";
  input.value = +expectedDiscount?.textContent || +actualDiscount.textContent;

  input.addEventListener("keyup", function () {
    var discount = +this.value;
    var price = document.getElementById(skuName + "-price-input-modal").value;

    var newDiscountedPriceValue = calcDiscountedPrice({ price, discount });

    if (typeof discount === "number" && !isNaN(discount)) {
      var modalDiscountedPriceElement = document.getElementById(skuName + "-discountedPrice-modal");

      modalDiscountedPriceElement.textContent = newDiscountedPriceValue;
    }
  });

  return input;
};

export default createDiscountnput;
