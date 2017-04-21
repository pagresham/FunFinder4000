$(function(){

	// ======== Vars =============//
	console.log(window.location)
	var gal;
	var indexMap;
	var map;
	var zip = null;
	var coords = [];
	var placename;
	var currntTab = 0;
	var currentLoc;
	var currentZoom = 10;
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
				var newLocation = "tabs.html#"+zipCode;
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
			setTimeout(function(){
				mapInit(currentLoc, id);
			}, 500);
			
		});
	});
	
	document.getElementById('showLoc').addEventListener('click', function() {
		console.log(currentLoc);
	});

	// ===========  Functions ran at page load ================= //

	// Initialize tooltips 
	$('[data-toggle="tooltip"]').tooltip(); 

	// set tabs functionality
	setTabs();

	 var current_loc;
	 // getLocation();
	 
	 getZipFromHash();
	 console.log(zip);
	 //console.log(current_loc);
	 

	 



// =========== Function Definitions ============= //

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
		console.log(latLng.lat)
		console.log(latLng.lng)
		myLtLn = new google.maps.LatLng(latLng);
		currentLoc = latLng;
		// setTimeout(function(){

		// }, 500)
				// console.log(currentLoc)
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







	
// =========== End Function Definitions ========== //

	




	

	
	









});