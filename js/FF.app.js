$(function(){
	// $('#that').click(function() {
	// 	alert(window.width());
	// });
// alert(window.innerWidth);
	// Initiate bxslider on index.php
	var index_slider = $('.bxSlider_index').bxSlider({
		mode: "fade",
		auto: true,
  		autoControls: true,
  		pause: 7000,
  		pager: false

	});

	$('#funTabs').tabs({
		active: 1
	});


});