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

//Parent Class
class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  constructor(coords, distance, duration) {
    this.coords = coords; //[latitude, longitude]
    this.distance = distance; // in km
    this.duration = duration; // in minutes
  }
}

//Child Class
class Running extends Workout {
  constructor(coords, distance, duration, caedence) {
    super(coords, distance, duration);
    this.caedence = caedence;
    this.calcPace();
  }
  calcPace() {
    // in min/km
    this.pace = this.duration / this.distance;
    return this.pace;
  }
}
class Cycling extends Workout {
  constructor(coords, distance, duration, elevationGain) {
    super(coords, distance, duration);
    this.elevationGain = elevationGain;
    this.calcSpeed();
  }
  calcSpeed() {
    // in km/h
    this.speed = this.distance / (this.duration / 60);
    return this.speed;
  }
}
const run1 = new Running([154, -45], 5.2, 24, 185);
const cycle1 = new Cycling([154, -45], 27, 95, 526);
console.log(run1, cycle1);
//////////////////////////
//Application Arcitecture
//Global Variable
//let map, mapEvent;
class APP {
  #map;
  #mapEvent;
  constructor() {
    this._getPosition();

    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
  }

  _getPosition() {
    //Geolocation API
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        this._loadMap.bind(this),
        function () {
          console.log("Could not found your location");
        }
      );
    }
  }

  _loadMap(position) {
    //console.log(position);
    const { latitude } = position.coords;
    const { longitude } = position.coords;
    console.log(
      `My current location is ${latitude} Latitude, and ${longitude} Longitude`
    );
    console.log(`https://www.google.com/maps/@${latitude},${longitude}`);

    const cords = [latitude, longitude];
    console.log(cords);

    //leaflet JS library code start
    console.log(this);
    this.#map = L.map("map").setView(cords, 13);
    //console.log(map);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    this.#map.on("click", this._showForm.bind(this));
    //leaflet JS library code end
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    //console.log(mapEvent);
    form.classList.remove("hidden");
    inputDistance.focus();
  }

  _toggleElevationField() {
    inputElevation.closest(".form__row").classList.toggle("form__row--hidden");
    inputCadence.closest(".form__row").classList.toggle("form__row--hidden");
  }

  _newWorkout(e) {
    e.preventDefault();
    //Clear input field
    inputDistance.value =
      inputDuration.value =
      inputElevation.value =
      inputCadence.value =
        "";
    //Display Marker
    //console.log(mapEvent);
    const { lat, lng } = this.#mapEvent.latlng;
    L.marker([lat, lng])
      .addTo(this.#map)
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
  }
}

const app = new APP();
app._getPosition();
