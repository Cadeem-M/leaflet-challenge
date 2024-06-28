# leaflet-challenge

<p align="center">
<img src="Images\1-Logo.png" width="900px">
</p>

The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. I have been tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

I have been given access to earthquake data that recorded a magnitude of 2.5+ data over the last month. With this data, I will be creating a map that marks the earthquake location and provides information regarding it depth and magnitude such as in the image below.

Full access to the app at: https://cadeem-m.github.io/leaflet-challenge/

<p align="center">
<img src="Images\Map_demo.png" width="700px">
</p>

## Introduction
This application will have 2 javascripts that can be ran to generate mapping visualization. By default, logic.js from the folder leaflet-part-1 will be ran and generate its visualizations. 

<p align="center">
<img src="Images\leaflet_p1.png" width="550px">
</p>

It will provide a basic topographic map that marks the earthquake locations. However, by commenting out the first script and enabling logic2.js, a second, more detailed map will be generated that allows for the user to alternate between various map visualizations.

<p align="center">
<img src="Images\leaflet_p2.png" width="550px">
</p>

The new map that will populate should have options to alternate between a basic Topo map, a USGS topographic map, and a map provided via Stadia. Also, users will have the option to include tectonic plate lines on the map that they choose.

<p align="center">
<img src="Images\part2_map_done.png" width="600px">
</p>


## How the app works
This app uses D3 library and leaflet to generate its map in a web browser.


## Credits and closing
There were a number of roadblocks in this challenge. Many of them relied experimenting with how to combine leaflet documentation on seperate tasks. One error that came up that left me completely stuck when i was trying to generate markers was:

"leaflet error: this.callInitHooks is not a function error?"

Falke Design in a stackoverflow forumn help me realized a documentation era in my code when calling L.marker().
https://stackoverflow.com/questions/61512240/leaflet-error-this-callinithooks-is-not-a-function-error-- Falke Design

Another challenge I faced was generating tectonic plates in part 2 of the assignment. Using Xpert Learn Assistant, I was directed to https://github.com/fraxen/tectonicplates to download the GeoJson data of the data. Unfortunately even with the XLA providing a code snippet to generate the lines on my map, I could not get it to run correctly. With modifications to the code I ended up with two scenarios. 

Scenario 1 the tectonic lines would appear on the map but the layer control options would dissapear:

<p align="center">
<img src="Images\Scenario1.png" width="500px">
</p>

<p align="center">
<img src="Images\part2_withline.png" width="600px">
</p>

And scenario 2, the layer control would be visible but it would not generate the tectonic line when the option is selected:

<p align="center">
<img src="Images\scenario2.png" width="500px">
</p>

<p align="center">
<img src="Images\part2_noline.png" width="600px">
</p>
 

 Lastly, I also ran into an issue generating the legends for my map. I was not sure how to incorporate the example we did in class into my map exactly how it was done because I had taken a different approach in generating my map up to that point and did not want to undo my efforts just to copy the code did in class. After improvising, I was left with a legend thats interesting in idea but its execution could be improved.


## Update
Managed to get part2 of the challenge to work. thanks to Xpert Learning Assistant, I managed to find the proper documentations and reach the code below. Now my maps are working.

<p align="center">
<img src="Images\corrected_code.png" width="500px">
</p>
