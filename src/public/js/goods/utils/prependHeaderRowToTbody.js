var headerRowContent = `
    <tr>
      <td></td>
      <td>Актуальная</td>
      <td>Запланированная</td>
      <td>Актуальная</td>
      <td>Запланированная</td>
      <td>Актуальная</td>
      <td>Запланированная</td>
      <td>Актуальная</td>
      <td>Запланированная</td>
    </tr>`.trim();

var prependHeaderRowToTbody = () => {
  var enabledSkusTbody = document.getElementById("enabled-skus-tbody");
  enabledSkusTbody.innerHTML = headerRowContent;
};

export default prependHeaderRowToTbody;
