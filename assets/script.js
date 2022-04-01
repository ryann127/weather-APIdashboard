

var searchInput = document.getElementById('city');
var userForm = document.getElementById('user-form');
var currentWeather = document.querySelector('#current-forecast');
var cityList = document.getElementById('city-list')
var indexScale = document.querySelector('index-scale');

var cities = [];

// The following function renders items in a city list as <li> elements
function renderCities() {
  // Clear todoList element
  cityList.innerHTML = "";

  // Render a new li for each city
  for (var i = 0; i < cities.length; i++) {
    var cityName = cities[i];

    var li = document.createElement("li");
    li.textContent = cityName + " ";
    li.setAttribute("data-index", i);

    var button = document.createElement("button");
    button.textContent = ">";

    li.appendChild(button);
    cityList.appendChild(li);
  }
}

function init() {
  // Get stored cities from localStorage
  var storedCities = JSON.parse(localStorage.getItem("cities"));

  // If cities were retrieved from localStorage, update the cities array to it
  if (storedCities !== null) {
    cities = storedCities;
  }

  // This is a helper function that will render cities to the DOM
  renderCities();
}

function storeCities() {
  // Stringify and set key in localStorage to cities array
  localStorage.setItem("cities", JSON.stringify(cities));
}

userForm.addEventListener("submit", function (event) {
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
    .then(function (daily) {

      return daily.json();
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

  fetch(geocodingUrl).then(daily => daily.json())
    .then(data => getApi(data));
  //fetch(geocodingUrl).then(function(daily){
  //   console.log(daily);
  //})

  console.log(city)
}

//create a new function taking to render weather taking data from getApi
function renderWeather(daily) {
  console.log(daily)
  var temperature = Math.round(1.8 * ((daily.current.temp) - 273.15) + 32);
  console.log(temperature)
  var humidity = daily.current.humidity;
  var windSpeed = daily.current.wind_speed;
  var uvIndex = daily.current.uvi;
  var weatherConditions = daily.current.weather[0].description
  var todayIcon = daily.current.weather[0].icon;
  var todayDate = moment().format("MMMM Do, YYYY")
  

  //create rest of variables. last will be var template = `${temperature}`. use innerhtml to append to where I want it to be in HTML. div.innerHTML = template
  var template = `
      <h4> ${searchInput.value} - ${todayDate}</h4> 
      <div class="text-center"> Current Temp: ${temperature}°F</div> 
      <div class="text-center"> Humidity: ${humidity}%</div>
      <div class="text-center"> Wind Speed: ${windSpeed} MPH</div>
      <div class="text-center" id="index-scale"> UV Index: ${uvIndex} </div>
      <div class="text-center"> Current Conditions: ${weatherConditions} </div>
      <img class="rounded mx-auto d-block" src="http://openweathermap.org/img/wn/${todayIcon}@2x.png" alt="image that represents weather for the day"><img>`

  currentWeather.innerHTML = template;


  console.log(weatherConditions)

  if (uvIndex >= 8) {
    $("#index-scale").css("color", "red");
  } else if (uvIndex > 4 && uvIndex < 8) {
    $("#index-scale").css("color", "yellow");
  } else {
    $("#index-scale").css("color", "green");
  }


  //build elements in a for loop for 5 day forecast. will need to use appendChild method to avoid override

  //forecast temp variables
  let day1temp = Math.round(1.8 * ((daily.daily[0].temp.day) - 273.15) + 32);
  let day2temp = Math.round(1.8 * ((daily.daily[1].temp.day) - 273.15) + 32);
  let day3temp = Math.round(1.8 * ((daily.daily[2].temp.day) - 273.15) + 32);
  let day4temp = Math.round(1.8 * ((daily.daily[3].temp.day) - 273.15) + 32);
  let day5temp = Math.round(1.8 * ((daily.daily[4].temp.day) - 273.15) + 32);
  console.log(day1temp);
  //forecast humidity variables
  let day1hum = daily.daily[0].humidity;
  let day2hum = daily.daily[1].humidity;
  let day3hum = daily.daily[2].humidity;
  let day4hum = daily.daily[3].humidity;
  let day5hum = daily.daily[4].humidity;
  //forecast weather icon variables
  let icon1 = daily.daily[0].weather[0].icon;
  let icon2 = daily.daily[1].weather[0].icon;
  let icon3 = daily.daily[2].weather[0].icon;
  let icon4 = daily.daily[3].weather[0].icon;
  let icon5 = daily.daily[4].weather[0].icon;
  //
  $("#temp1").text("Temp(F):" + " " + day1temp.toFixed(1));
  $("#temp2").text("Temp(F):" + " " + day2temp.toFixed(1));
  $("#temp3").text("Temp(F):" + " " + day3temp.toFixed(1));
  $("#temp4").text("Temp(F):" + " " + day4temp.toFixed(1));
  $("#temp5").text("Temp(F):" + " " + day5temp.toFixed(1));

  $("#hum1").text("Hum:" + " " + day1hum + "%");
  $("#hum2").text("Hum:" + " " + day2hum + "%");
  $("#hum3").text("Hum:" + " " + day3hum + "%");
  $("#hum4").text("Hum:" + " " + day4hum + "%");
  $("#hum5").text("Hum:" + " " + day5hum + "%");

  $("#icon1").html(
    `<img src="http://openweathermap.org/img/wn/${icon1}@2x.png">`
  );
  $("#icon2").html(
    `<img src="http://openweathermap.org/img/wn/${icon2}@2x.png">`
  );
  $("#icon3").html(
    `<img src="http://openweathermap.org/img/wn/${icon3}@2x.png">`
  );
  $("#icon4").html(
    `<img src="http://openweathermap.org/img/wn/${icon4}@2x.png">`
  );
  $("#icon5").html(
    `<img src="http://openweathermap.org/img/wn/${icon5}@2x.png">`

  )}

// getApi(weatherForecastUrl);
userForm.addEventListener('submit', getCoordinate);