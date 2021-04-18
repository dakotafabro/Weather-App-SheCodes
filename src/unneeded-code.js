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

// rest of conversion link html
// | <a href="#" id="celsiusTemp">°C</a></span>
