var tokenIdTdElement = document.getElementById("token-id");
var tokenDaysLeftTdElement = document.getElementById("days-left");
var tokenLastUsedTdElement = document.getElementById("last-used");
var tokenValidUntilTdElement = document.getElementById("valid-until");
var tokenIsExpiredTdElement = document.getElementById("token-is-expired");

var yes = "да";
var no = "нет";

var parseLastUsedData = (lastUsedDate) => {
  if (!lastUsedDate) {
    return "-";
  }

  var date = new Date();

  var currentDay = date.getDate();
  var currentYear = date.getFullYear();
  var currentMonth = date.getMonth() + 1;

  var splitedDate = lastUsedDate.split("T");
  var [year, month, day] = splitedDate[0].split("-");
  var hourAndMinAndSec = splitedDate[1].split(".")[0];

  if (year == currentYear && month == currentMonth && day == currentDay) {
    return hourAndMinAndSec + " " + "сегодня";
  } else {
    return hourAndMinAndSec + " " + day + "." + month + "." + year;
  }
};

var insertDataToTokenDataTable = (data) => {
  tokenIdTdElement.textContent = data.id;
  tokenDaysLeftTdElement.textContent = data.daysLeft;
  tokenLastUsedTdElement.textContent = parseLastUsedData(data.lastUsed);
  tokenValidUntilTdElement.textContent = data.validUntil;
  tokenIsExpiredTdElement.textContent = data.isExpired ? yes : no;
};

var resetTokenDataTable = () => {
  tokenIdTdElement.textContent = "";
  tokenDaysLeftTdElement.textContent = "";
  tokenLastUsedTdElement.textContent = "";
  tokenValidUntilTdElement.textContent = "";
  tokenIsExpiredTdElement.textContent = "";
};

export { insertDataToTokenDataTable, resetTokenDataTable };
