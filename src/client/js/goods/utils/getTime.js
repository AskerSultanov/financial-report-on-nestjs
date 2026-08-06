var getTime = (fullDate, title) => {
  if (!fullDate) {
    return "";
  }

  var [date, time] = fullDate?.split(".")[0].split("T");
  return title + time + " " + date;
};

export default getTime;
