$(document).ready(function() 
{
	//Send data to Ajax (PHP) for error checking
	$.ajax({
			type: 'POST',
			url: 'http://mcy-design.com/bitcoin/php/data.php',
			dataType: 'json',
			success: function(json)
					 {
						renderChart(json.id, json.amount, json.price);
					 }
		});
});

function renderChart(id, amount, price)
{
	console.log("DATA SENT TO CHART:");
	console.log(id);
	console.log(amount);
	console.log(price);
	
	$('#graph').highcharts(
	{
    	title: 		{	text: 'Bitcoins',
             			x: -20 //center
            		},
       	subtitle: 	{	text: 'Source: Bitstamp',
                		x: -20 
            		},
       	xAxis: 		{	categories: price
            		},
        yAxis: 		{	title: {text: 'Number of Users'},
                		plotLines: [{value: 0, width: 1, color: '#808080'}]
            		},
      	tooltip: 	{	valueSuffix: ' users'
            		},
        legend: 	{	layout: 'vertical',
                		align: 'right',
                		verticalAlign: 'middle',
                		borderWidth: 0
            		},
      	series: 	[{	name: 'Volume',
                		data: [50, 34, 34, 45, 56, 54]
            		}]
        });
}