import createRemoveUserButton from "./createRemoveUserButton.js";
import createTdElement from "../report/table/services/createTdElement.js";

var usersTable = (users) => {
  var tableBody = document.getElementById("tbody");

  for (var user of users) {
    if (user.role !== "admin") {
      var { userId, login, registeredAt } = user;

      var loginTdElement = createTdElement(login);
      var userIdTdElement = createTdElement(userId);
      var registeredAtTdElem = createTdElement(registeredAt);
      var removeUserButton = createRemoveUserButton(login, userId);
      var removeUserButtonTdElem = createTdElement(removeUserButton);

      var tableRow = document.createElement("tr");
      tableRow.id = userId;

      tableRow.append(userIdTdElement, loginTdElement, registeredAtTdElem, removeUserButtonTdElem);
      tableBody.append(tableRow);
    }
  }
};

export default usersTable;
