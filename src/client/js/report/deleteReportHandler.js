var button = document.getElementById("delete-report-button");

var sendDeletionRequest = async (userId, reportId, skuNames) => {
  var res = await fetch("/report", {
    method: "DELETE",
    body: JSON.stringify({ userId, reportId, skuNames }),
    headers: { "Content-Type": "application/json" },
  });

  return res.ok;
};

var deleteReportHandler = (userId, reportId, skus) =>
  button.addEventListener("click", async (e) => {
    e.preventDefault();

    var confirmed = confirm("Удалить отчет?");

    if (confirmed) {
      var skuNames = skus.map(({ skuName }) => skuName);
      var success = await sendDeletionRequest(userId, reportId, skuNames);

      if (success) {
        alert("Отчет успешно удален");
        window.location.href = "/";
      } else {
        alert("Не удалось удалить отчет...");
      }
    }
  });

export default deleteReportHandler;
