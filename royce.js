"use strict"
//Google Reverse Geocoding

/*
*
* ON OPEN --> Access the phone/laptops's GPS coordinates through Google
	Trigger the Google Reverse Geocoding API to get specific address
*
*
*/

// Google maps = 
//Geolocation: Displaying User or Device Position on Maps
//website = https://developers.google.com/maps/documentation/javascript/geolocation
//key = AIzaSyA8Y41a6WTxCA3BOtxGkpjIZJXd7Rg6sug

//>>>>>>> b7e4063169a3d75a5be41d517a8371a5a507802e

// Geolocation API Specification 2nd Edition
// https://www.w3.org/TR/geolocation-API/



// Google GEOLOCATION script
var map;
var infoWindow;
var pos;
var lat;
var lng;

function initMap() {



    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
                var pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };


                console.log(pos);
                //  console.log("lat=" + pos.lat);
                //  console.log("lng=" + pos.lng);



                // stringify to change the value into a string
                var lat = "lat=" + pos.lat.toString(); {
                    console.log(lat);
                    var lng = "lng=" + pos.lng.toString();
                    console.log(lng);
                    var userInput = lat + "&" + lng;
                    console.log(userInput);

                    // var latlng = pos.toString(); {

                    $("#latlng").val(lat + " & " + lng);


                    //  function calling Instagram locations/search API

                $("#submit").on("click", function(getIGlocation) {


        //            var userInput = $(this).text();
                    searchIGlocation(userInput);
                });


                function searchIGlocation(lat, lng) {
      
                    $.ajax({
                            url: "https://api.instagram.com/v1/locations/search?" + userInput + "&access_token=11365483.e029fea.400aa91f28dc4af2b06acdc6ad7dfd4f",
                            type: 'GET',
                        })
                        .done(function(response) {
               //            console.log(response);
                            searchLocationID(response);
                        })
                }
            

    function searchLocationID(response) {
      
                    $.ajax({
                            url: "https://api.instagram.com/v1/locations/{location-id}?access_token=11365483.e029fea.400aa91f28dc4af2b06acdc6ad7dfd4f",
                            type: 'GET',
                        })
                        .done(function(result) {
                           console.log(result.data);
        //                    displayGif(response);
                        })
                }







                };

                infoWindow.setPosition(pos);
                infoWindow.setContent('Location found.');
                infoWindow.open(map);
                map.setCenter(pos);
            },
            function() {
                handleLocationError(true, infoWindow, map.getCenter());
            });

    } else {
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }
};

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
};

// end Google geoLocation script
