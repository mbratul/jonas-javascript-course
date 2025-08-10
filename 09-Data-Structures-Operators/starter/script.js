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
const days = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

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
  orderPizza: function (mainIngredient, ...otherIngredient) {
    console.log(mainIngredient);
    console.log(otherIngredient);
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

/* Rest Pattern and Parameters */
console.log("---------Rest Pattern and Parameters------");
const [Pizza, Risotto, ...others] = [
  ...restaurant.starterMenu,
  ...restaurant.mainMenu,
];
console.log(Pizza, Risotto, others);
//rest parameter for object
const { sat, ...weekday } = { ...restaurant.openingHours };
console.log(sat, weekday);

//rest parameter for function
function addRestNumber(...number) {
  let sum = 0;
  for (let i = 0; i < number.length; i++) {
    sum += number[i];
  }
  console.log(number);
  console.log(sum);
}
addRestNumber(2, 3);
addRestNumber(4, 5, 6);

const xNumber = [25, 45, 55];
addRestNumber(...xNumber);

restaurant.orderPizza("mushroom", "onion", "bread", "sauce");
restaurant.orderPizza("bread");

//Shortcircuiting Logical && and || operator
console.log("Shortcircuiting Logical && and || operator");
console.log(3 || "jonas");
/* Logical Operator have 3 use 
  1. They can use any Data Types
  2. They can return any Data Type
  3. They can also short circuiting
*/
console.log("" || "jonas");
console.log(true || 0);
console.log(undefined || null);
console.log(undefined || 0 || "" || "hello" || 23 || null);
console.log("-------OR--------");
restaurant.numGuest = 23;
const guest1 = restaurant.numGuest ? restaurant.numGuest : 10; // ternary operator
console.log(guest1);
const guest2 = restaurant.numGuest || 10; // shortcircuiting logical or operator
console.log(guest2);
console.log("-------AND--------");
console.log(0 && "jonas");
console.log(7 && "jonas");
console.log("hi" && 23 && null && "jonas" && -54);

// checks if order pizza method exist then the and operator run the method
restaurant.orderPizza && restaurant.orderPizza("mushroom", "bread");

/* Nullish Coaleching Operator */
console.log("-------Nullish Coalescing Operator-------");
///////////////////////////////////////
// The Nullish Coalescing Operator
restaurant.numGuests = 0;
const guests3 = restaurant.numGuests || 10;
console.log(guests3);

// Nullish: null and undefined (NOT 0 or '')
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);

/* Logical Assignment Operator */
console.log("-------Logical Assignment Operator-------");

const resturent1 = {
  resturentName: "Capri",
  numGuest: 20,
};
const resturent2 = {
  resturentName: "la piaza",
  owner: "ratul",
};
const resturent3 = {
  resturentName: "rabbani",
  menu: ["kebab", "grill"],
};

resturent1.numGuest = resturent1.numGuest || 10;
resturent2.numGuest = resturent2.numGuest || 10;
resturent3.numGuest = resturent3.numGuest || 10;
console.log("-------Shortranging OR Operator-------");
console.log(resturent1, resturent2, resturent3);

resturent1.numGuest ||= 10;
resturent2.numGuest ||= 10;
resturent3.numGuest ||= 10;
console.log("-------Logical Assignment OR Operator-------");
console.log(resturent1, resturent2, resturent3);

resturent1.numGuest ??= 10;
resturent2.numGuest ??= 10;
resturent3.numGuest ??= 10;
console.log("-------Nullish Assignment Operator-------");
console.log(resturent1, resturent2, resturent3);

//resturent2.owner = resturent2.owner && "<Anonymous>";
resturent2.owner &&= "<Anonymous>";
console.log(resturent2);

//----Looping Arrays for of loop------
console.log("----Looping Arrays for of loop------");
const menuList = [...restaurant.starterMenu, ...restaurant.mainMenu];

for (const items of menuList) console.log(items);
for (const items of menuList.entries()) {
  console.log(items);
}
// Destructuring for of loops
for (const [i, el] of menuList.entries()) {
  console.log(`${i + 1} of ${el}`);
}

//----Optional Chaining------
console.log("----Optional Chaining (?.)------");
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

///////////////////////////////////////
// Looping Objects: Object Keys, Values, and Entries
console.log("----Looping Objects: Object Keys, Values, and Entries----");
//Property Names
const properties = Object.keys(openingHours);
console.log(properties);
let openStr = `We are open on ${properties.length} days :`;
for (const day of properties) {
  openStr += `${day} `;
}
console.log(openStr);

//Property Values
const values = Object.values(openingHours);
console.log(values);

//Entire Object
const entries = Object.entries(openingHours);
console.log(entries);

for (const [day, { open, close }] of entries) {
  console.log(`On ${day} day We are open at ${open} and close at ${close}`);
}

///////////////////////////////////////
// Sets Data Structure
console.log("------Sets Data Structure------");
const orderSet = new Set([
  "pasta",
  "pizza",
  "burger",
  "kebab",
  "pasta",
  "halim",
  "pizza",
]);
console.log(orderSet);
console.log(orderSet.size);
console.log(orderSet.has("pizza"));
console.log(orderSet.has("fuchka"));
console.log(orderSet.add("steak"));
console.log(orderSet.delete("burger"));
console.log(orderSet.size);
console.log(new Set("ratul"));

//loop is possible in set
for (const order of orderSet) {
  console.log(order);
}
console.log(new Set("muhtasim billah ratul").size);
/* Set has 4 method originally
1. has() 2. add() 3. delete() 4. clear()
set also has 7 new method in ES2025
1. intersection(), 2. union(), 3. difference(), 4. symmetricDifference() 5. isSubsetof(), 6. isSupersetof(), 7. isDisjointFrom()
set also use this method 
1. entries() 2. forEach() 3. keys() 4. values()
Sets property is (size) just like Array has property of (length)
 */
///////////////////////////////////////
// New Operations to Make Sets Useful!

const italianFoods1 = new Set([
  "pasta",
  "gnocchi",
  "tomatoes",
  "olive oil",
  "garlic",
  "basil",
]);

const mexicanFoods1 = new Set([
  "tortillas",
  "beans",
  "rice",
  "tomatoes",
  "avocado",
  "garlic",
]);

const commonFoods = italianFoods1.intersection(mexicanFoods1);
console.log("Intersection Foods are :", commonFoods);
console.log(...commonFoods);

const allFoods = italianFoods1.union(mexicanFoods1);
console.log("Union Foods are :", allFoods);
console.log(...allFoods);

const uniqueItalianFoods = italianFoods1.difference(mexicanFoods1);
console.log("Unique Italian Foods are : ", uniqueItalianFoods);

const uniqueMexicaFoods = mexicanFoods1.difference(italianFoods1);
console.log("Unique Mexican Foods are : ", uniqueMexicaFoods);

const uniqueItalianAndMexicanFoods =
  italianFoods1.symmetricDifference(mexicanFoods1);
console.log("Unique Foods of both Sets are :", uniqueItalianAndMexicanFoods);

console.log(italianFoods1.isDisjointFrom(mexicanFoods1));

///////////////////////////////////////
// Maps: Iteration

const question = new Map([
  ["question", "What is the best programming language in the world?"],
  [1, "C"],
  [2, "Java"],
  [3, "JavaScript"],
  ["correct", 3],
  [true, "Correct 🎉"],
  [false, "Try again!"],
]);
console.log(question);
