var createButton = (buttonText, className, id, ...handlers) => {
  var button = document.createElement("button");
  button.id = id;
  button.className = className;
  button.textContent = buttonText;

  if (handlers) {
    handlers.map(({ event, cb }) => {
      button.addEventListener(event, cb);
    });
  }

  return button;
};

export default createButton;
