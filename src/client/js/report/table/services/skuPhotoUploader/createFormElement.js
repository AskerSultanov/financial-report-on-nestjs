var createFormElement = (reportId, skuName) => {
  var form = document.createElement("form");
  form.id = reportId + "-" + skuName;
  form.enctype = "multipart/form-data";
  form.style.display = "inline";

  return form;
};

export default createFormElement;
