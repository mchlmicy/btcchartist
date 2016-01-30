Highcharts.theme = 
{
	chart: 
   	{
      	backgroundColor: '#f5f5f5',
      	borderColor: '#e3e3e3',
		borderRadius: 4,
		borderWidth: 1,
	  	marginLeft: 28,
	  	marginRight: 28,
	  	marginTop: 45,
		spacingBottom: 28,
	  	spacingTop: 19,
	  	style: 
	  	{
		  	fontFamily: 'helvetica, sans-serif',
			overflow: 'hidden'
		},
	},
	colors: ["#DDDF0D", "#7798BF", "#55BF3B", "#DF5353", "#aaeeee", "#ff0066", "#eeaaee","#55BF3B", "#DF5353", "#7798BF", "#aaeeee"],
   	credits: 
   	{
    	position: 
		{
        	align: 'right',
        	verticalAlign: 'bottom',
        	x: -28,
			y: -16
    	}
	},
	labels: {style: {color: '#555555'}},
	loading: {style: {backgroundColor: '#f5f5f5'}},
	navigator: 
   	{
      	handles: 
		{
         	backgroundColor: '#404040',
         	borderColor: '#c0c0c0'
      	},
      	outlineColor: '#808080',
      	maskFill: 'rgba(40,40,40, 0.25)',
      	series: 
	  	{
         	color: '#202020',
         	lineColor: '#c0c0c0'
      	}
   	},
	plotOptions: {line: {marker: {lineColor: '#555555'}}},
   	rangeSelector: 
   	{
      	buttonTheme: 
		{
			fill: '#ffffff',
         	style: 
			{
				color: '#555555',
            	fontWeight: 'bold'
         	},
         	states: 
			{
            	hover: 
				{
               		fill: '#c0c0c0',
               		style: 
					{
                  		color: '#ffffff'
               		}
            	},
            	select: 
				{
               		fill: '#428bca',
               		style: 
					{
                  		color: '#ffffff'
               		}
            	}
         	}
      	},
		inputPosition:
		{
			x: -18,
			y: 26
		},
		inputStyle: 
		{
			color: '#555555',
			fontWeight: 'bold'
		},
	  	labelStyle: 
	  	{
         	color: '#808080',
		 	fontWeight: 'bold',
      	}
   	},
	scrollbar: 
   	{
      	barBackgroundColor: '#404040',
      	barBorderColor: '#a0a0a0',
		barBorderWidth: 0,
      	buttonArrowColor: '#404040',
      	buttonBackgroundColor: '#ffffff',
      	buttonBorderColor: '#808080',
      	rifleColor: '#c0c0c0',
      	trackBackgroundColor: '#b0b0b0',
      	trackBorderColor: '#808080'
   	},
	title: 
   	{
      	style: 
	  	{
       		color: '#555555',
        	font: '18px helvetica, sans-serif'
      	}
   	},
	tooltip: 
	{
      	backgroundColor: '#ffffff',
      	borderWidth: 1,
		borderColor: '#e3e3e3',
      	style: 
		{
         	color: '#555555'
      	}
  	},
   	xAxis: 
   	{
      	lineWidth: 1,
      	lineColor: '#404040',
      	tickColor: '#808080',
		labels:
		{
			style: { fontWeight: 'bold'}
		}
	  	
   	},
   	yAxis: 
	{
      	lineWidth: 0,
		labels: 
		{
			style: { fontWeight: 'bold'},
			x: 0
		},
   	},
};

// Apply the theme
var highchartsOptions = Highcharts.setOptions(Highcharts.theme);