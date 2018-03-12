$(function () {
	'use strict';
	
	$('.ups-details_ctrl').click(function () {
		var btn = $(this);
		var elem = $(this).parent().next('.ups-module_panel');
		
		if (elem.length === 0) {
			return;
		}
		
		var elemsCollapsible = elem;	
		
		if (elem.children('div.ups-details_collapsible').length > 0) {
			elemsCollapsible = elem.children('div.ups-details_collapsible');
		}
		
		if (elem.data('isHidden') !== 'true') {
			elem.data('isHidden', 'true');
			elemsCollapsible.hide();
			btn.text('Show Details');
			elem.parent().css('margin-bottom', '25px');
		} else {
			elem.data('isHidden', 'false');
			elemsCollapsible.show();
			btn.text('Hide Details');
			elem.parent().css('margin-bottom', '0');
		}
	});
});