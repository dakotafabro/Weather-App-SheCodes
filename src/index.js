// Allows for correct date and time to be displayed in app

let shortDays = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

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

// Allows for toggling between celsius and farenheit

function changeToCelsius(event) {
  let bigTemp = document.querySelector("#bigTemp");
  let desiredCityTemp = "C";
  bigTemp.innerHTML = `${desiredCityTemp}°`;
}

function changeToFarenheit(event) {
  let bigTemp = document.querySelector("#bigTemp");
  let desiredCityTemp = "F";
  bigTemp.innerHTML = `${desiredCityTemp}°`;
}

let celsiusTemp = document.querySelector("a#celsiusTemp");
celsiusTemp.addEventListener("click", changeToCelsius);

let farenheitTemp = document.querySelector("a#farenheitTemp");
farenheitTemp.addEventListener("click", changeToFarenheit);

// Allows temp info to be updated via weather API via Current Button

function showTemperature(response) {
  let currentTemp = Math.round(response.data.main.temp);
  let currentCity = response.data.name;
  let lowToday = Math.round(response.data.main.temp_min);
  let highToday = Math.round(response.data.main.temp_max);
  let currentDescription = response.data.weather[0].description;
  let humidityReading = response.data.main.humidity;
  let feelsLikeReading = Math.round(response.data.main.feels_like);
  let windReading = Math.round(response.data.wind.speed);

  let cityHeading = document.querySelector("#cityHeading");
  let mainTemp = document.querySelector("#bigTemp");
  let highTemp = document.querySelector("#highTemp");
  let lowTemp = document.querySelector("#lowTemp");
  let currentConditions = document.querySelector("#currentDescription");
  let humidity = document.querySelector("#humidity");
  let feelsLike = document.querySelector("#feels-like");
  let wind = document.querySelector("#windSpeed");

  cityHeading.innerHTML = `Welcome to ${currentCity}`;
  mainTemp.innerHTML = `${currentTemp}°`;
  lowTemp.innerHTML = `L: ${lowToday}°`;
  highTemp.innerHTML = `H: ${highToday}°`;
  currentConditions.innerHTML = `${currentDescription}`;
  humidity.innerHTML = `Humidity: ${humidityReading}%`;
  feelsLike.innerHTML = `Feels like: ${feelsLikeReading}°`;
  wind.innerHTML = `Wind: ${windReading} mph`;
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
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
}

let currentCityButton = document.querySelector("#currentCityButton");
currentCityButton.addEventListener("click", currentCityClick);

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

let desiredCity = document.querySelector("#citySearchBar");
desiredCity.addEventListener("submit", updateCityInfo);
