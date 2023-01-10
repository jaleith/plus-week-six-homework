let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];

let day = days[now.getDay()];
let hour = now.getHours();
let minute = now.getMinutes();
if (hour < 10) {
  hour = `0${hour}`;
}
if (minute < 10) {
  minute = `0${minute}`;
}
let time = `${hour}:${minute}`;

let h2 = document.querySelector("#date-time");
h2.innerHTML = `${day} ${time}`;

function displayWeather(response) {
  console.log(response.data.weather.description);
  document.querySelector("#city-header").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#big-temp-display").innerHTML = Math.round(
    response.data.main.temp
  );
}

function searchLocation(position) {
  // let latitude = position.coords.latitude;
  // let longitude = position.coords.longitude;
  let apiKey = "2bd326a60dc89a53287e446e819664df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayWeather);
}

function searchCity(city) {
  let apiKey = "2bd326a60dc89a53287e446e819664df";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  debugger;
  event.preventDefault();
  let city = document.querySelector("#city-inquiry").value;
  searchCity(city);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-city-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
// // let city = document.querySelector("#city-header");
// // let cityInput = document.querySelector("#city-inquiry");
// // city.innerHTML = `${cityInput.value}`;

let button = document.querySelector("button");
button.addEventListener("click", handleSubmit);

searchCity("New York");

// function clickFah() {
//   let fahTemperature = document.querySelector("#big-temp-display");
//   fahTemperature.innerHTML = Math.round((81 - 32) * 0.5556);
// }
// let fahrenheit = document.querySelector("#metric-unit");
// fahrenheit.addEventListener("click", clickFah);

// function clickCel() {
//   let celTemperature = document.querySelector("#big-temp-display");
//   celTemperature.innerHTML = Math.round(27 * 1.8 + 32);
// }
// let celsius = document.querySelector("#imperial-unit");
// celsius.addEventListener("click", clickCel);
