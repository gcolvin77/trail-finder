$(document).ready(function () {

var date = localStorage.getItem("hikeDate")
var trail = localStorage.getItem("trailName")
var trailLat= localStorage.getItem("trailLat");      
var trailLong = localStorage.getItem("trailLong"); 
var trailImg = localStorage.getItem("trailImg"); 
var trailSummary =localStorage.getItem("trailSummary"); 
var trailLocation = localStorage.getItem("trailLocation");


console.log (trailLat);
console.log (trailLong);
console.log (trailImg);
console.log("trail name:" + trail);
$("#display-trail-name").html(trail); 
$("#trail-summary").html(trailSummary + "<br><br><img src=" + trailImg + " id= trailImage></img>");

showWeather(trailLat, trailLong, date);

 function showWeather(trailLat, trailLong, date){

    if (date != ""){
    var a = moment();
    var b = moment(date);
    var weatherDate = b.diff(a, 'days') + 1; 
    console.log(a);
    console.log("weatherDate: " + weatherDate); 
 } 
    else {weatherDate = 0;
        console.log("weatherDate: " + weatherDate); 
        date = "today"
    }
    if (weatherDate <= 15){
        var weatherQueryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + trailLat + 
        "&lon=" + trailLong + "&cnt=16&units=imperial&APPID=166a433c57516f51dfab1f7edaed8413";       

         $.ajax({
         url: weatherQueryURL,
         method: "GET"
          }).then(function (response) {        
              console.log(response);
             var high = parseInt(response.list[weatherDate].temp.max);
             var low = parseInt(response.list[weatherDate].temp.min);
             var wind = response.list[weatherDate].speed;
             var condition = response.list[weatherDate].weather[0].description;  
        
                 $("#trail-weather").html("Weather for " + date + ":<br> High Temp: " + high + " F<br> Low Temp: " + low +
                 " F<br> Wind Speed: " + wind  +  " MPH <br> Conditions: " + condition);
         });  //end .then function after AJAX call


         
    } //end if

        else {
        $("#trail-weather").html("Weather information not <br> available for " + date);
        }


        var formattedDate = moment(date).format('YYYY-MM-DD');
        
        var sunriseURL = "https://api.sunrise-sunset.org/json?lat=" + trailLat + "&lng=" + trailLong + "&date=" + formattedDate

        $.ajax({
            url: sunriseURL,
            method: "GET"
             }).then(function (response) { 
                var sunrise = response.results.sunrise;
                var sunset = response.results.sunset;

                $("#trail-sunrise").html("Sun information for " + date + ":<br>Sunrise: " + sunrise + "<br>Sunset: " + sunset);
                console.log(sunriseURL);
                console.log(response);

              }); //end sunrise ajax call

              
}  // end showWeather function

}); // end document ready
