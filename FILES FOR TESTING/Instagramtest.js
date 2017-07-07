var query2 = "https://api.instagram.com/v1/locations/search?lat=32.058393699999&lng=-81.1000519&access_token=11365483.e029fea.400aa91f28dc4af2b06acdc6ad7dfd4f"

$.ajax({
    type: "GET",
    url: query2
}).done(function(result) {
    console.log(result.data);
})

