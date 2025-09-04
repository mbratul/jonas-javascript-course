"use strict";
///////////////////////
//selecting any documents
console.log("--selecting any documents--");
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

//selecting elements
const allSections = document.querySelectorAll(".section");
console.log(allSections);

const section1ID = document.getElementById("section--1");
console.log(section1ID);

const allButtons = document.getElementsByTagName("button");
console.log(allButtons);

const allBtnClassList = document.getElementsByClassName("btn");
console.log(allBtnClassList);

//Creating and Inserting Elements
const headerClass = document.querySelector(".header");
const messageDiv = document.createElement("div");
//console.log(messageDiv);
messageDiv.classList.add("cookie-message");
messageDiv.innerHTML = `We use cookied for improved functionality and analytics <button class="btn btn-close-cookie">Got it!</button>`;

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

//Styling an Element
//this style are inline css style
messageDiv.style.backgroundColor = "#440066";
messageDiv.style.width = "120%";

console.log(getComputedStyle(messageDiv));
console.log(getComputedStyle(messageDiv).height);
const computeHeight = (messageDiv.style.height =
  Number.parseFloat(getComputedStyle(messageDiv).height) + 40 + "px");
console.log(computeHeight);

//change css style by setProperty method
document.documentElement.style.setProperty("--color-primary", "orangered");

//Access Attributes
const logo = document.querySelector(".nav__logo");
console.log(logo.alt);
logo.alt = "Beautiful Minimalist Logo";
console.log(logo.width);
console.log(logo.height);
console.log(logo.id);
console.log(logo.className);

// Non Standard Attribute
console.log(logo.src); //absolute version
console.log(logo.getAttribute("src")); //relative version

logo.setAttribute("height", "10%");

const link = document.querySelector(".nav__link--btn");
console.log(link.href); //absolute value
console.log(link.getAttribute("href")); //relative value

//Data Attribute
console.log(logo.dataset.versionNumber);

//Classe
logo.classList.add("c");
logo.classList.remove("c");
logo.classList.toggle("c");
logo.classList.contains("c");
