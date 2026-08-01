var getSelectedYearTaxParamsFromLocalStorage = (item) => {
  var selectedYearTaxParams = JSON.parse(localStorage.getItem(item));
  return { selectedYearTaxParams };
};

export default getSelectedYearTaxParamsFromLocalStorage;
