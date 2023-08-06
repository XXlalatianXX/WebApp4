/*
RtafPlotList = JSON.parse(response);
require(["MapLip/GraphicsPointsLayer"], function(GraphicsPointsLayer) 
{
	var graphicPointLayer = new GraphicsPointsLayer(map,"แปลงที่ดิน",RtafPlotList,"PlotLayers");
	graphicPointLayer.DrawPoints("images/search_place.png");	
	//graphicPointLayer.DrawPointsByCategory("unitcode","images");	
});
		
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
	  LayerName:null,
	  GraphicsPointLayer:null,
	  JsonPoints:null,
	  divContainer:null,
      constructor: function(map,layerName,jsonPoints,divContainer)
	  {
		this.map = map;
		this.LayerName = layerName;
		this.JsonPoints = jsonPoints;
		this.divContainer = divContainer;
		this.GraphicsPointLayer = new GraphicsLayer();
		this.map.addLayer(this.GraphicsPointLayer);
		
		this.setLayersContainer();
		this.activateLayersControl();
      },
	  
	  setLayersContainer: function()
	  {
		var strLayers = "<div><input type='checkbox' checked id='"+this.LayerName+"' />:"+this.LayerName+"</div>";
		dom.byId(this.divContainer).innerHTML = strLayers;
	  },
	  
	  activateLayersControl:function()
	  {
		var checkbox = dom.byId(this.LayerName);
		on(dom.byId(this.LayerName), "change", lang.hitch(checkbox,this.updateLayerVisibility,this.GraphicsPointLayer,this.LayerName));
	  },
	  
	  updateLayerVisibility : function(gpLayer,checkboxid)
	  {
			if(dom.byId(checkboxid).checked)
				gpLayer.show();
			else
				gpLayer.hide();
	  },
	   
	  SetJsonPoints:function(jsonPoints)
	  {
		 this.JsonPoints = jsonPoints;
	  },
	  
      DrawPoints: function(icon) 
	  {
		this.GraphicsPointLayer.clear();
		if(this.JsonPoints.length>0)
		{
			for(var i=0;i<this.JsonPoints.length;i++)
			{
				var symbol = new PictureMarkerSymbol(icon, 20, 20);
				var geometry = new Point(parseFloat(this.JsonPoints[i].lon),parseFloat(this.JsonPoints[i].lat),new SpatialReference({ wkid:4326 })); 
				this.GraphicsPointLayer.add(new esri.Graphic(geometry, symbol));
			}
		}
      },
	  DrawPointsByCategory: function(categoryname,icondir) 
	  {
		this.GraphicsPointLayer.clear();
		if(this.JsonPoints.length>0)
		{
			for(var i=0;i<this.JsonPoints.length;i++)
			{
				var icon = RtafPlotList[i][categoryname];
				var symbol = new PictureMarkerSymbol(icondir+"/"+icon+".png", 20, 20);
				var geometry = new Point(parseFloat(this.JsonPoints[i].lon),parseFloat(this.JsonPoints[i].lat),new SpatialReference({ wkid:4326 })); 
				this.GraphicsPointLayer.add(new esri.Graphic(geometry, symbol));
			}
		}
      }	  
  });
});