var models_host = "../models/";

function clearExsistResultRows(tResult,trid){
	var maxID = $(tResult+' tr').length;
	for(i=0;i<maxID;i++){
		$(trid+""+i).remove();
	}
}

function onTrMouseOver(trClass){
	$(trClass).mouseover(function() 
	{
		$(this).css('background-color', '#fc6262');
	}).mouseout(function() 
	{
		trid = $(this).attr('id');
		var item = trid.split("_");

		if(parseInt(item[1])%2 == 0)
			rowColor = "#e3e3e3";
		else
			rowColor = "#f7f7f7";
		$(this).css('background-color', rowColor);
	});	
}

function getJson(url,username,password){
	var response;
	$.ajax
	({
		url: url,
		type: "POST",
		data : 
		{
			user:username,
			pass:password,
		},
		success: function(result) 
		{
			response = result;
		},
	    error: function(xhr) {},
		async:false
	});
	response = response.replace(/\s+/g," ");
	var json = JSON.parse(response);
	return json;
}

function setJsonToDropdownList(selObj,json,key,val,defaultKey,defaultVal){
	$(selObj).empty();
	$(selObj).append( $('<option></option>').val(defaultKey).html(defaultVal));
	for(var i = 0;i < json.length;i++)
	{
		$(selObj).append( $('<option></option>').val(json[i][key]).html(json[i][val]));
	}
}

function onDatePicker(dateId){
	var dateBefore=null;  
	$(dateId).datepicker({  
		dateFormat: 'dd/mm/yy',  
		dayNamesMin: ['อา', 'จ', 'อ', 'พ', 'พฤ', 'ศ', 'ส'],   
		monthNamesShort: ['มกราคม','กุมภาพันธ์','มีนาคม','เมษายน','พฤษภาคม','มิถุนายน','กรกฎาคม','สิงหาคม','กันยายน','ตุลาคม','พฤศจิกายน','ธันวาคม'],  
		changeMonth: true,  
		changeYear: true,  
		beforeShow:function()
		{    
			if($(this).val()!="")
			{  
				var arrayDate=$(this).val().split("/");       
				arrayDate[2]=parseInt(arrayDate[2])-543;  
				$(this).val(arrayDate[0]+"/"+arrayDate[1]+"/"+arrayDate[2]);  
			}  
		
			setTimeout(function()
			{  
				$.each($(".ui-datepicker-year option"),function(j,k)
				{  
					var textYear=parseInt($(".ui-datepicker-year option").eq(j).val())+543;  
					$(".ui-datepicker-year option").eq(j).text(textYear);  
				});               
			},50);  
		},  
				
		onChangeMonthYear: function()
		{  
			setTimeout(function()
			{  
				$.each($(".ui-datepicker-year option"),function(j,k)
				{  
					var textYear=parseInt($(".ui-datepicker-year option").eq(j).val())+543;  
					$(".ui-datepicker-year option").eq(j).text(textYear);  
				});               
			},50);        
		},  
				
		onClose:function()
		{  
			if($(this).val()!="" && $(this).val()==dateBefore)
			{           
				var arrayDate=dateBefore.split("/");  
				arrayDate[2]=parseInt(arrayDate[2])+543;  
				$(this).val(arrayDate[0]+"/"+arrayDate[1]+"/"+arrayDate[2]);      
			}         
		},  
		
		onSelect: function(dateText, inst)
		{   
			dateBefore=$(this).val();  
			var arrayDate=dateText.split("/");  
			arrayDate[2]=parseInt(arrayDate[2])+543;  
			$(this).val(arrayDate[0]+"/"+arrayDate[1]+"/"+arrayDate[2]);  
		}
	}); 	
}

function showDialog(title,html) {
	$( "#dialog" ).html(html);
	$( "#dialog" ).dialog( "open" );
}


function getMySQLDate(date)
{
	var mDate = date.split('/');
	var day = mDate[0];
	var month = mDate[1];
	var year = mDate[2];
	
	if(parseInt(year) > 2500)
	{
		year = parseInt(year) - 543;
	}
	var mSQLDate = year+"-"+month+"-"+day;
	
	return mSQLDate;
}

function displayThaiDateFormat(date)
{
	var d = date.split(' ');
	var mDate = d[0].split('-');
	var mThaiDate = "-";
	if(mDate.length == 3)
	{
		var day = mDate[2];
		var month = mDate[1];
		var year = mDate[0];
		
		if(parseInt(year) < 2500)
		{
			year = parseInt(year) + 543;
		}
		if(year > 2500)
		{
			mThaiDate = day+"/"+month+"/"+year;
		}
		else
		{
			mThaiDate = "-";
		}
	}

	return mThaiDate;
}
