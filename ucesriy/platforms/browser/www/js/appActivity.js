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

function trackLocation() {
if (navigator.geolocation) {
	navigator.geolocation.watchPosition(showPosition);
} else {
	document.getElementById('showLocation').innerHTML = "Geolocation is not supported by this browser.";
	}
}
function showPosition(position) {
	L.marker([position.coords.latitude, position.coords.longitude]).addTo(mymap).bindPopup("<b>"position.coords.latitude, position.coords.longitude"<b>").openPopup();
	mymap.panTo(new L.LatLng(position.coords.latitude, position.coords.longitude), 13)
}
		// load the map
var mymap = L.map('mapid').setView([51.505, -0.09], 13);
		// load the tiles
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {maxZoom: 18,attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +'Imagery © <a href="http://mapbox.com">Mapbox</a>',id: 'mapbox.streets'}).addTo(mymap);
		//add the code that will load the data after the page has loaded


