// Section 13.5.2 - Map GeoJSON

// Create the map object with a center and zoom level.
let map=L.map('mapid').setView([30, 30], 2);

// Add GeoJSON data.
let sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}  ]};

// Add GeoJSON data to map via geoJSON layer using pointToLayer
L.geoJSON(sanFranAirport, {
    // Make each feature into a marker on the map
    pointToLayer: function(feature, latlng){
        console.log(feature);
        return L.marker(latlng)
        .bindPopup("<h2>"+feature.properties.city+"</h2>");
    }
}).addTo(map);

// Alternate idea: Add GeoJSON data to map via geoJSON layer using onEachFeature
// L.geoJSON(sanFranAirport, {
//     onEachFeature: function(feature, layer){
//         console.log(layer);
//         layer.bindPopup();
//     }
// }).addTo(map);

// -----------------------------------------------------------------------------
// Map Tile Layer
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});


// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);