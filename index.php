<!DOCTYPE html>
<html>
<head>
	<title>Fun Finder 4000</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<!-- <meta name=”Description” content=”Finder 4000 is a tool to locate prime recreational opportunities close to home or when traveling. We provide content about food, beer, hiking, camping and other pursuits.”> -->
	<!-- <meta name=”Keywords” content=”fun beer food wine hiking camping skiing biking fishing music vermont colorado”> -->
  	<meta name="author" content="Pierce Gresham">
	<!-- Bootstrap CSS CDN -->
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	
	<!-- jQuery CDN -->
	<!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.0/jquery.min.js"></script> -->
	<!-- Last takes place of next 2 for CDN content -->
	<!-- jQueryUI CSS Download -->
	<link rel="stylesheet" type="text/css" href="jq/jquery-ui.css">
	<!-- jQuery download -->
	<script type="text/javascript" src="jq/jquery-3.2.1.js"></script>
	<!-- jQueryUI dowload -->
	<script type="text/javascript" src="jq/jquery-ui.js"></script>

	

	<!-- Bootstrap JS CDN -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/FF.styles.css">
	<script type="text/javascript" src="js/FF.app2.js"></script>
	<link rel="stylesheet" type="text/css"
          href="https://fonts.googleapis.com/css?family=Fjalla One">
  <link rel="stylesheet" type="text/css"
          href="https://fonts.googleapis.com/css?family=Timmana">
	<script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBJl1s_ElOQABn5g9toMSrBQoKtBPv6NFs"></script>
</head>
<body>
	<div id="container">
		<div id="header"></div>
		<div id="body">
			
			<div class="index-jmb">
				<nav class="navbar navbar-default" id="index-nav">
			  <div class="container index-nav">
			    <div class="navbar-header">
			      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span>
			        <span class="icon-bar"></span> 
			      </button>
			      <a data-toggle="tooltip" data-placement="left" title="Have Fun!!!" class="navbar-brand" id="nav-brand">FunFinder4000</a>
			    </div>
			    <div class="collapse navbar-collapse" id="myNavbar">
			      <ul class="nav navbar-nav">
			        <li class="active"><a href="index.php">Home</a></li>
			        <li><a href="tabs.php">Explore</a></li> 
			       
			      </ul>
			      <ul class="nav navbar-nav navbar-right" style="margin: auto;">
			        <form class="navbar-form navbar-left form-inline" style="border: none" id="index-nav-form">
				      <div class="form-group">
				      	<label for="zip-input" id="zip-label">Enter a zipcode to get started</label>
				        <input type="text" id="zip-input" pattern="^[0-9]{5}-?([0-9]{4})?$" class="form-control search-field" placeholder="Search" size="10" style="margin:auto;">

				      </div>
				      <button type="submit" class="btn btn-default" id="nav-go">Go!</button>
				    </form>
			      </ul>
			    </div>
			  </div>
			</nav>
			</div>
			<div class="row">
				<div class="index-one-row">
					<section class="col-sm-7">
						<article class="col-sm-12 mission">
							<div class="col-sm-12" id="mission-div">
								<h2 class="uline2 mission-name" id="mission-name">Fun Finder 4000</h2>
								<h3 class="uline text-info">An online resource for hiking, biking, skiing, and brewery fun.</h3>
								
								
								<div class="text-center" id="index-icons" data-toggle="collapse" data-target="#icon-desc">
									<img class="img-responsive" src="img/combined-icons.png" id="combined-icons" alt="Fun!">
									<!-- <img src="img/mtnBike-icon-100.png" alt="Fun!">
									<img src="img/beer-icon-100.png" alt="Fun!">
									<img src="img/camping-icon-100.png" alt="Fun!"> -->
								</div>
								<div id="icon-desc" class="collapse hover-bold">
									<a href="tabs.php#0" class="text-success"><span class="glyphicon glyphicon-hand-right"></span>  Hiking and Biking - Get up to date information on your favorite hiking and biking trails.</a>
									<a href="tabs.php#0" class=" text-info"><span class="glyphicon glyphicon-hand-right"></span>  Camping - Locate new and interesting campgrounds.</a>
									<a href="tabs.php#2" class=" text-success"><span class="glyphicon glyphicon-hand-right"></span>  Snow Sports - Find skiing and snowboarding destionations</a>
									<a href="tabs.php#1" class=" text-info"><span class="glyphicon glyphicon-hand-right"></span>  Breweries - Explore local brewery offirings.</a>
									<a href="tabs.php#3" class=" text-success"><span class="glyphicon glyphicon-hand-right"></span>  Photos - Explore Fun Photos from Flickr.</a>
								</div>
								

							</div>
							<div class="mission-quote text-success text-right">
								<p>FunFinder4K blends current map data with other sources of info to bring you an interesting mix of content in a Fun atmosphere.</p>
								<h4>Enjoy, and Have Fun!</h4>	
									<!-- <div class="family-biking">
										<img data-toggle="tooltip" data-placement="top" src="img/family-biking.png"  alt="Fun!" title="Select an image to see more details.">
									</div> -->
							</div>
							<!-- <div class="col-sm-5"></div> -->
						</article>
						<div class="col-xs-12 index-gallery">
							<div id="gallery-div">
								<div class="img-overlay">
									<img src="img/kids-utah.jpg" id="g0" class="img-rounded" alt="">
								</div>
								<div class="img-overlay">
									<img src="img/avery-taps.JPG" id="g1" class="img-rounded" alt="">
								</div>
								<div class="img-overlay">
									<img src="img/skiin-sam.jpg" id="g2" class="img-rounded" alt="">
								</div>
								<div class="img-overlay">
									<img src="img/singletrack.jpg" id="g3" class="img-rounded" alt="">
								</div>
								<div class="img-overlay">
									<img src="img/snowboarder-gallery.jpg" id="g4" class="img-rounded" alt="">
								</div>	
							</div>
						  </div>
					</section>

					<div class="map-aside col-sm-5">
						<div id="index-map"></div>
					</div>
				</div>
				<div class="clearfix"></div>
		</div>
			
<?PHP
include "footer.php";
?>


