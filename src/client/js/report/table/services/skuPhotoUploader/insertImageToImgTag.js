var insertImageToImgTag = async (event, skuName) => {
  var file = event.target.files[0];

  var reader = new FileReader();

  reader.readAsDataURL(file);
  reader.addEventListener("load", (e) => {
    var span = document.getElementById("span-" + skuName);
    span.style.display = "none";

    var img = document.getElementById("img-" + skuName);
    img.style.display = "block";
    img.src = e.target.result;

    var deleteImgButton = document.getElementById(
      "delete-img-button-" + skuName
    );

    deleteImgButton.style.display = "block";
  });
};

export default insertImageToImgTag;
