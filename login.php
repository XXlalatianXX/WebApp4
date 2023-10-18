<?php
session_start();
include_once('web/inc_connection.php');
//Configuration Site
$_SESSION['Title'] = "CS-GIS";
$_SESSION['Fullname_Site'] = "RTAF VRP";

if(isset($_POST['submit']))
{
	session_start();
	$name     = mysql_real_escape_string($_POST["login"]);
	$password = mysql_real_escape_string($_POST["password"]);
	$password = md5($password);
	$sql    = "SELECT UserName,Password,FullName,Authority FROM users WHERE username ='$name' AND password ='$password'";
	$result = mysql_query($sql);
	$count  = mysql_num_rows($result);
	if($count>0)
	{
	    while($row=mysql_fetch_array($result))
		{        
			$_SESSION['UserName']  = $row["UserName"];
			$_SESSION['Key']  = $row["Password"];
			$_SESSION['Info']  = $row["FullName"];
			$_SESSION['Level']  = $row["Authority"];					
			$user_info = $_SESSION['Info'];
			$sqluserlog = "INSERT INTO userlog (UserID)VALUES ('".$user_info."')";
			mysql_query($sqluserlog);			
		}
		header("Location: web/Gis.php");  
	}
	else
	{
?>
		<script>
				alert('ชื่อผู้ใช้ หรือ รหัสผ่านไม่ถูกต้อง หรือ ไม่มีสิทธิ์เข้าใช้ระบบ!');
		</script>
<?		
	}
}
?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<link rel="stylesheet" href="web/css/styles.css">
<title>Login</title>
<style type="text/css">

html{
    height: 100%;
	width:100%;	
}
body {
	font: 100%/1.4 Verdana, Arial, Helvetica, sans-serif;
	

	margin: 0;
	padding:0;
	color: #000;
	text-align:center;
	
/* IE10+ */ 
background-image: -ms-linear-gradient(bottom left, #2d2d2d 50%, #242424 50%);

/* Mozilla Firefox */ 
background-image: -moz-linear-gradient(bottom left, #2d2d2d 50%, #242424 50%);

/* Opera */ 
background-image: -o-linear-gradient(bottom left, #2d2d2d 50%, #242424 50%);

/* Webkit (Safari/Chrome 10) */ 
background-image: -webkit-gradient(linear, left bottom, right top, color-stop(50, #2d2d2d), color-stop(50, #242424));

/* Webkit (Chrome 11+) */ 
background-image: -webkit-linear-gradient(bottom left, #2d2d2d 50%, #242424 50%);

/* W3C Markup */ 
background-image: linear-gradient(to top right, #2d2d2d 50%, #242424 50%);
}
/***************************/

</style>
</head>
<body> 
<center>
<div class="loginbox" style="background-image:url(web/images/bg_login.png);">
  <p style="padding-top: 25px; "> 
		<img style="width:200px;" src="web/images/rtaf.png" />
  </p>
  <p style="font-weight: bold"> <?php echo $_SESSION['Fullname_Site'];?>  </p>
  <p>
    <form method="post" action="">
	    <li>
			<input name="login" type="text" class="text" value="ชื่อผู้ใช้งาน" onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = 'ชื่อผู้ใช้งาน';}" > <img src="web/images/icons1.png" />
	    </li>
		<li>
			<input name="password" type="password" value="Password" onFocus="this.value = '';" onBlur="if (this.value == '') {this.value = 'Password';}"><img src="web/images/icons2.png" />
		</li>
		<div class="p-container">
			<p><input class="btn" type="submit"  name="submit" value="เข้าสู่ระบบ"></p>
			<div class="clear"></div>
		</div>
	</form> 
   </p>
</div>
</center>

</body>
</html>
