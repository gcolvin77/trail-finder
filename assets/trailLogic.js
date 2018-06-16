// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyBgFsP0ttl-Cm_uFIFBjPuBZQfxW7O7uOA",
    authDomain: "hikingproject-33.firebaseapp.com",
    databaseURL: "https://hikingproject-33.firebaseio.com",
    projectId: "hikingproject-33",
    storageBucket: "hikingproject-33.appspot.com",
    messagingSenderId: "970307116122"
};

firebase.initializeApp(config);

var database = firebase.database();


$(document).ready(function () {



var longtitude;
var latitude;
var inputRadius;
var inputResults;
var yourName;
var username;
var trailGoal;
var trailFavorite;


        // Get the modal
        var modal = document.getElementById('locationModal');

        // Get the button that opens the modal
        var btn = document.getElementById("findBtn");
        
        // Get the <span> element that closes the modal
        var span = document.getElementsByClassName("close")[0];


function zipCode() {
    event.preventDefault();
    var inputCity = $(".city-input").val().trim();
    var outputCity = "";
    if (inputCity != "") {
        outputCity = inputCity + ", ";
    };
    var inputState = $(".state-input").val().trim();
    var outputState = "";
    if (inputState != "") {
        outputState = inputState + " ";
    };
    var inputZip = $(".zip-input").val().trim();
    var outputZip = "";
    if (inputZip != "") {
        outputZip = inputZip;
    };
    var inputCombined = "";
    var outputCombined = "";
    var finalOutput = "";

    //logic for input
    //if location is empty then display an alert
    if (inputCity === "" && inputState === "" && inputZip === "") {
        $('#exampleModal').modal('show');


        //runs code if location is not empty
    } else {
        inputCombined = (outputCity + outputState + outputZip).trim();
        outputCombined = inputCombined.split(" ");
        for (i = 0; i < outputCombined.length; i++) {
            console.log(outputCombined[i]);
            finalOutput = finalOutput + outputCombined[i];
            if (i < outputCombined.length - 1) {
                finalOutput = finalOutput + "+";
            }
        };


        var queryURL = "https://maps.googleapis.com/maps/api/geocode/json?address=" + finalOutput + "&key=" + APIKeys.google

        // Creating an AJAX call
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            // if location returns more than 1 location, then does not run call
            if (response.results.length > 1) {
                alert("Please enter a valid location");
            } else {
                latitude = response.results[0].geometry.location.lat;
                longitude = response.results[0].geometry.location.lng;
                console.log("lattitude: " + response.results[0].geometry.location.lat);
                console.log("longitude: " + response.results[0].geometry.location.lng);
                console.log("location: " + response.results[0].formatted_address);
                trailTest();
            }
        })
    };
    //empties form after call
    $(".city-input").val("");
    $(".state-input").val("");
    $(".zip-input").val("");
    $(".radius-input").val("");
    $(".results-input").val("");
    
};

//gets the longitude and lattitude for the zip you entered 
function trailTest() {
    //clear div
    //event.preventDefault();
    inputRadius = $(".radius-input").val().trim();
    if (inputRadius === "") {
        inputRadius = 30;
    }
    inputResults = $(".results-input").val().trim();
    if (inputResults === "") {
        inputResults = 10;
    } else if (inputResults > 500) {
        inputResults = 500;
    }

    var queryURL = "https://www.hikingproject.com/data/get-trails?lat=" + latitude + "&lon=" + longitude + "&maxDistance=" + inputRadius + "&maxResults=" + inputResults + "&key=" + APIKeys.hiking

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.trails.length);
        console.log("longitude: " + longitude);
        console.log("latitude: " + latitude);

        var trailName = "";
        var trailLocation = "";
        var trailAscent = "";
        var trailLength = "";
        var trailStars = "";
        var trailDifficulty = "";
        var simpleTrailDifficulty = "";
        var trailID = "";
        $(".trail-results").empty();
        for (i = 0; i < response.trails.length; i++) {
            trailName = response.trails[i].name;
            trailLocation = response.trails[i].location;
            trailLength = response.trails[i].length;
            trailAscent = response.trails[i].ascent;
            trailStars = response.trails[i].stars;
            trailDifficulty = response.trails[i].difficulty;
            //logic to change difficulty from api to simple ratings

            if (trailDifficulty === "Green") {
                simpleTrailDifficutly = "Very Easy";
            } else if (trailDifficulty === "greenBlue") {
                simpleTrailDifficutly = "Easy";
            } else if (trailDifficulty === "Blue") {
                simpleTrailDifficutly = "Moderate";
            } else if (trailDifficulty === "blueBlack") {
                simpleTrailDifficutly = "Somewhat Hard";
            } else if (trailDifficulty === "Black") {
                simpleTrailDifficutly = "Hard";
            } else if (trailDifficulty === "dblack") {
                simpleTrailDifficutly = "Very Hard";
            } else {
                //     simpleTrailDifficulty="Unknown";
                // };
                
            };
            trailLat = response.trails[i].latitude;
            trailLong = response.trails[i].longitude;
            trailIMG = response.trails[i].imgMedium;
            trailSummary = response.trails[i].summary;
            trailURL = response.trails[i].url;

            $(".trail-results").append("<tr><td>" + trailName + "</td><td>" + trailLocation + "</td><td>" + trailLength +
             "</td><td>" + trailAscent + "</td><td>" + trailStars + "</td><td>" + simpleTrailDifficutly + "</td><td>" +
              "<button class= new-trail-id id= button" + i + ">View Trail</button>" + "</td></tr>");
            $("#button" + i).data("newTrailName", trailName);  
            $("#button" + i).data("newTrailLocation", trailLocation); 
            $("#button" + i).data("newTrailLat", trailLat); 
            $("#button" + i).data("newTrailLong", trailLong); 
            $("#button" + i).data("newTrailImage", trailIMG); 
            $("#button" + i).data("newTrailSummary", trailSummary);  
            $("#button" + i).data("newTrailURL", trailURL); 

             
        };

    })
};


