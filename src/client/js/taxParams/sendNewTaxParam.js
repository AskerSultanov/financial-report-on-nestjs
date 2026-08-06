var sendNewTaxParam = async (year, reportsNeedRecalculation = false, oldTaxParams, newTaxParam) => {
  var url = "/tax-params/";

  var res = await fetch(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ year, reportsNeedRecalculation, oldTaxParams, data: { ...newTaxParam } }),
  });

  return res.ok;
};

export default sendNewTaxParam;
