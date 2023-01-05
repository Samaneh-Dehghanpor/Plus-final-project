let now = new Date();
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

let month = monthsList[now.getMonth()];
let date = now.getDate();
let year = now.getFullYear();
let hour = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
let time = document.querySelector("#time");
time.innerHTML = `${date} ${month} ${year}, ${hour}`;

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

  cityName.innerHTML = result.data.city;
  currentTemp.innerHTML = Math.round(result.data.temperature.current);
  description.innerHTML = result.data.condition.description;
  humidity.innerHTML = result.data.temperature.humidity;
  windSpeed.innerHTML = Math.round(result.data.wind.speed);
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${result.data.condition.icon}.png`
  );
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Madrid");
