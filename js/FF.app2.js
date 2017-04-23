$(function(){

	// ======== Vars =============//
	// console.log(window.location)
	var gal;
	var indexMap;




	// var map;
	




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
			// console.log('pressed');
			setTimeout(function(){
				// You wait just a second!!! //
				// This helped with my map not loading on tb selection //
				mapInit(currentLoc, id);}, 800);
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
		find_brewery("auto", [myGeoLocation.lat, myGeoLocation.lng]);
	});


	// =========== Trails Tab Listeners ======================== //
	
	$('#trail-search-map').click(function(event) {
		event.preventDefault();

		var trailParams = [];
		if($('#limit-select').val() !== "") {
			trailParams['limit'] = $('#limit-select').val(); 	
		}
		if($('#activity-select').val() !== "") {
			trailParams['activity'] = $('#activity-select').val();
		}
		trailParams['location'] = currentLoc;  // currentLoc is an object.lat/lng
		clearHikeForm() 
		trailCall(trailParams);
		
	});



	$('#trail-search-btn').click(function(event) {
		event.preventDefault();

		var trailParams = [];
		if($('#limit-select').val() !== "") {
			trailParams['limit'] = $('#limit-select').val(); 	
		}
		if($('#activity-select').val() !== "") {
			trailParams['activity'] = $('#activity-select').val();
		}
		if($('#citySelect').val() !== "") {
			trailParams['city'] = $('#citySelect').val(); 	
		}
		if($('#stateSelect').val() !== "") {
			trailParams['state'] = $('#stateSelect').val(); 	
		}
		if(!trailParams['state'] && !trailParams['city']) {
			trailParams['location'] = currentLoc;
		}
		clearHikeForm() ;
		trailCall(trailParams);

	});

	//  ========  Photos Tab Listeners ==========  //
	
	$('#photo-search').click(function(event) {
		event.preventDefault();
		console.log(currentLoc)
		flickrCall(currentLoc)
	})
	







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
	function markerObject(lat, lng, name, addr, local, region) {
		this.lat = lat;
		this.lng = lng;
		this.name = name;
		this.addr = addr;
		this.local = local;
		this.region = region;
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
			hide: { effect: "fade", duration: 500 },
			show: { effect: "fade", duration: 500 },
			activate: function(event, ui) {
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
	function loc_from_zip2(zip){
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
			console.log(coords)
			init_map2(coords);
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
			mapTypeId: 'roadmap',
			scrollwheel: false
		};
		//console.log(mapOptions.center);
		var map = new google.maps.Map($('#tab-map'+mapId).get(0), mapOptions);

		google.maps.event.addListener(map, 'click', function( event ){
		});
		
		// Question Here, Why does when my map reloads, with tab selection, the center is offset
		// And, it requires, a jog, to get the map to load. 
		google.maps.event.addListener(map, 'idle', function() {
			currentLoc = {lat: map.getCenter().lat(), lng: map.getCenter().lng()}
		    currentZoom = map.getZoom();
		})
		google.maps.event.addListener(map, "center_changed", function() {
      currentLoc = {lat: map.getCenter().lat(), lng: map.getCenter().lng()}
      currentZoom = map.getZoom();
     // console.log(currentLoc);
    });
		google.maps.event.addListener(map, 'click', function(event) {
			console.log(event.latLng.lat()+" and "+event.latLng.lng());
		});
	}

// -------- Brewery Tab Function ------  //

function search_city() {
	var city = $('#city-name').val();
	if(check_city(city)) {
		if(currentLoc){
			show_errors();
			var geocode = new google.maps.Geocoder()
			geocode.geocode( {address: city}, function(result) {
				var coords = [
					result[0].geometry.location.lat(),
					result[0].geometry.location.lng()
				];
				// myGeoLocation = coords;
				console.log(coords)
				find_brewery("auto", coords);
			})
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
	else {
		var geocode = new google.maps.Geocoder();

		geocode.geocode( {address: zip}, function(result) {
			var coords = [
				result[0].geometry.location.lat(),
				result[0].geometry.location.lng()
			];
			// myGeoLocation = coords;
			console.log(coords)
			find_brewery("auto", coords);
		})
	}
	
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
			// console.log(data);
			console.log(JSON.parse(response));

			var data_arr = JSON.parse(response).data;
			// console.log(data_arr[0].longitude)
			// console.log(data_arr);
			if (data_arr) {
				clear_fields();
				$('#output').empty();
				var outputString = '';
				//console.log(response);
				
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
					
					var bName = "<div class='pull-left lead'><a id='brewName' class='brewName' href='"+website+"'>"+name+"\
					</a></div>\
					<div class='pull-right'><img src='"+icon+"'></div><br>"
					bDescription.setAttribute('class', 'text-default');
					bDescription.innerHTML = description;
					
					header.setAttribute('class', 'brew-head')
					header.innerHTML = bName;
					beerOut.appendChild(header);
					
					beerOut.appendChild(bDescription);
					
					var addr = data_arr[i].streetAddress;
					var local = data_arr[i].locality;
					var reg = data_arr[i].region;

					// Create new marker obj, and push it to array of markerData[]
					var markerObj = new markerObject(lat, lng, name, addr, local, reg);
					markerData.push(markerObj);
					// console.log(markerObj)
				}
				console.log(data);
				// Note, this is passing an array here.
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
	// this function takes an array as the location argument
	// console.log(loc[0]+" : "+loc[1])
	var myLatLng = new google.maps.LatLng(loc[0], loc[1])
	var map_properties = {
		center: myLatLng ,
		zoom: 10,
		scrollwheel: false
		 };
	map = new google.maps.Map($('#tab-map1').get(0), map_properties);
	// Removed property scrollwheel: false
	var center;
    google.maps.event.addDomListener(map, 'idle', function() {
		
		center = map.getCenter();
		// console.log(center.lat())
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
    google.maps.event.addListener(map, 'click', function(event) {
    	console.log(event.latLng.lat()+" and "+event.latLng.lng());
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
		var addr = markerData[i].addr;
		var local = markerData[i].local;
		var reg = markerData[i].region;
		
		// console.log(addr)
		// console.log(local)
		// console.log(reg)
		latlng = new google.maps.LatLng(lat, lng);
		// console.log(latlng);
		
		create_marker(latlng, name, addr, local, reg);

		// Marker’s Lat. and Lng. values are added to bounds variable
      	bounds.extend(latlng); 
	}
}


// This function creates each marker and sets their Info Window content
function create_marker(latlng, name, addr, local, reg) {

	var marker = new google.maps.Marker({
		map: map,
		position: latlng,
		title: name
	});
	// This event expects a click on a marker
	google.maps.event.addListener(marker, 'click', function() {
		if(infoWindow){
			console.log('im true')
     		infoWindow.close();
     	}
		infoWindow = new google.maps.InfoWindow({
   			content: "<div style='color: #333'><h4>"+name+"</h4>\
   			<p>"+addr+"</p><p>"+local+", "+reg+"</p></div>"
 		});
    	infoWindow.open(map, marker);
	});
	google.maps.event.addListener(marker, 'mouseover', function() {
		if(infoWindow){
			console.log('im true')
     		infoWindow.close();
     	}
		infoWindow = new google.maps.InfoWindow({
   			content: "<div style='color: #333'><h4>"+name+"</h4>\
   			<p>"+addr+"</p><p>"+local+", "+reg+"</p></div>"
 		});
    	infoWindow.open(map, marker);
	});
	winContent = "<div style='color: #333'><h4>"+name+"</h4>\
   			<p>"+addr+"</p><p>"+local+", "+reg+"</p></div>";
	infoWindow.setContent(winContent);
	infoWindow.open(map, marker);

}


// =======  Begin functions for trails API Tab   =========  //


/**
 * Clears form fields in the hike/camp search form 
 */
function clearHikeForm() {
	$('#limit-select').add($('#activity-select'),$('#limit-select')).val("");
	$('#citySelect').add($('#stateSelect')).val("");
}


/**
 * Base call to trails API
 * @params [array] arr - holds assoc array of values
 */
function trailCall(arr){
	// console.log(arr)
	// possible keys in arr
	// limit, activity, city, state, location //
	var limit = "",
		activity = "",
		city = "",
		state = "",
		lat = "",
		lng = "",
		limitflag = false;
	for (var key in arr){
		if (key == "limit") {
			if (arr[key] === 'max'){
				limit = 25;
				limitflag = true;
			}
			else {
				limit = "&limit="+arr[key];
				limitflag = true;
			}
		}

		if (key == "activity") activity = "&q[activities_activity_type_name_eq]="+arr[key];
		if (key == "city") city = "&q[city_cont]="+arr[key];
		if (key == "state") state = "&q[state_cont]="+arr[key];
		if (key == "location") lat = "&lat="+arr[key].lat;
		if (key == "location") lng = "&lon="+arr[key].lng;
	}
	// limits output to 50
	if(!limitflag) {
		limit = "&limit=50";
	}



	var trailKey = "hWjd4vtN1NmshKnLqQfckPOgxwmbp1FgK0DjsnWPe0wQDAbddo";
	var trailUrl = "https://trailapi-trailapi.p.mashape.com/?"
	var rad = 25;
	var radius = "&radius="+rad;
	trailUrl += limit+activity+city+state+lat+lng+radius;
	//console.log(trailUrl)

		
	var success = function(data){
		var markers = [];
		var ar = data.places;
		// Create bounds object to center map on when finished processing markers
		var bounds = new google.maps.LatLngBounds();
		var locations = [];

		/**
		 * init map for this particular map call
		 * @param  {bounds object} loc [description]
		 */
		function initMap(loc) {
			var map = new google.maps.Map($('#tab-map0').get(0),
			{
				zoom: 8,
				center: loc.getCenter()
			});
			console.log(locations)
			setMarkers(map, locations)

			google.maps.event.addListener(map, "center_changed", function() {
      	currentLoc = {lat: map.getCenter().lat(), lng: map.getCenter().lng()}
      	currentZoom = map.getZoom();
     		// console.log(currentLoc);
    	});
		}

		
		// console.log(ar);
		for (var i in ar) {
			if (ar[i].lat != 0 && ar[i].lat != null & ar[i].lat != undefined) {
				//console.log(ar[i].lat+" : "+ar[i].lon)
				// console.log(ar[i].lat+" "+ ar[i].lon)
				var latLng = new google.maps.LatLng(ar[i].lat, ar[i].lon)

				// Add each latLng to bounds obj
				bounds.extend(latLng);

				var activitiesStr = "";
				var name = ar[i].name;
				var cityState = ar[i].city+", "+ar[i].state;
				var Url = ""
				for (var j in ar[i].activities) {
					activitiesStr += ar[i].activities[j].activity_type_name+"  ";
					Url += ar[i].activities[j].url+"<br>";
				}
				var location = {name: name, activity: activitiesStr, cityState: cityState, url:Url, latlng: latLng}
				locations.push(location);
				var trailsDiv = document.createElement('div');
				var h4 = document.createElement('h4');
				h4.innerHTML = name;
				var p1 = document.createElement('p');
				p1.innerHTML = activitiesStr;
				var p2 = document.createElement('p');
				p2.innerHTML = cityState;
				var p3 = document.createElement('a');
				p3.href = Url
				p3.innerHTML = Url;
				trailsDiv.appendChild(h4);
				trailsDiv.appendChild(p1);
				trailsDiv.appendChild(p2);
				trailsDiv.appendChild(p3);
				trailsDiv.setAttribute('class', 'trailText');
				$('#hike-results').append(trailsDiv);








			} // end IF lat and lon are not null
		} // for loop
		
		if(locations.length > 0){
			initMap(bounds);
		}
		else alert('Sorry, no results were found with these parameters.')
	}// end success function 


	$.ajax({
	    url: trailUrl, // The URL to the API endpoint.
	    type: 'GET', // The HTTP Method (get,post, etc)
	    data: {}, // Additional parameters here
	    dataType: 'json',
	    success: success,
	    error: function(err) { alert(err); },
	    beforeSend: function(xhr) {
	    xhr.setRequestHeader("X-Mashape-Authorization", trailKey); // Enter here your Mashape key
	    } 
	});	
}
// function 
function setMarkers(map, locations) {
			console.log("fuck1")
			var marker, i;
			for(i=0;i<locations.length;i++) {
				var name = locations[i].name;
				var activity = locations[i].activity;
				var cityState = locations[i].cityState;
				var Url = locations[i].url;
				var latlng = locations[i].latlng;
				// console.log(latlng.lat());
				console.log('fuck2')
				latlangSet = new google.maps.LatLng(latlng.lat(), latlng.lng());
				var marker = new google.maps.Marker({map:map, title:name, position:latlangSet })
				marker.content = "<div class='fuckYeah' style='color:#333'><h4>"+name+"</h4><p>"+activity+"</p><p>"+cityState+"</p><p>"+Url+"</p>";
				var infowindow = new google.maps.InfoWindow();
				
				// 'this' was the solution after hours of trying to get the markers to work right. 
				// http://stackoverflow.com/questions/3576488/google-maps-infowindow-only-loading-last-record-on-markers

				google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(this.content);
            infowindow.open(this.getMap(), this);
        });
        google.maps.event.addListener(marker, 'mouseover', function () {
            infowindow.setContent(this.content);
            infowindow.open(this.getMap(), this);
        });
			}
		}


// ======  Code for Photos Tab =================== //

function flickrCall(loc) {
	var keyword = "&tags=";
	if ($('#keyword').val() !== "") {
			keyword += $('#keyword').val();
	}
	else { keyword = ""; }
	var imgSrcs = [];
	// var size = $('#size').val(),
			lat = loc.lat,
			lon = loc.lng,
			flkrKey = "84581076bd0125f924d6fc410596cf3a",
			baseUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key="+flkrKey+"&lat="+lat+"&lon=+"+lon+keyword+"&radius=10&per_page=20&page=1&format=json&nojsoncallback=1";
	console.log(baseUrl)

	$.getJSON(baseUrl, function(data){
		// console.log(data);
		if (data.photos.photo.length > 0) {
			$.each(data.photos.photo, function (index, item) {
				// console.log(item);
				var sizeUrl = "https://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key="+flkrKey+"&photo_id="+item.id+"&format=json&nojsoncallback=1";
				$.getJSON(sizeUrl, function(data) {
					// console.log(data.sizes.size)
					$.each(data.sizes.size, function(i, item) {
						// console.log(item);
						// Hardcoded a value in here.
						if(item.height ==  500) {
							// console.log(item);
							imgSrcs.push(item.source);
							// console.log(imgUrls.length)
						}
					});
				})
			})
		}
		var slideShow = document.getElementById('slideShow');
		
		var e = $('#slideShow');
		// console.log(e);
		e.css('background-color', 'red')
		$(".carousel").carousel({interval: 1000, pause: "hover"});
		setTimeout(function(){

			// console.log(imgSrcs.length)

			for(var i in imgSrcs){
				console.log(i)
				var div = document.createElement('div');
				var img = document.createElement('img');
				img.src = imgSrcs[i];
				img.setAttribute('alt', 'Fun Flickr Photo')
				img.setAttribute('class', 'flkrSlide');
				div.setAttribute('class', 'item');
				if(i == 0) {
					img.setAttribute('class', 'active');
				}
				div.appendChild(img);
				slideShow.appendChild(div);

				// console.log(img);
			}

			// for(var j in e) {
			// 		if(j != 0){
			// 			e[j].remove();	
			// 		}
			// 		// console.log(e[j]);
			// 	}
		},1000)
		
	})
	// if(imgUrls.length < 1) {
	// 	alert('Sorry, no images were found for this location and this keyword.');
	// }
	// console.log(imgUrls.length)


}

 
function flickrLocationCall(lat, lon) {

}

















	
// =========== End Function Definitions ========== //

});