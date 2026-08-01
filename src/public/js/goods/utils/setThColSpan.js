var tableHeadersIds = ["price-th", "discount-th", "discountedPrice-th", "clubDiscounted-price-th"];

var setThColSpan = () => tableHeadersIds.map((thID) => (document.getElementById(thID).colSpan = 2));

export default setThColSpan;
