/*
 COPYRIGHT 2009 ESRI

 TRADE SECRETS: ESRI PROPRIETARY AND CONFIDENTIAL
 Unpublished material - all rights reserved under the
 Copyright Laws of the United States and applicable international
 laws, treaties, and conventions.

 For additional information, contact:
 Environmental Systems Research Institute, Inc.
 Attn: Contracts and Legal Services Department
 380 New York Street
 Redlands, California, 92373
 USA

 email: contracts@esri.com
 */
//>>built
require({cache:{"url:esri/dijit/analysis/templates/CreateDriveTimeAreas.html":'\x3cdiv class\x3d"esriAnalysis"\x3e\n    \x3cdiv data-dojo-type\x3d"dijit/layout/ContentPane" style\x3d"margin-top:0.5em; margin-bottom: 0.5em;"\x3e\n      \x3cdiv data-dojo-attach-point\x3d"_hotspotsToolContentTitle" class\x3d"analysisTitle"\x3e\n         \x3ctable class\x3d"esriFormTable" \x3e\n            \x3ctr\x3e\n              \x3ctd class\x3d"esriToolIconTd"\x3e\x3cdiv class\x3d"driveIcon"\x3e\x3c/div\x3e\x3c/td\x3e\n              \x3ctd class\x3d"esriAlignLeading"\x3e${i18n.createDriveTimeAreas}\x3c/td\x3e\n              \x3ctd\x3e\n                 \x3cdiv class\x3d"esriFloatTrailing" style\x3d"padding:0;"\x3e\n                  \x3cdiv class\x3d"esriFloatLeading"\x3e\n                    \x3ca href\x3d"#" class\x3d\'esriFloatLeading helpIcon\' esriHelpTopic\x3d"toolDescription"\x3e\x3c/a\x3e\n                  \x3c/div\x3e\n                  \x3cdiv class\x3d"esriFloatTrailing"\x3e\n                    \x3ca href\x3d"#" data-dojo-attach-point\x3d"_closeBtn" title\x3d"${i18n.close}" class\x3d"esriAnalysisCloseIcon"\x3e\x3c/a\x3e\n                  \x3c/div\x3e              \n              \x3c/div\x3e  \n              \x3c/td\x3e\n            \x3c/tr\x3e\n         \x3c/table\x3e\n      \x3c/div\x3e\n      \x3cdiv style\x3d"clear:both; border-bottom: #333 thin solid; height:1px;width:100%;"\x3e\x3c/div\x3e\n    \x3c/div\x3e\n    \x3cdiv data-dojo-type\x3d"dijit/form/Form" data-dojo-attach-point\x3d"_form" readOnly\x3d"true"\x3e\n     \x3ctable class\x3d"esriFormTable"  data-dojo-attach-point\x3d"_driveTimesTable"\x3e\n       \x3ctbody\x3e\n        \x3ctr\x3e\n          \x3ctd colspan\x3d"3" class\x3d"sectionHeader" data-dojo-attach-point\x3d"_driveTimeDescription" \x3e\x3c/td\x3e\n        \x3c/tr\x3e\n        \x3ctr\x3e\n          \x3ctd colspan\x3d"2"\x3e\n            \x3clabel data-dojo-attach-point\x3d"_labelOne" class\x3d"esriFloatLeading esriTrailingMargin025 "\x3e${i18n.oneLabel}\x3c/label\x3e\n            \x3clabel data-dojo-attach-point\x3d"_measurelabel" class\x3d""\x3e${i18n.measureLabel}\x3c/label\x3e\n          \x3c/td\x3e\n          \x3ctd class\x3d"shortTextInput"\x3e\n            \x3ca href\x3d"#" class\x3d\'esriFloatTrailing helpIcon\' data-dojo-attach-point\x3d"_analysisFieldHelpLink" esriHelpTopic\x3d"MeasurementMethod"\x3e\x3c/a\x3e\n          \x3c/td\x3e\n        \x3c/tr\x3e\n        \x3ctr\x3e\n          \x3ctd style\x3d"padding:0.25em;width:50%"\x3e\n            \x3cdiv class\x3d"esriLeadingMargin4 bufferSelector selected" data-dojo-attach-point\x3d"_drivingTime" \x3e\n              \x3cdiv class\x3d"bufferIcon esriDrivingTimeIcon"\x3e\x3c/div\x3e\n              \x3cdiv\x3e\x3clabel class\x3d"esriFloatLeading esriSelectLabel"\x3e${i18n.drivingTime}\x3c/label\x3e\x3c/div\x3e\n            \x3c/div\x3e\n          \x3c/td\x3e\n          \x3ctd style\x3d"padding:0.25em;width:50%"\x3e\n            \x3cdiv class\x3d"bufferSelector" data-dojo-attach-point\x3d"_drivingDistance"\x3e\n              \x3cdiv class\x3d"bufferIcon esriDrivingDistanceIcon"\x3e\x3c/div\x3e\n              \x3cdiv\x3e\x3clabel class\x3d"esriFloatLeading esriTrailingMargin2 esriSelectLabel"\x3e${i18n.drivingDistance}\x3c/label\x3e\x3c/div\x3e\n            \x3c/div\x3e\n          \x3c/td\x3e\n          \x3ctd\x3e\x3c/td\x3e\n        \x3c/tr\x3e\n        \x3ctr\x3e\n          \x3ctd style\x3d"padding-right:0;padding-bottom:0;width:20%;"\x3e\n            \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox" data-dojo-attach-event\x3d"onChange:_handleDistValueChange" data-dojo-props\x3d"intermediateChanges:true,value:\'5\',required:true,missingMessage:\'${i18n.distanceMsg}\'" data-dojo-attach-point\x3d"_breakValuesInput" class\x3d"esriLeadingMargin1"  style\x3d"width:75%;"\x3e\n          \x3c/td\x3e\n          \x3ctd colspan\x3d"2" style\x3d"padding-left:0.25em;padding-bottom:0;width:60%;"\x3e\n            \x3cselect class\x3d"mediumInput esriAnalysisSelect" data-dojo-type\x3d"dijit/form/Select" data-dojo-attach-event\x3d"onChange:_handleDistUnitsChange" data-dojo-attach-point\x3d"_distanceUnitsSelect" style\x3d"width:95%;table-layout:fixed;"\x3e\n            \x3c/select\x3e\n          \x3c/td\x3e\n        \x3c/tr\x3e\n        \x3ctr\x3e\n          \x3ctd style\x3d"padding:0" colspan\x3d"3"\x3e\n            \x3cdiv class\x3d"esriLeadingMargin3"\x3e\n              \x3clabel class\x3d"esriSmallLabel"\x3e${i18n.measureHelp}\x3c/label\x3e\n            \x3c/div\x3e\n          \x3c/td\x3e\n        \x3c/tr\x3e\n        \x3ctr data-dojo-attach-point\x3d"_useTrafficLabelRow"\x3e\n          \x3ctd style\x3d"padding:0" colspan\x3d"3"\x3e\n            \x3cdiv style\x3d"width;100%" data-dojo-type\x3d"esri/dijit/analysis/TrafficTime" data-dojo-attach-point\x3d"_trafficTimeWidget"\x3e\x3c/div\x3e\n          \x3c/td\x3e\n        \x3c/tr\x3e\n        \x3ctr\x3e\n          \x3ctd colspan\x3d"2"\x3e\n            \x3clabel data-dojo-attach-point\x3d"_labelTwo" class\x3d"esriFloatLeading esriTrailingMargin025 "\x3e2.\x3c/label\x3e\n            \x3clabel data-dojo-attach-point\x3d"_arealabel" class\x3d""\x3e${i18n.areaLabel}\x3c/label\x3e\n          \x3c/td\x3e\n          \x3ctd class\x3d"longTextInput"\x3e\n            \x3ca href\x3d"#" class\x3d\'esriFloatTrailing helpIcon\' data-dojo-attach-point\x3d"_analysisFieldHelpLink" esriHelpTopic\x3d"DissolveType"\x3e\x3c/a\x3e\n          \x3c/td\x3e\n        \x3c/tr\x3e\n        \x3ctr\x3e\n          \x3ctd style\x3d"padding-top:0;padding-bottom:0;" colspan\x3d"3"\x3e\n            \x3ctable style\x3d"width:100%;padding:0.25em;"\x3e\n              \x3ctr\x3e\n                \x3ctd style\x3d"padding-top:0;"\x3e\n                  \x3cdiv style\x3d"width:36px" class\x3d"bufferSelector selected" data-dojo-attach-point\x3d"_Overlap"\x3e\n                    \x3cdiv class\x3d"bufferIcon bufferOverlapIcon" style\x3d"margin:5px 10px"\x3e\x3c/div\x3e\n                    \x3cdiv style\x3d"width:100%"\x3e\x3clabel class\x3d"esriLeadingMargin025  esriSelectLabel"\x3e${i18n.overlap}\x3c/label\x3e\x3c/div\x3e\n                  \x3c/div\x3e\n                \x3c/td\x3e\n                \x3ctd style\x3d"padding-top:0;"\x3e\n                  \x3cdiv style\x3d"width:36px" class\x3d"bufferSelector" data-dojo-attach-point\x3d"_Dissolve"\x3e\n                  \x3cdiv class\x3d"bufferIcon bufferDissolveIcon" style\x3d"margin:5px 10px"\x3e\x3c/div\x3e\n                  \x3cdiv style\x3d"width:100%"\x3e\x3clabel class\x3d"esriLeadingMargin025  esriSelectLabel"\x3e${i18n.dissolve}\x3c/label\x3e\x3c/div\x3e\n                  \x3c/div\x3e\n                \x3c/td\x3e\n                \x3ctd style\x3d"padding-top:0;"\x3e\n                 \x3cdiv style\x3d"width:36px" class\x3d"bufferSelector" data-dojo-attach-point\x3d"_Split"\x3e\n                   \x3cdiv class\x3d"bufferIcon esriAnalysisSplitIcon" style\x3d"margin:5px 10px"\x3e\x3c/div\x3e\n                   \x3cdiv style\x3d"width:100%"\x3e\x3clabel class\x3d"esriLeadingMargin1  esriSelectLabel"\x3e${i18n.split}\x3c/label\x3e\x3c/div\x3e\n                 \x3c/div\x3e\n                \x3c/td\x3e        \n              \x3c/tr\x3e\n            \x3c/table\x3e\n          \x3c/td\x3e\n        \x3c/tr\x3e\n\n        \x3ctr\x3e\n          \x3ctd colspan\x3d"2"\x3e\n            \x3clabel data-dojo-attach-point\x3d"_labelThree" class\x3d"esriFloatLeading esriTrailingMargin025 "\x3e${i18n.threeLabel}\x3c/label\x3e\n            \x3clabel data-dojo-attach-point\x3d"_resultlabel" class\x3d""\x3e${i18n.resultLabel}\x3c/label\x3e\n          \x3c/td\x3e\n          \x3ctd class\x3d"longTextInput"\x3e\n            \x3ca href\x3d"#" class\x3d\'esriFloatTrailing helpIcon\' data-dojo-attach-point\x3d"_analysisFieldHelpLink" esriHelpTopic\x3d"OutputLayer"\x3e\x3c/a\x3e\n          \x3c/td\x3e\n        \x3c/tr\x3e\n        \x3ctr\x3e\n          \x3ctd class\x3d"shortTextInput" colspan\x3d"3"\x3e\n            \x3cinput type\x3d"text" data-dojo-type\x3d"dijit/form/ValidationTextBox" class\x3d"esriLeadingMargin1 esriOutputText" data-dojo-props\x3d"required:true" data-dojo-attach-event\x3d"_handleResultLyrInputChange" data-dojo-attach-point\x3d"outputLayerInput"  value\x3d""\x3e\n          \x3c/td\x3e\n        \x3c/tr\x3e\n        \x3ctr\x3e\n          \x3ctd colspan\x3d"3"\x3e\n             \x3cdiv class\x3d"esriLeadingMargin1" data-dojo-attach-point\x3d"_chooseFolderRow"\x3e\n               \x3clabel style\x3d"width:9px;font-size:smaller;"\x3e${i18n.saveResultIn}\x3c/label\x3e\n               \x3cinput class\x3d"longInput" dojoAttachPoint\x3d"_webMapFolderSelect" dojotype\x3d"dijit/form/ComboBox" trim\x3d"true" style\x3d"width:60%;height:auto"\x3e\x3c/input\x3e\n             \x3c/div\x3e              \n          \x3c/td\x3e\n        \x3c/tr\x3e      \n       \x3c/tbody\x3e\n      \x3c/table\x3e\n    \x3c/div\x3e\n    \x3cdiv data-dojo-attach-point\x3d"_aggregateToolContentButtons" style\x3d"padding:5px;margin-top:5px;border-top:solid 1px #BBB;"\x3e\n      \x3cdiv style\x3d"width:100%;padding:0.5em 0 0.5em 0"\x3e\n        \x3ca class\x3d"esriFloatTrailing esriSmallFont"  href\x3d"#" data-dojo-attach-point\x3d"_showCreditsLink" data-dojo-attach-event\x3d"onclick:_handleShowCreditsClick"\x3e${i18n.showCredits}\x3c/a\x3e\n       \x3clabel data-dojo-attach-point\x3d"_chooseExtentDiv"class\x3d"esriSelectLabel" style\x3d"font-size:smaller;"\x3e\n         \x3cinput type\x3d"radio" data-dojo-attach-point\x3d"_useExtentCheck" data-dojo-type\x3d"dijit/form/CheckBox" data-dojo-props\x3d"checked:true" name\x3d"extent" value\x3d"true"/\x3e\n           ${i18n.useMapExtent}\n       \x3c/label\x3e\n      \x3c/div\x3e\n      \x3cbutton data-dojo-type\x3d"dijit/form/Button" type\x3d"submit" data-dojo-attach-point\x3d"_saveBtn" class\x3d"esriLeadingMargin4 esriAnalysisSubmitButton" data-dojo-attach-event\x3d"onClick:_handleSaveBtnClick"\x3e\n          ${i18n.runAnalysis}\n      \x3c/button\x3e\n    \x3c/div\x3e\n    \x3cdiv data-dojo-type\x3d"dijit/Dialog" title\x3d"${i18n.creditTitle}" data-dojo-attach-point\x3d"_usageDialog" style\x3d"width:40em;"\x3e\n      \x3cdiv data-dojo-type\x3d"esri/dijit/analysis/CreditEstimator"  data-dojo-attach-point\x3d"_usageForm"\x3e\x3c/div\x3e\n    \x3c/div\x3e    \n\x3c/div\x3e\n'}});
define("esri/dijit/analysis/CreateDriveTimeAreas","require dojo/_base/declare dojo/_base/lang dojo/_base/array dojo/_base/connect dojo/_base/json dojo/has dojo/i18n dojo/json dojo/string dojo/dom-style dojo/dom-attr dojo/dom-construct dojo/query dojo/dom-class dojo/number dijit/_WidgetBase dijit/_TemplatedMixin dijit/_WidgetsInTemplateMixin dijit/_OnDijitClickMixin dijit/_FocusMixin dijit/registry dijit/form/Button dijit/form/CheckBox dijit/form/Form dijit/form/Select dijit/form/TextBox dijit/form/ValidationTextBox dijit/layout/ContentPane dijit/form/ComboBox esri/kernel esri/dijit/analysis/AnalysisBase esri/dijit/analysis/CreditEstimator esri/dijit/analysis/utils esri/dijit/analysis/TrafficTime dojo/text!esri/dijit/analysis/templates/CreateDriveTimeAreas.html".split(" "),
function(l,r,c,f,e,d,s,q,B,g,m,C,D,E,h,n,t,u,v,w,x,F,G,H,I,J,K,L,M,N,y,z,O,p,P,A){l=r([t,u,v,w,x,z],{declaredClass:"esri.dijit.analysis.CreateDriveTime",templateString:A,basePath:l.toUrl("esri/dijit/analysis"),widgetsInTemplate:!0,inputLayer:null,inputType:null,outputLayerName:null,breakValues:null,showSelectFolder:!1,showChooseExtent:!0,overlapPolicy:"Overlap",showHelp:!0,showCredits:!0,distanceDefaultUnits:"Miles",returnFeatureCollection:!1,i18n:null,toolName:"CreateDriveTimeAreas",helpFileName:"CreateDriveTimeAreas",
resultParameter:"DriveTimeAreasLayer",constructor:function(a,b){this._pbConnects=[];a.containerNode&&(this.container=a.containerNode)},destroy:function(){this.inherited(arguments);f.forEach(this._pbConnects,e.disconnect);delete this._pbConnects},postMixInProperties:function(){this.inherited(arguments);c.mixin(this.i18n,q.getLocalization("esri","jsapi").bufferTool);c.mixin(this.i18n,q.getLocalization("esri","jsapi").driveTimes)},postCreate:function(){this.inherited(arguments);h.add(this._form.domNode,
"esriSimpleForm");this._breakValuesInput.set("validator",c.hitch(this,this.validateDistance));this.outputLayerInput.set("validator",c.hitch(this,this.validateServiceName));this.breakValues=[];this.breakValues.push(this._breakValuesInput.get("value"));this._buildUI()},startup:function(){},_onClose:function(a){a&&(this._save(),this.emit("save",{save:!0}));this.emit("close",{save:a})},_toUpperFirstLetter:function(a){return a.slice(0,1).toUpperCase()+a.slice(1)},_handleShowCreditsClick:function(a){a.preventDefault();
a={};this._form.validate()&&(a.InputLayer=d.toJson(p.constructAnalysisInputLyrObj(this.inputLayer)),a.BreakValues=d.toJson(this.get("breakValues")),a.Breakunits=this.get("breakUnits"),a.OverlapPolicy=this.get("overlapPolicy"),this._trafficTimeWidget.get("checked")&&(a.timeOfDay=this._trafficTimeWidget.get("timeOfDay"),"UTC"===this._trafficTimeWidget.get("timeZoneForTimeOfDay")&&(a.timeZoneForTimeOfDay=this._trafficTimeWidget.get("timeZoneForTimeOfDay"))),this.returnFeatureCollection||(a.OutputName=
d.toJson({serviceProperties:{name:this.outputLayerInput.get("value")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&(a.context=d.toJson({extent:this.map.extent._normalize(!0)})),this.getCreditsEstimate(this.toolName,a).then(c.hitch(this,function(a){this._usageForm.set("content",a);this._usageDialog.show()})))},_handleSaveBtnClick:function(a){a={};var b={},c;this._form.validate()&&(this._saveBtn.set("disabled",!0),a.InputLayer=d.toJson(p.constructAnalysisInputLyrObj(this.inputLayer)),
a.BreakValues=this.get("breakValues"),a.Breakunits=this.get("breakUnits"),a.OverlapPolicy=this.get("overlapPolicy"),this._trafficTimeWidget.get("checked")&&(a.timeOfDay=this._trafficTimeWidget.get("timeOfDay"),"UTC"===this._trafficTimeWidget.get("timeZoneForTimeOfDay")&&(a.timeZoneForTimeOfDay=this._trafficTimeWidget.get("timeZoneForTimeOfDay"))),this.returnFeatureCollection||(a.OutputName=d.toJson({serviceProperties:{name:this.outputLayerInput.get("value")}})),this.showChooseExtent&&this._useExtentCheck.get("checked")&&
(a.context=d.toJson({extent:this.map.extent._normalize(!0)})),this.returnFeatureCollection&&(c={outSR:this.map.spatialReference},this.showChooseExtent&&(c.extent=this.map.extent._normalize(!0)),a.context=d.toJson(c)),b.jobParams=a,b.itemParams={description:g.substitute(this.i18n.itemDescription,{layername:this.inputLayer.name,distance_field:a.Distances||a.Field,units:a.Units}),tags:g.substitute(this.i18n.itemTags,{layername:this.inputLayer.name}),snippet:this.i18n.itemSnippet},this.showSelectFolder&&
(b.itemParams.folder=this._webMapFolderSelect.item?this.folderStore.getValue(this._webMapFolderSelect.item,"id"):""),this.execute(b))},_handleResultLyrInputChange:function(a){this.set("outputLayerName",a)},_handleDistValueChange:function(){this.set("outputLayerName")},_handleDistUnitsChange:function(a){this.set("breakUnits",a);this.set("outputLayerName")},_handleDistanceTypeChange:function(a){h.remove(this._drivingTime,"selected");h.remove(this._drivingDistance,"selected");a&&(h.add("time"===a?this._drivingTime:
this._drivingDistance,"selected"),m.set(this._useTrafficLabelRow,"display","time"===a?"":"none"),this._trafficTimeWidget.set("disabled","time"!==a),this._trafficTimeWidget.set("reset","time"!==a));"time"===a?(this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions()),this._distanceUnitsSelect.addOption([{value:"Seconds",label:this.i18n.seconds},{value:"Minutes",label:this.i18n.minutes,selected:"selected"},{value:"Hours",label:this.i18n.hours}]),this.set("breakUnits",this._distanceUnitsSelect.get("value")),
console.log(this.breakUnits)):(this.get("distanceDefaultUnits")&&this.set("breakUnits",this.get("distanceDefaultUnits")),this._distanceUnitsSelect.removeOption(this._distanceUnitsSelect.getOptions()),this._distanceUnitsSelect.addOption([{value:"Miles",label:this.i18n.miles},{value:"Yards",label:this.i18n.yards},{value:"Feet",label:this.i18n.feet},{type:"separator"},{value:"Kilometers",label:this.i18n.kilometers},{value:"Meters",label:this.i18n.meters}]),this._distanceUnitsSelect.set("value",this.breakUnits));
this.set("outputLayerName")},_handleOverlapPolicyChange:function(a,c){this.set("overlapPolicy",c);dojo.removeClass(this._Overlap,"selected");dojo.removeClass(this._Dissolve,"selected");dojo.removeClass(this._Split,"selected");dojo.addClass(a,"selected")},_save:function(){},_buildUI:function(){p.initHelpLinks(this.domNode,this.showHelp);dojo.attr(this._driveTimeDescription,"innerHTML",dojo.string.substitute(this.i18n.toolDefine,{layername:this.inputLayer.name}));m.set(this._chooseFolderRow,"display",
!0===this.showSelectFolder?"block":"none");this.showSelectFolder&&this.getFolderStore().then(c.hitch(this,function(a){this.folderStore=a;this._webMapFolderSelect.set("store",a);this._webMapFolderSelect.set("value",this.portalUser.username)}));this.distanceDefaultUnits&&this._distanceUnitsSelect.set("value",this.distanceDefaultUnits);m.set(this._chooseExtentDiv,"display",!0===this.showChooseExtent?"block":"none");this._handleDistanceTypeChange("time");this._loadConnections()},validateTime:function(){},
validateDistance:function(){var a=this,b,k=[];h.contains(this._drivingTime,"selected");this.set("breakValues");b=c.trim(this._breakValuesInput.get("value")).split(" ");if(0===b.length)return!1;f.forEach(b,function(b){b=n.parse(b);if(isNaN(b))return k.push(0),!1;b=n.format(b,{locale:"en-us"});(b=c.trim(b).match(/\D/g))&&f.forEach(b,function(b){"."===b||","===b?k.push(1):"-"===b&&"polygon"===a.inputType?k.push(1):k.push(0)})});return-1!==f.indexOf(k,0)?!1:!0},_loadConnections:function(){this.on("start",
c.hitch(this,"_onClose",!0));this._connect(this._closeBtn,"onclick",c.hitch(this,"_onClose",!1));e.connect(this._drivingDistance,"onclick",c.hitch(this,"_handleDistanceTypeChange","distance"));e.connect(this._drivingTime,"onclick",c.hitch(this,"_handleDistanceTypeChange","time"));e.connect(this._Overlap,"onclick",c.hitch(this,"_handleOverlapPolicyChange",this._Overlap,"Overlap"));e.connect(this._Dissolve,"onclick",c.hitch(this,"_handleOverlapPolicyChange",this._Dissolve,"Dissolve"));e.connect(this._Split,
"onclick",c.hitch(this,"_handleOverlapPolicyChange",this._Split,"Split"))},_setAnalysisGpServerAttr:function(a){a&&(this.analysisGpServer=a,this.set("toolServiceUrl",this.analysisGpServer+"/"+this.toolName))},_setInputLayerAttr:function(a){"esriGeometryPoint"===a.geometryType&&(this.inputLayer=a)},_getInputLayerAttr:function(){return this.inputLayer},_setOverlapPolicyAttr:function(a){this.overlapPolicy=a},_getOverlapPolicyAttr:function(){return this.overlapPolicy},_setBreakValuesAttr:function(a){a&&
(this.breakValues=a);a=c.trim(this._breakValuesInput.get("value")).split(" ");var b=[];f.forEach(a,function(a){b.push(n.parse(a))});this.breakValues=b},_getBreakValuesAttr:function(){return this.breakValues},_setDisableRunAnalysisAttr:function(a){this._saveBtn.set("disabled",a)},validateServiceName:function(a){var b=/(:|&|<|>|%|#|\?|\\|\"|\/|\+)/.test(a);return 0===a.length||0===g.trim(a).length?(this.outputLayerInput.set("invalidMessage",this.i18n.requiredValue),!1):b?(this.outputLayerInput.set("invalidMessage",
this.i18n.invalidServiceName),!1):98<a.length?(this.outputLayerInput.set("invalidMessage",this.i18n.invalidServiceNameLength),!1):!0},_setShowSelectFolderAttr:function(a){this.showSelectFolder=a},_getShowSelectFolderAttr:function(){return this.showSelectFolder},_setMapAttr:function(a){this.map=a},_getMapAttr:function(){return this.map},_setBreakUnitsAttr:function(a){this.breakUnits=a},_getBreakUnitsAttr:function(){return this.breakUnits},_setDistanceDefaultUnitsAttr:function(a){this.distanceDefaultUnits=
a},_getDistanceDefaultUnitsAttr:function(){return this.distanceDefaultUnits},_setShowCreditsAttr:function(a){this.showCredits=a},_getShowCreditsAttr:function(){return this.showCredits},_setShowChooseExtentAttr:function(a){this.showChooseExtent=a},_getShowChooseExtentAttr:function(){return this.showChooseExtent},_setReturnFeatureCollectionAttr:function(a){this.returnFeatureCollection=a},_getReturnFeatureCollectionAttr:function(){return this.returnFeatureCollection},_setShowHelpAttr:function(a){this.showHelp=
a},_getShowHelpAttr:function(){return this.showHelp},_setOutputLayerNameAttr:function(a){var b,c,d;c=[this.i18n.seconds,this.i18n.minutes,this.i18n.hours,this.i18n.miles,this.i18n.meters,this.i18n.kilometers,this.i18n.feet,this.i18n.yards];d=this._distanceUnitsSelect.getOptions(this._distanceUnitsSelect.get("value")).label;a?(this.outputLayerName=a,this.outputLayerInput.set("value",a)):this._breakValuesInput&&(this.outputLayerName?(this.outputLayerName=this.outputLayerInput.get("value"),-1!==this.outputLayerName.lastIndexOf("(")&&
(a=this.outputLayerName.substring(0,this.outputLayerName.lastIndexOf("(")),b=g.trim(this.outputLayerName.substring(this.outputLayerName.lastIndexOf(" "),this.outputLayerName.lastIndexOf(")"))),-1!==f.indexOf(c,b)&&(this.outputLayerName=g.substitute(a+"(${breakValues} ${breakUnits})",{breakValues:this._breakValuesInput.get("value"),breakUnits:d})))):this.outputLayerName=dojo.string.substitute(this.i18n.outputLayerName,{layername:this.inputLayer.name,breakValues:this._breakValuesInput.get("value"),
breakUnits:d}),this.outputLayerInput.set("value",this.outputLayerName))},_connect:function(a,b,c){this._pbConnects.push(e.connect(a,b,c))},onSave:function(){},onClose:function(){}});s("extend-esri")&&c.setObject("dijit.analysis.CreateDriveTimeAreas",l,y);return l});