/**
 * @param {"enabled-skus-table" | "disabled-skus-table"} tableID
 * @param {'on' | 'off'} hiddenStatus
 */

var changeHiddenStatusOfSkusTable = (tableID, hiddenStatus) => {
  var skusTable = document.getElementById(tableID);

  if (hiddenStatus === "on") {
    skusTable.setAttribute("hidden", true);
  } else {
    skusTable.removeAttribute("hidden");
  }
};

export default changeHiddenStatusOfSkusTable;
