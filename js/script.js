//Event Listeners
$("#searchBtn").click(function () {
  var search = $("#searchInput").val();
  var key = "1a53eae6d73210b8584d1690b01b9a73";

  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}&units=imperial`;
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
      console.log(response);
      $("#uvIndex").text(response.value);
    });

    //Render forecast
    var forecastURL = `https://openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${key}`;
    $.ajax({
      url: forecastURL,
      method: "GET",
    }).then(function (response) {
      console.log(response);
    });
  });
});

//forecast function
//uvINDEX
