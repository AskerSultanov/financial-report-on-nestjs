var getSelectedTaxYear = async () => {
  var options = document.querySelectorAll("option");

  var selectedYear;

  for (var option of options) {
    if (option.selected) {
      selectedYear = +option.value;
    }
  }

  return selectedYear;
};

export default getSelectedTaxYear;
