$(function(){

	// ======== Vars =============//
	// console.log(window.location)
	var gal;
	var indexMap;
	var map;
	var zip = null;
	var coords = [];
	var placename;
	var currntTab = 0;
	var currentLoc;
	var currentZoom = 10;
	var errorMessage = "";
	var myGeoLocation;
	var markerData = [];
	var infoWindow;
	// ========= Listeners at page load ======================== //

	// Listener for GO button at zip search field
	// Adds zip code onto url string when request is sent
	$('#nav-go').click(function(event) {
		// event.preventDefault();
		var zipCode = $('#zip-input').val();

		var newLocation = "tabs.html#"+zipCode;
		// Some addtional validation for the zip code
		var patt = new RegExp("^[0-9]{5}-?([0-9]{4})?$");
		if(zipCode.trim().length !== 0 && zipCode.length <= 10) {
			if(patt.test(zipCode)) {
				// console.log('yes');
				var newLocation = "tabs.php#"+zipCode;
				window.location = newLocation;
				location.reload();
			}

		}
	});

	$('#tab-nav li a').each(function() {
		// alert('1')
		// Get last character off end of href for this element
		var id = $(this).attr('href').substring($(this).attr('href').length -1) -1;
		
		$(this).click(function() {
			currentTab = id;
			// console.log(currentTab);
			// console.log(currentLoc.lat);
			console.log('pressed');
			setTimeout(function(){
				// You wait just a second!!! //
				// This helped with my map not loading on tb selection //
				mapInit(currentLoc, id);}, 1000);
				// mapInit(currentLoc, id);
		});
	});
	
	document.getElementById('showLoc').addEventListener('click', function() {
		console.log(currentLoc);
	});

	// ------  Brewery Tab Listeners --------- //
	
	//Add listeners on search buttons
	$('#city-btn').click(function() {
		// event.preventDefault();
		search_city();
	});
	$('#zip-btn').click(function() {
		search_zip();
	});
	$('#locate').click(function(){
		//auto_search();
		find_brewery("auto", [myGeoLocation.lat, myGeoLocation.lng]);

	});



	// ===========  Functions ran at page load ================= //

	// Initialize tooltips 
	$('[data-toggle="tooltip"]').tooltip(); 

	// set tabs functionality
	setTabs();

	 var current_loc;
	 // getLocation();
	 
	 getZipFromHash();
	 // console.log(zip);
	 //console.log(current_loc);
	 

	 



// =========== Function Definitions ============= //

// constructor for markerObjects
	function markerObject(lat, lng, name) {
		this.lat = lat;
		this.lng = lng;
		this.name = name;
	}

/**
 * First looks for a HASHED value in incoming url
 * If a has value is present, opens correct tab.
 */
	function setTabs(){
		var hash;
		// Get hash value from url when page loads
		if (window.location.hash){
			hash = window.location.hash.substring(1);
			// console.log("the hash is: "+hash);
		}
		else hash = 0;
		$('#funTabs').tabs({
			active: hash,
			hide: { effect: "blind", duration: 500 },
			show: { effect: "blind", duration: 500 },
			activate: function(event, ui) {
				// console.log('tabload')
					

				// QQQ  - Here, I have a question. Page is needing a refresh before the location can be read. The 
				// initMap is firing, but the map does not fully load. 	

				//location.reload()
			}
			//,
			// heightStyle: "fill"
		});
	}

	/**
	 * Get zip value from url string.
	 * If not there, leaves zip at null
	 */
	function getZipFromHash() {
		if(window.location.hash) {
			var hash = window.location.hash.substring(1);
			// console.log("the hash is: "+hash);
			var patt = new RegExp("^[0-9]{5}-?([0-9]{4})?");
			if(patt.test(hash)) {
				console.log('true')
				 console.log("the zip hash is: "+hash);
				 zip = hash;
				 loc_from_zip(zip);
				 // init map here
			}
			else {
				getLocation(hash);
				//console.log('not true 1');
			}
		}
		else getLocation(0);
	}


	function loc_from_zip(zip){
		var geocoder = new google.maps.Geocoder();
		
		geocoder.geocode({address: zip}, function (result) {
			// console.log(result[0].geometry.location.lat())
			placeName = result[0].formatted_address;
			// console.log(result[0].geometry.location.lat)
			
			var coords = {
				lat: result[0].geometry.location.lat(),
				lng: result[0].geometry.location.lng()
			};
			myGeoLocation = coords;
			//console.log(coords)
			mapInit(coords, 0);
		});
	}




	/**
	 * Check if GEOLOCATION is available to user.
	 * If yes return latlng, if not return default latlng;
	 */
	function getLocation(tabId) {
		var latLng;
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function(position) {
	        latLng = { lat: position.coords.latitude, lng:  position.coords.longitude }
	        myGeoLocation = latLng;
	        // console.log(latLng)
	        mapInit(latLng, tabId);
	        });

	    } else {
	    	latLng = { lat: 44.452030, lng: -73.112647};
	    	mapInit(latLng, tabId);
	    }	    
	}


