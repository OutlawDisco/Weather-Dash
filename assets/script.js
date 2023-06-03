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
  // renderLastSearch(userInput);
}

// function renderLastSearch(city) {
//   const citySearch = JSON.stringify(userInput);

//   localStorage.setItem(searchInput.val(), citySearch);
//   console.log("", citySearch);
// }

function fiveDayForecast(city) {
  console.log("5-day!", city);
  var url = `https://api.openweathermap.org/data/2.5/forecast?appid=${apiKey}&q=${city}&units=imperial`;
  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    const data = response;
    console.log("date", data.list.dt);
    console.log(data);

    for (let i = 0; i < data.list.length; i++) {
      const element = data.list[i];
      if (element.dt_txt.includes("12:00:00")) {
        const card = `
        <div class="list-group">
            <h5 class="card-title" id="weather-five-title"></h5>
            <img
              id="weather-icon"
              height="10%"
              width="10%
              src= https://openweathermap.org/img/wn/${element.weather[0].icon}.png
            />
            <p id="weather-day">${element.dt_txt}</p>
            <p class="card-text" id="weather-list temp">temp: ${element.main.temp}°F</p>
            <p id="weather-description">${element.weather[0].description}</p> 
            <p id = "wind">wind speed: ${element.wind.speed}</p>
          </div>
        `;
        document.querySelector("#forecast-container").innerHTML += card;
      }
    }
    $("#weather-list-temp").text(`Temperature: ${data.list.main.temp}°F`);
  });
}

function dailyForecast(city) {
  //  console.log("daily", city);
  var url = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&q=${city}&units=imperial`;
  $.ajax({
    url: url,
    method: "GET",
  }).then(function (response) {
    console.log("daily", response);

    const data = response;
    console.log("name", data.name);
    $("#weather-title").text(`${data.name} - ${data.weather[0].main}`);
    $("#weather-temp").text(`Temperature: ${data.main.temp}°F`);
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
