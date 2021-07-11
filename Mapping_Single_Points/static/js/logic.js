// Section 13.4.1 - Mapping a Single Point

// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map=L.map('mapid').setView([34.0522, -118.2437], 14);

// -----------------------------------------------------------------------------
// Map Tile Layer
//  Add a marker to the map for Los Angeles, California.
// let marker = L.marker([34.0522, -118.2437]).addTo(map); // Blue location teardrop
// Below adds a circle with 100m radius over LA.
// L.circle([34.0522, -118.2437], { radius: 100 }).addTo(map);

// Another way to add circle. This time light-yellow with black line; 300-pixel radius
L.circleMarker([34.0522, -118.2437], {
    radius: 300,
    color: "black",
    fillColor: '#ffffa1'
}).addTo(map);

let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);