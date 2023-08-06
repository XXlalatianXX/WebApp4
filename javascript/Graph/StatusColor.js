function getPercentageColor(percentage)
{
	if(percentage<50) color = "#C80000";
	if(percentage>=50 && percentage<80) color = "#FFFF55";
	if(percentage>=80) color = "#33CC33";
	return color;
}

function drawColorBarWithContainer(color,width,label,divContainer)
{
	var colorBar = "<div align='center' style='border-radius: 7px; color:#000000; background-color:"+color+"; width:"+width+"px; padding-left:10px; padding-right:15px;'>"+label+"</div>";
	$(divContainer).html(colorBar);
}

function drawColorBar(color,width,label)
{
	return "<div align='center' style='border-radius: 7px; color:#000000; background-color:"+color+"; width:"+width+"px; padding-left:10px; padding-right:15px;'>"+label+"</div>";
}
