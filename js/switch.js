$('#exchangeSwitch button').click(function()
{
	switchExchange(this);
});

function switchExchange(exchange)
{
	if(!$(exchange).hasClass('active'))
	{
		$('#exchangeSwitch button').each(function()
		{
			if($(this).hasClass('active'))
			{
				var openExchange = $(exchange).attr('data-exchange');
				var closeExchange = $(this).attr('data-exchange');
				
				if(closeExchange=='bitstamp')
				{
					if($('#bitstamp .graph').css('display')=='none')
					{
						switchData('graph');
					}
				}
				
				if(closeExchange=='bitfinex'){$('#bitfinex_seriesSwitch').css('display','none');}
				else if(closeExchange=='btce'){$('#btce_seriesSwitch').css('display','none');}
				
				if(openExchange=='bitfinex'){$('#bitfinex_seriesSwitch').css('display','inherit');}
				else if(openExchange=='btce'){$('#btce_seriesSwitch').css('display','inherit');}
				
				// Switch displayed exchange
				$('#' + closeExchange).css('display', 'none');
				$('#' + openExchange).css('display', 'inherit');
			
				// Switch displayed labels
				$('#' + closeExchange + '_labels').css('display', 'none');
				$('#' + openExchange + '_labels').css('display', 'inherit');
				
				// Switch highlighted buttons
				$(this).removeClass('active');
				$(exchange).addClass('active');
				
				return;
			}
		});	
	}
}

function switchData(data)
{
	if(data=='graph')
	{
		$('#bitstamp .order-book').css('display','none');
		$('#bitstamp .switch-graph').css('display','none');
		
		$('#bitstamp .graph').css('display','inherit');
		$('#bitstamp .switch-order').css('display','inherit');
	}
	else if(data=='order-book')
	{
		$('#bitstamp .graph').css('display','none');
		$('#bitstamp .switch-order').css('display','none');
		
		$('#bitstamp .order-book').css('display','inherit');
		$('#bitstamp .switch-graph').css('display','inherit');
	}
}