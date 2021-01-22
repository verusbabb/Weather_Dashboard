$(document).ready(function () {

    // a few required global vars
    var city="";
    var queryURL="";
    var cityHistory = [];

    // Retrieve any existing local storage
    init();
        function init() {
            var storedCities = JSON.parse(localStorage.getItem("recentSearches"));
            if (storedCities !== null) {
                cityHistory = storedCities;
            }
            console.log(cityHistory);
        }


    // Click function to capture the city input
    $("#searchBtn").click(function (event) {
        event.preventDefault();
        
        city = $("#search").val().trim();

        // Conditional to ensure user enters text before click
        if (city != '') {
            city = city.charAt(0).toUpperCase() + city.slice(1);

            // Original api call to get lat and lon
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&APPID=f21ee75183114c7c096d92749641d1f4",
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

    // Updating page with response data from API
    function updatePage(weatherData) {
        
        // Creating an object to store city and its queryURL
        var cityHistoryObject = { searchedCity: city, searchURL: queryURL };
        
        cityHistory.push(cityHistoryObject);
        console.log(cityHistory)
        localStorage.setItem("recentSearches", JSON.stringify(cityHistory));
        console.log(cityHistory.length);
        console.log(cityHistory[0].searchURL, cityHistory[0].searchedCity);

        
        // writing recent search to search history
        // for (var 1=0; i<cityHistory.length; i++) {
            var oldSearch = $("<a>").attr("href", "")
            console.log(oldSearch);
            oldSearch.append(cityHistory[0].searchedCity).addClass("white-text searchHistory");
            $("#myHistory").append(oldSearch);
        // }

        // updating current weather panel
        $("#cityName").append("Current weather for " + city + ":");
        var icon = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + weatherData.current.weather[0].icon + '@2x.png')
        $("#currentIcon").append(icon);
        $("#currentTemp").append("Temperature: " + weatherData.current.temp.toFixed(0) + "° fahrenheit");
        $("#windSpeed").append("Wind speed: " + weatherData.current.wind_speed.toFixed(0) + " mph")
        $("#humidity").append("Humidity: " + weatherData.current.humidity + "%");
        $("#uvIndex").append("UV Index: " + weatherData.current.uvi.toFixed(0));


        

        //updating forecast day1 div
        var readableDate = new Date(weatherData.daily[1].dt *1000).toLocaleDateString("en-US");
        var date1 = $("<h6>").append(readableDate).addClass("center-align");;
        var icon1 = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + weatherData.daily[1].weather[0].icon + ".png")
        var temp1 = $("<p>").append("Temp: " + weatherData.daily[1].temp.max.toFixed(0) + "° F");
        var wind1 = $("<p>").append("Wind: " + weatherData.daily[1].wind_speed.toFixed(0) + " mph");
        var humidity1 = $("<p>").append("Humidity: " + weatherData.daily[1].humidity + "%");
        $("#forecast1").append(date1, icon1, temp1, wind1, humidity1);

        //forecast day2
        var readableDate = new Date(weatherData.daily[2].dt *1000).toLocaleDateString("en-US");
        var date2 = $("<h6>").append(readableDate).addClass("center-align");;
        var icon2 = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + weatherData.daily[2].weather[0].icon + '.png')
        var temp2 = $("<p>").append("Temp: " + weatherData.daily[2].temp.max.toFixed(0) + "° F");
        var wind2 = $("<p>").append("Wind: " + weatherData.daily[2].wind_speed.toFixed(0) + " mph");
        var humidity2 = $("<p>").append("Humidity: " + weatherData.daily[2].humidity + "%");
        $("#forecast2").append(date2, icon2, temp2, wind2, humidity2);

        //forecast day3
        var readableDate = new Date(weatherData.daily[3].dt *1000).toLocaleDateString("en-US");var temp = $("<div>").append("Temp: " + weatherData.daily[2].temp.max.toFixed(0) + "° f");
        var date3 = $("<h6>").append(readableDate).addClass("center-align");;
        var icon3 = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + weatherData.daily[3].weather[0].icon + '.png')
        var temp3 = $("<p>").append("Temp: " + weatherData.daily[3].temp.max.toFixed(0) + "° F");
        var wind3 = $("<p>").append("Wind: " + weatherData.daily[3].wind_speed.toFixed(0) + " mph");
        var humidity3 = $("<p>").append("Humidity: " + weatherData.daily[3].humidity + "%");
        $("#forecast3").append(date3, icon3, temp3, wind3, humidity3);

        //forecast day4
        var readableDate = new Date(weatherData.daily[4].dt *1000).toLocaleDateString("en-US");var temp = $("<div>").append("Temp: " + weatherData.daily[2].temp.max.toFixed(0) + "° f");
        var date4 = $("<h6>").append(readableDate).addClass("center-align");
        var icon4 = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + weatherData.daily[4].weather[0].icon + '.png').addClass("center-align");
        var temp4 = $("<p>").append("Temp: " + weatherData.daily[4].temp.max.toFixed(0) + "° F");
        var wind4 = $("<p>").append("Wind: " + weatherData.daily[4].wind_speed.toFixed(0) + " mph");
        var humidity4 = $("<p>").append("Humidity: " + weatherData.daily[4].humidity + "%");
        $("#forecast4").append(date4, icon4, temp4, wind4, humidity4);

        //forecast day5
        var readableDate = new Date(weatherData.daily[5].dt *1000).toLocaleDateString("en-US");var temp = $("<div>").append("Temp: " + weatherData.daily[2].temp.max.toFixed(0) + "° f");
        var date5 = $("<h6>").append(readableDate).addClass("center-align");;
        var icon5 = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + weatherData.daily[5].weather[0].icon + '.png');
        var temp5 = $("<p>").append("Temp: " + weatherData.daily[5].temp.max.toFixed(0) + "° F");
        var wind5 = $("<p>").append("Wind: " + weatherData.daily[5].wind_speed.toFixed(0) + " mph");
        var humidity5 = $("<p>").append("Humidity: " + weatherData.daily[5].humidity + "%");
        $("#forecast5").append(date5, icon5, temp5, wind5, humidity5);

    }
}) //end of document.ready