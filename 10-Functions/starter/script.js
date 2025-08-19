"use strict";
///////////////////////////////////////
// Default Parameters
console.log("---Default Parameters----");

const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  //ES5 boilerplate of Default Parameter
  //numPassengers = numPassengers || 1;
  //price = price || 199;
  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking("LH123");
createBooking("LH123", 2, 800);
createBooking("LH123", 3);
createBooking("LH123", 5);
createBooking("LH123", undefined, 1000);

///////////////////////////////////////
// How Passing Arguments Works: Values vs. Reference
console.log("---How Passing Arguments Works: Values vs. Reference---");

const flight = "LH234";
const jonas = {
  userName: "jonas",
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = "LH999";
  passenger.userName = "Mr " + passenger.userName;
  if (passenger.passport === 24739479284) {
    alert("Check in");
  } else {
    alert("Wrong Passport");
  }
};

//checkIn(flight, jonas);
console.log(flight);
console.log(jonas);

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 10000);
};

//newPassport(jonas);
//checkIn(flight, jonas);

///////////////////////////////////////
// Higher Order Function - Functions Accepting Callback Functions
console.log("Higher Order Function - Functions Accepting Callback Functions");

/* First-class function: 
A programming language is said to have First-class functions when functions in that language are treated like any other variable. For example, in such a language, a function can be passed as an argument to other functions, can be returned by another function and can be assigned as a value to a variable. */
// first class function
const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};

// first class function
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};
/* Higher Order Function: 
A Higher-Order Function (HOF) in JavaScript is a function that does one or both of the following:
Takes another function as an argument (a callback function).
Returns a new function.
This makes JavaScript very powerful because functions can be treated just like values (they are first-class citizens).
 */
//Higher Order Fuction
const transformer = function (str, fn) {
  console.log(`Original Word : ${str}`);
  console.log(`Transform Word : ${fn(str)}`);
  console.log(`Transform by: ${fn.name}`);
};

transformer("JavaScript is best for web", upperFirstWord);
transformer("JavaScript is best for web", oneWord);

const high5 = function () {
  console.log("👏");
};
document.body.addEventListener("click", high5);

["ratul", "jasim", "tamim"].forEach(high5);
const text = "hi this is a test javascript method";
const [first, ...other] = text.split(" ");
console.log(text.split(" "));
console.log([first, ...other].join(" "));

///////////////////////////////////////
// Functions Returning Functions
console.log("----Functions Returning Functions----");

const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};
const greeterHey = greet("hey");
greeterHey("jonas");

greet("hello")("jonas");

// Rewrite this greet into a arrow function

/* const greetArrow = (greeting) => {
  return (userName) => {
    console.log(`${greeting} ${userName}`);
  };
};
const greetHeyArrow = greetArrow("hey arrow");
greetHeyArrow("jonas arrow"); */

// arrow function
const greetArrow = (greeting) => (name) => console.log(`${greeting} ${name}`);
greetArrow("hey")("jonas arrow");

///////////////////////////////////////
// The call and apply Methods
console.log("----The call and apply Methods----");

const lufthansa = {
  airline: "Luftahnsa",
  iataCode: "LH",
  bookings: [],
  book: function (flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    //debugger;
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

const book = lufthansa.book;
//does not work
//book(254, 'sara williams')

lufthansa.book(236, "john smith");
lufthansa.book(635, "mike tyson");
console.log(lufthansa);

const euroAirlines = {
  airline: "EuroWings",
  iataCode: "EW",
  bookings: [],
};
// Call Method
book.call(euroAirlines, 23, "sara williams");
console.log(euroAirlines);
book.call(lufthansa, 243, "john allen");
console.log(lufthansa);

const swiss = {
  airline: "Swiss Airlines",
  iataCode: "LX",
  bookings: [],
};
book.call(swiss, 465, "Willam Aren");
console.log(swiss);

// Apply Method does not use in moder javascript now mainly use spread operator

const flightData1 = [583, "Geaorge Cooper"];
book.call(swiss, ...flightData1);
console.log(swiss);

//bind method

const bookEw = book.bind(euroAirlines);
const bookLh = book.bind(lufthansa);
const bookLx = book.bind(swiss);

bookEw(245, "Sarah Williams");
bookEw(345, "Steven Smith");

const bookEw348 = book.bind(euroAirlines, 348);
bookEw348("jordan belfost");
bookEw348("usman malik");

//With Event Listener
lufthansa.planes = 300;
lufthansa.buyplane = function () {
  console.log(this);
  this.planes++;
  console.log(this.planes);
};
//lufthansa.buyplane();
document
  .querySelector(".buy")
  .addEventListener("click", lufthansa.buyplane.bind(lufthansa));

// partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

const addVat = addTax.bind(null, 0.23);
//addVat = value => value + value * 0.23

console.log(addVat(100));
console.log(addVat(23));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVat2 = addTaxRate(0.23);
console.log(addVat2(200));
console.log(addVat(100));
console.log(addVat(23));

///////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)
console.log("----Immediately Invoked Function Expressions (IIFE)----");
/* Definition: Immediately Invoked Function Expressions (IIFE) are JavaScript functions that are executed immediately after they are defined. They are typically used to create a local scope for variables to prevent them from polluting the global scope. url: https://www.geeksforgeeks.org/javascript/immediately-invoked-function-expressions-iife-in-javascript/*/

const runOnce = function () {
  console.log("this will run once");
};
runOnce();

// IIFE
(function () {
  console.log("IIFE function this will never run again");
  const isPrivate = 23;
})();
//not work outside of IIFE function
//console.log(isPrivate); //Uncaught ReferenceError: isPrivate is not defined
// Arrow IIFE
(() => console.log("Arrow IIFE function it will never run again"))();

// Example of block scope in js
{
  const isPrivate = 23;
}
//also it's not work because it's outside of it's scop
//console.log(isPrivate); //Uncaught ReferenceError: isPrivate is not defined

/* 
  Use Cases Of IIFE
Avoid polluting the global namespace.
To create closures in JavaScript.
IIFE is used to create private and  public variables and methods.
It is used to execute the async and await function.
It is used to work with require function. 
*/

///////////////////////////////////////
// Closures
console.log("----Closures----");
/* Definition: A closure is a function that retains access to its outer function's variables, even after the outer function has finished executing. It "remembers" the environment in which it was created, allowing it to access variables outside its immediate scope. url: https://www.geeksforgeeks.org/javascript/closure-in-javascript/ */

const secureBooking = function () {
  let passangerCount = 0;
  return function () {
    passangerCount++;
    console.log(`${passangerCount} passangers`);
  };
};

const booker = secureBooking();

booker(1);
booker(2);
booker(3);
booker(0);
