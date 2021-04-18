// defined functions listed below

// Allows for toggling between celsius and farenheit

function changeToCelsius(event) {
  event.preventDefault();

  celsiusTemp.classList.add("active");
  fahrenheitTemp.classList.remove("active");

  let bigTemp = document.querySelector("#bigTemp");
  let highTemp = document.querySelector("#highTemp");
  let lowTemp = document.querySelector("#lowTemp");
  let feelsLike = document.querySelector("#feels-like");
  let windReading = document.querySelector("#windSpeed");
  let humidityReading = document.querySelector("#humidity");

  let desiredCityTemp = Math.round(((fahrenheitTemperature - 32) * 5) / 9);
  let convertedHighTemp = Math.round(((fahrenheitHighTemp - 32) * 5) / 9);
  let convertedLowTemp = Math.round(((fahrenheitLowTemp - 32) * 5) / 9);
  let convertedFeelsLikeReading = Math.round(
    ((fahrenheitFeelsLike - 32) * 5) / 9
  );
  let convvertedWindReading = Math.round(imperialWind * 1.609);
  let convertedHumdityReading = Math.round(imperialHumidity);

  bigTemp.innerHTML = `${desiredCityTemp}`;
  highTemp.innerHTML = `H: ${convertedHighTemp}°`;
  lowTemp.innerHTML = `L: ${convertedLowTemp}°`;
  feelsLike.innerHTML = `Feels Like: ${convertedFeelsLikeReading}°`;
  windReading.innerHTML = `Wind: ${convvertedWindReading} kmph`;
  humidityReading.innerHTML = `Humidity: ${convertedHumdityReading}%`;
}

function changeToFahrenheit(event) {
  event.preventDefault();

  celsiusTemp.classList.remove("active");
  fahrenheitTemp.classList.add("active");

  let bigTemp = document.querySelector("#bigTemp");
  let highTemp = document.querySelector("#highTemp");
  let lowTemp = document.querySelector("#lowTemp");
  let feelsLike = document.querySelector("#feels-like");
  let windReading = document.querySelector("#windSpeed");
  let humidityReading = document.querySelector("#humidity");

  let desiredCityTemp = Math.round(fahrenheitTemperature);
  let originalHighTemp = Math.round(fahrenheitHighTemp);
  let originalLowTemp = Math.round(fahrenheitLowTemp);
  let originalFeelsLikeReading = Math.round(fahrenheitFeelsLike);
  let originalWindReading = Math.round(imperialWind);
  let originalHumdityReading = Math.round(imperialHumidity);

  bigTemp.innerHTML = `${desiredCityTemp}`;
  highTemp.innerHTML = `H: ${originalHighTemp}°`;
  lowTemp.innerHTML = `L: ${originalLowTemp}°`;
  feelsLike.innerHTML = `Feels Like: ${originalFeelsLikeReading}°`;
  windReading.innerHTML = `Wind: ${originalWindReading} mph`;
  humidityReading.innerHTML = `Humidity: ${originalHumdityReading}%`;
}

// Allows temp info to be updated via weather API via Current Button

function getForecast(coordinates) {
  let lat = coordinates.lat;
  let lon = coordinates.lon;
  let unit = "imperial";
  let apiKey = `dc73e9d9e0b24fe58eb2a3f82ea97342`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  console.log(apiUrl);

  axios.get(apiUrl).then(displayForecast);
}

function showTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let lowToday = Math.round(response.data.main.temp_min);
  let highToday = Math.round(response.data.main.temp_max);
  let currentDescription = response.data.weather[0].description;
  let humidityReading = response.data.main.humidity;
  let feelsLikeReading = Math.round(response.data.main.feels_like);
  let windReading = Math.round(response.data.wind.speed);
  let mainTempEmoji = response.data.weather[0].icon;

  fahrenheitHighTemp = response.data.main.temp_max;
  fahrenheitTemperature = response.data.main.temp;
  fahrenheitLowTemp = response.data.main.temp_min;
  fahrenheitFeelsLike = response.data.main.feels_like;
  imperialWind = response.data.wind.speed;
  imperialHumidity = response.data.main.humidity;

  let cityHeading = document.querySelector("#cityHeading");
  let mainTemp = document.querySelector("#bigTemp");
  let highTemp = document.querySelector("#highTemp");
  let lowTemp = document.querySelector("#lowTemp");
  let currentConditions = document.querySelector("#currentDescription");
  let humidity = document.querySelector("#humidity");
  let feelsLike = document.querySelector("#feels-like");
  let wind = document.querySelector("#windSpeed");
  let mainTempEmojiDisplayed = document.querySelector("#mainTempEmoji");

  cityHeading.innerHTML = `Welcome to ${currentCity}`;
  mainTemp.innerHTML = `${currentTemp}`;
  lowTemp.innerHTML = `L: ${lowToday}°`;
  highTemp.innerHTML = `H: ${highToday}°`;
  currentConditions.innerHTML = `${currentDescription}`;
  humidity.innerHTML = `Humidity: ${humidityReading}%`;
  feelsLike.innerHTML = `Feels like: ${feelsLikeReading}°`;
  wind.innerHTML = `Wind: ${windReading} mph`;
  mainTempEmojiDisplayed.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${mainTempEmoji}@2x.png`
  );

  fahrenheitTemp.classList.add("active");

  getForecast(response.data.coord);
}

function showCurrentPosition(currentPosition) {
  let latitude = currentPosition.coords.latitude;
  let longitude = currentPosition.coords.longitude;
  let unit = "imperial";
  let apiKey = `dc73e9d9e0b24fe58eb2a3f82ea97342`;
  let weatherApiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${unit}`;

  console.log(weatherApiUrl);

  axios.get(weatherApiUrl).then(showTemperature);
}

function currentCityClick(event) {
  event.preventDefault();

  let cityHeadingSearching = document.querySelector("#cityHeading");
  cityHeadingSearching.innerHTML = "Searching for city...";

  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

// Allows temp info to be updated via weather API via Search Bar

function updateCityInfo(event) {
  event.preventDefault();
  let enteredDesiredCity = document.querySelector("#searchCity");
  let cityName = enteredDesiredCity.value;
  let unit = "imperial";
  let apiKey = `dc73e9d9e0b24fe58eb2a3f82ea97342`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${unit}`;

  console.log(apiUrl);

  axios.get(apiUrl).then(showTemperature);
}

function displayForecast(response) {
  console.log(response.data.daily);

  let fiveDayForecast = document.querySelector("#fiveDayForecast");
  let shortDays = ["Sat", "Sun", "Mon", "Tues", "Wed", "Thurs"];
  let forecastHTML = `<div class="row fiveDay">`;

  shortDays.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `<div class="col-2">
            <span id="forecastDay1">${day}</span>
            <span id="nameDay"></span>
            <br />
            <span id="iconDay">🌤</span>
            <br />
            <span id="highDay" class="dayTemp">--°</span> <span id="lowDay1">--°</span>
          </div>`;
  });

  fiveDayForecast.innerHTML = forecastHTML;
}

// defined variables listed below

// Allows for correct date and time to be displayed in app

let shortDays = ["Sat", "Sun", "Mon", "Tues", "Wed", "Thurs", "Fri"];

let fullDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "Decemeber",
];

let now = new Date();
let currentDate = now.getDate();
let currentHour = now.getHours();

if (currentHour < 10) {
  currentHour = `0${currentHour}`;
}

let currentMinutes = now.getMinutes();

if (currentMinutes < 10) {
  currentMinutes = `0${currentMinutes}`;
}

let currentFullDay = fullDays[now.getDay()];
let currentShortDay = shortDays[now.getDay()];
let currentMonth = months[now.getMonth()];
let currentYear = now.getFullYear();

let dateAndTime = `${currentFullDay}, ${currentMonth} ${currentDate}, ${currentYear} - ${currentHour}:${currentMinutes}`;

// This section allows for city search to update header

let currentCityInfo = document.querySelector("#currentCityInfo");
currentCityInfo.innerHTML = dateAndTime;

// To-Do: allow conversion to update other elements (high temp, low temp, wind, feels like)

let desiredCity = document.querySelector("#citySearchBar");
desiredCity.addEventListener("submit", updateCityInfo);

let currentCityButton = document.querySelector("#currentCityButton");
currentCityButton.addEventListener("click", currentCityClick);

let fahrenheitHighTemp = null;
let fahrenheitTemperature = null;
let fahrenheitLowTemp = null;
let fahrenheitFeelsLike = null;
let imperialWind = null;
let imperialHumidity = null;

let celsiusTemp = document.querySelector("a#celsiusTemp");
celsiusTemp.addEventListener("click", changeToCelsius);

let fahrenheitTemp = document.querySelector("a#fahrenheitTemp");
fahrenheitTemp.addEventListener("click", changeToFahrenheit);
