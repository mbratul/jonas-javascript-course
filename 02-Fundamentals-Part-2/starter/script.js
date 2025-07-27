"use strict";

// function

/* Functions in JavaScript are reusable blocks of code designed to perform specific tasks. They allow you to organize, reuse, and modularize code. It can take inputs, perform actions, and return outputs. 
url : https://www.geeksforgeeks.org/javascript/functions-in-javascript/
*/
/* Key Characteristics of Functions
- Parameters vs Arguments: Parameters are placeholders for function and arguments are actual value for those placeholders.
- Return Values: Functions can return a value using the return keyword.
- Default Parameters: Default values can be assigned to function parameters. */

function logger() {
  console.log("My Name is Jonas");
}
// invoking / calling / running -- a function
/* Function Invocation
The function code you have written will be executed whenever it is called.

- Triggered by an event (e.g., a button click by a user).
- When explicitly called from JavaScript code.
- Automatically executed, such as in self-invoking functions. */
logger();
/* Function Parameters
Parameters are input passed to a function. In the above example, sum(x , y) takes two parameters, x and y. */
function fruitProcessor(apples, oranges) {
  console.log(apples, oranges);
  const juice = `Juice with ${apples} apples and ${oranges} oranges`;
  return juice;
}
// Argument : In JavaScript, an argument is the value that you pass to a function when you call it.
fruitProcessor(5, 10);
console.log(fruitProcessor(5, 10));

const fruitJuice = fruitProcessor(2, 4); // store the value of a function
console.log(fruitJuice);

// Calculate age

// function declaration
function calculateAge1(birthYear) {
  return 2025 - birthYear;
}
const age1 = calculateAge1(1985);
console.log(age1);

// function expression
// expression produced values
const age2 = function (birthYear) {
  return 2025 - birthYear;
};

// Arrow Function
//url : https://www.geeksforgeeks.org/javascript/arrow-functions-in-javascript/

const yearsUntilretirement = (birthYear, firstname) => {
  const age3 = 2037 - birthYear;
  const retirementAge = 60 - age3;
  return `${firstname} retires in ${retirementAge} years`;
};
console.log(yearsUntilretirement(1991, "jonas"));
console.log(yearsUntilretirement(1981, "bob"));

// function calling other functions
function cutPieces(fruit) {
  return fruit * 4;
}
function fruitProcessor1(apples, oranges) {
  const applePieces = cutPieces(apples);
  const orangePieces = cutPieces(oranges);
  console.log(apples, oranges);
  const juice = `Juice with ${applePieces} slices of ${apples} apples and ${orangePieces} slices of ${oranges} oranges`;
  return juice;
}
console.log(fruitProcessor1(4, 5));

///////////////////////////////////////
// Reviewing Functions
const calcAge = function (birthYear) {
  return 2025 - birthYear;
};

const yearsUntilRetirement = function (birthYear, firstName) {
  const age = calcAge(birthYear);
  const retirement = 65 - age;
  if (retirement > 0) {
    console.log(`${firstName} retires in ${retirement} years`);
    return retirement;
  } else {
    console.log(`${firstName} has already retired`);
    return -1;
  }
};

console.log(yearsUntilRetirement(1991, "Jonas"));
console.log(yearsUntilRetirement(1950, "Mike"));

///////////////////////////////////////
// Introduction to Arrays

const friends = ["Michel", "Steven", "Peter"];
console.log(friends);
console.log(friends[0]);
console.log(friends.length);
console.log(friends[friends.length - 1]);

const years = new Array(1991, 1955, 1967, 2015, 2007);
console.log(years);
const firstName = "Jonas";
const jonas = [firstName, "Schmedtmann", 2037 - 1991, "teacher", friends];
console.log(jonas);
console.log(jonas.length);

// Exercise
const calcAge1 = function (birthYeah) {
  return 2037 - birthYeah;
};
const years1 = [1991, 1955, 1967, 2015, 2007];
const ages = [
  calcAge(years1[0]),
  calcAge(years1[2]),
  calcAge1(years1[years1.length - 1]),
];
console.log(ages);

// some useful array method
const friends1 = ["Michel", "Steven", "Peter"];
// add element
friends1.push("jay"); // add an element last of an array
console.log(friends1);
friends1.unshift("john"); // add an element first of an array
console.log(friends1);

// remove element
friends1.pop(); //remove last elements of an array
console.log(friends1);
friends1.shift(); //remove first elements of an array
console.log(friends1);

console.log(friends1.indexOf("Steven")); //index of an element in an array
console.log(friends1.indexOf("Bob")); //show -1 because element is not in an array
console.log(friends1.includes("Steven")); //check true or false an element in an array
console.log(friends1.includes("Bob")); //check true or false element is not in an array

