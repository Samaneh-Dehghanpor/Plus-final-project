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
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);
