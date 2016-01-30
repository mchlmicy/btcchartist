<?php
	//Set the database access information
	$db_user = '<db_user>';
  $db_password = '<db_password>';
  $db_host = 'localhost';
  $db_name = '<db_name>';

	//Connect to the database
	mysql_connect($db_host, $db_user, $db_password) or die('not connecting');

	//Select the database
	mysql_select_db($db_name) or die ('no database selected');

	//Continue session
	session_start();
?>
