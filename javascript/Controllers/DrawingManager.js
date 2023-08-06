
var drawingGraphicLayer,toolbar;
var sp_wkid = 102113;

function createDrawingToolbar(map)
{
	dojo.connect(map, "onLoad", setDrawingToolbar);
	drawingGraphicLayer = new esri.layers.GraphicsLayer();
	map.addLayer(drawingGraphicLayer);
	
	//The extension for saving drawing graphics. 
	//Add grahic to drawingGraphicsArray affer graphic added. 
	//Also increase the drawingIndexGraphics.
		
	drawingGraphicLayer.on("graphic-add", function(evt) 
	{
		addGraphicToDrawingLayer(evt);
	});
	
	drawingGraphicLayer.on("click", function(evt)
	{
		drawingSelectedIndexGrphics = findDrawingGraphicsObject(evt.graphic);
	});
}

function setDrawingToolbar(map) 
{
    toolbar = new esri.toolbars.Draw(map);
    dojo.connect(toolbar, "onDrawEnd", drawGeometry);
}
   
var SimpleLineStyles = [
						esri.symbol.SimpleLineSymbol.STYLE_SOLID,
						esri.symbol.SimpleLineSymbol.STYLE_DASH,
						esri.symbol.SimpleLineSymbol.STYLE_DOT,
						esri.symbol.SimpleLineSymbol.STYLE_DASHDOTDOT,
						esri.symbol.SimpleLineSymbol.STYLE_DASHDOT,
						esri.symbol.SimpleLineSymbol.STYLE_SHORTDASH,
						esri.symbol.SimpleLineSymbol.STYLE_SHORTDOT,
						esri.symbol.SimpleLineSymbol.STYLE_SHORTDASHDOTDOT,
						esri.symbol.SimpleLineSymbol.STYLE_SHORTDASHDOT,
						esri.symbol.SimpleLineSymbol.STYLE_LONGDASH,
						esri.symbol.SimpleLineSymbol.STYLE_LONGDASHDOT,
						esri.symbol.SimpleLineSymbol.STYLE_NULL
						];
						
var SimpleFillSymbolStyles = [
						esri.symbol.SimpleFillSymbol.STYLE_SOLID,
						esri.symbol.SimpleFillSymbol.STYLE_HORIZONTAL,
						esri.symbol.SimpleFillSymbol.STYLE_VERTICAL,
						esri.symbol.SimpleFillSymbol.STYLE_FORWARD_DIAGONAL,
						esri.symbol.SimpleFillSymbol.STYLE_BACKWARD_DIAGONAL,
						esri.symbol.SimpleFillSymbol.STYLE_CROSS,
						esri.symbol.SimpleFillSymbol.STYLE_DIAGONAL_CROSS,
						esri.symbol.SimpleFillSymbol.STYLE_NULL
						];
						
var SimpleMarkerSymbolStyles = [
						esri.symbol.SimpleMarkerSymbol.STYLE_CIRCLE,
						esri.symbol.SimpleMarkerSymbol.STYLE_SQUARE,
						esri.symbol.SimpleMarkerSymbol.STYLE_CROSS,
						esri.symbol.SimpleMarkerSymbol.STYLE_X,
						esri.symbol.SimpleMarkerSymbol.STYLE_DIAMOND						
						];
	
function drawPoint(geometry)
{
	var simpleMakerStyle = parseInt(dojo.byId("simpleMakerStyle").value);
	var simpleMakerSize = parseFloat(dojo.byId("simpleMakerSize").value);
	var simpleBorderWidth = parseFloat(dojo.byId("simpleBorderWidth").value);
	var simpleBorderMakerStyle = parseInt(dojo.byId("simpleBorderMakerStyle").value);
	
	var simpleBorderMarkerColor = dojo.byId("simpleBorderMarkerColor").style.backgroundColor;
	var simpleBorderMarkerTransparent = parseFloat(dojo.byId("simpleBorderMarkerTransparent").value);
	var borderMarkerColor = new dojo.Color(simpleBorderMarkerColor);
	borderMarkerColor = borderMarkerColor.toRgba();
	borderMarkerColor[3]=simpleBorderMarkerTransparent;
	
	var fillSimpleMarkerColor = dojo.byId("fillSimpleMarkerColor").style.backgroundColor;
	var fillSimpleMarkerTransparent = parseFloat(dojo.byId("fillSimpleMarkerTransparent").value);
	var makerColor = new dojo.Color(fillSimpleMarkerColor);
	makerColor = makerColor.toRgba();
	makerColor[3]=fillSimpleMarkerTransparent;
	
	
	var point = new Point(drawingGraphicLayer,geometry.x,geometry.y,sp_wkid);
		point.drawSimpleMarkerSymbol(SimpleMarkerSymbolStyles[simpleMakerStyle],
									simpleMakerSize,makerColor,
									SimpleLineStyles[simpleBorderMakerStyle],
									borderMarkerColor,simpleBorderWidth);
									
}

