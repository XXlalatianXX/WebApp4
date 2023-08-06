<?
$link = mysql_connect('localhost','root','root')or die("can not connect host");
mysql_select_db('cs_gis_dev_framework',$link)or die("can not connect db");
mysql_query("SET character_set_results=utf8");
mysql_query("SET character_set_client=utf8");
mysql_query("SET character_set_connection=utf8");  
?>