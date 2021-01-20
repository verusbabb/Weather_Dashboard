$(document).ready(function() {

city = "";
// Click function to capture the city input
$("#searchBtn").click(function(event) {

    city = $("#search").val().trim();
// Conditional to ensure user enters text before click
    if (city != ''){

// Original api call to get lat and lon
        $.ajax({
            url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&APPID=f21ee75183114c7c096d92749641d1f4",
            type: "GET",
            dataType: "jsonp",
        })
        .then(function(response) {
            let lat = (response.coord.lat)
            let lon = (response.coord.lon)
            
// Second api call to OneCall with lat and lon values       
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + "&lon=" + lon + "&appid=f21ee75183114c7c096d92749641d1f4",
                type: "GET",
                dataType: "jsonp",
            })
            // .then(function(data) {
            //     console.log(data);
            //     updatePage(data);
            .then(updatePage)
                
        })
    }
    else {
        $("#error").html('**ERROR: A city name must be entered**')
    }
    }) //end of click event

/**
 * takes API data (JSON/object) and turns it into elements on the page
* @param {object} weatherData - object containing weather data
 */
function updatePage(weatherData) {
    console.log(weatherData);
    console.log(city);
}
}) //end of document.ready