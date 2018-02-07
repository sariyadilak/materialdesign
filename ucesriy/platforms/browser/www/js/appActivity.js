		// load the map
				var mymap = L.map('mapid').setView([51.505, -0.09], 13);

				// load the tiles
		L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {maxZoom: 18,attribution: 'Map data &copy; <ahref="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +'Imagery © <a href="http://mapbox.com">Mapbox</a>',id: 'mapbox.streets'}).addTo(mymap);
				//create a geoJson feature-
				var geojsonFeature = {"type":"Feature","properties":{"name":"London","popupContent":"This is where UCL is based"},"geometry":{"type":"Point","coordinates":[-0.134040,51.524559]}};
				//create the custom Marker icon
				var testMarkerPink = L.AwesomeMarkers.icon({icon:'play',markerColor:'pink'});
				//and add it to the map
				L.geoJSON(geojsonFeature,{pointToLayer:function(feature,latlng){return L.marker(latlng,{icon:testMarkerPink});}}).addTo(mymap).bindPopup("<b>"+geojsonFeature.properties.name+""+geojsonFeature.properties.popupContent+"<b>");
				//create a custom popup
				var popup = L.popup();
				//create an event detector to wait for the user's click event and then use the popup to show them where they clicked
				function onMapClick(e){
							popup
									.setLatLng(e.latlng)
									.setContent("You clicked the map at"+e.latlng.toString())
									.openOn(mymap);
				}
				
				//now add the click event detector to the map
				mymap.on('click',onMapClick);