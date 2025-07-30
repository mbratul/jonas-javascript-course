"use strict";
const modalElem = document.querySelector(".modal");
const overlayElem = document.querySelector(".overlay");
const btnCloseModalElem = document.querySelector(".close-modal");
const btnShowModalElem = document.querySelectorAll(".show-modal");

//console.log(btnShowModalElem);
const openModal = function () {
  modalElem.classList.remove("hidden");
  overlayElem.classList.remove("hidden");
};

const closeModal = function () {
  modalElem.classList.add("hidden");
  overlayElem.classList.add("hidden");
};

//event listener for open
for (let i = 0; i < btnShowModalElem.length; i++) {
  btnShowModalElem[i].addEventListener("click", openModal);
}

// event listener for close
btnCloseModalElem.addEventListener("click", closeModal);

overlayElem.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  //console.log(e);
  if (e.key === "Escape" && !modalElem.classList.contains("hidden")) {
    closeModal();
  }
});
