var rtafBaseServices = [
	{"ServiceName":"Map5000","Label":"แผนที่ 1:50000","isShow":"", "URL": "http://103.51.224.22/arcgis/rest/services/RTSD/L7018_PROJECTED/MapServer"}	,
	//{"ServiceName":"Map50","Label":"aaa","isShow":"", "URL": "https://103.51.224.21/arcgis/rest/services/RTAFArea/Ranong/MapServer?token=P5IZ6wbiO_iOhGsgh0KVx2DoFTCsggyzeZEv1dROBcb4c1VAuI1kwMV0D4dK2hYx"}
];

//http://eis.ldd.go.th/ArcGIS/rest/services
/*
      locatorURL: "http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
      baseMapUrl: 'http://eis.ldd.go.th/ArcGIS/rest/services/LDD_BASEMAP_WM/MapServer',
      baseMapLayerURL: 'http://eis.ldd.go.th/ArcGIS/rest/services/LDD_BASEMAP_WM_CACHE/MapServer',
      rasterLayerURL: 'http://eis.ldd.go.th/ArcGIS/rest/services/LDD_RASTER_WM_CACHE/MapServer',
      soilGroupLayerURL: 'http://eis.ldd.go.th/ArcGIS/rest/services/LDD_SOIL_WM_CACHE/MapServer',
      landUseLayerURL: 'http://eis.ldd.go.th/ArcGIS/rest/services/LDD_LU_WM_CACHE/MapServer',
      hybridLayerURL: 'http://eis.ldd.go.th/ArcGIS/rest/services/LDD_HYBRID_WM_CACHE/MapServer',
      sysMapLayerURL: 'http://eis.ldd.go.th/ArcGIS/rest/services/LDD_SOIL_WM/MapServer',
      featureLayer: "http://eis.ldd.go.th/ArcGIS/rest/services/LDD_SOIL_QUERY_WM/MapServer/10",
      geometryUrl: 'http://eis.ldd.go.th/ArcGIS/rest/services/Geometry/GeometryServer',
*/

var map;
var editDrawingGraphicLayer;
var searchLonLatGraphicLayer;
var graphicsLayerCircleBuffer;

