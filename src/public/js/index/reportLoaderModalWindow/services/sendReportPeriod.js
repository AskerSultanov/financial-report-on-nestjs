var sendReportPeriod = async (userId, dateFrom, dateTo, isPeriodWithinSameWeek = false, needToLoadAllReports = false) => {
  var res = await fetch("/report/", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, dateFrom, dateTo, isPeriodWithinSameWeek, needToLoadAllReports }),
  });

  if (res.status !== 200) {
    var { msg } = await res.json();
    return { reportData: {}, msg };
  } else {
    var reportData = await res.json();
    return { reportData, msg: "" };
  }
};

export default sendReportPeriod;
