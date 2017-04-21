<?PHP

$MYKEY = "142835cbaadac2335642c6615dd4d803";

$urlByLocation = "http://api.brewerydb.com/v2/locations/?key=".$MYKEY;
$urlByLatLng = "http://api.brewerydb.com/v2/search/geo/point?key=".$MYKEY;


if ($_GET['method'] == 'city') {
	$city = urlencode($_GET['info']);
	$newURL = $urlByLocation."&locality=".$city;
	$response = file_get_contents($newURL);
	echo $response;
}
else if($_GET['method'] == 'zip') {
	$zip = urlencode($_GET['info']);
	$newURL = $urlByLocation."&postalCode=".$zip;
	$response = file_get_contents($newURL);
	echo $response;
}
else if($_GET['method'] == 'auto') {
	$latlngArr = $_GET['info'];
	
	//print "<p>".$lng."   ".$lat."</p>";
	$newURL = $urlByLatLng."&lat=".$latlngArr[0]."&lng=".$latlngArr[1];
	$response = file_get_contents($newURL);
	echo $response;
}
else {print "Unable to process request";}

?>
