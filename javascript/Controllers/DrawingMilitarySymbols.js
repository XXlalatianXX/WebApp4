var militarySymbolsGraphicPointLayer;
var militarySelectedSymbolsGraphicPointLayer;

var sp_wkid = 102113;

var militarySymbolsArray = [];
var militarySymbolIndex = 0;
var militarySymbolSelectedIndex = -1;

var toolEditMilitarySymbols;
var militaryPickedSymbol = -1;
var militaryPickedSymbolDir = "NO";

function createMilitarySymbolLayer(map,militarySymbolPanelDiv)
{
	require([
	  "esri/toolbars/edit",
	  "dojo/parser",
	  "dojo/dom",
	  "dijit/registry",
	  "dojo/dom-construct",
	  "dojo/on",
	  "dojo/_base/event",
	  "dojo/domReady!"
    ], function(
	  Edit,
	  parser,
	  dom,
	  registry,
	  domConstruct,
	  on,
	  event
	) 
	{
		addmilitarySymbolsGraphicPointLayer(map);
		toolEditMilitarySymbols = new Edit(map);
				
		map.on("click", function(evt)
		{
			toolEditMilitarySymbols.deactivate();
			//militarySelectedSymbolsGraphicPointLayer.clear();
		});
		
		militarySymbolsGraphicPointLayer.on("mouse-up", function(evt) 
		{
			updateMilitarySymbol(evt);
		});
		
		militarySymbolsGraphicPointLayer.on("mouse-down", function(evt) 
		{
			event.stop(evt);
			var tool = 0;
				tool = tool | esri.toolbars.Edit.MOVE; 
				tool = tool | esri.toolbars.Edit.EDIT_VERTICES; 
				tool = tool | esri.toolbars.Edit.SCALE; 
				tool = tool | esri.toolbars.Edit.ROTATE; 
				tool = tool | esri.toolbars.Edit.EDIT_TEXT;
			var options = {allowAddVertices: true,allowDeleteVertices: true,uniformScaling: true};
			toolEditMilitarySymbols.activate(tool, evt.graphic, options);
			selectMilitarySymbol(evt);
		});
		
		addMilitarySymbolPanel(militarySymbolPanelDiv);
		map.on("click", function(evt)
		{			
			addMilitarySymbol("images/MilitarySymbols/"+militaryPickedSymbolDir+"/"+militaryPickedSymbol+".png",evt);
			resetSelectedMilitarySymbol();
			//labelingAllSymbols();
		});
		
	});
}

