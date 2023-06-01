var weatherContainerEl = $("#weather-container");
var pastWeatherSearchEl = $(".list-group");
var apiKey = "e8f8a9be4e4f0bfebfb74b6ac11db16c";
var searchBtn = $("#search-btn");
var searchInput = $("#city-search");

function citySearchHandler(event) {
  var userInput = searchInput.val();
  //   console.log("search", userInput);
  dailyForecast(userInput);
  fiveDayForecast(userInput);
  searchHistory(userInput);
}

function fiveDayForecast(city) {
  //   console.log("5-day!", city);
  var url = `https://api.openweathermap.org/data/2.5/forecast?units=imperial&appid=${apiKey}&q=${city}`;
  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    // console.log("5-day", response);
  });
}

function dailyForecast(city) {
  //   console.log("daily", city);
  var url = `https://api.openweathermap.org/data/2.5/weather?units=imperial&appid=${apiKey}&q=${city}`;
  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    console.log("daily", response);
    $("#weather-title").text(`${data.name} - ${data.weather[0].main}`);
    $("#weather-temp").text(
      `Temperature: ${((data.main.temp * 9) / 5 - 459.67).toFixed(2)}°F`
    );
    $("#weather-date").text();
    $("#weather-icon").attr(
      "src",
      `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
  });
}

function searchHistory(city) {
  console.log("search history", city);
}

searchBtn.on("click", citySearchHandler);
