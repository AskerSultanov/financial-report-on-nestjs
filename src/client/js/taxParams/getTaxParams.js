var getTaxParams = async () => {
  var res = await fetch("/tax-params/api");

  var { taxParams } = await res.json();

  return { taxParams };
};

export default getTaxParams;
