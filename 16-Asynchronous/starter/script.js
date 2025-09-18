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
getCountryData("portugal");
getCountryData("united states of america");