require([
  "esri/map", 
  "esri/toolbars/edit",
  "esri/layers/ArcGISTiledMapServiceLayer",
  "MapLip/OnlineBaseMapGallery",
  "MapLip/TiledMapServiceLayers",
  "MapLip/DynamicMapServiceLayers",
  "MapLip/MapLegend",
  "MapLip/MapMeasurement",
  "MapLip/IdentifyVectorLayer",
  "MapLip/IdentifyGraphicsPointsLayer",
  "MapLip/GraphicsRadarLayer",
  "MapLip/IdentifyRadarLayer",
  "dijit/layout/ContentPane", 
  "dijit/layout/TabContainer", 
  "esri/layers/GraphicsLayer",
  "dojo/parser",
  "dojo/dom",
  "dijit/registry",
  "dojo/dom-construct",
  "dojo/dnd/Moveable",
  "dojo/query",
  "dojo/on",
  "dojo/dom-class",
  "dojo/_base/event",
  "dojo/domReady!"
    ], function(
  Map,
  Edit,
  ArcGISTiledMapServiceLayer,
  OnlineBaseMapGallery,
  TiledMapServiceLayers,
  DynamicMapServiceLayers,
  MapLegend,
  MapMeasurement,
  IdentifyVectorLayer,
  IdentifyGraphicsPointsLayer,
  GraphicsRadarLayer,
  IdentifyRadarLayer,
  ContentPane,
  TabContainer,
  GraphicsLayer,
  parser,
  dom,
  registry,
  domConstruct,
  Moveable,
  query,
  on,
  domClass,
  event
  ) 
{
	parser.parse();
	
	// Create Style for infoWindows
	var customPopup = new esri.dijit.Popup({
	fillSymbol: false,
	highlight: false,
	lineSymbol: false,
	markerSymbol: false
	}, dojo.create("div"));
	
	dojo.addClass(customPopup.domNode, "modernGrey");
	
	var xCenter = 100.5;
	var yCenter = 12.9;

	map = new Map("map", { logo:false,basemap: "national-geographic", center: [xCenter, yCenter], zoom: 6 , sliderPosition:"top-right",infoWindow: customPopup });
		
	// Moveable infoWindows
	var handle = query(".title", map.infoWindow.domNode)[0];
    var dnd = new Moveable(map.infoWindow.domNode, { handle: handle });
    // when the infoWindow is moved, hide the arrow:
    on(dnd, 'FirstMove', function() {
	// hide pointer and outerpointer (used depending on where the pointer is shown)
		 var arrowNode =  query(".outerPointer", map.infoWindow.domNode)[0];
		 domClass.add(arrowNode, "hidden");
		 var arrowNode =  query(".pointer", map.infoWindow.domNode)[0];
		 domClass.add(arrowNode, "hidden");
     }.bind(this));
		
	var basemapGallery = new OnlineBaseMapGallery(map,"basemapGallery");	
	var rtafBaseLayers = new TiledMapServiceLayers(map,rtafBaseServices,"RtafLayers");
	var measurement = new MapMeasurement(map,"toolmap"); 	
		
	map.on("mouse-move", showCoordinates);
    map.on("mouse-drag", showCoordinates);
	map.on("mouse-down", menuPopup);
	
	//add drawing toolbar
	createDrawingToolbar(map);
	var html = displayDrawingToolBar();
	$("#divDrawingPanel").html(html);
	
	//add edit toolbar for drawing layer and military symbols.
	editDrawingGraphicLayer = new Edit(map);
	createMilitarySymbolLayer(map,"#divSymbolPanel");
	
	//clear popup container
	map.on("click", function(evt)
	{	
		clearPopUpContainer("InfoTabs");	
		editDrawingGraphicLayer.deactivate();
		
		searchLonLatGraphicLayer.clear();
	});
	
	drawingGraphicLayer.on("click", function(evt) 
	{
        event.stop(evt);
		var tool = 0;
		tool = tool | Edit.MOVE; 
		tool = tool | Edit.EDIT_VERTICES; 
		tool = tool | Edit.SCALE; 
		tool = tool | Edit.ROTATE; 
		tool = tool | Edit.EDIT_TEXT;
		var options = {allowAddVertices: true,allowDeleteVertices: true,uniformScaling: true};
		editDrawingGraphicLayer.activate(tool, evt.graphic, options);
    });
	
	//drawing searchLonLatGraphicLayer
	searchLonLatGraphicLayer = new GraphicsLayer();
	map.addLayer(searchLonLatGraphicLayer);
	
	function showCoordinates(evt) 
	{
        //the map is in web mercator but display coordinates in geographic (lat, long)
        var mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);
		var lat = mp.y.toFixed(5);
		var lon = mp.x.toFixed(5);
		var xy   = new Array(2);
		var zone = Math.floor((parseFloat(lon)+180)/6)+1;
		zone = LatLonToUTMXY (DegToRad (lat), DegToRad (lon), zone, xy);
		var u = {};		
		var mgrsString = UTMtoMGRS(Math.floor((parseFloat(lon)+180)/6)+1,xy[0],xy[1],false,5,u);
        //display mouse coordinates
		$("#showpoint").html("[ Lon:"+mp.x.toFixed(5) + ",Lat:" + mp.y.toFixed(5)+" ] [ UTM_X:"+xy[0].toFixed(2)+",UTM_Y:"+xy[1].toFixed(2)+" ] [ MGRS:"+mgrsString+" ]");
	}		
});


/***************** Start Coding Utilities functions *********************/

function clearPopUpContainer(div)
{
	map.infoWindow.setContent("");
	map.infoWindow.hide();
}

