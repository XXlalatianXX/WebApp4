/*
This class can be used to automatically add dynamic services and automatically set layers control.
There are three parameters for constructor such as
@map : the currently map.
@Services : json format that contain raster dynamic services information.
@divContainer : the div container that layers control will be contain in. 

For example code.

var Services = [
		{"ServiceName":"Map5000","Label":"แผนที่ 1:50000","isShow":"", "URL": "http://119.63.67.51/ArcGIS/rest/services/Topo/ThailandMap50000/MapServer"},
		{"ServiceName":"A3","Label":"ภาพ A3","isShow":"checked", "URL":"http://119.63.67.51/ArcGIS/rest/services/Raster/SN_A3_2014/MapServer"},
		{"ServiceName":"Roads","Label":"ถนน","isShow":"", "URL":"http://119.63.67.51/ArcGIS/rest/services/Vector/Roads/MapServer"}
];
var dynamicservices = new DynamicMapServiceLayers(map,Services,"RtafLayers");

*/

define([ 
  "dojo/_base/declare",
  "esri/layers/ArcGISDynamicMapServiceLayer",
  "esri/layers/ImageParameters",
  "dojo/dom",
  "dojo/on",
  "dojo/_base/lang"
], 
function(
	declare,
	ArcGISDynamicMapServiceLayer,
	ImageParameters,
	dom,
	on,
	lang
	) 
{
    return declare([], {
	  map:null,
      jsonTiledMapServices: null,
	  Layers:null,
	  divContainer:null,
      constructor: function(map,json,divContainer)
	  {
	    // Initializing parameters.
		this.map = map;
		this.jsonTiledMapServices = json;
		this.divContainer = divContainer;
		this.Layers =  new Array();
		
		// Adding services and setting layers control.
		this.addMapServices();
		this.setLayersContainer();
		this.activateLayersControl();
      },

      addMapServices: function()
	  {
		var layers = [];
		for(var i = 0; i < this.jsonTiledMapServices.length; i++)
		{
			var imageParameters = new ImageParameters();
			imageParameters.format = "PNG24"; //set the image type to PNG24, note default is PNG8.

			var layer = new ArcGISDynamicMapServiceLayer(this.jsonTiledMapServices[i].URL, { "opacity" : 0.3,"imageParameters" : imageParameters});
			layers[i] = layer;
			
			this.Layers.push([layer,
						this.jsonTiledMapServices[i].ServiceName,
						this.jsonTiledMapServices[i].Label,
						this.jsonTiledMapServices[i].isShow,
						this.jsonTiledMapServices[i].URL
						]);
		}
		this.map.addLayers(layers);
		
		for(var i = 0; i < this.Layers.length; i++)
		{
			var item = this.Layers[i];
			if(item[3]=="")
				item[0].hide();
		}
      },
	  
	  setLayersContainer: function()
	  {
		var strLayers = "";
		for(var i = 0; i < this.Layers.length; i++)
		{
			var item = this.Layers[i];
			strLayers += "<div><input type='checkbox' "+item[3]+" id='"+item[1]+"' />:"+item[2]+"</div>";
		}
		dom.byId(this.divContainer).innerHTML = strLayers;
	  },
	  
	  activateLayersControl:function()
	  {
		for(var i = 0; i < this.Layers.length; i++)
		{
			var item = this.Layers[i];
			var checkbox = dom.byId(item[1]);
			on(dom.byId(item[1]), "change", lang.hitch(checkbox,this.updateLayerVisibility,this.Layers,item[1]));
		}
	  },
	  
	  updateLayerVisibility : function(layers,checkboxid)
	  {
		for(var i = 0; i < layers.length; i++)
		{
			var item = layers[i];
			if(item[1]==checkboxid)
			{
				var layer = item[0];
				if(dom.byId(checkboxid).checked)
					layer.show();
				else
					layer.hide();
			}
		}
	  }
    });
});