var getReportLoadingState = async (userId) => {
  var url = "/report/loading-state/" + userId + "/";

  var res = await fetch(url);
  var reportLoadingState = await res.json();
  return reportLoadingState;
};

export default getReportLoadingState;
