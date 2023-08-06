var colorsTable = new Array('#CC0000', '#336699', '#9966CC', '#3366FF', '#3399FF',
					'#F76600','#F89900', '#F8CC00', '#0000FA', '#3366FB', 
					'#99CDFB','#0000FF', '#00FFFF', '#F9ECA2', '#FA9000', 
					'#FA5400','#C40000', '#750303', '#F9ECA2', '#FA9000',
					'#CC0000', '#336699', '#9966CC', '#3366FF', '#3399FF',
					'#F76600','#F89900', '#F8CC00', '#0000FA', '#3366FB', 
					'#99CDFB','#0000FF', '#00FFFF', '#F9ECA2', '#FA9000', 
					'#FA5400','#C40000', '#750303', '#F9ECA2', '#FA9000');
 
function loadGraph(parameters,title,width,height,legenWidth,display,detailParameters,dWidth,dHeight,dLegenWidth,dTitle1,dTitle2,dTitle3)
{
 document.getElementById("graph").innerHTML = "Loading....";
 document.getElementById("legen").innerHTML = "";
 $.get(parameters,function(data)
 {
	var dataArray = data.split(",");
	var colors = new Array();
	var itemArray = new Array();
	var idArray = new Array();

	if(!validateGraph(dataArray))
		return;
	
	if(dataArray.length>0)
	{
	  for(i=0;i<dataArray.length;i++)
	  {
	    var temp = dataArray[i].split(":");
		var tempArray = new Array(temp[1],parseInt(temp[2]));
		itemArray[i] = tempArray;
		idArray[i] = temp[0];
		colors[i] = colorsTable[i];
	  }
	}
	
	switch(display)
	{
		case "1":showLegenWithLink(detailParameters,itemArray,idArray,colors,legenWidth,dWidth,dHeight,dLegenWidth,dTitle1,dTitle2,dTitle3,display);
				 loadBarChart(itemArray,title,colors,width,height,false);
				 break;
		case "2":showLegenWithLink(detailParameters,itemArray,idArray,colors,legenWidth,dWidth,dHeight,dLegenWidth,dTitle1,dTitle2,dTitle3,display);
				 loadBarChart(itemArray,title,colors,width,height,true);
				 break;
		case "3":showLegenWithLink(detailParameters,itemArray,idArray,colors,legenWidth,dWidth,dHeight,dLegenWidth,dTitle1,dTitle2,dTitle3,display);
				 loadLineChart(itemArray,title,colors,width,height);
				 break;
		case "4":showLegenWithLink(detailParameters,itemArray,idArray,colors,legenWidth,dWidth,dHeight,dLegenWidth,dTitle1,dTitle2,dTitle3,display);
				 loadPieChart(itemArray,title,colors,width,height,false);
				 break;
		case "5":showLegenWithLink(detailParameters,itemArray,idArray,colors,legenWidth,dWidth,dHeight,dLegenWidth,dTitle1,dTitle2,dTitle3,display);
				 loadPieChart(itemArray,title,colors,width,height,true);
				 break;
		case "6":loadTable(itemArray,idArray,title,width,detailParameters,dWidth,dTitle1,dTitle2,dTitle3);
				 break;
		default : break;
	}
 });
}


