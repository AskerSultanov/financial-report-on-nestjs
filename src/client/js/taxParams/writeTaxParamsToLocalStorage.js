var writeTaxParamsToLocalStorage = (taxParams) => {
  for (var item of taxParams) {
    localStorage.setItem(item.year, JSON.stringify(item));
  }
};

export default writeTaxParamsToLocalStorage;
