/*
* Instagram API Key 20041f9820ae4344ab6d672b4abc9721
*/

/*Get LOCATION / Search for a location by geographic coordinate.

https://api.instagram.com/v1/locations/search?lat=48.858844&lng=2.294351&access_token=ACCESS-TOKEN
*/


{
    "data": [{
        "id": "788029",
        "latitude": 48.858844300000001,
        "longitude": 2.2943506,
        "name": "Eiffel Tower, Paris"
    },
    {
        "id": "545331",
        "latitude": 48.858334059662262,
        "longitude": 2.2943401336669909,
        "name": "Restaurant 58 Tour Eiffel"
    },
    {
        "id": "421930",
        "latitude": 48.858325999999998,
        "longitude": 2.294505,
        "name": "American Library in Paris"
    }]
}


/*ACCESS TOKEN = 11365483.e029fea.400aa91f28dc4af2b06acdc6ad7dfd4f
* USER ID = 11365483
*
*/


<?php
if(!empty($_POST['location'])){
	
	$access_token = "51---3e";
	
	$map_url = 'https://maps.googleapis.com/maps/api/geocode/json?address='.urlencode($_POST['location']);
	
	$map_json = file_get_contents($map_url);
	$map_array = json_decode($map_json,true);
	
	$lat = $map_array['results'][0]['geometry']['location']['lat'];
	$lng = $map_array['results'][0]['geometry']['location']['lng'];
	
	$instagram_url = "https://api.instagram.com/v1/media/search?lat=".$lat."&lng=".$lng."&access_token=".$access_token;

    $instagram_json = file_get_contents($instagram_url);

    $instagram_array = json_decode($instagram_json,true);
	
}

?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title>InstaLocator</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>

<div class="jumbotron text-center">
  <h1>Instagram Location Image Searcher</h1>
</div>
  
<div class="container">
	<div class="row">
		<div class="col-md-8 col-md-offset-2">
			<form action="" method="POST">
			  <div class="form-group">
				<label for="location">Location Name</label>
				<input type="test" class="form-control" name="location" value="<?php if(!empty($_POST['location']))echo $_POST['location'];?>">
			  </div>
			  <button type="submit" class="btn btn-primary btn-block">SEARCH</button>
			</form>
        </div>
    </div>
	<p>&nbsp;</p>
	<div class="row">
	    
	    <?php
		if(!empty($instagram_array))
		{   ?>
			
			    
					<div class="col-md-8 col-md-offset-2">
					<h2 style="text-align:center;">Location : <?php echo $_POST['location']; ?></h2>
					<p>&nbsp;</p>
					<?php 
					foreach($instagram_array['data'] as $image)
			        {?>
					    <div class="well">
						<img class="img-responsive" style="padding-left:40px;" src="<?php echo $image['images']['standard_resolution']['url'] ?>" alt="Instagram Photos">
						<p>&nbsp;</p>
						</div>
					  <?php
						}
					}
					?>	
					</div>
			    

    </div>
</div>

</body>
</html>

/*Retrieving image data = https://www.ibm.com/developerworks/xml/library/x-instagram1/index.html#retrievedetails
*/

<html>
  <head>
    <style>
    #container {
      margin: 0 auto;    
    }
    #info {
      float: left; 
      width: 300px;
      padding-right: 20px;
    }
    #image {
      float: left; 
      width: 320px;
      padding-right: 20px;
    }    
    #comments {
      clear: both;
    }
    .item {
      float:none;
      clear:both;
      margin-top:1em;  
    }
    .profile {
      float:left;
      margin-right:1em; 
      padding-bottom: 10px;
      height: 48px;
      width: 48px;
    }
    </style>
  </head>
  <body>  
    <h1>Instagram Image Detail</h1>
    <?php
    // load Zend classes
    require_once 'Zend/Loader.php';
    Zend_Loader::loadClass('Zend_Http_Client');
 
    // define consumer key and secret
    // available from Instagram API console
    $CLIENT_ID = 'YOUR-CLIENT-ID';
    $CLIENT_SECRET = 'YOUR-CLIENT-SECRET';
 
    try {
      // define image id
      $image = '338314508721867526';
     
      // initialize client
      $client = new Zend_Http_Client('https://api.instagram.com/v1/media/' . $image);
      $client->setParameterGet('client_id', $CLIENT_ID);
 
      // get image metadata
      $response = $client->request();
      $result = json_decode($response->getBody());
       
      // display image data
    ?>
      <div id="container">
        <div id="info">
          <h2>Meta</h2>  
          <strong>Date: </strong> 
          <?php echo date('d M Y h:i:s', $result->data->created_time); ?>
          <br/>
          <strong>Creator: </strong>
          <?php echo $result->data->user->username; ?>
          (<?php echo !empty($result->data->user->full_name) ? 
            $result->data->user->full_name : 'Not specified'; ?>)
          <br/>
          <strong>Location: </strong>
          <?php echo !is_null($result->data->location) ?
          $result->data->location->latitude . ',' . 
            $result->data->location->longitude : 'Not specified'; ?>
          <br/>
          <strong>Filter: </strong>
          <?php echo $result->data->filter; ?>
          <br/>
          <strong>Comments: </strong>
          <?php echo $result->data->comments->count; ?>
          <br/>
          <strong>Likes: </strong>
          <?php echo $result->data->likes->count; ?>
          <br/>
          <strong>Resolution: </strong>
          <a href="<?php echo $result->data->images
            ->standard_resolution->url; ?>">Standard</a> | 
          <a href="<?php echo $result->data->images
            ->thumbnail->url; ?>">Thumbnail</a>
          <br/>
          <strong>Tags: </strong>
          <?php echo implode(',', $result->data->tags); ?>
          <br/>
        </div>
        <div id="image">
          <h2>Image</h2>  
          <img src="<?php echo $result->data->images
            ->low_resolution->url; ?>" /></a>
        </div>
        <div id="comments">
          <?php if ($result->data->comments->count > 0): ?>
          <h2>Comments</h2>
          <ul>
            <?php foreach ($result->data->comments->data as $c): ?>
              <div class="item"><img src="<?php echo $c
                ->from->profile_picture; ?>" class="profile" />
              <?php echo $c->text; ?> <br/>
              By <em> <?php echo $c->from->username; ?></em> 
              on <?php echo date('d M Y h:i:s', $c->created_time); ?>
              </div>
               
              </li>
            <?php endforeach; ?>
          </ul>
          <?php endif; ?>
        </div>      
      </div>
    <?php
    } catch (Exception $e) {
      echo 'ERROR: ' . $e->getMessage() . print_r($client);
      exit;
    }
    ?>
  </body>
</html>
