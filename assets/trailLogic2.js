$(document).ready(function () {

var date = localStorage.getItem("hikeDate")
var trail = localStorage.getItem("trailName")
var trailLat= localStorage.getItem("trailLat");      
var trailLong = localStorage.getItem("trailLong"); 
var trailImg = localStorage.getItem("trailImg"); 
var trailSummary =localStorage.getItem("trailSummary"); 
var trailLocation = localStorage.getItem("trailLocation");
var trailURL = localStorage.getItem("trailURL");
var formattedDate = "";

$("#display-trail-name").html(trail); 
$("#trail-summary").html(trailSummary + "<br><br><img src=" + trailImg + " id= trailImage></img>");
$("#trail-url").html("<a href=" + trailURL + " target=&quot_blank&quot>Click for more info</a>");
console.log(trailURL);


showWeather(trailLat, trailLong, date);

 function showWeather(trailLat, trailLong, date){

    if (date != ""){
    var a = moment();
    var b = moment(date);
    var weatherDate = b.diff(a, 'days') + 1;         
 
 } 
    else {
        weatherDate = 0;  //pulls today's weather info
        date = moment().format('MMM-DD-YYYY');
        
    }

    if (weatherDate <= 15){
        var weatherQueryURL = "https://api.openweathermap.org/data/2.5/forecast/daily?lat=" + trailLat + 
        "&lon=" + trailLong + "&cnt=16&units=imperial&APPID=166a433c57516f51dfab1f7edaed8413";       

         $.ajax({
         url: weatherQueryURL,
         method: "GET"
          }).then(function (response) {        
              
             var high = parseInt(response.list[weatherDate].temp.max);
             var low = parseInt(response.list[weatherDate].temp.min);
             var wind = response.list[weatherDate].speed;
             var condition = response.list[weatherDate].weather[0].description;  
        
                 $("#trail-weather").html("Weather for " + date + ":<br> High Temp: " + high + " F<br> Low Temp: " + low +
                 " F<br> Wind Speed: " + wind  +  " MPH <br> Conditions: " + condition);
         });  //end .then function after AJAX call
         
    } //end if

        else {
        $("#trail-weather").html("Weather information not <br> available for that day");
        }

         formattedDate = moment(date).format('YYYY-MM-DD');
        
        var sunriseURL = "https://api.sunrise-sunset.org/json?lat=" + trailLat + "&lng=" + trailLong + "&date=" + formattedDate

        $.ajax({
            url: sunriseURL,
            method: "GET"
             }).then(function (response) { 
                var sunrise = (response.results.sunrise);
                var sunset = (response.results.sunset);




                /* var sunrise =  */
                console.log(typeof sunrise);

                $("#trail-sunrise").html("Sun information for " + date + ":<br>Sunrise: " + sunrise + "<br>Sunset: " + sunset);
                
              }); //end sunrise ajax call

              
}  // end showWeather function

}); // end document ready
