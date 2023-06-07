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

  // Define a function to choose the color of the circles that represent each earthquake
    function chooseColor(depth) {
      if (depth < 1) return "yellow";
      else if (depth < 3) return "gold";
      else if (depth < 5) return "orange";
      else if (depth < 7) return "darkorange";
      else if (depth < 9) return "firebrick";
      else return "darkred";
    };

    // Define a function to style the color, radius, and opacity of circles representing each earthquake
    function createStyle(feature) {
      return {
        color: chooseColor(feature.geometry.coordinates[2]),
        radius: feature.properties.mag*5,
        fillOpacity: 1
      }
    };
    
    // Define a function that adds the circles representing each earthquake 
    function createCircles (feature, latlng) {
      return L.circleMarker(latlng, createStyle(feature))
    };
    
    // Create an options object detailing the function called on each feature
    let myLayerOptions = {
      pointToLayer: createCircles,
      // This is called on each feature.
      onEachFeature: function(feature, layer) {
        layer.bindPopup("<h1>" + feature.properties.place + "</h1> <hr> <h3>Mag: " + feature.properties.mag + "</h3><h3>Depth: " + feature.geometry.coordinates[2] + "</h3><h3>Time: " + new Date(feature.properties.time) + "</h3>");
      }
    };
    // Create the GeoJSON layer from the myLayerData object
    L.geoJSON(data, myLayerOptions).addTo(myMap);

    // Legend set up
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function() {
      let div = L.DomUtil.create("div", "info legend");
      let labels = ['<strong>Depth</strong>']
      let categories = ['<1','1-3','3-5','5-7','7-9', '>9'];
      
      function getLabelColor(category) {
        if (category == '<1') return "yellow";
        else if (category == '1-3') return "gold";
        else if (category == '3-5') return "orange";
        else if (category == '5-7') return "darkorange";
        else if (category == '7-9') return "firebrick";
        else return "darkred";
      };

      for (let i = 0; i < categories.length; i++) {
        labels.push("<li style=\"background-color: " + getLabelColor(categories[i]) + "\"></li>" + categories[i])
      };
      div.innerHTML += "<ul>" + labels.join("<br>") + "</ul>";

      return div;
    };
    legend.addTo(myMap);
});