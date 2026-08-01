var showSpinner = () => {
  var spinnerWrapper = document.createElement("div");
  spinnerWrapper.className = "loader-overlay";

  var spinner = document.createElement("span");
  spinner.id = "loader";
  spinner.className = "loader";

  spinnerWrapper.appendChild(spinner);
  document.body.appendChild(spinnerWrapper);
};

var hideSpinner = async () => {
  var spinnerWrapper = document.querySelector(".loader-overlay");

  return spinnerWrapper?.remove();
};

export { showSpinner, hideSpinner };
