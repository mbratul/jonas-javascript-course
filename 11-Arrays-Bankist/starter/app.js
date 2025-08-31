/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
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

//creat a function for display
const displayMovement = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? "deposit" : "withdrawal";
    const html = `
        <div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${mov}€</div>
        </div>
    `;
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

//displayMovement(account1.movements);

// calculate total
const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce(function (acc, mov) {
    return acc + mov;
  }, 0);

  labelBalance.textContent = `${acc.balance}€`;
};
//calcDisplayBalance(account1.movements);
//console.log(containerMovements.innerHTML);

// calculate total deposit
const calcDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);
  labelSumIn.textContent = `${income}€`;

  // calculate total withdrawl
  const withdrawal = acc.movements
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);
  labelSumOut.textContent = `${Math.abs(withdrawal)}€`;

  // calculate total interest
  const interest = acc.movements
    .filter(function (mov) {
      return mov > 0;
    })
    .map(function (deposit) {
      return (deposit * acc.interestRate) / 100;
    })
    .filter(function (int, i, arr) {
      //console.log(i, arr);
      return int >= 1;
    })
    .reduce(function (acc, int) {
      return acc + int;
    }, 0);
  labelSumInterest.textContent = `${interest}€`;
};
console.log("display summary");
//calcDisplaySummary(account1.movements);

// calculate total withdrawl
/* const calcDisplayWithdrawl = function (movements) {
  const withdrawal = movements
    .filter(function (mov) {
      return mov < 0;
    })
    .reduce(function (acc, mov) {
      return acc + mov;
    }, 0);
  labelSumOut.textContent = `${Math.abs(withdrawal)}€`;
};
calcDisplayWithdrawl(account1.movements); */
// user name
console.log("------user name------");
const creatUserNames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};
//const user = "Steven Thomas Williams";
//console.log(creatUserNames(accounts));
creatUserNames(accounts);
console.log(accounts);

console.log("----Find Method----");
const accountOwner = accounts.find(function (acc) {
  return acc.owner === "Jessica Davis";
});
console.log(accountOwner);

// Update UI
function updateUI(acc) {
  //Display movements
  displayMovement(acc.movements);
  //Display balance
  calcDisplayBalance(acc);
  //Display summary
  calcDisplaySummary(acc);
}
// Log in Event Handler
let currentAccount; // create a varibale for current account

btnLogin.addEventListener("click", function (e) {
  // Prevent form from Submitting
  e.preventDefault();
  currentAccount = accounts.find(function (acc) {
    return acc.username === inputLoginUsername.value;
  });
  console.log(currentAccount);
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //console.log("log in");
    //Display UI and message
    labelWelcome.textContent = `Welcome Back, ${
      currentAccount.owner.split(" ")[0]
    }`;
    containerApp.style.opacity = 1;
    //Clear Input Field
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    //Update UI
    updateUI(currentAccount);
  }
});

// transfer money event
btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAccount = accounts.find(function (acc) {
    return acc.username === inputTransferTo.value;
  });
  console.log(amount, receiverAccount);
  if (
    amount > 0 &&
    receiverAccount &&
    currentAccount.balance >= amount &&
    receiverAccount?.username !== currentAccount.username
  ) {
    //console.log("transfer valid");
    //Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAccount.movements.push(amount);

    //Update UI
    updateUI(currentAccount);
  }
  inputTransferAmount.value = inputTransferTo.value = "";
});

//implementing loan button event
btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);
  // 10% of requested amount
  const loanCondition = currentAccount.movements.some(function (mov) {
    return mov > amount / 10;
  });
  if (amount > 0 && loanCondition) {
    //Add Movement
    currentAccount.movements.push(amount);

    //UpdateUI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

//implementation of find index method of close account button
btnClose.addEventListener("click", function (e) {
  e.preventDefault();
  //console.log("delete");
  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    //findIndex : Returns the index of the first element in the array where predicate is true, and -1 otherwise.
    const index = accounts.findIndex(function (acc) {
      return acc.username === currentAccount.username;
    });
    //console.log(index);

    //Delete Account
    accounts.splice(index, 1);

    //Hide UI
    containerApp.style.opacity = 0;
  }
  // clear the field
  inputCloseUsername.value = inputClosePin.value = "";
});

//Evey method : Determines whether all the members of an array satisfy the specified test.
// return true or false
console.log("Every Method", account4);
console.log(
  account4.movements.every(function (mov) {
    return mov > 0;
  })
);

//event button sort
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovement(currentAccount.movements, !sorted);
  sorted = !sorted;
});

//collecting Node list data of transaction

labelBalance.addEventListener("click", function () {
  let movementValueElem = document.querySelectorAll(".movements__value");
  const movmentUI = Array.from(movementValueElem, function (el) {
    return Number(el.textContent.replace("€", ""));
  });
  console.log(movmentUI);
});
