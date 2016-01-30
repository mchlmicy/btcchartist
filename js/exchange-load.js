var exchanges_toLoad = ['bitfinex', 'bitstamp', 'btce', 'huobi'],
	zoom_buttons = ['1h','6h','12h','1d','3d','1w','1m'],
	zoom_values = [1,6,12,24,72,168,720];

$(function () 
{
	var x = 0;
	while(exchanges_toLoad[x])
	{
		// Initiate the exchange
		exchangeQuery(exchanges_toLoad[x], 'initial', 'unified', '6h'); 
		x++;
	}
});

function loadExchange(exchange)
{
 	// Evaluate this exchange's zoom buttons
	var exchange_buttons = [];
	$('#' + exchange + ' .graph .highcharts-button text').each(function()
	{
		// Check whether a zoom button is enabled or not...
		if($(this).css('color')=='rgb(204, 204, 204)'){exchange_buttons.push([$(this).text(), false]);}
		else{exchange_buttons.push([$(this).text(), true]);}
	});
	
	// Get the seriestype
	var seriestype;
	if($('#'+exchange+' .graph').highcharts().series.length==3){seriestype = 'split';}
	else{seriestype = 'unified';}
	
	// Bind events to this exchange's zoom buttons
	var x = 0;
	$('#' + exchange + ' .graph .highcharts-button').each(function()
	{
		// If this button is not enabled...
		if(exchange_buttons[x][1] == false)
		{
			var zoom = exchange_buttons[x][0];
			
			// Add event on button click
			$(this).click(function(e)
			{
				e.preventDefault();
				exchangeQuery(exchange, 'zoom-change', seriestype, zoom); 
			});
			
			// Switch button display to enabled
			$($(this).children()[1]).css('color','#444').css('fill','#444');
		}
		
		x++;
	});
}