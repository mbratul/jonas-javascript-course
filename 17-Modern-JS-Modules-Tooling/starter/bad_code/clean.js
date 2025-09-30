"use strict";
const budget = [
  { value: 250, description: "Sold old TV 📺", user: "jonas" },
  { value: -45, description: "Groceries 🥑", user: "jonas" },
  { value: 3500, description: "Monthly salary 👩‍💻", user: "jonas" },
  { value: 300, description: "Freelancing 👩‍💻", user: "jonas" },
  { value: -1100, description: "New iPhone 📱", user: "jonas" },
  { value: -20, description: "Candy 🍭", user: "matilda" },
  { value: -125, description: "Toys 🚂", user: "matilda" },
  { value: -1800, description: "New Laptop 💻", user: "jonas" },
];

const spendinglimits = Object.freeze({
  jonas: 1500,
  matilda: 100,
});
const getLimit = (user) => (spendinglimits[user] ? spendinglimits[user] : 0);

const addExpenses = function (value, description, user) {
  if (!user) user = "jonas";
  user = user.toLowerCase();

  /* let lim;
  if (spendinglimits[user]) {
    lim = spendinglimits[user];
  } else {
    lim = 0;
  } */
  //const limit = spendinglimits[user] ? spendinglimits[user] : 0;
  //getLimit(user);

  if (value <= getLimit(user)) {
    budget.push({ value: -value, description, user });
  }
};
addExpenses(10, "Pizza 🍕");
addExpenses(100, "Going to movies 🍿", "Matilda");
addExpenses(200, "Stuff", "Jay");

const checkExpenses = function () {
  for (const entry of budget) {
    /* let lim;
    if (spendinglimits[entry.user]) {
      lim = spendinglimits[entry.user];
    } else {
      lim = 0;
    } */
    //const limit = spendinglimits[entry.user] ? spendinglimits[entry.user] : 0;

    if (entry.value < -getLimit(entry.user)) {
      entry.flag = "limit";
    }
  }
};
checkExpenses();

const logBigExpenses = function (bigLimit) {
  let output = "";
  for (const entry of budget) {
    output += entry.value <= -bigLimit ? `${entry.description.slice(-2)}/` : "";
    /* if (entry.value <= -bigLimit) {
      output += `${entry.description.slice(-2)}/`; // Emojis are 2 chars
    } */
  }
  output = output.slice(0, -2); // Remove last '/ '
  console.log(output);
};
//console.log(budget);
console.log(budget);
logBigExpenses(100);
{
  //Imaparative Way
  console.log("Imaparative Way");
  const arr = [2, 4, 25, 6, 4, 9, 45];
  const double = [];
  for (let i = 0; i < arr.length; i++) {
    double[i] = arr[i] * 2;
  }
  console.log(double);
}
{
  //Declearative Way
  console.log("Declearative Way");
  const arr = [2, 4, 25, 6, 4, 9, 45];
  const double = arr.map((n) => n * 2);
  console.log(double);
}
