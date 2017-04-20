$(function(){

	// ======== Vars =============//
	console.log(window.location)
	var gal;
	var indexMap;
	var map;

	// ========= Listeners at page load ======================== //

	// Listener for GO button at zip search field
	// Adds zip code onto url string when request is sent
	$('#nav-go').click(function(event) {
		// event.preventDefault();
		var zip = $('#zip-input').val();

		// Some addtional validation for the zip code
		var patt = new RegExp("^[0-9]{5}-?([0-9]{4})?$");
		if(zip.trim().length !== 0 && zip.length <= 10) {
			if(patt.test(zip)) {
				var newLocation = "tabs.html#"+zip;
				window.location = newLocation;	
			}
		}
	});

	
	


	// ===========  Functions ran at page load ================= //

	// Initialize tooltips 
	$('[data-toggle="tooltip"]').tooltip(); 

	// set tabs functionality
	setTabs();

	 var current_loc;
	 getLocation();
	 
	 getZipFromHash()
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
			show: { effect: "blind", duration: 500 }//,
			// heightStyle: "fill"
		});
	}

	function getZipFromHash() {
		if(window.location.hash) {
			var hash = window.location.hash.substring(1);
			// console.log("the hash is: "+hash);
			var patt = new RegExp("^[0-9]{5}-?([0-9]{4})?");
			if(patt.test(hash)) {
				 console.log("the zip hash is: "+hash);
			}
		}
	}


	/**
	 * Check if GEOLOCATION is available to user.
	 * If yes return latlng, if not return default latlng;
	 * @return {[type]} [description]
	 */
	function getLocation() {
		var latLng;
	    if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(function(position) {
	  
	        	latLng = { lat: position.coords.latitude, lng:  position.coords.longitude };
	        	
	        	
	        	tabs_defaultMapInit(latLng, 10)
	        });
	    } else {

	    	latLng = { lat: 44.452030, lng: -73.112647};
	    	//default1_mapInit(latLng);
	    	// tabs_defaultMapInit(latLng)
	    	
	    }
	}
	/**
	 * Default map for tabs page
	 * @param  {[type]} latLng location as produced by geolactor
	 * @return {[type]}        [description]
	 */
	function tabs_defaultMapInit(latLng, zoom){
		// console.log(latLng);
		var mapOptions = {

		}
	}


	/**
	 * Starts a map with a passed location object
	 * @param  {[type]} loc [description]
	 * @return {[type]}     [description]
	 */
	// function default2_mapInit(loc) {
	// 	var mapOptions = {
	// 		center: new google.maps.LatLng(loc.lat, loc.lng),
	// 		zoom: 10
	// 	};
	// 	console.log(mapOptions);
	// 	var indexMap = new google.maps.Map($('#index-map').get(0), mapOptions);
	// }
	

	
// =========== End Function Definitions ========== //

	




	

	
	









});