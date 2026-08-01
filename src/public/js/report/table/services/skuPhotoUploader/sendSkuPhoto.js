var sendSkuPhoto = async (imgData) => {
  var res = await fetch("/report/image/", {
    method: "POST",
    body: imgData,
  });

  return res.ok;
};

export default sendSkuPhoto;
