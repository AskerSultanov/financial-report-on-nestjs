var handleTaxYearSelection = async (taxParams) => {
  var select = document.getElementById("tax-year");

  select.onchange = async (e) => {
    var options = document.querySelectorAll("option");

    for (var option of options) {
      if (option.selected) {
        var taxYear = +option.value;

        var selectedTaxYear = taxParams.find((date) => date.year == taxYear);

        document.getElementById("tax-rate").placeholder = "сейчас процент равен " + selectedTaxYear.taxRate;
        document.getElementById("mandatory-insurance-fee").placeholder = "сейчас сумма равна " + selectedTaxYear.mandatoryInsuranceFee + "р.";
        document.getElementById("mandatory-insurance-fee-rate").placeholder = "сейчас процент равен " + selectedTaxYear.insuranceFeePercentage;
      }
    }
  };
};

export default handleTaxYearSelection;
