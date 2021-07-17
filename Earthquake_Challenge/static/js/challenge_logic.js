// Earthquake Challenge for Module 13

// Three tileLayers that form the backgrounds of the map.
// User selects one of three layes via radio button. 
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create map object with center, zoom level and default layer. Create base layer of 3 maps.
let map = L.map('mapid', {
	center: [6.3156, 10.8074],
	zoom: 3,
	layers: [streets]
});
let baseMaps = {"Streets": streets,  "Satellite": satelliteStreets,  "Dark View": dark };



// Layer Groups for the overlays
let allEarthquakes = new L.LayerGroup();
let allPlates = new L.LayerGroup();
let majorQuakes = new L.LayerGroup();
let overlays = {
  "All Earthquakes": allEarthquakes,
  "Tectonic Plates": allPlates,
  "Major Earthquakes": majorQuakes
};

// Map control to allow user to change which layers are visible.
L.control.layers(baseMaps, overlays).addTo(map);


// Layer 1: All Earthquakes. 
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {

  // Returns style data; pass the magnitude to calculate the color and radius.
  function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

  // Determines the color of the marker based on the magnitude of the earthquake.
  function getColor(magnitude) {
    if (magnitude > 5) { return "#ea2c2c";    }
    if (magnitude > 4) { return "#ea822c";    }
    if (magnitude > 3) { return "#ee9c00";    }
    if (magnitude > 2) { return "#eecc00";    }
    if (magnitude > 1) { return "#d4ee00";    }
    return "#98ee00";  }

  // This function determines the radius of the earthquake marker based on its magnitude.
  function getRadius(magnitude) {
    if (magnitude === 0) { return 1;    }
    return magnitude * 4;
  }

  L.geoJson(data, {
    	pointToLayer: function(feature, latlng) {
      		//console.log(data);
      		return L.circleMarker(latlng);},
      style: styleInfo,
     // Create a popup for each circleMarker to display the magnitude and location of the earthquake
     //  after the marker has been created and styled.
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
  }).addTo(allEarthquakes);
  allEarthquakes.addTo(map);



// Legend control object
let legend = L.control({ position: "bottomright" });
legend.onAdd = function() {
  let div = L.DomUtil.create("div", "info legend");
  const magnitudes = [0, 1, 2, 3, 4, 5];
  const colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"];
  for (var i = 0; i < magnitudes.length; i++) {
    //console.log(colors[i]);
    div.innerHTML += "<i style='background: " + colors[i] + "'></i> " +
      magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }  // label with a colored square for each interval.
    return div;
  };
  legend.addTo(map);


  // Use d3.json to make a call to get our Tectonic Plate geoJSON data.
  d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then( 
    function(data) {
      //console.log(data);
      L.geoJson(data, {
        style: function(feature){
          return{ color: "purple", weight: 2 };}
      }).addTo(allPlates);
      // draw plates on map
      allPlates.addTo(map);
  });

  // Use d3.json to retrieve GeoJSON summary feed
  d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_week.geojson").then(
    function(data){
      console.log(data);
  
    // Returns style data; pass the magnitude to calculate the color and radius.
    function styleInfo(feature) {
      return {opacity: 1, fillOpacity: 1, fillColor: getColor(feature.properties.mag),
          color: "#000000", radius: getRadius(feature.properties.mag), stroke: true, weight: 0.5};
      }

    // Determines the color of the marker based on the magnitude of the earthquake.
    function getColor(magnitude) {
      if (magnitude > 6) { return "#750202";    } // darker red than in 5+ for stronger
      if (magnitude > 5) { return "#ea2c2c";    } // same colors as for all earthquakes
      return "#ea822c";  }

    // This function determines the radius of the earthquake marker based on its magnitude.
    // Earthquakes with a magnitude of 0 were being plotted with the wrong radius.
    function getRadius(magnitude) {
      if (magnitude === 0) { return 1;    }
      return magnitude * 4;  }


    L.geoJson(data, {
    	pointToLayer: function(feature, latlng) {
      		return L.circleMarker(latlng);},
      style: styleInfo,
      onEachFeature: function(feature, layer) {
        layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
  } ).addTo(majorQuakes);
      // draw major quakes on map
      majorQuakes.addTo(map);
    });


});