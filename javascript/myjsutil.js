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
	