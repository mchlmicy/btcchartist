<?php
	//Connect to the database
	mysql_connect('localhost', '<db_user>', '<db_password>') or die('not connecting');

	//Select the database
	mysql_select_db('<db_name>') or die ('no database selected');

	require('Pusher.php');
	$key = 'de504dc5763aeef9ff52';
	$secret = '16bd4d79950e493a5863';
	$app_id = '72116';


	$pusher = new Pusher($key, $secret, $app_id);
	$pusher->trigger('live_trades', 'trade', 'hello world');

	//Get values
	$id = $_POST['id'];
	$amount = $_POST['amount'];
	$price = $_POST['price'];

	//Insert post into the posts table
	$sql = "insert into test (
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
	$sql = "SELECT id FROM test ORDER BY id";
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
		$sql = "DELETE FROM test where id = '$row_ids[$row_selected]' LIMIT 1";
		$result = mysql_query($sql);

		$row_selected++;
		$rows--;
	}
?>