function addMilitarySymbolPanel(militarySymbolPanelDiv)
{
	var html = "";
	html = html+"<table border='0' style='font-size:0.85em;'>";
	html = html+"<tr>";
	html = html+"<td>";
	html = html+"File : <input type='file' id='fileMilitarySymbols' onchange='loadMilitarySymbolsArrayFromFile()'><div id='divMilitarySymbolsBuffers' style='display:none'></div><hr class='hr2'>";
	html = html+"</td>";
	html = html+"</tr>";
	html = html+"<tr>";	
	html = html+"<td>";
	html = html+"Tools : <input type='button' onclick='loadMilitarySymbolsArrayFromFile()' value='Load'></button>";
	html = html+" <input type='button' onclick='saveMilitarySymbolsArray()' value='Save'></button> ";
	html = html+" <input type='button' onclick='removeMilitarySymbol()' value='Delete'></button> ";
	html = html+" <input type='button' onclick='clearMilitarySymbolLayers()' value='Clear'></button>";
	html = html+"<hr class='hr2'></td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td>";
	html = html+" รายละเอียด : <input type = 'text' id = 'symbol_name' size='20' style ='color:#000000;background-color:#FFFFFF;padding:0px;'>";
	html = html+"<hr class='hr2'></td>";
	html = html+"</tr>";	
	html = html+"<tr>";
	html = html+"<td>";
	html = html+" Filter : <select id='filterMilitarySymbols' style='color:black;' onchange='filterMilitarySymbolsDrawing(this.value)'><option value='All'>All</option><option value='Friend'>Friend</option><option value='Hostile'>Hostile</option><option value='Neutral'>Neutral</option><option value='Unknow'>Unknow</option><option value='Ground'>Ground</option></select>";
	html = html+"<hr class='hr2'></td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td>";
		html = html+"<table border='0' align='center' width='90%'>";
		html = html+"<tr>";
		html = html+"<td align='center' bgcolor='#4ebae5' width='20%'>Friend</td>";
		html = html+"<td align='center' bgcolor='#e76264' width='20%'>Hostile</td>";
		html = html+"<td align='center' bgcolor='#99c380' width='20%'>Neutral</td>";
		html = html+"<td align='center' bgcolor='#f0e567' width='20%'>Unknow</td>";
		html = html+"<td align='center' bgcolor='#0b89bb' width='20%'>Ground</td>";
		html = html+"</tr>";
		for(var i=1; i<15; i++)
		{
			html = html+"<tr>";
			html = html+"<td align='center' bgcolor='#d9f3fe'>";
			if(i!=13 && i!=14){
			var m_symbols_friend = 'm_symbols_friend_'+i;
			html = html+"<div id='m_symbols_friend_"+i+"' style='cursor:pointer'><img src='images/MilitarySymbols/Friend/"+i+".png' width='20' height='20' onClick='highlightSelectedMilitarySymbol("+m_symbols_friend+","+i+",1);'></div>";
			}
			html = html+"</td>";
			html = html+"<td align='center' bgcolor='#fdc9ca'>";
			if(i!=13 && i!=14){
			var m_symbols_hostile = 'm_symbols_hostile_'+i;
			html = html+"<div id='m_symbols_hostile_"+i+"' style='cursor:pointer'><img src='images/MilitarySymbols/Hostile/"+i+".png' width='20' height='20' onClick='highlightSelectedMilitarySymbol("+m_symbols_hostile+","+i+",2);'></div>";
			}
			html = html+"</td>";
			html = html+"<td align='center' bgcolor='#e4fcd7'>";
			if(i!=13 && i!=14){
			var m_symbols_neutral = 'm_symbols_neutral_'+i;
			html = html+"<div id='m_symbols_neutral_"+i+"' style='cursor:pointer'><img src='images/MilitarySymbols/Neutral/"+i+".png' width='20' height='20' onClick='highlightSelectedMilitarySymbol("+m_symbols_neutral+","+i+",3);'></div>";
			}
			html = html+"</td>";
			html = html+"<td align='center' bgcolor='#fffcde'>";
			if(i!=13 && i!=14){
			var m_symbols_unknow = 'm_symbols_unknow_'+i;
			html = html+"<div id='m_symbols_unknow_"+i+"' style='cursor:pointer'><img src='images/MilitarySymbols/Unknow/"+i+".png' width='20' height='20' onClick='highlightSelectedMilitarySymbol("+m_symbols_unknow+","+i+",4);'></div>";
			}
			html = html+"</td>";
			
			html = html+"<td align='center' bgcolor='#d9f3fe'>";
			var m_symbols_ground = 'm_symbols_ground_'+i;
			html = html+"<div id='m_symbols_ground_"+i+"' style='cursor:pointer'><img src='images/MilitarySymbols/Ground/"+i+".png' width='20' height='20' onClick='highlightSelectedMilitarySymbol("+m_symbols_ground+","+i+",5);'></div>";
			html = html+"</td>";
			
			html = html+"</tr>";
		}
		html = html+"</table>";
	html = html+"</td>";
	html = html+"</tr>";
	html = html+"</table>";
	
	$(militarySymbolPanelDiv).html(html);
}

function highlightSelectedMilitarySymbol(div,id,dir)
{
	for(var i=1;i<15;i++)
	{
		$("#m_symbols_friend_"+i).css("border-color", "#ffffff"); 
		$("#m_symbols_friend_"+i).css("border-style", "none"); 
		$("#m_symbols_friend_"+i).css("border-width", "0px"); 
		
		$("#m_symbols_hostile_"+i).css("border-color", "#ffffff"); 
		$("#m_symbols_hostile_"+i).css("border-style", "none"); 
		$("#m_symbols_hostile_"+i).css("border-width", "0px"); 
		
		$("#m_symbols_neutral_"+i).css("border-color", "#ffffff"); 
		$("#m_symbols_neutral_"+i).css("border-style", "none"); 
		$("#m_symbols_neutral_"+i).css("border-width", "0px"); 
		
		$("#m_symbols_unknow_"+i).css("border-color", "#ffffff"); 
		$("#m_symbols_unknow_"+i).css("border-style", "none"); 
		$("#m_symbols_unknow_"+i).css("border-width", "0px"); 
		
		$("#m_symbols_ground_"+i).css("border-color", "#ffffff"); 
		$("#m_symbols_ground_"+i).css("border-style", "none"); 
		$("#m_symbols_ground_"+i).css("border-width", "0px"); 
	}
	$(div).css("border-color", "#ff0000"); 
	$(div).css("border-style", "solid"); 
	$(div).css("border-width", "2px");
	
	var icon_dir = "NO";
	if(dir == 1) icon_dir = 'Friend';
	else if(dir == 2) icon_dir = 'Hostile';
	else if(dir == 3) icon_dir = 'Neutral';
	else if(dir == 4) icon_dir = 'Unknow';
	else if(dir == 5) icon_dir = 'Ground';

	militaryPickedSymbol = id;
	militaryPickedSymbolDir = icon_dir;
}

