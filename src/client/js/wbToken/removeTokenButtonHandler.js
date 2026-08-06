import { resetTokenDataTable } from "./tokenDataTable.js";
import { disableTokenDataTable } from "./toggleVisibilityOfTokenDataTable.js";
import { disableRemoveTokenButton } from "./toggleVisibilityOfRemoveTokenButton.js";

var removeTokenButton = document.getElementById("remove-token-button");

var url = "/wbtoken";

var removeTokenButtonHandler = (userId) =>
  removeTokenButton.addEventListener("click", async (e) => {
    e.preventDefault();

    var confirmed = confirm("Удалить токен ?");

    if (confirmed) {
      try {
        var res = await fetch(url, { method: "DELETE", body: JSON.stringify({ userId }), headers: { "Content-Type": "application/json" } });

        if (res.status === 200) {
          resetTokenDataTable();
          disableTokenDataTable();
          disableRemoveTokenButton();

          alert("Токен успешно удален");
        } else {
          alert("Не удалось удалить токен");
        }
      } catch (e) {
        alert("Произошла ошибка при попытке удалить токен...");
      }
    }
  });

export default removeTokenButtonHandler;
