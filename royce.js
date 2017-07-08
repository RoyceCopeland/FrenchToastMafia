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




                var lat = "lat=" + pos.lat.toString(); {
                    console.log(lat);
                    var lng = "lng=" + pos.lng.toString();
                    console.log(lng);


                    //         var latlng = pos.toString(); {

                    $("#latlng").val(lat + ", " + lng);
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


// begin Google Reverse Geeocoding script

//function initMap() {
//    var map = new google.maps.Map(document.getElementById('map'), {
//        zoom: 8,
//        center: { lat: 40.731, lng: -73.997 }
//    });
//    var geocoder = new google.maps.Geocoder;
//    var infowindow = new google.maps.InfoWindow;
//
//    document.getElementById('submit').addEventListener('click', function() {
//        geocodeLatLng(geocoder, map, infowindow);
//    });
//}
//
//function geocodeLatLng(geocoder, map, infowindow) {
//    var input = document.getElementById('latlng').value;
//    var latlngStr = input.split(',', 2);
//    var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
//    geocoder.geocode({ 'location': latlng }, function(results, status) {
//        if (status === 'OK') {
//            if (results[1]) {
//                map.setZoom(11);
//                var marker = new google.maps.Marker({
//                    position: latlng,
//                    map: map
//                });
//                infowindow.setContent(results[1].formatted_address);
//                infowindow.open(map, marker);
//            } else {
//                window.alert('No results found');
//            }
//        } else {
//            window.alert('Geocoder failed due to: ' + status);
//        }
//    });
//}

// end Google Reverse Geocoding script