function resetSelectedMilitarySymbol()
{
	for(var i=1;i<15;i++)
	{
		$("#m_symbols_friend_"+i).css("border-color", "#ffffff"); 
		$("#m_symbols_friend_"+i).css("border-style", "none"); 
		$("#m_symbols_friend_"+i).css("border-width", "0px"); 
		
		$("#m_symbols_hostile_"+i).css("border-color", "#ffffff"); 
		$("#m_symbols_hostile_"+i).css("border-style", "none"); 
		$("#m_symbols_hostile_"+i).css("border-width", "0px"); 
		
		$("#m_symbols_neutral_"+i).css("border-color", "#ffffff"); 
		$("#m_symbols_neutral_"+i).css("border-style", "none"); 
		$("#m_symbols_neutral_"+i).css("border-width", "0px"); 
		
		$("#m_symbols_unknow_"+i).css("border-color", "#ffffff"); 
		$("#m_symbols_unknow_"+i).css("border-style", "none"); 
		$("#m_symbols_unknow_"+i).css("border-width", "0px"); 
		
		$("#m_symbols_ground_"+i).css("border-color", "#ffffff"); 
		$("#m_symbols_ground_"+i).css("border-style", "none"); 
		$("#m_symbols_ground_"+i).css("border-width", "0px"); 
		
	}
	
	militaryPickedSymbol = -1;
	militaryPickedSymbolDir = "NO";
}

function loadMilitarySymbolsArrayFromFile()
{
	var message = "";
	var fileToLoad = document.getElementById("fileMilitarySymbols").files[0];
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) 
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		$("#divMilitarySymbolsBuffers").html(textFromFileLoaded);
	};
	
	fileReader.readAsText(fileToLoad, "UTF-8");
	message = $("#divMilitarySymbolsBuffers").html();
	
	/*for the first version text file is used to store data
	if(message != "")
	{
		clearMilitarySymbolLayers();
	
		var milArray = message.split("||");
		for(var i=0;i<milArray.length;i++)
		{
			var item = [];
			item = milArray[i].split(",");
			item[0] = i;
			item[1] = item[1];
			item[2] = parseFloat(item[2]);
			item[3] = parseFloat(item[3]);
			item[4] = item[4];
			militarySymbolsArray[militarySymbolIndex] = item;	
			drawMilitarySymbol(militarySymbolsArray[i][1],militarySymbolsArray[i][2],militarySymbolsArray[i][3]);
			militarySymbolsGraphicPointLayer.graphics[militarySymbolIndex].setAttributes( {id : militarySymbolIndex});
			militarySymbolsGraphicPointLayer.graphics[militarySymbolIndex].setAttributes( {symbol_name : item[4]});
			militarySymbolIndex++;
		}
	}
	*/	
	
	if(message != "")
	{
		clearMilitarySymbolLayers();
		message = message.replace(/\s+/g,"");
		var milArray = JSON.parse(message);	
		for(var i=0;i<milArray.length;i++)
		{
			var item = [];
			item[0] = milArray[i].id;
			item[1] = milArray[i].image;
			item[2] = parseFloat(milArray[i].lon);
			item[3] = parseFloat(milArray[i].lat);
			item[4] = milArray[i].label;
			
			militarySymbolsArray[militarySymbolIndex] = item;	
			drawMilitarySymbol(militarySymbolsArray[i][1],militarySymbolsArray[i][2],militarySymbolsArray[i][3]);
			militarySymbolsGraphicPointLayer.graphics[militarySymbolIndex].setAttributes( {id : militarySymbolIndex});
			militarySymbolsGraphicPointLayer.graphics[militarySymbolIndex].setAttributes( {symbol_name : item[4]});
			militarySymbolIndex++;
		}
		
		//labelingAllSymbols();
	}
}
	 
