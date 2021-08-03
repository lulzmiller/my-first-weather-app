// Opacity fix
//SRC: https://www.impressivewebs.com/fixing-parent-child-opacity/
function thatsNotYoChild(parentID) {
  var parent = document.querySelector(`${parentID}`),
    children = parent.innerHTML,
    wrappedChildren =
      '<div id="children" class="children">' + children + "</div>",
    x,
    y,
    w,
    newParent,
    clonedChild,
    clonedChildOld;

  parent.innerHTML = wrappedChildren;
  clonedChild = document.getElementById("children").cloneNode(true);
  document.getElementById("children").id = "children-old";
  clonedChildOld = document.getElementById("children-old");
  newParent = parent.parentNode;

  newParent.appendChild(clonedChild);
  clonedChildOld.style.opacity = "0";
  clonedChildOld.style.filter = "alpha(opacity=0)";

  function doCoords() {
    x = clonedChildOld.getBoundingClientRect().left;
    y = clonedChildOld.getBoundingClientRect().top;
    if (clonedChildOld.getBoundingClientRect().width) {
      w = clonedChildOld.getBoundingClientRect().width; // for modern browsers
    } else {
      w = clonedChildOld.offsetWidth; // for oldIE
    }

    clonedChild.style.position = "absolute";
    clonedChild.style.left = x + "px";
    clonedChild.style.top = y + "px";
    clonedChild.style.width = w + "px";
  }

  window.onresize = function () {
    doCoords();
  };

  doCoords();
}

// call the function and pass the ID of the parent that has opacity set.
thatsNotYoChild(".opacity-fix");

//HOMEWORK SHECODES
//Feature #1 In your project, display the current date and time using JavaScript: Tuesday 16:00
let weekDays = [
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
  "December",
];
let now = new Date();
console.log(Date());
let year = now.getFullYear();
let month = months[now.getMonth()];
let weekDay = weekDays[now.getDay()];
let date = now.getDate();
let hour = now.getHours();
let minute = now.getUTCMinutes();
let second = now.getSeconds();
let currentTimenDate = `${weekDay}, ${month} ${date} ${hour}:${minute}:${second}`;
let currentTimeNDateDisplay = document.querySelector("#current-time");
currentTimeNDateDisplay =
  currentTimeNDateDisplay.innerHTML = `${currentTimenDate}`;

// Add a search engine, when searching for a city (i.e. Paris), display the city name on the page after the user submits the form.
/*
function showCityInformation(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city-input");
  let currentCity = document.querySelector("#current-city");
  let NewCurrentCity = searchCityInput.value;
  currentCity.innerHTML = `${NewCurrentCity}`;
}
let searchCityForm = document.querySelector("#search-city-form");
searchCityForm.addEventListener("submit", showCityInformation);

// Display a fake temperature (i.e 17) in Celsius and add a link to convert it to Fahrenheit. When clicking on it, it should convert the temperature to Fahrenheit. When clicking on Celsius, it should convert it back to Celsius.

function showCelsius(event) {
  let currentTempContainer = document.querySelector("#temp-degrees");
  let currentTemp = document.querySelector("#temp-degrees").innerHTML;
  let currentTempC = ((currentTemp - 32) * 5) / 9;
  currentTempContainer.innerHTML = `${currentTempC}`;
  let celsius = document.querySelector("#celsius");
  celsius.removeEventListener("click", showCelsius);
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.addEventListener("click", showFahrenheit);
}
function showFahrenheit(event) {
  let currentTempContainer = document.querySelector("#temp-degrees");
  let currentTemp = document.querySelector("#temp-degrees").innerHTML;
  let currentTempF = (currentTemp * 9) / 5 + 32;
  currentTempContainer.innerHTML = `${currentTempF}`;
  let fahrenheit = document.querySelector("#fahrenheit");
  fahrenheit.removeEventListener("click", showFahrenheit);
  let celsius = document.querySelector("#celsius");
  celsius.addEventListener("click", showCelsius);
}

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", showFahrenheit, { once: true });

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", showCelsius, { once: true });
*/

//weather api
function getPosition(event) {
  navigator.geolocation.getCurrentPosition(handlePosition);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "590447721ec9809f25311836ff52f884";
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiURL).then(showCityInfo);
}

function getCityInformation(event) {
  event.preventDefault();
  let searchCityInput = document.querySelector("#search-city-input");
  searchCityInputVal = searchCityInput.value;
  let apiKey = "590447721ec9809f25311836ff52f884";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchCityInputVal}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showCityInfo);
}
function showCityInfo(response) {
  console.log(response);
  let newCurrentCity = response.data.name;
  let newCurrentTempC = Math.round(response.data.main.temp);
  let newWeatherDesc = response.data.weather[0].description;
  currentTempC.innerHTML = `${newCurrentTempC}`;
  currentCity.innerHTML = `${newCurrentCity}`;
  currentWeatherDesc.innerHTML = `${newWeatherDesc}`;
}

let searchCityForm = document.querySelector("#search-city-form");
let currentCity = document.querySelector("#current-city");
let currentTempC = document.querySelector("#temp-degrees");
let currentWeatherDesc = document.querySelector("#weather-description");
let currentLocationBtn = document.querySelector("#current-location-btn");
currentLocationBtn.addEventListener("click", getPosition);
searchCityForm.addEventListener("submit", getCityInformation);
