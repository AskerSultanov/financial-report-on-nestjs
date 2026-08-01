var createDeleteImgButton = (skuName) => {
  var button = document.createElement("button");

  button.id = "delete-img-button-" + skuName;
  button.className = "delete-img-button";
  button.style.display = "none";

  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var userId = document.cookie.split("=")[1];

    var res = await fetch("/report/image/", {
      method: "DELETE",
      body: JSON.stringify({ userId, skuName }),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      return alert("Не удалось удалить фото");
    }

    var imgTadId = "img-" + skuName;
    var img = document.getElementById(imgTadId);
    img.src = null;

    button.style.display = "none";

    return alert("Фото успешно удалено");
  });

  return button;
};

export default createDeleteImgButton;
