var shortNum = async (n) => {
  var hasDot = String(n).split("").includes(".");

  if (!hasDot) {
    return n;
  }

  return +n.toFixed(2);
};

export default shortNum;
