(function ($) {
    'use strict';

    var PLUGIN_NS = 'upsLocFinder';

    var Plugin = function (target, options) {
        var plugin = this;
        plugin.$T = $(target);

        /** #### OPTIONS #### */
        this.options = $.extend(
            true, // deep extend
            {
                DEBUG: false,
                defaultOptionA: 'defaultValue'
            },
            options
        );

        plugin._init(target, options);
    };

    Plugin.prototype._init = function() {
        var plugin=this;
        plugin.engLangLocale="en-US";
        plugin.$panel = plugin.$T.find('.ups-widget_panel');
        plugin.$panelHeading = plugin.$panel.find('.ups-locFinder_heading');
        plugin.$mapWrap = plugin.$panel.find('.ups-locFinder_mapWrap');
        plugin.$map = plugin.$panel.find('.ups-locFinder_map');
        plugin.$info = plugin.$panel.find('.ups-locFinder_info');
        //plugin.$exception = plugin.$panel.find('.ups-widget_errors');
        //$(plugin.$exception).html('<span class="icon ups-icon-exclamationcircle"></span>  <span>'+plugin.$locMsg+'</span>');
        plugin.$locNotFound = plugin.$panel.find('.ups-locFinder_locMsg');
        //var $loader = $('<div class="ups-locFinder_loader"/>');
        plugin.$locWrap = plugin.$panel.find('.ups-event-locator').closest('.ups-locFinder_wrap');
        plugin.$locMsg = plugin.$T.find('.ups-locFinder').attr('data-locmsg');
        plugin.$locNotFound.html(plugin.$locMsg);
        $(plugin.$exception).html('<span class="icon ups-icon-exclamationcircle"></span>'+plugin.$locMsg);
        //var showMap = plugin.$T.data('map');
        plugin.$infoContainer = plugin.$T.next('.ups-location-detail');
        //var $infoContainer = $('.ups-location-detail');
        plugin.key = plugin.options.keyWEMS;
        plugin.userPosition=true;
        plugin.dateLang = plugin.options.locale.replace(/_/g, '-');
        //module level variables
        plugin.request =''; //variable to hold the generated AJAX request
        plugin.ajaxOptions =''; //variable to hold the ajax options
        if (plugin.$panel.find('.ups-event-locator').length>0) {
            if(UPS.utils.currentIEVersion<11 && UPS.utils.currentIEVersion> 5){
                plugin.$infoContainer.show();
                plugin.$infoContainer.find('.ups-locFinder_wrap').addClass(UPS.configs.activeClass);
                plugin.noMap();
                plugin.errorIEView();
                return;

            }else{
                plugin.$locWrap.addClass(UPS.configs.activeClass);
                plugin.locOnload();
            }
        } else {
            return;
        }
        // if(UPS.utils.currentIEVersion>10 && UPS.utils.currentIEVersion< 5){
        //     $.Topic("locator-1").subscribe(processResponse);
        // }
        //var resp=plugin.processResponse;
        var processResponse = function(ajaxResponse) {
            if (ajaxResponse.data.isError) {
                plugin.locErrorResponse();
            } else if (ajaxResponse.data.responseJSON.LocatorResponse.Response.hasOwnProperty("Error")) {
                plugin.locErrorResponse();
            } else {
                plugin.processSuccessResponse(ajaxResponse, plugin.userPosition);
            }
        };
        if(UPS.utils.currentIEVersion>10 || UPS.utils.currentIEVersion< 5){
            $.Topic("locator-1").subscribe(processResponse);
        }
        plugin.bindEvents();
        /*plugin.authenticationInfo = {
         "AccessRequest": {
         "AccessLicenseNumber": authentication.akey,
         "UserId": authentication.uname,
         "Password": authentication.upwd
         }
         };*/

        // JSON to handle coordinates
        plugin.geoMethodInfo = {
            "LocatorRequest": {
                "Request": {
                    "RequestAction": "Locator",
                    "RequestOption": "1",
                    "TransactionReference": {
                        "CustomerContext": ""
                    }
                },
                "OriginAddress": {
                    "Geocode": {
                        "Latitude": "",
                        "Longitude": ""
                    },
                    "AddressKeyFormat": {
                        "AddressLine": "",
                        "CountryCode": ""
                    },
                    "MaximumListSize": ""
                },
                "Translate": {
                    "Locale": "en_US"
                },
                "UnitOfMeasurement": {
                    "Code": "MI"
                },
                "LocationID": "",
                "LocationSearchCriteria": {
                    "SearchOption": {
                        "OptionType": {
                            "Code": "03"
                        },
                        "OptionCode": {
                            "Code": "033"
                        }
                    },
                    "MaximumListSize": "",
                    "SearchRadius": ""
                }
            }
        };

        // set default request JSON
        plugin.methodInfo = {
            "LocatorRequest": {
                "Request": {
                    "RequestAction": "Locator",
                    "RequestOption": "1",
                    "TransactionReference": {
                        "CustomerContext": "",
                        "XpciVersion": "1.0014"
                    }
                },
                "OriginAddress": {
                    "PhoneNumber": {
                        "StructuredPhoneNumber": {
                            "PhoneDialPlanNumber": "",
                            "PhoneLineNumber": ""
                        }
                    },
                    "AddressKeyFormat": {
                        "SingleLineAddress": "",
                        "CountryCode": plugin.options.country
                    },
                    "MaximumListSize": ""
                },
                "Translate": {
                    "LanguageCode": "ENG"
                },
                "UnitOfMeasurement": {
                    "Code": "MI"
                },
                "LocationID": "",
                "LocationSearchCriteria": {
                    "SearchOption": [{
                        "OptionType": {
                            "Code": "01"
                        },
                        "OptionCode": [{
                            "Code": "000"
                        }]
                    }, {
                        "OptionType": {
                            "Code": "03"
                        },
                        "OptionCode": {
                            "Code": "033"
                        }
                    }]
                }
            }
        };
        // var Getlocale = function() {
        //     //var $locCode = $("html").attr('lang');
        //     //if($locCode!==undefined || $locCode!==''){
        //        // var $countCode = $locCode.split('_');
        //     plugin.methodInfo.LocatorRequest.OriginAddress.AddressKeyFormat.CountryCode = plugin.options.country;
        //     //plugin.geoMethodInfo.LocatorRequest.OriginAddress.AddressKeyFormat.CountryCode = plugin.options.country;

        //     //}
        // }();
    };

    Plugin.prototype.errorIEView=function(){
        var plugin=this;
        plugin.$info.html('<div class="ups-locFinder_copy"><h3>'+plugin.options.langJSON.titleMsgIE+'</h3><p>'+plugin.options.langJSON.contentMsgIE+'</p><a href="'+plugin.options.langJSON.ctaLinkIE+'" class="ups-cta">'+plugin.options.langJSON.ctaMsgIE+'</a></div>');
    };

    //Generate AJAX request
    Plugin.prototype.generateAjaxRequestLocator = function() {
        var plugin=this;
        plugin.request = $.extend(plugin.request, plugin.methodInfo);
    };

    // set AJAX options for the AJAX call
    Plugin.prototype.setAjaxOptionsLocator = function() {
        var plugin=this;
        var ajaxSource = plugin.$T.find(".ups-event-locator").data("ajax-source");
        var widgetID = plugin.$T.find(".ups-event-locator").data("widget-source");
        //set ajax options
        plugin.ajaxOptions = {
            id: widgetID,
            url: ajaxSource,
            data: JSON.stringify(plugin.request),
            dataType:"json",
            beforeSend:function(){
                $('<div class="ups-loaderImg"></div>').insertBefore(plugin.$T.parent('.ups-location-detail'));
            },
            complete:function(){
                plugin.$T.parent('.ups-location-detail').siblings('.ups-loaderImg').remove();
            }
        };
    };

    // publish to AJAX topic to initiate the call
    Plugin.prototype.publishAjaxCall = function(ajaxOptions) {
        $.Topic("Ajax").publish({
            ajaxOptions: ajaxOptions
        });
    };

    Plugin.prototype.locOnload = function() {
        var plugin = this;
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                    plugin.userPosition = position; // can change back to ups.configs.position
                    //console.log(userPosition);
                    plugin.$panel.find('.ups-event-locator').closest('.ups-locFinder_wrap').hide();
                    plugin.$map.removeClass(UPS.configs.activeClass);

                    if (!$(".ups-locFinder_loader").length) {
                        var  $loader = $('<div class="ups-locFinder_loader"/>');
                        $loader.prependTo(plugin.$mapWrap);
                    }
                    var geoLat = position.coords.latitude.toString();
                    var geoLong = position.coords.longitude.toString();
                    plugin.geoMethodInfo.LocatorRequest.OriginAddress.Geocode.Latitude = geoLat;
                    plugin.geoMethodInfo.LocatorRequest.OriginAddress.Geocode.Longitude = geoLong;
                    //Extend request to pass coordinates in request parameters.
                    plugin.request = $.extend(plugin.request, plugin.geoMethodInfo);
                    plugin.setAjaxOptionsLocator();
                    plugin.publishAjaxCall(plugin.ajaxOptions);
                    plugin.getAddress(geoLat, geoLong,plugin.key);
                },
                function(error) {

                    switch(error.code) {
                        //console.log("Error Code:"+ error.code);
                        case error.PERMISSION_DENIED:
                            console.log("User denied the request for Geolocation.");
                            break;
                        case error.POSITION_UNAVAILABLE:
                            console.log("Location information is unavailable.");
                            break;
                        case error.TIMEOUT:
                            console.log("The request to get user location timed out.");
                            break;
                        case error.UNKNOWN_ERROR:
                            console.log("An unknown error occurred.");
                            break;
                    }
                    $(plugin.$T[0]).find('.ups-locservice-error').remove();
                    $(plugin.$T[0]).find('.ups-event-locator').prepend('<div class="ups-locservice-error"><span class="icon ups-icon-exclamationcircle" aria-hidden="true"></span>'+$(plugin.$T[0]).find('.ups-locFinder').data('locmsg')+'</div>');
                    plugin.userPosition = false; //can change back to ups.configs.position

                }, {
                    timeout: 10000
                });
        }
    };

    Plugin.prototype.getAddress = function(geoLat, geoLong,mapKey) {
        var plugin=this;
        var point = geoLat + "," + geoLong;
        $.ajax({
            url: "https://dev.virtualearth.net/REST/v1/Locations/" + point,
            dataType: "jsonp",
            data: {
                key: mapKey,
                output: "json"
            },
            jsonp: "jsonp",
            success: function(data) {
                var addressVal = data.resourceSets[0].resources[0].address.formattedAddress;
                $("#txtQuery, #txtQuery1, #txtQuery2, #txtQuery3, #txtQuery4, #txtQuery5").val(addressVal);
                //plugin.request = $.extend(plugin.request, plugin.geoMethodInfo);
                //plugin.setAjaxOptionsLocator();
                //plugin.publishAjaxCall(plugin.ajaxOptions);
            }
        });
    };

    //Process Error Response
    Plugin.prototype.locErrorResponse = function(){
        var plugin=this;

        //var $infoCopy = $('<div class="ups-locFinder_copy"/>');
        var $locCopy = $(".ups-locFinder_copy");
        //var $infoContainer = $('.ups-location-detail');
        // console.log($infoCopy);
        if ($locCopy.length) {
            plugin.$map.removeClass(UPS.configs.activeClass);
            $locCopy.remove();
            plugin.$locWrap.hide();
            //plugin.$exception.show();
            plugin.$locNotFound.hide();
        } else {
            plugin.$locWrap.hide();
            //plugin.$infoContainer.show();
            plugin.$locNotFound.show();
        }
        plugin.$infoContainer.show();
        plugin.$infoContainer.find('.ups-locFinder_wrap').addClass(UPS.configs.activeClass);
        //$('.ups-locFinder_current').prev($infoCopy).empty();
        plugin.$map.empty();
        $(".ups-locFinder_loader").detach();
    };
    //process AJAX response message

    Plugin.prototype._setAnalytics=function(_selfInstance){
        //var plugin=this;
        var component={
            link_page_name: document.title
        };
        if (_selfInstance.attr('data-event-id') !== undefined) {
            component.event_id = _selfInstance.attr('data-event-id');
        }
        if (_selfInstance.attr('data-content-block-id') !== undefined && _selfInstance.attr('data-content-block-id') !== '') {
            component.content_block_id = _selfInstance.attr('data-content-block-id');
        }
        component.link_name = _selfInstance.text().trim() || _selfInstance.val().trim();
        if(typeof window.utag_data!=='undefined' && window.utag_data!==undefined){
            component.user_type=window.utag_data.user_type;
            component.site_indicator=window.utag_data.site_indicator;
            component.page_country_code=window.utag_data.page_country_code;
            component.state=window.utag_data.state;
            component.city=window.utag_data.city;
            component.myups_login_state=window.utag_data.myups_login_state;
            component.page_language=window.utag_data.page_language;
        }
        if(typeof window.utag!=='undefined' && window.utag!==undefined){
            window.utag.track('link',component);
        }
    };

    Plugin.prototype.bindEvents = function() {
        var plugin=this;
        $(".ups-locFinder_current").on('click', function(event) {
            event.preventDefault();
            var _selfInstance=$(this);
            plugin.locOnload();
            plugin._setAnalytics(_selfInstance);
        });

        //Initiate ajax call on locator form submit
        plugin.$T.find(".ups-event-locator").on("submit", function(e) {
            e.preventDefault();
            if (!$("#ups-locFinder_location").val()) {
                var newWindowLink = 'https://www.ups.com/dropoff?loc='+wems_ext_locale;
                window.open(newWindowLink, '_blank');
            }
            else
            {
                if (!$(".ups-locFinder_loader").length) {
                    plugin.$map.removeClass(UPS.configs.activeClass);
                    var $loader = $('<div class="ups-locFinder_loader"/>');
                    $loader.prependTo(plugin.$mapWrap);
                }
                var $locVal = $("#ups-locFinder_location").val();

                $("#txtQuery, #txtQuery1, #txtQuery2, #txtQuery3, #txtQuery4, #txtQuery5").val($locVal);
                plugin.methodInfo.LocatorRequest.OriginAddress.AddressKeyFormat.SingleLineAddress = $locVal;
                plugin.generateAjaxRequestLocator();
                plugin.setAjaxOptionsLocator();
                plugin.publishAjaxCall(plugin.ajaxOptions);
                plugin.$locWrap.hide();
            }

            var _selfInstance=$(this).find('button.ups-form_button.ups-cta-notform');
            plugin._setAnalytics(_selfInstance);
        });

        plugin.$T.find('.ups-moreNearby').bind('click',function(){
            var _selfInstance=$(this);
            plugin._setAnalytics(_selfInstance);
            _selfInstance.parents('form').submit();
        });

        plugin.$T.find('.ups-locFinder_link.ups-locFinder_search').bind('click',function(){
            var _selfInstance=$(this);
            plugin._setAnalytics(_selfInstance);
            window.location.href= _selfInstance.attr('href');
        });

    };


    /*
     * process AJAX success response
     * From FR - Following locator details needs to be processed from the response -
     * Location Name, Address, Phone Number and hours
     *
     */
    Plugin.prototype.processSuccessResponse = function(ajaxResponse, userPosition) {
        var plugin=this;
        var jsonstring = JSON.stringify(ajaxResponse);
        var parsedData = JSON.parse(jsonstring);
        //console.log(parsedData);
        var responseObj = parsedData.data.responseJSON.LocatorResponse;
        var dropLocations = responseObj.SearchResults.DropLocation;
        var widgetPanel = plugin.$T.find('.ups-widget_panel');
        var getDirectionsLabel = $(widgetPanel).data('direction-label'),
            phoneLabel = $(widgetPanel).data('phone-label'),
            locHoursLabel = $(widgetPanel).data('lochours-label');
        var dropLoc= '';
        if ($.isArray(dropLocations)) {
            dropLoc = dropLocations[0];
        }else{
            dropLoc = dropLocations;
        }
        var nearestLocation=dropLoc.AddressKeyFormat;
        var nearestLocationTitle = nearestLocation.ConsigneeName;
        var nearestLocationAddress = (nearestLocation.AddressLine!==undefined?nearestLocation.AddressLine:'')+" "+(nearestLocation.PoliticalDivision2!==undefined?nearestLocation.PoliticalDivision2:'')+" "+(nearestLocation.PoliticalDivision1!==undefined?nearestLocation.PoliticalDivision1:'')+" "+(nearestLocation.PostcodePrimaryLow!==undefined?nearestLocation.PostcodePrimaryLow:'') + " " + (nearestLocation.CountryCode!==undefined?nearestLocation.CountryCode:'');
        var phoneNumber = dropLoc.PhoneNumber;
        var locationId = dropLoc.LocationID;
       // console.log(hrsOfOperation);
        var arrOfOprt=[];
        for(var i = 0; i < 7; i++){
            var finalDate ={};
            var date = new Date(Date.UTC(2017, 0, i));
            finalDate.key=date.toLocaleDateString(plugin.engLangLocale, { weekday: 'short' });
            finalDate.label=date.toLocaleDateString(plugin.dateLang, { weekday: 'short' });
            arrOfOprt.push(finalDate);
        }
        arrOfOprt.push({"key":"Closed","label":plugin.options.langJSON.closed});
        //console.log("finalDate ===============",arrOfOprt);
        var hrsOfOperation = dropLoc.StandardHoursOfOperation;
        //var stdOp=dropLoc.StandardHoursOfOperation;
        $.each(arrOfOprt,function(i,val){
            console.log(i, val);
            if(hrsOfOperation.indexOf(this.key)>-1 && this.label && this.label.trim().length>0){
                hrsOfOperation = hrsOfOperation.replace(this.key,this.label);
            }
        });
        //console.log(stdOp);
        
        var localeHrsOp = dropLoc.OperatingHours.StandardHours;
        /*var specialInstructions = dropLocations[0].NonStandardHoursOfOperation;*/
        // if(dropLoc.hasOwnProperty('SpecialInstructions') && dropLoc.SpecialInstructions.hasOwnProperty('Segment')){
        //     var specialInstructions = dropLoc.SpecialInstructions.Segment;
        // }
        var mapLong = dropLoc.Geocode.Longitude;
        var mapLat = dropLoc.Geocode.Latitude;
        hrsOfOperation = hrsOfOperation.replace(/;/g, '<br>');

        var addressGeocode , geoLong='', geoLat='';
        if (responseObj.Geocode) {
            addressGeocode = responseObj.Geocode;
            geoLong = addressGeocode.Longitude;
            geoLat = addressGeocode.Latitude;
        } else {
            geoLong = userPosition.coords.longitude.toString();
            geoLat = userPosition.coords.latitude.toString();
        }
        plugin.$infoContainer.show();
        plugin.$infoContainer.find('.ups-locFinder_wrap').addClass(UPS.configs.activeClass);
        //plugin.$exception.hide();
        plugin.$locNotFound.hide();
        plugin.$panel.find('.ups-event-locator').closest('.ups-locFinder_wrap').hide();

        plugin.$info.empty();
        var dirURL='';
        if (UPS.configs.viewport.size === 'large' || UPS.configs.viewport.size === 'xlarge') {
            dirURL = 'https://www.ups.com/dropoff/rte?reqType=print_directions&loc='+plugin.options.locale+'&country='+plugin.options.country+'&Locations=' + locationId + '&appid=WEMS&geolat=' + geoLat + '&geolong=' + geoLong + '&uom=MI&to_geolat=' + mapLat + '&to_geolong=' + mapLong + '&is_wwef=false&mapVendorSessionKey='+plugin.key+'&data-content-block-id=W1';
            /*var locHtml = '<h3>' + nearestLocationTitle + '</h3>\
             <address>' + nearestLocationAddress + '</address>\
             <a href="' + dirURL + '" class="ups-locFinder_dirLink" data-event-id="22" data-content-block="W1">' + getDirectionsLabel + '</a> <br>\
             <span class="ups-locFinder_phone">' + phoneLabel + ' <a href="tel:' + phoneNumber + '">' + phoneNumber + '</a></span>'*/
            //var $infoCopy = $('<div class="ups-locFinder_copy"/>').appendTo($info);

            //$infoCopy.append($(locHtml));
        } else {
            dirURL = 'https://maps.google.com/maps?saddr=&daddr=' + nearestLocationAddress + ',US&h1=en';
        }
        var locHtml;
        var warningText;
        var locHtml_1 = '<h3>'+nearestLocationTitle+'</h3><address>'+nearestLocationAddress+'</address>';
        var locHtml_2 = '<a href="'+dirURL+'" class="ups-locFinder_dirLink" data-event-id="22" data-content-block="W1">'+getDirectionsLabel+'</a> <br>'+(phoneNumber!==undefined?'<span class="ups-locFinder_phone">' + phoneLabel + ' <a href="tel:' + phoneNumber + '">' + phoneNumber + '</a></span>':'');

        if(dropLoc.hasOwnProperty('SpecialInstructions') && dropLoc.SpecialInstructions.hasOwnProperty('Segment')){
            var specialInstructions = dropLoc.SpecialInstructions.Segment;
            var specialString = specialInstructions.toString();
            var instructionCount = specialString.length;
            //var $locEl = $('.ups-locFinder_wrap');

            if(instructionCount > 100){
                var str1 = specialString.substring(0, 100),
                    str2 = specialString.substring(100);
                if (UPS.configs.viewport.size === 'small' || plugin.$T.parents('.col-lg-4').length>0){
                    warningText = '<div class="ups-locFinder_alert">'+'<span>'+'<span class="icon ups-icon-alert-location" aria-hidden="true">' + '</span>' + plugin.options.langJSON.noteMsg + '</span>' +'</span>' + '<span class="maintext">' + str1 + '</span>' +'<span class="toggleSection">' + str2 + '</span>' + '<button type="button" id="ups-contentToggle" class="ups-locFinder_toggle">'+plugin.options.langJSON.showMsg+'<span class="icon ups-icon-chevrondown" aria-hidden="true" style=""></span></button></div>';
                }else{
                    $('<div class="ups-locFinder_alert">'+'<span>'+'<span class="icon ups-icon-alert-location" aria-hidden="true">' + '</span>' + plugin.options.langJSON.noteMsg + '</span>' +'</span>' + '<span class="maintext">' + str1 + '</span>' +'<span class="toggleSection">' + str2 + '</span>' + '<button type="button" id="ups-contentToggle" class="ups-locFinder_toggle">'+plugin.options.langJSON.showMsg+'<span class="icon ups-icon-chevrondown" aria-hidden="true" style=""></span></button>').prependTo(plugin.$panel);
                }

                plugin.$togglePanel = plugin.$T.find('.ups-locFinder_toggle');
                plugin.$togglePanel.on('click', function() {

                    var toggleText = plugin.$togglePanel[0].innerText;
                    if(toggleText === plugin.options.langJSON.showMsg){
                        plugin.$togglePanel.html(plugin.options.langJSON.hideMsg+'<span class="icon ups-icon-chevronup" aria-hidden="true"></span>');
                    }else{
                        plugin.$togglePanel.html(plugin.options.langJSON.showMsg+'<span class="icon ups-icon-chevrondown" aria-hidden="true"></span>');

                    }
                    plugin.$T.find('.toggleSection').toggle();
                });
            } else{
                if (UPS.configs.viewport.size === 'small' || plugin.$T.parents('.col-lg-4').length>0){
                    warningText = '<div class="ups-locFinder_alert">'+'<span>'+'<span class="icon ups-icon-alert-location" aria-hidden="true">' + '</span>' + plugin.options.langJSON.noteMsg + '</span>'+'</span>' + '<span> '+specialString+'</span></div>';
                    //locHtml = locHtml_1 +  warningText + locHtml_2;
                }else{
                    $('<div class="ups-locFinder_alert">'+'<span>'+'<span class="icon ups-icon-alert-location" aria-hidden="true">' + '</span>' + plugin.options.langJSON.noteMsg + '</span>'+'</span>' + '<span> '+specialString+'</span>').prependTo(plugin.$panel);
                    //locHtml = locHtml_1 +  locHtml_2;
                }
            }
        }

        if(warningText){
            locHtml = locHtml_1 +  warningText + locHtml_2;
        }else{
            locHtml = locHtml_1 +  locHtml_2;
        }

        //var alertCopy = '<span><span class="icon ups-icon-exclamationcircle" aria-hidden="true"></span>'+ data.alert.label + ':</span> ' + data.alert.content;
        var $infoCopy = $('<div class="ups-locFinder_copy"/>').appendTo(plugin.$info);
        $infoCopy.append($(locHtml));

        $infoCopy.find('.ups-locFinder_dirLink').bind('click',function(){
            var _selfInstance=$(this);
            plugin._setAnalytics(_selfInstance);
            window.location.href=_selfInstance.attr('href');
        });

        $('.ups-locFinder_current').prev($('.ups-locFinder_info')).empty();
        //var $infoCopy = $('.ups-locFinder_copy');
        var locationHrs = $('<div class="ups-locFinder_hours"/>').appendTo($infoCopy);
        var tools = $('.ups-locFinder_wrap').closest($('.ups-tool'));

        if ($(tools)) {
            $('<p class="ups-locFinder_hoursTog"/>').html(locHoursLabel + '<br> <span> ' + hrsOfOperation + '</span>').appendTo($(locationHrs));
        } else {
            $('<button class="ups-locFinder_hoursTog"/>').html(locHoursLabel + '<br> <span> ' + hrsOfOperation + '</span>').appendTo($(locationHrs)).on('click', function() {
                $(locationHrs).toggleClass(UPS.configs.activeClass);
            });
        }
        
        plugin.getLocation(addressGeocode, userPosition, mapLong, mapLat);
    };

    Plugin.prototype.noMap = function() {
        var plugin=this;
        if ($(".ups-locFinder_loader").length) {
            $(".ups-locFinder_loader").detach();
        }
        plugin.$locMsg = plugin.$locNotFound.show();
        plugin.$locMsg.prependTo(plugin.$mapWrap);
    };

    //Function to pass coordinates for both request and load show map.
    Plugin.prototype.getLocation = function(addressGeocode, userPosition, mapLong, mapLat) {
        var plugin=this;
        var  $loader = $('<div class="ups-locFinder_loader"/>');
        if (mapLong && mapLat) {
            if (!$(".ups-locFinder_loader").length) {
                $loader.prependTo(plugin.$mapWrap);
            }
            plugin.$map.removeClass(UPS.configs.activeClass);
            //$loader.prependTo(plugin.$mapWrap);
            plugin.createMap(addressGeocode, userPosition, mapLong, mapLat);
            //mapImg(addressGeocode, userPosition, mapLong, mapLat);
        } else {
            plugin.noMap($loader);
        }
    };

    Plugin.prototype.createMap = function(addressGeocode, userPosition, mapLong, mapLat) {
        var plugin = this;
        var  $loader = $('<div class="ups-locFinder_loader"/>');
        try {
            var i;
            for (i = 0; i < plugin.$map.length; i++) {
                var mapCont = plugin.$map[i];
                var mapOpts = {
                    credentials: plugin.key,
                    center: new Microsoft.Maps.Location(mapLat, mapLong),
                    mapTypeId: Microsoft.Maps.MapTypeId.road,
                    zoom: 15,
                    showDashboard: false,
                    disableUserInput: true
                };

                $(".ups-locFinder_loader").detach();

                var map = new Microsoft.Maps.Map(
                    mapCont,
                    mapOpts
                );
                var pin = new Microsoft.Maps.Pushpin(mapOpts.center, {
                    icon: '/assets/resources/images/UPS_shield_32.png',
                    anchor: new Microsoft.Maps.Point(16, 16),
                    text: '1'
                });
                map.entities.push(pin);
                plugin.$map.addClass(UPS.configs.activeClass).bind('click',function(e){
                    e.preventDefault();
                    var _selfInstance=$(this);
                    plugin._setAnalytics(_selfInstance);
                    window.location.href=_selfInstance.attr('href');
                });

                $(".ups-locFinder_loader").detach();
            }
        } catch (err) {
            if (typeof(Microsoft) === "undefined" || document.message === "'Microsoft' is undefined") {
                plugin.noMap($loader);
            }
        }
        $('.MicrosoftMap').attr("aria-hidden","true");
    };


    // Plugin.prototype.mapImg = function(addressGeocode, userPosition, mapLong, mapLat) {
    //     var plugin=this;
    //     plugin.$map.empty();
    //     var mapUrlBegin = 'http://dev.virtualearth.net/REST/V1/Imagery/Map/Road/' + mapLat + ',' + mapLong + '/';
    //     var mapUrlEnd = '&pp=' + mapLat + ',' + mapLong + ';63;UPS&key=' + key;

    //     //var smMap = mapUrlBegin + '17?ms=400,225' + mapUrlEnd;
    //     var mdMap = mapUrlBegin + '17?ms=800,450' + mapUrlEnd;
    //     //var lgMap = mapUrlBegin + '17?ms=1600,900' + mapUrlEnd;

    //     var $img = $('<img src="' + mdMap + '"/>');

    //     $(".ups-locFinder_loader").detach();
    //     $img.appendTo(plugin.$map);
    // };

    /**
     * Generic jQuery plugin instantiation method call logic
     *
     * Method options are stored via jQuery's data() method in the relevant element(s)
     * Notice, myActionMethod mustn't start with an underscore (_) as this is used to
     * indicate private methods on the PLUGIN class.
     */
    $.fn[PLUGIN_NS] = function (methodOrOptions) {
        if (!$(this).length) {
            return $(this);
        }
        var instance = $(this).data(PLUGIN_NS);

        // CASE: action method (public method on PLUGIN class)
        if (instance && (methodOrOptions.hasOwnProperty('indexOf') && methodOrOptions.indexOf('_') !== 0) && instance[methodOrOptions] && typeof (instance[methodOrOptions]) === 'function') {

            return instance[methodOrOptions](Array.prototype.slice.call(arguments, 1));


            // CASE: argument is options object or empty = initialise
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {

            instance = new Plugin($(this), methodOrOptions); // ok to overwrite if this is a re-init
            $(this).data(PLUGIN_NS, instance);
            return $(this);

            // CASE: method called before init
        } else if (!instance) {
            $.error('Plugin must be initialised before using method: ' + methodOrOptions);

            // CASE: invalid method
        } else if (methodOrOptions.indexOf('_') === 0) {
            $.error('Method ' + methodOrOptions + ' is private!');
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist.');
        }
    };
})(jQuery);
