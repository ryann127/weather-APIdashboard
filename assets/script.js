

var searchInput = document.getElementById('city');
var userForm = document.getElementById('user-form');

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

    console.log(weatherConditions)

    //create rest of variables. last will be var template = `${temperature}`. use innerhtml to append to where I want it to be in HTML. div.innerHTML = template

    //build elements in a for loop for 5 day forecast. will need to use appendChild method to avoid override
}

// getApi(weatherForecastUrl);
userForm.addEventListener('submit', getCoordinate);