//call search function on click of submit button
$(document).on("click", ".search", zipCode);

//call search function on click of submit button
$(document).on("click", ".new-trail-id", function(){

        var newDate = $("#datepicker").val().trim();
        var newTrailName = $(this).data("newTrailName"); 
        var newTrailLat = $(this).data("newTrailLat");
        var newTrailLong = $(this).data("newTrailLong");
        var newTrailLocation = $(this).data("newTrailLocation");
        var newTrailImage = $(this).data("newTrailImage");
        var newTrailSummary = $(this).data("newTrailSummary");
        var newTrailURL = $(this).data("newTrailURL");
        
        localStorage.setItem("hikeDate", newDate);
        localStorage.setItem("trailName", newTrailName); 
        localStorage.setItem("trailLat", newTrailLat);      
        localStorage.setItem("trailLong", newTrailLong); 
        localStorage.setItem("trailImg", newTrailImage); 
        localStorage.setItem("trailSummary", newTrailSummary); 
        localStorage.setItem("trailLocation", newTrailLocation); 
        localStorage.setItem("trailURL", newTrailURL);

        window.open("trail.html", "_blank"); 

});



//creating a username ?
$(document).on("click", ".name-button", function () {
    event.preventDefault();
    yourName = $(".user-name").val().trim();


    //    database.ref("/users").push(user)
    if (typeof (Storage) !== "undefined") {
        // Store
        localStorage.setItem("user", yourName);
        //console.log(yourName);
        // Retrieve

        username = localStorage.getItem("user")
        console.log(username);
        if (username === "") {
            alert("no user selected");
        } else {
            loadFavorites();
        };
    };
});



$(document).on("click", ".favorite", loadFavorites);
//function to load favorites of user
function loadFavorites() {


    database.ref().on("child_added", function (childSnapshot, prevChildKey) {
        //create variables for result
        var trailName = "";
        var trailLocation = "";
        var trailAscent = "";
        var trailLength = "";
        var trailStars = "";
        var trailDifficulty = "";
        var simpleTrailDifficulty = "";
        var trailID = "";
        $(".myfavoritetrails").empty();
        //output database to test
        console.log(childSnapshot.val());

        var favoriteTrail = Object.values(childSnapshot.val())
        
        
            for (i = 0; i < favoriteTrail.length; i++) {
                if (username.toUpperCase() === favoriteTrail[i].name.toUpperCase()) {
                    var queryURL = "https://www.hikingproject.com/data/get-trails-by-id?ids=" + favoriteTrail[i].favorites + "&key=" + APIKeys.hiking;

                    // Creating an AJAX call for the specific trail button being clicked
                    $.ajax({
                        url: queryURL,
                        method: "GET"
                    }).then(function (response) {
                        //console.log(response)
                        //console.log(response.trails[0].id)
                        trailName = response.trails[0].name;
                        trailLocation = response.trails[0].location;
                        trailAscent = response.trails[0].ascent;
                        trailLength = response.trails[0].length;
                        trailStars = response.trails[0].stars;
                        trailDifficulty = response.trails[0].difficulty;
                        //logic to change difficulty from api to simple ratings

                        if (trailDifficulty === "Green") {
                            simpleTrailDifficutly = "Very Easy";
                        } else if (trailDifficulty === "greenBlue") {
                            simpleTrailDifficutly = "Easy";
                        } else if (trailDifficulty === "Blue") {
                            simpleTrailDifficutly = "Moderate";
                        } else if (trailDifficulty === "blueBlack") {
                            simpleTrailDifficutly = "Somewhat Hard";
                        } else if (trailDifficulty === "Black") {
                            simpleTrailDifficutly = "Hard";
                        } else if (trailDifficulty === "dblack") {
                            simpleTrailDifficutly = "Very Hard";
                        } else {
                            //     simpleTrailDifficulty="Unknown";
                            // };
                        };
                        trailID = response.trails[0].id

                        $(".myfavoritetrails").append("<tr><td>" + trailName + "</td><td>" + trailLocation + "</td><td>" + trailLength + "</td><td>" + trailAscent + "</td><td>" + trailStars + "</td><td>" + simpleTrailDifficutly + "</td><td>" + "<a href='trail.html'><button  class= new-trail-id ID= " + trailID + ">View Trail</button> </a>" + "</td></tr>");

                    });

                };


            };
        


    });
};



}); // end document ready


