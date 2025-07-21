let js = "Amazing";
// if (js == "Amazing") alert("javascript is fun");
console.log(40 + 8 + 10 - 23);
console.log("ratul");
console.log(23);
//let firstName = "Bob";
//console.log(firstName);

/* Good Variable Declaration Convention */
let myFirstJob = "programmer";
let myCurrentJob = "teacher";
console.log(myFirstJob);

/* Bad Variable Declaration Convention */
let job1 = "programmer";
let job2 = "teacher";
/* 
Assignment Values and Variables
1.Declare variables called country, continent and population and assign their values according to your own country (population in millions).

2. Log their values to the console. 
*/
let country = "Bangladesh";
let continent = "Asia";
let population = "17 Billion";

console.log(country);
console.log(continent);
console.log(population);

let javascriptIsFun = true; // boolean data type
console.log(javascriptIsFun);
console.log(typeof true); // boolean
console.log(typeof 23); //number
console.log(typeof "javascriptIsFun"); //string

let year;
console.log(typeof year); // undefined data type
year = 2025;
console.log(typeof year); // define a value to a undefined variable
console.log(typeof null); // it's a bug

//let // it's mutable declaration
//const //it's an immutable declaration

/* -------Operator--------*/
/* -------Minus Operator--------*/
const agaMinus = 2025 - 1985;
console.log(agaMinus);
/* -------PLus Operator--------*/
const agePlus = 1985 + 40;
console.log(agePlus);

console.log(agaMinus * 2, agePlus / 2);

/* -------Exponential Operator--------*/
console.log(2 ** 3); // 2 to the power of 3, that means 2*2*2

/* -------Concat Variable--------*/
const firstName = "Muhtasim";
const middleName = "Billah";
const lastName = "Ratul";
console.log(firstName + " " + middleName + " " + lastName);
/* 
    operator precedence follow left to right describe here
    url: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Operator_precedence
 */

/* Template Literals */
console.log(`template literal ${firstName} test here and 
    it can also work for multiple line
    `);
/* Convert Data Type */
const inputYear = "1991";
console.log(Number(inputYear) + 18);
