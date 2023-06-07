# leaflet-challenge
Visualization of US Geological Survey (USGS) data on natural hazards and climate trends.

# Data Loading
We fetch USGS' GeoJSON data for M2.5+ earthquakes by calling d3.json(url).then(function(data) {}) with url = https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson. 

# Adding Leaflet layers
After creating a leaflet map object, we add a base tile layer using openstreetmap.org. 

We then add a layer representing the earthquakes in the USGS data, by calling L.geoJSON(data, myLayerOptions).addTo(myMap). The second argument, myLayerOptions, defines the characteristics of each earthquake representation. myLayerOptions consists of a pointToLayer function, which creates and styles circle layers that represent each earthquake, and an onEachFeature function which binds a popup to each layer. 

## Adding legend
The CSS file contains formatting infrastructure for the legend, such as .legend {font: 14px Arial, Helvetica, sans-serif}. 

The Javascript file contains instructions for populating the legend. 