function drawLine(geometry)
{
	var simpleLineWidth = parseFloat(dojo.byId("simpleLineWidth").value);
	var simpleLineStyle = parseInt(dojo.byId("simpleLineStyle").value);
	var simpleLineColor = dojo.byId("simpleLineColor").style.backgroundColor;
	var simpleLineTransparent = parseFloat(dojo.byId("simpleLineTransparent").value);
	var lineColor = new dojo.Color(simpleLineColor);
	lineColor = lineColor.toRgba();
	lineColor[3] = simpleLineTransparent;
		
	var polyline = new PolyLine(drawingGraphicLayer,geometry.paths,sp_wkid);
	polyline.drawSimpleLineSymbol(SimpleLineStyles[simpleLineStyle],lineColor,simpleLineWidth);
									
}

function drawPolygon(geometry)
{
	var simpleBorderFillWidth = parseFloat(dojo.byId("simpleBorderFillWidth").value);
	var simpleBorderFillStyle = parseInt(dojo.byId("simpleBorderFillStyle").value);
		
	var simpleBorderFillColor = dojo.byId("simpleBorderFillColor").style.backgroundColor;
	var simpleBorderFillTransparent = parseFloat(dojo.byId("simpleBorderFillTransparent").value);
		
	var borderFillColor = new dojo.Color(simpleBorderFillColor);
	borderFillColor = borderFillColor.toRgba();
	borderFillColor[3]=simpleBorderFillTransparent;
	
	var simpleFillStyle = parseInt(dojo.byId("simpleFillStyle").value);
	
	var simpleFillColor = dojo.byId("simpleFillColor").style.backgroundColor;
	var simpleFillTransparent = parseFloat(dojo.byId("simpleFillTransparent").value);
	
	var fillColor = new dojo.Color(simpleFillColor);
	fillColor = fillColor.toRgba();
	fillColor[3]=simpleFillTransparent;
	
	
	var polygon = new Polygon(drawingGraphicLayer,geometry.rings,sp_wkid);
	polygon.drawSimpleFillSymbol(SimpleFillSymbolStyles[simpleFillStyle],
											fillColor,
											SimpleLineStyles[simpleBorderFillStyle],
											borderFillColor,simpleBorderFillWidth);
									
}

function drawGeometry(geometry) 
{
    switch (geometry.type) 
	{
        case "point":drawPoint(geometry);break;
        case "polyline":drawLine(geometry);break;
        case "polygon":drawPolygon(geometry);break;
    }
}

function PolyLine(graphicLayer,paths,wkid)
{
	this.graphicLayer = graphicLayer;
	this.paths = paths;
	this.wkid = wkid;
	this.polylineJson = {"paths": this.paths, "spatialReference":{"wkid":this.wkid}};
	this.polyline = new esri.geometry.Polyline(this.polylineJson);
		
	this.drawSimpleLineSymbol = function(style,color,width)
	{		
		var symbol = new esri.symbol.SimpleLineSymbol(style, new dojo.Color(color),width);
		this.graphicLayer.add(new esri.Graphic(this.polyline,symbol));
	}
				
	this.drawCartographicLineSymbol = function(style,color,width,cap,join,miterLimit)
	{
		var symbol = new esri.symbol.CartographicLineSymbol(style, new dojo.Color(color), width, cap, join, miterLimit);
		this.graphicLayer.add(new esri.Graphic(this.polyline,symbol));
	}
}

