/*
	Copyright (c) 2004-2011, The Dojo Foundation All Rights Reserved.
	Available via Academic Free License >= 2.1 OR the modified BSD license.
	see: http://dojotoolkit.org/license for details
*/

//>>built
define("dojo/dom-prop","exports ./_base/kernel ./sniff ./_base/lang ./dom ./dom-style ./dom-construct ./_base/connect".split(" "),function(f,h,q,r,k,s,l,m){var g={},t=0,n=h._scopeName+"attrid";f.names={"class":"className","for":"htmlFor",tabindex:"tabIndex",readonly:"readOnly",colspan:"colSpan",frameborder:"frameBorder",rowspan:"rowSpan",valuetype:"valueType"};f.get=function(a,d){a=k.byId(a);var c=d.toLowerCase();return a[f.names[c]||d]};f.set=function(a,d,c){a=k.byId(a);if(2==arguments.length&&"string"!=
typeof d){for(var b in d)f.set(a,b,d[b]);return a}b=d.toLowerCase();b=f.names[b]||d;if("style"==b&&"string"!=typeof c)return s.set(a,c),a;if("innerHTML"==b)return q("ie")&&a.tagName.toLowerCase()in{col:1,colgroup:1,table:1,tbody:1,tfoot:1,thead:1,tr:1,title:1}?(l.empty(a),a.appendChild(l.toDom(c,a.ownerDocument))):a[b]=c,a;if(r.isFunction(c)){var e=a[n];e||(e=t++,a[n]=e);g[e]||(g[e]={});var p=g[e][b];if(p)m.disconnect(p);else try{delete a[b]}catch(h){}c?g[e][b]=m.connect(a,b,c):a[b]=null;return a}a[b]=
c;return a}});