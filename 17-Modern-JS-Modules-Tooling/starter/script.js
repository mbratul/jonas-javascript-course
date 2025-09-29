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

let score = 85;
if (score >= 90) {
  console.log("you got an A+");
} else if (score >= 80) {
  console.log("you got an A");
} else if (score >= 70) {
  console.log("you got an B");
} else if (score >= 60) {
  console.log("you got an C");
} else if (score >= 40) {
  console.log("you got an D");
} else {
  console.log("you are fail the test");
}

//top level await
const response = await fetch(
  "https://jsonplaceholder.typicode.com/posts?_limit=5"
);
const data = await response.json();
console.log(data);

// get last post

const getLasPost = async function () {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts?_limit=5"
  );
  const data = await response.json();
  return {
    id: data.at(-1).id,
    title: data.at(-1).title,
    body: data.at(-1).body,
  };
};
//not very clean and not recomended
// const lastPost = getLasPost();
// lastPost.then((last) => console.log(last));

const lastPost2 = await getLasPost();
console.log(lastPost2);
