// Section 13.4.1 - Mapping a Single Point

// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
// This assigns the variable name map to the object L.map instantiated with the given string 'mapid'
// mapid references the id tag in the <div> element
// setView() puts center at lat 40.7, long -94.5 with zoom level 4 (on scale of 0-18)
let map=L.map('mapid').setView([40.7, -94.5], 4);
// alternate way to create this same object. Useful when need to add multiple tile layers or a background image
// let map = L.map("mapid", {
//     center: [
//       40.7, -94.5
//     ],
//     zoom: 4
//   });

// -----------------------------------------------------------------------------
// Map Tile Layer
// Option 1: Use Leaflet documentation; Option 2: Use Mapbox Styles API
// Will use option 2 for module but code for Option 1 part of exercise
// Option 1: Use Leaflet documentation and tileLayer() code
    // Create the tile layer that will be the background of map.
    // let streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    //     attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //     maxZoom: 18,
    //     id: 'mapbox/streets-v11',
    //     tileSize: 512,
    //     zoomOffset: -1,
    //     accessToken: API_KEY
    // });

// Option 2: Use Mapbox styles API
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);