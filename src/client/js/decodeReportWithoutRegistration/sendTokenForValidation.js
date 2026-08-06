var url = "/decode-report-without-registration/token/";

var sendTokenForValidation = async (token) =>
  (await fetch(url, { method: "POST", body: JSON.stringify({ token }), headers: { "Content-Type": "application/json" } })).status === 200;

export default sendTokenForValidation;
