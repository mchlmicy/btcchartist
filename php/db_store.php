<?php
	//Connect to the database
	mysql_connect('localhost', '<db_user>', '<db_password>') or die('not connecting');

	//Select the database
	mysql_select_db('<db_user>') or die ('no database selected');

	$id = $_POST['id'];
	$amount = $_POST['amount'];
	$price = $_POST['price'];

	//Insert post into the posts table
	$sql = "insert into bitstamp (
						id,
						amount,
						price
					) VALUES (
						'$id',
						'$amount',
						'$price'
						)";

	$result = mysql_query($sql);

	$rows = 0;
	$row_selected = 0;
	$row_ids = array();

	// Get all of the ids for all entries in the table
	$sql = "SELECT id FROM bitstamp ORDER BY id";
	$result = mysql_query($sql);
	while($row = mysql_fetch_array($result, MYSQL_ASSOC))
	{
		$row_ids[$rows] = $row['id'];
		$rows++;
	}

	// While there are at least 350 rows in the table...
	while($rows - 350 > 0)
	{
		//Delete the selected row
		$sql = "DELETE FROM bitstamp where id = '$row_ids[$row_selected]' LIMIT 1";
		$result = mysql_query($sql);

		$row_selected++;
		$rows--;
	}
?>
