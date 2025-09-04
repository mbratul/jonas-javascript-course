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
    "2025-08-28T10:51:36.790Z",
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
const formatMovementDate = function (date, locale) {
  const calcDaysPassed = function (day1, day2) {
    return Math.round(Math.abs((day2 - day1) / (1000 * 60 * 60 * 24)));
  };
  const daysPassed = calcDaysPassed(new Date(), date);
  //console.log(daysPassed, "hello dates");

  if (daysPassed === 0) return `Today`;
  if (daysPassed === 1) return `Yesterday`;
  if (daysPassed < 7) return `${daysPassed} days ago`;
  // else {
  //   const day = `${date.getDate()}`.padStart(2, 0);
  //   const month = `${date.getMonth() + 1}`.padStart(2, 0);
  //   const year = date.getFullYear();
  //   return `${day}/${month}/${year}`;
  // }
  else {
    return new Intl.DateTimeFormat(locale).format(date);
  }
};

const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(value);
};

const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = "";

  const combineMovsDates = acc.movements.map(function (mov, i) {
    return { movement: mov, movementDate: acc.movementsDates.at(i) };
  });
  //console.log(combineMovsDates);
  if (sort)
    combineMovsDates.sort(function (a, b) {
      return a.movement - b.movement;
    });
  /* const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements; */

  combineMovsDates.forEach(function (obj, i) {
    const { movement, movementDate } = obj;
    const type = movement > 0 ? "deposit" : "withdrawal";

    const date = new Date(movementDate);

    const displayDate = formatMovementDate(date, acc.locale);

    const formatedMov = formatCurrency(movement, acc.locale, acc.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formatedMov}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);

  //labelBalance.textContent = `${acc.balance.toFixed(2)}€`;
  labelBalance.textContent = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  //labelSumIn.textContent = `${incomes.toFixed(2)}€`;
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  //labelSumOut.textContent = `${Math.abs(out).toFixed(2)}€`;
  labelSumOut.textContent = formatCurrency(
    Math.abs(out),
    acc.locale,
    acc.currency
  );

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  //labelSumInterest.textContent = `${interest.toFixed(2)}€`;
  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
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
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

// Set LogOut Time
const startLogOutTimer = function () {
  const callbackTime = function () {
    const mins = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = String(time % 60).padStart(2, 0);
    // In each call print the timer in the UI
    labelTimer.textContent = `${mins} : ${sec}`;

    //When 0 seconds, stop timer and log out user
    if (time === 0) {
      clearInterval(timer);
      labelWelcome.textContent = `Log in to get Started`;
      containerApp.style.opacity = 0;
    }
    //Decreased 1 second
    //time = time -1
    time--;
  };
  //Set Time to 5 minutes
  let time = 60;

  //Call timer every seconds
  callbackTime();
  const timer = setInterval(callbackTime, 1000);
  return timer;
};
///////////////////////////////////////
// Event handlers
let currentAccount, timer;

//Fake Always Logged IN
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;

//Experimenting API
/* const now = new Date();
const options = {
  hour: "numeric",
  minute: "numeric",
  day: "numeric",
  month: "long",
  year: "numeric",
  weekday: "long",
};
const localTime = navigator.language;
console.log(localTime);
labelDate.textContent = new Intl.DateTimeFormat(localTime, options).format(now); */

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

    //Create current Date and Time
    /* const now = new Date();
    const day = `${now.getDate()}`.padStart(2, 0);
    const month = `${now.getMonth() + 1}`.padStart(2, 0);
    const year = now.getFullYear();
    const hours = `${now.getHours()}`.padStart(2, 0);
    const minutes = `${now.getMinutes()}`.padStart(2, 0);
    labelDate.textContent = `${day}/${month}/${year}, ${hours}:${minutes}`; */

    //Experimenting Current Date Time API
    const now = new Date();
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "numeric",
      year: "numeric",
      weekday: "long",
    };
    // const localTime = navigator.language;
    // console.log(localTime);
    const localTime = currentAccount.locale;
    labelDate.textContent = new Intl.DateTimeFormat(localTime, options).format(
      now
    );

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //Clear Timer
    if (timer) {
      clearInterval(timer);
    }
    timer = startLogOutTimer();

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

    //Add Transfer Date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    //Reset Timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount * 0.1)
  ) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      //Add Loan Date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);
    }, 2000);
  }
  inputLoanAmount.value = "";

  //Reset Timer
  clearInterval(timer);
  timer = startLogOutTimer();
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
  displayMovements(currentAccount, !sorted);
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
{
  /////////////////////////////////////////////////
  //create a date
  console.log("---create a date-----");

  /* const currentDate = new Date();
  console.log(currentDate);
  console.log(new Date("Sep 02 2025 14:23:00"));
  console.log(new Date("December 24, 2024"));
  console.log(new Date(account1.movementsDates[0]));
  console.log(new Date(2034, 10, 25, 4, 15, 26));
  console.log(new Date(0));
  console.log(new Date(3 * 24 * 60 * 60 * 1000)); */

  //working with Dates
  const future = new Date(2034, 10, 25, 4, 15);
  console.log(future.getFullYear());
  console.log(future.getMonth());
  console.log(future.getDate());
  console.log(future.getDay());
  console.log(future.getHours());
  console.log(future.getMinutes());
  console.log(future.getSeconds());
  console.log(future.toISOString());
  console.log(future.getTime());

  console.log(new Date(2048019300000));
  console.log(Date.now());

  future.setFullYear(2035);
  console.log(future);
}
{
  /////////////////////////////////////////////////
  //Operation with Date
  console.log("----Operation with Date----");
  const future = new Date(2034, 10, 25, 4, 15);
  console.log(Number(future));
  console.log(+future); // plus operator also an alternative of Number() method

  // subtract two dates
  const calcDaysPassed = function (day1, day2) {
    return Math.abs((day2 - day1) / (1000 * 60 * 60 * 24));
  };
  const day1 = calcDaysPassed(new Date(2034, 10, 25), new Date(2034, 11, 20));
  console.log(day1);
}
{
  /////////////////////////////////////////////////
  //internation number format
  console.log("------internation number format------");
  const num = 3145642.5454;
  /* const options = {
    style: "unit",
    //unit: "mile-per-hour",
    unit: "celsius",
  }; */
  const options = {
    style: "currency",
    currency: "EUR",
    //useGrouping: false,
  };

  console.log("US :", new Intl.NumberFormat("en-US", options).format(num));
  console.log("Germany :", new Intl.NumberFormat("de-DE", options).format(num));
  console.log("Syria :", new Intl.NumberFormat("ar-SY", options).format(num));
  console.log(
    "Browser :",
    new Intl.NumberFormat(navigator.language, options).format(num)
  );
  console.log(
    navigator.language,
    new Intl.NumberFormat(navigator.language, options).format(num)
  );
}