function saveMilitarySymbolsArray()
{
	var message = "";
	
	/*for the first version text file is used to store data
	
	for(var i=0;i<militarySymbolsArray.length;i++)
	{
		message = message + militarySymbolsArray[i][0]+","+militarySymbolsArray[i][1]+","+militarySymbolsArray[i][2]+","+militarySymbolsArray[i][3]+","+militarySymbolsArray[i][4];
		if( i < (militarySymbolsArray.length -1))
		{
			message = message + "||";
		}
	}*/

	var json_graphics = "[";
	var end_of_mil_id = militarySymbolsArray.length - 1;
	for(var i=0;i<militarySymbolsArray.length;i++)
	{
		json_graphics  = json_graphics +"{";
		json_graphics  = json_graphics + '"id":"'+militarySymbolsArray[i][0]+'",';
		json_graphics  = json_graphics + '"image":"'+militarySymbolsArray[i][1]+'",';
		json_graphics  = json_graphics + '"lon":"'+militarySymbolsArray[i][2]+'",';
		json_graphics  = json_graphics + '"lat":"'+militarySymbolsArray[i][3]+'",';
		json_graphics  = json_graphics + '"label":"'+militarySymbolsArray[i][4]+'"';
		
		if(i<end_of_mil_id)
		{
			json_graphics  = json_graphics +"},";
		}
		else
		{
			json_graphics  = json_graphics +"}";
		}
	}

	json_graphics  = json_graphics +"]";
	message = json_graphics;


	if(message != "")
	{
		var textToWrite = message;
		var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});
		var fileNameToSaveAs = "m_symbols.txt";

		var downloadLink = document.createElement("a");
		downloadLink.download = fileNameToSaveAs;
		downloadLink.innerHTML = "Download File";
		if (window.webkitURL != null)
		{
			downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
		}
		else
		{
			downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
			downloadLink.onclick = destroyClickedElement;
			downloadLink.style.display = "none";
			document.body.appendChild(downloadLink);
		}
		downloadLink.click();
	}
}

function filterMilitarySymbolsDrawing(symbol_type)
{
	militarySymbolsGraphicPointLayer.clear();
	if(symbol_type == "All")
	{
		for(var i=0;i<militarySymbolsArray.length;i++)
		{
			drawMilitarySymbol(militarySymbolsArray[i][1],militarySymbolsArray[i][2],militarySymbolsArray[i][3]);
		}
	}
	else
	{
		for(var i=0;i<militarySymbolsArray.length;i++)
		{
			var item = militarySymbolsArray[i][1];
			var icon_type = item.search(symbol_type); 
			if(icon_type > -1)
			{
				drawMilitarySymbol(militarySymbolsArray[i][1],militarySymbolsArray[i][2],militarySymbolsArray[i][3]);
			}
		}
	}
}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function addmilitarySymbolsGraphicPointLayer(map)
{
	require(["esri/layers/GraphicsLayer"],function(	GraphicsLayer) 
	{	
		militarySelectedSymbolsGraphicPointLayer = new  GraphicsLayer();
		map.addLayer(militarySelectedSymbolsGraphicPointLayer);
		
		militarySymbolsGraphicPointLayer = new  GraphicsLayer();
		map.addLayer(militarySymbolsGraphicPointLayer);
	});
}

function selectMilitarySymbol(evt)
{
	require(["esri/geometry/webMercatorUtils"], function(WebMercatorUtils) 
	{	
		var mp = WebMercatorUtils.webMercatorToGeographic(evt.mapPoint);
		var iPoint = getTheclosestPoint(mp.x,mp.y);
		setMilitarySymbolSelectedIndex(iPoint);
		drawSelectedMilitarySymbol();
	});
}

function updateMilitarySymbol(evt)
{
	require(["esri/geometry/webMercatorUtils"], function(WebMercatorUtils) 
	{	
		var mp = WebMercatorUtils.webMercatorToGeographic(evt.mapPoint);
		if(militarySymbolSelectedIndex > -1)
		{
			militarySymbolsArray[militarySymbolSelectedIndex][2] = mp.x;
			militarySymbolsArray[militarySymbolSelectedIndex][3] = mp.y;
			drawSelectedMilitarySymbol();
		}
	});
}