function Polygon(graphicLayer,rings,wkid)
{
	this.graphicLayer = graphicLayer;
	this.rings = rings;
	this.wkid = wkid;
	this.polygonJson = {"rings":this.rings, "spatialReference":{"wkid":this.wkid}};
	this.polygon = new esri.geometry.Polygon(this.polygonJson);
	
	this.drawSimpleFillSymbol = function(fillSymbol,fillColor,lineStyle,lineColor,lineWidth)
	{
		var lineSymbol = new esri.symbol.SimpleLineSymbol(lineStyle, new dojo.Color(lineColor), lineWidth);
		var symbol = new esri.symbol.SimpleFillSymbol(fillSymbol,lineSymbol,new dojo.Color(fillColor));
		this.graphicLayer.add(new esri.Graphic(this.polygon,symbol));
	}

	this.drawPictureFillSymbol = function(imageUrl,imageWidth,imageHeight,lineStyle,lineColor,lineWidth)
	{
		var lineSymbol = new esri.symbol.SimpleLineSymbol(lineStyle,new dojo.Color(lineColor), lineWidth);
		var symbol = new esri.symbol.PictureFillSymbol(imageUrl,lineSymbol,imageWidth,imageHeight);
		graphicLayer.add(new esri.Graphic(this.polygon,symbol));
	}
}

function Point(graphicLayer,pointX,pointY,wkid)
{
	this.graphicLayer = graphicLayer;
	this.pointX = pointX;
	this.pointY = pointY;
	this.wkid = wkid;
	this.point  = new esri.geometry.Point(parseFloat(this.pointX),parseFloat(this.pointY),new esri.SpatialReference({ wkid:this.wkid })); 
	
	this.drawSimpleMarkerSymbol = function(markerStyle,markerSize,markerColor,lineStyle,lineColor,lineWidth)
	{
		var lineSymbol = new esri.symbol.SimpleLineSymbol(lineStyle, new dojo.Color(lineColor), lineWidth);
		var symbol = new esri.symbol.SimpleMarkerSymbol(markerStyle,markerSize,lineSymbol,new dojo.Color(markerColor));
		this.graphicLayer.add(new esri.Graphic(this.point,symbol));
	}
	
	this.drawPictureMarkerSymbol = function(imageUrl,width,height)
	{
		var symbol = new esri.symbol.PictureMarkerSymbol(imageUrl, width, height);
		this.graphicLayer.add(new esri.Graphic(this.point, symbol));	
	}

	this.drawTextSymbol = function(text,textColor,fontSize,fontStyle,fontVariant,fontWeight,fontFamily)
	{
		var font = new esri.symbol.Font(fontSize,fontStyle,fontVariant,fontWeight,fontFamily);
		var textSymbol = new esri.symbol.TextSymbol(text,font, new dojo.Color(textColor));
		this.graphicLayer.add(new esri.Graphic(this.point,textSymbol));
	}
}

function Circle(graphicLayer,wkid,pointX,pointY,radius)
{
	this.graphicLayer = graphicLayer;
	this.rings = [];
	this.wkid = wkid;
	this.pointX = pointX;
	this.pointY = pointY;
	this.polygonJson;
	this.polygon;
	this.radius = radius;
	
	this.buildRings = function()
	{
		var radiusDegree = (this.radius/0.0309047619047619)/3600;
		var i = 0;
		for ( var step = 0; step <= 360; step += 10) 
		{
			var radian = step * (Math.PI / 180.0);
			var x = this.pointX + radiusDegree * Math.cos(radian);
			var y = this.pointY + radiusDegree * Math.sin(radian);
			var point = [x,y];
			this.rings[i]=point;
			i++;
		}
		this.polygonJson = {"rings":[this.rings], "spatialReference":{"wkid":this.wkid}};
		this.polygon = new esri.geometry.Polygon(this.polygonJson);
	}
	
	this.drawSimpleCircle = function(fillSymbol,fillColor,lineStyle,lineColor,lineWidth)
	{
		var lineSymbol = new esri.symbol.SimpleLineSymbol(lineStyle, new dojo.Color(lineColor), lineWidth);
		var symbol = new esri.symbol.SimpleFillSymbol(fillSymbol,lineSymbol,new dojo.Color(fillColor));
		this.graphicLayer.add(new esri.Graphic(this.polygon,symbol));
	}
	
	this.drawPictureCircle = function(imageUrl,imageWidth,imageHeight,lineStyle,lineColor,lineWidth)
	{
		var lineSymbol = new esri.symbol.SimpleLineSymbol(lineStyle,new dojo.Color(lineColor), lineWidth);
		var symbol = new esri.symbol.PictureFillSymbol(imageUrl,lineSymbol,imageWidth,imageHeight);
		graphicLayer.add(new esri.Graphic(this.polygon,symbol));
	}
}

