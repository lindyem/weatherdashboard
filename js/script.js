//FUNCTIONS
function renderSearchHistory() {
  $("#searchHistory").empty();

  for (var i = 0; i < localStorage.length; i++) {
    var newDiv = $("<div>");
    newDiv.text(localStorage.key(i));
    newDiv.addClass("searchHistoryBox");
    newDiv.attr("city-name", localStorage.key(i));
    $("#searchHistory").prepend(newDiv);
  }
}

function renderWeatherDashboard(city) {
  var key = "1a53eae6d73210b8584d1690b01b9a73";
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=imperial`;
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    var lat = response.coord.lat;
    var lon = response.coord.lon;
    var icon =
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";

    $("#name").text(response.name);
    $("#date").text(`(${moment().format("L")})`); //` and $ to concat string interpolation
    $("#weatherIcon").attr("src", icon);
    $("#temp").text(response.main.temp); //this is how to do it without making vars for each data
    $("#humidity").text(response.main.humidity);
    $("#wind").text(response.wind.speed);
    $("#weatherInfo").css("display", "block");

    //Get uv index
    var uvURL = `http://api.openweathermap.org/data/2.5/uvi?appid=${key}&lat=${lat}&lon=${lon}`;

    $.ajax({
      url: uvURL,
      method: "GET",
    }).then(function (response) {
      $("#uvIndex").text(response.value);
      if (response.value >= 0 && response.value <= 2) {
        $("#uvIndex").css("background-color", "green");
      } else if (response.value > 2 && response.value <= 5) {
        $("#uvIndex").css("background-color", "yellow");
      } else if (response.value > 5 && response.value <= 7) {
        $("#uvIndex").css("background-color", "orange");
      } else if (response.value > 7 && response.value <= 10) {
        $("#uvIndex").css("background-color", "red");
      } else {
        $("#uvIndex").css("background-color", "violet");
      }
    });

    //Render forecast
    var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}&units=imperial`;
    $.ajax({
      url: forecastURL,
      method: "GET",
    }).then(function (response) {
      var day1 = response.list[4];
      var day2 = response.list[12];
      var day3 = response.list[20];
      var day4 = response.list[28];
      var day5 = response.list[36];

      $("#day1").html(`
      <div>${moment(day1.dt_text).format("L")}</>
      <div><img src="${`http://openweathermap.org/img/w/${day1.weather[0].icon}.png`}"/></div>
      <div>Temp: ${day1.main.temp}</div>
      <div>Humidity: ${day1.main.humidity}</div>
     `);
      $("#day2").html(`
      <div>${moment(day1.dt_text).format("L")}</div>
      <div><img src="${`http://openweathermap.org/img/w/${day2.weather[0].icon}.png`}"/></div>
      <div>Temp: ${day2.main.temp}</div>
      <div>Humidity: ${day2.main.humidity}</div>
     `);
      $("#day3").html(`
      <div>${moment(day3.dt_text).format("L")}</div>
      <div><img src="${`http://openweathermap.org/img/w/${day3.weather[0].icon}.png`}"/></div>
      <div>Temp: ${day3.main.temp}</div>
      <div>Humidity: ${day3.main.humidity}</div>
     `);
      $("#day4").html(`
      <div>${moment(day4.dt_text).format("L")}</div>
      <div><img src="${`http://openweathermap.org/img/w/${day4.weather[0].icon}.png`}"/></div>
      <div>Temp: ${day4.main.temp}</div>
      <div>Humidity: ${day4.main.humidity}</div>
     `);
      $("#day5").html(`
      <div>${moment(day5.dt_text).format("L")}</div>
      <div><img src="${`http://openweathermap.org/img/w/${day5.weather[0].icon}.png`}"/></div>
      <div>Temp: ${day5.main.temp}</div>
      <div>Humidity: ${day5.main.humidity}</div>
     `);
    });
  });
}

renderSearchHistory();

//Event Listeners
$(".searchHistoryBox").click(function () {
  var cityName = $(this).attr("city-name");
  renderWeatherDashboard(cityName);
});

$("#searchBtn").click(function () {
  var search = $("#searchInput").val();
  localStorage.setItem(search, search);
  renderSearchHistory();
  renderWeatherDashboard(search);
});
