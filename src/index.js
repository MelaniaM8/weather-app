let currentTime = new Date();
let hour = currentTime.getHours();
if (hour < 10) {
  hour = `0 ${hour}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0 ${minutes}`;
}
let date = currentTime.getDate();
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
let day = days[currentTime.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[currentTime.getMonth()];

let dayElement = document.querySelector("#day");
dayElement.innerHTML = `${day},  `;
let monthElement = document.querySelector("#month");
monthElement.innerHTML = `${month}, `;
let dateElement = document.querySelector("#date");
dateElement.innerHTML = `${date},  `;
let hourElement = document.querySelector("#hour");
hourElement.innerHTML = `${hour}:`;
let minutesElement = document.querySelector("#minutes");
minutesElement.innerHTML = `${minutes}`;

function displayForecast(){
  let forecastElement = document.querySelector("#forecast");
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let forecastHTML = `<div class="row">`;
  days.forEach(function(day){
    forecastHTML = forecastHTML + `<div class="col-2">
  <p class="forecast-day">${day}</p>
  <img src="#" class="icon-temperature" />
  <div class="forecast-temperature">
  <span class="weather-forecast-temperature-max">12º</span>
  <span class="weather-forecast-temperature-min">10º</span>
  </div>
  </div> `
  })

  forecastHTML= forecastHTML+ `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function displayWeatherCondition(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(response.data.main.temp);
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#description").innerHTML = response.data.weather[0].description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}d@2x.png`);
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
}

function searchCity(city) {
  let apiKey = "e1dc50a50162a6d23d9d39ff29473802";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function searchLocation(position) {
  let apiKey = "e1dc50a50162a6d23d9d39ff29473802";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

function heandleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", heandleSubmit);

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

function convertToFahrenheit(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temperature");
  let fahrenheitTemperature = (celsiusTemperature  * 9) / 5 + 32; 
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertCelsius(event){
event.preventDefault();
celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");
let temperatureElement = document.querySelector("#temperature");
temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", convertToFahrenheit);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertCelsius);

searchCity("New York");
displayForecast();
