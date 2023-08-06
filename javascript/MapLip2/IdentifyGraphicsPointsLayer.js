define([ 
  "dijit/layout/ContentPane", 
  "dijit/layout/TabContainer", 
  "dijit/registry",
  "dojo/_base/declare",
  "dojo/dom",
],
function(
	ContentPane,
	TabContainer,
	registry,
	declare,
	dom
	) 
{
    return declare([], {

	  ReturnValue:null,
      constructor: function()
	  {
      },
	  
	  Identify: function (map,evt,jsonPoints,code)
	  {
		var mp = esri.geometry.webMercatorToGeographic(evt.mapPoint);
		var shortestdistance = 6371;
		var result = jsonPoints[0][code];
		for(var i=0;i<jsonPoints.length;i++)
		{
			
			var lon2 = parseFloat(jsonPoints[i].lon);
			var lat2 = parseFloat(jsonPoints[i].lat);
			
			var distance = this.getDistanceFromLatLonInKm(mp.y,mp.x,lat2,lon2);
			if( distance < shortestdistance)
			{
				result = jsonPoints[i][code];
				shortestdistance = distance;
			}
		}
		
		if(map.getLevel()== 1 ) {if(shortestdistance>500.0)result = "NONE";}
		if(map.getLevel()== 2 ) {if(shortestdistance>250.0)result = "NONE";}
		if(map.getLevel()== 3 ) {if(shortestdistance>100.0)result = "NONE";}
		if(map.getLevel()== 4 ) {if(shortestdistance>75.0)result = "NONE";}
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
		
		this.ReturnValue = result;
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
	  },
	  showInfo:function(screenPoint,titleInfo,tabsDiv,data)
	  {
		var tabs = registry.byId(tabsDiv);
		var contentPane = new ContentPane({title:titleInfo});
		tabs.addChild(contentPane);
		contentPane.setContent(data);
		map.infoWindow.show(screenPoint, map.getInfoWindowAnchor(screenPoint));
	  }
	  
  });
});