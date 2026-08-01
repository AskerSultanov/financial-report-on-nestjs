var confirmMsg = "Выйти из аккаунта?";
var logoutButton = document.getElementById("logout-button");

var logoutButtonHandler = (userId) => {
  logoutButton.addEventListener("click", async () => {
    var confirmed = confirm(confirmMsg);

    if (confirmed) {
      await fetch("/logout", { method: "POST" });
      window.location.href = "/decode-report-without-registration/";
    }
  });
};

export default logoutButtonHandler;
