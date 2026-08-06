var createUploadAllReportsCheckbox = () => {
  var uploadAllReportsCheckbox = document.createElement("input");
  uploadAllReportsCheckbox.id = "uploadAllReportsCheckbox";
  uploadAllReportsCheckbox.type = "checkbox";
  uploadAllReportsCheckbox.checked = false;

  return uploadAllReportsCheckbox;
};

export default createUploadAllReportsCheckbox;