function showDialog(title,html)
{
	$( "#dialog" ).html(html);
	$( "#dialog" ).dialog( "open" );
}

function drawBufferCircle(lon,lat,raduis)
{
	var Centers = new Array(); 
	var Raduis = new Array();
	Centers.push([parseFloat(lon),parseFloat(lat)]);
	Raduis.push(parseFloat(raduis));
	doBufferCircle(Centers,Raduis);
}

function doBufferCircle(Centers,Raduis)
{
	require([
		"MapLip/CircleBuffer"
	], function(
		CircleBuffer
	) 
	{	
		if (graphicsLayerCircleBuffer != undefined)
			graphicsLayerCircleBuffer.Clear();
			
		graphicsLayerCircleBuffer = new CircleBuffer(map,Centers,Raduis);
		graphicsLayerCircleBuffer.Draw();
	});
}

function clearBufferCircle()
{
	if (graphicsLayerCircleBuffer != undefined)
		graphicsLayerCircleBuffer.Clear();
}

//Right click for popup menu
var rightClickLonInfo,rightClickLatInfo;

require([
	"dijit/Menu",
	"dijit/MenuItem",
	"dijit/CheckedMenuItem",
	"dijit/MenuSeparator",
	"dijit/PopupMenuItem",
	"dojo/domReady!"
	], function(
	Menu, 
	MenuItem, 
	CheckedMenuItem, 
	MenuSeparator, 
	PopupMenuItem)
	{
		var pMenu;
		pMenu = new Menu({ id: "menuPopup",	targetNodeIds: ["map"]});
		pMenu.addChild(new MenuItem({id: "LatLonInfo",label: ""}));
		
		//pMenu.addChild(new MenuSeparator());
		/*pMenu.addChild(new MenuItem({
			label: "<img src='images/search_place.png' width='12' height='12'><span style='font-size:12px;'>ค้นหาเหตุการณ์โดยรัศมีรอบพิกัดนี้</span>",
			onClick: function(evt){
				togglePanelMenu("#divData3Container","slide");
				$( "#tabs2" ).tabs({ active: 0 });
				$( "#eventlon" ).val(rightClickLonInfo);
				$( "#eventlat" ).val(rightClickLatInfo);
		}}));*/
		//pMenu.addChild(new MenuSeparator());
		
		pMenu.startup();
		
		function togglePanelMenu(div,effect)
		{
		  var selectedEffect = "slide";
		  var options = {};
		  if ( selectedEffect === "scale" )
		  {
			options = { percent: 2 };
		  } 
		  else if ( selectedEffect === "size" ) 
		  {
			options = { to: { width: 200, height: 60 } };
		  }
		  $(div).toggle( selectedEffect, options, 500 );
		};
	}
);

//display popup menu
function menuPopup(evt)
{
	var mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);
	rightClickLatInfo = mp.y.toFixed(5);
	rightClickLonInfo = mp.x.toFixed(5);
	var xy   = new Array(2);
	var zone = Math.floor((parseFloat(rightClickLonInfo)+180)/6)+1;
	zone = LatLonToUTMXY (DegToRad (rightClickLatInfo), DegToRad (rightClickLonInfo), zone, xy);
	var u = {};		
	var mgrsString = UTMtoMGRS(Math.floor((parseFloat(rightClickLonInfo)+180)/6)+1,xy[0],xy[1],false,5,u);
	var str = "<span style='font-size:12px; color:red;'><img src='images/point_icon.png' width='12' height='12'>Lat: "+rightClickLatInfo+"&nbsp;,&nbsp;Lon: "+rightClickLonInfo+"<BR><img src='images/point_icon.png' width='12' height='12'>MGRS: "+mgrsString+"</span>";
	dijit.byId('LatLonInfo').set("label", str);
}

