function ReadTrackingURL(url)
{
	var jsonTracking = [];
	var trackId = 0;
	$.ajax({
		type: 'POST',
		url: url,
		success: function(result)
		{
			response = result.replace(/\s+/g," ");
			var tracks = JSON.parse(response);
			for(var i=0;i<tracks.length;i++)
			{
				if(parseFloat(tracks[i].track_speed) > 0.0)
				{
					jsonTracking[trackId] = tracks[i];
					trackId++;
				}
			}
			//jsonTracking  = JSON.parse(response);
		},
		async:false
	});
	
	return jsonTracking;
}

function manageTracks(previousInfos,currentInfos)
{	
	for(var i=0;i<currentInfos.length;i++)
	{
		var current_time_of_track = parseFloat(currentInfos[i].time_of_track);
		for(var j=0;j<previousInfos.length;j++)
		{
			var previous_time_of_track = parseFloat(previousInfos[j].time_of_track);
			if(previousInfos[j].track_number == currentInfos[i].track_number)
			{
				if(previous_time_of_track >= current_time_of_track)
				{
					currentInfos[i] = previousInfos[j];
					/*previousInfos[j].is_found = 1;
					if(isNaN(currentInfos[i].fails))
					{
						currentInfos[i].fails = 1;
						currentInfos[i] = previousInfos[j];
					}
					else
					{
						currentInfos[i].fails = parseInt(previousInfos[j].fails)+1;
						currentInfos[i] = previousInfos[j];
					}*/
				}
			}
		}
	}
	
	//add previous tracks
	/*for(var i = 0;i<previousInfos.length;i++)
	{
		if(isNaN(previousInfos[i].is_found))
		{
			currentInfos.push(previousInfos[i]);
		}
	}*/
	
	//remove expired tracks
	/*var trackInfos = currentInfos.filter(function(json){
		return parseInt(json.fails) < 20;
	});*/
	
	return currentInfos;
	
	/*if(previousInfos.length == 0)
	{
		return currentInfos;
	}
	
	for(var i=0;i<previousInfos.length;i++)
	{
		var previous_time_of_track = parseFloat(previousInfos[i].time_of_track);
		for(var j=0;j<currentInfos.length;j++)
		{
			var current_time_of_track = parseFloat(currentInfos[j].time_of_track);
			if(previousInfos[i].track_number == currentInfos[j].track_number)
			{
				currentInfos[j].is_found = 1;
				if(previous_time_of_track >= current_time_of_track)
				{
					if(isNaN(previousInfos[i].fails))
					{
						previousInfos[i].fails = 1;
					}
					else
					{
						previousInfos[i].fails = parseInt(previousInfos[i].fails)+1;
					}
				}
				else
				{
					previousInfos[i] = currentInfos[j];
					//console.log("previous =>"+previousInfos[i].callsign+" ,new track => "+previousInfos[i].callsign);
				}
			}
		}
	}
	
	//add new tracks
	for(var i = 0;i<currentInfos.length;i++)
	{
		if(isNaN(currentInfos[i].is_found))
		{
			previousInfos.push(currentInfos[i]);
		}
	}
	
	//remove expired tracks
	var trackInfos = previousInfos.filter(function(json){
		return parseInt(json.fails) < 20;
	});*/

	//return trackInfos;
} 

function updateTracksPosition(trackInfos)
{
	var time = 1;
	for(var i=0;i<trackInfos.length;i++)
	{
		var track = trackInfos[i];
		
		var speed = parseFloat(track.track_speed);
		speed = speed*0.9;
		var distance = (speed*time)/30.92; // แปลงหน่วยเมตรเป็นฟิลิปดาโดยการหาร 30.92
		
		var radians = calculateHeadingToRadians(track.track_heading);
		var diffLon = (distance*Math.cos(radians))/3600;
		var diffLat = (distance*Math.sin(radians))/3600;
		
		track.latitude = parseFloat(track.latitude)+diffLat;
		track.longitude = parseFloat(track.longitude)+diffLon;
		
		trackInfos[i] = track;
	}
	return trackInfos;
}

function calculateHeadingToRadians(heading)
{
	var heading = parseFloat(heading);
	var degrees = 0;
	if(heading >= 0.0 && heading <= 90.0)
		degrees = 90.0 - heading;
	else if(heading > 90.0 && heading <= 180.0)
		degrees = 270.0 + (180.0 - heading);
	else if(heading > 180.0 && heading <= 270.0)
		degrees = 180.0 + (270.0 - heading);
	else if(heading > 270.0 && heading <=360.0)
		degrees = 90.0 + (360.0 - heading);
	
	var radians = degrees * Math.PI / 180;
	
	return radians;
}


