// Perform a GET request to the query URL/
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.geojson").then(function (data) {
    // Once we get a response, send the data.features object to the createFeatures function.
    createFeatures(data.features);
  });
  
  function createFeatures(earthquakeData) {
  
    // Define a function that we want to run once for each feature in the features array.
    // Give each feature a popup that describes the place and magnitude of the earthquake.
    function onEachFeature(feature, layer) {
          
      let geojsonFeature = {
        "type": "Feature",
        "properties": {
            "name": `${feature.properties.place}`,
            "popupContent": `<h3>${feature.properties.place}</h3><hr><p> Earthquake Magnitude: ${feature.properties.mag}</p>`
        },
        "geometry": {
            "type": "Point",
            "coordinates": [feature.geometry.coordinates[0], feature.geometry.coordinates[1]]
        }
      };
      layer.bindPopup(geojsonFeature.properties.popupContent);
    
    };


 
    

 
    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    let earthquakes = L.geoJSON(earthquakeData, {
      onEachFeature: onEachFeature
    });

  
    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
  };

  
  function createMap(earthquakes) {
  
    // Create the base layers.
    let topo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
      attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
    });
  
    
    // Create a baseMaps object.
    let baseMaps = {
      "Topo Map": topo,
    };
  
    // Create an overlay object to hold our overlay.
    let overlayMaps = {
      Earthquakes: earthquakes
    };
  
    // Create our map, giving it the topo map and earthquakes layers to display on load.
    let myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 6,
      layers: [topo, earthquakes]
    });
  
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);
  
  }


    

