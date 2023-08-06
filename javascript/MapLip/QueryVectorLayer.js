/*
For example:
		var query = new QueryVectorLayer(map,"http://119.63.67.51/ArcGIS/rest/services/Vector/POI/MapServer/0");
		query.QueryByWhereCondition("name_T like '%ชัย%'",['NAME_T','NAME_E'],"divQuery");
*/
define([ 
  "dojo/_base/declare",
  "esri/tasks/QueryTask",
  "esri/tasks/query",
  "esri/geometry/Point",
  "esri/SpatialReference",
  "dojo/dom"
], 
function(
	declare,
	QueryTask,
	Query,
	Point,
	SpatialReference,
	dom
	) 
{
    return declare([], {
	  map:null,
	  urlService:null,
	  
      constructor: function(map,urlService)
	  {
		this.map = map;
		this.urlService = urlService;
      },

      QueryByPoint: function(mapPoint) 
	  {
		var queryTask = new QueryTask(this.urlService);
		var query = new Query();
		query.returnGeometry = true;
		query.outFields = outFields;
		query.geometry = mapPoint;
		
		var data = "";
		queryTask.execute(query, function(featureSet)
		{
			data = "[";
			var resultFeatures = featureSet.features;
			
			for(var i=0;i<resultFeatures.length;i++)
			{
				data  = data +"{";
				
				for(var counter=0;counter<outFields.length;counter++)
				{
					
					if(counter < (outFields.length-1))
						data  = data+"'"+outFields[counter]+"':'"+resultFeatures[i].attributes[outFields[counter]]+"',";
					else	
						data  = data+"'"+outFields[counter]+"':'"+resultFeatures[i].attributes[outFields[counter]]+"'";
				}
				
				if(i<(resultFeatures.length -1))
					data  = data +"},";
				else
					data  = data +"}";
			}
			data = data+"]";
			dom.byId(divContainer).innerHTML = data;
		});
      },
	  
	  QueryByWhereCondition: function(whereCondition,outFields,divContainer) 
	  {
		var queryTask = new QueryTask(this.urlService);
		var query = new Query();
		query.returnGeometry = true;
		query.outFields = outFields;
		query.where = whereCondition;
		
		var data = "";
		queryTask.execute(query, function(featureSet)
		{
			data = "[";
			var resultFeatures = featureSet.features;
			
			for(var i=0;i<resultFeatures.length;i++)
			{
				data  = data +"{";
				
				for(var counter=0;counter<outFields.length;counter++)
				{
					
					if(counter < (outFields.length-1))
						data  = data+"'"+outFields[counter]+"':'"+resultFeatures[i].attributes[outFields[counter]]+"',";
					else	
						data  = data+"'"+outFields[counter]+"':'"+resultFeatures[i].attributes[outFields[counter]]+"'";
				}
				
				if(i<(resultFeatures.length -1))
					data  = data +"},";
				else
					data  = data +"}";
			}
			data = data+"]";
			dom.byId(divContainer).innerHTML = data;
		});
	  }
    });
});