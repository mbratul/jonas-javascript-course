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
  /* 
  - Purpose: Used to execute a function on each element of the array.
  - Return Value: undefined → it doesn’t return a new array.
  - Use Case: When you just want to perform side effects (like logging, updating variables, modifying DOM, etc.), not build a new array. 
  */
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
  /* 
  - Purpose: Used to execute a function on each element of the array.
  - Return Value: undefined → it doesn’t return a new array.
  - Use Case: When you just want to perform side effects (like logging, updating variables, modifying DOM, etc.), not build a new array. 
  */
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

///////////////////////////////////////
// The map Method
/* Definition: The map() method is an ES5 feature that creates a new array by applying a function to each element of the original array. It skips empty elements and does not modify the original array. */
/* 
  - Purpose: Used to transform each element of the array into something new.
  - Return Value: A new array with the transformed values (original array is unchanged).
  - Use Case: When you want to create a new array based on the old one.
 */
{
  console.log("----map immutable method----");
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
  const euroToUSD = 1.1;
  // map method convert USD to Euro
  //Calls a defined callback function on each element of an array, and returns an array that contains the results.
  const movementsUSD = movements.map(function (mov) {
    return Math.trunc(mov * euroToUSD);
    //return 23;
  });
  // using arrow function
  const movementsUSDArrow = movements.map((mov) => Math.trunc(mov * euroToUSD));

  console.log(movements);
  console.log(movementsUSD);
  console.log(movementsUSDArrow);

  //display movements deposited or withdrawl
  const movementsDescriptions = movements.map(function (mov, i) {
    return `Movement ${
      i + 1
    } you ${mov > 0 ? "deposited" : "withdraw"} ${Math.abs(mov)}`;
    /* if (mov > 0) {
      return `movement ${i + 1} you deposited ${mov}`;
    } else {
      return `Movement ${i + 1} you withdraw ${Math.abs(mov)}`;
    } */
  });
  console.log(movementsDescriptions);
  console.log(...movementsDescriptions);

  const data = [1, 5, 64, 48, 54, 76, 25, 48];

  const mapData = data.map(function (currentValue, index, arr) {
    return `Ratul ${index + 1}`;
    //return currentValue % 2;
    // console.log(currentValue * 2);
    // console.log(index);
    // console.log(arr);
    // console.log("----------");
  });
  console.log(mapData);
}

///////////////////////////////////////
// The Filter Method
/* Definition: The filter() method of Array instances creates a shallow copy of a portion of a given array, filtered down to just the elements from the given array that pass the test implemented by the provided function. */
{
  console.log("----filter immutable method----");
  const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

  // filter the array with only positive value
  //Returns the elements of an array that meet the condition specified in a callback function.
  const deposits = movements.filter(function (mov) {
    return mov > 0;
  });
  console.log(movements);
  console.log(deposits);
  // filter the array with only negative value
  const withdrawls = movements.filter(function (mov) {
    return mov < 0;
  });
  console.log(withdrawls);
}

///////////////////////////////////////
// The Reduce Method
{
  console.log("----reduce immutable method----");
}
