//Exporting Module
console.log("Exporting Module");
const shippingCost = 10;
export const cart = [];

//Named Export Example
export const addToCart = function (product, quamtity) {
  cart.push({ product, quamtity });
  console.log(`${quamtity} ${product} added to the cart`);
};

const totalPrice = 237;
const totalQuantity = 23;

//exporting variable
export { totalPrice, totalQuantity as tq };

//default export
export default function (product, quamtity) {
  cart.push({ product, quamtity });
  console.log(`${quamtity} ${product} added to the cart`);
}
