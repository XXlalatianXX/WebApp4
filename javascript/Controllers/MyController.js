var newLayer;

const wing1 = {
	lat: 14.934309,
	lon: 102.080567
};
const wing21 = {
	lat: 15.251905,
	lon: 104.870980
};
const wing23 = {
	lat: 17.386890,
	lon: 102.787364
};

var part1 =  {};
const route = {};

require(["esri/layers/GraphicsLayer","dojo/domReady!"], 
function(GraphicsLayer){	
	$( "#startdate" ).focusin(function(){onDatePicker("#startdate")});
	$( "#enddate" ).focusin(function() {onDatePicker("#enddate")});	

	newLayer = new GraphicsLayer();
	map.addLayer(newLayer);
});

function cal(){
	const warehouses = [
		{ name: "A", lat: 14.934309, lon: 102.080567 }, // wing1
		{ name: "B", lat: 15.251905, lon: 104.870980 }, // wing21
		{ name: "C", lat: 17.386890, lon: 102.787364 }  // wing23
	  ];

	/*
	const destinations = [
		{ name: "1", lat: parseFloat($("#lat1").val()), lon: parseFloat($("#lon1").val()) },
		{ name: "2", lat: parseFloat($("#lat2").val()), lon: parseFloat($("#lon2").val()) }
	  ];
	*/

	const destinations = [
		{ name: "1", lat: 102.614435, lon: 15.144884 },
		{ name: "2", lat: 104.241308, lon: 15.099618 },
		{ name: "3", lat: 102.385211, lon: 17.391212 }
	]

	CalPart1();

	function CalPart1(){
			// Loop through each warehouse
		for (const warehouse of warehouses) {
			// Loop through each destination
			for (const destination of destinations) {
			const key = `${warehouse.name}${destination.name}`;
			const distance = getDistanceFromLatLonInKm(
				warehouse.lat, warehouse.lon, destination.lat, destination.lon
			);
			part1[key] = distance;
			}
		}
		console.log(part1); //Output the distances object
	};
}

function delGraphics() {
	newLayer.clear();

	$('#mainSearch').show();
	PriorityEvent = false;
	customers = [];
	console.log("customers was seted to empty : ",customers);
	
	$('#Pri').prop('disabled', false); 
	$("#Pri").css("background-color", "cyan");
	$("#Lat").css("background-color","white");
	$("#Lon").css("background-color", "white");
	$("#Pers").css("background-color", "white");
	$("#Stret").css("background-color", "white");

	IdOfli = 0;	// reset id of li block

	

	let AlldistanceElem = document.getElementById("Alldistance-result"),
		distance1Elem = document.getElementById("distance1-result"),
		distance2Elem = document.getElementById("distance2-result"),
		distance3Elem = document.getElementById("distance3-result"),
        wing1Round = document.getElementById("Depot1-round"),
        wing21Round = document.getElementById("Depot2-round"),
        wing23Round = document.getElementById("Depot3-round"),
		routesW = document.getElementById("routes-w"),
        routesPri = document.getElementById("routes-priority")

		AlldistanceElem.innerHTML = "";
		distance1Elem.innerHTML = "";
		distance2Elem.innerHTML = "";
		distance3Elem.innerHTML = "";
		wing1Round.innerHTML = "";
		wing21Round.innerHTML = "";
		wing23Round.innerHTML = "";
	
	// Block to remove child of lo
	while (routesW.hasChildNodes()) {
		routesW.removeChild(routesW.firstChild);
	}

	while (routesPri.hasChildNodes()) {
		routesPri.removeChild(routesPri.firstChild);
	}
}

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

function showWing(){
	drawGraphicText("Wing 1",newLayer,[wing1.lon,wing1.lat],[0,0,255],0)
	drawGraphicText("Wing 21",newLayer,[wing21.lon,wing21.lat],[0,0,255],0)
	drawGraphicText("Wing 23",newLayer,[wing23.lon,wing23.lat],[0,0,255],0)
}

function searchCor(){
	alert($("#startdate").val());
	var outlineWidth = 3.0;

	var lon1 = $("#lon1").val();
	var lat1 = $('#lat1').val();

	var coordinates1 = [[[lon1,lat1],[wing1.lon,wing1.lat]]];
	var coordinates2 = [[[lon1,lat1],[wing21.lon,wing21.lat]]];
	var coordinates3 = [[[lon1,lat1],[wing23.lon,wing23.lat]]];
	
	drawGraphicPoint(newLayer,[lon1,lat1]);

	drawGraphicPolyLine(newLayer,coordinates1,"rgba(255,0,0,0.8)",outlineWidth);	// red line
	drawGraphicPolyLine(newLayer,coordinates2,"rgba(255,0,0,0.8)",outlineWidth);
	drawGraphicPolyLine(newLayer,coordinates3,"rgba(255,0,0,0.8)",outlineWidth);
	
	drawGraphicText("P",newLayer,[lon1,lat1],[255,0,0],0)

	$("#showDistance").html(getDistanceFromLatLonInKm(lon1,lat1,wing1.lon,wing1.lat));
	$("#showDistance1").html(getDistanceFromLatLonInKm(lon1,lat1,wing21.lon,wing21.lat));
	$("#showDistance2").html(getDistanceFromLatLonInKm(lon1,lat1,wing23.lon,wing23.lat));
}

function clearMyForm(){
	//alert($("#startdate").val());
	$("#lon1").val("");
	$("#lat1").val("");
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

function drawGraphicPointWarehouse(graphicLayer,coordinate){
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

