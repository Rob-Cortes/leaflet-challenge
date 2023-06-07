// USGS UrL
let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson';

// Create map object
let myMap = L.map("map", {
    center: [35, -110],
    zoom: 6
  });

// Add tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

let geojson;

// Fetch GeoJSON data
d3.json(url).then(function(data) {

    console.log(data);
    function chooseColor(depth) {
      if (depth < 1) return "yellow";
      else if (depth < 3) return "gold";
      else if (depth < 5) return "orange";
      else if (depth < 7) return "darkorange";
      else if (depth < 9) return "firebrick";
      else return "darkred";
    };

    function createStyle(feature) {
      return {
        color: chooseColor(feature.geometry.coordinates[2]),
        radius: feature.properties.mag*5,
        fillOpacity: 1
      }
    };
    
    // create a vector circle centered on each point feature's latitude and longitude
    function createCircles (feature, latlng) {
      return L.circleMarker(latlng, createStyle(feature))
    };
    
    // create an options object that specifies which function will called on each feature
    var myLayerOptions = {
      pointToLayer: createCircles,
      // This is called on each feature.
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<h1>" + feature.properties.place + "</h1> <hr> <h3>Mag: " + feature.properties.mag + "</h3><h3>Depth: " + feature.geometry.coordinates[2] + "</h3><h3>Time: " + new Date(feature.properties.time) + "</h3>");
      }
    };
    // create the GeoJSON layer from the myLayerData object (not shown in this snippet)
    geojson = L.geoJSON(data, myLayerOptions).addTo(myMap);

});