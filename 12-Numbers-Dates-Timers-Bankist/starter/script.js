"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    "2019-11-18T21:31:17.178Z",
    "2019-12-23T07:42:02.383Z",
    "2020-01-28T09:15:04.904Z",
    "2020-04-01T10:17:24.185Z",
    "2020-05-08T14:11:59.604Z",
    "2020-05-27T17:01:17.194Z",
    "2020-07-11T23:36:17.929Z",
    "2020-07-12T10:51:36.790Z",
  ],
  currency: "EUR",
  locale: "pt-PT", // de-DE
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    "2019-11-01T13:15:33.035Z",
    "2019-11-30T09:48:16.867Z",
    "2019-12-25T06:04:23.907Z",
    "2020-01-25T14:18:46.235Z",
    "2020-02-05T16:33:06.386Z",
    "2020-04-10T14:43:26.374Z",
    "2020-06-25T18:49:59.371Z",
    "2020-07-26T12:01:20.894Z",
  ],
  currency: "USD",
  locale: "en-US",
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
// Elements
const labelWelcome = document.querySelector(".welcome");
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

/////////////////////////////////////////////////
// Functions

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov.toFixed(2)}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes.toFixed(2)}€`;

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest.toFixed(2)}€`;
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc.movements);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

///////////////////////////////////////
// Event handlers
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 100;

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = "";
});

let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

{
  /////////////////////////////////////////////////
  //Number Method
  console.log("----Number Method------");
  console.log(23 === 23.0);

  //Base 10 -> 0-9
  //Base 2-> 0,1
  console.log(0.1 + 0.2);
  console.log(0.1 + 0.2 === 0.3);

  //Convert String to Number
  console.log(Number("23"));
  console.log(+"23");

  //Parsing
  console.log(Number.parseInt("30px"));
  console.log(Number.parseInt("e30"));

  //Parse Float
  console.log(Number.parseInt("2.5rem"));
  console.log(Number.parseFloat("2.5rem"));

  //isNaN method
  console.log(Number.isNaN(20));
  console.log(Number.isNaN("20"));
  console.log(Number.isNaN(+"20x"));
  console.log(Number.isNaN(23 / 0));

  //isFinite method
  //The best way to checking a value is a number or not
  console.log(Number.isFinite(20));
  console.log(Number.isFinite("20"));
  console.log(Number.isFinite(+"20x"));

  //isInteger
  console.log(Number.isInteger(20));
  console.log(Number.isInteger("20"));
  console.log(Number.isInteger(+"20x"));
}
{
  /////////////////////////////////////////////////
  //Math and Rounding
  console.log("-----Math and Rounding------");
  console.log(Math.sqrt(25));
  console.log(25 ** (1 / 2));
  console.log(8 ** (1 / 3)); //qubic root
  console.log(Math.max(15, 24, 45, 18, 5));
  console.log(Math.max(15, 24, 45, "18", 5));
  console.log(Math.max(15, 24, 45, "18px", 5));
  console.log(Math.min(15, 24, 45, 18, 5));

  //radius calculation
  console.log(Math.PI * Number.parseFloat("10px") ** 2);

  console.log(Math.trunc(Math.random() * 6) + 1);
}
{
  //random number generator
  const randomInt = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  console.log(randomInt(10, 20));
  console.log(randomInt(0, 5));
}
{
  //Rounding Integers
  console.log(Math.trunc(23.04));

  console.log(Math.round(23.9));
  console.log(Math.round(23.3));

  console.log(Math.ceil(23.9));
  console.log(Math.ceil(23.3));

  console.log(Math.floor(23.9));
  console.log(Math.floor(23.3));

  console.log(Math.floor(-23.3));
  console.log(Math.trunc(-23.3));
}
{
  //Rounding Decimals
  //Returns a string representing a number in fixed-point notation.
  console.log((2.7).toFixed(0));
  console.log((2.7).toFixed(3));
}
{
  /////////////////////////////////////////////////
  //Reminder Operator
  console.log("---Reminder Operator---");
  console.log(5 % 2);
  console.log(5 / 2);
  console.log(8 % 3);
  console.log(8 / 3);

  // test even number
  const isEven = function (n) {
    if (n % 2 === 0) {
      return `Even Number`;
    } else {
      return `Odd Number`;
    }
  };
  console.log(isEven(8));
  console.log(isEven(45));
  console.log(isEven(56));
  console.log(isEven(604));
  console.log(isEven(64));

  //event handler on click change the even row color
  labelBalance.addEventListener("click", function () {
    [...document.querySelectorAll(".movements__row")].forEach(function (
      row,
      i
    ) {
      if (i % 2 == 0) {
        return (row.style.backgroundColor = "orangeRed");
      }
      if (i % 3 == 0) {
        return (row.style.backgroundColor = "blue");
      }
    });
  });
}
{
  /////////////////////////////////////////////////
  //Numeric Seperator
  // Numeric (_) Seperator can not use at the begining, at the end and after a fraction point
  console.log("---Numeric Seperator---");

  const diameter = 287_460_000_000; //(_) means numeric seperator
  console.log(diameter);

  const priceCents = 345_999;
  console.log(priceCents);

  const PI = 3.14_15;
  console.log(PI);

  console.log(Number("23000"));
  console.log(parseInt("23000"));
}
{
  /////////////////////////////////////////////////
  //Working with Big Int
  console.log(2 ** 53 - 1); // this is the biggest number js can safely represent
  console.log(Number.MAX_SAFE_INTEGER);
  console.log(4561324643135456434564589456564n); // using n at the end convert it a big int number
  console.log(BigInt(45613246431)); // use big int function

  //operations
  console.log(10000n + 10000n);
  console.log(5646134654564654644 * 56461644645645644);
  const huge = 564654655456454646444565446464465446546234564n;
  const num = 45;
  console.log(huge * BigInt(num)); // Uncaught TypeError: Cannot mix BigInt and other types, use explicit conversions

  //Exception
  console.log(20n > 15);
  console.log(20n === 20);
  console.log(typeof 20n);
  console.log(20n == 20);

  console.log(huge + " is really big");

  //Divisions
  console.log(10n / 3n);
  console.log(10 / 3);
}
