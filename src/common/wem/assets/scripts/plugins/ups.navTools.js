
(function( $ ) {
    'use strict';

    var PLUGIN_NS = 'upsNavTools';

    var Plugin = function( target, options ) {
        var plugin = this;
        plugin.$T = $(target);

        plugin.options = $.extend(
            true, // deep extend
            {},
            options
        );

        plugin.$toggle = plugin.$T.find('.ups-toolsToggle');
        plugin.$toolList = plugin.$T.find('.ups-headerTools_list');
        plugin.$msg = plugin.$T.find('.ups-headerTools_msg');
        plugin.$widgets = plugin.$T.find('.ups-headerTools_widgets');
        plugin.$toolsLi = plugin.$T.find('.ups-toolCont');
        plugin.$toolWrap = plugin.$T.find('.ups-toolWrap');
        plugin.$tools = plugin.$T.find('.ups-tool');
        plugin.$quickstart = $('#ups-headerTools');
        plugin.$toolsLink = plugin.$T.find('.ups-headerTools_widgetToggle');
        plugin.$headerContainer= plugin.options.header;

        plugin.isActive = plugin.$T.hasClass(UPS.configs.activeClass);
        plugin.duration = 200;

        plugin._init( target, options );
        //plugin.$quickstart = plugin.$T.find('#ups-headerTools');
        return plugin;
    };

    Plugin.prototype._init = function() {
        var plugin = this;
        plugin._bindToggle();
        plugin._bindTools();
        plugin._setAriaTags();
        plugin._widgetFocus();

        /** MHD Implementation**/
        plugin.$panel = plugin.$T.find('.ups-widget_panel');

        //CT code starts here
        plugin.dpRequest ='';
        plugin.ajaxOptions ='';
        plugin._isMultipleQSView=false;
        plugin._isMultipleBodyView=false;
        plugin._isMultiEnrollType=false;
        plugin._enrollmentStatus='';
        var lang = plugin.options.lang;
        //var lang = wems_locale;
        plugin.lang = lang !==undefined ? lang.split('_').join('-') : '';

        /*plugin.options.language = multilingual;
        plugin.options.shipmentTag = seeShipment;
        plugin.options.locale = plugin.options.locale;*/
        plugin.authInfo = {
            "UPSSecurity": {
                "UsernameToken": {
                    "Username": authentication.uname,
                    "Password": authentication.upwd
                },
                "ServiceAccessToken": {
                    "AccessLicenseNumber": authentication.akey
                }
            }
        };

        plugin.metInfo = {
            "DeliveryPlannerDataRequest": {
                "Request": {
                    "RequestOption": "",
                    "TransactionReference": {
                        "CustomerContext": "",
                        "TransactionIdentifier": ""
                    }
                },
                "RequestData": {
                    "ClientId": "wrkspc",
                    "DeliveryPlannerRequest": "1",
                    "DateRange": {
                        "StartDate": plugin.startDate(),
                        "EndDate": plugin.endDate()
                    },
                    "Locale": plugin.options.locale,
                    "MaxNumberShipments": "20",
                    "AddressToken": ""
                }
            }
        };


        /*if (plugin.$panel.find('.manage-deliveries_header').length > 0) {
            setTimeout(function(){
                plugin.mhdOnload();
            },500);
        } else {
            return;
        }*/

        //plugin.$dateToggle = plugin.$T.find('.date_toggle');
        //plugin.$calendarPackageInfo = plugin.$T.find('.calendar-package-info');
        //plugin.$packageInfo = plugin.$T.find('.package-info');
        //plugin.$select = plugin.$T.find('.ups-dropdown');
        //plugin.$packageTotal = plugin.$T.find('.package-total');
        //plugin.$calendarDates = plugin.$T.find('.calendar-dates');
        //plugin.$upsCTA = plugin.$T.find('.ups-cta');



        /*plugin._updateToggleBtn();
        $(window).on('windowResize', function () {
            plugin._updateToggleBtn();
        });*/

        //plugin._setMinHeight();

        var processServiceResponse = function (res) {
            //////console.log(options);
            /*if(plugin.checkStubUser()){
                plugin.success(plugin.stubResponse());
            }else*/
            if (res.data.isError) {
                //plugin.networkError(res.data.statusText);
            }else {
                var jsonData;
                try {
                    jsonData = eval("(" + res.data.responseText + ")");
                    /** Fix for eval is harmful JSLint issue. Commented till next update from Stephen**/
                	/*var $responseObj = JSON.stringify(res.data.responseText);
                    jsonData = JSON.parse($responseObj);*/
                    /** Fix for eval is harmful JSLint issue. Commented till next update from Stephen**/
                }
                catch(r) {
                    plugin.error();
                    return;
                }
                if (jsonData.hasOwnProperty("Fault")) {
                    plugin.error();
                } else {
                    plugin.success(jsonData);
                }
            }
           // $.Topic("deliveryPlanner").unsubscribe(processServiceResponse);
        };

        $.Topic("deliveryPlanner").subscribe(processServiceResponse);
        //plugin.bindEvents();
         /** MHD Implementation**/

        $(window).on('windowResize',function(){
            plugin._setAriaTags();
        });
        var head = '#ups-navContainer';
        plugin._changeQuickStartText();
        if($(head).data('home')) {
            plugin.openTools();
            /** MHD Implementation**/
            if($('li[data-key=Manage_Home_Deliveries]').length > 0 && $('#ups-header').attr('data-islogged') === "true"){
                plugin.mhdOnload();
            }
            /** MHD Implementation**/
            $(head).data('quickclose','true');
            $(window).scroll(function () {
                if ($(window).scrollTop() > $('body').height() / 2 && $(head).data('quickclose') === 'true') {
                  plugin.closeTools();
                  $(head).data('quickclose','false');
                }
            });
        }

        plugin.$toolList.on('click', function(e) {
            e.stopPropagation();
        });
       
        /* 496720 Quickstart and Widget Escape and Focus out functionality */
        $(document).on('keydown',function(e){
            if(e.keyCode === 27) { // ESC
            	var isFlyoutActive = $('.ups-headerTools_widgets .ups-toolCont').hasClass(UPS.configs.activeClass);
            	if(isFlyoutActive){
            		var whichFlyout = $('.ups-headerTools_widgets .ups-toolCont.ups-active');
            		$(whichFlyout).find('.ups-headerTools_widgetClose').click();
            		//widgetOff();
                	//clearTimeout(plugin.$clearToolTimeout);
            	}else{
            		plugin.closeTools();
            	}
            	
            }
        });

        $('#ups-quickStartMenu, #ups-quickStartPanel').on('focusout',function(){
	    	var $elem = $(this);
	    	setTimeout(function() {
	            var hasFocus =  ($elem.parent().find(':focus').length > 0);
	            if (! hasFocus) {
	                plugin.closeTools();
	                UPS.configs.$body.removeClass('ups-navOpen');
	            }
	        }, 100);
    	
    	});
        /*function widgetOff(){
        	var widgetToggle = plugin.$toolsLi.find('.ups-headerTools_widgetToggle');
        	plugin.$toolsLi.removeClass(UPS.configs.activeClass);
        	plugin._setAriaTags();
	    }
        function toolFocusLose(){
        	plugin.$clearToolTimeout = setTimeout(function(){
    	    	widgetOff();
    	    	},500); 
    	}
        
        $('.ups-toolCont > a').each(function(){
            $(this).focusout(function(e) {
                if(!(plugin.$eventType == 'mousedown')){
                    var $elem = $(this);
                    if($elem.parent().hasClass(UPS.configs.activeClass)){
                        setTimeout(function(){
                            var hasFocus = !! ($elem.next().find(':focus').length > 0);
                            if (! hasFocus) {
                                toolFocusLose();    
                            }
                        },100);
                    }
                }
            });
            $(this).focusin(function(e) {
                
                    var $elem = $(this);
                    if(!$elem.parent().hasClass(UPS.configs.activeClass)){
                        toolFocusLose();
                    }
                
            });
        });
        
        $('.ups-toolWrap .ups-tool').focusin(function() {
        	clearTimeout(plugin.$clearToolTimeout);
        });
        $('#ups-header_logo, .ups-menu_toggle').focusin(function() {
        	plugin.closeTools();
        });*/
        
        return plugin;
    };

    /** MHD Implementation**/
    /*Plugin.prototype.bindEvents = function(){
      //  var plugin = this;
        $(".quickStart_manageHomeDeliveries").on('click', function (event) {
            event.preventDefault();
            //plugin.mhdOnload();
        });

        $(plugin.$T).on("click",".delivery-tracking-num > .ups-link",function(){
            var _self=$(this);

            var form=_self.parents('form');
            form.find("#trackNums").val(_self.text());
            form.submit();
        });
    };*/

    Plugin.prototype._widgetFocus = function(){
    	var plugin = this;
    	plugin.$toolsLi;
    	plugin.$toolWrap;
    	plugin.$toolsLink;
    	$('.ups-headerTools_widgetToggle, .ups-toolWrap').focusout(function(){
    		var $elem = $(this);
    		if(plugin.$toolsLi.hasClass(UPS.configs.activeClass) && UPS.configs.viewport.size !== 'small'){
    			plugin.$clearMenuTimer = setTimeout(function(){
            		var hasFocus = !! ($elem.parent().find(':focus').length > 0);
				        if (! hasFocus) {
				        	plugin.$toolsLi.removeClass(UPS.configs.activeClass);
				        	plugin._setAriaTags();
				        }
                },100);
    		}
    	});
    };

    Plugin.prototype.startDate = function(){
            var plugin = this;
            var sDate = plugin.getUTCDate();
            var month = sDate.getMonth() + 1;

            if(month < 10){
                month = '0' + month;
            }
            var date = sDate.getDate();
            if(date < 10){
                date = '0' + date;
            }
            return  ""+sDate.getFullYear() + month + date;
        };

     Plugin.prototype.endDate = function(){
            var plugin = this;
            var eDate = plugin.addDays(plugin.getUTCDate(), 7);
            var month = eDate.getMonth() + 1;

            if(month < 10){
                month = '0' + month;
            }
            var date = eDate.getDate();
            if(date < 10){
                date = '0' + date;
            }
            return ""+eDate.getFullYear() + month + date;
    };

    Plugin.prototype.getUTCDate = function(){
        var odate = new Date();
        return new Date(odate.getFullYear(), odate.getMonth(),odate.getDate(), 0,0, 0);
        //return odate;
    };

    Plugin.prototype.addDays = function(date, days){

        var tzOff = date.getTimezoneOffset() * 60 * 1000,
                t = date.getTime(),
                d = new Date(),
                tzOff2;

        t += (1000 * 60 * 60 * 24) * days;
        d.setTime(t);

        tzOff2 = d.getTimezoneOffset() * 60 * 1000;
        if (tzOff !== tzOff2) {
            var diff = tzOff2 - tzOff;
            t += diff;
            d.setTime(t);
        }
        return d;

    };

    /*Plugin.prototype._updateToggleBtn = function () {
        var plugin = this;

        plugin.$dateToggle.css('height', plugin.$dateToggle.css('width'));

        return plugin;
    };

    Plugin.prototype._setMinHeight = function () {
        var plugin = this;

        var minHeight = parseInt(plugin.$calendarPackageInfo.css('min-height'));

        $(plugin.$packageInfo).each(function () {
            if (parseInt($(this).css('height')) > minHeight) {
                minHeight = parseInt($(this).css('height'));
            }
        });

        plugin.$calendarPackageInfo.css('min-height', minHeight);

        return plugin;
    };*/

    //Plugin.prototype.networkError =  function () {
        //display network error
        /*var plugin = this;
        if(plugin.options.isBody){
            plugin.$T.find("#dpWidgetView").empty();
        }else{
            plugin.$T.find("#dpQuickStartView").empty();
        }
        plugin.$panel.html('<div class="ups-widget_errors">'+plugin.$panel.attr('data-mhdunavailable')+'</div>');
        plugin.$panel.append('<div class="manage-deliveries_cta clearfix"><a href="'+plugin.options.shipmentTag.url+'" title="'+plugin.options.shipmentTag.title+'" class="ups-cta ups-analytics" data-content-block-id="W5" data-event-id="21" data-content-id="'+plugin.options.shipmentTag.contentBlock+'">'+plugin.options.shipmentTag.title+'</a></div>');*/
        //plugin.$T.find("#dpWidget").find('.ups-widget_panel').empty();
        //plugin.$T.find(".ups-manage-deliveries .ups-widget_panel .ups-widget_errors").show();
    //};
    /** MHD Implementation**/

    //Plugin.prototype._bindToggle = function() {}

    Plugin.prototype._changeQuickStartText = function() {    
        var plugin = this;
        //console.log("play start")
        var $welcomeElm=plugin.$T.find(".ups-headerTools_msg > h3");
        if($welcomeElm[0]!==undefined && $welcomeElm[0].innerHTML!==undefined){
            var $searchStr='';
            if(plugin.$T.find("#ups-userName").text()!==undefined && plugin.$T.find("#ups-userName").text().trim()!==''){
                $searchStr = plugin.$T.find("#ups-userName").text().trim();
            }else{
                $searchStr = plugin.$headerContainer.find(".ups-account > a.ups-menu_toggle").clone().children().remove().end().text().trim();
            }
            //console.log($welcomeElm[0].innerHTML);
        
            var $welcomeStr = $welcomeElm[0].innerHTML;
            if($searchStr && $searchStr!=='' && $welcomeStr.indexOf($searchStr) < 0){
                if($welcomeStr.search(/,\s/)>=0){
                    $welcomeElm.html($welcomeStr.replace(/,\s/,""));
                    // console.log($welcomeStr)
                }
            }
        }else{
            console.log("QuickStart Welcome Message does not exist.");
        }
    };
    
    Plugin.prototype._bindToggle = function() {
        var plugin = this;

        plugin.$toggle.on('click', function(e) {
            e.stopPropagation();
            if(plugin.isActive) {
                plugin.closeTools();
                UPS.configs.$body.removeClass('ups-navOpen');
            } else {
                plugin.openTools();
                /** MHD Implementation**/
                if($('li[data-key=Manage_Home_Deliveries]').length > 0 && plugin.$headerContainer.attr('data-islogged') === "true"){
                    plugin.mhdOnload();
                }
                /** MHD Implementation**/
            }
            plugin._setAnalytics($(this));
        });
        
        plugin.$toggle.on('keydown',function(e){
        	if(e.keyCode === 32){
        		e.preventDefault();
        		$(this).click();
        	}
        });

        

    Plugin.prototype.success = function(resp) {
        var plugin = this;
        plugin.$panel.find(".ups-widget_errors").hide();
        plugin.transform(resp);
        //plugin._bindClick();
    };

    Plugin.prototype.error = function () {
        var packageCount = 0;
        plugin.$T.find("#ups-quickStartDeliveryShow").append('<span class="ups-package-notification">'+packageCount+'</span>');
    };

    //--------------------------------------------------
    // Transform webservice response JSON to
    //     Delivery Planner JSON
    //--------------------------------------------------
    Plugin.prototype.packageDisplay = function(totalNum){
    	var hasPack = plugin.$T.find("#ups-quickStartDeliveryShow .ups-package-notification").length; 
    	if(!hasPack){
    		plugin.$T.find("#ups-quickStartDeliveryShow").append('<span class="ups-package-notification">'+totalNum+'</span>');
    	}else{
    		plugin.$packageNumber = plugin.$T.find("#ups-quickStartDeliveryShow .ups-package-notification");
    		plugin.$packageNumber.text(totalNum);
    	}
    };

    Plugin.prototype.transform = function(accountData){
        var plugin = this;
        ////console.log("In transform");
        // eval starts here
        // var jsonData;
        // try {
        //     jsonData = eval("(" + data + ")");
        // }
        // catch(r) {
        //     return;
        // }
        //eval ends here
        //var accountData = jsonData; //JSON.parse(data);
        /** Fix for eval is harmful JSLint issue. Commented till next update from Stephen**/
        /*accountData = JSON.parse(accountData);*/
        /** Fix for eval is harmful JSLint issue. Commented till next update from Stephen**/
        var accounts = accountData.DeliveryPlannerDataResponse.DeliveryPlannerEnrollmentResponse;
        if(accounts!==undefined && accounts.Enrollments!==undefined){
            accounts = accounts.Enrollments;
        }

        var shipmentRecords=accountData.DeliveryPlannerDataResponse.DeliveryPlannerShipmentResponse;
        if(shipmentRecords!==undefined){
            shipmentRecords= shipmentRecords.InboundShipments;

        var packageCount = 0;
            if(shipmentRecords !== undefined && shipmentRecords !== "undefined"){
                if(Array.isArray(shipmentRecords.Shipment) === true){
                    packageCount = shipmentRecords.Shipment.length;
                }else{
                    tempArray = [];
                    var tempVar = shipmentRecords.Shipment;
                    tempArray.push(tempVar);
                    packageCount = tempArray.length;
                }
                plugin.packageDisplay(packageCount);
            }else{
            	plugin.packageDisplay(packageCount);
            }

           }

    };

    /**

    This function is not required as we are not binding any event for Manage Home Delivery
    Plugin.prototype._bindClick = function () {
        var plugin = this;

        $(plugin.$T).on('click keypress','.date_toggle', function (e) {
            var _self = $(this);
            var packageInfo = _self.parents('.manage-deliveries_calendar').find('.package-info');
            _self.parents('.calendar-dates').find('.date_toggle').attr('data-active', 'false');
            _self.attr('data-active', 'true');


            var day = _self.attr('data-day');
            packageInfo.attr('data-active', 'false');
            $(packageInfo).each(function () {
                if ($(this).data('day') === day) {
                    $(this).attr('data-active', 'true');
                }
            });

            // For keyboard accessibility, select first selectable el in tab,
            // prepare for next tab in selection.
            if (e.which === 13) {
                var focusable = plugin.$calendarPackageInfo.find(':focusable');

                var nextTab = _self.closest('.col-date').next().find('.date_toggle')[0];

                plugin.nextTab = nextTab;
                plugin.count = focusable.length;
                plugin.tabContentFocus = 0;
                if(focusable[0]) {
                    focusable[0].focus();
                }
            }
        });

        plugin.$calendarPackageInfo.on('focusout', function(){
            //var prevTabContentFocus = plugin.tabContentFocus;
            plugin.tabContentFocus += 1;
            if (plugin.tabContentFocus < plugin.count) {
            }
            else {
                if(plugin.nextTab) {
                    plugin.nextTab.focus();
                } else {
                    plugin.tabContentFocus = -1;
                    plugin.$upsCTA.focus();
                }
            }
        });


        return plugin;
    };**/

    /*Plugin.prototype._multipleAccountQSView=function(accounts,_deliveries){
        var plugin=this;
        if(accounts!==undefined && accounts.length>1){
            if(!plugin._isMultipleQSView){
                var qsAccOptionsHtml = '';
                qsAccOptionsHtml += '<label for="manage_account_select_address" class="ups-form_label">'+plugin.$panel.attr('data-deliveryaddress-text')+'</label>\n';
                qsAccOptionsHtml += '<div class="header-qs-container clearfix">\n';
                qsAccOptionsHtml += '<div class="ups-dropdown_wrapper">\n';
                qsAccOptionsHtml += '<select id="manage_account_select_address" name="manage_account_filter" class="ups-dropdown ups-multipleAccount">\n';
                $.each(accounts, function(i){
                    if(this.EnrollmentStatus==='ACTIVE'){
                        qsAccOptionsHtml += '<option value="'+this.AddressToken+'">' + this.EnrollmentName + '</option>\n';
                    }
                });
                qsAccOptionsHtml += '</select>\n';
                qsAccOptionsHtml += '</div>\n';
                plugin.$T.find("#dpQSAccountOptions").html(qsAccOptionsHtml);
                plugin.$T.find('.ups-multipleAccount').bind('change',function(){
                    var _selfInstance=$(this);
                    plugin._setAjaxMultipleAccount(_selfInstance.val(),"4");
                });
                //plugin._setAjaxMultipleAccount(accounts[0].AddressToken,1);
            }
            //var _deliveriesShipment = plugin.deliveries(_deliveries.Shipment);
            plugin.quickStartFragment(_deliveries);

        }
    };


    Plugin.prototype.deliveries = function(deliveries){
        //console.log(deliveries);
        var plugin = this;
        var dayDeliveries = [];
        if(!$.isEmptyObject(deliveries)){
            if(!$.isArray(deliveries)){
                deliveries = $.makeArray(deliveries)
            }

            //Grabs information of each shipment returned by web services which is stored in deliveries object
            $.each(deliveries, function(i, item) {
                console.log(i, item);
                //if(!deliveries[i].ScheduledDeliveryDate){
                    dayDeliveries.push({
                        "date": (!deliveries[i].ScheduledDeliveryDate ? (plugin.options.language.scheduleNotAvailable || 'Not Available') : plugin.formatDate(deliveries[i].ScheduledDeliveryDate)),
                        "time" : (!deliveries[i].ScheduledDeliveryDate ? (plugin.options.language.scheduleNotAvailable || 'Not Available') : plugin.processTime(deliveries[i].CommitTime)),
                        "carrier" : deliveries[i].ShipFromAddress.AttentionName,
                        "trackNo" : deliveries[i].TrackingNumber,
                        "status" : deliveries[i].Status.Status
                        //"changeDelivery" : plugin.options.language.changeDelivery
                    });
                // } else {
                //     dayDeliveries.push(
                //         {
                //             "date": plugin.formatDate(deliveries[i].ScheduledDeliveryDate),
                //             "time" : plugin.processTime(deliveries[i].CommitTime),
                //             "carrier" : deliveries[i].ShipFromAddress.AttentionName,
                //             "trackNo" : deliveries[i].TrackingNumber,
                //             "status" : deliveries[i].Status.Status
                //             //"changeDelivery" : plugin.options.language.changeDelivery
                //         }
                //     )
                // }
            });
        }

        var finalDeliveries = {"deliveries" : dayDeliveries};
        console.log("final deliveries" + JSON.stringify(finalDeliveries));
        return finalDeliveries;
    };

    Plugin.prototype.noDeliveryDateformat = function(dateString) {
        var plugin = this;
        var date = new Date(dateString),
                mOpts = {month: 'short'},
                dOpts = {day:'numeric'},
                wOpts = { weekday: 'short'};
        return date.toLocaleDateString(plugin.lang, wOpts) +', ' + date.toLocaleDateString(plugin.lang, mOpts) + ' '
                + date.toLocaleDateString(plugin.lang, dOpts);
    };

    Plugin.prototype.formatDate = function(dateString) {
    //console.log(dateString);
    var y = dateString.substr(0,4),
        m = dateString.substr(4,2) - 1,
        d = dateString.substr(6,2);
    var date = new Date(y,m,d);
    ////console.log((date.getFullYear() == y && date.getMonth() == m && date.getDate() == d) ? date : 'invalid date');
    return (date.getFullYear() == y && date.getMonth() == m && date.getDate() == d) ? date : 'invalid date';
    };

    Plugin.prototype.processTime = function(time, offset){
        var plugin = this;

        if(time === 'undefined' || time === null ||  time.length === 0 ){
            //|| offset === null || offset.length === 0
            return plugin.options.language.dayEnd;
        }else {
            var date = plugin.getUTCDate();
            date.setTime(parseInt(time));
            //var finalDate = new Date(date.getTime() + (3600000 * parseInt( offset)));
            var tOpts = {hour: '2-digit', minute:'2-digit',hour12:true};
            return date.toLocaleTimeString(plugin.lang, tOpts);
        }

    };

    Plugin.prototype.displayDate=function(date){
        console.log(date);
        var plugin=this;
        if(date ===plugin.options.language.scheduleNotAvailable){
            return date;
        } else {
            ////console.log("Display Date",date,plugin.day(date), date.toLocaleString(plugin.lang, { month: "short" }),date.getDate());
            return plugin.day(date)+", "+ date.toLocaleString(plugin.lang, { month: "short" })+" "+date.getDate();
        }
        ////console.log("Display Date",date,plugin.day(date), date.toLocaleString(plugin.lang, { month: "short" }),date.getDate());
        //return plugin.day(date)+", "+ date.toLocaleString(plugin.lang, { month: "short" })+" "+date.getDate();
    };

    Plugin.prototype.day = function(date){
        var plugin = this;
        return plugin.isEqualDates(date, plugin.getUTCDate()) ? plugin.options.language.today : plugin.dayFormat(date,'short').toLowerCase();
    };

    Plugin.prototype.isEqualDates = function(a,b){
        return (a.getDate() == b.getDate() && a.getMonth() == b.getMonth() && a.getYear() == b.getYear());
    };


    Plugin.prototype.getDates = function(days){

        var plugin = this;
        var deliveryDates = [];
        $.each(days, function(i, item){
            if(days[i].ScheduledDeliveryDate.length){
            deliveryDates.push(plugin.formatDate(days[i].ScheduledDeliveryDate));
            }
        });
        console.log(deliveryDates);
        return deliveryDates;

    };

    Plugin.prototype.checkActive = function(colValue){
        return (colValue !== null && colValue === 0);

    };

    Plugin.prototype.dayFormat = function(odate, weekday){
        var plugin = this;
        var wOpts = { weekday: weekday};
        return odate.toLocaleDateString(plugin.lang, wOpts);
    };

    Plugin.prototype.addDays = function(date, days){

        var tzOff = date.getTimezoneOffset() * 60 * 1000,
                t = date.getTime(),
                d = new Date(),
                tzOff2;

        t += (1000 * 60 * 60 * 24) * days;
        d.setTime(t);

        tzOff2 = d.getTimezoneOffset() * 60 * 1000;
        if (tzOff != tzOff2) {
            var diff = tzOff2 - tzOff;
            t += diff;
            d.setTime(t);
        }
        return d;

    };*/

    /** MHD Implementation**/
    //Generate AJAX request
    Plugin.prototype.generateAjaxRequestDeliveries = function() {
        var plugin=this;
        plugin.dpRequest = $.extend(plugin.dpRequest, plugin.metInfo);
    };

    // set AJAX options for the AJAX call
    Plugin.prototype.setAjaxOptionsDeliveries = function() {
        var plugin=this;
        //set ajax options
        plugin.ajaxOptions = {
            id: "deliveryPlanner",
            url: "DeliveryPlanner",
            data: JSON.stringify(plugin.dpRequest),
            dataType:"text"
        };
    };

    Plugin.prototype.publishAjaxCall = function(ajaxOptions) {
        $.Topic("Ajax").publish({
            ajaxOptions: ajaxOptions
        });
    };

    Plugin.prototype.mhdOnload = function() {
        var plugin = this;
        plugin.generateAjaxRequestDeliveries();
        plugin.setAjaxOptionsDeliveries();
        // To call the publish
        plugin.publishAjaxCall(plugin.ajaxOptions);
    };
    /** MHD Implementation**/

        plugin.$T.find(".ups-headerTools_links").find(".ups-analytics").click(function(e){
            e.preventDefault();
            var _self=$(this);
            plugin._setAnalytics(_self);
            if(_self.attr("target")!==undefined && _self.attr("target")!=='' && _self.attr("target")!=='_blank'){
                window.open(_self.attr('href'));
            }else{
                window.location.href=_self.attr('href');
            }
        });

        // Disabling right click on Quick start menu items
        //--------------------------------------------------
        plugin.$T.find('li a.ups-headerTools_widgetToggle').mousedown(function(){
			this.oncontextmenu = function() {return false;};
        });
        //--------------------------------------------------

        return plugin;
    };

    Plugin.prototype._setAnalytics=function(_self){
        //var plugin=this;
        var component = {
            link_page_name: document.title
        };
        component.navigation_class = _self.parents("div").attr("class");
        component.link_name = _self.clone().children().remove().end().text().trim();
        if (_self.attr("href") !== undefined) {
            component.destination_url = _self.attr("href");
        }
        if (_self.attr("data-event-id") !== undefined) {
            component.event_id = _self.attr("data-event-id");
        }
        if (_self.attr("data-content-block-id") !== undefined && _self.attr("data-content-block-id") !== "") {
            component.content_block_id = _self.attr("data-content-block-id");
        }
        if(typeof window.utag_data!=='undefined' && window.utag_data!==undefined){
            component.user_type=window.utag_data.user_type;
            component.site_indicator=window.utag_data.site_indicator;
            component.page_country_code=window.utag_data.page_country_code;
            component.state=window.utag_data.state;
            component.city=window.utag_data.city;
            component.myups_login_state=window.utag_data.myups_login_state;
            component.page_language=window.utag_data.page_language;
        }
        if(typeof window.utag !=='undefined' && window.utag !==undefined){
            window.utag.track('link',component);
        }
    };

    Plugin.prototype.getHTMLWidget=function(container,reqUrl,addClass) {
        if(!addClass){
            return;
        }
        var plugin=this;
        var param='';
        if(plugin.options.isTeam && plugin.options.isTeam==='true'){
            if(plugin.options.country!==undefined){
                param+="&country="+plugin.options.country;
            }
            if(plugin.options.locale!==undefined){
                param+="&locale="+plugin.options.locale;
            }
        }
        plugin.$promise = $.ajax({
            url:reqUrl+param,
            dataType:"HTML",
            beforeSend: function(){
                container.append('<div class="ups-loaderImg"></div>');
            },
            complete: function() {
                container.find('.ups-loaderImg').remove();
            }
        });

        plugin.$promise.done(function(data) {
            container.find(".ups-wrap").remove();
            container.append("<div class='"+addClass+" ups-wrap'>"+$(data).find(".ups-wrap").html()+"</div>");
            if(addClass==="ups-widget ups-manage-deliveries"){
            	setTimeout(function(){
            	container.find(".ups-manage-deliveries").upsManageDeliveries({
                    jsonURL: window.mhd_url,
                    isBody: false,
                    language:window.multilingual,
                    shipmentTag:window.seeShipment,
                    locale:plugin.options.locale,
                    lang:window.wems_locale
                });
            	},300);
            } else if(addClass==="ups-shipping ups-form_wrap ups-widget" || addClass==="ups-shipping ups-form_wrap ups-widget ups-authenticated"){
            	container.find(".ups-shipping").upsShipping({
                    isLoggedIn: $('#ups-header').data('islogged'),
                    pageContent: window.content,
                    locale:plugin.options.locale,
                });
            } else if(addClass==="ups-widget ups-quote ups-form_wrap"){
            	container.find(".ups-quote").upsQuote({
            		isLoggedIn: $('#ups-header').data('islogged'),
            		locale:window.wems_locale,
            		extLocale:plugin.options.locale,
                    country:plugin.options.country,
                    uomUrl:window.countryUOMURL,
                    content:window.quoteContent
            	});
            } else if(addClass==="ups-locFinder_wrap"){
                container.append("<form method='post' class='ups-location-detail' action='"+$(data).find(".ups-location-detail").attr("action")+"'>"+$(data).find(".ups-location-detail").html()+"</form>");
            	container.find(".ups-locFinder_wrap").upsLocFinder({
                    //keyGDOL: container.find(".ups-locFinder_wrap.ups-cont-white").attr('data-gdol'),
                    langJSON:window.locMsg,
                    keyWEMS: container.find(".ups-locFinder_wrap.ups-cont-white").attr('data-wem'),
                    locale:plugin.options.locale,
                    country:plugin.options.country
            	});
            }
            container.attr('tabindex','-1').focus();
            //plugin.formHeights(container);
        });

        // plugin.$promise.fail(function( ) {

        // });
    };

    Plugin.prototype._setAriaTags=function(){
        var plugin=this;
        //console.log(plugin.$tools,UPS.configs.viewport.size);
        $.each(plugin.$tools,function(){
            var $toolCont = $(this).closest('.ups-toolCont');
            if($toolCont!==undefined && $toolCont.length>0){
                var $toolWrap = $toolCont.find('.ups-toolWrap');
                var $toolToggle = $toolCont.find('.ups-headerTools_widgetToggle');
                if(UPS.configs.viewport.size !== 'small'){
                    $toolToggle.attr({'aria-expanded':false,'role':'button','aria-controls':$toolWrap.attr('id')});
                }else{
                    $toolToggle.removeAttr('aria-expanded').removeAttr('role').removeAttr('aria-controls');
                }
            }

        });
    };

    Plugin.prototype._bindTools = function () {
        var plugin = this;
        for (var iTools = 0; iTools < plugin.$tools.length; iTools++) {
            (function() {
                var $tool = $(plugin.$tools[iTools]);
                var $toolCont = $tool.closest('.ups-toolCont');
                var $toolToggle = $toolCont.find('.ups-headerTools_widgetToggle');
                var $toolClose = $tool.find('.ups-headerTools_widgetClose');
                var isActive;
                var $notToolCont=$tool.closest('li:not(.ups-toolCont)');

                $notToolCont.find('.ups-headerTools_widgetToggle').on('click',function(e){
                    e.preventDefault();
                    plugin._setAnalytics($(this));
                    window.location.href=$(this).attr('href');
                });
                
                $toolToggle.on('mousedown',function(e){
                	plugin.$eventType = e.type;
                });
                 $toolToggle.on('keydown',function(e){
                	plugin.$eventType = e.type;
                });

                $toolToggle.on('click', function(e) {
                    var _self=$(this);
                    if(UPS.configs.viewport.size !== 'small') {
                        e.preventDefault();
                        //clearTimeout(plugin.$clearToolTimeout);
                        isActive = $toolCont.hasClass(UPS.configs.activeClass);
                        plugin.$toolsLi.removeClass(UPS.configs.activeClass);
                        var widgetToggle=plugin.$toolsLi.find('.ups-headerTools_widgetToggle');
                        widgetToggle.attr('aria-expanded',false);
                       // widgetToggle.find('.ups-readerTxt').text(widgetToggle.find('.ups-readerTxt').attr('data-lang-show'));
                        plugin.$toolsLi.find('.ups-toolWrap').attr('aria-hidden',true);

                        $toolCont.toggleClass(UPS.configs.activeClass, !isActive);
                        $toolToggle.attr('aria-expanded',!isActive);
                        //$toolToggle.find('.ups-readerTxt').text($toolToggle.find('.ups-readerTxt').attr(isActive?'data-lang-show':'data-lang-hide'));
						$toolToggle.siblings(".ups-toolWrap").attr('aria-hidden',isActive);
                        var reqUrl=$toolCont.attr('data-url');
                        _self.attr('href',reqUrl);
                        var requiredClass;
                        if($toolCont.attr("data-key")==="Ship"){
                        	if($('#ups-header').data('islogged') === true){
                        		requiredClass = "ups-shipping ups-form_wrap ups-widget ups-authenticated";
                        	} else{
                        		requiredClass = "ups-shipping ups-form_wrap ups-widget";
                        	}

                        }else if($toolCont.attr("data-key")==="Quote"){
                            requiredClass = "ups-widget ups-quote ups-form_wrap";
                        }else if($toolCont.attr("data-key")==="Locations"){
                            requiredClass = "ups-locFinder_wrap";
                        }else if($toolCont.attr("data-key")==="Manage_Home_Deliveries"){
                            requiredClass = "ups-widget ups-manage-deliveries";
                        }else if($toolCont.attr("data-key")==="Billing" ){
                            requiredClass = "ups-billing_wrap";
                        }else {
                            requiredClass="";
                        }
                        if(!isActive) {
                            plugin.getHTMLWidget($toolCont.find(".ups-tool"),reqUrl,requiredClass);
                            plugin.toolHeight($tool);
                            //plugin.formHeights($tool);
                            UPS.configs.$body.addClass('ups-navOpen');
                            $(window).on('windowResize.fh'+iTools, function() {
                                plugin.toolHeight($tool);
                                //plugin.formHeights($tool);
                            });
                        } else {
                            $toolCont.find(".ups-tool").find(".ups-wrap").remove();
                            UPS.configs.$body.removeClass('ups-navOpen');
                            $('window').off('windowResize.fh'+iTools);
                        }
                        plugin._setAnalytics($(this));
                    } else {
                        plugin._setAnalytics($(this));
                        _self.attr('href',$toolCont.attr('data-svp'));
                        // if($toolCont.attr("data-key")=="Quote"){
                        // }
                    }
                });
                $toolToggle.on('keydown',function(e){
                	if(e.keyCode === 32 ){
                		e.preventDefault();
                		$(this).click();
                	}
                });

                $toolClose.on('click', function() {
                    $toolCont.removeClass(UPS.configs.activeClass);
                    UPS.configs.$body.removeClass('ups-navOpen');
                    $(this).siblings('.ups-widget').remove();
                    $('window').off('windowResize.fh'+iTools);
                    $(this).parents('.ups-toolWrap').prev().focus();
                });

            })();
        }

        $('.ups-headerTools_track').on('click', function() {
            plugin.$toolsLi.removeClass(UPS.configs.activeClass);
            UPS.configs.$body.removeClass('ups-navOpen');
        });


        return plugin;
    };

    Plugin.prototype.openTools = function() {
        var plugin = this;
        plugin.$toolList.slideDown(plugin.duration).attr('aria-hidden',false);
        plugin.$toggle.attr('aria-expanded',true);
        plugin.$toggle.find('.ups-readerTxt').text(plugin.$toggle.find('.ups-readerTxt').attr('data-lang-hide'));
        plugin.$T.addClass(UPS.configs.activeClass);
        plugin.isActive = true;
        $('#ups-header').upsMainNav('closeAll');

        if(UPS.configs.viewport.size !== 'small') {
            UPS.configs.$body.on('click.tools', function(e) {
            	if (e.originalEvent !== undefined){
	            	plugin.closeTools();
	                UPS.configs.$body.removeClass('ups-navOpen');
            	}
            });
        }

        return plugin;
    };

    Plugin.prototype.closeTools = function() {
        var plugin = this;
        plugin.$toggle.attr('aria-expanded',false);
        plugin.$toggle.find('.ups-readerTxt').text(plugin.$toggle.find('.ups-readerTxt').attr('data-lang-show'));
        plugin.$toolList.slideUp(plugin.duration).attr('aria-hidden',true);
        plugin.$T.removeClass(UPS.configs.activeClass);
        plugin.$toolsLi.removeClass(UPS.configs.activeClass);
        // UPS.configs.$body.removeClass('ups-navOpen');
        plugin.isActive = false;

        if(UPS.configs.viewport.size !== 'small') {
            UPS.configs.$body.off('click.tools');
        }

        return plugin;
    };

    Plugin.prototype.toolHeight = function ($tool) {
        var plugin = this;
        // var minH = 0;
        var hMargin = 45;

        var menuH = plugin.$msg.outerHeight() + plugin.$widgets.outerHeight();

        $tool.css({minHeight: menuH + hMargin + 'px'});

        return plugin;
    };

    $.fn[ PLUGIN_NS ] = function( methodOrOptions ) {
        if (!$(this).length) {
            return $(this);
        }
        var instance = $(this).data(PLUGIN_NS);
        if ( instance && methodOrOptions!==undefined && (typeof methodOrOptions ==='string' || (typeof methodOrOptions ==='object' && methodOrOptions.hasOwnProperty('indexOf') && methodOrOptions.indexOf('_') !== 0)) && instance[ methodOrOptions ] && typeof( instance[ methodOrOptions ] ) === 'function' ) {
            return instance[ methodOrOptions ]( Array.prototype.slice.call( arguments, 1 ) );
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            instance = new Plugin( $(this), methodOrOptions );
            $(this).data( PLUGIN_NS, instance );
            return $(this);
        } else if ( !instance ) {
            $.error( 'Plugin must be initialised before using method: ' + methodOrOptions );
        } else if ( methodOrOptions.indexOf('_') === 0 ) {
            $.error( 'Method ' +  methodOrOptions + ' is private!' );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist.' );
        }
    };
})(jQuery);
