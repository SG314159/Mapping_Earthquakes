// Section 13.4.3 - Map Lines

// Create the map object with a center and zoom level.
let map=L.map('mapid').setView([36.1733, -120.1794], 5);

// Add line from Los Angeles to San Franciso
let line = [ [33.9416, -118.4085], [37.6213, -122.3790], [40.7899, -111.9791],
    [47.4502, -122.3088] ];
L.polyline(line, {
    color: "yellow"}).addTo(map);

// -----------------------------------------------------------------------------
// Map Tile Layer
let cityData = cities; 

// Loop through cities array and create marker for each city.
// Include pop-up marker with name and population. toLocaleString adds comma in population
cityData.forEach(function(city){
    console.log(city);
    L.marker(city.location)  // circleMarker makes radius equal to population/(100K).
    // L.circleMarker(city.location, {
    //     radius: city.population/100000})
    .bindPopup("<h2>"+city.city+", "+city.state+"</h2><hr><h3>Population "+city.population.toLocaleString()+"</h3>")
    .addTo(map);
})


let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);