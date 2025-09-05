/* JavaScript Goes Here */
"use strict";

{
  ////////////////////////////
  //mlouse enter event
  const h1 = document.querySelector("h1");
  const alertH1 = function (e) {
    alert("addEventlistener: great you are reading the heading");
    //h1.removeEventListener("mouseenter", alertH1);
  };
  h1.addEventListener("mouseenter", alertH1);

  setTimeout(function (e) {
    h1.removeEventListener("mouseenter", alertH1);
  }, 3000);

  // it's an old scool way
  // h1.onmouseenter = function (e) {
  //   alert("onmouseenter: great you are reading the heading");
  // };
}
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

liElem.forEach(function (el) {
  el.addEventListener("click", function (e) {
    console.log("li", e.target, e.currentTarget);
    console.log(e.currentTarget === this);
    this.style.backgroundColor = randomColor();
  });
});

anchorElem.forEach(function (el) {
  el.addEventListener("click", function (e) {
    console.log("a", e.target, e.currentTarget);
    console.log(e.currentTarget === this);
    this.style.backgroundColor = randomColor();

    //Stop Propagation
    //e.stopPropagation();
  });
});
