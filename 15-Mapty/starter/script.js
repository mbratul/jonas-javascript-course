"use strict";

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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
  type = "running";
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
  type = "cycling";
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
//console.log(run1, cycle1);
//////////////////////////
//Application Arcitecture
const form = document.querySelector(".form");
const containerWorkouts = document.querySelector(".workouts");
const inputType = document.querySelector(".form__input--type");
const inputDistance = document.querySelector(".form__input--distance");
const inputDuration = document.querySelector(".form__input--duration");
const inputCadence = document.querySelector(".form__input--cadence");
const inputElevation = document.querySelector(".form__input--elevation");
//Global Variable
//let map, mapEvent;
class APP {
  #map;
  #mapEvent;
  #workouts = [];
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
    const validInputs = (...inputs) =>
      inputs.every((inp) => Number.isFinite(inp));

    const allPositive = (...inputs) => inputs.every((inp) => inp > 0);

    e.preventDefault();

    //Get data from form
    const type = inputType.value;
    const distance = Number(inputDistance.value);
    const duration = Number(inputDuration.value);
    const { lat, lng } = this.#mapEvent.latlng;
    let workout;
    //If workout running then create running object
    if (type === "running") {
      const cadence = Number(inputCadence.value);
      //Check if data is valid
      if (
        !validInputs(distance, duration, cadence) ||
        !allPositive(distance, duration, cadence)
      )
        return alert("Input has to be a positive number");
      //return console.log("Input has to be a positive number");

      workout = new Running([lat, lng], distance, duration, cadence);
    }
    //If workout cycling then create cycling object
    if (type === "cycling") {
      const elevationGain = Number(inputElevation.value);
      //Check if data is valid
      if (
        !validInputs(distance, duration, elevationGain) ||
        !allPositive(distance, duration)
      )
        return alert("Input has to be a positive number");
      //return console.log("Input has to be a positive number");
      workout = new Cycling([lat, lng], distance, duration, elevationGain);
    }
    //Add new object to workout array
    this.#workouts.push(workout);
    console.log(workout);
    //Render workout on a map as a marker
    this.renderWorkoutMarker(workout);
    //Render Workout on the list
    //Hide form and Clear input field
    inputDistance.value =
      inputDuration.value =
      inputElevation.value =
      inputCadence.value =
        "";
  }
  renderWorkoutMarker(workout) {
    //Display Marker
    //console.log(mapEvent);

    L.marker(workout.coords)
      .addTo(this.#map)
      .bindPopup(
        L.popup({
          maxWidth: 250,
          minWidth: 100,
          autoClose: false,
          closeOnClick: false,
          className: `${workout.type}-popup`,
        })
      )
      .setPopupContent(workout.type)
      .openPopup();
  }
}

const app = new APP();
app._getPosition();
