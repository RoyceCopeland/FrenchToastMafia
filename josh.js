/*
* Instagram API Key 20041f9820ae4344ab6d672b4abc9721
*/

/*ACCESS TOKEN = 11365483.e029fea.400aa91f28dc4af2b06acdc6ad7dfd4f
* USER ID = 11365483
*/

/*Get LOCATION / Search for a location by geographic coordinate.

https://api.instagram.com/v1/locations/search?lat=48.858844&lng=2.294351&access_token=ACCESS-TOKEN
*/



/*Instajam is a JavaScript wrapper for the Instagram API. You provide the access token, we provide the jam. (And Instagram provides the gram. Or the pictures. Or... whatever.)
https://github.com/mikefowler/instajam
*/

// Initialize
API = Instajam.init({
    clientId: '<CLIENT ID>',
    redirectUri: '<REDIRECT URI>',
    scope: ['basic', 'comments']
});

// Get the profile of the authenticated user.
API.user.self.profile(function(response) {
    console.log('Hey there, ' + response.data.full_name);
});


/*GET/locations/search = https://www.instagram.com/developer/endpoints/locations/
https://api.instagram.com/v1/locations/search?lat=48.858844&lng=2.294351&access_token=11365483.e029fea.400aa91f28dc4af2b06acdc6ad7dfd4f
*/



$(document).on('click', '.results', function() {

            var igSearch = $(this).html();


            var queryURL = "https://api.instagram.com/v1/locations/search?q=" + igSearch + "&api_key=5c71d8a3ce494d76a335c4172e55f742";

            $.ajax({ url: queryURL, method: 'GET' })
                .done(function(response) {
                    /* grabs the data */
                     
                    var results = response.data;

                    /* empties the div before adding more gifs */
                     
                    $('#failView').empty();
                    /* loops through the data */
                     
                    for (var j = 0; j < results.length; j++) {
                        var imageDiv = $('<div>');
                        var imageView = results[j].images.fixed_height.url;
                        var still = results[j].images.fixed_height_still.url;

                        var failImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                        failImage.attr('data-state', 'still');
                        $('#failView').prepend(failImage);
                        failImage.on('click', playGif);







