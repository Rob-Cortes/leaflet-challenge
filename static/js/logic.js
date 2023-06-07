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

    L.geoJson(data, {

        style: function(feature) {
          return {
            color: "white",
            fillOpacity: 0.5,
            weight: 1.5,
            shape: 'circle'
          };
        }

      }).addTo(myMap);

});