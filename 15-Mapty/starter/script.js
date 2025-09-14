"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");

//Global Variable
let map, mapEvent;
//Geolocation API
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      console.log(position);
      const { latitude } = position.coords;
      const { longitude } = position.coords;
      console.log(
        `My current location is ${latitude} Latitude, and ${longitude} Longitude`
      );
      console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

      const cords = [latitude, longitude];
      console.log(cords);

      //leaflet JS library code start
      map = L.map("map").setView(cords, 13);
      //console.log(map);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      map.on("click", function (mapE) {
        mapEvent = mapE;
        //console.log(mapEvent);
        form.classList.remove("hidden");
        inputDistance.focus();
      });
      //leaflet JS library code end
    },
    function () {
      console.log("Could not found your location");
    }
  );
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  //Clear input field
  inputDistance.value =
    inputDuration.value =
    inputElevation.value =
    inputCadence.value =
      "";
  //Display Marker
  //console.log(mapEvent);
  const { lat, lng } = mapEvent.latlng;
  L.marker([lat, lng])
    .addTo(map)
    .bindPopup(
      L.popup({
        maxWidth: 250,
        minWidth: 100,
        autoClose: false,
        closeOnClick: false,
        className: "running-popup",
      })
    )
    .setPopupContent("Workout")
    .openPopup();
});
inputType.addEventListener("change", function () {
  inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
  inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
});
