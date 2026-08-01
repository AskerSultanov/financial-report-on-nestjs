/**
 * @param {'enabled-skus-tbody' | 'disabled-skus-tbody'} tbodyID
 */

var deleteSkuRowFromTable = (skuRow, tbodyID) => {
  var skusTbody = document.getElementById(tbodyID);
  skusTbody.removeChild(skuRow);
};

export default deleteSkuRowFromTable;
