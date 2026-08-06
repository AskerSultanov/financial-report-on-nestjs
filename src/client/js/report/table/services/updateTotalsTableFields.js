var updateTotalsTableFields = (totals, years) => {
  for (var fieldName of Object.keys(totals.data)) {
    var elemId = fieldName + "-";

    var elem = document.getElementById(elemId);

    if (elem) {
      elem.textContent = totals.data[fieldName];

      if (totals.data[fieldName] < 0) {
        elem.style.color = "red";
      } else {
        elem.style.color = "#04ff00";
      }
    }
  }

  if (years.length) {
    for (var year of years) {
      for (var fieldName of Object.keys(totals.data)) {
        var elemId = fieldName + "-" + year;

        var elem = document.getElementById(elemId);

        if (elem) {
          elem.textContent = totals.data[fieldName];

          if (totals.data[fieldName] < 0) {
            elem.style.color = "red";
          } else {
            elem.style.color = "#04ff00";
          }
        }
      }
    }
  }
};

export default updateTotalsTableFields;
