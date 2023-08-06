define([ 
  "dojo/_base/declare"
], 
function(
	declare
	) 
{
    return declare([], {
      constructor: function(str)
	  {
      },

	  LTrim:function (str)
	  {
			if (str==null){return null;}
			for(var i=0;str.charAt(i)==" ";i++);
			return str.substring(i,str.length);
	   },
	  RTrim: function (str)
	  {
		if (str==null){return null;}
		for(var i=str.length-1;str.charAt(i)==" ";i--);
		return str.substring(0,i+1);
	  },
	  Trim: function (str)
	  {
		return this.LTrim(this.RTrim(str));
	  },

	  LTrimChar: function (str,c)
	  {
		if (str==null){return null;}
		for(var i=0;str.charAt(i)==c;i++);
		return str.substring(i,str.length);
	  },
	  RTrimChar: function (str,c)
	  {
		if (str==null){return null;}
		for(var i=str.length-1;str.charAt(i)==c;i--);
		return str.substring(0,i+1);
	  },
	  TrimChar: function (str,c)
	  {
		return this.LTrimChar(this.RTrimChar(str,c),c);
	  }
    });
});