//var query2 = "https://api.instagram.com/v1/locations/search?lat=32.058393699999&lng=-81.1000519&access_token=11365483.e029fea.400aa91f28dc4af2b06acdc6ad7dfd4f"
//
//$.ajax({
//    type: "GET",
//    url: query2
//}).done(function(result) {
//    //    console.log(result.data);
//})




// saved royce.js files

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


                //              console.log(pos);
                //  console.log("lat=" + pos.lat);
                //  console.log("lng=" + pos.lng);



                // stringify to change the value into a string
                var lat = "lat=" + pos.lat.toString(); {
                    //                   console.log(lat);
                    var lng = "lng=" + pos.lng.toString();
                    //                   console.log(lng);
                    var userInput = lat + "&" + lng;
                    //                   console.log(userInput);

                    // var latlng = pos.toString(); {

                    $("#latlng").val(lat + " & " + lng);


                    //  function calling Instagram locations/search API


                    $("#submit").on("click", function(getIGlocation) {


                        searchIGlocation(userInput);
                    });

                    // pulls array of objects containing ...
                    //  id: ""
                    //  latitude:
                    //  longitude:
                    //  name: ""


                    function searchIGlocation(userInput) {

                        $.ajax({
                                url: "https://api.instagram.com/v1/locations/search?" + userInput + "&access_token=11365483.e029fea.400aa91f28dc4af2b06acdc6ad7dfd4f",
                                type: 'GET',
                            })
                            .done(function(response) {
                                for (var i = 0; i < 6; i++) {
                                    response[i];
                                    console.log(response.data[i]);
                                    //       console.log(response.data[i].name);
                                    //       console.log(response.data[i].id);
                                    var boogers = response.data[i].name;
                                    //"chatham county"
                                    var snot = response.data[i].id;


                                    // dynamically create a button for each name of the top 10 objects with
                                    // Instagram ID info attached as a value(?)
                                    function createLocationButton() {
                                        $("#buttonPanel").html();
                                        // for (var i = 0; i < 14; i++) {
                                        boogers;
                                        $("<button>")
                                            .addClass("locationButton btn btn-success")
                                            .text(boogers)
                                            .attr('data-id', snot)
                                            .appendTo(".locationResults");

                                        // };
                                    };
                                    createLocationButton();
                                }

                            })


                    }


                    // create document click event to send the clicked button's associated Instagram ID to 
                    // the searchLocation(locationID) function. This will call the Instagram API to find
                    // photos taken at that specific location
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

$("#buttonPanel").on("click", ".locationButton", function(locationButtonClicked) {
    console.log($(this));

    var locationID = $(this).attr('data-id');
    console.log(locationID);


    searchLocationID(locationID);

    //              var IGid = data.[0].id;
    //                  searchLocationID(response);
    //                  console.log(IGid);

});


function searchLocationID(locationID) {

    $.ajax({
            url: "https://api.instagram.com/v1/locations/" + locationID + "/media/recent?access_token=11365483.e029fea.400aa91f28dc4af2b06acdc6ad7dfd4f",
            type: 'GET'
        })
        .done(function(result) {
            console.log(result.data);
            displayPhoto(result)
        });

    function displayPhoto(result) {
        console.log("I'm here");
        $(".photoResults").empty();
        for (var i = 0; i < result.data.length; i++) {
            var image = '<img src= "' + result.data[i].images.standard_resolution.url + '" />';
            console.log("img", image);   
            $(".photoResults").append(image);




    }
}
};

(function() {

  var streaming = false,
    video = document.querySelector('#video'),
    canvas = document.querySelector('#canvas'),
    buttoncontent = document.querySelector('#buttoncontent'),
    photo = document.querySelector('#photo'),
    startbutton = document.querySelector('#startbutton'),
    width = 320,
    height = 0;

  navigator.getMedia = (navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

  navigator.getMedia({
      video: true,
      audio: false
    },
    function(stream) {
      if (navigator.mozGetUserMedia) {
        video.mozSrcObject = stream;
      } else {
        var vendorURL = window.URL || window.webkitURL;
        video.src = vendorURL.createObjectURL(stream);
      }
      video.play();
    },
    function(err) {
      console.log("An error occured! " + err);
    }
  );

  video.addEventListener('canplay', function(ev) {
    if (!streaming) {
      height = video.videoHeight / (video.videoWidth / width);
      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;
    }
  }, false);

  function takepicture() {
    video.style.display = "none";
    canvas.style.display = "block";
    startbutton.innerText= "RETAKE";
    canvas.width = width;
    canvas.height = height;
    canvas.getContext('2d').drawImage(video, 0, 0, width, height);
    var data = canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
  }

  startbutton.addEventListener('click', function(ev) {
    if(startbutton.innerText==="CAPTURE")
    {
      takepicture();
    }
    else
    {
      video.style.display = "block";
      canvas.style.display = "none";
      startbutton.innerText= "CAPTURE";
    }
    ev.preventDefault();
  }, false);

})();



    // end Google geoLocation script
    //>>>>>>> ad9eb45a7f52c3b0a450fd298a262ba39a442d9a

