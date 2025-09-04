"use strict";
{
  /////////////////////////////////////////////////
  //set time out
  /* Definition: The setTimeout() method of the Window interface sets a timer which executes a function or specified piece of code once the timer expires. */
  const ingredients = ["olive", "mushroom"];
  const pizzaTimer = setTimeout(
    function (ing1, ing2) {
      return console.log(`here is your pizza with ${ing1} and ${ing2} 🍕`);
    },
    3000,
    ...ingredients
  );
  console.log("waiting");

  if (ingredients.includes("spinach")) {
    clearTimeout(pizzaTimer);
  }
}

{
  /////////////////////////////////////////////////
  //set interval
  /* The setInterval() method of the Window interface repeatedly calls a function or executes a code snippet, with a fixed time delay between each call. */
  const countDown = setInterval(function () {
    const now = new Date();
    console.log(now);
  }, 5000);
  //console.log(countDown);
}
