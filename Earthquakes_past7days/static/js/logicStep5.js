// Section 13.6.5 - Add Legend

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

// Create the earthquake layer group and overlay objects.
let earthquakes = new L.layerGroup();
let overlays = { Earthquakes: earthquakes }; // Name as appears on webpage is on the left


// Create the map object with a center and zoom level.
let map=L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3,
    layers: [streets]  });

// Pass map layers into control and add control to map
L.control.layers(baseMaps, overlays).addTo(map);    

// Access the GeoJSON Airport data via URL
let usgs_Url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Load data into GeoJSON layer
d3.json(usgs_Url).then(function(data){
    console.log(data);

    // Style for each earthquake. Sends magnitude via functions to get fillColor and radius.
    function styleInfo(feature){
        return { opacity: 1,
            fillOpacity: 1,
            fillColor: getColor(feature.properties.mag),
            color: "#000000",
            radius: getRadius(feature.properties.mag),  
            stroke: true,
            weight: 0.5 }; }

    // Determine color of marker based on earthquake magnitude.
    function getColor(magnitude){
        if (magnitude > 5) { return "#ea2c2c"; }
        if (magnitude > 4) { return "#ea822c"; }
        if (magnitude > 3) { return "#ee9c00"; }
        if (magnitude > 2) { return "#eecc00"; }
        if (magnitude > 1) { return "#d4ee00"; }
        return "#98ee00";  }

    // Determine radius of marker based on earthquake magnitude. 
    function getRadius(magnitude){
        if (magnitude == 0) {
            return 1; }  
        // otherwise:
        return magnitude * 4;  }


    // Create GeoJSON layer with data markers. Add styling and popups.
    L.geoJSON(data, {
        pointToLayer: function(feature, latlng) {
            //console.log(feature);
            return L.circleMarker(latlng); },
        
        style: styleInfo,

        onEachFeature: function(feature, layer){
            layer.bindPopup("Magnitude: "+feature.properties.mag+"<br>Location: "+feature.properties.place);}

    }).addTo(earthquakes);

    earthquakes.addTo(map);

    // Create color legend
    let legend = L.control({ position: 'bottomright'});
    legend.onAdd = function(){
        let div = L.DomUtil.create("div", "info legend");  // adds div elmt 
        const magnitudes = [0,1,2,3,4,5];
        const colors = ["#98ee00", "#d4ee00", "#eecc00", "#ee9c00", "#ea822c", "#ea2c2c"];
        // Add labels to colored squares
        for (var i=0; i<magnitudes.length; i++){
            console.log(colors[i]);
            div.innerHTML += "<i style='background: " + colors[i] + "'></i> " + 
                magnitudes[i] + (magnitudes[i + 1] ? "&#8211;" + magnitudes[i + 1] + "<br>" : "+");
            }
        return div;
    };
    legend.addTo(map);
});

