function createTradeLabel(exchange, exchange_name, exchange_split_status, query_min_x, query_max_x) 
{
	// Construct label URL and trade-value label
	var labelURL = 'http://www.btcchartist.com/'+exchange;
	if(exchange!='huobi'){labelURL = labelURL + '/btcusd/ticker/';} else{labelURL = labelURL + '/btccny/ticker/';}
	var tradeValues = [], tradingValue;
	$.getJSON(labelURL, function(data)
	{
		// Get the trading value
		tradeValues[0] = data.last_price;
		
		// Delete any decimals past the hundredth's place...
		var deci_pos = String(tradeValues[0]).indexOf('.');
		tradingValue = String(tradeValues[0]).substring(0, deci_pos + 3);
		
		// Append placeholder zeroes as necessary...
		while((tradingValue.length - deci_pos) < 3){tradingValue = tradingValue + '0';}
		
		// Prepend correct currency symbol
		if(exchange!='huobi'){tradingValue = '$' + tradingValue;} 
		else{tradingValue = '&yen;' + tradingValue;}
		
		// If split data (buys/sells) is available... 
		if(exchange_split_status == true)
		{
			// Construct query URL
			var tradelabelURL = 'http://www.btcchartist.com/'+exchange;
			if(exchange!='huobi'){tradelabelURL = tradelabelURL + '/btcusd/chart/split/';} else{tradelabelURL = tradelabelURL + '/btccny/chart/split/';}
			tradelabelURL = tradelabelURL + Math.round(query_min_x) + '/'+ Math.round(query_max_x)+'/';
			
			$.getJSON(tradelabelURL, function(data)
			{
				tradeValues.push(data.buys[data.buys.length-1][1]);
				tradeValues.push(data.sells[data.sells.length-1][1]);
				
				// Provide trade value & listen for trade-value click events
				$('#'+exchange+'_labels .trade-value').html(tradingValue).click(function()
				{
					modalCustom('exchange', exchange_name, tradeValues);
				});	
			});
		}
		else
		{
			// Provide trade value & listen for trade-value click events
			$('#'+exchange+'_labels .trade-value').html(tradingValue).click(function()
			{
				modalCustom('exchange', exchange_name, tradeValues);
			});	
		}
	});
}