"use strict";

/* String Practice */
console.log("------String Practice------");
///////////////////////////////////////
// Working With Strings - Part 2
const airline = "Tap Air Portugal";
const plane = "A320";

console.log(plane[0]); // text position in a string
console.log("B737"[0]); // find position in a string
console.log(airline.length); // find a length in a variable
console.log("B737".length); // find a length in a string
console.log(airline.indexOf("r")); //Returns the position of the first occurrence of a substring.
//Returns the position of the first occurrence of a substring. also it's case sensitive. search exact string in the variable
console.log(airline.indexOf("Portugal")); //Returns the position of the first occurrence of a substring.
console.log(airline.lastIndexOf("r")); //Returns the last occurrence of a substring in the string.
//The index to the beginning of the specified portion of stringObj. Returns a section of a string.
console.log(airline.slice(4));
console.log(airline.slice(4, 7)); // Return : End - Begining
console.log(airline.slice(0, airline.indexOf(" "))); // Return 1st word in a string.
console.log(airline.slice(airline.lastIndexOf(" ") + 1)); // Return last word in a string.
console.log(airline.slice(-2)); // Return the last two word of the string
console.log(airline.slice(1, -1)); // Returns a section of a string.

// Search MiddleSeat in a small airplan
const checkMiddleSeat = function (seat) {
  // B and E are middle seat
  const s = seat.slice(-1); // Return the last word of the seat number
  if (s === "B" || s === "E") {
    console.log("You Just Got the Middle Seat");
  } else if (s == "A" || s === "F") {
    console.log("You Just Got Window Seat");
  } else if (s == "C" || s === "D") {
    console.log("You Just Got Corner Seat");
  } else {
    console.log("it's not a seat number");
  }
};
checkMiddleSeat("11B");
checkMiddleSeat("11A");
checkMiddleSeat("23C");
checkMiddleSeat("3E");
checkMiddleSeat("3G");

/* String Method for Real World Application */
console.log("----String Method for Real World Application---");
console.log(airline.toLowerCase()); //Converts all the alphabetic characters in a string to lowercase.
console.log("RATUL".toLowerCase());

console.log(airline.toUpperCase()); //Converts all the alphabetic characters in a string to uppercase.
console.log("ratul".toUpperCase());

//Fix Capitalization in name
console.log("-----Fix Capitalization in name-----");
const passanger = "rAtuL";
const passangerLowerCase = passanger.toLowerCase();
const passangerCamelCase =
  passangerLowerCase[0].toUpperCase() + passangerLowerCase.slice(1);
console.log(`Passanger name in camel case are ${passangerCamelCase}`);

//Comparing Email
console.log("-----Comparing Email-----");
const email = "hello@jonas.io";
const loginEmail = "  Hello@Jonas.Io \n";

const lowerEmail = loginEmail.toLowerCase();
const trimEmail = lowerEmail.trim();
console.log(trimEmail);
