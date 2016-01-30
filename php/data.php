<?php
	//Include config file
	include('../config/config.php');
	
	$x = 0;
	$id = array();
	$amount = array();
	$price = array();
	
	$sql = "SELECT * FROM bitstamp";
	$result = mysql_query($sql);
	while($row = mysql_fetch_array($result, MYSQL_ASSOC))
	{                               
		if($x<=6)
		{
			$id[$x] = $row['id'];
			$amount[$x] = $row['amount'];
			$price[$x] = $row['price'];
		}
		
		$x++;
	}

	$json = array("id" => $id, "amount" => $amount, "price" => $price); 
	$output = json_encode($json);
	echo $output;	
	
?>