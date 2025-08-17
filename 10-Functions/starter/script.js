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

const oneWord = function (str) {
  return str.replace(/ /g, "").toLowerCase();
};
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(" ");
  return [first.toUpperCase(), ...others].join(" ");
};

//Higher Order Fuction
const transformer = function (str, fn) {
  console.log(`Original Word : ${str}`);
  console.log(`Transfor Word : ${fn(str)}`);
  console.log(`Transform by: ${fn.name}`);
};

transformer("JavaScript is best for web", upperFirstWord);
transformer("JavaScript is best for web", oneWord);
