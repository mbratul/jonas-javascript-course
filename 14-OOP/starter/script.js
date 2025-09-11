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
{
  ///////////////////
  //Clas in JS
  //Class is just a speacial type of function in js
  /* Class Definition: JavaScript classes (introduced in ES6) provide a structured way to create objects with shared properties and methods. They support inheritance, encapsulation, and modularity, making it easier to write object-oriented code. 
  URL: https://www.geeksforgeeks.org/javascript/javascript-classes/
  */
  console.log("----Clas in JS----");
  //Class Expression
  //const PersonCL = class {};

  //Class Decleration
  class PersonCL {
    // Initialize properties here in constructor
    constructor(fullName, birthYear) {
      this.fullName = fullName;
      this.birthYear = birthYear;
    }
    // Define methods here just like regular function
    // Method will be added to their prototype property
    calcAge() {
      console.log(`${this.fullName} current age is ${2025 - this.birthYear}`);
    }
    greet() {
      console.log(`hey ${this.fullName}`);
    }
    //getter method
    get age() {
      return 2025 - this.birthYear;
    }
    //set a property that already exist
    set fullName(name) {
      console.log(name);
      if (name.includes(" ")) this._fullName = name;
      //it's an convention to add underscore to a property name
      else {
        alert(`${name} is not a full name`);
      }
    }
    get fullName() {
      return this._fullName;
    }
    //static methods also called it instance methods
    static hey() {
      console.log("hey there 👏");
    }
  }
  const ratulNew = new PersonCL("muhtasim ratul", 1985); //it's called instance
  console.log(ratulNew);
  ratulNew.calcAge();
  console.log(ratulNew.__proto__ === PersonCL.prototype); //to check the object protoype

  //add a prototype method
  // PersonCL.prototype.greet = function () {
  //   console.log(`hey ${this.firstName}`);
  // };
  ratulNew.greet();

  //Rules:
  //1. Class are not hoisted. Even they are deceleration
  //2. Class are also first class citizen, just like function
  //3. The body of a class always executed in strict mood

  //Setter and Getter Properties
  /* 
  Definition: In JavaScript, getter and setter are the special methods introduced in ECMAScript 5 (ES5 2009) that allow us to retrieve and modify the values directly without directly changing the object property. The getter uses the get keyword and the setter uses the set keyword to modify and retrieve the values.
  url: https://www.geeksforgeeks.org/javascript/javascript-getters-and-setters/ 
  */
  console.log(`age of ${ratulNew.fullName} is ${ratulNew.age}`);
  console.log(ratulNew);
  const walter = new PersonCL("Walter White", 1976);
  console.log(walter);
  PersonCL.hey();
}
{
  ///////////////////
  //Static Method
  /* Static methods are functions that are defined on a class but are not accessible through instances of the class. Instead, they are called directly on the class itself. These methods are useful for creating utility functions or shared logic that doesn’t depend on individual object instances.
  url: https://www.geeksforgeeks.org/javascript/js-static-methods/ */
  console.log("------Static Method------");
  const h1 = Array.from(document.querySelectorAll("h1"));
  console.log(h1);
}
{
  ///////////////////
  //Object.create
  /*Definition:  JavaScript object.create() method is used to create a new object with the specified prototype object and properties. Object.create() method returns a new object with the specified prototype object and properties. 
  url: https://www.geeksforgeeks.org/javascript/javascript-object-create-method/*/

  const PersonObj = {
    calcAge() {
      console.log(2025 - this.birthYear);
    },
    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    },
  };
  const steven = Object.create(PersonObj);
  steven.fullName = "Steven Smith";
  steven.birthYear = 1995;
  steven.calcAge();
  console.log(steven);
  console.log(steven.__proto__);
  console.log(steven.__proto__ === PersonObj);

  const sara = Object.create(PersonObj);
  sara.init("Sara", 1997);
  sara.calcAge();
}
{
  ///////////////////
  //Inheritance between "Classes" : Constructor Functions

  const Person = function (firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  };
  Person.prototype.calcAge = function () {
    console.log(2025 - this.birthYear);
  };

  const Student = function (firstName, birthYear, course) {
    Person.call(this, firstName, birthYear);

    this.course = course;
  };
  //Linking Prototypes
  Student.prototype = Object.create(Person.prototype);
  Student.prototype.introduce = function () {
    console.log(`My name is ${this.firstName}, and i study ${this.course}`);
  };
  const mike = new Student("Mike", 2014, "Coumputer Science");
  console.log(mike);
  mike.introduce();
  mike.calcAge();
  console.log(mike.__proto__);
  console.log(mike.__proto__.__proto__);
  console.log(mike instanceof Student);
  console.log(mike instanceof Person);
}
{
  ///////////////////
  //Inheritance between "Classes" : ES6 Classes
  class PersonCL {
    // Initialize properties here in constructor
    constructor(fullName, birthYear) {
      this.fullName = fullName;
      this.birthYear = birthYear;
    }
    // Define methods here just like regular function
    // Method will be added to their prototype property
    calcAge() {
      console.log(`${this.fullName} current age is ${2025 - this.birthYear}`);
    }
    greet() {
      console.log(`hey ${this.fullName}`);
    }
    //getter method
    get age() {
      return 2025 - this.birthYear;
    }
    //set a property that already exist
    set fullName(name) {
      console.log(name);
      if (name.includes(" ")) this._fullName = name;
      //it's an convention to add underscore to a property name
      else {
        alert(`${name} is not a full name`);
      }
    }
    get fullName() {
      return this._fullName;
    }
    //static methods also called it instance methods
    static hey() {
      console.log("hey there 👏");
    }
  }

  class StudentCL extends PersonCL {
    constructor(fullName, birthYear, course) {
      //Always needs to happen first
      super(fullName, birthYear);
      this.course = course;
    }
    introduce() {
      console.log(`My name is ${this.fullName}, and i study ${this.course}`);
    }
    calcAge() {
      console.log(
        `I am ${this.fullName}  my current age is ${
          2025 - this.birthYear
        } but as a student i feel more like ${
          2025 - this.birthYear + 10
        } year old`
      );
    }
  }
  const martha = new StudentCL("Martha Jones", 1994, "Computer Science");
  console.log(martha);
  martha.introduce();
  martha.calcAge();
}
{
  ///////////////////
  //Inheritance between "Classes" : Object.create()
  const PersonObj = {
    calcAge() {
      console.log(2025 - this.birthYear);
    },
    init(firstName, birthYear) {
      this.firstName = firstName;
      this.birthYear = birthYear;
    },
  };
  const steven = Object.create(PersonObj);

  const StudentObj = Object.create(PersonObj);

  StudentObj.init = function (firstName, birthYear, course) {
    PersonObj.init.call = (this, firstName, birthYear);
    this.course = course;
  };
  StudentObj.introduce = function () {
    console.log(`My name is ${this.firstName}, and i study ${this.course}`);
  };
  const jay = Object.create(StudentObj);
  jay.init("Jay", 1976, "Software Engineer");
  jay.introduce();
  jay.calcAge();
}
{
  class Account {
    constructor(owner, currency, pin) {
      this.owner = owner;
      this.currency = currency;
      this.pin = pin;
      this.movements = [];
      this.locals = navigator.language;
      console.log(`Thanks for opening an account ${this.owner}`);
    }
    //Public Interface of Object
    deposit(val) {
      this.movements.push(val);
    }
    withdrawl(val) {
      this.deposit(-val);
    }
    approvedLoan(val) {
      return true;
    }
    requestLoan(val) {
      if (this.approvedLoan(val)) {
        this.deposit(val);
        console.log(`Loan Approved`);
      }
    }
  }
  const acc1 = new Account("Jonas", "EUR", 1111);
  acc1.deposit(250);
  acc1.withdrawl(150);
  acc1.requestLoan(1000);
  console.log(acc1);
}
