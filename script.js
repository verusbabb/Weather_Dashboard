
// Accessing moment.js to capture dates
var now = moment().format('MM/D/YY'); //for calendar date at the top of page
var tomorrow0 = moment().add(1, 'days').format('MM/D/YY');
var tomorrow1 = moment().add(2, 'days').format('MM/D/YY');
var tomorrow2 = moment().add(3, 'days').format('MM/D/YY');
var tomorrow3 = moment().add(4, 'days').format('MM/D/YY');
var tomorrow4 = moment().add(5, 'days').format('MM/D/YY');
var dayName;

$("button").on("click", function(event) {
  event.preventDefault();
  
  // assigning the input text to variable city
  var city = $("#search").val().trim();
  

console.log(city);
  
  // saving the tast description to local storage with "hour" as the key and "task" as value
  localStorage.setItem("location", JSON.stringify(city));
});

// This is the API key, adding for getting measurements in imperial units.
var APIKey = "f21ee75183114c7c096d92749641d1f4&units=imperial";

var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=atlanta&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function (response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);



    // Create and display current weather stats
    $("#mainScreen").append("<span class='card-title'>" + response.city.name + " current weather:");
    var cityStats = $("<ul>").append(temp, wind, humidity);
    $("#mainScreen").append(cityStats);
    var temp = $("<li>").append("Current temperature: " + response.list[0].main.temp.toFixed(0) + "° fahrenheit");
    var wind = $("<li>").append("Wind: " + response.list[0].wind.speed.toFixed(0) + " mph");
    var humidity = $("<li>").append("Humidity: " + response.list[0].main.humidity + "%");
    cityStats.append(temp, wind, humidity);
    

    //Create and display 5 day forecast data
    var cityStats0 = $("<ul>").append(date0, icon, temp0, wind0, humidity0);
    $("card").append(cityStats0);
    var date0 = $("<h5>").append(tomorrow0);
    var icon = $('<img src="http://openweathermap.org/img/wn/04n@2x.png"/>');
    var temp0 = $("<li>").append("Temp: " + response.list[0].main.temp.toFixed(0) + "°");
    var wind0 = $("<li>").append("Wind: " + response.list[0].wind.speed.toFixed(0) + " mph");
    var humidity0 = $("<li>").append("Humidity: " + response.list[0].main.humidity + "%");
    cityStats0.append(date0, icon, temp0, wind0, humidity0);
    
    
    console.log(response.list[0].weather[0].icon);
    

  });


