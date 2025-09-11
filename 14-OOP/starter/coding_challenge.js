"use strict";
///////////////////////////////////////
// Coding Challenge #1

/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/
//1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
{
  console.log("----implementing Object Prototype----");
  function Car(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed}km/h`);
  };
  Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.make} is brake at ${this.speed}km/h`);
  };

  const bmw = new Car("BMW", 120);
  const mercedes = new Car("Mercedes", 95);

  console.log(bmw, mercedes);
  bmw.accelerate();
  bmw.accelerate();
  bmw.brake();
  bmw.accelerate();
  bmw.accelerate();
  bmw.brake();
}
{
  //Implement the code block using Class
  console.log("----implementing Class functionality----");
  class CarCL {
    constructor(make, speed) {
      this.make = make;
      this.speed = speed;
    }
    accelerate() {
      this.speed += 10;
      console.log(`${this.make} is going at ${this.speed}km/h`);
    }
    brake() {
      this.speed -= 5;
      console.log(`${this.make} is brake at ${this.speed}km/h`);
    }
  }
  const bmw = new CarCL("BMW", 120);
  const mercedes = new CarCL("Mercedes", 95);
  console.log(bmw, mercedes);
  mercedes.accelerate();
  mercedes.accelerate();
  mercedes.brake();
  mercedes.accelerate();
  mercedes.accelerate();
  mercedes.brake();
}
{
  ///////////////////////////////////////
  // Coding Challenge #2
  /* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/
  console.log("----Coding Challenge #2----");
  class CarCL {
    constructor(make, speed) {
      this.make = make;
      this.speed = speed;
    }
    accelerate() {
      this.speed += 10;
      console.log(`${this.make} is going at ${this.speed}km/h`);
    }
    brake() {
      this.speed -= 5;
      console.log(`${this.make} is brake at ${this.speed}km/h`);
    }
    get speedUS() {
      return this.speed / 1.6;
    }
    set speedUS(speed) {
      this.speed = speed * 1.6;
    }
  }
  const bmw = new CarCL("BMW", 120);
  const mercedes = new CarCL("Mercedes", 95);
  const ford = new CarCL("Ford", 120);

  console.log(ford.speedUS);
  ford.accelerate();
  ford.accelerate();
  ford.brake();
  ford.accelerate();
  ford.accelerate();
  ford.brake();
  ford.speedUS = 50;
  console.log(ford);
}
{
  ///////////////////////////////////////
  // Coding Challenge #3
  /* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/
  function Car(make, speed) {
    this.make = make;
    this.speed = speed;
  }
  Car.prototype.accelerate = function () {
    this.speed += 10;
    console.log(`${this.make} is going at ${this.speed}km/h`);
  };
  Car.prototype.brake = function () {
    this.speed -= 5;
    console.log(`${this.make} is brake at ${this.speed}km/h`);
  };

  function EV(make, speed, charge) {
    Car.call(this, make, speed);
    this.charge = charge;
  }
  //Link Prototype
  EV.prototype = Object.create(Car.prototype);

  EV.prototype.chargeBattery = function (chargeTo) {
    this.charge = chargeTo;
  };
  EV.prototype.accelerate = function () {
    this.speed += 20;
    this.charge -= 1;
    console.log(
      `${this.make} is going at ${this.speed}km/h with a charge of ${this.charge}`
    );
  };
  const tesla = new EV("Tesla", 120, 23);
  tesla.chargeBattery(90);
  console.log(tesla);
  tesla.brake();
  tesla.accelerate();
}
