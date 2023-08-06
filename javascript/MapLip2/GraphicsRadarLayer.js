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
	  DataArray:null,
	  LayerName:null,
	  IconsDir:null,
	  GraphicsPointLayer:null,
	  urlFile:null,
	  divContainer:null,
      constructor: function(map,layerName,urlFile,iconsDir,divContainer)
	  {
		this.map = map;
		this.LayerName = layerName;
		this.DataArray = new Array();
		this.urlFile = urlFile;
		this.IconsDir = iconsDir;
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
	  
	  updateLayerVisibility : function(radarLayer,checkboxid)
	  {
			if(dom.byId(checkboxid).checked)
				radarLayer.show();
			else
				radarLayer.hide();
	  },
	  
	 Render:function()
	  {
		this.ReadFile();
		this.DrawPoints();
	  },
	  
	  ReadFile:function()
	  {
		 var radarTracking = "";
		 request.get(this.urlFile, {sync:true}).then(function(result)
		 {
			var strmanager = new StringManager();
			radarTracking = strmanager.TrimChar(result,"$");
		 });
		 radarTracking = radarTracking.replace(/(?:\r\n|\r|\n)/g, '');
		 this.DataArray = radarTracking.split("$");
	  },
	  
	  SetDataArray:function(dataArray)
	  {
		 this.DataArray = dataArray;
	  },
	  
      DrawPoints: function()
	  {
		this.GraphicsPointLayer.clear();
		if(this.DataArray.length>0)
		{
			for(var i=0;i<this.DataArray.length;i++)
			{
				var item = this.DataArray[i].split(",");
				var icon = this.PlaneTypeClassifier(parseFloat(item[3]),parseFloat(item[5]));
				var symbol = new PictureMarkerSymbol(this.IconsDir+'/'+icon+'.png', 15, 15);
				//var symbol = new PictureMarkerSymbol(this.IconsDir+'/1.png', 15, 15);
				symbol.angle = parseFloat(item[4]);
				var geometry = new Point(parseFloat(item[2]),parseFloat(item[1]),new SpatialReference({ wkid:4326 })); 
				this.GraphicsPointLayer.add(new esri.Graphic(geometry, symbol));
			}
		}
      },
	 PlaneTypeClassifier: function (height,velocity)
	 {	
		height=parseFloat(height)*1000;
		velocity=parseFloat(velocity);
		
		if(velocity<=230)
		{
			if(velocity<=150){return "3";}
			else {return "1";}
		}
		else
		{
			if(velocity<=330)
			{
				if(velocity<=250)
				{
					if(height<=13000){return "3";}
					else
					{
						if(velocity<=240){return "3";}
						else
						{
							if(height<=17000){return "3";}
							else {return "3";}
						}
					}
				}
				else{return "3";}
			}
			else
			{
				if(height<=20000){return "2";}
				else{return "3";}
			}
		}
	 }
	  
  });
});