$(function(){
	'use strict';
	
	/*********************************************
	**********************************************
	** Begin Show/Hide content block on button  **
	**********************************************
	*********************************************/
	$('.legacy-show_hide .legacy-sh_block').hide();
	console.log('testing thing');
	
	$('.legacy-show_hide .legacy-sh_btn').click(function(){
		var btn_icon = $('.icon', this);
		var btn_text = $('.legacy-sh_btn_text', this);
		var content_block = $(this).parent().children('.legacy-sh_block');
		if(btn_icon.hasClass('ups-icon-plus')){
			btn_icon.removeClass('ups-icon-plus')
				.addClass('ups-icon-minus');
			btn_text.text($(this).data('hide-text'));
			content_block.show();
		}else{
			btn_icon.removeClass('ups-icon-minus')
				.addClass('ups-icon-plus');
			btn_text.text($(this).data('show-text'));
			content_block.hide();
		}
	});
	/*********************************************
	**********************************************
	** End Show/Hide content block on button    **
	**********************************************
	*********************************************/
});