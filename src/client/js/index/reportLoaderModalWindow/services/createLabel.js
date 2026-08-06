var createLabel = (text, input) => {
  var label = document.createElement("label");
  label.htmlFor = input.id;
  label.style.color = "black";
  label.append(input, text);

  return label;
};

export default createLabel;
