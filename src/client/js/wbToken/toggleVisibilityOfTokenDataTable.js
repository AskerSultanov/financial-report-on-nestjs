var tokenDataTable = document.getElementById("table-container");

var enableTokenDataTable = () => (tokenDataTable.hidden = false);
var disableTokenDataTable = () => (tokenDataTable.hidden = true);

export { enableTokenDataTable, disableTokenDataTable };
