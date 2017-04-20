$(function(){

	// ======== Vars =============//
	
	var gal;
	var indexMap;
	var map;
	// ========= Listeners at page load ======================== //

	// Make question mark hide the img desc div
	$('#question-mark').click(function() {
		$('#index-panel').hide("fade");
	});

	//   Listener for all of the index gallery images  //
	$('#gallery-div img').each(function(){
			$(this).click(function(){
			// get id from image //
			var id = $(this).attr('id').substring(1);

			// console.log(gal.photo[id].lat)
			img_mapInit({lat: gal.photo[id].lat, lng: gal.photo[id].lng}, id);


			if($('#index-panel').css('display') == 'none') {
				$('#index-panel').show("fade");
				$('#panel0').html(gal.photo[id].activity+":  "+gal.photo[id].name);
				$('#panel1').html(gal.photo[id].description);
		
			} else {
				// change content as a callback, so data swap happens when faded
				$('#index-panel').hide("fade", function() {
					$('#panel0').html(gal.photo[id].activity+":  "+gal.photo[id].name);
					$('#panel1').html(gal.photo[id].description);
				});
				$('#index-panel').show("fade");
			}
		});
	});


	// ===========  Functions ran at page load ================= //

	// Initialize tooltips 
	$('[data-toggle="tooltip"]').tooltip(); 

	// set tabs functionality
	setTabs();

	// 'get' data from file for image data //
	$.getJSON("helpers/gallery.js", function(data) {
		gal = data.gallery;
	}) ;	

	 var current_loc;
	 getLocation();
	 // console.log(current_loc);
	 
	 



// =========== Function Definitions ============= //

/**
 * First looks for a HASHED value in incoming url
 * If a has value is present, opens correct tab.
 */
	function setTabs(){
		var hash;
		// Get hash value from url when page loads
		if (window.location.hash){
			hash = window.location.hash;
			hash = hash.substring(1);
			console.log("the hash is: "+hash);
		}
		else hash = 0;
		
		$('#funTabs').tabs({
			active: hash,
			hide: { effect: "blind", duration: 500 },
			show: { effect: "blind", duration: 500 },
			heightStyle: "fill"
		});
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
	        	default1_mapInit(latLng);
	        });
	    } else {

	    	latLng = { lat: 44.452030, lng: -73.112647};
	    	default1_mapInit(latLng);
	    }
	    return latLng;
	   	
	 
	}

	/**
	 * Starts a map with a passed location object
	 * @param  {[type]} loc [description]
	 * @return {[type]}     [description]
	 */
	function default1_mapInit(loc) {
		var mapOptions = {
			center: new google.maps.LatLng(loc.lat, loc.lng),
			zoom: 10
		};
		console.log(mapOptions);
		var indexMap = new google.maps.Map($('#index-map').get(0), mapOptions);
	}
	/**
	 * [img_mapInit description]
	 * @param  {[type]} loc An object containing a lat and lng
	 * @param {int} holds value of id of selected image
	 *  - use to build content string
	 */
	function img_mapInit(loc, i) {
		console.log(loc);
		var latLng = new google.maps.LatLng(loc.lat, loc.lng);
		var mapOptions = {
			center: latLng,
			zoom: 10,
			mapTypeId: "terrain"

		};
		var indexMap = new google.maps.Map($('#index-map').get(0), mapOptions);

		var contentString = "<p>Activity: "+gal.photo[i].activity+"</p>\
							<p>Name:  "+gal.photo[i].name+"</p>\
							<p>Description:  "+gal.photo[i].description+"</p>";

		var infoWindow = new google.maps.InfoWindow({
			content: contentString
		});
		var marker = new google.maps.Marker({position: latLng, map: indexMap})
		infoWindow.open(indexMap, marker);
		marker.addListener('click', function() {
			infoWindow.open(indexMap, marker);
		});
	}


	
// =========== End Function Definitions ========== //

	




	

	
	









});