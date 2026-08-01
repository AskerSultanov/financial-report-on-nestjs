var createInputField = (id, placeholder) => {
  var input = document.createElement("input");
  input.id = id;
  input.type = "text";

  if (placeholder) {
    input.placeholder = placeholder;
  }

  input.className = "modal-input";

  return input;
};

export default createInputField;