//// Maybe I need to put a pause in somewhere so the data can get updated before I use it ??!!??




	function mapInit(latLng, mapId) {
		// console.log(latLng.lat)
		// console.log(latLng.lng)
		myLtLn = new google.maps.LatLng(latLng);
		currentLoc = latLng;
		
		var mapOptions = {
			center: myLtLn,
			zoom: currentZoom,
			mapTypeId: 'roadmap'
		};
		//console.log(mapOptions.center);
		var map = new google.maps.Map($('#tab-map'+mapId).get(0), mapOptions);

		google.maps.event.addListener(map, 'click', function( event ){
		});
		
		// Question Here, Why does when my map reloads, with tab selection, the center is offset
		// And, it requires, a jog, to get the map to load. 

		google.maps.event.addListener(map, "center_changed", function() {
		        // console.log(map.getCenter().lat())
		        // console.log(map.getCenter().lng())
		        currentLoc = {lat: map.getCenter().lat(), lng: map.getCenter().lng()}
		        currentZoom = map.getZoom();
		       console.log(currentLoc);
		      });
	}

// -------- Brewery Tab Function ------  //

function search_city() {
	var city = $('#city-name').val();
	if(check_city(city)) {
		if(currentLoc){
		show_errors();
		
		find_brewery("city", city);
		}
	}
	else { 
		errorMessage = "<p>Did not recieve coord_arr from get_location</p>";
		show_errors();
	}
}
/**
 * Helper - Validates contents of city field
 * @param  String - looks for a valid city name as recognized by BreweryDB API
 * @return - boolean - if error is found, writes message to error array.
 */
