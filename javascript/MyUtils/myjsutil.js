function LTrim(str)
{
	if (str==null){return null;}
	for(var i=0;str.charAt(i)==" ";i++);
	return str.substring(i,str.length);
}
function RTrim(str)
{
	if (str==null){return null;}
	for(var i=str.length-1;str.charAt(i)==" ";i--);
	return str.substring(0,i+1);
}
function Trim(str)
{
	return LTrim(RTrim(str));
}

function LTrimChar(str,c)
{
	if (str==null){return null;}
	for(var i=0;str.charAt(i)==c;i++);
	return str.substring(i,str.length);
}
function RTrimChar(str,c)
{
	if (str==null){return null;}
	for(var i=str.length-1;str.charAt(i)==c;i--);
	return str.substring(0,i+1);
}
function TrimChar(str,c)
{
	return LTrimChar(RTrimChar(str,c),c);
}


function getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) 
{
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
	
function deg2rad(deg) 
{
	return deg * (Math.PI/180)
}

/*function ReadTrackingFile(urlFile)
{
	var radarTracking = "";
	$.ajax({type: 'GET',url: urlFile,
	success: function(result) 
	{
		radarTracking = TrimChar(result,"$");
	},
	async:false
	});
	
	radarTracking = radarTracking.replace(/(?:\r\n|\r|\n)/g, '');
	dataArray = radarTracking.split("$");
	return dataArray;
}*/

function ReadTrackingFile(urlFile)
{
	var  dataArray = new Array();
	$.ajax({type: 'GET',url: urlFile,
	success: function(result) 
	{
		var obj = JSON.parse(result);
		for( var i=0;i<obj.length;i++)
		{
			dataArray.push(
						obj[i].track_number+","+
						obj[i].latitude+","+
						obj[i].longitude+","+
						obj[i].track_speed+","+
						obj[i].track_heading+","+
						obj[i].reported_height+","+
						obj[i].timestamp);
		}
	},
	async:false
	});
	
	//radarTracking = radarTracking.replace(/(?:\r\n|\r|\n)/g, '');
	//dataArray = radarTracking.split("$");
	return dataArray;
}

