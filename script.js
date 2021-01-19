// Accessing moment.js to capture dates
var now = moment().format('MM/D/YY'); //for calendar date at the top of page
var whichHour = moment().format("H"); //for checking past, present, future of each hour-block in work-planner
var exactTime = moment().format("h:mm:ss")
var tomorrow = moment().add(1, 'days').format('MM/D/YY');
var tomorrow1 = moment().add(2, 'days').format('MM/D/YY');
var tomorrow2 = moment().add(3, 'days').format('MM/D/YY');
var tomorrow3 = moment().add(4, 'days').format('MM/D/YY');
var tomorrow4 = moment().add(5, 'days').format('MM/D/YY');

console.log(tomorrow, tomorrow1, tomorrow2, tomorrow3, tomorrow4);

// added this, but not using; purpose was to be a trigger value for resetting calendar items at midnight
// not practical unless data is being stored on an always running server (so here for exercise, not functionality)
// see notes on commented-out code block at bottom of script
var midNight = "00:00:00";

// Assigning moment.js date to top of calendar
var $todaysDate = $("#currentDay");
$todaysDate.text(now);
console.log(now);


// This is the API key, adding for getting measurements in imperial units.
var APIKey = "f21ee75183114c7c096d92749641d1f4&units=imperial";

// Here we are building the URL we need to query the database
// var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
//   "q=Lawrence,Kansas&appid=" + APIKey;

var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=lawrence,kansas&appid=" + APIKey;

// Here we run our AJAX call to the OpenWeatherMap API
$.ajax({
  url: queryURL,
  method: "GET"
})
  // We store all of the retrieved data inside of an object called "response"
  .then(function(response) {

    // Log the queryURL
    console.log(queryURL);

    // Log the resulting object
    console.log(response);
    
    // Create today's cityStats list
    $("#mainScreen").append("<span class='card-title'>" + response.name + " weather details");
    var cityStats = $("<ul>");
    // var stat = $("<li>");
    $("#mainScreen").append(cityStats);
    $(cityStats).after().append("<li>" + "Current temperature: " + response.main.temp.toFixed(0) + "° fahrenheit");
    $(cityStats).after().append("<li>" + "Humidity: " + response.main.humidity + "%");
    $(cityStats).after().append("<li>" + "Wind: " + response.wind.speed.toFixed(0) + " mph");

    
    
  });

  // This is my key for Google GeoCoding
// var googleKey ="AIzaSyC8W412_VLMC4aFM8MbDtsMETKjrEFmkow"
// var googleURL = "https://maps.googleapis.com/maps/api/geocode/json?address=Mountain+View,+CA&key=" + googleKey;


