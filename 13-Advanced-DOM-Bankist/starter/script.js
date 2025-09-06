"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScroll = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

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

//Tabbed Component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

//add EventListener to tab node
/* tabs.forEach(function (el) {
  el.addEventListener("click", function (e) {
    console.log("tab");
  });
}); */
// it's a bad practice so don't use this instead use parent element
tabsContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  //console.log(clicked);

  //Guard Claused
  if (!clicked) return;

  //remove active classes for both tab and content area
  tabs.forEach(function (el) {
    el.classList.remove(".operations__tab--active");
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
