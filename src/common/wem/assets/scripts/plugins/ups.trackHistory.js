//var track_locale;
(function($) {
    //'use strict';

    var PLUGIN_NS = 'upsTrackHistory';

    var Plugin = function ( target, options ) {
        var plugin = this;

        plugin.$T = $(target);
        plugin.options = $.extend(
            true, // deep extend
            {},
            options
        );

        //plugin.$window = $(window);

        plugin._init( target );

        return plugin;
    };

    Plugin.prototype._init = function() {
        var plugin = this;
        //plugin.trackLocale = plugin.options.locale;

        var $trackingList = plugin.$T.find('#ups-trackingList');


        $trackingList.on('click', '.ups-input_wrapper', function(event) {
            if(UPS.configs.viewport.size === 'small'){
                event.preventDefault();
                window.location.href = $(this).find('a').attr('href');
            }
        });

    };


    /** #### JQUERY HOOK #### */
    $.fn[PLUGIN_NS] = function(methodOrOptions) {
        var plugin = this;
        if (!$(plugin).length) {
            return $(plugin);
        }
        var instance = $(plugin).data(PLUGIN_NS);

        if (instance && (methodOrOptions.hasOwnProperty('indexOf') && methodOrOptions.indexOf('_') !== 0) && instance[methodOrOptions] && typeof(instance[methodOrOptions]) === 'function') {
            return instance[methodOrOptions](Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            instance = new Plugin($(plugin), methodOrOptions);
            $(plugin).data(PLUGIN_NS, instance);
            return $(plugin);
        } else if (!instance) {
            $.error('Plugin must be initialised before using method: ' + methodOrOptions);
        } else if (methodOrOptions.indexOf('_') === 0) {
            $.error('Method ' + methodOrOptions + ' is private!');
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist.');
        }
    };
})(jQuery);
/* 
 * Track With History Module
* Simple AJAX JSON call to show success/ error
* Author: Surag Prajapati
* Date: 01/25/2016
* 
 * Testing Notes: Invalid access key, - succcess AJAX but error response; invalid URL or cross Domain not set - error ajax response
*/
$(document).ready(function() {


    if ($("#ups-trackingList").length === 0) {
        return;
    }


    //module level variables
    var request; //variable to hold the generated AJAX request
    var ajaxOptions; //variable to hold the ajax options

    // set authentication information
    /*var authenticationInfo = {
        "UPSSecurity": {
            "UsernameToken": {
                "Username": authentication.uname,
                "Password": authentication.upwd
            },
            "ServiceAccessToken": {
                "AccessLicenseNumber": authentication.akey
            }
        }
    };*/
    // set default request JSON
    var methodInfo = {
        "TrackHistoryRetrieveRequest": {
            "Request": {
                "RequestOption": "",
                "TransactionReference": {
                    "CustomerContext": "Get recent tracking history",
                    "TransactionIdentifier": ""
                }
            },
            "UserData": {
                "Locale": "en_US"
            }
        }

    };

    //Generate AJAX request
    var generateAjaxRequest = function() {
        request = $.extend(request, methodInfo);
        //console.log(request);
    };

    // set AJAX options for the AJAX call 
    var setAjaxOptionsHistory = function() {
        var ajaxSource = $("#ups-trackingList").data("ajax-source");
        var widgetID = $("#ups-trackingList").data("widget-source");
        //set ajax options
        ajaxOptions = {
            id: widgetID,
            url: ajaxSource,
            data: JSON.stringify(request),
            dataType:"json"
        };

    };

    // publish to AJAX topic to initiate the call
    var publishAjaxCall = function(ajaxOptions) {
        $.Topic("Ajax").publish({
            ajaxOptions: ajaxOptions
        });
    };

    //Initiate AJAX call on page load if Track with History widget is present
    // Need to add check to initiate call only when site user's location is known 
    if ($("#ups-trackingList").length > 0) {
        generateAjaxRequest();
        setAjaxOptionsHistory();
        publishAjaxCall(ajaxOptions);
    }

    //process AJAX response message 
    var processResponse = function(ajaxResponse) {
        //console.log(ajaxResponse);
        if (ajaxResponse.data.isError) {
        	$(".ups-trackHistory .ups-widget_panel .ups-widget_errors").show();
        } else {
            if (ajaxResponse.data.responseJSON.hasOwnProperty("Fault")) {
            	$(".ups-trackHistory .ups-widget_panel .ups-widget_errors").show();
            } else {
                processSuccessResponse(ajaxResponse);
            }

        }
    };

    /*
     * process AJAX success response
     *  
     */
    var processSuccessResponse = function(ajaxResponse) {
        console.log(ajaxResponse);
        var jsonstring = JSON.stringify(ajaxResponse);
        var parsedData = JSON.parse(jsonstring);
        console.log(parsedData);
        var HistoryData = parsedData.data.responseJSON.TrackHistoryResponse.TrackHistoryData;
        //by default track request will go to native desktop application.
        var appUrl = 'https://wwwapps.ups.com/WebTracking/processInputRequest?AgreeToTermsAndConditions=yes&loc='+wems_ext_locale+'&data-content-block-id=W20&tracknum=';
        //var mAppUrl ="https://m.ups.com/mobile/track?loc=en_US&trackingNumber="
        var HistoryContainer = $(".ups-trackHistory_listRows");
        if (parsedData.hasOwnProperty("data")) {
            var alertObj = parsedData.data.responseJSON.TrackHistoryResponse.Response;
            if (alertObj.hasOwnProperty("Alert")) {
                var trackAlert = parsedData.data.responseJSON.TrackHistoryResponse.Response.Alert.Description;
                $('<div>').attr('class', 'ups-checkbox ups-input_wrapper').appendTo(HistoryContainer)
                    .append($('<p>').text(trackAlert));
            } else {
                var TrackNum ='';
                if ($.isArray(HistoryData)) {
                    $.each(HistoryData, function(i, item) {
                        TrackNum = HistoryData[i].InquiryNumber;
                        if (item.InquiryNickname !== "") {
                            //var HistoryContainer = $(".ups-trackHistory_listRows");
                            $('<div>').attr('class', 'ups-checkbox ups-input_wrapper ups-icon-chevronright').appendTo(HistoryContainer)
                                .append($('<input />', {
                                    'type': 'checkbox',
                                    'id': 'ups-tracking_check' + '_' + i,
                                    'class': 'ups-checkbox-custom',
                                    'name': 'HistoryCB1' + i,
                                    'value': TrackNum
                                }))
                                .append($('<label />', {
                                    'for': 'ups-tracking_check' + '_' + i,
                                    'class': 'ups-checkbox-custom-label',
                                    'text': HistoryData[i].InquiryNickname
                                }))
                                .append($('<a>').attr('href', appUrl + TrackNum).text(HistoryData[i].InquiryNickname))
                                .append($('<p>').text(HistoryData[i].StatusDescription));
                        } else {
                            //var HistoryContainer = $(".ups-trackHistory_listRows");
                            $('<div>').attr('class', 'ups-checkbox ups-input_wrapper ups-icon-chevronright').appendTo(HistoryContainer)
                                .append($('<input />', {
                                    'type': 'checkbox',
                                    'id': 'ups-tracking_check' + '_' + i,
                                    'class': 'ups-checkbox-custom',
                                    'name': 'HistoryCB1' + i,
                                    'value': TrackNum
                                }))
                                .append($('<label />', {
                                    'for': 'ups-tracking_check' + '_' + i,
                                    'class': 'ups-checkbox-custom-label',
                                    'text': TrackNum
                                }))
                                .append($('<a>').attr('href', appUrl + TrackNum).text(HistoryData[i].InquiryNumber))
                                .append($('<p>').text(HistoryData[i].StatusDescription));
                        }
                    });
                } else {
                    if (HistoryData.InquiryNickname === "") {
                        TrackNum = HistoryData.InquiryNumber;

                       // var HistoryContainer = $(".ups-trackHistory_listRows");
                        $('<div>').attr('class', 'ups-checkbox ups-input_wrapper ups-icon-chevronright').appendTo(HistoryContainer)
                            .append($('<input />', {
                                type: 'checkbox',
                                id: 'ups-tracking_check' + '_' + 0,
                                'class': 'ups-checkbox-custom',
                                name: 'HistoryCB1' + 0,
                                value: TrackNum
                            }))
                            .append($('<label />', {
                                'for': 'ups-tracking_check' + '_' + 0,
                                'class': 'ups-checkbox-custom-label',
                                'text': TrackNum
                            }))
                            .append($('<a>').attr('href', appUrl + TrackNum).text(HistoryData.InquiryNumber))
                            .append($('<p>').text(HistoryData.StatusDescription));

                    } else {
                        //var HistoryContainer = $(".ups-trackHistory_listRows");
                        $('<div>').attr('class', 'ups-checkbox ups-input_wrapper ups-icon-chevronright').appendTo(HistoryContainer)
                            .append($('<input />', {
                                type: 'checkbox',
                                id: 'ups-tracking_check' + '_' + 0,
                                'class': 'ups-checkbox-custom',
                                name: 'HistoryCB1' + 0,
                                value: TrackNum
                            }))
                            .append($('<label />', {
                                'for': 'ups-tracking_check' + '_' + 0,
                                'class': 'ups-checkbox-custom-label',
                                'text': HistoryData.InquiryNickname
                            }))
                            .append($('<a>').attr('href', appUrl + TrackNum).text(HistoryData.InquiryNickname))
                            .append($('<p>').text(HistoryData.StatusDescription));

                    }
                }
                //var HistoryContainer = $(".ups-trackHistory_listRows");
                $('<div>').attr('class', 'ups-form_ctaGroup').appendTo(HistoryContainer)
                    .append($('<button>').attr({
                        'class': 'ups-cta ups-form_button Track-selected btn_a',
                        'type': 'Submit',
                        'name': 'track.x',
                        'value': 'Track Selected'
                    }));
                $('.Track-selected').html('Track Selected');
            }
        }
    };


    //Listen to Track History widget ID. When published to this topic, initiate call 'processResponse' 
    $.Topic("trackHistory-1").subscribe(processResponse);

});
