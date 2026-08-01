var updateSKUsTableFields = (sku, years) => {
  var { skuIndex, data, year } = sku;

  if (!years.length) {
    for (var fieldName of Object.keys(data)) {
      var elemId = [fieldName, sku.skuIndex, year].join("-");
      var skuField = document.getElementById(elemId);

      if (skuField) {
        skuField.textContent = data[fieldName];

        if (data[fieldName] < 0) {
          skuField.style.color = "red";
        } else {
          skuField.style.color = "#04ff00";
        }
      }
    }
  } else {
    for (var year of years) {
      for (var fieldName of Object.keys(data)) {
        var elemId = [fieldName, sku.skuIndex, year].join("-");
        var skuField = document.getElementById(elemId);

        if (skuField) {
          skuField.textContent = data[fieldName];

          if (data[fieldName] < 0) {
            skuField.style.color = "red";
          } else {
            skuField.style.color = "#04ff00";
          }
        }
      }
    }
  }
};

export default updateSKUsTableFields;
