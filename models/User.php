<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

include_once("../web/inc_connection.php");
include_once("PHPFunction.php");

$user = $_POST["user"];
$pass = $_POST["pass"];

if(!canAccess($user,$pass)){
	$status = array("status"=>"0","message"=>"Access-Denied");
	echo json_encode($status);
	return false;
}

$mode = $_POST["mode"];

if($mode == "add"){
	$UserName = $_POST["UserName"];
	$Password = md5($_POST["Password"]);
	$FullName = $_POST["FullName"];
	$Authority = $_POST["Authority"];
	
	add($UserName,$Password,$FullName,$Authority);
}
else if($mode == "update"){
	$UserName = $_POST["UserName"];
	$Password = md5($_POST["Password"]);
	$FullName = $_POST["FullName"];
	$Authority = $_POST["Authority"];
	update($UserName,$Password,$FullName,$Authority);
}
else if($mode == "select"){
	$queryString = $_POST["queryString"];
	select($queryString);
}
else if($mode == "del"){
	$UserName = $_POST["UserName"];
	del($UserName);
}
else{
	$status = array("status"=>"0","message"=>"no selected mode");
	echo json_encode($status);
}

function select($queryString){
	if($queryString != ""){
		$queryString = " WHERE ".$queryString;
	}
	
	$users = array();
	$sql = "SELECT UserName,Password,FullName,Authority FROM users ".$queryString;
	$result = mysql_query($sql)or die(json_encode(array("status"=>"0","message"=>mysql_error(),"sql"=>$sql)));
	while($row = mysql_fetch_array($result)){
		$user = array(
			"UserName"=>$row["UserName"],
			"Password"=>$row["Password"],
			"FullName"=>$row["FullName"],
			"Authority"=>$row["Authority"]
		);
		array_push($users, $user);
	}	
	echo json_encode($users);
}

function add($UserName,$Password,$FullName,$Authority){
	$sql = "INSERT INTO users(UserName,Password,FullName,Authority) 
				VALUE('$UserName','$Password','$FullName','$Authority')";
	mysql_query($sql)or die(json_encode(array("status"=>"0","message"=>mysql_error(),"sql"=>$sql)));

	$status = array("status"=>$UserName,"message"=>"successfully");
	echo json_encode($status);
}

function update($UserName,$Password,$FullName,$Authority){
	$sql = "UPDATE users SET 
				Password = '$Password',
				FullName = '$FullName',
				Authority = '$Authority' 
			WHERE UserName = '$UserName'";
	mysql_query($sql)or die(json_encode(array("status"=>"0","message"=>mysql_error(),"sql"=>$sql)));
	$status = array("status"=>$UserName,"message"=>"successfully");
	echo json_encode($status);
}

function del($UserName){
	$sql = "DELETE FROM users WHERE UserName = '$UserName'";
	mysql_query($sql)or die(json_encode(array("status"=>"0","message"=>mysql_error(),"sql"=>$sql)));
	$status = array("status"=>$UserName,"message"=>"successfully");
	echo json_encode($status);
}

?>