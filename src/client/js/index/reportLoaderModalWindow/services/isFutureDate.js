var isFutureDate = (reportDate) => {
  var fullToday = new Date().toISOString();
  var shortToday = fullToday.split("T")[0];

  var shortTodayMilliseconds = new Date(shortToday).getTime();

  var reportDateMilliseconds = new Date(reportDate).getTime();

  return reportDateMilliseconds > shortTodayMilliseconds;
};

export default isFutureDate;
