/*
This class is used to identify vector layer and automatically show in popup by setting parameters below
	@map : currently use map.
	@visibleLayer : layer that want to identify. this layer must visible
	@infoTitle : title of tab
	@layerId : layerid in services
	@outFields : fields that want to show
	@outFieldLabels : label fields to show
	@divPopup : popup container
	@urlService : service of map

For example.

	// Popup for identifying data
	map.infoWindow.resize(415, 200);
	map.infoWindow.setContent(dijit.byId("tabs").domNode);
	map.infoWindow.setTitle("Identify Results");
			
	//Identify
	map.on("click", function(event){identify.ClearPopupContainer("tabs");});
	var item = tiledservices.Layers[2];
	var visibleLayer = item[0];
	var identifyServices = item[4]; 
	var layerId = 2;
	var outFields = ["ROAD_NUM","NAME_T","NAME_E"];
	var outFieldLabels = ["หมายเลข","ชื่อถนน(ไทย)","ชื่อถนน(อังกฤษ)"];
	identify = new IdentifyVectorLayer(map,visibleLayer,"ถนนหลักหมายระดับ 3",layerId,outFields,outFieldLabels,"tabs",identifyServices);
*/

define([ 
  "dojo/_base/declare",
  "esri/tasks/IdentifyTask",
  "esri/tasks/IdentifyParameters",
  "dijit/layout/ContentPane", 
  "dijit/layout/TabContainer", 
  "dojo/dom",
  "dijit/registry",
  "dojo/on"
], 
function(
	declare,
	IdentifyTask,
	IdentifyParameters,
	ContentPane,
	TabContainer,
	dom,
	registry,
	on
	) 
{
    return declare([], {
	  
      constructor: function(map,visibleLayer,infoTitle,layerId,outFields,outFieldLabels,divPopup,urlService)
	  {
		var identifyTask = new IdentifyTask(urlService);
		var identifyParams = new IdentifyParameters();
        identifyParams.tolerance = 5;
        identifyParams.returnGeometry = true;
        identifyParams.layerIds = [layerId];
        identifyParams.layerOption = IdentifyParameters.LAYER_OPTION_ALL;
        identifyParams.width = map.width;
        identifyParams.height = map.height;
				
		map.on("click", function(event)
		{
			if(!visibleLayer.visible)
				return;
				
			identifyParams.geometry = event.mapPoint;
			identifyParams.mapExtent = map.extent;
			identifyTask.execute(identifyParams, function (idResults)
			{
			    if(idResults.length<=0)
					return;
								
				var data = "";
				var buildingInfo = "";
				var landusedInfo = "";
				var tabs = registry.byId(divPopup);
				for(var i=0;i<idResults.length;i++)
				{
					var result = idResults[i];
					var feature = result.feature;
					//var layerName = result.layerName;
					data = data+"<table border='0'>";
					for(var counter=0;counter<outFields.length;counter++)
					{
						data = data+"<tr><td>"+outFieldLabels[counter]+"</td><td>"+feature.attributes[outFields[counter]]+"</td></tr>";
					}
					data = data+"</table>";	
					
					if(infoTitle == "เอกสารสิทธิ์")
					{
						var url = "window.open('getCertificates.php?folder="+feature.attributes[outFields[0]]+"','subWind',height=400,width=600)";
						landusedInfo = "<table border='0'><tr><td valign='top'>เอกสารสิทธิ์</td><td><a href='javascript:void(0);' onclick ="+url+">เปิดดูเอกสารสิทธิ์</a></td></tr></table>";
						data = data+landusedInfo;	
					}
					data = data+"<hr>";
					
					if(infoTitle == "อาคาร")
					{
						var url = "window.open('Building/"+feature.attributes[outFields[0]]+".JPG','subWind',height=600,width=800)";
						buildingInfo = buildingInfo+getRtafBuildingHtml(feature.attributes[outFields[0]]);
						buildingInfo = buildingInfo+"<table><tr><td valign='top'>รูปภาพ</td><td><a href='javascript:void(0);' onclick ="+url+"><img src='Building/"+feature.attributes[outFields[0]]+".JPG' width='60%' height='60%'/></a></td></tr></table><hr>";
						data = buildingInfo;
					}
				}
				
				var contentPane = new ContentPane({title:infoTitle});
				tabs.addChild(contentPane);
				contentPane.setContent(data);
				map.infoWindow.show(event.screenPoint, map.getInfoWindowAnchor(event.screenPoint));
			});
		});
      },
	  
	  ClearPopupContainer : function(divPopup)
	  {
		var tabs = registry.byId(divPopup);
		if(tabs.hasChildren())
		{
			var tabControlChildren = tabs.getChildren(); 
			for(var counter = 0;counter < tabControlChildren.length;counter++)
				tabs.removeChild(tabControlChildren[counter]);
		}
	  }
	  
  });
});