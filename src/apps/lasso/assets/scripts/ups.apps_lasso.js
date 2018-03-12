/**********************************************
 **********************************************
 ** Global Variables
 **********************************************
 **********************************************/

'use strict';

$(function() {
	
  // BEGIN Show Hide password characters
  function swapInput(){
	  var type = $('#password').attr('type'); //input element
	  var btn_copy = $('#showHide_btn').html(); //input button copy
	  var sr_copy = $('#sr_sh_text').html(); //input screen reader copy
	  
	  if(type === 'password'){
		  type = 'text';
		  btn_copy = 'Hide';
		  sr_copy = 'password';
	  }else{
		  type = 'password';
		  btn_copy = 'Show';
		  sr_copy = 'password in plain text';
	  }
	  
	  $('#password').attr('type', type);
	  $('#showHide_btn').html(btn_copy);
	  $('#sr_sh_text').html(sr_copy);
  }
  $('#showHide_btn').click(swapInput);
  // END Show Hide password characters
});