function addMilitarySymbol(iconURL,evt)
{
	var symbol_name = $("#symbol_name").val();
	
	if(militaryPickedSymbolDir == "NO") 
		return false;
		
	if(symbol_name == "" )
	{
		alert("กรุณากรอกข้อมูลสัญลักษณ์");
		$( "#symbol_name" ).focus();
		return false;
	}
	
	require([
	  "esri/geometry/webMercatorUtils"
	], 
	function(
		WebMercatorUtils
	) 
	{
		if(militaryPickedSymbol > -1)
		{
			var mp = WebMercatorUtils.xyToLngLat(evt.mapPoint.x,evt.mapPoint.y);
			var lon = mp[0];
			var lat = mp[1];
			
			drawMilitarySymbol(iconURL,lon,lat)
			var item = [];
			item[0] = militarySymbolIndex;
			item[1] = iconURL;
			item[2] = lon;
			item[3] = lat;
			item[4] = symbol_name;
			
			militarySymbolsGraphicPointLayer.graphics[militarySymbolIndex].setAttributes( {id : militarySymbolIndex});
			militarySymbolsGraphicPointLayer.graphics[militarySymbolIndex].setAttributes( {symbol_name : symbol_name});
			militarySymbolsArray[militarySymbolIndex] = item;
			militarySymbolIndex++;
		}
	});
}

function clearMilitarySymbolLayers()
{
	militarySelectedSymbolsGraphicPointLayer.clear();
	militarySymbolsGraphicPointLayer.clear();
	militarySymbolsArray = [];
	militarySymbolIndex = 0;
	militarySymbolSelectedIndex = -1;
}

function removeMilitarySymbol()
{
	if(militarySymbolSelectedIndex > -1)
	{
		var tmpArray = militarySymbolsArray;

		militarySymbolsGraphicPointLayer.clear();
		militarySymbolsArray = [];
		militarySymbolIndex = 0;
	
		console.log("militarySymbolSelectedIndex : "+militarySymbolSelectedIndex);
		for(var i = 0;i<tmpArray.length;i++)
		{
			if(i != militarySymbolSelectedIndex)
			{
				
				drawMilitarySymbol(tmpArray[i][1],tmpArray[i][2],tmpArray[i][3]);
				
				militarySymbolsGraphicPointLayer.graphics[militarySymbolIndex].setAttributes( {id : militarySymbolIndex});
				militarySymbolsArray[militarySymbolIndex] = tmpArray[i];
				militarySymbolsArray[militarySymbolIndex][0] = militarySymbolIndex
				militarySymbolIndex++;
			}
		}
		militarySelectedSymbolsGraphicPointLayer.clear();
		militarySymbolSelectedIndex = -1;
		
		//labelingAllSymbols();
	}
}

function drawMilitarySymbol(iconURL,lon,lat)
{
	require([
	  "esri/geometry/webMercatorUtils",
	  "esri/symbols/PictureMarkerSymbol",
	  "esri/geometry/Point",
	  "esri/graphic",
	  "esri/SpatialReference",
	], 
	function(
		WebMercatorUtils,
		PictureMarkerSymbol,
		Point,
		Graphic,
		SpatialReference
	) 
	{
		var coord = WebMercatorUtils.lngLatToXY(parseFloat(lon),parseFloat(lat));
		var symbol = new PictureMarkerSymbol(iconURL, 30, 30);
		var geometry = new Point(parseFloat(coord[0]),parseFloat(coord[1]),new SpatialReference({ wkid:sp_wkid })); 
		militarySymbolsGraphicPointLayer.add(new Graphic(geometry, symbol));
	});
}

function drawSelectedMilitarySymbol()
{
	require([
	  "esri/geometry/webMercatorUtils",
	  "esri/symbols/SimpleMarkerSymbol",
	  "esri/symbols/SimpleLineSymbol",
	  "esri/geometry/Point",
	  "esri/graphic",
	  "esri/SpatialReference",
	  "esri/symbols/Font",
	  "esri/symbols/TextSymbol",
	  "dojo/_base/Color"
	], 
	function(
		WebMercatorUtils,
		SimpleMarkerSymbol,
		SimpleLineSymbol,
		Point,
		Graphic,
		SpatialReference,
		Font,
		TextSymbol,
		Color
	) 
	{
		if(militarySymbolSelectedIndex > -1)
		{
			militarySelectedSymbolsGraphicPointLayer.clear();
			var item = militarySymbolsArray[militarySymbolSelectedIndex];
			var coord = WebMercatorUtils.lngLatToXY(parseFloat(item[2]),parseFloat(item[3]));
			var geometry = new Point(parseFloat(coord[0]),parseFloat(coord[1]),new SpatialReference({ wkid:sp_wkid })); 
			var lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([255, 0, 0]), 1);
			var symbol = new esri.symbol.SimpleMarkerSymbol(SimpleMarkerSymbol.STYLE_SQUARE,25,lineSymbol,new Color([255,255,155,0.0]));
			militarySelectedSymbolsGraphicPointLayer.add(new Graphic(geometry,symbol));
			
			
			var font = new Font("14px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLDER);
			var textSymbol = new TextSymbol(item[4],font, new Color([255, 255, 0]));
			textSymbol.setOffset(25,15);
            var labelPointGraphic = new Graphic(geometry, textSymbol);
            militarySelectedSymbolsGraphicPointLayer.add(labelPointGraphic);
			
			
			//labelingAllSymbols();
		}
	});
}

