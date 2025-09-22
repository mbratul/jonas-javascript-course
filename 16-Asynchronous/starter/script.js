"use strict";

const btn = document.querySelector(".btn-country");
const countriesContainer = document.querySelector(".countries");

// NEW COUNTRIES API URL (use instead of the URL shown in videos):
//https://countries-api-836d.onrender.com/countries/

// NEW REVERSE GEOCODING API URL (use instead of the URL shown in videos):
// https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}

///////////////////////////////////////
// const p = document.querySelector(".syncPara");
// setTimeout(function (e) {
//   p.textContent = "my name is ratul";
// }, 5000);
// p.style.color = "red";

{
  ///////////////////////////////////////
  //XMLHttprequest call
  // old school way of calling Ajax in js
  const getCountryData = function (country) {
    const request = new XMLHttpRequest();
    request.open(
      "GET",
      //`https://restcountries.com/v3.1/name/${country}?fullText=true`
      `https://restcountries.com/v3.1/name/${country}?fullText=true`
    );
    request.send();

    request.addEventListener("load", function () {
      //console.log(this.responseText);
      const [data] = JSON.parse(this.responseText);
      console.log(data);
      const html = `
        <article class="country">
        <img class="country__img" src="${data.flags.png}" alt="${
        data.flags.alt
      }" />
            <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              Number(data.population) / 10000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(
              data.languages
            )}</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
                </div>
                </article>
                `;
      countriesContainer.insertAdjacentHTML("beforeend", html);
      countriesContainer.style.opacity = 1;
    });
  };
  //getCountryData("bangladesh");
  //getCountryData("portugal");
  //getCountryData("united states of america");
}
{
  const renderCountry = function (data, className = "") {
    const html = `
        <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" alt="${
      data.flags.alt
    }" />
            <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              Number(data.population) / 10000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(
              data.languages
            )}</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
                </div>
                </article>
                `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    countriesContainer.style.opacity = 1;
  };
  //Ajax Call Country 1
  const getCountryDataAndNeighbour = function (country) {
    const request = new XMLHttpRequest();
    request.open(
      "GET",
      //`https://restcountries.com/v3.1/name/${country}?fullText=true`
      `https://restcountries.com/v3.1/name/${country}?fullText=true`
    );
    request.send();

    request.addEventListener("load", function () {
      //console.log(this.responseText);
      const [data] = JSON.parse(this.responseText);
      console.log(data);
      //Render Country 1
      renderCountry(data);
      //Render Neighbour Country 1
      const [neighbour] = data.borders;
      //guard clause
      if (!neighbour) return;
      console.log(neighbour);
      //Ajax call render neighbour country
      const request2 = new XMLHttpRequest();
      request2.open(
        "GET",
        //`https://restcountries.com/v3.1/name/${country}?fullText=true`
        `https://restcountries.com/v3.1/alpha/${neighbour}?fullText=true`
      );
      request2.send();
      //addeventlistener callback function
      request2.addEventListener("load", function () {
        const [data2] = JSON.parse(this.responseText);
        console.log(data2);
        renderCountry(data2, "neighbour");
      });
    });
  };
  //getCountryDataAndNeighbour("portugal");
  //getCountryDataAndNeighbour("united states of america");

  //call back hell example
  /* setTimeout(() => {
    console.log("1 second passed");
    setTimeout(() => {
      console.log("2 second passed");
    }, 2000);
    setTimeout(() => {
      console.log("3 second passed");
    }, 3000);
    setTimeout(() => {
      console.log("4 second passed");
    }, 4000);
    setTimeout(() => {
      console.log("10 second passed");
    }, 10000);
    setTimeout(() => {
      console.log("20 second passed");
    }, 20000);
  }, 1000); */
}
{
  ///////////////////////////////////////
  //fetch api call
  // const request = new XMLHttpRequest();
  //   request.open(
  //     "GET",
  //     //`https://restcountries.com/v3.1/name/${country}?fullText=true`
  //     `https://restcountries.com/v3.1/name/${country}?fullText=true`
  //   );
  //   request.send();
  console.log("----fetch api call---");
  const renderCountry = function (data, className = "") {
    const html = `
        <article class="country ${className}">
        <img class="country__img" src="${data.flags.png}" alt="${
      data.flags.alt
    }" />
            <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              Number(data.population) / 10000000
            ).toFixed(1)} people</p>
            <p class="country__row"><span>🗣️</span>${Object.values(
              data.languages
            )}</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].name
            }</p>
                </div>
                </article>
                `;
    countriesContainer.insertAdjacentHTML("beforeend", html);
    //countriesContainer.style.opacity = 1;
  };

  const renderError = function (msg) {
    countriesContainer.insertAdjacentText("beforeend", msg);
    // countriesContainer.style.opacity = 1;
  };

  const request = fetch("https://restcountries.com/v3.1/name/bangladesh");
  console.log(request);

  const getCountryData = function (country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then(function (response) {
        //console.log(response);
        return response.json();
      })
      .then(function (data) {
        console.log(data);
        renderCountry(data[0]);
      });
  };
  //getCountryData("india");

  //simplified arrow function version
  const getCountryDataArrow = function (country) {
    fetch(`https://restcountries.com/v3.1/name/${country}`)
      .then((response) => response.json())
      .then((data) => renderCountry(data[0]));
  };
  //getCountryDataArrow("pakistan");

  ///////////////////////////////////////
  //-----promis chaining example-----
  console.log("-----promis chaining example-----");

  const getCountryDataChain = function (country) {
    //country 1
    fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
      .then(
        (response) => {
          //console.log(response);
          if (!response.ok) {
            throw new Error(`Country Not Found ${response.status}`);
          }
          return response.json();
        }
        //,(err) => alert(err)
      )
      .then((data) => {
        renderCountry(data[0]);
        console.log(data);
        const neighbour = data[0].borders[0];
        //console.log(neighbour);
        if (!neighbour) return;
        //country 2
        console.log(neighbour);
        return fetch(
          `https://restcountries.com/v3.1/alpha/${neighbour}?fullText=true`
        );
      })
      //need to resolve the chain issue
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Country Not Found ${response.status}`);
        }
        return response.json();
        //,(err) => alert(err)
      })
      .then((data) => renderCountry(data[0], "neighbour"))
      //error handling in promise
      .catch((err) => {
        console.log(err);
        renderError(`Something Went Wrong ${err.message}`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };
  btn.addEventListener("click", function () {
    getCountryDataChain("nepal");
  });
  //getCountryDataChain("abdsf");
  console.log("-----use custom error message for -----");
  const getJSON = function (url, errorMsg = "Something Went Wrong") {
    return fetch(url).then((response) => {
      if (!response.ok) {
        throw new Error(`${errorMsg} ${response.status}`);
      }
      return response.json();
    });
  };

  const getCountryWithCustomError = function (country) {
    //country 1
    getJSON(
      `https://restcountries.com/v3.1/name/${country}`,
      `Country Not Found`
    )
      .then((data) => {
        renderCountry(data[0]);
        console.log(data);
        const neighbour = data[0].borders[0];

        //console.log(neighbour);
        if (!neighbour) throw new Error(`No Neighbour Found`);
        //country 2
        console.log(neighbour);
        return getJSON(
          `https://restcountries.com/v3.1/alpha/${neighbour}`,
          `Country Not Found`
        );
      })

      .then((data) => renderCountry(data[0], "neighbour"))
      //error handling in promise
      .catch((err) => {
        console.log(err);
        renderError(`Something Went Wrong ${err.message}`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };
  //getCountryWithCustomError("australia");
}
{
  ///////////////////////////////////////
  //-----Event Loop-----
  console.log("Test Start");
  setTimeout(() => console.log("timer end at 0 second"), 0);
  Promise.resolve("resolved promise 1").then((response) =>
    console.log(response)
  );
  Promise.resolve("resolved promise 2").then((response) => {
    for (let index = 0; index < 10; index++) {
      console.log(index);
    }
    console.log(response);
  });
  console.log("Test End");
}
{
  ///////////////////////////////////////
  //-----Building a Simple Promise-----
  console.log("-----Building a Simple Promise-----");

  const lotteryPromise = new Promise(function (resolve, reject) {
    console.log("Lottery draw is happening now");
    setTimeout(function () {
      if (Math.random() >= 0.5) {
        resolve("You win the lottery");
      } else {
        reject(new Error("you loose the lottery"));
      }
    }, 2000);
  });
  lotteryPromise
    .then((res) => console.log(res))
    .catch((err) => console.error(err));

  //Promisifying setTimeout
  const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 2000);
    });
  };
  wait(1)
    .then(() => {
      console.log("1 second passed ");
      return wait(1);
    })
    .then(() => {
      console.log("2 second passed ");
      return wait(1);
    })
    .then(() => {
      console.log("3 second passed ");
      return wait(1);
    })
    .then(() => {
      console.log("4 second passed ");
      return wait(1);
    })
    .then(() => {
      console.log("5 second passed ");
    });

  Promise.resolve("abc").then((x) => console.log(x));
  Promise.reject(new Error("Problem!")).catch((x) => console.error(x));
}
