function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}
function displayForecast(result) {
  let forecast = result.data.daily;
  let icon = result.data.daily[0].condition.icon_url;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="forecast-date">${formatDay(forecastDay.time)}</div>
        <img
          src="${icon}"
          alt=""
          width="60"
          class="forecast-img"
        />
        <div class="forecast-number">
          <span class="max"> ${Math.round(
            forecastDay.temperature.maximum
          )}° </span>
          <span class="min"> ${Math.round(
            forecastDay.temperature.minimum
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let lat = coordinates.latitude;
  let lon = coordinates.longitude;
  let apiKey = "f8353f340ebct4369a4b13o590322fed";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${lat}&lon=${lon}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  search(searchInput.value);
}

function search(city) {
  let apiKey = "f8353f340ebct4369a4b13o590322fed";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCity);
}

function showCity(result) {
  console.log(result.data);
  let cityName = document.querySelector("#city-name");
  let currentTemp = document.querySelector("#current-temp");
  let description = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let windSpeed = document.querySelector("#wind-speed");
  let iconElement = document.querySelector("#icon");
  let monthsList = [
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
    "December",
  ];
  let currentDate = document.querySelector("#current-date");
  let date = new Date(result.data.time * 1000);
  let day = date.getDate();
  let month = monthsList[date.getMonth()];
  let year = date.getFullYear();
  let hour = ("0" + date.getHours()).substr(-2);
  let minute = ("0" + date.getMinutes()).substr(-2);
  celciusTemp = Math.round(result.data.temperature.current);

  cityName.innerHTML = result.data.city;
  currentTemp.innerHTML = Math.round(result.data.temperature.current);
  description.innerHTML = result.data.condition.description;
  humidity.innerHTML = result.data.temperature.humidity;
  windSpeed.innerHTML = Math.round(result.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${result.data.condition.icon}.png`
  );
  currentDate.innerHTML = `${day} ${month} ${year}, ${hour}:${minute}`;
  getForecast(result.data.coordinates);
}

function displayFahreniet(event) {
  event.preventDefault();
  celcius.classList.remove("active");
  fahreneit.classList.add("active");
  let currentTemp = document.querySelector("#current-temp");
  let fahreneitTemp = (celciusTemp * 9) / 5 + 32;
  currentTemp.innerHTML = Math.round(fahreneitTemp);
}

function displayCelcius(event) {
  event.preventDefault();
  celcius.classList.add("active");
  fahreneit.classList.remove("active");
  let currentTemp = document.querySelector("#current-temp");
  currentTemp.innerHTML = celciusTemp;
}

let celciusTemp = null;
let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
let fahreneit = document.querySelector("#fahreneit");
fahreneit.addEventListener("click", displayFahreniet);
let celcius = document.querySelector("#celcius");
celcius.addEventListener("click", displayCelcius);
search("Lisbon");
