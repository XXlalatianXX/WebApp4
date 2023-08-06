/*
this class can be used to add baseMap gallary to div container by setting two parameters such as 
@map : the currently map.
@baseMapDiv : the div id which is the container.

For example code:

	var basemapGallery = new OnlineBaseMapGallery(map,"basemapGallery");
*/

define([ 
  "dojo/_base/declare",
  "esri/dijit/BasemapGallery"
], 
function(
	declare,
	BasemapGallery) 
{
    return declare([], 
	{
      baseMapDiv: null,
	  basemapGallery:null,
	  map:null,
	  	  
      constructor: function(map,baseMapDiv)
	  {
	    //Initializing parameters
		this.map = map;
		this.baseMapDiv= baseMapDiv;
		
		// adding measurement tools to div container
		this.addBasemapGallery();
      },

      addBasemapGallery: function() 
	  {
        this.basemapGallery = new BasemapGallery({ showArcGISBasemaps: true, map: this.map }, this.baseMapDiv);
		this.basemapGallery.startup();
      }
    });
});