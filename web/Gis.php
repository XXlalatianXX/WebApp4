<?
session_start();

if($_SESSION["UserName"] == "")
{
	header("Location: ../index.php");  
}

$host_ip = "localhost";
$application = "cs_gis_dev_framework";

?>

<!DOCTYPE html>
<html>
<head>
 	<meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  
    <title><?php echo $_SESSION['Title'];?></title>
	<link rel="stylesheet" type="text/css" href="css/bootstrap/css/bootstrap.css">
	<link rel="stylesheet" type="text/css" href="css/bootstrap/css/bootstrap.min.css">
    <link rel="stylesheet" href="css/styles_GIS.css">
	<link rel="stylesheet" href="css/modernGrey.css">
	<link href="css/themes/Base/jquery-ui-1.11.4.custom/jquery-ui.css" rel="stylesheet">
  </head>
<body>
	<div id="containner">
		<!-------------Header Section----------------->
		<div class="header">
			<div id="header_left">
				<img src="images/header_left.png" class="img-responsive" >
			</div>
			<div id="header_center"><img src="images/header_center.png" class="img-responsive"></div>
			<div id="header2_center"><img src="images/NKRAFA2.png" class="img-responsive"></div>
			<div id="header_right">
				<span class="span_login">ยินดีต้อนรับ : <?php echo $_SESSION['Info'];?></span>
				<a href="../logout.php" style="text-decoration:none;"><img src="images/log_off.png" id="logoff" style="position:absolute; top:0;right:0;z-index:3;" class="img-responsive"></a>
				<img src="images/header_right.png" class="img-responsive" style="position:absolute;top:0;right:0;z-index:2;">		</div>
			<br class=”clear-all”>
		</div>
		<!-------------Left menu Section----------------->
		<div id="verticalLineLeft">		
			<a href='#' id="btnData2"><img src="images/search_icon.png" ></a><br>
			<div style="display:none"><a href='#' id="btnData3"><img src="images/Statistics.png" ></a><br></div>
			<?php if($_SESSION['Level'] == "Administrator" || $_SESSION['Level'] == "Editor") {?>
			<a href='#' id="btnData4"><img src="images/Management.png" ></a><br>
			<?php }?>
		</div>
		<!-------------Right menu Section---------------->
		<div id="verticalLineRight">	
			<a href='#' id="btnBaseMap"><img src="images/basemap_icon.png" ></a><br>	
			<a href='#' id="btnStaffMap"><img src="images/layers_icon.png" ></a><br>
			<a href='#' id="btnDrawMap"><img src="images/draw_icon.png" ></a><br>
			<a href='#' id="btnSymbols"><img src="images/symbol_icon.png" ></a><br>
			<a href='#' id="btnToolMap"><img src="images/measurement_icon.png" ></a><br>
		</div>
		<!-------------Map Section-------------------->
		<div id="map" style="position:relative;width:100%; height:100%;border:0px solid #000;">
			<div class="toggler">
				<!-------------Left Side Menu-------------------->					
					<div id="divData2Container" class="divCOP" style="width:30%;height:90%;top:20px;left:18px;">
						<h5 id="slideData2" style="margin:0; padding:4px 0px 5px 5px; text-align:right; background-image:url(images/bg_header_cop_div.png); background-repeat:repeat; color:#EFEFEF; cursor:pointer; font-size:1em;">Search <b style="color:#FF0000;margin:0px 5px 0px 8px; font-size:1.3em;">x</b></h5>
						<div id="search" style="margin-left:5px;overflow-y:auto;overflow-x:hidden;">						
							<div id="tabs2" style="font-size:0.9em;">
								<ul>
									<li><a href="#tabs2-1">Search</a></li>
								</ul>
								
								<div id="tabs2-1">
									<div>
										<div id="MySearchHeaderDiv" class="divBG2">
											<table align="center" width="90%">
											    <!--<tr>
													<td colspan="3" align="left"><b style="color:#FF0000;"><u>ค้นหาข้อมูลการบิน</u></b></td>
												</tr>-->
												<tr>
													<td>Local 1</td>
													<td>:&nbsp;</td>
													<td><input id="lon1" type="text" value="" placeholder="lon" size="15" style="margin-left:30px;width:120px"></td>
													<td><input id="lat1" type="text" value="" placeholder="lat" size="15" style="margin-left:-60px;width:120px"></td>
												 </tr>	
												 <tr>
													<td>Local 2</td>
													<td>:&nbsp;</td>
													<td><input id="lon2" type="text" value="" placeholder="lon" size="15" style="margin-left:30px;width:120px"></td>
													<td><input id="lat2" type="text" value="" placeholder="lat" size="15" style="margin-left:-60px;width:120px"></td>
												 </tr>	

												 <tr>
													<td colspan = "5" align="center">
														<div style="visibility:hidden" >///</div>
													</td>
												 </tr>
												 <tr>
													<td colspan = "5" align="center">
														<div style="visibility:hidden" >///</div>
													</td>
												 </tr>
												 <tr>
													<td colspan = "6" align="center">
														<input type="button" onclick = "searchCor()" value="ค้นหา"></button>
														<input type="button" onclick = "cal()" value="เคลียร์"></button>
														<input type="button" onclick = "showWing()" value="แสดงกองบิน" style="width:25%;background-color:blue">
													</td>
												 </tr>
												 <tr>
													<td colspan = "5" align="center">
														<div style="visibility:hidden" >///</div>
													</td>
												 </tr>
												 <tr>
												 	<td>W1 to P</td>
													 <td>:&nbsp;</td>
													<td>
														<div id = "showDistance" style="margin-left:40px"></div>
													</td>
												 </tr>
												 <tr>
												 	<td>W21 to P</td>
													 <td>:&nbsp;</td>
													<td>
														<div id = "showDistance1" style="margin-left:40px"></div>
													</td>
												 </tr>
												 <tr>
												 	<td>W23 to P</td>
													 <td>:&nbsp;</td>
													<td>
														<div id = "showDistance2" style="margin-left:40px"></div>
													</td>
												 </tr>
											</table>										
										</div>
										<div id="acasSearchPagesDiv"></div>
										<table id="tAcasSearchResult" cellspacing="0" style="width:100%">
											<thead>
												<tr id='trhead' >
											</thead>
											<tbody>
											</tbody>
										</table>
									</div>
								</div>

							</div>
						</div>
					</div>
					
					<div id="divData3Container" class="divCOP" style="width:60%;height:90%;top:20px;left:18px;">
						<h5 id="slideData3" style="margin:0; padding:4px 0px 5px 5px; text-align:right; background-image:url(images/bg_header_cop_div.png); background-repeat:repeat; color:#EFEFEF; cursor:pointer; font-size:1em;">ข้อมูลเชิงสถิติ<b style="color:#FF0000;margin:0px 5px 0px 8px; font-size:1.3em;">x</b></h5>
						<div id="legend" style="margin-left:5px;overflow-y:auto;overflow-x:hidden;">
							<div id="tabs3" style="font-size:0.9em;">
								<ul>
									<li><a href="#tabs3-1">ข้อมูลเชิงสถิติ</a></li>
								</ul>
								<div id="tabs3-1">
															
								</div>
							
							</div>	
						</div>
					</div>
					
					<div id="divData4Container" class="divCOP" style="width:30%;height:90%;top:20px;left:18px;">
						<h5 id="slideData4" style="margin:0; padding:4px 0px 5px 5px; text-align:right; background-image:url(images/bg_header_cop_div.png); background-repeat:repeat; color:#EFEFEF; cursor:pointer; font-size:1em;">จัดการข้อมูลพื้นฐาน<b style="color:#FF0000;margin:0px 5px 0px 8px; font-size:1.3em;">x</b></h5>
						<div id="legend" style="margin-left:5px;overflow-y:auto;overflow-x:hidden;">
							<div id="tabs4" style="font-size:0.9em;">
								<ul>
									<?php if($_SESSION['Level'] == "Administrator") {?>
									<li><a href="#tabs4-7">จัดการผู้ใช้งาน</a></li>
									<?php }?>
									
								</ul>
								<div id="tabs4-7">
									<div class="divBG2">
										<table align="center" width="90%">
											<tr>
												<td colspan="3" align="center"><b style="color:#FF0000;"><u>บันทึกผู้ใช้งาน</u></b></td>
											</tr>
											<tr>
												<td  align='right'>UserName</td>
												<td>:&nbsp;</td>
												<td><input id="UserName" type="text"  value="" size="10"/></td>
											</tr>
											<tr>
												<td  align='right'>Password</td>
												<td>:&nbsp;</td>
												<td><input id="Password" type="text"  value="" size="10"/></td>
											</tr>
											<tr>
												<td  align='right'>ยศ-ชื่อ-สกุล ผู้ใช้งาน</td>
												<td>:&nbsp;</td>
												<td><input id="FullName" type="text"  value="" size="15"/></td>
											</tr>
											<tr>
												<td  align='right'>ประเภทผู้ใช้งาน </td>
												<td>:&nbsp;</td>
												<td>
													<select id="Authority">
														<option value="Viewer">Viewer</option>
														<option value="Editor">Editor</option>
														<option value="Administrator">Administrator</option>
													</select>
												</td>
											</tr>	
											<tr>
												<td colspan = "3" align="center">
													<input type="button" onclick = "onSaveUser()" value="บันทึก">
													<input type="button" onclick = "onClearUser()" value="เคลียร์">
												</td>
											</tr>
										</table>										
									</div>								
									<div id="resultUsersPagesDiv">รายการผู้ใช้งาน</div>
									<table id="tUsersResult" cellspacing="0" style="width:100%">
										<thead>
											<tr id='trhead' >
										</thead>
										<tbody>
										</tbody>
									</table>								
								</div>
							</div>	
						</div>
					</div>				
				<!-------------Right Side Menu-------------------->
					<div id="divBaseMapContainer" class="divCOP" style="top:40px;right:18px;">
						<h5 id="slideBaseMap" style="margin:0; padding:4px 0px 5px 5px; text-align:left; background-image:url(images/bg_header_cop_div.png); background-repeat:repeat; color:#EFEFEF; cursor:pointer; font-size:1em;"><b style="color:#FF0000;margin:0px 8px 0px 2px; font-size:1.3em;">x</b> Online BaseMap</h5>								
						<div id="basemap" style="margin-left:5px;margin-bottom:10px;overflow-y:auto;overflow-x:hidden;">
							<div id="basemapGallery" style="color:black; font-size:0.75em;"></div>
						</div>
					</div>
					
					<div id="divStaffContainer" class="divCOP" style="width:270px;height:85%;top:40px;right:18px;z-index:1;">
						<h5 id="slideStaffMap" style="margin:0; padding:4px 0px 5px 5px; text-align:left; background-image:url(images/bg_header_cop_div.png); background-repeat:repeat; color:#EFEFEF; cursor:pointer; font-size:1em;"><b style="color:#FF0000;margin:0px 8px 0px 2px; font-size:1.3em;">x</b> ชั้นข้อมูลพื้นฐาน</h5>
						<div id ="staffmap" style="margin-left:10px;overflow-y:auto;overflow-x:hidden;">
							<table  cellpadding="4"cellspacing="0" width="100%" border='0'>
								<tr>
									<td>
										<div id="RtafLayers" style="color:#FFFFFF; font-size:1em;"></div>										
										<div id="siteGraphicPointLayer" style="color:#FFFFFF; font-size:1em;"></div>
										<div id="radarGraphicPointLayer" style="color:#FFFFFF; font-size:1em;"></div>
										<div><input type="checkbox" name="chkRadarTracking" id="chkRadarTracking" />: Radar Tracking</div>
									</td>
								</tr>
							</table>
						</div>
					</div>
					
					<div id="divDrawContainer" class="divCOP" style="width:270px;height:85%;top:40px;right:18px;z-index:1;">
						<h5 id="slideDrawMap" style="margin:0; padding:4px 0px 5px 5px; text-align:left; background-image:url(images/bg_header_cop_div.png); background-repeat:repeat; color:#EFEFEF; cursor:pointer; font-size:1em;"><b style="color:#FF0000;margin:0px 8px 0px 2px; font-size:1.3em;">x</b> วาดกราฟฟิก</h5>
						<div id ="drawmap" style="margin:0px 5px 0px 5px;overflow-y:auto;overflow-x:hidden;">
							<div id="divDrawingPanel"></div>
						</div>
					</div>
					
					<div id="divSymbolContainer" class="divCOP" style="width:270px;height:85%;top:40px;right:18px;z-index:1;">
						<h5 id="slideSymbol" style="margin:0; padding:4px 0px 5px 5px; text-align:left; background-image:url(images/bg_header_cop_div.png); background-repeat:repeat; color:#EFEFEF; cursor:pointer; font-size:1em;"><b style="color:#FF0000;margin:0px 8px 0px 2px; font-size:1.3em;">x</b> Symbols</h5>
						<div id ="symbol" style="margin:0px 5px 0px 5px;overflow-y:auto;overflow-x:hidden;">
							<div id="divSymbolPanel"></div>
						</div>
					</div>	
					
					<div id="divToolContainer" class="divCOP" style="width:270px;height:70%;top:40px;right:18px;z-index:1;">
						<h5 id="slideTool" style="margin:0; padding:4px 0px 5px 5px; text-align:left; background-image:url(images/bg_header_cop_div.png); background-repeat:repeat; color:#EFEFEF; cursor:pointer; font-size:1em;"><b style="color:#FF0000;margin:0px 8px 0px 2px; font-size:1.3em;">x</b> เครื่องมือวัด </h5>
						<div id ="toolmap" style="margin-left:10px;overflow-y:auto;overflow-x:hidden;color:#FFFFFF;">
						</div>
					</div>
				
			</div>
			<!-- windowInfo tab -->
			<div id="dialog" title="รายละเอียด"></div>
		</div>

		<!-------------Footer Section----------------->
		<div id="footer">
			<span id="showpoint" style="color:#FFFFFF; padding-left:50px; font-size:0.80em;"></span>
		</div>
	</div>
