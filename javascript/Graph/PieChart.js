function PieChart(divName,title,dataArray,width,height,is3D)
{
	var colorsTable = new Array('#CC0000', '#336699', '#9966CC', '#3366FF', '#3399FF',
					'#F76600','#F89900', '#F8CC00', '#0000FA', '#3366FB', 
					'#99CDFB','#0000FF', '#00FFFF', '#F9ECA2', '#FA9000', 
					'#FA5400','#C40000', '#750303', '#F9ECA2', '#FA9000',
					'#CC0000', '#336699', '#9966CC', '#3366FF', '#3399FF',
					'#F76600','#F89900', '#F8CC00', '#0000FA', '#3366FB', 
					'#99CDFB','#0000FF', '#00FFFF', '#F9ECA2', '#FA9000', 
					'#FA5400','#C40000', '#750303', '#F9ECA2', '#FA9000');
					
	this.divName = divName;
	this.title = title;
	this.dataArray = dataArray;
	this.width = width;
	this.height = height;
	this.is3D = is3D;
						
 	var colors = new Array();
	for(var i=0;i<this.dataArray.length;i++)
		colors.push(colorsTable[i]);
		
	this.display = function()
	{
		var myChart = new JSChart(this.divName, 'pie');
		myChart.setDataArray(this.dataArray);
		myChart.colorizePie(colors);
		myChart.setTitle(this.title);
		myChart.setPieRadius(95);
		myChart.setPieUnitsFontSize(8);
		myChart.setPieUnitsColor('#FFFFFF');
		myChart.setPieValuesColor('#FFFFFF');
		myChart.setPieValuesOffset(-10);
		myChart.setTitleColor('#FFFFFF');
		myChart.setShowXValues(false);
		myChart.setPieAngle(30);
		if(this.is3D) myChart.set3D(true);
		myChart.setSize(this.width, this.height);
		myChart.draw();
 }
}