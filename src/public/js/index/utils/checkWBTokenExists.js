var checkWBTokenExists = async (userId) => {
  var url = "/wbtoken/check-exist/" + userId;
  try {
    var res = await fetch(url);

    if (res.status === 200) {
      var { tokenIsExist } = await res.json();
      return { tokenIsExist };
    } else {
      return { tokenIsExist: false };
    }
  } catch {
    return { tokenIsExist: false, error: true, errorMsg: "Произошла ошибка при получении информации о наличии токена..." };
  }
};

export default checkWBTokenExists;
