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
const secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
document.querySelector(".number").textContent = secretNumber;

//message element variable
const messageElem = document.querySelector(".message");
// check button event listener
const checkBtnElem = document.querySelector(".check");
checkBtnElem.addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  console.log(guess, typeof guess);
  if (!guess) {
    console.log((messageElem.textContent = "No Number"));
  } else if (guess === secretNumber) {
    messageElem.textContent = "Correct Number";
  } else if (guess > secretNumber) {
    if (score > 1) {
      messageElem.textContent = "Too High";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      messageElem.textContent = "You Lost the Game";
      document.querySelector(".score").textContent = 0;
    }
  } else if (guess < secretNumber) {
    if (score > 1) {
      messageElem.textContent = "Too Low";
      score--;
      document.querySelector(".score").textContent = score;
    } else {
      messageElem.textContent = "You Lost the Game";
      document.querySelector(".score").textContent = 0;
    }
  }
});
