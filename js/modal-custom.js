$(document).ready(function() 
{
	//Remove #'s from URLs on anchor clicks
	$("a.modal-custom").click(function(event){event.preventDefault();});
});

function modalCustom(modalType, exchange, tradeValues)
{	
	if(modalType=='exchange')
	{
		//var1 = Exchange Name
		var modalTitle = "<h4 class='modal-title'>"+exchange+"</h4>";
		var modalSubtitle = "<h5 style='color: #808080; margin-top: 0px; margin-bottom: 0px'>Exchange Rates</h5>";
		
		console.log(tradeValues);
		var modalBody_text = [];
		for(x = 0; x < tradeValues.length; x++)
		{
			// Delete any decimals past the hundredth's place...
			var deci_pos = String(tradeValues[x]).indexOf('.');
			tradeValues[x] = String(tradeValues[x]).substring(0, deci_pos + 3);
			
			// Append placeholder zeroes as necessary...
			while((tradeValues[x].length - deci_pos) < 3){tradeValues[x] = tradeValues[x] + '0';}
			
			// Prepend correct currency symbol
			if(exchange=='Huobi'){modalBody_text[x] = '&yen;' + tradeValues[x];}
			else{modalBody_text[x] = '$' + tradeValues[x];}
		}
		console.log(tradeValues);
		
		if(tradeValues.length==1)
		{
			var modalBody = "	<div class='row-fluid' style='height: 56px'> \
									<div class='col-xs-12'> \
										<span class='pull-left'><h5>Trading value</h5></span> \
										<span class='pull-right'><h5 style='font-weight: normal'>"+modalBody_text[0]+"</h5></span> \
									</div> \
								</div>";
		}
		else
		{
			var modalBody = "	<div class='row-fluid' style='height: 134px'> \
									<div class='col-xs-12'> \
										<span class='pull-left'><h5>Trading value</h5></span> \
										<span class='pull-right'><h5 style='font-weight: normal'>"+modalBody_text[0]+"</h5></span> \
									</div> \
									<div class='col-xs-12'> \
										<span class='pull-left'><h5>Last Buy</h5></span> \
										<span class='pull-right'><h5 style='font-weight: normal'>"+modalBody_text[1]+"</h5></span> \
									</div> \
									<div class='col-xs-12'> \
										<span class='pull-left'><h5>Last Sell</h5></span> \
										<span class='pull-right'><h5 style='font-weight: normal'>"+modalBody_text[2]+"</h5></span> \
									</div> \
								</div>";
		}
		
		var modalButtons = "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>";
	
		//Build the custom modal
		var modal = $("	<a href='#modalCustom' id='modalCustomButton' data-toggle='modal'></a> \
						<div class='modal fade' id='modalCustom' tabindex='-1' aria-hidden='true'> \
							<div class='modal-dialog'> \
								<div class='modal-content'> \
									<div class='modal-header'> \
										<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button> \
										" + modalTitle + " \
										" + modalSubtitle + " \
									</div> \
									<div class='modal-body'> \
										" + modalBody + " \
									</div> \
									<div class='modal-footer'> \
										" + modalButtons + " \
									</div> \
								</div> \
							</div> \
						</div> \
					").appendTo('body');
	
		//Activate modal
		$('#modalCustomButton').click();
	
		//Destroy modal on close
		modal.on('hidden.bs.modal', function() 
		{
			modal.remove();
		});
	}
}