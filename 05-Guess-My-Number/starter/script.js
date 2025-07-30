"use strict";
/* console.log(document.querySelector(".message").textContent);
console.log(
  (document.querySelector(".message").textContent = "Correct Number")
);

console.log((document.querySelector(".number").textContent = 13));
console.log((document.querySelector(".score").textContent = 10));
document.querySelector(".guess").value = 23;
console.log(document.querySelector(".guess").value); */
//secret number
let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;
//document.querySelector(".number").textContent = secretNumber;

//message element variable
//const messageElem = document.querySelector(".message");

// refactoring codebase using function
const displayMesage = function (message) {
  document.querySelector(".message").textContent = message;
};
// check button event listener
const checkBtnElem = document.querySelector(".check");
checkBtnElem.addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);
  // When there is no input
  if (!guess) {
    //messageElem.textContent = "No Number";
    displayMesage("No Number");
  } // when player wins
  else if (guess === secretNumber) {
    //messageElem.textContent = "Correct Number";
    displayMesage("Correct Number");
    document.querySelector(".number").textContent = secretNumber;
    document.querySelector("body").style.backgroundColor = "#60b347";
    document.querySelector(".number").style.width = "30rem";

    if (score > highScore) {
      highScore = score;
      document.querySelector(".highscore").textContent = highScore;
    }
  } // when guess is wrong
  else if (guess !== secretNumber) {
    if (score > 1) {
      //messageElem.textContent = guess > secretNumber ? "Too High" : "Too Low";
      displayMesage(guess > secretNumber ? "Too High" : "Too Low");
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      //messageElem.textContent = "You Lost the Game";
      displayMesage("You Lost the Game");
      document.querySelector(".score").textContent = 0;
    }
  }
  //when gues is too high
  /* else if (guess > secretNumber) {
    if (score > 1) {
      messageElem.textContent = "Too High";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      messageElem.textContent = "You Lost the Game";
      document.querySelector(".score").textContent = 0;
    }
  } // when guess is too low
  else if (guess < secretNumber) {
    if (score > 1) {
      messageElem.textContent = "Too Low";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      messageElem.textContent = "You Lost the Game";
      document.querySelector(".score").textContent = 0;
    }
  } */
});

///////////////////////////////////////
// Coding Challenge #1

/* 
Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)

GOOD LUCK 😀
*/

document.querySelector(".again").addEventListener("click", function () {
  score = 20;
  Math.trunc(Math.random() * 20) + 1;
  //messageElem.textContent = "Start guessing...";
  displayMesage("Start guessing...");
  document.querySelector(".score").textContent = score;
  document.querySelector(".number").textContent = "?";
  document.querySelector(".guess").value = "";

  document.querySelector("body").style.backgroundColor = "#222";
  document.querySelector(".number").style.width = "15rem";
});
