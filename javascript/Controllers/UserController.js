let user = new User();
displayUserOnPanel();
function displayUserOnPanel(){	
	var jsonUsers = user.select();
	clearExsistResultRows("#tUsersResult","#trUsersResult_");

	if(jsonUsers.length > 0){
		$('#tUsersResult tr:last').after("<tr id='trUsersResult_"+jsonUsers.length+"' bgcolor='#336699' style='color:#FFFFFF;'><td align='center' style='width:50px'><span style='font-size:0.9em;'>รหัส</span></td><td align='center'><div style='padding-left:5px;'><span>ชื่อ</span></div></td><td align='center'><div style='padding-left:5px;'><span>ลบ</span></div></td></tr>");
		for(var i=0;i<jsonUsers.length;i++) {
			var rowColor = "#f7f7f7";
			if(i%2 == 0){
				rowColor = "#e3e3e3";
			}
			else{
				rowColor = "#f7f7f7";
			}
			
			$('#tUsersResult tr:last').after("<tr id='trUsersResult_"+i+"' bgcolor="+rowColor+" class='trUsersResult' style='cursor: pointer;'><td align='center' valign='top'><span style='font-size:0.9em;'>"+jsonUsers[i].UserName+"</span></td><td><div style='padding-left:5px;'><span>"+jsonUsers[i].FullName+" ["+jsonUsers[i].Authority+"]</span></div></td><td><input type='button' onclick = onDelUser('"+jsonUsers[i].UserName+"') value='ลบ'></td></tr>");
		}
		onTrMouseOver("tr.trUsersResult");		
	}
	else{
		$('#tUsersResult tr:last').after("<tr  id='trUsersResult_0'  style='color:black;'><td colspan='2' align='center'>-- ไม่พบข้อมูล --</td></tr>");
	}
}

function onSaveUser(){
	var UserName = $("#UserName").val();
	var Password = $("#Password").val();
	var FullName = $("#FullName").val();
	var Authority = $("#Authority").val();
	var message = "";
	if(UserName == ""){
		message+="กรุณาระบุ UserName \n"
	}
	if(Password == ""){
		message+="กรุณาระบุ Password \n"
	}
	if(FullName == ""){
		message+="กรุณาระบุ ยศ-ชื่อ-สกุล \n"
	}
	if(Authority == ""){
		message+="กรุณาระบุประเภทผู้ใช้งาน \n"
	}	
	if(message != ""){
		alert(message);
		return false;
	}
	
	var json = user.add(UserName,Password,FullName,Authority);
	console.log(json);
	alert(json.message);
	displayUserOnPanel();
}

function onClearUser(){
	$("#UserName").val("");
	$("#Password").val("");
	$("#FullName").val("");
	$("#Authority").val("Viewer");
}

function onDelUser(UserName){
	var r = confirm("ยืนยันการลบข้อมูลผู้ใช้งาน!");
	if (r == true) {
	  var json = user.del(UserName);
	  console.log(json);
	}
	displayUserOnPanel();
}