function searchByMGRS()
{
	var mgrssec1 = $('#mgrssec1 option:selected').val(); 
	var mgrssec2 = $('#mgrssec2').val(); 
	var mgrssec3 = $('#mgrssec3').val(); 
	var mgrssec4 = $('#mgrssec4').val(); 
		
	var value  = mgrssec1+" "+mgrssec2+" "+mgrssec3+" "+mgrssec4;
		
	if(value=='')
	{
	 alert("กรุณาระบบพิกัดให้ถูกต้อง");
	}
	else 
	{
		var mgrs   = value.split(" ");
		//console.log('mgrs.length='+mgrs.length);
		var msg    = '         รูปแบบพิกัด MGRS ไม่ถูกต้อง\nรูปแบบที่ถูกต้อง:47 N QG 55555 66666';
		var ismgrs = true;
				
		if(mgrs.length!=5)
		{
			ismgrs=false;
		}
		else
		{
			if(mgrs[0]!=47 && mgrs[0]!=48){ismgrs=false;}
			if(mgrs[1]!='N'){ismgrs=false;}
			if(mgrs[3].length!=5){ismgrs=false;}
			if(mgrs[4].length!=5){ismgrs=false;}
		}
				
		if(ismgrs)
		{
			var xy   = new Array(2);
			var u = {};	
			var c1 = mgrs[2].substring(0,1);
			var c2 = mgrs[2].substring(1,2);
			MGRStoUTM(mgrs[0],mgrs[1],c1,c2,mgrs[3],mgrs[4],u);
			UTMXYToLatLon (u.E, u.N, 47, false, xy);				
			var lon = RadToDeg(xy[1]).toFixed(5);
			var lat = RadToDeg(xy[0]).toFixed(5);
				
			if(mgrssec1=="48 N")
			{
				lon = parseFloat(lon) + 6.0;
			}
				
			if(parseFloat(lat)< 5.4 || parseFloat(lat)> 7.5)
			{
				alert("พิกัดดังกล่าวอยู่นอกพื้นที่ จชต.");
				return false;
			}
				
			if(parseFloat(lon)< 100.0 || parseFloat(lon)> 102.2)
			{
				alert("พิกัดดังกล่าวอยู่นอกพื้นที่ จชต.");
				return false;
			}
				
			var location = new esri.geometry.Point(parseFloat(lon),parseFloat(lat),new esri.SpatialReference({ wkid:4326 })); 
			map.centerAndZoom(location, map.getLevel());
			
			searchLonLatGraphicLayer.clear();
			var identifyEventSymbol = new esri.symbol.PictureMarkerSymbol('images/plus.png', 24, 24);
			searchLonLatGraphicLayer.add(new esri.Graphic(location, identifyEventSymbol));	
		}
	}	
}

function gotoXY(lat,lon)
{
	var point = lat+","+lon;
	onCoordinateChange(point);
}

function onCoordinateChange(point)
{
	if(point=='00')
	return;
	
	require([
	  "esri/geometry/Point",
	  "esri/SpatialReference",
	  "dojo/parser",
	  "dojo/dom",
	  "dojo/on",
	  "dojo/domReady!"
	], function(
	  Point,
	  SpatialReference,
	  parser,
	  dom,
	  on
	) 
	{
		pos = point.split(",");
		var lon = pos[1]; 
		var lat = pos[0]; 
		if(parseFloat(lat)< -90.0 || parseFloat(lat)> 90.0)
		{
			alert("พิกัดไม่ถูกต้อง");
				return false;
		}
						
		if(parseFloat(lon)< -180.0 || parseFloat(lon)> 180.0)
		{
			alert("พิกัดไม่ถูกต้อง");
			return false;
		}
		var location = new Point(parseFloat(lon),parseFloat(lat),new SpatialReference({ wkid:4326 })); 
		map.centerAndZoom(location, map.getLevel());
		
		searchLonLatGraphicLayer.clear();
		var plusSysmbol = new esri.symbol.PictureMarkerSymbol('images/plus.png', 24, 24);
		searchLonLatGraphicLayer.add(new esri.Graphic(location, plusSysmbol));	
	});
}
