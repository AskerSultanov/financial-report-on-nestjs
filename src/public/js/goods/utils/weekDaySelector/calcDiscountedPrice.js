var calcDiscountedPrice = ({ price, discount }) => price - (price * discount) / 100;

export default calcDiscountedPrice;
