// Remember, we're gonna use strict mode in all scripts now!
"use strict";

///////////////////////////////////////
// Debugging with the Console and Breakpoints
const measurekelvin = function () {
  const measurement = {
    type: "temp",
    unit: "celsius",
    //value: Number(prompt("Degree Celsius:")),
    value: 10,
  };
  const kelvin = measurement.value + 273;
  return kelvin;
};
console.log(measurekelvin());
