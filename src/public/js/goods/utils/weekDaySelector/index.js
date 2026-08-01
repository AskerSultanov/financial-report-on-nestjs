import calcDiscountedPrice from "./calcDiscountedPrice.js";

var yes = "да";
var no = "нет";
var actualItemEndings = ["-price", "-discount", "-discountedPrice", "-clubDiscountedPrice"];
var expectedItemEndings = ["-price-expected", "-discount-expected", "-discountedPrice-expected", "-clubDiscountedPrice-expected"];

var weekDaySelectorHandler = async (skus, weeklyPricesAndDiscounts, currentDayIndex) => {
  var weekDaySelector = document.getElementById("week-days-select");

  weekDaySelector.addEventListener("change", (e) => {
    var selectedWeekDayId = +e.target.value;
    var pricesAndDiscounts = weeklyPricesAndDiscounts[selectedWeekDayId];

    for (var { skuName, id } of skus) {
      var skuDataOfSelectedDay = pricesAndDiscounts.find((item) => item.nmID === id);

      if (skuDataOfSelectedDay) {
        var expectedPriceTdElem = document.getElementById(`${skuName}-price-expected`);
        expectedPriceTdElem.textContent = skuDataOfSelectedDay.data.price;

        var expectedDiscountTdElem = document.getElementById(`${skuName}-discount-expected`);
        expectedDiscountTdElem.textContent = skuDataOfSelectedDay.data.discount;

        var expectedDiscountedPrice = calcDiscountedPrice(skuDataOfSelectedDay.data);

        var expectedDiscountedPriceTdElem = document.getElementById(`${skuName}-discountedPrice-expected`);
        expectedDiscountedPriceTdElem.textContent = expectedDiscountedPrice;

        var expectedXlubDiscountedPriceTdElem = document.getElementById(`${skuName}-clubDiscountedPrice-expected`);
        expectedXlubDiscountedPriceTdElem.textContent = expectedDiscountedPrice;

        var checkboxForParticipationInPromo = document.getElementById("checkbox-" + skuName);
        var labelOfheckboxForParticipationInPromo = document.getElementById("checkbox-label-participation-in-promo-" + skuName);

        if (skuDataOfSelectedDay.changePriceIfInPromo) {
          checkboxForParticipationInPromo.checked = true;
          labelOfheckboxForParticipationInPromo.textContent = yes;
        } else {
          checkboxForParticipationInPromo.checked = false;
          labelOfheckboxForParticipationInPromo.textContent = no;
        }
      }
    }
  });
};

export default weekDaySelectorHandler;
