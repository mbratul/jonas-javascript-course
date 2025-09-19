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
  getCountryData("bangladesh");
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
  getCountryDataAndNeighbour("united states of america");

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
