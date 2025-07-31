"use strict";

// select elements
const player0Elem = document.querySelector(".player--0");
const player1Elem = document.querySelector(".player--1");
const score0Elem = document.querySelector("#score--0");
const score1Elem = document.querySelector("#score--1");
const current0Elem = document.querySelector("#current--0");
const current1Elem = document.querySelector("#current--1");
const diceElem = document.querySelector(".dice");
const btnNewElem = document.querySelector(".btn--new");
const btnRollElem = document.querySelector(".btn--roll");
const btnHoldElem = document.querySelector(".btn--hold");

// starting condition
let scores, currentScore, activePlayer, playing;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Elem.textContent = 0;
  score1Elem.textContent = 0;
  current0Elem.textContent = 0;
  current1Elem.textContent = 0;

  diceElem.classList.add("hidden");
  player0Elem.classList.remove("player--winner");
  player1Elem.classList.remove("player--winner");
  player0Elem.classList.add("player--active");
  player1Elem.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Elem.classList.toggle("player--active");
  player1Elem.classList.toggle("player--active");
};

//rolling dice functionallity
btnRollElem.addEventListener("click", function () {
  // debugger;
  if (playing) {
    //1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display dice
    diceElem.classList.remove("hidden");
    diceElem.src = `dice-${dice}.png`;
    //3.check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
      //current0Elem.textContent = currentScore; // change later
    } else {
      // switch to next player
      switchPlayer();
      //current0Elem.textContent = 0;
    }
  }
});

btnHoldElem.addEventListener("click", function () {
  if (playing) {
    //1. Add curret score to active player's score

    //scores[1] = scores[1] + currentScore;
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2. Check if player's score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish the game
      playing = false;
      diceElem.classList.add("hidden");
      document;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      //3. Switch to the next player
      switchPlayer();
    }
  }
});

btnNewElem.addEventListener("click", init);