function Rectangle(graphicLayer,wkid,minX,minY,maxX,maxY)
{
	this.graphicLayer = graphicLayer;
	this.rings = [[parseFloat(minX),parseFloat(minY)],
				[parseFloat(maxX),parseFloat(minY)],
				[parseFloat(maxX),parseFloat(maxY)],
				[parseFloat(minX),parseFloat(maxY)],
				[parseFloat(minX),parseFloat(minY)]];
	this.wkid = wkid;
	this.polygonJson = {"rings":[this.rings], "spatialReference":{"wkid":this.wkid}};
	this.polygon = new esri.geometry.Polygon(this.polygonJson);
		
	this.drawSimpleRectangle = function(fillSymbol,fillColor,lineStyle,lineColor,lineWidth)
	{
		var lineSymbol = new esri.symbol.SimpleLineSymbol(lineStyle, new dojo.Color(lineColor), lineWidth);
		var symbol = new esri.symbol.SimpleFillSymbol(fillSymbol,lineSymbol,new dojo.Color(fillColor));
		this.graphicLayer.add(new esri.Graphic(this.polygon,symbol));
	}
	
	this.drawPictureRectangle = function(imageUrl,imageWidth,imageHeight,lineStyle,lineColor,lineWidth)
	{
		var lineSymbol = new esri.symbol.SimpleLineSymbol(lineStyle,new dojo.Color(lineColor), lineWidth);
		var symbol = new esri.symbol.PictureFillSymbol(imageUrl,lineSymbol,imageWidth,imageHeight);
		graphicLayer.add(new esri.Graphic(this.polygon,symbol));
	}
}


//The extension for saving drawing graphics.
//Add grahic to drawingGraphicsArray affer graphic added.
//Also increase the drawingIndexGraphics.

var drawingGraphicsArray = [];
var drawingIndexGraphics = 0;
var drawingSelectedIndexGrphics = -1;

var isLoadDrawingGraphicsFromFile = false;

function addGraphicToDrawingLayer(evt)
{
	
	if(!isLoadDrawingGraphicsFromFile)
	{	
		var item = {};
		item.id = drawingIndexGraphics;
		item.type = evt.graphic.geometry.type;
		if(evt.graphic.geometry.type == "point")
		{
			var json = evt.graphic.geometry.toJson();
			item.geometry = json.x+","+json.y;
			item.simpleMakerStyle = dojo.byId("simpleMakerStyle").value;
			item.simpleMakerSize = dojo.byId("simpleMakerSize").value;
			item.simpleBorderWidth = dojo.byId("simpleBorderWidth").value;
			item.simpleBorderMakerStyle = dojo.byId("simpleBorderMakerStyle").value;
			item.simpleBorderMarkerColor = dojo.byId("simpleBorderMarkerColor").style.backgroundColor;
			item.simpleBorderMarkerTransparent = dojo.byId("simpleBorderMarkerTransparent").value;
			item.fillSimpleMarkerColor = dojo.byId("fillSimpleMarkerColor").style.backgroundColor;
			item.fillSimpleMarkerTransparent = dojo.byId("fillSimpleMarkerTransparent").value;
		}
		else if (evt.graphic.geometry.type == "polyline")
		{
			var json = evt.graphic.geometry.toJson();
			item.geometry = json.paths;
			item.simpleLineWidth = dojo.byId("simpleLineWidth").value;
			item.simpleLineStyle = dojo.byId("simpleLineStyle").value;
			item.simpleLineColor = dojo.byId("simpleLineColor").style.backgroundColor;
			item.simpleLineTransparent = dojo.byId("simpleLineTransparent").value;
		}
		else if(evt.graphic.geometry.type == "polygon")
		{
			var json = evt.graphic.geometry.toJson();
			item.geometry = json.rings;
			item.simpleBorderFillWidth = dojo.byId("simpleBorderFillWidth").value;
			item.simpleBorderFillStyle = dojo.byId("simpleBorderFillStyle").value;
			item.simpleBorderFillColor = dojo.byId("simpleBorderFillColor").style.backgroundColor;
			item.simpleBorderFillTransparent = dojo.byId("simpleBorderFillTransparent").value;
			item.simpleFillStyle = dojo.byId("simpleFillStyle").value;
			item.simpleFillColor = dojo.byId("simpleFillColor").style.backgroundColor;
			item.simpleFillTransparent = dojo.byId("simpleFillTransparent").value;
		}
		
		drawingGraphicLayer.graphics[drawingIndexGraphics].setAttributes( {name : drawingIndexGraphics});
		drawingGraphicsArray[drawingIndexGraphics] = item;
		drawingIndexGraphics++;
	}
}

