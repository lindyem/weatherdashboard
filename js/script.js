//Event Listeners
$("#searchBtn").click(function () {
  var search = $("#searchInput").val();

  var key = "1a53eae6d73210b8584d1690b01b9a73";
  var queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=${key}&units=imperial`;
  // add X
  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    // var uvIndex = getUvData(lat, long) //make this function get data from api
    var uvIndex = 1;
    var icon =
      "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png";

    $("#name").text(response.name);
    $("#date").text(moment().format("L"));
    //$("#img");

    $("#temp").text(response.main.temp); //this is how to do it without making vars for each data
    $("#humidity").text(response.main.humidity);
    $("#wind").text(response.wind.speed);
    $("#uvIndex").text(uvIndex);

    $("#weatherInfo").css("display", "block");
  });
});
//forecast function
