import getTime from "./getTime.js";
import createTdElement from "./createTdElement.js";
import openModalButton from "./modal/openModalButton.js";
import calcDiscountedPrice from "./weekDaySelector/calcDiscountedPrice.js";
import createSkuRowVisibilityButtonHandler from "./toggleSkuRowVisibility/index.js";
import createCheckboxForParticipationInPromo from "./createCheckboxForParticipationInPromo.js";

/**
 * @param {'enabled-skus-tbody' | 'disabled-skus-tbody'} tbodyID
 */

var createSkusTable = async (skus, tbodyID, currentDayData) => {
  var tbody = document.getElementById(tbodyID);

  for (var sku of skus) {
    let { id, skuName, price, discount, discountedPrice, clubDiscountedPrice } = sku;

    var tr = document.createElement("tr");
    tr.id = skuName;

    var skuNameTd = createTdElement(skuName, skuName, "skuName");

    var priceTitle = "актуальная на ";
    var lastFetchTime = getTime(sku?.lastFetch, priceTitle);

    var actualPriceTd = createTdElement(price, skuName, "price", lastFetchTime);
    var actualDiscountTd = createTdElement(discount, skuName, "discount");
    var actualDiscountedPriceTd = createTdElement(discountedPrice, skuName, "discountedPrice");
    var actualClubDiscountedPriceTd = createTdElement(clubDiscountedPrice, skuName, "clubDiscountedPrice");

    var modalButton = await openModalButton(sku);
    var modalButtonTdElem = createTdElement(modalButton);
    var skuRowVisibilityButtonHandler = createSkuRowVisibilityButtonHandler(skuName, id);
    var skuRowVisibilityButtonHandlerTdElem = createTdElement(skuRowVisibilityButtonHandler);

    if (currentDayData) {
      var skuDataOfCurrentDay = currentDayData.find((item) => item.nmID === id);

      var expectedPriceTitle = "установлено последний раз ";
      var lastUpdatedTime = getTime(sku?.lastUpdated, expectedPriceTitle);

      var expectedPriceTd = createTdElement(skuDataOfCurrentDay?.data.price || "", skuName, "price-expected", lastUpdatedTime);

      var expectedDiscountTd = createTdElement(skuDataOfCurrentDay?.data.discount || "", skuName, "discount-expected");

      var expectedDiscountedPrice;

      if (skuDataOfCurrentDay) {
        expectedDiscountedPrice = calcDiscountedPrice(skuDataOfCurrentDay.data);
      } else {
        expectedDiscountedPrice = "";
      }

      var expectedDiscountedPriceTd = createTdElement(expectedDiscountedPrice, skuName, "discountedPrice-expected");

      var expectedClubDiscountedPriceTd = createTdElement(expectedDiscountedPrice, skuName, "clubDiscountedPrice-expected");

      if (tbodyID === "disabled-skus-tbody") {
        actualPriceTd.hidden = true;
        actualDiscountTd.hidden = true;
        actualDiscountedPriceTd.hidden = true;
        actualClubDiscountedPriceTd.hidden = true;
        expectedPriceTd.hidden = true;
        expectedDiscountTd.hidden = true;
        expectedDiscountedPriceTd.hidden = true;
        expectedClubDiscountedPriceTd.hidden = true;

        skuRowVisibilityButtonHandler.setAttribute("disbl", "");
        skuRowVisibilityButtonHandler.textContent = "включить";
        modalButton.hidden = true;
      }

      tr.append(
        skuNameTd,
        actualPriceTd,
        expectedPriceTd,
        actualDiscountTd,
        expectedDiscountTd,
        actualDiscountedPriceTd,
        expectedDiscountedPriceTd,
        actualClubDiscountedPriceTd,
        expectedClubDiscountedPriceTd,
        modalButtonTdElem,
        skuRowVisibilityButtonHandlerTdElem,
      );

      if (skuDataOfCurrentDay) {
        var participationInPromoCheckbox = createCheckboxForParticipationInPromo(sku, skuDataOfCurrentDay.changePriceIfInPromo);
        var participationInPromoCheckboxTdElem = createTdElement(participationInPromoCheckbox);
        tr.append(participationInPromoCheckboxTdElem);
      }

      tbody.append(tr);
      continue;
    }

    if (tbodyID === "disabled-skus-tbody") {
      actualPriceTd.hidden = true;
      actualDiscountTd.hidden = true;
      actualDiscountedPriceTd.hidden = true;
      actualClubDiscountedPriceTd.hidden = true;

      skuRowVisibilityButtonHandler.setAttribute("disbl", "");
      skuRowVisibilityButtonHandler.textContent = "включить";
      modalButton.hidden = true;
    }

    tr.append(
      skuNameTd,
      actualPriceTd,
      actualDiscountTd,
      actualDiscountedPriceTd,
      actualClubDiscountedPriceTd,
      modalButtonTdElem,
      skuRowVisibilityButtonHandlerTdElem,
    );

    tbody.append(tr);
  }
};

export default createSkusTable;
