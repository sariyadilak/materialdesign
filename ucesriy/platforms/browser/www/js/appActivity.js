function addFeature(){
// add a point
L.marker([51.5, -0.09]).addTo(mymap).bindPopup("<b>Hello world!</b><br />I am a popup.").openPopup();
// add a circle
L.circle([51.508, -0.11], 500, {color: 'red',fillColor: '#f03',fillOpacity: 0.5}).addTo(mymap).bindPopup("I am a circle.");
// add a polygon with 3 end points (i.e. a triangle)
var myPolygon = L.polygon([[51.509, -0.08],[51.503, -0.06],[51.51, -0.047]],{color: 'red',fillColor: '#f03',fillOpacity: 0.5}).addTo(mymap).bindPopup("I am a polygon.");}	
	
	var client;
	// and a variable that will hold the layer itself – we need to do this outside the function so that we use it to remove the layer later on
	var earthquakelayer;
	// create the code to get the Earthquakes data using an XMLHttpRequest
	function getEarthquakes(){
		client = new XMLHttpRequest();
		client.open('GET','https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson');
		client.onreadystatechange = earthquakeResponse;
		client.send();
	}
	// create the code to wait for the response from the data server, and process the response once it is received
	function earthquakeResponse(){
	if(client.readyState == 4){
		var earthquakedata = client.responseText;
		loadEarthquakelayer(earthquakedata);
		}
	}
	// convert the received data - which is text - to JSON format and add it to the map
	function loadEarthquakelayer(earthquakedata){
	var earthquakejson = JSON.parse(earthquakedata);
	earthquakelayer=L.geoJson(earthquakejson).addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(earthquakelayer.getBounds());
	}

		// load the map
		var mymap = L.map('mapid').setView([51.505, -0.09], 13);
		// load the tiles
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {maxZoom: 18,attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +'Imagery © <a href="http://mapbox.com">Mapbox</a>',id: 'mapbox.streets'}).addTo(mymap);
		var testMarkerRed = L.AwesomeMarkers.icon({
			icon:'play',
			markerColor:'red'
		});
		var testMarkerPink = L.AwesomeMarkers.icon({
			icon:'play',
			markerColor:'pink'
		});
		//customise the loadEarthquakelayer method in the header to use custom icons
		function loadEarthquakelayer(earthquakedata){
			//convert the text received from the server to JSON
			var earthquakejson = JSON.parse(earthquakedata);
			// load the geoJSON layer
			var earthquakelayer = L.geoJson(earthquakejson,
				{
				// use point to layer to create the points
				pointToLayer:function(feature,latlng)
				{
				// look at the GeoJSON file - specifically at the properties - to see the earthquake magnitude use a different marker depending on this value
				// also include a pop-up that shows the place value of the earthquakes
				if (feature.properties.mag > 1.75) {
					return L.marker(latlng, {icon:testMarkerRed}).bindPopup("<b>"+feature.properties.place+"</b>");
				}
				else {
				// magnitude is 1.75 or less
				return L.marker(latlng, {icon:testMarkerPink}).bindPopup("<b>"+feature.properties.place+"</b>");;
				}
				},
				}).addTo(mymap);
			mymap.fitBounds(earthquakelayer.getBounds());
			}
			
	var busstoplayer;
	function getBusstops(){
		client = new XMLHttpRequest();
		client.open('GET','http://developer.cege.ucl.ac.uk:31281/busstops.geojson');
		client.onreadystatechange = busstopResponse;
		client.send();
	}
	// create the code to wait for the response from the data server, and process the response once it is received
	function busstopResponse(){
	if(client.readyState == 4){
		var busstopdata = client.responseText;
		loadBusstoplayer(busstopdata);
		}
	}
	// convert the received data - which is text - to JSON format and add it to the map
	function loadBusstoplayer(busstopdata){
	var busstopjson = JSON.parse(busstopdata);
	busstoplayer=L.geoJson(busstopjson).addTo(mymap);
	// change the map zoom so that all the data is shown
	mymap.fitBounds(busstoplayer.getBounds());
	}

function trackLocation() {
if (navigator.geolocation) {
	navigator.geolocation.watchPosition(showPosition);
} else {
	document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
	}
}
function showPosition(position) {
	L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup(position.coords.latitude.toString()+"," +position.coords.longitude.toString()).openPopup();
	mymap.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude), 13)
}
function removeEarthquakeData(){
					alert("remove the earthquake data here");
			}
			// make sure that there is a variable for the earthquake layer to be referenced by
			// this should be GLOBAL – i.e. not inside a function – so that any code can see the variable
			var earthquakelayer;
			function removeEarthquakeData(){
					alert("Earthquake data will be removed");
					mymap.removeLayer(earthquakelayer);
			}
function getDistance() {
alert('getting distance');
// getDistanceFromPoint is the function called once the distance has been found
navigator.geolocation.getCurrentPosition(getDistanceFromPoint);
}
function getDistanceFromPoint(position) {
// find the coordinates of a point using this website:
// these are the coordinates for Warren Street
var lat = 51.524616;
var lng = -0.13818;
// return the distance in kilometers
var distance = calculateDistance(position.coords.latitude, position.coords.longitude, lat,lng, 'K');
L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup("Distance to Warren Street:"+" "+distance.toString()+"Kilometers").openPopup();
}

function calculateDistance(lat1, lon1, lat2, lon2, unit) {
var radlat1 = Math.PI * lat1/180;
var radlat2 = Math.PI * lat2/180;
var radlon1 = Math.PI * lon1/180;
var radlon2 = Math.PI * lon2/180;
var theta = lon1-lon2;
var radtheta = Math.PI * theta/180;
var subAngle = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
subAngle = Math.acos(subAngle);
subAngle = subAngle * 180/Math.PI; // convert the degree value returned by acos back to degrees from radians
dist = (subAngle/360) * 2 * Math.PI * 3956; // ((subtended angle in degrees)/360) * 2 * pi * radius )
// where radius of the earth is 3956 miles
if (unit=="K") { dist = dist * 1.609344 ;} // convert miles to km
if (unit=="N") { dist = dist * 0.8684 ;} // convert miles to nautical miles
return dist;
}

		// load the map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
		// load the tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {maxZoom: 18,attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +'Imagery © <a href="http://mapbox.com">Mapbox</a>',id: 'mapbox.streets'}).addTo(mymap);
		//add the code that will load the data after the page has loaded


