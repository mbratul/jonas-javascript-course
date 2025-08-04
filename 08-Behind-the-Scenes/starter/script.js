'use strict';
function calcAge(birthYear) {
  const age = 2025 - birthYear;
  //console.log(firstName);
  // local scope of a function
  function printAge() {
    let output = `${firstName} You are ${age} born in ${birthYear}`;
    console.log(output);

    // block scop
    if (birthYear >= 1981 && birthYear <= 1996) {
      //var is a functional scope, that's why it can access outside the scope. good practice don't use var for declear a variable in any where
      var millenial = true;
      // creating new variable with same name as outer scope's varibale
      const firstName = 'Jonas'; // it can work because of local scope
      output = 'new output'; // reassigning outer scope's varibale
      const str = `Oh you are a millenial ${firstName}`;
      console.log(str);

      // it's a block scope for strict mode but not for normal mode
      function add(a, b) {
        return a + b;
      }
      //const output = 'new output'; // declear it as a new variable that can change it's display
    }
    //console.log(add(2, 3));
    //console.log(millenial);
    console.log(output);
  }
  printAge();
  return age;
}

// global varibale declear
const firstName = 'Ratul';
calcAge(1985);

//**********Hoisting***********
console.log('-----------Hoisting---------');
//**********Varibale Hoisting***********
console.log(me); //undefined
//console.log(job); //Uncaught ReferenceError: Cannot access 'job' before initialization
//console.log(year); //Uncaught ReferenceError: Cannot access 'job' before initialization
var me = 'Ratul';
let job = 'Developer';
const year = 1985;

//**********Function Hoisting***********
console.log(adddeclear(2, 3)); // only function decleration works in hoisting
//console.log(addExpression(2, 3)); //Uncaught ReferenceError: Cannot access 'addExpression' before initialization
//console.log(addArrow(2, 3)); //Uncaught ReferenceError: Cannot access 'addArrow' before initialization
// Function Decleration
function adddeclear(a, b) {
  return a + b;
}
//Function Expression
const addExpression = function (a, b) {
  return a + b;
};
// Arrow Function
const addArrow = (a, b) => a + b;

// Example
console.log(numProducts);
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

var x = 1;
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);
//**********this keyword***********
console.log('---------this keyword---------');
console.log(this);

const calcAge1 = function (birthYear) {
  const age = 2025 - birthYear;
  console.log(age);
  console.log(this); // undefined
};
calcAge1(1985);
// Arrow function does not get it own this keyword, it use lexical global window object for return this value
// Arrow function return this of it's parent function or parent scope
const calcAge1Arrow = (birthYear) => {
  const age = 2025 - birthYear;
  console.log(age);
  console.log(this); // window
};
calcAge1Arrow(1985);

const jonas1 = {
  year: 1985,
  calcAge: function () {
    console.log(this);
    console.log(2025 - this.year);
  },
};
jonas1.calcAge();

/* ---------Regular Function vs Arrow Function ---------
   ----------When and Where to use this keyword---------
 */
const jonas2 = {
  firstName: 'Ratul',
  year: 1985,
  calcAge: function () {
    console.log(this);
    console.log(2025 - this.year);

    // Solution 1
    const self = this; // self or that
    const isMillenial = function () {
      console.log(self);
      console.log(self.year >= 1981 && self.year <= 1996);
    };

    // Solution 2
    const isMillenial1 = () => {
      console.log(this);
      console.log(this.year >= 1981 && this.year <= 1996);
    };
    isMillenial();
    isMillenial();
  },
  // Do not use arrow function for a method inside an object. it's a good practice
  greet: () => {
    console.log(this);
    console.log(`hey ${this.firstName} `); // here this is a window object that's why it display undefined.
  },
};
jonas2.greet();
jonas2.calcAge();

// arguments keyword
/* const addExpr = function (a, b) {
  console.log(arguments);
  return a + b;
};
addExpr(2, 5);
addExpr(2, 5, 8, 12);

var addArrow1 = (a, b) => {
  console.log(arguments);
  return a + b;
};
addArrow1(2, 5, 8); */
///////////////////////////////////////
// Object References in Practice (Shallow vs. Deep Copies)
console.log(
  `-------Object References in Practice (Shallow vs. Deep Copies)------`
);
const jessica1 = {
  firstName: 'Jessica',
  lastName: 'William',
  age: 27,
};
//Another way of change an object create a function
function marryPerson(originalPerson, newLastName) {
  originalPerson.lastName = newLastName;

  //{if i write a wrong key name (lastName write lastname) it can create another property(key:value) in the object jessical}
  //originalPerson.lastname = newLastName;

  return originalPerson; // return is the key property in function to display the output
}
/* const marriedJessica = jessica;
marriedJessica.lastName = 'Davis'; */
const marriedJessica = marryPerson(jessica1, 'Davis');
console.log(`Before :`, jessica1);
console.log(`After :`, marriedJessica);

const jessica2 = {
  firstName: 'Jessica', //primitive data
  lastName: 'William', //primitive data
  age: 27, //primitive data
  family: ['Alice', 'Bob'], //object data (arrya of object)
};
// Shallow copy
const jessicaCopy = { ...jessica2 };
jessicaCopy.lastName = 'Davis';
console.log(jessica2, jessicaCopy);
jessicaCopy.family.push('Mark'); // shallow copy in object referrences
jessicaCopy.family.push('Jonas'); // shallow copy in object referrences

console.log(`Before :`, jessica2);
console.log(`After :`, jessicaCopy);

// Deep Copy
const jessicaDeepClone = structuredClone(jessica2); // original object not change using this method

jessicaDeepClone.family.push('Jurasic'); // shallow copy in object referrences
jessicaDeepClone.family.push('Penguine'); // shallow copy in object referrences
jessicaDeepClone.job = 'Developer';
jessicaDeepClone.interst = ['cricket'];

console.log(`Original :`, jessica2);
console.log(`Clone :`, jessicaDeepClone);

///////////////////////////////////////
// Memory Mangement Garbage Collection
