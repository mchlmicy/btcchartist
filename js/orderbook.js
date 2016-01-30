$(function () 
{
	var pusher = new Pusher('de504dc5763aeef9ff52');
	var order_book_channel = pusher.subscribe('order_book');
		
	order_book_channel.bind('data', function(data)
	{
		$('#bitstamp .order-book').html('<table class="table table-striped table-bordered" style="margin-top: 16px"><thead><tr><th colspan="2" style="border-right: 2px solid #e3e3e3"><center>Bids</center></th><th colspan="2"><center>Asks</center></th></tr></thead><tbody></tbody></table>');
					
		for(i=0;i<data['bids'].length;i++) 
		{
			//If there corresponding ask data... 
			if(data['asks'].length>=i)
			{
				$('#bitstamp .order-book tbody').append('<tr><td style="text-align: left">' + data['bids'][i][0] + '</td><td style="border-right: 2px solid #e3e3e3; text-align: right">' + (Math.round(data['bids'][i][1]*100000)/100000) + '</td><td style="text-align: left">' + data['asks'][i][0] + '</td><td style="text-align: right">' + (Math.round(data['asks'][i][1]*100000)/100000) + '</td></tr>');
			}
		}
	});
});