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

    // Function that returns a radius for pointToLayer given the magnitude of an earthquake from a geofeature. 
    function getRadius(magnitude) {
      let magn = parseInt(magnitude);
      if (magn >= 2.5 && magn < 3.5) return 25000;
      else if (magn >= 3.5 && magn < 4.5) return 40000;
      else if (magn >= 4.5 && magn < 5.5) return 55000;
      else if (magn >= 5.5 && magn < 6.5) return 70000;
      else if (magn >= 6.5 && magn <= 10) return 90000;
      else return 13000;
    };

    //Function that returns a color code for a pointToLayer given the depth of an earthquake.
    function getColor(Depth) {
      let eDepth = parseInt(Depth);
      if (eDepth < 10) return "#33FF3F";
      else if (eDepth >= 10 && eDepth < 30) return "#F7DC6F";
      else if (eDepth >= 30 && eDepth < 50) return "#F1C40F";
      else if (eDepth >= 50 && eDepth < 70) return "#F39C12";
      else if (eDepth >= 70 && eDepth < 90) return "#FF6E33";
      else if (eDepth >= 90) return "red";
    };


    // Create a GeoJSON layer that contains the features array on the earthquakeData object.
    // Run the onEachFeature function once for each piece of data in the array.
    let earthquakes = new L.geoJSON(earthquakeData, {
      pointToLayer: (feature, latlng) => {
        return new L.Circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]],  {
          radius: getRadius(feature.properties.mag),
          fillColor: getColor(feature.geometry.coordinates[2]),
          color: "#F9E79F",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8
        });
    },
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

    let USGS_Topo = USGS_USImagery = L.tileLayer('https://basemap.nationalmap.gov/arcgis/rest/services/USGSImageryOnly/MapServer/tile/{z}/{y}/{x}', {
      maxZoom: 20,
      attribution: 'Tiles courtesy of the <a href="https://usgs.gov/">U.S. Geological Survey</a>'
    });

    let Stadia_AlidadeSmoothDark = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
      minZoom: 0,
      maxZoom: 20,
      attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      ext: 'png'
    });
    
    // Create a baseMaps object.
    let baseMaps = {
      "Topo Map": topo,
      "USGS Topo Map": USGS_Topo,
      "Stadia Map": Stadia_AlidadeSmoothDark
    };

      
    // Create our map, giving it the topo map and earthquakes layers to display on load.
    let myMap = L.map("map", {
      center: [
        37.09, -95.71
      ],
      zoom: 6,
      layers: [topo, earthquakes]
    });

    
    let tectonic = L.geoJSON(fetch('Leaflet-Part-2/static/js/PB2002_boundaries.json').json, {
      style: function (feature) {
              return {
                color: 'brown', // Customize the color of the tectonic lines
                weight: 1,    // Set the line weight
              };
    }}).addTo(myMap);
  
     
    // Create an overlay object to hold our overlay.
   let overlayMaps = {
    Earthquakes: earthquakes,    
    TectonicLines: tectonic
    };
      


    
    // Create a layer control.
    // Pass it our baseMaps and overlayMaps.
    // Add the layer control to the map.
    L.control.layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(myMap);


       // Create a custom legend control
       let legend = L.control({position: "bottomright"});

       // Define the onAdd method to create the legend content
       legend.onAdd = function () {
       let div = L.DomUtil.create("div", "legend");
  
      // Add legend content (e.g., colors and labels)
       div.innerHTML = '<h4>Legend for Markers</h4>' +
           '<li style=\"background-color:  #33FF3F\"> Eathquake Depth: < 10 <br> </li>' +
           '<li style=\"background-color:  #F7DC6F\"> Eathquake Depth: 10 - 30 <br> </li>'+
           '<li style=\"background-color:  #F1C40F\"> Eathquake Depth: 30 - 50 <br> </li>'+
           '<li style=\"background-color:  #F39C12\"> Eathquake Depth: 50 - 70 <br> </li>' +
           '<li style=\"background-color:  #FF6E33\"> Eathquake Depth: 70 - 90 <br> </li>'+
           '<li style=\"background-color:  red\"> Eathquake Depth: 90+ </li>'
  
       return div;
       };
  
      // Add the legend control to the map
       legend.addTo(myMap);


  };


    

