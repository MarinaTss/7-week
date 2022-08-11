function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = "Forecast";
}

function showTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celTemperature);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}

function search(city) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=39b18d6090a02e4c0d2e4fb1ffb67b36&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showFartemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let Fartemperature = (celTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(Fartemperature);
}

function showCelTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");

  temperatureElement.innerHTML = Math.round(celTemperature);
}

let celTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let ftemperatureLink = document.querySelector("#ftemperature");
ftemperatureLink.addEventListener("click", showFartemperature);

let ctemperatureLink = document.querySelector("#ctemperature");
ctemperatureLink.addEventListener("click", showCelTemperature);

search("New York");

displayForecast();
//ctemperature;
