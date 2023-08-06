/*
For example:
		var circle = new CircleBuffer(map,[[100,6],[101,12]],[50,150]);
		circle.Draw();
*/
define([ 
  "dojo/_base/declare",
  "dojo/_base/Color",
  "esri/layers/GraphicsLayer",
  "esri/geometry/Point",
  "esri/SpatialReference",
  "esri/symbols/SimpleFillSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/graphic",
  "esri/geometry/Circle", 
  "esri/units"
], 
function(
	declare,
	Color,
	GraphicsLayer,
	Point,
	SpatialReference,
	SimpleFillSymbol,
	SimpleLineSymbol,
	Graphic,
	Circle,
	Units
	) 
{
    return declare([], {
	  map:null,
	  GraphicsLayer:null,
	  Raduis:null,
	  Centers:null,
      constructor: function(map,Centers,Raduis)
	  {
		this.map = map;
		this.Raduis = Raduis;
		this.Centers = Centers;

		this.GraphicsLayer = new GraphicsLayer();
		this.map.addLayer(this.GraphicsLayer);
      },

      Draw: function() 
	  {
		  this.GraphicsLayer.clear();
		  for(var i = 0;i<this.Centers.length;i++)
		  {
			  var coord = this.Centers[i];
			  var lon = coord[0];
			  var lat = coord[1];
			 
			  var symbol = new SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID,
						new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID,new Color([255,0,0,0.65]),2),
						new Color([255,0,0,0.20]));
			  var centerPoint = new Point(parseFloat(lon),parseFloat(lat),new SpatialReference({ wkid:4326 })); 
			  var circleGeometry = new Circle({
				center: centerPoint,
				radius: this.Raduis[i],
				radiusUnit: Units.KILOMETERS
			  });
			 
			var graphic = new Graphic(circleGeometry,symbol);
			this.GraphicsLayer.add(graphic);
		  }
      },
	  
	  Clear : function()
	  {
		this.GraphicsLayer.clear();
	  }
	  
    });
});