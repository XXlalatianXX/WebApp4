<?php
function canAccess($UserLoginName,$UserLoginPassword){
	
	$isAllow = false;
	$queryString = "UserName = '$UserLoginName' AND Password='$UserLoginPassword'";
	if($queryString != ""){
		$queryString = " WHERE ".$queryString;
	}
	
	$sql = "SELECT UserName FROM users ".$queryString;
	
	$result = mysql_query($sql)or die(json_encode(array("status"=>"0","message"=>mysql_error(),"sql"=>$sql)));
	while($row = mysql_fetch_array($result)){
		$isAllow = true;
	}
	return $isAllow;
}

?>