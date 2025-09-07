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

////////////////////////////
//Sticky Navigation menu
//It's not a good way to sticky nav menu the better way is Intersection Ovserver API
/* const initalCordinate = section1.getBoundingClientRect();
console.log(initalCordinate);
window.addEventListener("scroll", function () {
  //console.log(window.scrollY);
  if (window.scrollY > initalCordinate.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}); */
////////////////////////////
//Intersection Ovserver API Overview
// URL : https://www.geeksforgeeks.org/javascript/introduction-to-intersection-observer/
/* Definition:  Intersection Observer is an API that is used to detect the interaction of a target element with its's ancestor element or the document viewport. For example, if we want to detect if some element is visible in the viewport we can use this API for that purpose. */
/* const observerCallback = function (entries, observe) {
  entries.forEach(function (entry) {
    console.log(entry);
  });
};
const observerOptions = {
  root: null,
  threshold: [0, 0.2],
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
observer.observe(section1); */

//Sticky Navigation menu using Intersection Ovserver API
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;
//console.log(navHeight);
const stickynav = function (entries) {
  const [entry] = entries;
  //console.log(entry);
  // same condition > entry.isIntersecting === false
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};
const stickyoptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};
const headerObserver = new IntersectionObserver(stickynav, stickyoptions);
headerObserver.observe(header);

////////////////////////////
//Reveal Section
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  //console.log(entries);
  //const [entry] = entries;
  entries.forEach(function (entry) {
    //Guard Clause
    if (!entry.isIntersecting) return;

    entry.target.classList.remove("section--hidden");
    observer.unobserve(entry.target);
  });
};
const sectionOptions = {
  root: null,
  threshold: 0.15,
};
const sectionOvserver = new IntersectionObserver(revealSection, sectionOptions);

//extract nodelist
allSections.forEach(function (section) {
  sectionOvserver.observe(section);
  // section.classList.add("section--hidden");
});
////////////////////////////
//Lazy Loading Image
const imageTarget = document.querySelectorAll("img[data-src]");
//console.log(imageTarget);
const lazyLoadImage = function (entries, observe) {
  const [entry] = entries;
  //console.log(entry);
  if (!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
  });
  observe.unobserve(entry.target);
};
const imageOptions = {
  root: null,
  threshold: 0,
  rootMargin: "200px",
};
const imageObserver = new IntersectionObserver(lazyLoadImage, imageOptions);

imageTarget.forEach(function (img) {
  imageObserver.observe(img);
});

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