function setMilitarySymbolSelectedIndex(index)
{
	militarySymbolSelectedIndex = index;
}

/*this is to show all labels for all symbols
function labelingAllSymbols()
{
	require([
	  "esri/geometry/webMercatorUtils",
	  "esri/symbols/SimpleMarkerSymbol",
	  "esri/symbols/SimpleLineSymbol",
	  "esri/geometry/Point",
	  "esri/graphic",
	  "esri/SpatialReference",
	  "esri/symbols/Font",
	  "esri/symbols/TextSymbol",
	  "dojo/_base/Color"
	], 
	function(
		WebMercatorUtils,
		SimpleMarkerSymbol,
		SimpleLineSymbol,
		Point,
		Graphic,
		SpatialReference,
		Font,
		TextSymbol,
		Color
	) 
	{
		for(var i=0;i<militarySymbolsArray.length;i++)
		{
			var temp = militarySymbolsArray[i];
			var p_lon = temp[2];
			var p_lat = temp[3];
			var symbol_name = temp[4];	
			var coord = WebMercatorUtils.lngLatToXY(parseFloat(p_lon),parseFloat(p_lat));
			var geometry = new Point(parseFloat(coord[0]),parseFloat(coord[1]),new SpatialReference({ wkid:sp_wkid })); 
			var font = new Font("14px", Font.STYLE_NORMAL, Font.VARIANT_NORMAL, Font.WEIGHT_BOLDER);
			var textSymbol = new TextSymbol(symbol_name,font, new Color([255, 255, 0]));
			textSymbol.setOffset(25,15);
			var labelPointGraphic = new Graphic(geometry, textSymbol);
			militarySelectedSymbolsGraphicPointLayer.add(labelPointGraphic);	
		}
	});
}
*/

function getTheclosestPoint(lon,lat)
{
	var shortestdistance = 6371;
	var item = militarySymbolsArray[0];
	militarySymbolSelectedIndex = item[0];
	for(var i=0;i<militarySymbolsArray.length;i++)
	{
		item = militarySymbolsArray[i];
		var p_lon = item[2];
		var p_lat = item[3];
			
		var distance = getDistanceFromLatLonInKm(lat,lon,p_lat,p_lon);
		if(distance < shortestdistance)
		{
			militarySymbolSelectedIndex = item[0];
			shortestdistance = distance;
		}
	}
		
	if(map.getLevel()== 1 ) {if(shortestdistance>500.0)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 2 ) {if(shortestdistance>250.0)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 3 ) {if(shortestdistance>100.0)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 4 ) {if(shortestdistance>75.0)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 5 ) {if(shortestdistance>50.0)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 6 ) {if(shortestdistance>25.0)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 8 ) {if(shortestdistance>10.0)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 7 ) {if(shortestdistance>7.5)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 9 ) {if(shortestdistance>5.0)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 10 ) {if(shortestdistance>1.5)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 11 ) {if(shortestdistance>0.75)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 12 ) {if(shortestdistance>0.5)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 13 ) {if(shortestdistance>0.25)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 14 ) {if(shortestdistance>0.1)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 15 ) {if(shortestdistance>0.075)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 16 ) {if(shortestdistance>0.05)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 17 ) {if(shortestdistance>0.025)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()== 18 ) {if(shortestdistance>0.01)militarySymbolSelectedIndex = -1;}
	if(map.getLevel()>= 19 ) {if(shortestdistance>0.005)militarySymbolSelectedIndex = -1;}
		
	return militarySymbolSelectedIndex;
}

function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) 
{
	var R = 6371; 
	var dLat = this.deg2rad(lat2-lat1);  
	var dLon = this.deg2rad(lon2-lon1); 
	var a = 
		Math.sin(dLat/2) * Math.sin(dLat/2) +
		Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
		Math.sin(dLon/2) * Math.sin(dLon/2); 
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
	var d = R * c; 
	return d;
}
	  
function deg2rad(deg) 
{
	return deg * (Math.PI/180)
}