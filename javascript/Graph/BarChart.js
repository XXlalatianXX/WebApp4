function BarChart(divName,title,axisNameX,axisNameY,dataArray,width,height,is3D)
{
	this.divName = divName;
	this.title = title;
	this.axisNameX = axisNameX;
	this.axisNameY = axisNameY;
	this.dataArray = dataArray;
	this.width = width;
	this.height = height;
	this.is3D = is3D;
	
	var colorsTable = new Array('#CC0000', '#336699', '#9966CC', '#3366FF', '#3399FF',
					'#F76600','#F89900', '#F8CC00', '#0000FA', '#3366FB', 
					'#99CDFB','#0000FF', '#00FFFF', '#F9ECA2', '#FA9000', 
					'#FA5400','#C40000', '#750303', '#F9ECA2', '#FA9000',
					'#CC0000', '#336699', '#9966CC', '#3366FF', '#3399FF',
					'#F76600','#F89900', '#F8CC00', '#0000FA', '#3366FB', 
					'#99CDFB','#0000FF', '#00FFFF', '#F9ECA2', '#FA9000', 
					'#FA5400','#C40000', '#750303', '#F9ECA2', '#FA9000');
					
 	var colors = new Array();
	for(var i=0;i<this.dataArray.length;i++)
		colors.push(colorsTable[i]);
		
	this.display = function()
	{
	 var myChart = new JSChart(this.divName, 'bar');
	 myChart.setDataArray(dataArray);
	 myChart.colorizeBars(colors );
	 myChart.setTitle(this.title);
	 myChart.setAxisNameX(this.axisNameX);
	 myChart.setAxisNameY(this.axisNameY);
	 myChart.setAxisColor('#C4C4C4');
	 myChart.setAxisNameFontSize(16);
	 myChart.setAxisNameColor('#999');
	 myChart.setAxisValuesColor('#FFFFFF');
	 myChart.setBarValuesColor('#FFFFFF');
	 myChart.setAxisValuesAngle(30);
	 myChart.setAxisPaddingLeft(100);
	 myChart.setAxisNameFontFamily("tahoma");
	 myChart.setAxisPaddingBottom(70);
	 myChart.setBarBorderWidth(1);
	 myChart.setBarBorderColor('#C4C4C4');
	 myChart.setBarSpacingRatio(50);  
	 myChart.setGrid(true);
	 if(this.is3D) myChart.set3D(true);
	 myChart.setSize(this.width, this.height);
	 myChart.draw();
 }
}