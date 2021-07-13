// Section 13.5.3 - Map Multiple GeoJSON points

// -----------------------------------------------------------------------------
// Map Tile Layer; do this before accessing data so that map is graphed before data added
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Dark view tile layer 
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Create base layer to hold both above maps
let baseMaps = { Street: streets, Dark: dark};

// Create the map object with a center and zoom level.
let map=L.map('mapid', {
    center: [30, 30],
    zoom: 2,
    layers: [streets]  });

// Pass map layers into control and add control to map
L.control.layers(baseMaps).addTo(map);    

// Access the GeoJSON Airport data via URL
let airportData = "https://raw.githubusercontent.com/SG314159/Mapping_Earthquakes/main/majorAirports.json";

// Load data into GeoJSON layer
d3.json(airportData).then(function(data){
    console.log(data);
    L.geoJSON(data)
        .addTo(map);
});