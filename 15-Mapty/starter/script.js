"use strict";

//Parent Class
class Workout {
  date = new Date();
  id = (Date.now() + "").slice(-10);
  click = 0;
  constructor(coords, distance, duration) {
    this.coords = coords; //[latitude, longitude]
    this.distance = distance; // in km
    this.duration = duration; // in minutes
  }
  _setDescription() {
    // prettier-ignore
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on 
    ${months[this.date.getMonth()]} ${this.date.getDate()}`;
  }
  click() {
    this.click++;
  }
}

//Child Class
class Running extends Workout {
  type = "running";
  constructor(coords, distance, duration, cadence) {
    super(coords, distance, duration);
    this.cadence = cadence;
    this.calcPace();
    this._setDescription();
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
    this._setDescription();
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
  #mapZoomlevel = 13;
  #mapEvent;
  #workouts = [];
  constructor() {
    //get user positions
    this._getPosition();

    //get data from local storage
    this._getLocalStorage();

    //attached event handlers
    form.addEventListener("submit", this._newWorkout.bind(this));
    inputType.addEventListener("change", this._toggleElevationField);
    containerWorkouts.addEventListener("click", this._movetoPopUp.bind(this));
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
    // console.log(cords);

    //leaflet JS library code start
    // console.log(this);
    this.#map = L.map("map").setView(cords, this.#mapZoomlevel);
    //console.log(map);

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.#map);

    //Handling click on map
    this.#map.on("click", this._showForm.bind(this));

    this.#workouts.forEach((work) => {
      return this._renderWorkoutMarker(work);
    });
    //leaflet JS library code end
  }

  _showForm(mapE) {
    this.#mapEvent = mapE;
    //console.log(mapEvent);
    form.classList.remove("hidden");
    inputDistance.focus();
  }
  _hideForm() {
    //empty the input
    inputDistance.value =
      inputDuration.value =
      inputElevation.value =
      inputCadence.value =
        "";
    form.style.display = "none";
    form.classList.add("hidden");
    setTimeout(() => {
      form.style.display = "grid";
    }, 1000);
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
    this._renderWorkoutMarker(workout);

    //Render Workout on the list
    this._renderWorkout(workout);

    //Hide form and Clear input field
    this._hideForm();

    //Set local storage to all workouts
    this._setLocalStorage();
  }
  _renderWorkoutMarker(workout) {
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
      .setPopupContent(
        `${workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"} ${workout.description}`
      )
      .openPopup();
  }
  _renderWorkout(workout) {
    let html = `
            <li class="workout workout--${workout.type}" data-id="${
      workout.id
    }">
            <h2 class="workout__title">${workout.description}</h2>
            <div class="workout__details">
              <span class="workout__icon">${
                workout.type === "running" ? "🏃‍♂️" : "🚴‍♀️"
              }</span>
              <span class="workout__value">${workout.distance}</span>
              <span class="workout__unit">km</span>
            </div>
            <div class="workout__details">
              <span class="workout__icon">⏱</span>
              <span class="workout__value">${workout.duration}</span>
              <span class="workout__unit">min</span>
            </div>
    `;
    if (workout.type === "running") {
      html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.pace.toFixed(1)}</span>
            <span class="workout__unit">min/km</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">🦶🏼</span>
            <span class="workout__value">${workout.cadence}</span>
            <span class="workout__unit">spm</span>
          </div>
        </li>`;
    }
    if (workout.type === "cycling") {
      html += `<div class="workout__details">
            <span class="workout__icon">⚡️</span>
            <span class="workout__value">${workout.speed.toFixed(1)}</span>
            <span class="workout__unit">km/h</span>
          </div>
          <div class="workout__details">
            <span class="workout__icon">⛰</span>
            <span class="workout__value">${workout.elevationGain}</span>
            <span class="workout__unit">m</span>
          </div>
        </li>`;
    }
    form.insertAdjacentHTML("afterend", html);
  }
  _movetoPopUp(e) {
    const workoutEl = e.target.closest(".workout");
    // console.log(workoutEl);
    //guard clause
    if (!workoutEl) return;

    const workout = this.#workouts.find(
      (work) => work.id === workoutEl.dataset.id
    );
    // console.log(workout);
    this.#map.setView(workout.coords, this.#mapZoomlevel, {
      animtion: true,
      pan: {
        duration: 1,
      },
    });
    //using the public interface
    //workout.click();
  }

  _setLocalStorage() {
    localStorage.setItem("workouts", JSON.stringify(this.#workouts));
  }
  _getLocalStorage() {
    const data = JSON.parse(localStorage.getItem("workouts"));
    console.log(data);

    //guard clase
    if (!data) return;

    this.#workouts = data;
    this.#workouts.forEach((work) => {
      return this._renderWorkout(work);
    });
  }
  reset() {
    localStorage.removeItem("workouts");
    location.reload();
  }
}

const app = new APP();
app._getPosition();