if (friends1.includes("Steven")) {
  console.log(`you have a friend name Steven`);
}
/* 
Objects in Javascript

An object in JavaScript is a data structure used to store related data collections. It stores data as key-value pairs, where each key is a unique identifier for the associated value. Objects are dynamic, which means the properties can be added, modified, or deleted at runtime.

There are two primary ways to create an object in JavaScript: Object Literal and Object Constructor. 
url: https://www.geeksforgeeks.org/javascript/objects-in-javascript/
*/

const ratul = {
  firstName: "Muhtasim",
  middleName: "Billah",
  lastName: "Ratul",
  job: "Web Developer",
  birthYear: 1985,
  friends: ["porosh", "sabbir", "moon"],
  hasDriverLicense: true,
  calcAge: function () {
    return 2025 - this.birthYear;
  },
  getSummary1: function () {
    return `${this.lastName} is a ${this.calcAge()}-year old ${
      this.job
    }, and he has ${this.hasDriverLicense ? "a" : "no"} driver's license`;
  },
};
console.log(ratul);
console.log(ratul.calcAge());
// Dot vs. Bracket Notation
console.log(`dot notation to display data from object ${ratul.firstName}`); // dot notation to display data from object
console.log(
  `bracket notation to display data from object ${ratul["firstName"]}`
); // bracket notation to display data from object

const nameKey = "Name";
console.log(ratul["first" + nameKey]);
console.log(ratul["middle" + nameKey]);
console.log(ratul["last" + nameKey]);

/* const interestedIn = prompt(
  "what do you want to know about ratul, name, job, friends"
);
console.log(ratul[interestedIn]); */
ratul.location = "Dhaka";
ratul["twitter"] = "@mbratul";

// Challenge
// "Ratul has 3 friends, and his best friend is called porosh"
console.log(
  `${ratul.lastName} has ${ratul.friends.length} friends, and his best friend name is ${ratul.friends[0]}`
);
// console.log(Date());

// Challenge
// "Ratul is a 46-year old teacher, and he has a driver's license"
console.log(ratul.getSummary1());

///////////////////////////////////////
// Iteration: The for Loop

// for loop keeps running while condition is TRUE
for (let rep = 1; rep <= 10; rep++) {
  console.log(`Lifting weights repetition ${rep} 🏋️‍♀️`);
}

// Looping Arrays, Breaking and Continuing
const jonasArray = [
  "Jonas",
  "Schmedtmann",
  2037 - 1991,
  "teacher",
  ["Michael", "Peter", "Steven"],
  true,
];
const types = [];
for (let i = 0; i < jonasArray.length; i++) {
  console.log(jonasArray[i], typeof jonasArray[i]);
  types[i] = typeof jonasArray[i];
  //types.push(typeof jonasArray[i]);
}
console.log(types);

const yearsArray = [1994, 1985, 1976, 2002, 2022];
const agesArray = [];

for (let i = 0; i < yearsArray.length; i++) {
  agesArray.push(2025 - yearsArray[i]);
}
console.log(agesArray);

// continue and break
console.log("--- ONLY STRINGS ---");
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] !== "string") continue;

  console.log(jonas[i], typeof jonas[i]);
}

console.log("--- BREAK WITH NUMBER ---");
for (let i = 0; i < jonas.length; i++) {
  if (typeof jonas[i] === "number") break;

  console.log(jonas[i], typeof jonas[i]);
}
///////////////////////////////////////
// Looping Backwards
// 0, 1, ..., 4
// 4, 3, ..., 0
{
  console.log("--- Looping Backwards ---");
  for (let i = jonasArray.length - 1; i >= 0; i--) {
    console.log(i, jonasArray[i]);
  }
}
//  Loops in Loops
{
  console.log("--- Loops in Loops ---");
  for (let exercise = 1; exercise <= 3; exercise++) {
    console.log(`------ Starting Exercise ---- ${exercise}`);
    for (let repetition = 1; repetition <= 3; repetition++) {
      console.log(
        `Exercise ${exercise} Lifting weight repetition ${repetition}`
      );
    }
  }
}

///////////////////////////////////////
// The while Loop
{
  console.log("--- While Loops ---");
  let repetition = 1;
  while (repetition <= 3) {
    console.log(`Exercise Lifting weight repetition ${repetition}`);
    repetition++;
  }
  console.log("---Random Number While Loops ---");
  let dice = Math.trunc(Math.random() * 6) + 1;
  //console.log(dice);
  while (dice !== 6) {
    console.log(`your rool value is ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log(`loop is about to end`);
  }
}
