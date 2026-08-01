var cancelButtonHandler = (modalOverlay) => {
  return {
    event: "click",
    cb: () => {
      modalOverlay.classList.remove("active");
      document.body.style.overflow = "auto";
      modalOverlay.remove();
    },
  };
};

export default cancelButtonHandler;
