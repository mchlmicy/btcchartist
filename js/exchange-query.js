var exchange_names = [['bitfinex','Bitfinex'],['bitstamp','Bitstamp'],['btce','BTC-e'],['huobi','Huobi']],
	exchange_split = [['bitfinex',true],['bitstamp',false],['btce',true],['huobi',false]],
	zoom_buttons = ['1h','6h','12h','1d','3d','1w','1m'],
	zoom_values = [1,6,12,24,72,168,720];

function exchangeQuery(exchange, querytype, seriestype, details)
{
	var chart = $('#' + exchange + ' .graph').highcharts();
	
	// Turn on loading animation
	$('.loading img').css('display','inline-block').css('-webkit-animation-play-state', 'running').css('animation-play-state','running');
	if(querytype!='initial'){chart.showLoading('One moment please...');} 
	
	// Get the exchange name
	var exchange_name, x = 0;
	while(x < exchange_names.length)
	{
		if(exchange == exchange_names[x][0])
		{
			exchange_name = exchange_names[x][1];
		}
		x++;
	}
	
	// Find the selected zoom setting
	var zoom_setting;
	if(querytype!='zoom-change')
	{
		$('#' + exchange + ' .graph .highcharts-button text').each(function()
		{
			// Check whether a zoom button is enabled or not...
			if($(this).css('font-weight')=='bold'){zoom_setting = $(this).text();}
		});
	}
	else{	zoom_setting = details;}
	
	// Get current time for query URL
	var query_max_x = (new Date).getTime();
	
	// Get the target time for the query URL
	var time_now = new Date(query_max_x);
	var query_min_x;
	if(querytype!='initial'){query_min_x = time_now.setHours(time_now.getHours() - zoom_values[zoom_buttons.indexOf(zoom_setting)]);}
	else{query_min_x = time_now.setHours(time_now.getHours() - 6);}
	
	// Construct query URL
	var chartURL = 'http://www.btcchartist.com/'+exchange;
	if(exchange!='huobi'){chartURL = chartURL + '/btcusd/chart/';} else{chartURL = chartURL + '/btccny/chart/';}
	if(seriestype=='split'){chartURL = chartURL + 'split/';}
	chartURL = chartURL + Math.round(query_min_x) + '/'+ Math.round(query_max_x)+'/';
	
	if(seriestype != 'split')
	{
		$.ajax({	type: 'GET',
					url: chartURL,
					dataType: 'json',
					complete: function(data)
					{
						$('#'+exchange+' .graph').highcharts('StockChart', 
						{
							rangeSelector: 	{	inputEnabled: $('#'+exchange+' .graph').width() > 480,
												selected: 1,
												buttons: [	{type: 'hour', count: 1, text: '1h'},
															{type: 'hour', count: 6, text: '6h'},
															{type: 'hour', count: 12, text: '12h'}, 
															{type: 'day', count: 1, text: '1d'},
															{type: 'day', count: 3, text: '3d'}, 
															{type: 'day', count: 7, text: '1w'},
															{type: 'month', count: 1, text: '1m'}]
											},
							title: 			{	text: exchange_name
											},
							tooltip: 		{	followTouchMove: true,
												valueDecimals: 2,
												valuePrefix: '$'
											},
							series:			[{	name: 'Trades',
												color: '#606060',
												data: data.responseJSON.trades,
												lineWidth: 1,
												states: {	hover:	{	enabled: true,
																		lineWidth: 1
																	}
														}
											}]
						});
						
						// Turn off loading animation
						$('.loading img').css('display','none').css('-webkit-animation-play-state', 'paused').css('animation-play-state','paused');
						if(querytype!='initial'){chart.hideLoading();}
						else
						{
							$('#exchangeSwitch button[data-exchange='+exchange+']').removeClass('disabled');
							if(exchange!='bitstamp'){$('#'+exchange).css('display','none');}
							else{$('#bitstamp .switch-order').css('display','inherit');}
							
							// Check if split data (buys/sells) is available
							var x = 0;
							while(x < exchange_split.length)
							{
								if(exchange == exchange_split[x][0])
								{
									createTradeLabel(exchange, exchange_name, exchange_split[x][1], query_min_x, query_max_x);
								}
								x++;
							}
						}
						
						// Invoke button events and load exchange
						loadExchange(exchange);
						
						// If querytype is a series-switch
						if(querytype=='series-switch')
						{
							$('#'+exchange+'_seriesSwitch').data('series', 'split').html('Buys / Sells');
						}
					}
				});
	}
	if(seriestype == 'split')
	{
		$.ajax({	type: 'GET',
					url: chartURL,
					dataType: 'json',
					complete: function(data)
					{
						$('#'+exchange+' .graph').highcharts('StockChart', 
						{
							rangeSelector: 	{	inputEnabled: $('#'+exchange+' .graph').width() > 480,
												selected: 1,
												buttons: [	{type: 'hour', count: 1, text: '1h'},
															{type: 'hour', count: 6, text: '6h'},
															{type: 'hour', count: 12, text: '12h'}, 
															{type: 'day', count: 1, text: '1d'},
															{type: 'day', count: 3, text: '3d'}, 
															{type: 'day', count: 7, text: '1w'},
															{type: 'month', count: 1, text: '1m'}]
											},
							title: 			{	text: exchange_name
											},
							tooltip: 		{	followTouchMove: true,
												valueDecimals: 2,
												valuePrefix: '$'
											},
							series: 		[{	name: 'Buy',
												color: '#006000',
												data: data.responseJSON.buys,
												lineWidth: 1,
												states:	{	hover:	{	enabled: true,
																		lineWidth: 1
																	}
														}
											},
											{	name: 'Sell',
												color: '#600000',
												data: data.responseJSON.sells,
												lineWidth: 1,
												states:	{	hover:	{	enabled: true,
																		lineWidth: 1
																	}
														}
											}]
						});
						
						// Turn off loading animation
						$('.loading img').css('display','none').css('-webkit-animation-play-state', 'paused').css('animation-play-state','paused');
						if(querytype!='initial'){chart.hideLoading();}
						else
						{
							$('#exchangeSwitch button[data-exchange='+exchange+']').removeClass('disabled');
							if(exchange!='bitstamp'){$('#'+exchange).css('display','none');}
							else{$('#bitstamp .switch-order').css('display','inherit');}
							
							// Check if split data (buys/sells) is available
							var x = 0;
							while(x < exchange_split.length)
							{
								if(exchange == exchange_split[x][0])
								{
									createTradeLabel(exchange, exchange_name, exchange_split[x][1], query_min_x, query_max_x);
								}
								x++;
							}
						}
						
						// Invoke button events and load exchange
						loadExchange(exchange);
						
						// If querytype is a series-switch
						if(querytype=='series-switch')
						{
							$('#'+exchange+'_seriesSwitch').data('series', 'unified').html('Trades');
						}
					}
		});
	}
}