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
	<link rel="stylesheet" type="text/css" href="css/FF.tab.styles.css">
  <script src="js/city-name.js"></script>
	<script type="text/javascript" src="js/FF.app2.js"></script>
	<link rel="stylesheet" type="text/css"
          href="https://fonts.googleapis.com/css?family=Fjalla One">
  <script async defer
  src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBJl1s_ElOQABn5g9toMSrBQoKtBPv6NFs"></script>
   
    
</head>
<body>
	<div id="container">
		<div id="header"></div>
		<div id="body" style="padding-bottom: 0em;">
			
			<div class="tabs-nav">
				<nav class="navbar navbar-default" id="index-nav">
				  <div class="container index-nav">
				    <div class="navbar-header">
				      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span>
				        <span class="icon-bar"></span> 
				      </button>
				      <a class="navbar-brand" id="nav-brand">FunFinder4000</a>
				    </div>
				    <div class="collapse navbar-collapse" id="myNavbar">
				      <ul class="nav navbar-nav">
				      	<li><a href="index.php">Home</a></li>
				        <li class="active"><a href="tabs.php">Explore</a></li> 
				      </ul>
				      <ul class="nav navbar-nav navbar-right">
				        <form class="navbar-form navbar-left form-inline" style="border: none">
					      <div class="form-group" id="zip-here">
					      	

					      	<label for="zip_input">Enter a zipcode to gtarted</label>
					        
					        <input type="text" id="zip-input" pattern="^[0-9]{5}-?([0-9]{4})?$" class="form-control search-field" 

					        placeholder="Search" size="10" style="margin:auto;">
					      </div>
					       
					       <button type="button" class="btn btn-default" id="nav-go">Go!</button>
					    	<button type="button" id="showLoc" class="btn btn-default">CurrentLocation</button>

					    </form>
				      </ul>
				    </div>
				  </div>
			</nav>
			</div>
	
			<div class="container-fluid" id="tab-container">
			<div id="funTabs" class="tabs">
				  <!-- Tabs anchor 'tabs' -->
				  <ul id="tab-nav" class="">
				    <li><a href="#fragment-1">Hiking, Biking, Camping</a></li>
				    <li><a href="#fragment-2">Breweries and Beer</a></li>
				    <li><a href="#fragment-3">Snow Sports</a></li>
				    <li><a href="#fragment-4">Fun Photos</a></li>
				  </ul>
				<!-- Begin Tabbed sections -->
				  <div id="fragment-1" class="tabs" >
				    <section>
				    	<div class="row">
				    		<div class="col-sm-6" >
				    			<!-- Begin hike/bike/camp form -->
				    			<div class="col-sm-12 tab-form" id="hike-form">
				    				<h4 class="section-header" data-toggle="tooltip" data-placement="bottom" title="Make selections from the form below to search for hiking, biking, and camping opportunities at the location you select. Leave location info blank to use your current location.">Find hiking, biking, and camping opportunities</h4>
									<form class="form-default" action="" id="hike-form">
										
											
												
										<div class="form-group hike-form-group" >
											<div style="display: inline-block;">
												<label for="activity-select">Activity:</label>
												<select  class="text-info" name="activity" id="activity-select">
													<option value="">Choose One</option>
													<option value="hiking">Hiking</option>
													<option value="mountain biking">Mountain Biking</option>
													<option value="camping">Camping</option>
													<option value="snow sports">Snow Sports</option>
												</select>
											</div>


											<div style="display: inline-block;">

												<label class="form-label" for="limit">Limit Results:</label>

												<select  class="text-info" name="limit" id="limit-select" style="">
													<option value="">Choose One</option>
													<option value="1">1</option>
													<option value="5">5</option>
													<option value="10">10</option>
													<option value="20">20</option>
													<option value="max">Max</option>
												</select>
											</div>
										</div>
									
										<div class="form-group hike-form-group">
											<div style="display: inline-block;">
												<label data-toggle="tooltip" title="If your results are too widespred, there may be more than one town with the same name. Try adding a state." for="city">City:</label>
												<input type="text" name="city" id="citySelect">	
											</div>
											<div style="display: inline-block;">
												<label  for="state">State:</label>
												<input type="text" name="state" id="stateSelect">	
											</div>					
										</div>

										<div class="form-group hike-form-group">
											<div class="text-center">
												<button class="btn btn-success" id="trail-search-btn">Go!</button>	
												
												<button class="btn btn-success"  id="trail-search-map" data-toggle="tooltip" data-placement="bottom" title="Center the Map on a location to search">Map Center</button>
											</div>
											
										</div>
											
										
										


				



										
									</form>

									
				    			</div>
				    			<div class="col-sm-12 tab-info" id="hike-results">
				    				<h4 class="section-header">Search Results</h4>

				    			</div>
				    		</div>
				    		<div class="col-sm-6">
				    			<div class="col-sm-12 tab-map" id="tab-map0">Map here</div>
				    		</div>
								<div class="col-sm-12" style="height: 5em;border: 1px solid red;">bottom div</div>
				    	</div>
				    </section>

			
				  </div>
				  <div id="fragment-2" class="tabs" >
				   <section>
				    	<div class="row">
				    		<div class="col-sm-6" style="overflow: scroll">
				    			<div class="col-sm-12 tab-form" id="beer-form">
				    			
										<!-- Brewery Form -->

										<h4 class='section-header'>Search for Breweries</h4>

										<form class="form-inline beer-form">
										  <div class="form-group">
										    <label class="col-sm-3" for="city-name">City Name Here</label>

										    <input class="form-control col-sm-3" type="text" name="city" id="city-name" placeholder="City Name" placeholder="City Name" maxlength="25">

										    <input class="btn-info form-control col-sm-3" type="button" name="submit-city" id="city-btn" value="Search By City">

										  </div>
										</form>
										
										<form action="" class="form-inline beer-form">
											<div class="form-group">
												<label class="col-sm-3" for="zip-btn">Enter a zip code</label>
												<input class="form-control col-sm-3" type="text" name="zip" id="zip" placeholder="ZIP Code" maxlength="10">
												<input class="btn-info form-control col-sm-3" type="button" name="submit-zip" id="zip-btn" value="Search By Zip Code">
											</div>
										</form>
										<form action="" class="form-inline beer-form">
											<input class="btn-success form-control" type="button" name="locate" id="locate" value="Auto-Locate">
										</form>

				    			</div>
				    			<div class="col-sm-12 tab-info" id="beer-results-panel">
										<div class="row">
										
											<div id="output" class="col-sm-12">
												<h4 class='section-header'>Breweries Info</h4>
												
											</div>
										</div>
				    			</div>
				    		</div>
				    		<div class="col-sm-6">
				    			<div class="col-sm-12 tab-map" id="tab-map1"></div>
				    		</div>
								<div class="col-sm-12" style="height: 5em;border: 1px solid red;">bottom div</div>
				    	</div>
				    </section>
				  </div>
				  <div id="fragment-3" class="tabs">
				    <section>
				    	<div class="row">
				    		<div class="col-sm-6">
				    			<div class="col-sm-12 tab-form">form here</div>
				    			<div class="col-sm-12 tab-info">Return info here</div>
				    		</div>
				    		<div class="col-sm-6">
				    			<div  id="tab-map2" class="col-sm-12 tab-map">Map here</div>
				    		</div>
								<div class="col-sm-12" style="height: 5em;border: 1px solid red;">bottom div</div>
				    	</div>
				    </section>
				  </div>
				  <div id="fragment-4" class="tabs">
				    <section>
				    	<div class="row">
				    		<div class="col-sm-6">
				    			<div class="col-sm-12 tab-form">form here</div>
				    			<div class="col-sm-12 tab-info">Return info here</div>
				    		</div>
				    		<div class="col-sm-6">
				    			<div id="tab-map3" class="col-sm-12 tab-map">Map here</div>
				    		</div>
								<div class="col-sm-12" style="height: 5em;border: 1px solid red;">bottom div</div>
				    	</div>
				    </section>
				  </div>
				</div>
			</div>
		</div>
			<div id="footer">
			<footer>
				<div id="output"></div>
			</footer>
		</div>
	</div>


</body>
</html>

<!-- <?PHP 
//include "footer.php";
?>