function saveDrawingGraphics()
{			
	var message = "";
	var numOfGraphics = drawingGraphicsArray.length;
	
	var end_of_graphics_id = numOfGraphics - 1;
	var json_graphics = "[";
	for(var i=0;i<numOfGraphics;i++)
	{
		json_graphics  = json_graphics +"{";
		var json = drawingGraphicLayer.graphics[i].geometry.toJson();

		if(drawingGraphicsArray[i].type == "point")
		{
			var point = json.x+","+json.y;
			json_graphics  = json_graphics + '"id":"'+drawingGraphicsArray[i].id+'",';
			json_graphics  = json_graphics + '"type":"'+drawingGraphicsArray[i].type+'",';
			json_graphics  = json_graphics + '"geometry":"'+point+'",';
			json_graphics  = json_graphics + '"simpleMakerStyle":"'+drawingGraphicsArray[i].simpleMakerStyle+'",';
			json_graphics  = json_graphics + '"simpleMakerSize":"'+drawingGraphicsArray[i].simpleMakerSize+'",';
			json_graphics  = json_graphics + '"simpleBorderWidth":"'+drawingGraphicsArray[i].simpleBorderWidth+'",';
			json_graphics  = json_graphics + '"simpleBorderMakerStyle":"'+drawingGraphicsArray[i].simpleBorderMakerStyle+'",';
			json_graphics  = json_graphics + '"simpleBorderMarkerColor":"'+drawingGraphicsArray[i].simpleBorderMarkerColor+'",';
			json_graphics  = json_graphics + '"simpleBorderMarkerTransparent":"'+drawingGraphicsArray[i].simpleBorderMarkerTransparent+'",';
			json_graphics  = json_graphics + '"fillSimpleMarkerColor":"'+drawingGraphicsArray[i].fillSimpleMarkerColor+'",';
			json_graphics  = json_graphics + '"fillSimpleMarkerTransparent":"'+drawingGraphicsArray[i].fillSimpleMarkerTransparent+'"';
		}
		else if(drawingGraphicsArray[i].type == "polyline")
		{
			var paths = json.paths;
			json_graphics  = json_graphics + '"id":"'+drawingGraphicsArray[i].id+'",';
			json_graphics  = json_graphics + '"type":"'+drawingGraphicsArray[i].type+'",';
			json_graphics  = json_graphics + '"geometry":"'+paths+'",';
			json_graphics  = json_graphics + '"simpleLineWidth":"'+drawingGraphicsArray[i].simpleLineWidth+'",';
			json_graphics  = json_graphics + '"simpleLineStyle":"'+drawingGraphicsArray[i].simpleLineStyle+'",';
			json_graphics  = json_graphics + '"simpleLineColor":"'+drawingGraphicsArray[i].simpleLineColor+'",';
			json_graphics  = json_graphics + '"simpleLineTransparent":"'+drawingGraphicsArray[i].simpleLineTransparent+'"';
		}
		else if(drawingGraphicsArray[i].type == "polygon")
		{
			var rings = json.rings;
			json_graphics  = json_graphics + '"id":"'+drawingGraphicsArray[i].id+'",';
			json_graphics  = json_graphics + '"type":"'+drawingGraphicsArray[i].type+'",';
			json_graphics  = json_graphics + '"geometry":"'+rings+'",';
			json_graphics  = json_graphics + '"simpleBorderFillWidth":"'+drawingGraphicsArray[i].simpleBorderFillWidth+'",';
			json_graphics  = json_graphics + '"simpleBorderFillStyle":"'+drawingGraphicsArray[i].simpleBorderFillStyle+'",';
			json_graphics  = json_graphics + '"simpleBorderFillColor":"'+drawingGraphicsArray[i].simpleBorderFillColor+'",';
			json_graphics  = json_graphics + '"simpleBorderFillTransparent":"'+drawingGraphicsArray[i].simpleBorderFillTransparent+'",';
			json_graphics  = json_graphics + '"simpleFillStyle":"'+drawingGraphicsArray[i].simpleFillStyle+'",';
			json_graphics  = json_graphics + '"simpleFillColor":"'+drawingGraphicsArray[i].simpleFillColor+'",';
			json_graphics  = json_graphics + '"simpleFillTransparent":"'+drawingGraphicsArray[i].simpleFillTransparent+'"';
		}
		
		if(i<end_of_graphics_id)
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
		var fileNameToSaveAs = "drawing.txt";

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
  
function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function loadDrawingGraphicsArrayFromFile()
{
	isLoadDrawingGraphicsFromFile = true;
	var message = "";
	var fileToLoad = document.getElementById("fileDrawingGraphics").files[0];
	var fileReader = new FileReader();
	fileReader.onload = function(fileLoadedEvent) 
	{
		var textFromFileLoaded = fileLoadedEvent.target.result;
		$("#divDrawingGraphicsBuffers").html(textFromFileLoaded);
	};
	
	fileReader.readAsText(fileToLoad, "UTF-8");
	message = $("#divDrawingGraphicsBuffers").html();
	
	if(message != "")
	{
		message = message.replace(/\s+/g,"");
		var jsonDrawings = JSON.parse(message);
		for(var i=0;i<jsonDrawings.length;i++)
		{
			if(jsonDrawings[i].type == "point")
			{
				drawPointFromFile(jsonDrawings[i]);
			}
			else if(jsonDrawings[i].type == "polyline")
			{
				drawPolylineFromFile(jsonDrawings[i]);
			}
			else if(jsonDrawings[i].type == "polygon")
			{
				drawPolygonFromFile(jsonDrawings[i]);
			}
		}
	}
	
	isLoadDrawingGraphicsFromFile = false;
}

function drawPolygonFromFile(style)
{
	var pStr = String(style.geometry);
	var pCoord = pStr.split(",");
	var rings = [];
	for(var i = 0; i < pCoord.length; i+= 2)
	{
		var item = [];
		item[0] = parseFloat(pCoord[i]);
		item[1] = parseFloat(pCoord[(i+1)]);
		rings.push(item);
	}
	
	var simpleBorderFillWidth = parseFloat(style.simpleBorderFillWidth);
	var simpleBorderFillStyle = parseInt(style.simpleBorderFillStyle);
		
	var simpleBorderFillColor = style.simpleBorderFillColor;
	var simpleBorderFillTransparent = parseFloat(style.simpleBorderFillTransparent);
		
	var borderFillColor = dojo.Color.fromRgb(simpleBorderFillColor);
	borderFillColor = borderFillColor.toRgba();
	borderFillColor[3]=simpleBorderFillTransparent;
	
	var simpleFillStyle = parseInt(style.simpleFillStyle);
	
	var simpleFillColor = style.simpleFillColor;
	var simpleFillTransparent = parseFloat(style.simpleFillTransparent);
	
	var fillColor = dojo.Color.fromRgb(simpleFillColor);
	fillColor = fillColor.toRgba();
	fillColor[3]=simpleFillTransparent;
		
	var polygon = new Polygon(drawingGraphicLayer,[rings],sp_wkid);
	polygon.drawSimpleFillSymbol(SimpleFillSymbolStyles[simpleFillStyle],
											fillColor,
											SimpleLineStyles[simpleBorderFillStyle],
											borderFillColor,simpleBorderFillWidth);
	

	style.id = drawingIndexGraphics;
	drawingGraphicLayer.graphics[drawingIndexGraphics].setAttributes( {name : drawingIndexGraphics});
	drawingGraphicsArray[drawingIndexGraphics] = style;
	drawingIndexGraphics++;
}

function drawPolylineFromFile(style)
{
	var pStr = String(style.geometry);
	var pCoord = pStr.split(",");
	var paths = [];
	for(var i = 0; i < pCoord.length; i+= 2)
	{
		var item = [];
		item[0] = parseFloat(pCoord[i]);
		item[1] = parseFloat(pCoord[(i+1)]);
		paths.push(item);
	}
	
	var simpleLineWidth = parseFloat(style.simpleLineWidth);
	var simpleLineStyle = parseInt(style.simpleLineStyle);
	var simpleLineColor = style.simpleLineColor;
	var simpleLineTransparent = parseFloat(style.simpleLineTransparent);
	var lineColor = dojo.Color.fromRgb(simpleLineColor);
	lineColor = lineColor.toRgba();
	lineColor[3] = simpleLineTransparent;
		
	var polyline = new PolyLine(drawingGraphicLayer,[paths],sp_wkid);
	polyline.drawSimpleLineSymbol(SimpleLineStyles[simpleLineStyle],lineColor,simpleLineWidth);
		
	style.id = drawingIndexGraphics;
	drawingGraphicLayer.graphics[drawingIndexGraphics].setAttributes( {name : drawingIndexGraphics});
	drawingGraphicsArray[drawingIndexGraphics] = style;
	drawingIndexGraphics++;
}

function drawPointFromFile(style)
{
	var pStr = String(style.geometry);
	var p = pStr.split(",");

  	var simpleMakerStyle = parseInt(style.simpleMakerStyle);
	var simpleMakerSize = parseFloat(style.simpleMakerSize);
	var simpleBorderWidth = parseFloat(style.simpleBorderWidth);
	var simpleBorderMakerStyle = parseInt(style.simpleBorderMakerStyle);
		
	var borderMarkerColor = dojo.Color.fromRgb(style.simpleBorderMarkerColor);
	var simpleBorderMarkerTransparent = parseFloat(style.simpleBorderMarkerTransparent);
	borderMarkerColor = borderMarkerColor.toRgba();
	borderMarkerColor[3]=simpleBorderMarkerTransparent;
		
	var fillSimpleMarkerColor = style.fillSimpleMarkerColor;
	var fillSimpleMarkerTransparent = parseFloat(style.fillSimpleMarkerTransparent);
	var makerColor = dojo.Color.fromRgb(fillSimpleMarkerColor);
	makerColor = makerColor.toRgba();
	makerColor[3]=fillSimpleMarkerTransparent;
		
	var point = new Point(drawingGraphicLayer,parseFloat(p[0]),parseFloat(p[1]),sp_wkid);
		point.drawSimpleMarkerSymbol(SimpleMarkerSymbolStyles[simpleMakerStyle],
									simpleMakerSize,makerColor,
									SimpleLineStyles[simpleBorderMakerStyle],
									borderMarkerColor,simpleBorderWidth);	

	
	style.id = drawingIndexGraphics;
	drawingGraphicLayer.graphics[drawingIndexGraphics].setAttributes( {name : drawingIndexGraphics});
	drawingGraphicsArray[drawingIndexGraphics] = style;
	drawingIndexGraphics++;
}

function delGraphicOnDrawingLayer()
{
	if(drawingSelectedIndexGrphics > -1)
	{
		var graphicsArray = drawingGraphicsArray;
		clearDrawingGraphicsLayer();
		isLoadDrawingGraphicsFromFile = true;
		for(var i = 0;i<graphicsArray.length;i++)
		{
			if(i != drawingSelectedIndexGrphics)
			{
				var style = graphicsArray[i];
				if(style.type == "point")
				{
					drawPointFromFile(style);
				}
				else if(style.type == "polyline")
				{
					drawPolylineFromFile(style);
				}
				else if(style.type == "polygon")
				{
					drawPolygonFromFile(style);
				}
			}
		}
		isLoadDrawingGraphicsFromFile = false;
	}
}

function findDrawingGraphicsObject(object)
{	
	return parseInt(object.attributes.name);
}

function clearDrawingGraphicsLayer()
{
	drawingGraphicsArray = [];
	drawingIndexGraphics = 0;
	drawingGraphicLayer.clear();
}
