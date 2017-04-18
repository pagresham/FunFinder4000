<!DOCTYPE html>
<html>
<head>
	<title>Fun Finder 4000</title>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<meta name=”Description” content=”Finder 4000 is a tool to locate prime recreational opportunities close to home or when traveling. We provide content about food, beer, hiking, camping and other pursuits.”>
	<meta name=”Keywords” content=”fun beer food wine hiking camping skiing biking fishing music vermont colorado”>
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

	<!-- bxSlider Javascript file -->
	<script src="js/jquery.bxslider.min.js"></script>
	<!-- bxSlider CSS file -->
	<link href="css/jquery.bxslider.min.css" rel="stylesheet" />

	<!-- Bootstrap JS CDN -->
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	<link rel="stylesheet" type="text/css" href="css/FF.styles.css">
	<script type="text/javascript" src="js/FF.app.js"></script>
	<link rel="stylesheet" type="text/css"
          href="https://fonts.googleapis.com/css?family=Fjalla One">
</head>
<body>
	<div id="container">
		<div id="header"></div>
		<div id="body">
			
			<div class="tabs-nav">
				<nav class="navbar navbar-default" id="index-nav">
				  <div class="container-fluid index-nav">
				    <div class="navbar-header">
				      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span> 
				      </button>
				      <a class="navbar-brand" id="nav-brand" href="#">FunFinder4000</a>
				    </div>
				    <div class="collapse navbar-collapse" id="myNavbar">
				      <ul class="nav navbar-nav">
				      	<li><a href="index.php">Home</a></li>
				        <li class="active"><a href="tabs.php">Tabs</a></li> 
				      </ul>
				      <ul class="nav navbar-nav navbar-right">
				        <form class="navbar-form navbar-left form-inline" style="border: none">
					      <div class="form-group" id="zip-here">
					      	<label for="zip_input">Enter a zipcode to gtarted</label>
					        


					        <input type="text" id="zip_input" class="form-control search-field" placeholder="Search" size="10" style="margin:auto;">


					      </div>
					      <button id="ind-nav-btn" type="submit" class="btn btn-default">Go!</button>
					    </form>
				      </ul>
				      
				    </div>
				  </div>
			</nav>
			</div>
	
			<div class="container-fluid" style="width: 100%">
			<div id="funTabs">
				  <!-- Tabs anchor 'tabs' -->
				  <ul>
				    <li><a href="#fragment-1">Hiking, Biking, Camping, Oh My!</a></li>
				    <li><a href="#fragment-2">Breweries and Beer</a></li>
				    <li><a href="#fragment-3">Snow Sports</a></li>
				    <li><a href="#fragment-3">Fun Photos</a></li>
				  </ul>
				<!-- Begin Tabbed sections -->
				  <div id="fragment-1">
				    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
				  </div>
				  <div id="fragment-2">
				    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
				  </div>
				  <div id="fragment-3">
				    Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
				  </div>
				</div>
			</div>
		</div>

<?PHP
include "footer.php";
?>