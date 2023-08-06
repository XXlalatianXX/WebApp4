/*
This class used to render radar tracking on map. 
for example
	var trackradar = new GraphicsRadarLayer(map,"RadarTracking","http://10.235.236.140/track/radar_track.txt","http://localhost/gis/images/","RadarLayer");
	setInterval(function () {trackradar.Render();}, 2000);// 2000 is 2 seconds.
*/

define([ 
  "dojo/_base/declare",
  "dojo/request",
  "esri/layers/GraphicsLayer",
  "esri/symbols/PictureMarkerSymbol",
  "esri/geometry/Point",
  "esri/graphic",
  "esri/SpatialReference",
  "MapLip/StringManager",
  "dojo/dom",
  "dojo/on",
  "dojo/_base/lang"
],
function(
	declare,
	request,
	GraphicsLayer,
	PictureMarkerSymbol,
	Point,
	Graphic,
	SpatialReference,
	StringManager,
	dom,
	on,
	lang
	) 
{
    return declare([], {
	  map:null,
	  JsonPoints:null,
	  LayerName:null,
	  IconsDir:null,
	  GraphicsPointLayer:null,
	  urlFile:null,
	  divContainer:null,
      constructor: function(map,layerName,iconsDir,divContainer)
	  {
		this.map = map;
		this.LayerName = layerName;
		//this.DataArray = new Array();
		this.IconsDir = iconsDir;
		this.divContainer = divContainer;
		this.GraphicsPointLayer = new GraphicsLayer();
		this.map.addLayer(this.GraphicsPointLayer);
		
		this.setLayersContainer();
		this.activateLayersControl();
		
      },
	  
	  setLayersContainer: function()
	  {
		var strLayers = "<div style='display:none'><input type='checkbox'  checked id='"+this.LayerName+"' />:"+this.LayerName+"</div>";
		dom.byId(this.divContainer).innerHTML = strLayers;
	  },
	  
	  activateLayersControl:function()
	  {
		var checkbox = dom.byId(this.LayerName);
		on(dom.byId(this.LayerName), "change", lang.hitch(checkbox,this.updateLayerVisibility,this.GraphicsPointLayer,this.LayerName));
	  },

	  updateLayerVisibility : function(radarLayer,checkboxid)
	  {
			if(dom.byId(checkboxid).checked)
				radarLayer.show();
			else
				radarLayer.hide();
	  },
	  	  
	  SetJsonPoints:function(jsonPoints)
	  {
		 this.JsonPoints = jsonPoints;
	  },

	  DrawPointsByCategory: function(categoryname,width,height) 
	  {
		this.GraphicsPointLayer.clear();
		if(this.JsonPoints.length>0)
		{
			for(var i=0;i<this.JsonPoints.length;i++)
			{
				var icon = this.JsonPoints[i][categoryname];
				var symbol = new PictureMarkerSymbol(this.IconsDir+"/"+icon+".png", width, height);
				symbol.angle = parseFloat(this.JsonPoints[i].track_heading);
				var geometry = new Point(parseFloat(this.JsonPoints[i].longitude),parseFloat(this.JsonPoints[i].latitude),new SpatialReference({ wkid:4326 })); 
				this.GraphicsPointLayer.add(new esri.Graphic(geometry, symbol));
			}
		}
      }	 
	  
  });
});