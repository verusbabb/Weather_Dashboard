$(document).ready(function(){
// var city;
// $("button").on("click", function (event) {
//     event.preventDefault();

//     // assigning the input text to variable city
//     var city = $("#search").val().trim();
//     console.log(city);


//     // saving the tast description to local storage with "hour" as the key and "task" as value
//     localStorage.setItem("location", JSON.stringify(city));
// });

//build query URL for first api query
// var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=atlanta&appid=" + APIKey;

function buildBasicQuery() {
var shortURL = "https://api.openweathermap.org/data/2.5/forecast?&";

var appID = "f21ee75183114c7c096d92749641d1f4&units=imperial"
// var queryParams = { "appid": "f21ee75183114c7c096d92749641d1f4&units=imperial" };
var cityInput = $("#search").val().trim();
var cityInput = "lawrence, kansas";
var queryCity = ("q=" + cityInput);
// queryParams.q = $("#search").val().trim();

console.log(shortURL + queryCity + appID);

}

// .on("click") function associated with the Search Button
$("#searchBtn").on("click", function(event) {
    // This line allows us to take advantage of the HTML "submit" property
    // This way we can hit enter on the keyboard and it registers the search
    // (in addition to clicks). Prevents the page from reloading on form submit.
    event.preventDefault();
  
    // Build the query URL for the ajax request to the first API we want to call.
    var queryURL = buildBasicQuery();
  
    // Make the AJAX request to the API - GETs the JSON data at the queryURL.
    // The data then gets passed as an argument to the updatePage function
    $.ajax({
      url: queryURL,
      method: "GET"

      
    // }).then(updatePage); //this will be a function I create to update
    }).then(response);
    console.log(response);
  });



// requiry OneCall for full data using lat and long in query string

// post relevant weather data to the results

//store latest city search
})