function loadGraph2(parameters,title,width,height,legenWidth,display,detailParameters,dWidth,dHeight,dLegenWidth,dTitle1,dTitle2,dTitle3)
{
 document.getElementById("graph").innerHTML = "Loading....";
 document.getElementById("legen").innerHTML = "";
$.get(parameters,function(data)
 {
	var dataArray = data.split(",");
	var colors = new Array();
	var itemArray = new Array();
	var idArray = new Array();
	var maxIndex = 4;
	var other = 0;
	if(!validateGraph(dataArray))
		return;
	if(display!="6")
	{
	 if(dataArray.length>0)
	 {
		for(i=0;i<dataArray.length;i++)
		{
		  var temp = dataArray[i].split(":");
		  if(i<4)
		  {
			var tempArray = new Array(temp[1],parseInt(temp[2]));
			itemArray[i] = tempArray;
			colors[i] = colorsTable[i];
			idArray[i] = Trim(temp[0]);
		  }
		  else
		  {
			 other = other + parseInt(parseInt(temp[2]));
			 var tempArray = new Array("อื่นๆ",other);
			 itemArray[maxIndex] = tempArray;
			 colors[maxIndex] = colorsTable[maxIndex];
			 idArray[maxIndex] = "-1";
		  }
		 }
	  }
	}
	else
	{
		if(dataArray.length>0)
		{
		  for(i=0;i<dataArray.length;i++)
		  {
			var temp = dataArray[i].split(":");
			var tempArray = new Array(temp[1],parseInt(temp[2]));
			itemArray[i] = tempArray;
			idArray[i] = temp[0];
		  }
		}
	}
	
	
	switch(display)
	 {
		case "1":showLegenWithLink(detailParameters,itemArray,idArray,colors,legenWidth,dWidth,dHeight,dLegenWidth,dTitle1,dTitle2,dTitle3,display);
				 loadBarChart(itemArray,title,colors,width,height,false);
				 break;
		case "2":showLegenWithLink(detailParameters,itemArray,idArray,colors,legenWidth,dWidth,dHeight,dLegenWidth,dTitle1,dTitle2,dTitle3,display);
				 loadBarChart(itemArray,title,colors,width,height,true);
				 break;
		case "3":showLegenWithLink(detailParameters,itemArray,idArray,colors,legenWidth,dWidth,dHeight,dLegenWidth,dTitle1,dTitle2,dTitle3,display);
				 loadLineChart(itemArray,title,colors,width,height);
				 break;
		case "4":showLegenWithLink(detailParameters,itemArray,idArray,colors,legenWidth,dWidth,dHeight,dLegenWidth,dTitle1,dTitle2,dTitle3,display);
				 loadPieChart(itemArray,title,colors,width,height,false);
				 break;
		case "5":showLegenWithLink(detailParameters,itemArray,idArray,colors,legenWidth,dWidth,dHeight,dLegenWidth,dTitle1,dTitle2,dTitle3,display);
				 loadPieChart(itemArray,title,colors,width,height,true);
				 break;
		case "6":loadTable(itemArray,idArray,title,width,detailParameters,dWidth,dTitle1,dTitle2,dTitle3);
				 break;
		default : break;
	 }
 });
}

function showLegenWithLink(detailParameters,itemArray,idArray,colors,legenWidth,dWidth,dHeight,dLegenWidth,dTitle1,dTitle2,dTitle3,display)
{
 var str = "<table  width='"+legenWidth+"' border='0'>";
 for(i=0;i<itemArray.length;i++)
 {
  var temp = itemArray[i];

  dParameters = detailParameters+idArray[i];
  
  var dTitle = dTitle1+" "+temp[0]+" "+dTitle2+" "+dTitle3;
  
  str = str+"<tr>";
  if(idArray[i]!="-1")
   str = str+"<td width='20' bgcolor='"+colors[i]+"'>&nbsp;</td><td align='left'><a onclick='viewDetailGraph(\""+dParameters+"\",\""+dTitle+"\","+dWidth+","+dHeight+","+dLegenWidth+",\""+display+"\")' style='cursor:pointer'><u>"+temp[0]+"</u></a></td>";
  else
   str = str+"<td width='20' bgcolor='"+colors[i]+"'>&nbsp;</td><td align='left'>"+temp[0]+"</td>";
  str = str+"</tr>";
 }
 str = str+"</table>";
 document.getElementById("legen").innerHTML = str;
 document.getElementById("legen").style.display = "block";
}

function viewDetailGraph(detailParameters,dTitle,dWidth,dHeight,dLegenWidth,display)
{
 document.getElementById("graph").innerHTML = "Loading....";
 document.getElementById("legen").innerHTML = "";
 $.get(detailParameters,function(data)
 {
 //alert(detailParameters+":"+data);
 var dataArray = data.split(",");
 var colors = new Array();
 var itemArray = new Array();
 var maxIndex = 4;
 var other = 0;
 
  if(!validateGraph(dataArray))
	return;
	
 if(dataArray.length>0)
 {
	for(i=0;i<dataArray.length;i++)
	{
	  var temp = dataArray[i].split(":");
	  if(i<4)
	  {
	    var tempArray = new Array(temp[0],parseInt(temp[1]));
		itemArray[i] = tempArray;
		colors[i] = colorsTable[i];
	  }
	  else
	  {
		 other = other + parseInt(parseInt(temp[1]));
		 var tempArray = new Array("อื่นๆ",other);
		 itemArray[maxIndex] = tempArray;
		 colors[maxIndex] = colorsTable[maxIndex];
	  }
	}
  }
	
  switch(display)
  {
	case "1":showLegenWithNoLink(itemArray,colors,dLegenWidth);
			loadBarChart(itemArray,dTitle,colors,dWidth,dHeight,false);
			break;
	case "2":showLegenWithNoLink(itemArray,colors,dLegenWidth);
			loadBarChart(itemArray,dTitle,colors,dWidth,dHeight,true);
			break;
	case "3":showLegenWithNoLink(itemArray,colors,dLegenWidth);
			loadLineChart(itemArray,dTitle,colors,dWidth,dHeight);
			break;
	case "4":showLegenWithNoLink(itemArray,colors,dLegenWidth);
			loadPieChart(itemArray,dTitle,colors,dWidth,dHeight,false);
			break;
	case "5":showLegenWithNoLink(itemArray,colors,dLegenWidth);
			loadPieChart(itemArray,dTitle,colors,dWidth,dHeight,true);
			break;
	default : break;
   }
 });
}

