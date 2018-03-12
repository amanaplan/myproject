/*
 * Common module to make the AJAX calls 
 * Listen to topic 'Ajax' which gets fired if any other module publishes to it 
 * Author: psanjeevi
 * Date: 10/26/2015 
 * 
 */

 (function($) {
    //'use strict';
	    var globalAccessToken = $("#ups-header").data("upstoken");
	    var makeAjaxRequest = function(data) {
	        var ajaxOptions = data.ajaxOptions;
	        if(ajaxOptions !==undefined && ajaxOptions.url!==undefined){
	        	$.ajax({
		            type: "POST",
		            url: "https://onlinetools.ups.com/rest/" + ajaxOptions.url,
		            //url:'/assets/resources/ajax/mhd.json',
		            data: ajaxOptions.data,
		            dataType: ajaxOptions.dataType,
		            xhrFields: {
		               	withCredentials: true
	                },
		            beforeSend: function(request) {
		            	request.setRequestHeader("X-Csrf-Token", globalAccessToken);
		            	if(ajaxOptions.beforeSend!==undefined && typeof ajaxOptions.beforeSend==='function'){
		            		ajaxOptions.beforeSend();
		            	}	
		            },
					timeout:5000,
		            cache: false,
		            crossDomain: true,
		            success: function(data, text, ajaxResponse) {
		                //console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++",ajaxResponse);
		                ajaxResponse.isError = false;
		                if (ajaxResponse.responseJSON) {
		                    ajaxResponse.testMessage = "AJAX call to '" + ajaxOptions.url + "' returned object '" + ajaxResponse.responseJSON ;
		                } else {
		                    ajaxResponse.testMessage = "AJAX call to '" + ajaxOptions.url + "' returned status '" + ajaxResponse.statusText ;
		                }
		
		                // Send the AJAX response back.
		                sendAjaxResponseBack(ajaxOptions.id, ajaxResponse);
		            },
		            error: function(ajaxResponse) {
		                ajaxResponse.isError = true;
		                ajaxResponse.testMessage = ajaxResponse.statusText;
		                sendAjaxResponseBack(ajaxOptions.id, ajaxResponse);
		            },
		            complete: function() {
		                //hide throbber or do some complete functions
		            	if(ajaxOptions.complete!==undefined && typeof ajaxOptions.complete==='function'){
		            		ajaxOptions.complete();
		            	}
		            }
		        });
	        }
	        
	    };

    // Listen to topic "Ajax" and make ajax request using the ajax set options
    $.Topic("Ajax").subscribe(makeAjaxRequest);


    //Send Ajax response back to the module which requested it  
    var sendAjaxResponseBack = function(id, ajaxResponse) {
        $.Topic(id).publish({
            data: ajaxResponse
        });
        //alert("Data Sent to Widget");
    };


})(jQuery);

			