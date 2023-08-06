
define([ 
  "dojo/_base/declare",
  "esri/dijit/Legend",
  "dojo/dom",
  "dojo/on",
  "dojo/_base/lang",
  "dojo/domReady!"
], 
function(
	declare,
	Legend,
	dom,
	on,
	lang
	) 
{
    return declare([], {
	  Layers:null,
  
      constructor: function(map,Layers,divContainer)
	  {
	    // Initializing parameter
		this.Layers =  Layers;
		
		//Add legend to container
		var legendLayers = [];
		for(var i = 0; i < this.Layers.length; i++)
		{
			var item = this.Layers[i];						
			legendLayers.push({ layer: item[0], title: item[2] });
		}

		map.on('layers-add-result', function () 
		{
          var legend = new Legend({ map: map, layerInfos: legendLayers},divContainer);
          legend.startup();
        });
      }
  });
});