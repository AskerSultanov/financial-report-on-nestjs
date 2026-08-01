import openTokenLoaderModal from "./openTokenLoaderModal.js";

var loadTokenButton = document.getElementById("token-button");

var loadTokenButtonHander = (userId) => {
  loadTokenButton.onclick = () => {
    var tokenModalIsExist = document.getElementById("token-modal");

    if (!tokenModalIsExist) {
      openTokenLoaderModal(userId);
    }
  };
};

export default loadTokenButtonHander;
