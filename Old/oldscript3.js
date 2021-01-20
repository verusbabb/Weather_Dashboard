//ready document
$(document).ready(function () {

var cityHistory;
var city;
var queryURL = "";
// load a default city into results

// check local storage and populate history

localStorage.setItem("cityHistory", JSON.stringify(city));

// listen for click event on new city

$("button").on("click", function(event) {
    event.preventDefault();
    
    // assigning the input text to variable city
    city = $("#search").val().trim();

    // build basicAPI query
    var APIKey = "f21ee75183114c7c096d92749641d1f4&units=imperial";

queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=atlanta&appid=" + APIKey;
});
    // query basicAPI with city input

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
    })


    // store city name input in local storage
    // post city name to history
    // return lat and long

    

// requiry OneCall for full data using lat and long in query string

// post relevant weather data to the results

//store latest city search
})