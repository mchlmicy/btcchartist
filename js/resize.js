$(window).resize(function()
{
	$('#exchangeSwitch button').each(function()
	{
		if(!$(this).hasClass('active'))
		{
			$('#' + $(this).attr('data-exchange')).css('display','inherit');
			$('#' + $(this).attr('data-exchange')).css('display','none');
			
			//console.log($(this).attr('data-exchange'));
		}
	});
});