function viewDetailGraph2(detailParameters,dTitle,dWidth,dHeight,dLegenWidth,display)
{
 document.getElementById("graph").innerHTML = "Loading....";
 document.getElementById("legen").innerHTML = "";
 $.get(detailParameters,function(data)
 {
 //alert(detailParameters+":"+data);
 var dataArray = data.split(",");
 var colors = new Array();
 var itemArray = new Array();
 if(!validateGraph(dataArray))
	return;
	
 if(dataArray.length>0)
 {
	for(i=0;i<dataArray.length;i++)
	{
		var temp = dataArray[i].split(":");
	    var tempArray = new Array(temp[0],parseInt(temp[1]));
		itemArray[i] = tempArray;
		colors[i] = colorsTable[i];
	}
  }
	
  switch(display)
  {
	case "1":showLegenWithNoLink(itemArray,colors,dLegenWidth);
			loadBarChart(itemArray,dTitle,colors,dWidth,dHeight,false);
			break;
	case "2":showLegenWithNoLink(itemArray,colors,dLegenWidth);
			loadBarChart(itemArray,dTitle,colors,dWidth,dHeight,true);
			break;
	case "3":showLegenWithNoLink(itemArray,colors,dLegenWidth);
			loadLineChart(itemArray,dTitle,colors,dWidth,dHeight);
			break;
	case "4":showLegenWithNoLink(itemArray,colors,dLegenWidth);
			loadPieChart(itemArray,dTitle,colors,dWidth,dHeight,false);
			break;
	case "5":showLegenWithNoLink(itemArray,colors,dLegenWidth);
			loadPieChart(itemArray,dTitle,colors,dWidth,dHeight,true);
			break;
	default : break;
   }
 });
}

function showLegenWithNoLink(dataArray,colors,width)
{
 var str = "<table  width='"+width+"' border='0'>";
 for(i=0;i<dataArray.length;i++)
 {
  var temp = dataArray[i];
  str = str+"<tr>";
  str = str+"<td width='20' bgcolor='"+colors[i]+"'>&nbsp;</td><td align='left'>"+temp[0]+"</td>";
  str = str+"</tr>";
 }
 
 str = str+"</table>";
 document.getElementById("legen").innerHTML = str;
 document.getElementById("legen").style.display = "block";
}

function loadBarChart(dataArray,title,colors,width,height,is3D)
{
 var myChart = new JSChart('graph', 'bar');
 myChart.setDataArray(dataArray);
 myChart.colorizeBars(colors);
 myChart.setTitle("");
 myChart.setAxisNameX('');
 myChart.setAxisNameY('');
 myChart.setAxisColor('#C4C4C4');
 myChart.setAxisNameFontSize(16);
 myChart.setAxisNameColor('#999');
 myChart.setAxisValuesColor('#000000');
 myChart.setBarValuesColor('#000000');
 myChart.setAxisValuesAngle(30);
 myChart.setAxisPaddingBottom(50);
 myChart.setBarBorderWidth(1);
 myChart.setBarBorderColor('#C4C4C4');
 myChart.setBarSpacingRatio(50);  
 myChart.setGrid(true);
 if(is3D) myChart.set3D(true);
 myChart.setSize(width, height);
 myChart.draw();
 
 document.getElementById("graphTitle").innerHTML = title;
 document.getElementById("graphContainer").style.display = "block";
 document.getElementById("grid").style.display = "none";

}


