// convert between MGRS and UTM
// from http://www.andrewlesley.freeserve.co.uk/gps/convertr/UTM-MGRS.html

/*==================================================================================

The first section relates to the conversion from UTM to MGRS:
    
==================================================================================*/

/***********************************************************************************

    UTMzdl(latDeg)
    
Given a valid latitude (ie in the range -80 to +84 deg), returns the corresponding
zone designation letter

Used by UTMtoZDL() and UTMNtoZDL() although the latter is not normally used
    
***********************************************************************************/
// from http://www.andrewlesley.freeserve.co.uk/gps/convertr/UTM-MGRS.html
var UTMzdlChars="CDEFGHJKLMNPQRSTUVWXX";

function UTMzdl(latDeg)
{
    if(-80<=latDeg&&latDeg<=84)
        return UTMzdlChars.charAt(Math.floor((latDeg+80)/8));
    else
    {
        //alert("No zdl: UTM is not valid for Lat "+latDeg);  //Not normally reached
        return "";
    }
}

/***********************************************************************************

    UTMNtoZDL(N)
    
Given a valid Northing in metres, returns the approximate corresponding
zone designation letter: NOTE THAT THIS MAY BE IN ERROR by at most 1 letter:
For illustrative purposes only: normally replaced by ZoneLatToN(d,E)/UTMtoZDL(E,N).
see accompanying notes.
    
***********************************************************************************/

function UTMNtoZDL(N)
{
    var latDeg=N*82.82/(92*100000);
    //alert("latdeg="+latDeg);
    return UTMzdl(latDeg);
}

/***********************************************************************************

   ZoneLatToN(d,E)
    
Given an easting in meters and a latitude d degrees which is a multiple of 8
(ie a ZDL boundary), computes the corresponding northing with an error of at most 20cm.

The constants below depend on the relationship of UTM to latitude and cannot easily
be computed here. Each row relates to a latitude which forms the boundary between
two ZDLs
    
***********************************************************************************/

function ZoneLatToN(d,E)
{
	//		int d;double N0,E1,dN1,k;
	
	//alert(d+" "+E);
	
	var c= [[ 0,      0.000,833978.557,   0.000,0.0000000000],
			[ 8, 884297.851,830743.842,1205.908,0.0072920001],
			[16,1768935.376,821099.997,2318.642,0.0144411176],
			[24,2654226.538,805227.189,3252.171,0.0213074192],
			[32,3540435.693,783423.227,3934.216,0.0277567819],
			[40,4427757.219,756099.648,4311.838,0.0336635858],
			[48,5316300.224,723775.915,4355.565,0.0389131714],
			[56,6206079.587,687071.439,4061.740,0.0434040145],
			[64,7097014.163,646695.227,3452.887,0.0470495860],
			[72,7988932.503,603433.054,2576.040,0.0497798833],
			[80,8881585.816,558132.215,1499.140,0.0515426300],
            [84,9328093.831,534994.655, 911.352,0.0520499036]];	//	special value for N Hemisphere

	var d1=(d==84)?11:Math.abs(d)/8;
	
	var N0=c[d1][1];
	var E1=c[d1][2];
	var k =c[d1][4];
		
	var E10=E1-500000;
	
	var x=(E-500000.)/E10;
	
	var N=N0+k*x*(E-500000.)/(1+Math.sqrt(1-k*k*x*x));
	
	return(d>0)?N:-N;
}

/***********************************************************************************

   UTMtoZDL(E,N)
    
Given a valid UTM easting & (signed) northing in meters, returns the corresponding
zone designation letter using a zdl boundary which is in error by at most 20cm:
see accompanying notes.
    
***********************************************************************************/

function UTMtoZDL(E,N)
{
	var d;
	
	if(N<=ZoneLatToN(84,E))
	{
	    for(d=72;d>=-72;d-=8)
	    {
	        if(ZoneLatToN(d,E)<N)return UTMzdl(d+4);
	    }
	}
	
	//alert("Invalid Northing: cannot compute ZDL");
	
	return "";
}

/***********************************************************************************

    MGRSdigits(EorN,u,n)
    
Given an E or N coordinate in meters and an integer n, returns

	x100	100km coords as an INTEGER
	r100	n MGRS digits as a STRING
	
	as properties of u
	
For example, if EorN=6852413.56, v will be

	1.685241356

Thus chars 2 to 3 give the coords of the MGRS square, the remainder are the MGRS
numeric coords. The 1e7 ensures that 
    
***********************************************************************************/

function MGRSdigits(EorN,u,n)
{   
    var v=(EorN+1e7+1e-4)/10000000+"0000000000000000";
    u.x100=Number(v.substr(2,2));
    u.r100=v.substr(4,n);
    //alert(v+"\n"+u.x100+"\n"+u.r100);
}

/***********************************************************************************

    MGRSletters(zone,E100,N100,u)
    
Given the zone and Easting and Northing in integer units of 100km, returns the two
corresponding Grid letters c1, c2 as properties of u
    
***********************************************************************************/

