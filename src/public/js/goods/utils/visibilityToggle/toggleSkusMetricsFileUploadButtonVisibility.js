/**
 * @param {'enable' | 'disable'} action
 */

var toggleSkusMetricsFileUploadButtonVisibility = (action) => (document.getElementById("download-skus-metrics").hidden = action !== "enable");

export default toggleSkusMetricsFileUploadButtonVisibility;
