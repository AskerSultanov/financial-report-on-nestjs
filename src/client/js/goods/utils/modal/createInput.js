var createInput = (id, className, name, type) => {
  var input = document.createElement("input");
  input.id = id;
  input.type = type;
  input.name = name;
  input.className = className;
  return input;
};

export default createInput;
