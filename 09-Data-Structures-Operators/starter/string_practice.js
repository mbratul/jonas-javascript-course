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

const lowerEmail = loginEmail.toLowerCase(); //Converts all the alphabetic characters in a string to lowercase.
const trimEmail = lowerEmail.trim(); //Removes the leading and trailing white space and line terminator characters from a string.
console.log(trimEmail);
console.log("-----Normaliz Email-----");
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);
console.log(loginEmail.trimStart(), loginEmail.trimEnd());

//Replacing String
console.log("----Replacing String----");
const priceGB = "288,97£";
const priceUS = priceGB.replace(",", ".").replace("£", "$"); //Replaces text in a string, using a regular expression or search string.
console.log(priceUS);
const announcement =
  "All Passenger come to boarding door 23!, Boarding door 23";
console.log(announcement.replace("door", "gate"));
console.log(announcement.replaceAll("door", "gate")); //Replace all instances of a substring in a string, using a regular expression or search string.

//Simple Regular Expression Example
console.log(announcement.replace(/door/g, "gate"));

// Boolean Methods
console.log("------Boolean Methods------");

const plane1 = "Airbus A320neo";
console.log(plane1.includes("A320")); //Returns true if searchString appears as a substring of the result of converting this object to a String, at one or more positions that are greater than or equal to position; otherwise, returns false.
console.log(plane1.includes("Boeing"));

console.log(plane1.startsWith("Air")); //Returns true if the sequence of elements of searchString converted to a String is the same as the corresponding elements of this object (converted to a String) starting at position. Otherwise returns false.

console.log(plane1.endsWith("neo")); //Returns true if the sequence of elements of searchString converted to a String is the same as the corresponding elements of this object (converted to a String) starting at endPosition – length(this). Otherwise returns false.
console.log("------Checking Boolean Methods------");
if (plane1.startsWith("Airbus") && plane1.endsWith("neo")) {
  console.log("Part of the New Airbus Family");
} else {
  console.log("Not a Part Family");
}

// Practice exercise
console.log("-----Practice Exercise-----");

const checkBaggage = function (items) {
  const baggege = items.toLowerCase();
  if (baggege.includes("knife") || baggege.includes("gun")) {
    console.log("You are Not Allowed");
  } else {
    console.log("Welcome Aboard");
  }
};

checkBaggage("I have a laptop, some Food and a pocket Knife");
checkBaggage("Socks and camera");
checkBaggage("Got some snacks and a gun for protection");

///////////////////////////////////////
// Working With Strings - Part 3
console.log("----Working With Strings - Part 3----");

// Split & Join String method in js
console.log("a+very+night+string".split("+")); //Split a string into substrings using the specified separator and return them as an array.
console.log("Muhtasim Billah Ratul".split(" "));
console.log("Muhtasim Billah Ratul".toLowerCase().split(" "));
console.log("Muhtasim Billah Ratul".toUpperCase().split(" "));

const [firstName, middleName, lastName] = "Muhtasim Billah Ratul".split(" ");
//Adds all the elements of an array into a string, separated by the specified separator string.
const newName = ["Mr.", firstName, middleName, lastName.toUpperCase()].join(
  " "
); // join method
console.log(newName);

// capitalize name function
const capitalizeName = function (name) {
  const names = name.split(" ");
  const nameUpper = [];
  for (const n of names) {
    //nameUpper.push(n[0].toUpperCase() + n.slice(1));
    nameUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(nameUpper.join(" "));
};
capitalizeName("jonas schidmann");
capitalizeName("barak obama");
capitalizeName("muhtasim billah ratul");

//Padding, add string to first and last of a content
const padMessage = "Go get jonas!";
console.log(padMessage.padStart(25, "+")); //Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length. The padding is applied from the start (left) of the current string.

console.log(padMessage.padEnd("25", "+")); //Pads the current string with a given string (possibly repeated) so that the resulting string reaches a given length. The padding is applied from the end (right) of the current string.

console.log(padMessage.padStart(25, "+").padEnd(40, "+"));

console.log("-----Mask Credit Card-----");
// create a function to mask all number of a credit card except last 4 digit
const maskCreditCard = function (number) {
  const str = number + ""; // convert number into a string
  const last = str.slice(-4);
  return last.padStart(str.length, "*");
};
console.log(maskCreditCard(4554450055600090));

// repeat method
const message2 = "Bad Weather All Departure Will Delayed...\n";
console.log(message2.repeat(3));

const planesInLine = function (n) {
  console.log(`There are ${n} plane waitting ${"✈️".repeat(n)}`);
};
planesInLine(3);
planesInLine(4);
