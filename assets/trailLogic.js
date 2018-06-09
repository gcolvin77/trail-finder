$(document).ready(function () {

});

var longtitude;
var latitude;
var inputRadius;
var inputResults;


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
        alert("Please enter a location");
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


        // console.log(inputZip);
        // console.log(inputRadius);

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

function trailTest() {
    //clear div
    //event.preventDefault();
    inputRadius = $(".radius-input").val().trim();
    if (inputRadius === "") {
        inpurRadius = 30;
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
        var trailID = "";
        $(".trail-results").empty();
        for (i = 0; i < response.trails.length; i++) {
            trailName = response.trails[i].name;
            trailLocation = response.trails[i].location;
            trailLength = response.trails[i].length;
            trailAscent = response.trails[i].ascent;
            trailStars = response.trails[i].stars;
            trailDifficulty = response.trails[i].difficulty;
            trailID = response.trails[i].id

            $(".trail-results").append("<tr><td>" + trailName + "</td><td>" + trailLocation + "</td><td>" + trailLength + "</td><td>" + trailAscent + "</td><td>" + trailStars + "</td><td>" + trailDifficulty + "</td><td>" + "<button class= new-trail-id ID=" + trailID + ">View Trail</button>" + "</td></tr>");
        };

    })
};

//function to open new window for specific trail
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
        trailURL=response.trails[0].url;
        console.log(trailURL);
    });
};


//call search function on click of submit button
$(document).on("click", ".search", zipCode);

//call search function on click of submit button
$(document).on("click", ".new-trail-id", newTrail);


