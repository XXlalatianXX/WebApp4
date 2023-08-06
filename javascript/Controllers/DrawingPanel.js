require(["dojo/parser", "dijit/ColorPalette"]);

// Set border to red if it active.
function highlightCurrentUseDrawingTools(id)
{
	for(var i=0;i<9;i++)
	{
		var node = dojo.byId("img"+i);
		node.style.borderWidth = "0px";
		node.style.borderStyle = "none";
		node.style.borderColor = "#ffffff";
	}
				
	var activeNode = dojo.byId("img"+id);
	activeNode.style.borderWidth = "1px";
	activeNode.style.borderStyle = "solid";
	activeNode.style.borderColor = "#ffffff";
	dojo.byId("active").src = "images/DrawingIcons/DeactiveDrawing.png";
}

// Change picture when deactive drawing.
function deactiveDrawingTool()
{
	toolbar.deactivate();
	dojo.byId("active").src = "images/DrawingIcons/activeDrawing.png";
}

function showSettingPanel(id1,id2,id3)
{
	dojo.byId(id1).style.display = "block";
	dojo.byId(id2).style.display = "none";
	dojo.byId(id3).style.display = "none";
}

function hideSettingPanel(id1,id2,id3)
{
	dojo.byId(id1).style.display = "none";
	dojo.byId(id2).style.display = "none";
	dojo.byId(id3).style.display = "none";
}

//Simple Marker
function getSimpleColor(value,id)
{
	var node = dojo.byId(id);
	node.style.backgroundColor = value;
}		

