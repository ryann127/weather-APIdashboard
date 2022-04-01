

var searchInput = document.getElementById('city');
var userForm = document.getElementById('user-form');
var currentWeather = document.querySelector('#current-forecast');
var cityList = document.getElementById('city-list')

var cities = [];

// The following function renders items in a todo list as <li> elements
function renderCities() {
  // Clear todoList element
  cityList.innerHTML = "";

  // Render a new li for each todo
  for (var i = 0; i < cities.length; i++) {
    var cityName = cities[i];

    var li = document.createElement("li");
    li.textContent = cityName + " ";
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = "Search";

    li.appendChild(button);
    cityList.appendChild(li);
  }
}

function init() {
  // Get stored todos from localStorage
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  // If todos were retrieved from localStorage, update the todos array to it
  if (storedCities !== null) {
    cities = storedCities;
  }

  // This is a helper function that will render todos to the DOM
  renderCities();
}

function storeCities() {
  // Stringify and set key in localStorage to todos array
  localStorage.setItem("cities", JSON.stringify(cities));
}

userForm.addEventListener("submit", function(event) {
  event.preventDefault();

  var cityText = searchInput.value.trim();

  // Return from function early if submitted todoText is blank
  if (cityText === "") {
    return;
  }

  // Add new todoText to todos array, clear the input
  cities.push(cityText);
  
  // Store updated todos in localStorage, re-render the list
  storeCities();
  renderCities();
});

function getApi(cityInfo) {
    console.log(cityInfo)
    var lat = cityInfo[0].lat
    var lon = cityInfo[0].lon
    var weatherForecastUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=6756ca534929073d4d2ac4df8cf2ffe5`;

  fetch(weatherForecastUrl)
    .then(function (response) {

      return response.json();
    })
    .then(function (data) {
      
      renderWeather(data);
    });
}

//create function to get coordinates for searched city
function getCoordinate(event) {
    event.preventDefault()
    var city = searchInput.value
    var geocodingUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=6756ca534929073d4d2ac4df8cf2ffe5`

    fetch(geocodingUrl).then(response => response.json())
        .then(data => getApi(data));
    //fetch(geocodingUrl).then(function(response){
    //   console.log(response);
    //})

    console.log(city)
}

//create a new function taking to render weather taking data from getApi
function renderWeather(daily) {
    console.log(daily)
    var temperature = Math.round(1.8*((daily.current.temp)-273.15)+32);
    console.log(temperature)
    var humidity = daily.current.humidity;
    var windSpeed = daily.current.wind_speed;
    var uvIndex = daily.current.uvi;
    var weatherConditions = daily.current.weather[0].description
    var todayDate = moment().format("MMMM Do, YYYY")

    var template = `
      <h2> ${searchInput.value} - ${todayDate}</h2> 
      <div class="text-center"> Current Temp: ${temperature}°F</div> 
      <div class="text-center"> Humidity: ${humidity}%</div>
      <div class="text-center"> Wind Speed: ${windSpeed} MPH</div>
      <div class="text-center"> UV Index: ${uvIndex} </div>
      <div class="text-center"> Current Conditions: ${weatherConditions} </div>`

      currentWeather.innerHTML = template;


    console.log(weatherConditions)

    //create rest of variables. last will be var template = `${temperature}`. use innerhtml to append to where I want it to be in HTML. div.innerHTML = template

    //build elements in a for loop for 5 day forecast. will need to use appendChild method to avoid override
}

// getApi(weatherForecastUrl);
userForm.addEventListener('submit', getCoordinate);