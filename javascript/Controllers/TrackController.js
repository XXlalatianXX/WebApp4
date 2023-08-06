
var radar_tracks_url = "../resources/track.php";
var trackradar;
var waitingTimes = 0;
var refreshSourceTimes = 10;
var RadarTimer;
var jsonTracksInfos;
var jsonTempTrackInfos;

/*
//default load radar tracking
require(["dojo/domReady!"], function(){	
	addRadarTrackLayer(map);
	$("#chkRadarTracking").attr('checked','checked')
});
*/

function addRadarTrackLayer(map)
{
	require(["MapLip/GraphicsRadarLayer","MapLip/IdentifyRadarLayer","esri/layers/GraphicsLayer","dojo/dom"], 
	function(GraphicsRadarLayer,IdentifyRadarLayer,GraphicsLayer,dom) {
		//drawing track radar 
		trackradar = new  GraphicsRadarLayer(map,"RadarTracking","images/radar_icons","radarGraphicPointLayer");
		jsonTracksInfos = ReadTrackingURL(radar_tracks_url);	
		trackradar.SetJsonPoints(jsonTracksInfos);
		trackradar.DrawPointsByCategory("identity",20,20);
			
		RadarTimer = setInterval(function (){
			if( waitingTimes > refreshSourceTimes || waitingTimes == 0)	{		
				jsonTempTrackInfos = ReadTrackingURL(radar_tracks_url);	
				jsonTracksInfos = manageTracks(jsonTracksInfos,jsonTempTrackInfos);
				waitingTimes = 0;
				//console.log("previous tracks: "+jsonTracksInfos.length+" ,current track :"+jsonTempTrackInfos.length);
			}
			else{
				jsonTracksInfos = updateTracksPosition(jsonTracksInfos);
				//console.log("update track");
			}
			trackradar.SetJsonPoints(jsonTracksInfos);
			trackradar.DrawPointsByCategory("identity",20,20);
			waitingTimes++;
			
		}, 1000);
		
		// Identify radar track information
		var identifyRadarInfo = new IdentifyRadarLayer();
		map.on("click",function(evt){
			identifyRadarInfo.Identify(map,evt,jsonTracksInfos,"TrackInfo","InfoTabs");
		});	
	});
}

$(document).ready(function(){
	$("#chkRadarTracking").click( function(){
		if($(this).is(':checked')){
			trackingArray = new Array();
			addRadarTrackLayer(map);
			trackradar.GraphicsPointLayer.show();
		}
		else{
			clearTimeout(RadarTimer);
			trackradar.GraphicsPointLayer.hide();
		}
	});
});
