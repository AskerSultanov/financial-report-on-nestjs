var url = "/wbtoken/";

var getTokenData = async (userId) => {
  var res = await fetch(url + userId);

  var tokenData = await res.json();
  return { tokenData };
};

export default getTokenData;
