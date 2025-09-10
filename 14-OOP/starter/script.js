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

// 1. New{} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const ratul = new Person("ratul", 1985);
const mamun = new Person("mamun", 1995);
const halim = new Person("halim", 1975);
console.log(ratul, mamun, halim);

const jack = "jack";
console.log(ratul instanceof Person);
console.log(jack instanceof Person);

//prototype
//create method in this style
Person.prototype.calcAge = function () {
  console.log(2025 - this.birthYear);
};
console.log(Person.prototype);
ratul.calcAge();
mamun.calcAge();
console.log(ratul.__proto__); //it's a speacial type of property of any object
console.log(ratul.__proto__ == Person.prototype); //check the constructor function
console.log(Person.prototype.isPrototypeOf(ratul)); //another check of prototype object
console.log(Person.prototype.isPrototypeOf(Person)); //it is false here
Person.prototype.species = "hemo sapier";
console.log(ratul.hasOwnProperty("firstName", "birthYear"));
console.log(ratul.species);
console.log(ratul.hasOwnProperty("species"));

//prototype chain
console.log(ratul.__proto__.__proto__); //parent object of Ratul. Object.prototype
console.log(ratul.__proto__.__proto__.__proto__); //parent object of Object.prototype is null
console.log(Person.prototype.constructor);
console.dir(Person.prototype.constructor);

const arr = [3, 5, 46, 3, 6, 9, 4, 6, 9, 7, 6, 5, 4];
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);
console.log(arr.__proto__.__proto__);
// Do not create a method in prototype chain. it's not a good practice.
// Create your own constructor and then creat your method just like person constructor
const h1 = document.querySelector("h1");
console.dir(h1);
console.dir(function x() {
  return x + 2;
});
