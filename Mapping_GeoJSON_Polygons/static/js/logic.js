// Section 13.5.6 - GeoJSON Polygons

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
let baseMaps = { "Streets": streets, "Satellite Streets": satelliteStreets};

// Create the map object with a center and zoom level.
let map=L.map('mapid', {
    center: [43.7, -79.3],
    zoom: 11,
    layers: [satelliteStreets]  });

// Pass map layers into control and add control to map
L.control.layers(baseMaps).addTo(map);    

// Access the GeoJSON Airport data via URL
let torontoHoods = "https://raw.githubusercontent.com/SG314159/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Load data into GeoJSON layer
d3.json(torontoHoods).then(function(data){
    console.log(data);
    L.geoJSON(data).addTo(map);
});