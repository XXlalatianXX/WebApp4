var newLayer;
require(["esri/layers/GraphicsLayer","dojo/domReady!"], 
function(GraphicsLayer){	
	$( "#startdate" ).focusin(function(){onDatePicker("#startdate")});
	$( "#enddate" ).focusin(function() {onDatePicker("#enddate")});	

	newLayer = new GraphicsLayer();
	map.addLayer(newLayer);
	
	drawGraphicText("Hello! Phummipat",newLayer,[101.027344,11.148594],[255,0,0],0);
});

function searchMyForm(){
	alert($("#startdate").val());
	var fillColor = $("#fillColor").val();
	var outlineColor = $("#outlineColor").val();
	var outlineWidth = parseFloat($("#outlineWidth").val());
	var coordinates = [[[96.479004,17.772065],[103.751953,16.828040],[101.884277,14.479728],[96.479004,17.772065]]];
	drawGraphicPolygon(newLayer,coordinates,fillColor,outlineColor,outlineWidth);
	drawGraphicPolyLine(newLayer,coordinates,outlineColor,outlineWidth);
	drawGraphicPoint(newLayer,[96.479004,17.772065]);
	$("#showDistance").html(getDistanceFromLatLonInKm(17.772065,96.479004,16.828040,103.751953));

	
}

function searchCor(){
	var wing1Lat = 14.934309;
	var wing1Lon = 102.080567;
	var wing21Lat = 15.251905;
	var wing21Lon = 104.870980;
	var wing23Lat = 17.386890;
	var wing23Lon = 102.787364;
	var lon1 = $("#lon1").val();
	var lat1 = $('#lat1').val();
	alert($("#startdate").val());
	drawGraphicPoint(newLayer,[lon1,lat1]);
	drawGraphicPoint(newLayer,[wing1Lon,wing1Lat]);
	$("#showDistance").html(getDistanceFromLatLonInKm(lon1,lat1,wing1Lon,wing1Lat));
}

function clearMyForm(){
	//alert($("#startdate").val());
	$("#startdate").val("");
}

function drawGraphicPolyLine(graphicLayer,coordinates,lineColor,lineWidth){
	require(["esri/geometry/Polyline", 
		"esri/SpatialReference",
		"esri/symbols/SimpleLineSymbol", 
		"dojo/_base/Color"], 
	function(Polyline,
		SpatialReference,
		SimpleLineSymbol,
		Color) {
		var polylineJson = {"paths":coordinates,"spatialReference":{"wkid":4326}};
		var line_symbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH,dojo.colorFromRgb(lineColor),lineWidth);
		var polyline = new Polyline(polylineJson);
		graphicLayer.add(new esri.Graphic(polyline,line_symbol));
	});
}

function drawGraphicPolygon(graphicLayer,coordinates,fillColor,outlineColor,outlineWidth){
	var polygonJson  = {"rings":coordinates,"spatialReference":{"wkid":4326 }};
	require(["esri/geometry/Polygon",
		"esri/symbols/SimpleFillSymbol", 
		"esri/symbols/SimpleLineSymbol",
		"dojo/domReady!"], 
	function(Polygon,
		SimpleFillSymbol,
		SimpleLineSymbol){	
		var polygon = new Polygon(polygonJson);
		var fill_symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
			new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,dojo.colorFromRgb(outlineColor), outlineWidth),
			dojo.colorFromRgb(fillColor));				
		graphicLayer.add(new esri.Graphic(polygon,fill_symbol));
	});	
}

function drawGraphicPoint(graphicLayer,coordinate){
	require([
	  "esri/geometry/Point", 
	  "esri/SpatialReference",
	  "esri/symbols/SimpleMarkerSymbol", 
	  "esri/symbols/SimpleLineSymbol", 
	  "dojo/_base/Color" 
	], function(Point,
		SpatialReference,
		SimpleMarkerSymbol, 
		SimpleLineSymbol, 
		Color ) {

		var point = new Point(coordinate,new SpatialReference({ wkid:4326 }));
		var sms = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE, 10,
			new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
			new Color([255,0,0]), 1),
			new Color([0,255,0,0.25]));
		
		graphicLayer.add(new esri.Graphic(point,sms));
	});
}

function drawGraphicPointLarge(graphicLayer,coordinate){
	require([
	  "esri/geometry/Point", 
	  "esri/SpatialReference",
	  "esri/symbols/SimpleMarkerSymbol", 
	  "esri/symbols/SimpleLineSymbol", 
	  "dojo/_base/Color" 
	], function(Point,
		SpatialReference,
		SimpleMarkerSymbol, 
		SimpleLineSymbol, 
		Color ) {

		var point = new Point(coordinate,new SpatialReference({ wkid:4326 }));
		var sms = new SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_CIRCLE, 50,
			new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,
			new Color([255,0,0]), 1),
			new Color([0,255,0,0.25]));
		
		graphicLayer.add(new esri.Graphic(point,sms));
	});
}

function drawGraphicText(message,graphicLayer,coordinate,color,angle){
	require([
			"esri/geometry/Point", "esri/SpatialReference",	"esri/graphic",
			"esri/symbols/TextSymbol","dojo/_base/Color", "esri/symbols/Font"
	], function(
			Point,SpatialReference,Graphic,
			TextSymbol,Color, Font
	){
		var geometry = new Point(parseFloat(coordinate[0]),parseFloat(coordinate[1]),new SpatialReference({ wkid:4326 })); 
		var textSymbol =  new TextSymbol(message).setColor(
			new Color(color)).setAlign(Font.ALIGN_START).setAngle(angle).setFont(
			new Font("12pt").setWeight(Font.WEIGHT_BOLD));
			
		var labelPointGraphic = new Graphic(geometry, textSymbol);
		graphicLayer.add(labelPointGraphic);
	});
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2){
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2-lat1);  // deg2rad below
	var dLon = deg2rad(lon2-lon1); 
	var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2)
		; 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg){
	return deg * (Math.PI/180);
}