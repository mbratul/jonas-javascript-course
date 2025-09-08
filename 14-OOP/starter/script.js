"use strict";

function Person(firstName, birthYear) {
  //Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //use method
  //it's not a good practice to write method inside a constructor function
  /* const calcAge = function () {
    console.log(2025 - this.birthYear);
  }; */
}
const ratul = new Person("ratul", 1985);
const mamun = new Person("mamun", 1995);
const halim = new Person("halim", 1975);
console.log(ratul, mamun, halim);

const jack = "jack";
console.log(ratul instanceof Person);
console.log(jack instanceof Person);

// 1. New{} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}
