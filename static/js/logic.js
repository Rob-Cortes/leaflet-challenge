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



// Fetch GeoJSON data
d3.json(url).then(function(data) {

    console.log(data);

    function createStyle(feature) {
      return {
        color: 'Orange',
        radius: feature.properties.mag*5,
        fillOpacity: feature.geometry.coordinates[2]/15
      }
    }
    
    // create a vector circle centered on each point feature's latitude and longitude
    function createCircles (feature, latlng) {
      return L.circleMarker(latlng, createStyle(feature))
    }
    
    // create an options object that specifies which function will called on each feature
    var myLayerOptions = {
      pointToLayer: createCircles
    }
    
    // create the GeoJSON layer from the myLayerData object (not shown in this snippet)
    L.geoJSON(data, myLayerOptions).addTo(myMap)

});