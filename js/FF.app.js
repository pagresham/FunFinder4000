$(function(){
	// $('#that').click(function() {
	// 	alert(window.width());
	// });
// alert(window.innerWidth);
	// Initiate bxslider on index.php
	
	setTabs();

	var index_slider = $('.bxSlider_index').bxSlider({
		mode: "fade",
		auto: true,
  		autoControls: true,
  		pause: 7000,
  		pager: false

	});

	
/**
 * First looks for a hashed value in incoming url
 * If a has value is present, opens correct tab.
 */
function setTabs(){
	var hash
	// Get hash value from url when page loads
	if (window.location.hash){
		hash = window.location.hash;
		hash = hash.substring(1)
		console.log("the hash is: "+hash)
	}
	else hash = 0;
	

	$('#funTabs').tabs({
		active: hash,
		hide: { effect: "blind", duration: 500 },
		show: { effect: "blind", duration: 500 },
		heightStyle: "fill"
	});
}





	 $('[data-toggle="tooltip"]').tooltip(); 


	


});