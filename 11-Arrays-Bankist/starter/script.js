"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
/* const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];
 */
// Elements
/* const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");
 */
/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
console.log("----Array Method Discussion----");
{
  let arr = ["a", "b", "c", "d", "e"];
  //slice method
  console.log("----Slice Immutable Method----");
  console.log(arr.slice());
  console.log(arr.slice(2));
  console.log(arr.slice(2, 4));
  console.log(arr.slice(-2));
  console.log(arr.slice(1, -2));
}

//splice method
{
  let arr = ["a", "b", "c", "d", "e"];
  console.log("----Splice Mutable Method----");
  console.log(arr);
  console.log(arr.splice(2));
  console.log(arr.splice(-2));
}

//Reverse Method
{
  console.log("----Reverse Mutable Method----");
  const arr2 = ["j", "i", "h", "g", "f"];
  console.log(arr2);
  console.log(arr2.reverse());
  console.log(arr2);
}

//Concat Method
{
  console.log("----Concat Immutable Method----");
  let arr3 = ["a", "b", "c", "d", "e"];
  let arr4 = ["f", "g", "h", "i", "j"];

  const letters = arr3.concat(arr4);
  console.log(letters);
  console.log([...arr3, ...arr4]); // spread operator work exasct same as concat method does

  //Join Method

  console.log("----Join Immutable Method----");
  console.log(letters.join(" - "));
}
{
  //at Method
  console.log("----at Immutable Method----at method also works on string");
  const arr5 = [45, 76, 24, 35];
  console.log(arr5[0]);
  console.log(arr5.at(0));

  // getting last element
  console.log(arr5[arr5.length - 1]);
  console.log(arr5.slice(-1)[0]);
  console.log(arr5.at(-1));
  console.log("ratul".at(0));
}

{
  console.log("----for each iterator(loop) method----");
  /* Definition: The forEach() method of Array instances executes a provided function once for each array element. */
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

  console.log("-----FOR Of Method-----");
  //for (const movement of movements) {
  for (const [i, movement] of movements.entries()) {
    if (movement > 0) {
      console.log(`Movement ${i} you deposited ${movement}`);
    } else {
      console.log(`movement ${i} you withdraw ${Math.abs(movement)} `);
    }
  }

  console.log("-----FOR Each Method-----");
  console.log("-----It's a higher order function-----");
  movements.forEach(function (movement, index, arr) {
    if (movement > 0) {
      console.log(`movement ${index} you deposited ${movement}`);
    } else {
      console.log(`movement ${index} you withdraw ${Math.abs(movement)}`);
    }
    //console.log(`${arr}`);
  });
  // continue and break is not applicable in forEach loop.
}

{
  console.log("-----forEach Method for MAP-----");
  const currencies = new Map([
    ["USD", "United States dollar"],
    ["EUR", "Euro"],
    ["GBP", "Pound sterling"],
  ]);
  currencies.forEach(function (value, key, map) {
    console.log(`${key} : ${value}`);
  });
}
{
  console.log("-----forEach Method for Set-----");
  const currenciesUnique = new Set([
    "USD",
    "EUR",
    "BDT",
    "GBP",
    "USD",
    "BDT",
    "usd",
  ]);
  console.log(currenciesUnique);
  currenciesUnique.forEach(function (value, _, set) {
    console.log(`${value} : ${value}`);
  });
}
