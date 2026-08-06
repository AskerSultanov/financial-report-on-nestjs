/**
 * @param {'enabled-skus-table' | 'disabled-skus-table'} tableID
 * @param {'enable' | 'disable'} action
 */

var toggleSkuTableVisibillity = (tableID, action) =>
  (document.getElementById(tableID).hidden = action === "disable");

export default toggleSkuTableVisibillity;
