/**
 * @param {'enabled-skus-tbody' | 'disabled-skus-tbody'} tbodyID
 */

var insertSkuRowToTable = (skuRow, tbodyID) => {
  var skusTbody = document.getElementById(tbodyID);
  skusTbody.append(skuRow);
};

export default insertSkuRowToTable;
