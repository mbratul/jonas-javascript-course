"use strict";

// Data needed for a later exercise
const flights =
  "_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30";

const italianFoods = new Set([
  "pasta",
  "gnocchi",
  "tomatoes",
  "olive oil",
  "garlic",
  "basil",
]);

const mexicanFoods = new Set([
  "tortillas",
  "beans",
  "rice",
  "tomatoes",
  "avocado",
  "garlic",
]);
//-----Destructuring--------
/* Definition: Destructuring Assignment is a JavaScript expression that allows to unpack of values from arrays, or properties from objects, into distinct variables data can be extracted from arrays, objects, and nested objects, and assigned to variables. 
url : https://www.geeksforgeeks.org/javascript/destructuring-assignment-in-javascript/
*/
// Data needed for first part of the section
const restaurant = {
  resturentName: "Classico Italiano",
  location: "Via Angelo Tavanti 23, Firenze, Italy",
  categories: ["Italian", "Pizzeria", "Vegetarian", "Organic"],
  starterMenu: ["Focaccia", "Bruschetta", "Garlic Bread", "Caprese Salad"],
  mainMenu: ["Pizza", "Pasta", "Risotto"],

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  // object edstructure method with default value
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = "20:00",
    address,
  }) {
    console.log(
      `Order received from ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} from ${address} at ${time}`
    );
  },
  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `here is your delecious pasta with ${ing1} and ${ing2} and ${ing3}`
    );
  },
};
// Receive 2 return values from a function
const [starter1, mainCourse1] = restaurant.order(1, 1);
console.log(
  `food order of starter menu ${starter1} and main food is ${mainCourse1}`
);
restaurant.orderDelivery({
  time: "22:30",
  address: "Mipur Ruposhi Dhaka",
  starterIndex: 2,
  mainIndex: 1,
});
restaurant.orderDelivery({
  address: "mipur ruposhi",
  starterIndex: 3,
});
//-----Object Destructuring--------
console.log("-------destructure object-------");
const { resturentName, categories, openingHours } = restaurant;
console.log(resturentName, categories, openingHours);

//use a name as a varibale
console.log("-------destructure object use as a variable-------");
const {
  resturentName: resturentname,
  categories: tags,
  openingHours: hours,
} = restaurant;
console.log(resturentname, tags, hours);

//use a default value
console.log("-------destructure object and use a default value-------");
const { menu = [], starterMenu: starter = [] } = restaurant;
console.log(menu, starter);
//Mutating Variables while Destructuring Objects
console.log("-------Mutating Variables while Destructuring Objects-------");
let aa = 111;
let bb = 999;
const obj = { aa: 7, bb: 14, cc: 21 };
({ aa, bb } = obj); //use () parenthases for unexpected token error
console.log(aa, bb);
//Nested Object while Destructuring
console.log("-------Nested Object while Destructuring-------");
/* const {
  fri: { open, close },
} = openingHours; */
const {
  fri: { open: op, close: cl },
} = openingHours; // nested object
//console.log(fri);
//console.log(`opening hours ${open}, \nclosing hours ${close}`);
console.log(`opening hours ${op}, \nclosing hours ${cl}`); //nested object
//-----Array Destructuring--------

console.log("-----Array Destructuring--------");
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];
console.log(arr);
console.log(a, b, c);

const [x, y, z] = arr;
console.log(x, y, z);

// destructuring resturent object
const [first, , third] = restaurant.categories; // using (,) we omit an value of an object property
console.log(first, third);
const [main, secondary] = restaurant.categories; // using (,) we omit an value of an object property
console.log(main, secondary);

//nested destructuring
const nested = [2, 3, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

//Default Values
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);

/*----------Spread Operators-----------*/
console.log("----------Spread Operators-----------");
const arrTest = [7, 8, 9];
const spreadArr1 = [1, 2, 3, arrTest]; //not using spread (...) operator in array show another array inside an array
const spreadArr2 = [1, 2, 3, ...arrTest]; //using spread (...) operator in array
//not using spread (...) operator in array show another array inside an array
console.log(spreadArr1);
console.log(...arrTest);
//using spread (...) operator in array show it's a one array
console.log(spreadArr2);
console.log(...spreadArr2); //when we need an normal value from an array

// here we creating a new array, not manipulating resturent array
const newMainMenu = [...restaurant.mainMenu, "Biryani"];
console.log(newMainMenu);

//shallow copy an array
const copyMainMenu = [...restaurant.mainMenu];
console.log(copyMainMenu);

const allMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(allMenu);
console.log(...allMenu);

// Iterables: arrays, strings, maps, sets. NOT objects
const strSpread = "ratul";
const lettersArray = [...strSpread, " ", "yes"];
console.log(lettersArray, lettersArray.length);

/* const ingredients = [
  prompt("let's make pasta your ingredients are ingredient1"),
  prompt("let's make pasta your ingredients are ingredient2"),
  prompt("let's make pasta your ingredients are ingredient3"),
]; 
// before using this uncomment the code block of ingredient variable
console.log(...ingredients);
restaurant.orderPasta(...ingredients); // it's a modern es6 feature to declear an array in a function
*/
// Spread Operator(...) in objects
const addRestaurantOwner = {
  founder: "ratul",
  ...restaurant,
  foundingYear: "2005",
};
console.log(addRestaurantOwner);

// change the resturent name by using a shllow copy of resturent object
const resturentCopy = { ...restaurant };
resturentCopy.resturentName = "Kebab House";
console.log(restaurant.resturentName);
console.log(resturentCopy.resturentName);