var MGRSchars="ABCDEFGHJKLMNPQRSTUVWXYZ";

function MGRSletters(zone,E100,N100,u)
{
    //alert("Zone "+zone+"\nE100="+E100+"\nN100="+N100);
    
    var j=E100-1;
    var e8=8*(zone-1)+j;
    u.c1=MGRSchars.charAt(e8%24);
    u.c2=MGRSchars.charAt((N100+100+((zone%2)?0:5))%20);    //NB advance 2nd letter by 5 for odd zones
}

/***********************************************************************************

    UTMtoMGRS(zone,E,N,d,u)
    
    zone	zone (integer)
    E		easting (double)
    N		northing (signed double)
    d		MGRS digits to display
    
saves
   
 	zone	Zone (integer)
	zdl		Zone designation letter
	c1		1st MGRS square letter
	c2 		2nd MGRS square letter
	er		Easting digit string
	nr		Northing digit string
	
as properties of u

returns

    true    if a conversion has been performed
    
    however, little checking is done to see if the transformtion is plausible
    
***********************************************************************************/

function UTMtoMGRS(zone,E,N,isSouth,d,u)
{
    if(isSouth)
    { // s is checked: expect N in complement form:
      N-=10000000; // convert to signed form
    } 
    if(zone<1||zone>60||Math.round(zone)!=zone)
    {
    	//alert("Invalid Zone");
    	return;
    }
    
    u.zone=zone;
    
    //u.zdl=UTMzdlFromN(N);
    
    //	for normal purposes the above is better replaced by
    
    var zdl=UTMtoZDL(E,N);
    
    if(zdl.length!=1)
    {
    	//alert("Invalid UTM");
    	return;
    }
    
    u.zdl=zdl;
    
    var e={},n={};
    
    //alert(E+" "+N+" "+d);
    
    MGRSdigits(E,e,d);
    MGRSdigits(N,n,d);
    
    //alert(e.x100+" "+e.r100);
    //alert(n.x100+" "+n.r100);

    var E100=e.x100,N100=n.x100;

    MGRSletters(zone,E100,N100,u);
    
    u.E=e.r100;
    u.N=n.r100;
    
    return u.zone+" "+ u.zdl+" "+u.c1+u.c2+" "+u.E+" "+u.N;
}

/***********************************************************************************

    MGRStoStr(zone,zdl,c1,c2,E,N)
   
Converts the given data (cf MGRStoUTM) to an MGRS string.

***********************************************************************************/

function MGRStoStr(zone,zdl,c1,c2,E,N)
{
    return zone+" "+ zdl+" "+c1+c2+" "+E+" "+N;
}

/*==================================================================================

The next section relates to the conversion from MGRS to UTM:
    
==================================================================================*/

/***********************************************************************************

    zdlMedianLat(zdl)
    
Returns the latitude in degrees of  the centre of the given latitude band,
specified by its zdl
    
***********************************************************************************/

function zdlMedianLat(zdl)
{
    if(zdl=="X")return 78;            //not 76; X is 72 to 84
    var i=UTMzdlChars.indexOf(zdl);
    if(i<0)
    {
        alert('Invalid zone designation letter "'+zdl+'"');
        return;
    }
    return -76+8*i
}

/***********************************************************************************

   MGRStoUTM(zone,zdl,c1,c2,er,nr,u)
    
Given

	zone	Zone (integer)
	zdl		Zone designation letter
	c1		1st MGRS square letter
	c2 		2nd MGRS square letter
	er		Easting digit string
	nr		Northing digit string
	
saves
	
	zone	zone
	E		Easting	in meters
	N		Northing in meters: SIGNED

as properties of u

returns

	true    if the conversion succeeded	
    
***********************************************************************************/

function MGRStoUTM(zone,zdl,c1,c2,er,nr,u)
{
    //alert("MGRStoUTM "+c1+" "+c2+" "+er+" "+nr);

    if(zone<1||zone>60||Math.round(zone)!=zone)
    {
    	alert("Invalid Zone");
    	return;
    }
    
    u.zone=zone;
    
    var n1=MGRSchars.indexOf(c1);
    var n2=MGRSchars.indexOf(c2);
    
    if(n1<0||n2<0)
    {
    	alert("Invalid MGRS square characters");
    	return;
    }

    var E0=1+n1%8;
    var N0=(20+n2-((zone%2)?0:5))%20;

    var approxN=zdlMedianLat(zdl)*100/90; // approx median northing of zdl in units of 100km

    N0+=Math.round((approxN-N0)/20)*20;   // add a multiple of 2000km to get the MGRS square closest
                                          // to approxN (letters repeat every 20*100km=2000km)
    
    d=er.length;
    
    if(nr.length!=d)
    {
		alert("MGRS Easting and Northing must have\nthe same number of digits");
    	return;
    }

    //alert("E0="+E0+"  N0="+N0+"  d="+d);

    u.E=E0*100000+Number(er)*Math.pow(10,5-d);
    u.N=N0*100000+Number(nr)*Math.pow(10,5-d);

    
}


