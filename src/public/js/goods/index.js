import fileUploadHandler from "./fileUploadHandler.js";
import showListGoodsTable from "./showListGoodsTable.js";
import downloadSkusMetricsFileButtonHandler from "./downloadSkusMetricsFileButtonHandler.js";
import downloadWeeklyPricesFileButtonHandler from "./downloadWeeklyPricesFileButtonHandler.js";

var userId = document.cookie.split("=")[1];

showListGoodsTable();
fileUploadHandler(userId);
downloadSkusMetricsFileButtonHandler(userId);
downloadWeeklyPricesFileButtonHandler(userId);
