"use strict";

// select elements
const score0Elem = document.querySelector("#score--0");
const score1Elem = document.querySelector("#score--1");
const current0Elem = document.querySelector("#current--0");
const current1Elem = document.querySelector("#current--1");
const diceElem = document.querySelector(".dice");
const btnNewElem = document.querySelector(".btn--new");
const btnRollElem = document.querySelector(".btn--roll");
const btnHoldElem = document.querySelector(".btn--hold");

// starting condition
score0Elem.textContent = 0;
score1Elem.textContent = 0;
diceElem.classList.add("hidden");

let currentScore = 0;
//rolling dice functionallity
btnRollElem.addEventListener("click", function () {
  //1. generating a random dice roll
  const dice = Math.trunc(Math.random() * 6) + 1;
  console.log(dice);
  //2. display dice
  diceElem.classList.remove("hidden");
  diceElem.src = `dice-${dice}.png`;
  //3.check for rolled 1: if true, switch to next player
  if (dice !== 1) {
    // add dice to current score
    currentScore += dice;
    current0Elem.textContent = currentScore; // change later
  } else {
    // switch to next player
    //current0Elem.textContent = 0;
  }
});
