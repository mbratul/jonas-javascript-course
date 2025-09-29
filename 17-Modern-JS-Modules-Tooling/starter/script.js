import {
  addToCart,
  totalPrice as price, //change the variable name us (as) keyword
  tq,
} from "./shoppingCart.js";
//Importing Module
addToCart("bread", 5);
console.log(price, tq);

import addCart from "./shoppingCart.js"; //no need to use {curley braces} for default export modules

addCart("pizza", 2);
addCart("bread", 5);
addCart("icecream", 6);

import { cart } from "./shoppingCart.js";
console.log(cart);
console.log("Importing Module");
