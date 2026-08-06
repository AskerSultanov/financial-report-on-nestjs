var tableHeadItem = document.createElement("th");
tableHeadItem.append("Менять цену, если товар в акции");

var tableHeadRow = document.getElementById("enabled-skus-thead-row");

var addTableHeadRowToCheckboxForParticipationInPromo = () => tableHeadRow.append(tableHeadItem);

export default addTableHeadRowToCheckboxForParticipationInPromo;
