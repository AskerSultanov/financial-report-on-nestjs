/**
 * @param {'enable' | 'disable'} action
 */

var toggleUploadListGoodsButtonVisibility = (action) =>
  (document.getElementById("upload-list-goods").hidden = action !== "enable");

export default toggleUploadListGoodsButtonVisibility;
