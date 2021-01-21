$(document).ready(function () {

    

    city = "";
    // Click function to capture the city input
    $("#searchBtn").click(function (event) {
        event.preventDefault();
        

        city = $("#search").val().trim();
        // Conditional to ensure user enters text before click
        if (city != '') {

            // Original api call to get lat and lon
            $.ajax({
                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=imperial" + "&APPID=f21ee75183114c7c096d92749641d1f4",
                type: "GET",
                dataType: "jsonp",
            })
                .then(function (response) {
                    let lat = (response.coord.lat)
                    let lon = (response.coord.lon)

                    // Second api call to OneCall with lat and lon values       
                    $.ajax({
                        url: 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + "&lon=" + lon + "&units=imperial" + "&appid=f21ee75183114c7c096d92749641d1f4",
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
    function updatePage(weatherData) {
        console.log(weatherData);
        console.log(city);

        // updating current weather panel
        $("#cityName").append("Current weather for " + city);
        var icon = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + weatherData.current.weather[0].icon + '@2x.png')
        $("#currentIcon").append(icon);
        $("#currentTemp").append("Temperature: " + weatherData.current.temp.toFixed(0) + "° fahrenheit");
        $("#windSpeed").append("Wind speed: " + weatherData.current.wind_speed.toFixed(0) + " mph")
        $("#humidity").append("Humidity: " + weatherData.current.humidity + "%");
        $("#uvIndex").append("UV Index: " + weatherData.current.uvi.toFixed(0));


        

        //forecast day1
        var readableDate = new Date(weatherData.daily[1].dt *1000).toLocaleDateString("en-US");
        var date1 = $("<h6>").append(readableDate);
        var icon1 = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + weatherData.daily[1].weather[0].icon + '@2x.png')
        var temp1 = $("<div>").append("Temp: " + weatherData.daily[1].temp.max.toFixed(0) + "° f");
        var wind1 = $("<div>").append("Wind: " + weatherData.daily[1].wind_speed.toFixed(0) + " mph");
        var humidity1 = $("<div>").append("Humidity: " + weatherData.daily[1].humidity + "%");
        $("#forecast1").append(icon1, date1, temp1, wind1, humidity1);
        $("#forecast1").addClass("col s12 m12 l2 offset-s1 col-content z-depth-4 card-panel light-blue darken-4 card-content white-text")

        //forecast day2
        var readableDate = new Date(weatherData.daily[2].dt *1000).toLocaleDateString("en-US");var temp = $("<div>").append("Temp: " + weatherData.daily[2].temp.max.toFixed(0) + "° f");
        var date2 = $("<h6>").append(readableDate);
        var icon2 = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + weatherData.daily[2].weather[0].icon + '@2x.png')
        var temp2 = $("<div>").append("Temp: " + weatherData.daily[2].temp.max.toFixed(0) + "° f");
        var wind2 = $("<div>").append("Wind: " + weatherData.daily[2].wind_speed.toFixed(0) + " mph");
        var humidity2 = $("<div>").append("Humidity: " + weatherData.daily[2].humidity + "%");
        $("#forecast2").append(icon2, date2, temp2, wind2, humidity2);
        $("#forecast2").addClass("col s12 m12 l2 offset-s2 col-content z-depth-4 card light-blue darken-4 card-content white-text")

        //forecast day3
        var readableDate = new Date(weatherData.daily[3].dt *1000).toLocaleDateString("en-US");var temp = $("<div>").append("Temp: " + weatherData.daily[2].temp.max.toFixed(0) + "° f");
        var date3 = $("<h6>").append(readableDate);
        var icon3 = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + weatherData.daily[3].weather[0].icon + '@2x.png')
        var temp3 = $("<div>").append("Temp: " + weatherData.daily[3].temp.max.toFixed(0) + "° f");
        var wind3 = $("<div>").append("Wind: " + weatherData.daily[3].wind_speed.toFixed(0) + " mph");
        var humidity3 = $("<div>").append("Humidity: " + weatherData.daily[3].humidity + "%");
        $("#forecast3").append(icon3, date3, temp3, wind3, humidity3);
        $("#forecast3").addClass("col s12 m12 l2 offset-s2 col-content z-depth-4 card light-blue darken-4 card-content white-text")

        //forecast day4
        var readableDate = new Date(weatherData.daily[4].dt *1000).toLocaleDateString("en-US");var temp = $("<div>").append("Temp: " + weatherData.daily[2].temp.max.toFixed(0) + "° f");
        var date4 = $("<h6>").append(readableDate);
        var icon4 = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + weatherData.daily[4].weather[0].icon + '@2x.png')
        var temp4 = $("<div>").append("Temp: " + weatherData.daily[4].temp.max.toFixed(0) + "° f");
        var wind4 = $("<div>").append("Wind: " + weatherData.daily[4].wind_speed.toFixed(0) + " mph");
        var humidity4 = $("<div>").append("Humidity: " + weatherData.daily[4].humidity + "%");
        $("#forecast4").append(icon4, date4, temp4, wind4, humidity4);
        $("#forecast4").addClass("col s12 m12 l2 offset-s2 col-content z-depth-4 card light-blue darken-4 card-content white-text")

        //forecast day5
        var readableDate = new Date(weatherData.daily[5].dt *1000).toLocaleDateString("en-US");var temp = $("<div>").append("Temp: " + weatherData.daily[2].temp.max.toFixed(0) + "° f");
        var date5 = $("<h6>").append(readableDate);
        var icon5 = $("<img>").attr('src', 'http://openweathermap.org/img/wn/' + weatherData.daily[5].weather[0].icon + '@2x.png')
        var temp5 = $("<div>").append("Temp: " + weatherData.daily[5].temp.max.toFixed(0) + "° f");
        var wind5 = $("<div>").append("Wind: " + weatherData.daily[5].wind_speed.toFixed(0) + " mph");
        var humidity5 = $("<div>").append("Humidity: " + weatherData.daily[5].humidity + "%");
        $("#forecast5").append(icon5, date5, temp5, wind5, humidity5);
        $("#forecast5").addClass("col s12 m12 l2 offset-s2 col-content z-depth-4 card light-blue darken-4 card-content white-text")

    }
}) //end of document.ready