function loadBarChart2(dataArray,title,colors,width,height,is3D,axisPaddingLeft,axisPaddingBottom)
{
 var myChart = new JSChart('graph', 'bar');
 myChart.setDataArray(dataArray);
 myChart.colorizeBars(colors);
 myChart.setTitle("");
 myChart.setAxisNameX('');
 myChart.setAxisNameY('');
 myChart.setAxisColor('#C4C4C4');
 myChart.setAxisNameFontSize(16);
 myChart.setAxisNameColor('#999');
 myChart.setAxisValuesColor('#000000');
 myChart.setBarValuesColor('#000000');
 myChart.setAxisValuesAngle(30);
 myChart.setAxisPaddingBottom(axisPaddingBottom);
 myChart.setAxisPaddingLeft(axisPaddingLeft);
 myChart.setBarBorderWidth(1);
 myChart.setBarBorderColor('#C4C4C4');
 myChart.setBarSpacingRatio(50);  
 myChart.setGrid(true);
 if(is3D) myChart.set3D(true);
 myChart.setSize(width, height);
 myChart.draw();
 
 document.getElementById("graphTitle").innerHTML = title;
 document.getElementById("graphContainer").style.display = "block";
 document.getElementById("grid").style.display = "none";

}


function loadLineChart(dataArray,title,colors,width,height)
{
 var myChart = new JSChart('graph', 'line');
 myChart.setDataArray(dataArray);
 myChart.setTitle("");
 myChart.setAxisNameX('');
 myChart.setAxisNameY('');
 myChart.setAxisColor('#C4C4C4');
 myChart.setAxisValuesColor('#343434');
 myChart.setAxisPaddingBottom(50);
 myChart.setAxisValuesAngle(30);
 myChart.setShowXValues(false);
 myChart.setGridColor('#c2c2c2');
 myChart.setLineColor('#9F0505');
 myChart.setLineWidth(2);
 myChart.setFlagColor('#000000');
 myChart.setFlagRadius(4);
 
 for(i=0;i<dataArray.length;i++)
 {
  var temp = dataArray[i];
  myChart.setTooltip([temp[0], "จำนวน "+temp[1]]);
 } 
 myChart.setSize(width, height);
 myChart.draw();

 document.getElementById("graphTitle").innerHTML = title;
 document.getElementById("graphContainer").style.display = "block";
 document.getElementById("grid").style.display = "none";
}

function loadLineChart2(dataArray,title,colors,width,height,axisPaddingLeft,axisPaddingBottom)
{
 var myChart = new JSChart('graph', 'line');
 myChart.setDataArray(dataArray);
 myChart.setTitle("");
 myChart.setAxisNameX('');
 myChart.setAxisNameY('');
 myChart.setAxisColor('#C4C4C4');
 myChart.setAxisValuesColor('#343434');
 myChart.setAxisPaddingBottom(axisPaddingBottom);
 myChart.setAxisPaddingLeft(axisPaddingLeft);
 myChart.setAxisValuesAngle(30);
 myChart.setShowXValues(false);
 myChart.setGridColor('#c2c2c2');
 myChart.setLineColor('#9F0505');
 myChart.setLineWidth(2);
 myChart.setFlagColor('#000000');
 myChart.setFlagRadius(4);
 
 for(i=0;i<dataArray.length;i++)
 {
  var temp = dataArray[i];
  myChart.setTooltip([temp[0], "จำนวน "+temp[1]]);
 } 
 myChart.setSize(width, height);
 myChart.draw();

 document.getElementById("graphTitle").innerHTML = title;
 document.getElementById("graphContainer").style.display = "block";
 document.getElementById("grid").style.display = "none";
}


function loadPieChart(dataArray,title,colors,width,height,is3D)
{
	
 var myData = new Array();
 var total = 0;
 for(i=0;i<dataArray.length;i++)
 {
  var temp = dataArray[i];
  total = total + parseInt(temp[1]);
 }
 for(i=0;i<dataArray.length;i++)
 {
  var temp = dataArray[i];
  myData[i] = new Array(temp[0],(parseInt(temp[1])*100)/total);
 }
 
 var myChart = new JSChart('graph', 'pie');
 myChart.setDataArray(myData);
 myChart.colorize(colors);
 myChart.setTitle("");
 myChart.setPieRadius(95);
 myChart.setPieValuesColor('#000000');
 myChart.setPieValuesFontSize(9);
 myChart.setShowXValues(false);
 myChart.setPieAngle(30);
 if(is3D) myChart.set3D(true);
 myChart.setSize(width, height);
 myChart.draw();
 
 document.getElementById("graphTitle").innerHTML = title;
 document.getElementById("graphContainer").style.display = "block";
 document.getElementById("grid").style.display = "none";
}

