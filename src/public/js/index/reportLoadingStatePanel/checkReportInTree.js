var checkReportInTree = (tableRowId) => {
  var tableRowIsNotExist = document.getElementById(tableRowId) === null;
  return tableRowIsNotExist;
};

export default checkReportInTree;
