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
  renderLastSearch(userInput);
}

// function renderLastSearch(city) {
//   const citySearch = JSON.stringify(userInput);

//   localStorage.setItem(searchInput.val(), citySearch);
//   console.log("", citySearch);
// }

function fiveDayForecast(city) {
  //   console.log("5-day!", city);
  var url = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=${city}`;
  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    console.log("5-day", response);
    //     const data = response;
    //     $("#weather-five-title").text(`${data.name} -${data.list[0].main}`);
    //   });
  });
}

function dailyForecast(city) {
  //  console.log("daily", city);
  var url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}`;
  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    console.log("daily", response);

    const data = response;
    console.log("name", data.name);
    $("#weather-title").text(`${data.name} - ${data.weather[0].main}`);
    $("#weather-temp").text(
      `Temperature: ${((data.main.temp * 9) / 5 - 459.67).toFixed(2)}°F`
    );
    $("#weather-date").text();
    $("#wind-chill").text(`Wind: ${data.wind.speed}`);
    $("#weather-icon").attr(
      "src",
      `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    );
    $("#weather-description").text(`${data.weather[0].description}`);
  });
}

function searchHistory(city) {
  console.log("search history", city);
}

searchBtn.on("click", citySearchHandler);