/*
var TrackArray = new Array();

function ReadTrackingFile(urlFile)
{
	$.ajax({
		type: 'POST',
		url: urlFile,
		success: function(result)
		{
			var currentTrackArray = new Array();
			var tracks = JSON.parse(result);
			var tracksNumber = getUniqueTrackNumber(tracks);
			currentTrackArray = getTrackInfos(tracksNumber,tracks);
			TrackArray = updateMissingTracks();
			TrackArray = mergePreviousTracksAndCurrentTracks(currentTrackArray);
			TrackArray = removeExpireTracks(20);
		},
		async:false
	});
	return TrackArray;
}

// this two functions are used to calculate new position for all tracks
function updateTracksPosition(trackInfos)
{
	var time = 1;
	for(var i=0;i<trackInfos.length;i++)
	{
		var track = trackInfos[i];
		var speed = parseFloat(track[4]);
		var distance = (speed*time)/30.92; // แปลงหน่วยเมตรเป็นฟิลิปดาโดยการหาร 30.92
		
		var radians = calculateHeadingToRadians(track[5]);
		var diffLon = (distance*Math.cos(radians))/3600;
		var diffLat = (distance*Math.sin(radians))/3600;
		
		track[2] = parseFloat(track[2])+diffLat;
		track[3] = parseFloat(track[3])+diffLon;
		trackInfos[i] = track;
	}
	return trackInfos;
}

function getUniqueTrackNumber(tracks) 
{
	var duplicatesTrackNumber = [];
	for(var i=0;i<tracks.length;i++)
	{
		if(tracks[i].category == "0" || tracks[i].category == "1" || tracks[i].category == "2")
		{
			duplicatesTrackNumber.push(tracks[i].track_number);
		}
	}
	
	var uniqueTrackNumber = duplicatesTrackNumber.filter(function(elem, pos) 
	{
		return duplicatesTrackNumber.indexOf(elem) == pos;
	}); 
	return uniqueTrackNumber;
}

function getTrackInfos(tracksNumber,tracks)
{
	var trackInfos =  new Array();
	for(var i=0;i<tracksNumber.length;i++)
	{
		var track =  new Array();
		for(var j=0;j<tracks.length;j++)
		{
			if(tracksNumber[i] == tracks[j].track_number)
			{
				track[0] = tracks[j].track_number;
				track[1] = tracks[j].time_of_track;
				track[2] = tracks[j].latitude;
				track[3] = tracks[j].longitude;
				track[4] = tracks[j].track_speed;
				track[5] = tracks[j].track_heading;
				track[6] = tracks[j].measured_height;
				track[7] = tracks[j].reported_height;
				track[8] = tracks[j].category;
				track[9] = tracks[j].identity;
				track[10] = tracks[j].track_quality;
				track[11] = tracks[j].callsign;
				track[12] = tracks[j].timestamp;
				track[13] = 0;
			}
		}
		trackInfos.push(track);
	}
	return trackInfos;
}

function updateMissingTracks()
{
	for(var i=0;i<TrackArray.length;i++)
	{
		var track = TrackArray[i];
		track[13] = track[13]+1;
		TrackArray[i] = track;
	}
	return TrackArray;
}

function mergePreviousTracksAndCurrentTracks(currentTrackArray)
{
	var newTracks = new Array();
	for(var i=0;i<currentTrackArray.length;i++)
	{
		var found = false;
		var currentTrack = currentTrackArray[i];
		for(var j=0;j<TrackArray.length;j++)
		{
			var track = TrackArray[j];
			if(currentTrack[0] == track[0])
			{
				if(parseFloat(currentTrack[1]) >= parseFloat(track[1]))
				{
					currentTrack[13] = 0;
					TrackArray[j] = currentTrack;
				}
				found = true;
			}
		}
		
		if(!found)
		{
			currentTrack[13] = 0;
			newTracks.push(currentTrack);
		}
	}
	
	for(var i=0;i<newTracks.length;i++)
	{
		TrackArray.push(newTracks[i]);
	}
	
	return TrackArray;
}

function removeExpireTracks(expireTimes)
{
	var newTracks = new Array();
	for(var i=0;i<TrackArray.length;i++)
	{
		var track = TrackArray[i];
		if(track[13] < expireTimes )
		{
			newTracks.push(TrackArray[i]);
		}
	}
	return newTracks;
}


function calculateHeadingToRadians(heading)
{
	var heading = parseFloat(heading);
	var degrees = 0;
	if(heading >= 0.0 && heading <= 90.0)
		degrees = 90.0 - heading;
	else if(heading > 90.0 && heading <= 180.0)
		degrees = 270.0 + (180.0 - heading);
	else if(heading > 180.0 && heading <= 270.0)
		degrees = 180.0 + (270.0 - heading);
	else if(heading > 270.0 && heading <=360.0)
		degrees = 90.0 + (360.0 - heading);
	
	var radians = degrees * Math.PI / 180;
	
	return radians;
}

*/