</body>
</html>

<script>
	var arcgis_js_api_host = "<?php echo $host_ip;?>/<?php echo $application;?>/javascript/arcgis_js_api/library/3.8/3.8/js/dojo/dojo";
	var dojoConfig = {
		parseOnLoad: true,
		paths: { MapLip: "/<?php echo $application;?>/javascript/MapLip"}
	};

	var CurrentUserLoginName = "<?php echo $_SESSION['UserName'];?>";
	var CurrentUserLoginPassword = "<?php echo $_SESSION['Key'];?>";
</script>

<link rel="stylesheet" type="text/css" href="css/soria/soria.css"/>
<link rel="stylesheet" type="text/css" href="/<?php echo $application;?>/javascript/arcgis_js_api/library/3.8/3.8/js/esri/css/esri.css"/>

<script src="css/themes/Cupertino/jquery-ui-1.11.4.custom/external/jquery/jquery.js"></script>
<script src="css/themes/Cupertino/jquery-ui-1.11.4.custom/jquery-ui.js"></script>
<script src="/<?php echo $application;?>/javascript/arcgis_js_api/library/3.8/3.8/init.js"></script>
<script src="../javascript/MyUtils/trackreader.js"></script>
<script src="../javascript/myjsutil.js"></script>
<script src="../javascript/mgrs.js"></script>
<script src="../javascript/wgs84_to_utm.js"></script>

