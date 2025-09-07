/* JavaScript Goes Here */
"use strict";
{
  //Creating and Inserting Elements
  const headerClass = document.querySelector(".header");
  const messageDiv = document.createElement("div");
  //console.log(messageDiv);
  messageDiv.classList.add("cookie-message");
  messageDiv.innerHTML = `We use cookied for improved functionality and analytics <button class="btn btn-close-cookie">Got it!</button>`;
  //Styling an Element
  //this style are inline css style
  messageDiv.style.backgroundColor = "#440066";
  messageDiv.style.width = "120%";
  //Inserts nodes before the first child of node, while replacing strings in nodes with equivalent Text nodes.
  //headerClass.prepend(messageDiv);

  //Inserts nodes after the last child of node, while replacing strings in nodes with equivalent Text nodes.
  headerClass.append(messageDiv);
  //DOM elements are unique, so we can use one places at a time.

  //Returns a copy of node. If deep is true, the copy also includes the node's descendants.
  //headerClass.append(messageDiv.cloneNode(true));

  //headerClass.before(messageDiv);
  //headerClass.after(messageDiv);
  const btncloseCookie = document.querySelector(".btn-close-cookie");
  btncloseCookie.addEventListener("click", function () {
    messageDiv.remove();
  });
}
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
{
  ////////////////////////////
  //Slide Content
  const slieds = document.querySelectorAll(".slide");
  const btnLeftElem = document.querySelector(".slider__btn--left");
  const btnRightElem = document.querySelector(".slider__btn--right");

  let currentSlide = 0;
  const maxSlide = slieds.length - 1;

  /* const slider = document.querySelector(".slider");
slider.style.transform = "scale(0.3) translateX(-1200px)";
slider.style.overflow = "visible"; */

  const gotoSlide = function (slide) {
    slieds.forEach(function (s, i) {
      s.style.transform = `translateX(${100 * (i - slide)}%)`;
    });
  };
  gotoSlide(0);
  //Next Slide

  const nextSlide = function () {
    if (currentSlide === maxSlide) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    gotoSlide(currentSlide);
  };
  const previousSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlide;
    } else {
      currentSlide--;
    }
    gotoSlide(currentSlide);
  };
  btnRightElem.addEventListener("click", nextSlide);
  btnLeftElem.addEventListener("click", previousSlide);

  document.addEventListener("keydown", function (e) {
    //console.log(e);
    /* if (e.key === "ArrowLeft") {
      previousSlide();
    } else if (e.key === "ArrowRight") {
      nextSlide();
    } else {
      alert("use only left and right key");
    } */
    e.key === "ArrowLeft" && previousSlide();
    e.key === "ArrowRight" && nextSlide();
  });
}
