var PriorityEvent=!1;class Customer{constructor(e,t,n,s,o){this.id=e,this.lat=t,this.lon=n,this.personDemand=s,this.stretchDemand=o}}class Depot{constructor(e,t,n){this.id=e,this.lon=t,this.lat=n}}class Vehicle{constructor(e,t,n){this.id=e,this.stretchCapacity=t,this.personCapacity=n,this.route=[]}}function calculateDistance(e,t){var n=deg2rad(t.lat-e.lat),s=deg2rad(t.lon-e.lon),o=Math.sin(n/2)*Math.sin(n/2)+Math.cos(deg2rad(e.lat))*Math.cos(deg2rad(t.lat))*Math.sin(s/2)*Math.sin(s/2);return 6371*(2*Math.atan2(Math.sqrt(o),Math.sqrt(1-o)))}function deg2rad(e){return e*(Math.PI/180)}function findNearestCustomer(e,t){let n=null,s=1/0;for(const o of t){const t=calculateDistance(e,o);t<s&&(n=o,s=t)}return{nearestCustomer:n,distance:s}}function findNearestDepot(e,t){let n=null,s=1/0;for(const o of t){const t=calculateDistance(e,o);t<s&&(n=o,s=t)}return{nearestDepot:n,distance:s}}function solveMDVRP(e,t){const n=t[0],s=t[1],o=t[2];var r=0,a=0,c=0,i=0,d=0,l=0,m=0,u=0,D=0;const f=[],p=[],h=[],g=[...e],x=[];for(;g.length>0;){var O=new Vehicle(f.length+1,r,a),y=new Vehicle(p.length+1,c,i),b=new Vehicle(h.length+1,d,l),v=0,w=0,R=0,P=0,C=0,M=0,T=n,L=s,j=o;let A=!0,k=!0,E=!0;do{if(PriorityEvent){var I=g[0];const{nearestDepot:e,distance:n}=findNearestDepot(I,t);x.push(e.id),g.splice(g[0],1);for(let e of x)1==e?(A=!1,console.log("Use Depot 1")):2==e?(k=!1,console.log("Use Depot 2")):3==e&&(E=!1,console.log("Use Depot 3"));PriorityEvent=!1,console.log("Priority Case Successfully !!")}const{nearestCustomer:n,distance:s}=findNearestCustomer(T,g),{nearestCustomer:o,distance:f}=findNearestCustomer(L,g),{nearestCustomer:p,distance:h}=findNearestCustomer(j,g),S=[s,f,h],_=[s,h],B=[s,f],G=[f,h];if(null!=n&&null!=o&&null!=p)if(n.id==o.id&&o.id==p.id){let e=null,t=1/0;for(const n of S)n<t&&(t=n,e=S.indexOf(n));0!=e||A?1!=e||k?2!=e||E||(A=!1,k=!1):(A=!1,E=!1):(k=!1,E=!1)}else if(n.id==p.id&&o.id!=p.id){let e=null,t=1/0;for(const n of _)n<t&&(t=n,e=_.indexOf(n));0!=e||A?1!=e||E||(A=!1):E=!1}else if(n.id==o.id&&o.id!=p){let e=null,t=1/0;for(const n of B)n<t&&(t=n,e=B.indexOf(n));0!=e||A?1!=e||k||(A=!1):k=!1}else if(o.id==p.id&&n.id!=o){let e=null,t=1/0;for(const n of G)n<t&&(t=n,e=G.indexOf(n));0!=e||k?1!=e||E||(k=!1):E=!1}if(null===n&&null===o&&null===p){console.log(" break when all don't have nearest Customer ...");break}if(!(A||k||E)){console.log(" all checkbox false before capacity set ...");break}if(!A&!E)if(R+o.stretchDemand==0&&P+o.personDemand<=28)c=0,i=28;else if(R+o.stretchDemand>=1&&R+o.stretchDemand<=2&&P+o.personDemand<=22)c=2,i=22;else if(R+o.stretchDemand>=3&&R+o.stretchDemand<=5&&P+o.personDemand<=16)c=5,i=16;else if(R+o.stretchDemand>=6&&R+o.stretchDemand<=8&&P+o.personDemand<=10)c=8,i=10;else if(R+o.stretchDemand>=9&&R+o.stretchDemand<=11&&P+o.personDemand<=4)c=11,i=4;else{const n=y.route.map((e=>e.id));for(const s of n)if(n.indexOf(s)==n.length-1)for(const n of e){if(s==n.id){u+=calculateDistance(n,t[1])}}k=!1}else if(A||k)if(k||E){if(v+n.stretchDemand==0&&w+n.personDemand<=28)r=0,a=28;else if(v+n.stretchDemand>=1&&v+n.stretchDemand<=2&&w+n.personDemand<=22)r=2,a=22;else if(v+n.stretchDemand>=3&&v+n.stretchDemand<=5&&w+n.personDemand<=16)r=5,a=16;else if(v+n.stretchDemand>=6&&v+n.stretchDemand<=8&&w+n.personDemand<=10)r=8,a=10;else if(v+n.stretchDemand>=9&&v+n.stretchDemand<=11&&w+n.personDemand<=4)r=11,a=4;else{const n=O.route.map((e=>e.id));for(const s of n)if(n.indexOf(s)==n.length-1)for(const n of e){if(s==n.id){m+=calculateDistance(n,t[0])}}A=!1}if(R+o.stretchDemand==0&&P+o.personDemand<=28)c=0,i=28;else if(R+o.stretchDemand>=1&&R+o.stretchDemand<=2&&P+o.personDemand<=22)c=2,i=22;else if(R+o.stretchDemand>=3&&R+o.stretchDemand<=5&&P+o.personDemand<=16)c=5,i=16;else if(R+o.stretchDemand>=6&&R+o.stretchDemand<=8&&P+o.personDemand<=10)c=8,i=10;else if(R+o.stretchDemand>=9&&R+o.stretchDemand<=11&&P+o.personDemand<=4)c=11,i=4;else{const n=y.route.map((e=>e.id));for(const s of n)if(n.indexOf(s)==n.length-1)for(const n of e){if(s==n.id){u+=calculateDistance(n,t[1])}}k=!1}if(C+p.stretchDemand==0&&M+p.personDemand<=28)d=0,l=28;else if(C+p.stretchDemand>=1&&C+p.stretchDemand<=2&&M+p.personDemand<=22)d=2,l=22;else if(C+p.stretchDemand>=3&&C+p.stretchDemand<=5&&M+p.personDemand<=16)d=5,l=16;else if(C+p.stretchDemand>=6&&C+p.stretchDemand<=8&&M+p.personDemand<=10)d=8,l=10;else if(C+p.stretchDemand>=9&&C+p.stretchDemand<=11&&M+p.personDemand<=4)d=11,l=4;else{const n=b.route.map((e=>e.id));for(const s of n)if(n.indexOf(s)==n.length-1)for(const n of e){if(s==n.id){D+=calculateDistance(n,t[2])}}E=!1}}else if(v+n.stretchDemand==0&&w+n.personDemand<=28)r=0,a=28;else if(v+n.stretchDemand>=1&&v+n.stretchDemand<=2&&w+n.personDemand<=22)r=2,a=22;else if(v+n.stretchDemand>=3&&v+n.stretchDemand<=5&&w+n.personDemand<=16)r=5,a=16;else if(v+n.stretchDemand>=6&&v+n.stretchDemand<=8&&w+n.personDemand<=10)r=8,a=10;else if(v+n.stretchDemand>=9&&v+n.stretchDemand<=11&&w+n.personDemand<=4)r=11,a=4;else{const n=O.route.map((e=>e.id));for(const s of n)if(n.indexOf(s)==n.length-1)for(const n of e){if(s==n.id){m+=calculateDistance(n,t[0])}}A=!1}else if(C+p.stretchDemand==0&&M+p.personDemand<=28)d=0,l=28;else if(C+p.stretchDemand>=1&&C+p.stretchDemand<=2&&M+p.personDemand<=22)d=2,l=22;else if(C+p.stretchDemand>=3&&C+p.stretchDemand<=5&&M+p.personDemand<=16)d=5,l=16;else if(C+p.stretchDemand>=6&&C+p.stretchDemand<=8&&M+p.personDemand<=10)d=8,l=10;else if(C+p.stretchDemand>=9&&C+p.stretchDemand<=11&&M+p.personDemand<=4)d=11,l=4;else{const n=b.route.map((e=>e.id));for(const s of n)if(n.indexOf(s)==n.length-1)for(const n of e){if(s==n.id){D+=calculateDistance(n,t[2])}}E=!1}if(A&&k&&E){if(v+n.stretchDemand>r&&w+n.personDemand>a&&R+o.stretchDemand>c&&P+o.personDemand>i&&C+p.stretchDemand>d&&M+p.personDemand>l)break;v+n.stretchDemand<=r&&w+n.personDemand<=a&&R+o.stretchDemand<=c&&P+o.personDemand<=i&&C+p.stretchDemand<=d&&M+p.personDemand<=l?m+s<u+f&&m+s<D+h?(O.route.push(n),T=n,v+=n.stretchDemand,w+=n.personDemand,g.splice(g.indexOf(n),1),m+=s):u+f<m+s&&u+f<D+h?(y.route.push(o),L=o,R+=o.stretchDemand,P+=o.personDemand,g.splice(g.indexOf(o),1),u+=f):D+h<m+s&&D+h<u+f&&(b.route.push(p),j=p,C+=p.stretchDemand,M+=p.personDemand,g.splice(g.indexOf(p),1),D+=h):C+p.stretchDemand<=d||M+p.personDemand<=l?R+o.stretchDemand<=c||P+o.personDemand<=i?v+n.stretchDemand<=r||w+n.personDemand<=a?!(v+n.stretchDemand<=r&&w+n.personDemand<=a)||R+o.stretchDemand<=c||P+o.personDemand<=i||C+p.stretchDemand<=d||M+p.personDemand<=l?!(R+o.stretchDemand<=c&&P+o.personDemand<=i)||v+n.stretchDemand<=r||w+n.personDemand<=a||C+p.stretchDemand<=d||M+p.personDemand<=l?!(C+p.stretchDemand<=d&&M+p.personDemand<=l)||R+o.stretchDemand<=c||P+o.personDemand<=i||v+n.stretchDemand<=r||w+n.personDemand<=a||(b.route.push(p),j=p,C+=p.stretchDemand,M+=p.personDemand,g.splice(g.indexOf(p),1),D+=h):(y.route.push(o),L=o,R+=o.stretchDemand,P+=o.personDemand,g.splice(g.indexOf(o),1),u+=f):(O.route.push(n),T=n,v+=n.stretchDemand,w+=n.personDemand,g.splice(g.indexOf(n),1),m+=s):u+f<D+h?(y.route.push(o),L=o,R+=o.stretchDemand,P+=o.personDemand,g.splice(g.indexOf(o),1),u+=f):(b.route.push(p),j=p,C+=p.stretchDemand,M+=p.personDemand,g.splice(g.indexOf(p),1),D+=h):m+s<D+h?(O.route.push(n),T=n,v+=n.stretchDemand,w+=n.personDemand,g.splice(g.indexOf(n),1),m+=s):(b.route.push(p),j=p,C+=p.stretchDemand,M+=p.personDemand,g.splice(g.indexOf(p),1),D+=h):m+s<u+f?(O.route.push(n),T=n,v+=n.stretchDemand,w+=n.personDemand,g.splice(g.indexOf(n),1),m+=s):(y.route.push(o),L=o,R+=o.stretchDemand,P+=o.personDemand,g.splice(g.indexOf(o),1),u+=f)}else if(!A&&k&&E){if(R+o.stretchDemand>c&&P+o.personDemand>i&&C+p.stretchDemand>d&&M+p.personDemand>l)break;R+o.stretchDemand<=c&&P+o.personDemand<=i&&C+p.stretchDemand<=d&&M+p.personDemand<=l?u+f<D+h?(y.route.push(o),L=o,R+=o.stretchDemand,P+=o.personDemand,g.splice(g.indexOf(o),1),u+=f):D+h<u+f&&(b.route.push(p),j=p,C+=p.stretchDemand,M+=p.personDemand,g.splice(g.indexOf(p),1),D+=h):currentCapacity2+o.demand>vehicleCapacity2?(b.route.push(p),j=p,C+=p.stretchDemand,M+=p.personDemand,g.splice(g.indexOf(p),1),D+=h):currentCapacity3+p.demand>vehicleCapacity3&&(y.route.push(o),L=o,R+=o.stretchDemand,P+=o.personDemand,g.splice(g.indexOf(o),1),u+=f)}else if(A&&!k&&E){if(v+n.stretchDemand>r&&w+n.personDemand>a&&C+p.stretchDemand>d&&M+p.personDemand>l)break;v+n.stretchDemand<=r&&w+n.personDemand<=a&&C+p.stretchDemand<=d&&M+p.personDemand<=l?m+s<D+h?(O.route.push(n),T=n,v+=n.stretchDemand,w+=n.personDemand,g.splice(g.indexOf(n),1),m+=s):D+h<m+s&&(b.route.push(p),j=p,C+=p.stretchDemand,M+=p.personDemand,g.splice(g.indexOf(p),1),D+=h):currentCapacity1+n.demand>vehicleCapacity1?(b.route.push(p),j=p,C+=p.stretchDemand,M+=p.personDemand,g.splice(g.indexOf(p),1),D+=h):currentCapacity3+p.demand>vehicleCapacity3&&(O.route.push(n),T=n,v+=n.stretchDemand,w+=n.personDemand,g.splice(g.indexOf(n),1),m+=s)}else if(A&&k&&!E){if(v+n.stretchDemand>r&&w+n.personDemand>a&&R+o.stretchDemand>c&&P+o.personDemand>i)break;v+n.stretchDemand<=r&&w+n.personDemand<=a&&R+o.stretchDemand<=c&&P+o.personDemand<=i?m+s<u+f?(O.route.push(n),T=n,v+=n.stretchDemand,w+=n.personDemand,g.splice(g.indexOf(n),1),m+=s):u+f<m+s&&(y.route.push(o),L=o,R+=o.stretchDemand,P+=o.personDemand,g.splice(g.indexOf(o),1),u+=f):currentCapacity1+n.demand>vehicleCapacity1?(y.route.push(o),L=o,R+=o.stretchDemand,P+=o.personDemand,g.splice(g.indexOf(o),1),u+=f):currentCapacity2+o.demand>vehicleCapacity2&&(O.route.push(n),T=n,v+=n.stretchDemand,w+=n.personDemand,g.splice(g.indexOf(n),1),m+=s)}else if(!A||k||E)if(A||!k||E){if(!A&&!k&&E){if(C+p.stretchDemand>d&&M+p.personDemand>l)break;C+p.stretchDemand<=d&&M+p.personDemand<=l?(b.route.push(p),j=p,C+=p.stretchDemand,M+=p.personDemand,g.splice(g.indexOf(p),1),D+=h):E=!1}}else{if(R+o.stretchDemand>c&&P+o.personDemand>i)break;R+o.stretchDemand<=c&&P+o.personDemand<=i?(y.route.push(o),L=o,R+=o.stretchDemand,P+=o.personDemand,g.splice(g.indexOf(o),1),u+=f):k=!1}else{if(v+n.stretchDemand>r&&w+n.personDemand>a)break;v+n.stretchDemand<=r&&w+n.personDemand<=a?(O.route.push(n),T=n,v+=n.stretchDemand,w+=n.personDemand,g.splice(g.indexOf(n),1),m+=s):A=!1}if(!A&&!k&&!E)break}while(A||k||E);f.push(O),p.push(y),h.push(b)}return{vehicles1:f,vehicles2:p,vehicles3:h,priorityDep:x}}const depots=[new Depot(1,102.08166,14.933738),new Depot(2,104.861988,15.24908),new Depot(3,102.795457,17.379619)];let customers=[];function clikRun(){let e=[];do{e=UnlimitedInput();let t=!0;for(const n of e){const s=""==n.lat&&""==n.lon&&0==n.stretchDemand&&0==n.personDemand,o=""!=n.lat&&""!=n.lon&&0==n.stretchDemand&&0==n.personDemand;if(s||o){fireSweetAlert(n.id),t=!1,e=[];break}if(!(0==n.stretchDemand&&n.personDemand<=28)&&!(n.stretchDemand>=1&&n.stretchDemand<=2&&n.personDemand<=22&&n.personDemand>=0||n.stretchDemand>=3&&n.stretchDemand<=5&&n.personDemand<=16&&n.personDemand>=0||n.stretchDemand>=6&&n.stretchDemand<=8&&n.personDemand<=10&&n.personDemand>=0||n.stretchDemand>=9&&n.stretchDemand<=11&&n.personDemand<=4&&n.personDemand>=0)){console.log("CustIn Wrong : ",n),fireSweetAlert2(n.id),t=!1,e=[];break}}if(t)break}while(!inputIsValid);customers=e,console.log("Customer Dictionary : ",customers);const{vehicles1:t,vehicles2:n,vehicles3:s,priorityDep:o}=solveMDVRP(customers,depots);console.log(" !!!!!!!! Complete using MDVRP Function !!!!!!!!!");const r=t.map((e=>e.route.map((e=>e.id)))),a=n.map((e=>e.route.map((e=>e.id)))),c=s.map((e=>e.route.map((e=>e.id))));console.log("------------------- Generate Routes ------------------"),console.log("Route from depot 1",r),console.log("Route from depot 2",a),console.log("Route from depot 3",c),console.log("Priority Depot : ",o);var{totalArray:i,totalDistance:d}=TotalDIstanceAllRoute(depots[0],r),{totalArray:l,totalDistance:m}=TotalDIstanceAllRoute(depots[1],a),{totalArray:u,totalDistance:D}=TotalDIstanceAllRoute(depots[2],c);if(""==o){console.log("Priority do not use...");var f=d+m+D;console.log("Total Distance of All route : ",f,"KM.");var p=getRoundDepot(r),h=getRoundDepot(a),g=getRoundDepot(c)}else{console.log(" ============= Priority Case was used ... ==============");const e=2*calculateDistance(depots[o[0]-1],customers[0]),t=[e];if(console.log("Total Distance Priority : ",e,"KM."),console.log("Total Distance Array Priority : ",t),1==o[0])p=getRoundDepot(r)+1,h=getRoundDepot(a),g=getRoundDepot(c),f=(d+=e)+m+D;else if(2==o[0])p=getRoundDepot(r),h=getRoundDepot(a)+1,g=getRoundDepot(c),f=d+(m+=e)+D;else if(3==o[0])p=getRoundDepot(r),h=getRoundDepot(a),g=getRoundDepot(c)+1,f=d+m+(D+=e);console.log("Total Distance of All route : ",f,"KM.");getRoundDepot(o);var x=generateRoutesPri(o),O=generateTimeMin(t),y=[customers[0].stretchDemand],b=getDictResult(x,O,[customers[0].personDemand],y,t);const n=3,s=[[[depots[o[0]-1].lon,depots[o[0]-1].lat],[customers[0].lon,customers[0].lat]]];drawGraphicPolyLine(newLayer,s,"rgba(255,0,0,0.8)",n)}const v=generateRoutes(r,"W1"),w=generateRoutes(a,"W21"),R=generateRoutes(c,"W23"),P=generateTimeMin(i),C=generateTimeMin(l),M=generateTimeMin(u),T=generateTotalStretch(r),L=generateTotalStretch(a),j=generateTotalStretch(c),I=generateTotalPerson(r),A=generateTotalPerson(a),k=generateTotalPerson(c),E=getDictResult(v,P,I,T,i);console.log("Result 1 : ",E);const S=getDictResult(w,C,A,L,l);console.log("Result 2 : ",S);const _=getDictResult(R,M,k,j,u);console.log("Result 3 : ",_),drawAllPoint(),drawAllNamePoint(),drawRouteLine(depots[0],r),drawRouteLine(depots[1],a),drawRouteLine(depots[2],c);var B=document.getElementById("results"),G=document.getElementById("Alldistance-result"),F=document.getElementById("distance1-result"),H=document.getElementById("distance2-result"),W=document.getElementById("distance3-result"),N=document.getElementById("Depot1-round"),V=document.getElementById("Depot2-round"),K=document.getElementById("Depot3-round"),U=document.getElementById("routes-w"),q=document.getElementById("routes-priority");B.style.display="block",G.innerHTML=f.toFixed(2),F.innerHTML=d.toFixed(2),H.innerHTML=m.toFixed(2),W.innerHTML=D.toFixed(2),N.innerHTML=p,V.innerHTML=h,K.innerHTML=g;var z=1;if(null!=b)for(let e of b){var J=document.createElement("li");let t="Routes : "+Object.values(e)[0],n="Person : "+Object.values(e)[1],s="Stretch : "+Object.values(e)[2],o="Time : "+Object.values(e)[3],r="Distance : "+Object.values(e)[4].toFixed(2);J.innerHTML+=t+"<br>"+n+"     "+s+"<br>"+o+" Minutes<br>"+r+" KM.",J.id=1,q.appendChild(J)}if(null!=E)for(let e of E){J=document.createElement("li");let t="Routes : "+Object.values(e)[0],n="Person : "+Object.values(e)[1],s="Stretch : "+Object.values(e)[2],o="Time : "+Object.values(e)[3],r="Distance : "+Object.values(e)[4].toFixed(2);J.innerHTML+=t+"<br>"+n+"     "+s+"<br>"+o+" Minutes<br>"+r+" KM.",J.id=z,z+=1,U.appendChild(J)}if(null!=S)for(let e of S){J=document.createElement("li");let t="Routes : "+Object.values(e)[0],n="Person : "+Object.values(e)[1],s="Stretch : "+Object.values(e)[2],o="Time : "+Object.values(e)[3],r="Distance : "+Object.values(e)[4].toFixed(2);J.innerHTML+=t+"<br>"+n+"     "+s+"<br>"+o+" Minutes<br>"+r+" KM.",J.id=z,z+=1,U.appendChild(J)}if(null!=_)for(let e of _){J=document.createElement("li");let t="Routes : "+Object.values(e)[0],n="Person : "+Object.values(e)[1],s="Stretch : "+Object.values(e)[2],o="Time : "+Object.values(e)[3],r="Distance : "+Object.values(e)[4].toFixed(2);J.innerHTML+=t+"<br>"+n+"     "+s+"<br>"+o+" Minutes<br>"+r+" KM.",J.id=z,z+=1,U.appendChild(J)}$("#mainSearch").hide()}function UnlimitedInput(){CustInputs=[];let e=0;column=["lat_list","lon_list","num_person","num_stretchers"];const t={lat_list:0,lon_list:0,num_person:0,num_stretchers:0},n=[];for(let e=0;e<document.getElementsByClassName("lon_list").length;e++){const e={...t};n.push(e)}for(let t=0;t<column.length;t++){const s=document.getElementsByClassName(column[t]);for(let o=0;o<s.length;o++){const r=s[o].value;if(""==r){e=1;break}n[o][column[t]]=parseFloat(r)}if(1==e)break}for(let e=0;e<n.length;e++)CustInputs.push(new Customer(e+1,n[e].lat_list,n[e].lon_list,n[e].num_person,n[e].num_stretchers));return CustInputs}function drawAllNamePoint(){drawGraphicText("Wing 1",newLayer,[depots[0].lon,depots[0].lat],[0,0,255],0),drawGraphicText("Wing 21",newLayer,[depots[1].lon,depots[1].lat],[0,0,255],0),drawGraphicText("Wing 23",newLayer,[depots[2].lon,depots[2].lat],[0,0,255],0);for(const e of customers){let t="P "+e.id;drawGraphicText(t,newLayer,[e.lon,e.lat],[0,0,255],0)}}function drawAllPoint(){for(const e of customers)drawGraphicPoint(newLayer,[e.lon,e.lat]);for(const e of depots)drawGraphicPointWarehouse(newLayer,[e.lon,e.lat])}function drawRouteLine(e,t){currentPoint=null;for(const n of t)if(0!==n.length)for(const t of n)if(n.indexOf(t)===n.indexOf(n[0]))for(const n of customers){const s=n.id;if(s==t){let t=[[[e.lon,e.lat],[n.lon,n.lat]]];drawGraphicPolyLine(newLayer,t,"rgba(255,0,0,0.8)",3),currentPoint=s}}else if(n.indexOf(t)===n.length-1)for(const n of customers){if(t==n.id){let s=[[[e.lon,e.lat],[n.lon,n.lat]]];drawGraphicPolyLine(newLayer,s,"rgba(255,0,0,0.8)",3);for(const e of customers){if(e.id===currentPoint){let s=[[[n.lon,n.lat],[e.lon,e.lat]]];drawGraphicPolyLine(newLayer,s,"rgba(255,0,0,0.8)",3),currentPoint=t}}}}else for(const e of customers){if(e.id===t)for(const n of customers){if(n.id===currentPoint){let s=[[[e.lon,e.lat],[n.lon,n.lat]]];drawGraphicPolyLine(newLayer,s,"rgba(255,0,0,0.8)",3),currentPoint=t}}}}function TotalDIstanceAllRoute(e,t){let n=[],s=0;currentPoint=null;for(const s of t){let t=0;if(0!==s.length){if(1===s.length){for(const n of s)if(s.indexOf(n)===s.indexOf(s[0]))for(const s of customers){if(s.id==n){t+=2*calculateDistance(e,s)}}}else for(const n of s)if(s.indexOf(n)===s.indexOf(s[0]))for(const s of customers){const o=s.id;if(o==n){t+=calculateDistance(e,s),currentPoint=o}}else if(s.indexOf(n)===s.length-1)for(const s of customers){if(n==s.id){t+=calculateDistance(s,e);for(const e of customers){if(e.id===currentPoint){t+=calculateDistance(s,e)}}}}else for(const e of customers){if(e.id===n)for(const s of customers){if(s.id===currentPoint){t+=calculateDistance(s,e),currentPoint=n}}}n.push(t)}}for(const e of n)s+=e;return{totalArray:n,totalDistance:s}}function getRoundDepot(e){let t=0;for(const n of e)""!=n&&(t+=1);return t}function generateRoutes(e,t){let n=[];for(const s of e){const e=[];if(!(s.length>0))continue;e.push(t);for(const t of s)e.push(t);e.push(t);const o=e.join(" -> ");n.push(o)}return n}function generateRoutesPri(e){let t=[],n=null;1==e[0]?n="W1":2==e[0]?n="W21":3==e[0]&&(n="W23");for(const s in e){let e=[];if(!(s.length>0))continue;e.push(n),e.push("1"),e.push(n);const o=e.join(" -> ");t.push(o)}return t}function generateTimeMin(e){let t=[];for(const n of e){let e=60*n/224.24;t.push(e.toFixed(2))}return t}function generateTotalStretch(e){let t=[];for(const n of e){let e=0;if(""!=n){for(const t of n)for(const n of customers){n.id==t&&(e+=n.stretchDemand)}t.push(e)}}return t}function generateTotalPerson(e){let t=[];for(const n of e){let e=0;if(""!=n){for(const t of n)for(const n of customers){n.id==t&&(e+=n.personDemand)}t.push(e)}}return t}function getDictResult(e,t,n,s,o){let r=[];for(let a=0;a<e.length;a++){let c={route:e[a],person:n[a],stretch:s[a],time:t[a],distance:o[a]};r.push(c)}return r}function fireSweetAlert(e){Swal.fire({icon:"error",title:`กรุณากรอกข้อมูล id : ${e}`})}function fireSweetAlert2(e){Swal.fire({icon:"error",title:`ข้อมูล ${e} ผิดพลาด`,text:"กรุณากรอกข้อมูลใหม่"}).then((e=>{e.isConfirmed&&Swal.fire("กรุณากรอกข้อมูลให้ตรงตามเงื่อนไขนี้","ถ้า  เปล == 0   --\x3e   คน <= 28 <br> ถ้า  1 <= เปล <= 2   --\x3e   คน <= 22 <br> ถ้า   3 <= เปล <= 5   --\x3e   คน <= 16 <br> ถ้า   6 <= เปล <= 8   --\x3e  คน <= 10 <br> ถ้า   9 <= เปล <= 11  --\x3e  คน <= 4","info")}))}