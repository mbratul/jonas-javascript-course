"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
//Tabbed Component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
btnsOpenModal.forEach(function (btn) {
  return btn.addEventListener("click", openModal);
});
/* for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener("click", openModal); */

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

////////////////////////////
//smooth scroll down to section
btnScroll.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});

////////////////////////////
//smooth page navigation
/* const linkElem = document.querySelectorAll(".nav__link");
linkElem.forEach(function (el) {
  el.addEventListener("click", function (e) {
    e.preventDefault();
    const hrefID = this.getAttribute("href");
    document.querySelector(hrefID).scrollIntoView({ behavior: "smooth" });
    console.log(hrefID);
  });
}); */

////////////////////////////
//Event Delegation
// 1. Add Event listener to the parent element
// 2. Determine what element originated the event
const ulElem = document.querySelector(".nav__links");
ulElem.addEventListener("click", function (e) {
  //console.log(e.target);
  e.preventDefault();
  //Matching Strategy
  if (e.target.classList.contains("nav__link")) {
    const hrtefID = e.target.getAttribute("href");
    document.querySelector(hrtefID).scrollIntoView({ behavior: "smooth" });
    //console.log("link");
  }
});

////////////////////////////
//Building a Tabbed Component

//add EventListener to tab node
// it's a bad practice so don't use this instead use parent element
/* tabs.forEach(function (el) {
  el.addEventListener("click", function (e) {
    console.log("tab");
  });
}); */
// use parent element for tab event
tabsContainer.addEventListener("click", function (ev) {
  const clicked = ev.target.closest(".operations__tab");
  //console.log(clicked);

  //Guard Claused
  if (!clicked) return;

  //remove active classes for both tab and content area
  tabs.forEach(function (el) {
    el.classList.remove("operations__tab--active");
  });
  tabsContent.forEach(function (el) {
    el.classList.remove("operations__content--active");
  });
  //active tab
  clicked.classList.add(".operations__tab--active");

  //activated content area
  //console.log(clicked.dataset.tab);
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

////////////////////////////
//Menu Fade animation
const nav = document.querySelector(".nav");

// refactoring the code implement DRY principle
const handleHover = function (ev, opacity) {
  if (ev.target.classList.contains("nav__link")) {
    const link = ev.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach(function (el) {
      if (el !== link) {
        el.style.opacity = opacity;
      }
    });
    logo.style.opacity = opacity;
  }
};
nav.addEventListener("mouseover", function (ev) {
  handleHover(ev, 0.5);
});

nav.addEventListener("mouseout", function (ev) {
  handleHover(ev, 1);
});
// the callback function also replced by using bind method. need to study first bind method then apply it.
// right now it's ok here
