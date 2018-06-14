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

});

var longtitude;
var latitude;
var inputRadius;
var inputResults;

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


        console.log("input: " + inputCombined);
        console.log("output: " + outputCombined);
        console.log("final output: " + finalOutput);


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

    // Creating an AJAX call for the specific movie button being clicked
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
                console.log("TD: " + trailDifficulty);
                console.log("SD: " + simpleTrailDifficutly);
            };
            trailID = response.trails[i].id

            $(".trail-results").append("<tr><td>" + trailName + "</td><td>" + trailLocation + "</td><td>" + trailLength + "</td><td>" + trailAscent + "</td><td>" + trailStars + "</td><td>" + simpleTrailDifficutly + "</td><td>" + "<a href='trail.html' class='new-trail-id' ID= " + trailID + ">View Trail</div> </a>" + "</td></tr>");
        };

    })
};
// $(document).on("click", ".new-trail-id", function(event){
//     event.preventDefault();
// })


//ajax call for when you view details of the trail you clicked on
function newTrail() {
    var currBtn = $(this).attr('ID');
    //alert(currBtn);
    var queryURL = "https://www.hikingproject.com/data/get-trails-by-id?ids=" + currBtn + "&key=" + APIKeys.hiking;

    // Creating an AJAX call for the specific trail button being clicked
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        trailURL = response.trails[0].url;
        console.log(trailURL);
    });

};


//call search function on click of submit button
$(document).on("click", ".search", zipCode);

//call search function on click of submit button
$(document).on("click", ".new-trail-id", newTrail);

//creating a username ?
$(document).on("click", ".name-button", function(){
    event.preventDefault();
    var yourName =$(".user-name").val()
    console.log(yourName);
    var user = {
        name: yourName,
        favorites: "",
        goal: "",
       };
       database.ref("/users").push(user)
});

