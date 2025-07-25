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
