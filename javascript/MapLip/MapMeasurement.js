/*
this class can be used to add measurement tools to div container by setting two parameters such as 
@map : the currently map.
@measurementDiv : the div id which is the container.

For example code:
	var measurement = new MapMeasurement(map,"MeasurementDiv");
*/
define([ 
  "dojo/_base/declare",
  "esri/dijit/Measurement",
  "dijit/TitlePane",
  "dojo/dom",
], 
function(
	declare,
	Measurement,
	TitlePane,
	dom
	) 
{
    return declare([], 
	{
      constructor: function(map,measurementDiv)
	  {		
		var measurement = new Measurement({map: map}, dom.byId(measurementDiv));
		measurement.startup();
      }
    });
});