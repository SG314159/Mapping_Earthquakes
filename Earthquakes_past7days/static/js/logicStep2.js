// Section 13.6.2 - Add style to data

// -----------------------------------------------------------------------------
// First Map tile layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Second tile layer 
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Create base layer to hold both above maps
let baseMaps = { "Streets": streets, "Satellite": satelliteStreets};

// Create the map object with a center and zoom level.
let map=L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]  });

// Pass map layers into control and add control to map
L.control.layers(baseMaps).addTo(map);    

// Access the GeoJSON Airport data via URL
let usgs_Url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Load data into GeoJSON layer
d3.json(usgs_Url).then(function(data){
    console.log(data);

    // Style for each earthquake. Calls getRadius function.
    function styleInfo(feature){
        return { opacity: 1,
            fillOpacity: 1,
            fillColor: "#ffae42",
            color: "#000000",
            radius: getRadius(feature.properties.mag),  
            stroke: true,
            weight: 0.5 }; }

    // Determine radius of marker based on earthquake magnitude. 
    function getRadius(magnitude){
        if (magnitude == 0) {
            return 1; }  
        // otherwise:
        return magnitude * 4;  }


    // Create GeoJSON layer with data. Turn each feature into circleMarker.
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            console.log(feature);
            return L.circleMarker(latlng); },
        style: styleInfo    
        
    }).addTo(map);
});
