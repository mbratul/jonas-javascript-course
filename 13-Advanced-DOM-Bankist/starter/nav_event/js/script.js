/* JavaScript Goes Here */
"use strict";
//Event Propagation effect in menu bar

//Random Color Generator
const randomInt = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
};
const randomColor = function () {
  return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
};
console.log(randomColor());

const ulElem = document.querySelector(".nav__links");
const liElem = document.querySelectorAll(".nav__item");
const anchorElem = document.querySelectorAll(".nav__link");

ulElem.addEventListener("click", function (e) {
  console.log("ul", e.target, e.currentTarget);
  console.log(e.currentTarget === this);
  this.style.backgroundColor = randomColor();
});

liElem.forEach(function (li) {
  li.addEventListener("click", function (e) {
    console.log("li", e.target, e.currentTarget);
    console.log(e.currentTarget === this);
    this.style.backgroundColor = randomColor();
  });
});

anchorElem.forEach(function (a) {
  a.addEventListener("click", function (e) {
    console.log("a", e.target, e.currentTarget);
    console.log(e.currentTarget === this);
    this.style.backgroundColor = randomColor();

    //Stop Propagation
    //e.stopPropagation();
  });
});