function displayDrawingToolBar()
{
	var iconWidth = 20;
	var iconHeight = 20;
	var html = "";
	html = html+"<table cellpadding='1' cellspacing='0' style='font-size:0.85em;'>";
	html = html+"<tr>";
	html = html+"<td colspan='11'>";
	html = html+"File : <input type='file' id='fileDrawingGraphics' onchange='loadDrawingGraphicsArrayFromFile()'><div id='divDrawingGraphicsBuffers' style='display:none'></div><hr class='hr2'>";
	html = html+"</td>";
	html = html+"</tr>";
	html = html+"<tr>";	
	html = html+"<td colspan='11'>";
	html = html+"Tools : <input type='button' onclick='loadDrawingGraphicsArrayFromFile()' value='Load'></button>";
	html = html+" <input type='button' onclick='saveDrawingGraphics()' value='Save'></button> ";
	html = html+" <input type='button' onclick='delGraphicOnDrawingLayer()' value='Delete'></button> ";
	html = html+"<hr class='hr2'></td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td style = 'cursor:pointer'><img id='active' src='images/DrawingIcons/ActiveDrawing.png' width='"+iconWidth+"' height='"+iconHeight+"' onClick='deactiveDrawingTool();hideSettingPanel(&quot;polygonSetting&quot;,&quot;pointSetting&quot;,&quot;lineSetting&quot;)' style = 'border-width:0px;border-style:solid;border-color:#000000'></td>";
	html = html+"<td style = 'cursor:pointer'><img id='img0' src='images/DrawingIcons/Point.png' width='"+iconWidth+"' height='"+iconHeight+"' onClick='toolbar.activate(esri.toolbars.Draw.POINT);highlightCurrentUseDrawingTools(0);showSettingPanel(&quot;pointSetting&quot;,&quot;lineSetting&quot;,&quot;polygonSetting&quot;)'></td>";
	html = html+"<td style = 'cursor:pointer'><img id='img1' src='images/DrawingIcons/Line.png' width='"+iconWidth+"' height='"+iconHeight+"' onClick='toolbar.activate(esri.toolbars.Draw.POLYLINE);highlightCurrentUseDrawingTools(1);showSettingPanel(&quot;lineSetting&quot;,&quot;pointSetting&quot;,&quot;polygonSetting&quot;)'></td>";
	html = html+"<td style = 'cursor:pointer'><img id='img2' src='images/DrawingIcons/FreehandLine.png' width='"+iconWidth+"' height='"+iconHeight+"' onClick='toolbar.activate(esri.toolbars.Draw.FREEHAND_POLYLINE);highlightCurrentUseDrawingTools(2);showSettingPanel(&quot;lineSetting&quot;,&quot;pointSetting&quot;,&quot;polygonSetting&quot;)'></td>";
	html = html+"<td style = 'cursor:pointer'><img id='img3' src='images/DrawingIcons/Polygon.png' width='"+iconWidth+"' height='"+iconHeight+"' onClick='toolbar.activate(esri.toolbars.Draw.POLYGON);highlightCurrentUseDrawingTools(3);showSettingPanel(&quot;polygonSetting&quot;,&quot;pointSetting&quot;,&quot;lineSetting&quot;)'></td>";
	html = html+"<td style = 'cursor:pointer'><img id='img4' src='images/DrawingIcons/FreehandPolygon.png' width='"+iconWidth+"' height='"+iconHeight+"' onClick='toolbar.activate(esri.toolbars.Draw.FREEHAND_POLYGON);highlightCurrentUseDrawingTools(4);showSettingPanel(&quot;polygonSetting&quot;,&quot;pointSetting&quot;,&quot;lineSetting&quot;)'></td>";
	html = html+"<td style = 'cursor:pointer'><img id='img5' src='images/DrawingIcons/Circle.png' width='"+iconWidth+"' height='"+iconHeight+"' onClick='toolbar.activate(esri.toolbars.Draw.CIRCLE);highlightCurrentUseDrawingTools(5);showSettingPanel(&quot;polygonSetting&quot;,&quot;pointSetting&quot;,&quot;lineSetting&quot;)'></td>";
	html = html+"<td style = 'cursor:pointer'><img id='img6' src='images/DrawingIcons/Ellipse.png' width='"+iconWidth+"' height='"+iconHeight+"' onClick='toolbar.activate(esri.toolbars.Draw.ELLIPSE);highlightCurrentUseDrawingTools(6);showSettingPanel(&quot;polygonSetting&quot;,&quot;pointSetting&quot;,&quot;lineSetting&quot;)'></td>";
	html = html+"<td style = 'cursor:pointer'><img id='img7' src='images/DrawingIcons/Rectangle.png' width='"+iconWidth+"' height='"+iconHeight+"' onClick='toolbar.activate(esri.toolbars.Draw.RECTANGLE);highlightCurrentUseDrawingTools(7);showSettingPanel(&quot;polygonSetting&quot;,&quot;pointSetting&quot;,&quot;lineSetting&quot;)'></td>";
	html = html+"<td style = 'cursor:pointer'><img id='img8' src='images/DrawingIcons/Arrow.png' width='"+iconWidth+"' height='"+iconHeight+"' onClick='toolbar.activate(esri.toolbars.Draw.ARROW);highlightCurrentUseDrawingTools(8);showSettingPanel(&quot;polygonSetting&quot;,&quot;pointSetting&quot;,&quot;lineSetting&quot;)'></td>";
	html = html+"<td style = 'cursor:pointer'><img id='img8' src='images/DrawingIcons/ClearDrawing.png' width='"+iconWidth+"' height='"+iconHeight+"' onClick='clearDrawingGraphicsLayer();hideSettingPanel(&quot;polygonSetting&quot;,&quot;pointSetting&quot;,&quot;lineSetting&quot;)'></td>";
	html = html+"</tr>";
	html = html+"</table>";

	//Set marker symbol style
	html = html+"<div id='pointSetting' style='display:none'>";
	html = html+"<table class='tableDraw'>";
	html = html+"<tr>";
	html = html+"<td>Point Style</td><td>:</td><td>";
	html = html+"<select id='simpleMakerStyle' name='simpleMakerStyle' style='color:black;'>";
	for(var i=0;i<SimpleMarkerSymbolStyles.length;i++)
	{
		html = html+" <option value='"+i+"'>"+SimpleMarkerSymbolStyles[i]+"</option>";
	}
	html = html+"</select>";
	html = html+"</td>";
	html = html+"</tr>";	
	html = html+"<tr>";
	html = html+"<td>Point Size</td><td>:</td><td><input type='number' id='simpleMakerSize' name='simpleMakerSize' value='10' style='background-color:white;color:black;height:12;width:40px'></td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td colspan='3'><hr>";
	html = html+"</td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td>Border Width</td><td>:</td><td><input type='number' id='simpleBorderWidth' name='simpleBorderWidth' value='1' style='background-color:white;color:black;height:15;width:40px'></td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td>Border Style</td><td>:</td><td>";
	html = html+"<select id='simpleBorderMakerStyle' name='simpleBorderMakerStyle' style='color:black;'>";
	for(var i=0;i<SimpleLineStyles.length;i++)
	{
		html = html+" <option value='"+i+"'>"+SimpleLineStyles[i]+"</option>";
	}
	html = html+"</select>";
	html = html+"</td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td>Border Color</td><td>:</td><td><div id='simpleBorderMarkerColor' style='cursor:pointer;border-style:solid;border-color:#000000;border-width:1px;width:20px;background-color:#ffffff;color:black;'>&nbsp;</div></td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td colspan='3'>";
	html = html+"<div data-dojo-type='dijit/ColorPalette' data-dojo-props='onChange:function(){getSimpleColor(this.value,&quot;simpleBorderMarkerColor&quot;);}, palette:&quot;7x10&quot;'></div>";
	html = html+"<br>Transparent: <input type='number' step='0.1' value='0.5' id='simpleBorderMarkerTransparent' name='simpleBorderMarkerTransparent' style='background-color:white;color:black;height:12;width:45px;'>(0-1)<hr>";
	html = html+"</td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td>Fill Color</td><td>:</td><td><div id='fillSimpleMarkerColor' style='border-style:solid;border-color:#000000;color:black;border-width:1px;width:20px;background-color:#ffffff;'>&nbsp;</div></td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td colspan='3'>";
	html = html+"<div data-dojo-type='dijit/ColorPalette' data-dojo-props='onChange:function(){getSimpleColor(this.value,&quot;fillSimpleMarkerColor&quot;);}, palette:&quot;7x10&quot;'></div>";
	html = html+"<br>Transparent: <input type='number' step='0.1' value='0.5' id='fillSimpleMarkerTransparent' name='fillSimpleMarkerTransparent' style='background-color:white;color:black;height:12;width:45px;'>(0-1)";
	html = html+"<br></td>";
	html = html+"</tr>";
	html = html+"</table>";
	html = html+"</div>";
	
	//Set simple line symbol style.
	html = html+"<div id='lineSetting' style='display:none'>";
	html = html+"<table class='tableDraw'>";
	html = html+"<tr>";
	html = html+"<td>Line Width</td><td>:</td><td><input type='number' id='simpleLineWidth' name='simpleLineWidth' value='1' style='background-color:white;color:black;height:12;width:45px;'></td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td>Line Style</td><td>:</td><td>";
	html = html+"<select id='simpleLineStyle' name='simpleLineStyle' style='color:black;'>";
	for(var i=0;i<SimpleLineStyles.length;i++)
	{
		html = html+" <option value='"+i+"'>"+SimpleLineStyles[i]+"</option>";
	}
	html = html+"</select>";
	html = html+"</td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td>Line Color</td><td>:</td><td><div id='simpleLineColor' style='cursor:pointer;border-style:solid;border-color:#000000;color:black;border-width:1px;width:20px;background-color:#ffffff;'>&nbsp;</div></td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td colspan='3'>";
	html = html+"<div data-dojo-type='dijit/ColorPalette' data-dojo-props='onChange:function(){getSimpleColor(this.value,&quot;simpleLineColor&quot;);}, palette:&quot;7x10&quot;'></div>";
	html = html+"<br>Transparent: <input type='number' step='0.1' value='0.5' id='simpleLineTransparent' name='simpleLineTransparent' style='background-color:white;color:black;height:12;width:45px;'>(0-1)";
	html = html+"</td>";
	html = html+"</tr>";
	html = html+"</table>";
	html = html+"</div>";
	
	//Set simple polygon
	html = html+"<div id='polygonSetting' style='display:none'>";
	html = html+"<table class='tableDraw'>";
	html = html+"<tr>";
	html = html+"<td>Border Width</td><td>:</td><td><input type='number' id='simpleBorderFillWidth' name='simpleBorderFillWidth' value='1' style='background-color:white;color:black;height:12;width:45px;'></td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td>Border Style</td><td>:</td><td>";
	html = html+"<select id='simpleBorderFillStyle' name='simpleBorderFillStyle' style='color:black;'>";
	for(var i=0;i<SimpleLineStyles.length;i++)
	{
		html = html+" <option value='"+i+"'>"+SimpleLineStyles[i]+"</option>";
	}
	html = html+"</select>";
	html = html+"</td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td>Border Color</td><td>:</td><td><div id='simpleBorderFillColor' style='cursor:pointer;border-style:solid;border-color:#000000;color:black;border-width:1px;width:20px;background-color:#ffffff;'>&nbsp;</div></td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td colspan='3'>";
	html = html+"<div data-dojo-type='dijit/ColorPalette' data-dojo-props='onChange:function(){getSimpleColor(this.value,&quot;simpleBorderFillColor&quot;);}, palette:&quot;7x10&quot;'></div>";
	html = html+"<br>Transparent: <input type='number' step='0.1' value='0.5' id='simpleBorderFillTransparent' name='simpleBorderFillTransparent' style='background-color:white;color:black;height:15;width:45px'>(0-1)<hr>";
	html = html+"</td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td>Fill Style</td><td>:</td><td>";
	html = html+"<select id='simpleFillStyle' name='simpleFillStyle' style='color:black;'>";
	for(var i=0;i<SimpleFillSymbolStyles.length;i++)
	{
		html = html+" <option value='"+i+"'>"+SimpleFillSymbolStyles[i]+"</option>";
	}
	html = html+"</select>";
	html = html+"</td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td>Fill Color</td><td>:</td><td><div id='simpleFillColor' style='border-style:solid;border-color:#000000;color:black;border-width:1px;width:20px;background-color:#ffffff;'>&nbsp;</div></td>";
	html = html+"</tr>";
	html = html+"<tr>";
	html = html+"<td colspan='3'>";
	html = html+"<div data-dojo-type='dijit/ColorPalette' data-dojo-props='onChange:function(){getSimpleColor(this.value,&quot;simpleFillColor&quot;);}, palette:&quot;7x10&quot;'></div>";
	html = html+"<br>Transparent: <input type='number' step='0.1' value='0.5' id='simpleFillTransparent' name='simpleFillTransparent' style='background-color:white;color:black;height:12;width:45px'>(0-1)";
	html = html+"</td>";
	html = html+"</tr>";
	html = html+"</table>";
	html = html+"</div>";
	return html;
}

