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
headerClass.prepend(messageDiv);

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