function loadTable(itemArray,idArray,title,width,detailParameters,dWidth,dTitle1,dTitle2,dTitle3)
{

 document.getElementById("graphTitle").innerHTML = "";
 document.getElementById("grid").innerHTML = "Loading...";
 var str = "<table width='"+width+"' border='0' bgcolor='#ffffff'>";
 str = str+"<tr>";
 str = str+"<td colspan='2' align='center' style='background-color:#336699;color:white;'>"+title+"</td>";
 str = str+"</tr>";
 for(i=0;i<itemArray.length;i++)
 {
  dParameters = detailParameters+Trim(idArray[i]);
  var temp = itemArray[i];
  var dTitle = dTitle1+" "+temp[0]+" "+dTitle2+" "+dTitle3;
  str = str+"<tr onMouseOver=this.style.backgroundColor='#DBDDDE' onMouseOut=this.style.backgroundColor='#FFFFFF'>";
  str = str+"<td style='border:1px solid #336699;'><a onclick='viewDetailTable(\""+dParameters+"\",\""+dTitle+"\","+dWidth+")' style='cursor:pointer'>"+temp[0]+"</a></td><td style='border:1px solid #336699;'>"+temp[1]+"</td>";
  str = str+"</tr>";
 }
 str = str+"</table>";
 document.getElementById("grid").innerHTML = str;
 document.getElementById("grid").style.display = "block";
 document.getElementById("graphContainer").style.display = "none";
}

function viewDetailTable(detailParameters,title,width)
{
 document.getElementById("graphTitle").innerHTML = "";
 document.getElementById("grid").innerHTML = "Loading...";
 $.get(detailParameters,function(data)
 {
	var dataArray = data.split(",");
	var itemArray = new Array();
	
	if(!validateGraph(dataArray))
	  return;
	  
	if(dataArray.length>0)
	{
	  var str = "<table width='"+width+"' border='1' bgcolor='#ffffff'>";
	  str = str+"<tr>";
	  str = str+"<td colspan='2' align='center' style='background-color:#336699;color:white;'>"+title+"</td>";
	  str = str+"</tr>";
	  for(i=0;i<dataArray.length;i++)
	  {
	   var temp = dataArray[i].split(":");
  	   str = str+"<tr onMouseOver=this.style.backgroundColor='#DBDDDE' onMouseOut=this.style.backgroundColor='#FFFFFF'>";
	   str = str+"<td style='border:1px solid #336699;'>"+temp[0]+"</td><td style='border:1px solid #336699;'>"+temp[1]+"</td>";
	   str = str+"</tr>";
	  }
	  str = str+"</table>";
	}
	document.getElementById("grid").innerHTML = str;
    document.getElementById("grid").style.display = "block";
    document.getElementById("graphContainer").style.display = "none";	
 });
}

function validateGraph(dataArray)
{
 if(dataArray.length>1)
 {
   return true;
 }
 else if(dataArray.length==1)
 {
  if(Trim(dataArray[0]) == "") 
  {
	document.getElementById("graph").innerHTML = "ไม่พบข้อมูล";
	return false;
  }
  else if(Trim(dataArray[0]) != "") 
  {
	return true;
  }
 }
 else if(dataArray.length<=0)
 {
   document.getElementById("graph").innerHTML = "ไม่พบข้อมูล";
   return false;
 }
}
/* This code can be copy whatever we want to display graph
<table align='center' >
	<tr>
		<td><div align="center" id="graphTitle" name="graphTitle"></div></td>
	</tr>
	<tr>
		<td align="center">
			<div id="graphContainer" name="graphContainer">
				<table>
					<tr>
						<td><div id="graph" name="graph"></div></td>
						<td><div id="legen" name="legen"></div></td>
					</tr>
				</table>
			</div>
			<div align="center" id="grid" name="grid"></div>
		</td>
	</tr>
</table>

or

<table align='center' >
	<tr>
		<td>
			<div id="graphContainer" name="graphContainer">
				<table>
					<tr>
						<td colspan="2"><div align="center" id="graphTitle" name="graphTitle"></div></td>
					</tr>
					<tr>
						<td><div  id="graph" name="graph"></div></td>
						<td><div  id="legen" name="legen"></div></td>
					</tr>
				</table>
			</div>
			<div align="center" id="grid" name="grid"></div>
		</td>
	</tr>
</table>
*/
