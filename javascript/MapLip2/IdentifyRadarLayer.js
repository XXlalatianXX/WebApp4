/*
For example :
		var trackradar = new GraphicsRadarLayer(map,"RadarTracking","http://10.235.236.140/track/radar_track.txt","http://localhost/gis/images/","RadarLayer");
		var idenradar = new IdentifyRadarLayer();
		map.on("click",function(evt){idenradar.Identify(map,evt,trackradar.DataArray,"divTrack")});
		
		setInterval(function () 
		{
			var trackingArray = ReadTrackingFile("http://10.235.236.140/track/radar_track.txt");
			trackradar.SetDataArray(trackingArray);
			trackradar.DrawPoints();
		}, 2000);
		
*/


define([ 
  "dojo/_base/declare",
  "dojo/dom",
],
function(
	declare,
	dom
	) 
{
    return declare([], {

      constructor: function()
	  {
      },
	  
	  Identify: function (map,evt,dataArray,divContainer)
	  {
		var mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);
		var shortestdistance = 6371;
		var result = dataArray[0];
		for(var i=0;i<dataArray.length;i++)
		{
			var temp = dataArray[i].split(",");
			lon2 = temp[2];
			lat2 = temp[1];
			
			var distance = this.getDistanceFromLatLonInKm(mp.y,mp.x,lat2,lon2);
			if( distance < shortestdistance)
			{
				result = dataArray[i];
				shortestdistance = distance;
			}
		}
		
		if(map.getLevel()== 5 ) {if(shortestdistance>50.0)result = "NONE";}
		if(map.getLevel()== 6 ) {if(shortestdistance>25.0)result = "NONE";}
		if(map.getLevel()== 8 ) {if(shortestdistance>10.0)result = "NONE";}
		if(map.getLevel()== 7 ) {if(shortestdistance>7.5)result = "NONE";}
		if(map.getLevel()== 9 ) {if(shortestdistance>5.0)result = "NONE";}
		if(map.getLevel()== 10 ) {if(shortestdistance>1.5)result = "NONE";}
		if(map.getLevel()== 11 ) {if(shortestdistance>0.75)result = "NONE";}
		if(map.getLevel()== 12 ) {if(shortestdistance>0.5)result = "NONE";}
		if(map.getLevel()== 13 ) {if(shortestdistance>0.25)result = "NONE";}
		if(map.getLevel()== 14 ) {if(shortestdistance>0.1)result = "NONE";}
		if(map.getLevel()== 15 ) {if(shortestdistance>0.075)result = "NONE";}
		if(map.getLevel()== 16 ) {if(shortestdistance>0.05)result = "NONE";}
		if(map.getLevel()== 17 ) {if(shortestdistance>0.025)result = "NONE";}
		if(map.getLevel()== 18 ) {if(shortestdistance>0.01)result = "NONE";}
		if(map.getLevel()>= 19 ) {if(shortestdistance>0.005)result = "NONE";}
		
		this.showInfo(result,divContainer);
	  },
	  
	  showInfo : function(result,divContainer)
	  {
		if(result != "NONE")
		{
			var label = ["Number","Lat","Lon","Altitude","Heading","Speed","Server time"];
			var item = result.split(",");
			var info = "";
			for(var i=0;i<label.length;i++)
			{
				info+=label[i]+":"+item[i]+"<BR>";
			}
			dom.byId(divContainer).innerHTML = info;
		}
	  },
	  
	  getDistanceFromLatLonInKm: function (lat1,lon1,lat2,lon2) 
	  {
		var R = 6371; // Radius of the earth in km
		var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
		var dLon = this.deg2rad(lon2-lon1); 
		var a = 
			Math.sin(dLat/2) * Math.sin(dLat/2) +
			Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) * 
			Math.sin(dLon/2) * Math.sin(dLon/2)
			; 
		var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
		var d = R * c; // Distance in km
		return d;
	  },
	
	  deg2rad: function (deg) 
	  {
		return deg * (Math.PI/180)
	  }
	  
  });
});