function check_city(input) {
	var ok = false;
	var patt1 = /^[a-zA-Z0-9',._ -]+$/g;
	if(input.trim() == 0){
		//alert('ok1');
		errorMessage = "<p class='errText'>Please enter a valid city name</p>";
	}

	else if(!patt1.test(input)) {
		//alert('ok2');
		errorMessage = "<p class='errText'>Please no special characters</p>";
	}
	else {
		//alert('ok3');
		ok = true;
	}
	show_errors();
	return ok;
}
function show_errors() {
	var output = document.getElementById('output');
	output.innerHTML = "";
	output.innerHTML = errorMessage;
	errorMessage = "";
}

function search_zip() {
	var zip = $('#zip').val();
	var patt2 = /^[0-9]{5}(-[0-9]{4})?$/;
	if(!patt2.test(zip)){
		errorMessage = "<p class='errText'>Please use '#####' or '#####-####'</p>";
		show_errors();
	}
	else find_brewery("zip", zip);
	
}

function clear_fields() {
	$('#city-name').val("");
	$('#zip').val("");
}

function find_brewery2(x, y) {
	console.log(x)
	console.log(y)
}
function find_brewery(search_param, data) {
	// alert(search_param)
	$.get("lookup.php", { info: data, method: search_param, dataType: "json"})
		.done(function(response){
			//console.log(JSON.parse(response));
			var data_arr = JSON.parse(response).data;
			// console.log(data_arr);
			if (data_arr) {
				clear_fields();
				$('#output').empty();
				var outputString = '';
				//console.log(response);
				// var table = document.createElement('table');
				
				// Get parent element to write into
				var beerOut = document.getElementById('output');

				
				// Clear the markerData so it doesn't accumulate.   
				markerData = [];
				for(var i = 0;i<data_arr.length;i++){

					var name = data_arr[i].brewery.name;
					var website = "";
					var websiteTrimmed ="";
					
					if(data_arr[i].brewery.hasOwnProperty('website') && data_arr[i].brewery.website != null) {
						
						website = data_arr[i].brewery.website;
						websiteTrimmed = website.substring(11, website.length-1);
					}	
					else { website = "No site available"; }

					var icon = null;
					var picture = null;
					var lat = data_arr[i].latitude;
					var lng = data_arr[i].longitude;
					// console.log(lat+"  "+lng)
					var description;
					
					// if(!website){website = "No site available";}
					
					if(data_arr[i].brewery.hasOwnProperty('images') ) {
						if(data_arr[i].brewery.images.hasOwnProperty("icon") && data_arr[i].brewery.images.icon != null){
							icon = data_arr[i].brewery.images.icon;
						}
					}	
					if(data_arr[i].brewery.hasOwnProperty('description') && data_arr[i].brewery.description != null) {
						description = data_arr[i].brewery.description;
					}
					else { description = "Sorry, no description is available"
					}
					
					
					
					
					
					var bWebsite = document.createElement('p');
					

					var bDescription = document.createElement('p');
					var bIcon = document.createElement('div');
					var bImg = document.createElement('img');
					var bAnchor = document.createElement('a');
					var header = document.createElement('div');
					header.setAttribute('class', 'brewHeader');
					
					
					

					bAnchor.href = website;

					bAnchor.innerHTML = websiteTrimmed;
					
			
					
					
					var bName = "<div class='pull-left lead'><a class='brewName' href='"+website+"'>"+name+"\
					</a></div>\
					<div class='pull-right'><img src='"+icon+"'></div><br>"
					bDescription.setAttribute('class', 'text-info');
					bDescription.innerHTML = description;
					
					header.setAttribute('class', 'brew-head')
					header.innerHTML = bName;
					beerOut.appendChild(header);
					
					beerOut.appendChild(bDescription);
					
					//console.log(tr)
					var markerObj = new markerObject(lat, lng, name);
					markerData.push(markerObj);
					// console.log(markerObj)
				}
				
				init_map2(data);
			}	
			else {
				errorMessage = "Try a different zip code or city name";
				show_errors();
				clear_fields();
			}
		});
}
function init_map2(loc) {

	var map_properties = {center: loc, zoom: 12 };
	map = new google.maps.Map($('#tab-map1').get(0), map_properties);
	// Removed property scrollwheel: false
	
	var center;
    google.maps.event.addDomListener(map, 'idle', function() {
		center = map.getCenter();
	});
	google.maps.event.addDomListener(window, 'resize', function() {
		map.setCenter(center);
	});
	
	// create new info window
	 infoWindow = new google.maps.InfoWindow();

	// Need to populate array before disp_markers. 
	display_markers();
	
	// Event that closes the InfoWindow with a click on the map
   	google.maps.event.addListener(map, 'click', function() {
       infoWindow.close();
    });
}
// This function will iterate over markersData array
// creating markers with createMarker function
function display_markers() {
	var latlng;
    // this variable sets the map bounds and zoom level according to markers position
	var bounds = new google.maps.LatLngBounds();
	//alert("marker data"+markerData);
	var latlng
	for (var i = 0;i < markerData.length;i++) {
		// console.log(markerData.length)
		var name = markerData[i].name;
		var lat = markerData[i].lat;
		var lng = markerData[i].lng;
		console.log(lat)
		console.log(lng)
		latlng = new google.maps.LatLng(lat, lng);
		// console.log(latlng);
		

////  Problem somewhere in here with my set center method ////



		create_marker(latlng, name);

		// Marker’s Lat. and Lng. values are added to bounds variable
      	bounds.extend(latlng); 
		
	}
	// alert(latlng);
	// Most excellent, this worked to center map on a group of markers. 
	map.setCenter(latlng);
	// Bounds variable is used to set the map bounds
}
// This function creates each marker and sets their Info Window content
function create_marker(latlng, name) {
	var marker = new google.maps.Marker({
		map: map,
		position: latlng,
		title: name
	});
	// This event expects a click on a marker
	
	var winContent = "";
	google.maps.event.addListener(marker, 'click', function() {
		winContent = "<div><p>"+name+"</p></div>";
		// alert(name)
		infoWindow.setContent(winContent);

     	// open infowindow in the current map and at the current marker location
    	infoWindow.open(map, marker);
		
	});
	google.maps.event.addListener(marker, 'hover', function() {
		winContent = "<div><p>"+name+"</p></div>";
		infoWindow.setContent(winContent);
		infoWindow.open(map, marker);
		//alert(name);
	});
		
	winContent = "<div><p>"+name+"</p></div>";
	infoWindow.setContent(winContent);
	infoWindow.open(map, marker);

}





	
// =========== End Function Definitions ========== //

	




	

	
	









});