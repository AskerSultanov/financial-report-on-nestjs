var getMainPageData = async (userId) => {
  var res = await fetch("/api/" + userId);

  if (!res.ok) {
    return alert("Не удалось загрузить отчеты");
  }

  var data = await res.json();

  return data;
};

export default getMainPageData;