<script src="../javascript/Controllers/User.js"></script>
<script src="../javascript/Controllers/MapController.js"></script>
<script src="../javascript/Controllers/WebController.js"></script>
<script src="../javascript/Controllers/TrackController.js"></script>
<script src="../javascript/Controllers/UserController.js"></script>
<script src="../javascript/Controllers/MyController.js"></script>

<script src="../javascript/Controllers/DrawingPanel.js"></script>
<script src="../javascript/Controllers/DrawingManager.js"></script>
<script src="../javascript/Controllers/DrawingMilitarySymbols.js"></script>

<script src="../javascript/Graph/jscharts.js"></script>
<script src="../javascript/Graph/Graph.js"></script>
<script src="../javascript/Graph/BarChart.js"></script>
<script src="../javascript/Graph/PieChart.js"></script>
<script src="../javascript/Graph/LineChart.js"></script>
<script src="../javascript/jscolor.js"></script>

<script>
	$(document).ready(function()
	{
		$( "#tabs1" ).tabs();
		$( "#tabs2" ).tabs();
		$( "#tabs3" ).tabs();
		$( "#tabs3_sub1" ).tabs();
		$( "#tabs3_sub2" ).tabs();
		$( "#tabs3_sub3" ).tabs();
		$( "#tabs3_sub4" ).tabs();
		$( "#tabs4" ).tabs();
		$( "#tabs5" ).tabs();
		
		$( "#dialog" ).dialog({
			autoOpen: false,
			width: 350,
			position: { my: "center",at:"center"},
			buttons: [
				{
					text: "ปิด",
					click: function() {
						$( this ).dialog( "close" );
					}
				}
			]
		});	
	});
	
  $(function() 
  {
	function togglePanelMenu(div,effect)
	{
	  var selectedEffect = "slide";
      var options = {};
      if ( selectedEffect === "scale" ) 
	  {
        options = { percent: 2 };
      } 
	  else if ( selectedEffect === "size" ) 
	  {
        options = { to: { width: 200, height: 60 } };
      }
      $(div).toggle( selectedEffect, options, 500 );
	  
		  if ($(div).attr('id')=='divData1Container') {		  
			  if ($("#divData2Container").is(":visible")) $("#divData2Container").toggle( selectedEffect, options, 500 );
			  if ($("#divData3Container").is(":visible")) $("#divData3Container").toggle( selectedEffect, options, 500 );
			  if ($("#divData4Container").is(":visible")) $("#divData4Container").toggle( selectedEffect, options, 500 );
			  if ($("#divData5Container").is(":visible")) $("#divData5Container").toggle( selectedEffect, options, 500 );
		  }else if ($(div).attr('id')=='divData2Container') { 		  
			  if ($("#divData1Container").is(":visible")) $("#divData1Container").toggle( selectedEffect, options, 500 );
			  if ($("#divData3Container").is(":visible")) $("#divData3Container").toggle( selectedEffect, options, 500 );
			  if ($("#divData4Container").is(":visible")) $("#divData4Container").toggle( selectedEffect, options, 500 );
			  if ($("#divData5Container").is(":visible")) $("#divData5Container").toggle( selectedEffect, options, 500 );
		  }else if ($(div).attr('id')=='divData3Container') { 		  
			  if ($("#divData1Container").is(":visible")) $("#divData1Container").toggle( selectedEffect, options, 500 );
			  if ($("#divData2Container").is(":visible")) $("#divData2Container").toggle( selectedEffect, options, 500 );
			  if ($("#divData4Container").is(":visible")) $("#divData4Container").toggle( selectedEffect, options, 500 );
			  if ($("#divData5Container").is(":visible")) $("#divData5Container").toggle( selectedEffect, options, 500 );
		  }else if ($(div).attr('id')=='divData4Container') { 		  
			  if ($("#divData1Container").is(":visible")) $("#divData1Container").toggle( selectedEffect, options, 500 );
			  if ($("#divData2Container").is(":visible")) $("#divData2Container").toggle( selectedEffect, options, 500 );
			  if ($("#divData3Container").is(":visible")) $("#divData3Container").toggle( selectedEffect, options, 500 );
			  if ($("#divData5Container").is(":visible")) $("#divData5Container").toggle( selectedEffect, options, 500 );
		  }else if ($(div).attr('id')=='divData5Container') { 		  
			  if ($("#divData1Container").is(":visible")) $("#divData1Container").toggle( selectedEffect, options, 500 );
			  if ($("#divData2Container").is(":visible")) $("#divData2Container").toggle( selectedEffect, options, 500 );
			  if ($("#divData3Container").is(":visible")) $("#divData3Container").toggle( selectedEffect, options, 500 );
			  if ($("#divData4Container").is(":visible")) $("#divData4Container").toggle( selectedEffect, options, 500 );
		  }
	};
	
	function togglePanelMenuLeft(div,effect)
	{
	  var selectedEffect = "slide";
      var options = { direction:'right' };
      $(div).toggle( selectedEffect, options, 500 );
		  
		  if ($(div).attr('id')=='divBaseMapContainer') {		  
			  if ($("#divStaffContainer").is(":visible")) $("#divStaffContainer").toggle( selectedEffect, options, 500 );
			  if ($("#divDrawContainer").is(":visible")) $("#divDrawContainer").toggle( selectedEffect, options, 500 );
			  if ($("#divToolContainer").is(":visible")) $("#divToolContainer").toggle( selectedEffect, options, 500 );	
			  if ($("#divSymbolContainer").is(":visible")) $("#divSymbolContainer").toggle( selectedEffect, options, 500 );			  
		  }else if ($(div).attr('id')=='divStaffContainer') { 		  
			  if ($("#divBaseMapContainer").is(":visible")) $("#divBaseMapContainer").toggle( selectedEffect, options, 500 );
			  if ($("#divDrawContainer").is(":visible")) $("#divDrawContainer").toggle( selectedEffect, options, 500 );
			  if ($("#divToolContainer").is(":visible")) $("#divToolContainer").toggle( selectedEffect, options, 500 );	
			  if ($("#divSymbolContainer").is(":visible")) $("#divSymbolContainer").toggle( selectedEffect, options, 500 );			  
		  }else if ($(div).attr('id')=='divDrawContainer') { 		  
			  if ($("#divBaseMapContainer").is(":visible")) $("#divBaseMapContainer").toggle( selectedEffect, options, 500 );
			  if ($("#divStaffContainer").is(":visible")) $("#divStaffContainer").toggle( selectedEffect, options, 500 );
			  if ($("#divToolContainer").is(":visible")) $("#divToolContainer").toggle( selectedEffect, options, 500 );	
			  if ($("#divSymbolContainer").is(":visible")) $("#divSymbolContainer").toggle( selectedEffect, options, 500 );			  
		  }else if ($(div).attr('id')=='divToolContainer') { 		  
			  if ($("#divBaseMapContainer").is(":visible")) $("#divBaseMapContainer").toggle( selectedEffect, options, 500 );
			  if ($("#divStaffContainer").is(":visible")) $("#divStaffContainer").toggle( selectedEffect, options, 500 );
			  if ($("#divDrawContainer").is(":visible")) $("#divDrawContainer").toggle( selectedEffect, options, 500 );	
			  if ($("#divSymbolContainer").is(":visible")) $("#divSymbolContainer").toggle( selectedEffect, options, 500 );			  
		  }else if ($(div).attr('id')=='divSymbolContainer') { 		  
			  if ($("#divBaseMapContainer").is(":visible")) $("#divBaseMapContainer").toggle( selectedEffect, options, 500 );
			  if ($("#divStaffContainer").is(":visible")) $("#divStaffContainer").toggle( selectedEffect, options, 500 );
			  if ($("#divDrawContainer").is(":visible")) $("#divDrawContainer").toggle( selectedEffect, options, 500 );	
			  if ($("#divToolContainer").is(":visible")) $("#divToolContainer").toggle( selectedEffect, options, 500 );			  
		  } 
	};
	
		
	$( "#btnBaseMap" ).click(function() 
	{
      togglePanelMenuLeft("#divBaseMapContainer","slide");
    });
	
	$( "#slideBaseMap" ).click(function() 
	{
      togglePanelMenuLeft("#divBaseMapContainer","slide");
    });
	
	$( "#btnStaffMap" ).click(function() 
	{
      togglePanelMenuLeft("#divStaffContainer","slide");
    });
	
	$( "#slideStaffMap" ).click(function() 
	{
      togglePanelMenuLeft("#divStaffContainer","slide");
    });
	
	$( "#btnData1" ).click(function() 
	{
      togglePanelMenu("#divData1Container","slide");
    });
	
	$( "#slideData1" ).click(function() 
	{
      togglePanelMenu("#divData1Container","slide");
    });

	$( "#btnData2" ).click(function() 
	{
      togglePanelMenu("#divData2Container","slide");
    });
	
	$( "#slideData2" ).click(function() 
	{
      togglePanelMenu("#divData2Container","slide");
    });
	
	$( "#btnData3" ).click(function() 
	{
      togglePanelMenu("#divData3Container","slide");
    });
	$( "#slideData3" ).click(function() 
	{
      togglePanelMenu("#divData3Container","slide");
    });
	
	$( "#btnData4" ).click(function() 
	{
      togglePanelMenu("#divData4Container","slide");
    });
	
	$( "#slideData4" ).click(function() 
	{
      togglePanelMenu("#divData4Container","slide");
    });
	
	$( "#btnData5" ).click(function() 
	{
      togglePanelMenu("#divData5Container","slide");
    });	
	$( "#slideData5" ).click(function() 
	{
      togglePanelMenu("#divData5Container","slide");
    });
	
	$( "#btnDrawMap" ).click(function() 
	{
      togglePanelMenuLeft("#divDrawContainer","slide");
    });
	
	$( "#slideDrawMap" ).click(function() 
	{
      togglePanelMenuLeft("#divDrawContainer","slide");
    });
	
	$( "#btnSymbols" ).click(function() 
	{
      togglePanelMenuLeft("#divSymbolContainer","slide");
    });
	
	$( "#slideSymbol" ).click(function() 
	{
      togglePanelMenuLeft("#divSymbolContainer","slide");
    });
	
	$( "#btnToolMap" ).click(function() 
	{
      togglePanelMenuLeft("#divToolContainer","slide");
    });
	
	$( "#slideTool" ).click(function() 
	{
      togglePanelMenuLeft("#divToolContainer","slide");
    });
  });
  
 
 </script>
