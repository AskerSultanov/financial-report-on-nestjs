var createModal = (className) => {
  var modal = document.createElement("div");

  if (className) {
    modal.className = className;
  }

  modal.onclick = (e) => {
    if (e.target === modal) {
      modal.remove();
    }
  };

  return modal;
};

export default createModal;
