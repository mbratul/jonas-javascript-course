/* 
Coding Challenge 1 = BMI(Body Mass Indicator) Calculator
BMI = mass / height ** 2 = mass / (height * height) (mass in kg and height in meter). 
*/

// Marks BMI Calculator
/* const marksWeight = 78;
const markHeight = 1.69;
let marksBMI = markHeight / markHeight ** 2;
console.log("marks bmi is ", marksBMI); */

// Johns BMI Calculator
/* const johnsWeight = 92;
const johnsHeight = 1.95;
let johnsBMI = johnsWeight / johnsHeight ** 2;
console.log("johns bmi is ", johnsBMI); */

const massMark = 78;
const heightMark = 1.69;
const massJohn = 92;
const heightJohn = 1.95;
const BMIMark = massMark / (heightMark * heightMark);
const BMIJohn = massJohn / heightJohn ** 2;
const markHigherBMI = BMIMark > BMIJohn;
console.log(BMIMark, BMIJohn, markHigherBMI);
if (BMIMark > BMIJohn) {
  console.log(`Mark's  BMI is higher thant John`);
} else {
  console.log(`John's BMI is higher than Mark`);
}
