<?php
	//Connect to the database
	mysql_connect('localhost', '<db_user>', '<db_password>') or die('not connecting');

	//Select the database
	mysql_select_db('<db_name>') or die ('no database selected');

?>
<script src="http://js.pusher.com/2.2/pusher.min.js"></script>
<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
<script type="text/javascript">
	var pusher = new Pusher('de504dc5763aeef9ff52');
	var trades_channel = pusher.subscribe('live_trades');
	var order_channel = pusher.subscribe('order_book');

	trades_channel.bind('trade', function(data)
	{
		$.ajax({
					type: 'POST',
					url: 'db_store.php',
					dataType: 'json',
					data: 	{	id: data['id'],
								amount: data['amount'],
								price: data['price']
							}
				});
	});
</script>
