/**
 * @param {"wrapinput - yes" | 'wrapinput - no'} wrapStatus
 */

var createLabel = (input, text, wrapStatus) => {
  var label = document.createElement("label");
  label.htmlFor = input.id;
  label.textContent = text;

  if (wrapStatus === "wrapinput - yes") {
    label.append(input);
  }

  return label;
};

export default createLabel;
