define([ 
  "dojo/_base/declare",
  "esri/tasks/QueryTask",
  "esri/tasks/query",
], 
function(
	declare,
	QueryTask,
	Query
	) 
{
    return declare([], {
	  map:null,
	  urlService:null,
	  outFields:null,
      constructor: function(map,urlService,outFields)
	  {
		this.map = map;
		this.urlService = urlService;
		this.outFields = outFields;
      },

      QueryByPoint: function() 
	  {
		var queryTask = new QueryTask(this.urlService);
		var query = new Query();
		query.returnGeometry = true;
		query.outFields = this.outFields;
		//query.geometry = evt.mapPoint;
		queryTask.execute(query, function(featureSet)
		{
			/*var resultFeatures = featureSet.features;
			var provincecode = resultFeatures[0].attributes['PROV_CODE'];
			var amphurcode = resultFeatures[0].attributes['AMP_CODE'];
			var tambolcode = resultFeatures[0].attributes['TAM_CODE'];
			alert(provincecode+","+amphurcode+","+tambolcode);*/
		});
		 alert(this.outFields);
      }
    });
});