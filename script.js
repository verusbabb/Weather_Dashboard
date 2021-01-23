$(document).ready(function () {

    // a few required global vars
    var city = "";
    var cityHistory = [];

    // Retrieve any existing local storage
    init();
    function init() {
        var storedCities = JSON.parse(localStorage.getItem("recentSearches"));
        if (storedCities !== null) {
            city = storedCities[0]
            cityHistory = storedCities;
        }

        console.log(cityHistory);

        if (city) {
            runAPI(city);
        }
    }

    function runAPI(myCity) {
        $.ajax({
            url: 'https://api.openweathermap.org/data/2.5/weather?q=' + myCity + "&units=imperial" + "&APPID=f21ee75183114c7c096d92749641d1f4",
            type: "GET",
            dataType: "jsonp",
        })
            .then(function (response) {
                let lat = (response.coord.lat)
                let lon = (response.coord.lon)

                // storing second queryURL to use with history/locally stored prior searches
                queryURL = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + "&lon=" + lon + "&units=imperial" + "&appid=f21ee75183114c7c096d92749641d1f4"

                // Second api call to OneCall with lat and lon values       
                $.ajax({
                    url: queryURL,
                    type: "GET",
                    dataType: "jsonp",
                })
                    .then(updatePage);
            })
    }

    function historyBtns() {
        // writing recent search to search history
        $("#myHistory").empty();
        for (var i = 0; i < 5; i++) {
        var oldSearch = $("<button>")
        oldSearch.on("click", function(){
            city=$(this).text();
            runAPI(city);
        })
        oldSearch.text(cityHistory[i]);
        if (oldSearch.text()) {
        console.log(oldSearch);
        oldSearch.addClass("searchHistory");
        $("#myHistory").append(oldSearch);
        }}
    }

    // Click function to capture the city input
    $("#searchBtn").click(function (event) {
        event.preventDefault();

        city = $("#search").val().trim();

        // Conditional to ensure user enters text before click
        if (city != '') {
            city = city.charAt(0).toUpperCase() + city.slice(1);

            // Original api call to get lat and lon
            cityHistory.unshift(city);
            localStorage.setItem("recentSearches", JSON.stringify(cityHistory));
            
            runAPI(city);
        }
        else {
            $("#error").html('**ERROR: A city name must be entered**')
        }
    }) //end of click event


    /**
     * takes API data (JSON/object) and turns it into elements on the page
    * @param {object} weatherData - object containing weather data
     */

    // Updating page with response data from API
    function updatePage(weatherData) {
        console.log(weatherData);

        historyBtns();

        // updating current weather panel
        $("#cityName").text("Current weather for " + city + ":");
        $("#currentIcon").empty();
        var icon = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + weatherData.current.weather[0].icon + '@2x.png')
        $("#currentIcon").append(icon);
        $("#currentTemp").text("Temperature: " + weatherData.current.temp.toFixed(0) + "° fahrenheit");
        $("#windSpeed").text("Wind speed: " + weatherData.current.wind_speed.toFixed(0) + " mph")
        $("#humidity").text("Humidity: " + weatherData.current.humidity + "%");
        $("#uvIndex").text("UV Index: " + weatherData.current.uvi.toFixed(0));



        //updating forecast day1 div
        $("#forecasts").empty();
        for (var j = 1; j < 6; j++) {
            var forecastDiv = $('<div id="forecast" + j + class= "card card-content col s12 m12 l2 z-depth-4 light-blue darken-4 white-text flow-text forecastMargin"></div>');
            var readableDate = new Date(weatherData.daily[j].dt * 1000).toLocaleDateString("en-US");
            var date1 = $("<div>").text(readableDate).addClass("center-align");
            var icon1 = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + weatherData.daily[j].weather[0].icon + ".png");
            var temp1 = $("<p>").text("Temp: " + weatherData.daily[j].temp.max.toFixed(0) + "° F");
            var wind1 = $("<p>").text("Wind: " + weatherData.daily[j].wind_speed.toFixed(0) + " mph");
            var humidity1 = $("<p>").text("Humidity: " + weatherData.daily[j].humidity + "%");
            forecastDiv.append(date1, icon1, temp1, wind1, humidity1);
            $("#forecasts").append(forecastDiv);
        }

    }
}) //end of document.ready