class User{
	add(UserName,Password,FullName,Authority){
		var json;
		$.ajax
		({
			url: models_host+"User.php",
			type: "POST",
			data:
			{
				mode:"add",
				user:CurrentUserLoginName,
				pass:CurrentUserLoginPassword,
				UserName:UserName,
				Password:Password,
				FullName:FullName,
				Authority:Authority
			},
			success: function(result) 
			{
				json = result;
			},
			error: function(xhr) {},
			async:false
		});

		return json;
	}
	
	update(UserName,Password,FullName,Authority){
		var json;
		$.ajax
		({
			url: models_host+"User.php",
			type: "POST",
			data:
			{
				mode:"update",
				UserLoginName:CurrentUserLoginName,
				UserLoginPassword:CurrentUserLoginPassword,
				UserName:UserName,
				Password:Password,
				FullName:FullName,
				Authority:Authority
			},
			success: function(result) 
			{
				json = result;
			},
			error: function(xhr) {},
			async:false
		});

		return json;
	}

	del(UserName){
		var json;
		$.ajax
		({
			url: models_host+"User.php",
			type: "POST",
			data:
			{
				mode:"del",
				user:CurrentUserLoginName,
				pass:CurrentUserLoginPassword,
				UserName:UserName
			},
			success: function(result) 
			{
				json = result;
			},
			error: function(xhr) {},
			async:false
		});
		return json;
	}

	select(queryString){
		var json;
		$.ajax
		({
			url: models_host+"User.php",
			type: "POST",
			data:
			{
				mode:"select",
				user:CurrentUserLoginName,
				pass:CurrentUserLoginPassword,
				queryString:queryString
			},
			success: function(result) 
			{
				json = result;
			},
			error: function(xhr) {},
			async:false
		});
		return json;
	}
}