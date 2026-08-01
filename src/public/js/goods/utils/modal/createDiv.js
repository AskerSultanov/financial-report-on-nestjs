/**
 *
 * @param {'enableHandlers - yes' | 'enableHandlers - no'} enableHandlersStatus
 */

var createDiv = (id, className, text, enableHandlersStatus) => {
  var div = document.createElement("div");

  if (className) {
    div.className = className;
  }

  if (id) {
    div.id = id;
  }

  if (text) {
    div.textContent = text;
  }

  if (enableHandlersStatus === "enableHandlers - yes") {
    function closeModal() {
      div.classList.remove("active");
      document.body.style.overflow = "auto";
      div.remove();
    }

    div.addEventListener("click", (e) => {
      if (e.target === div) {
        closeModal();
        div.remove();
      }
    });

    document.addEventListener("keydown", function closeOnEscape(e) {
      if (e.key === "Escape" && div.classList.contains("active")) {
        closeModal();
        document.removeEventListener("keydown", closeOnEscape);
        div.remove();
      }
    });
  }

  return div;
};
export default createDiv;
