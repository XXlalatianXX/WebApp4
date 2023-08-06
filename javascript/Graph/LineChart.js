function LineChart(divName,title,axisNameX,axisNameY,dataArray,width,height,is3D)
{
	this.divName = divName;
	this.title = title;
	this.axisNameX = axisNameX;
	this.axisNameY = axisNameY;
	this.dataArray = dataArray;
	this.width = width;
	this.height = height;

	
	this.display = function()
	{
	 var myChart = new JSChart(this.divName, 'line');
	 myChart.setDataArray(this.dataArray);
	 myChart.setTitle(this.title);
	 myChart.setAxisNameX(this.axisNameX);
	 myChart.setAxisNameY(this.axisNameY);
	 myChart.setAxisColor('#FFFFFF');
	 myChart.setAxisValuesColor('#FFFFFF');
	 myChart.setAxisPaddingBottom(70);
	 myChart.setAxisValuesAngle(30);
	 myChart.setShowXValues(false);
	 myChart.setGridColor('#FFFFFF');
	 myChart.setLineColor('#FFFFFF');
	 myChart.setLineWidth(2);
	 myChart.setFlagColor('#FFFFFF');
	 myChart.setFlagRadius(4);
	 
	 for(var i=0;i<this.dataArray.length;i++)
	 {
	  var temp = this.dataArray[i];
	  myChart.setTooltip([temp[0], "จำนวน "+temp[1]]);
	 } 
	 myChart.setSize(this.width, this.height);
	 myChart.draw();
 }
}