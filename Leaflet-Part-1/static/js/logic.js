//mapMark is a function that takes a list of cordinates and adds pop ups
//  to "map" at those coordinates

function mapMark(emptyList, geolist, depthList, nameList, magnitudeList) {
    for (let i in geolist) {
       let eqmarker =  L.marker([geolist[i][1], geolist[i][0]]).bindPopup(`<b>${nameList[i]}
        </b><br> Earthquake Magnitude: ${magnitudeList[i]}`);

       emptyList.push(eqmarker);
    }

    L.control.layers(emptyList).addTo(map);
    
};


// Retrieving earthquake information of magnitutude 4.5+ over the last month. 
function CreateMarkers(response) {
        //Retrieving list of earthquakes from the data
        let quakesList = response.features;

        //Creating lists to hold cordinates, earthquake depth, name of location earthquake happened,
        //   and magnitude of the earthquake 
        let quakeCoords = [];
        let depthCoords = [];
        let locateList = [];
        let magList = [];

        //Looping through quakesList and storing geo cordinates in 
        for (let quake of quakesList) {
            quakeCoords.push([quake.geometry.coordinates[0],
                             quake.geometry.coordinates[1]]);
            depthCoords.push(quake.geometry.coordinates[2]);
            locateList.push(quake.properties.place);
            magList.push(quake.properties.mag);
        };

        // initializing map base using first data entry as set view
        let map = L.map("map").setView([quakeCoords[0][1],quakeCoords[0][0]], 4);

        L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
	    attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
	    maxZoom: 16
        }).addTo(map);

        // Creating an empty list to hold layers
        layers = []

        mapMark(layers, quakeCoords, depthCoords, locateList, magList);
    }
);
       

// Perform an API call to the Citi Bike API to get the station information. Call createMarkers when it completes
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson").then(CreateMarkers);


    

