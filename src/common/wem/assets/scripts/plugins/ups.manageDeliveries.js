(function ($) {
    'use strict';

    var PLUGIN_NS = 'upsManageDeliveries';

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
        return plugin;

    };

    /** #### INITIALISER #### */
    Plugin.prototype._init = function () {
        var plugin = this;
        plugin.$panel = plugin.$T.find('.ups-widget_panel');
        
        //CT code starts here
        plugin.dpRequest ='';
        plugin.ajaxOptions ='';
        plugin._isMultipleQSView=false;
        plugin._isMultipleBodyView=false;
        plugin._isMultiEnrollType=false;
        plugin._enrollmentStatus='';
        var lang = plugin.options.lang;
        plugin.lang = lang !==undefined ? lang.split('_').join('-') : '';
        plugin.authInfo = {
            "UPSSecurity": {
                "UsernameToken": {
                    "Username": window.authentication.uname,
                    "Password": window.authentication.upwd
                },
                "ServiceAccessToken": {
                    "AccessLicenseNumber": window.authentication.akey
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


        if (plugin.$panel.find('.manage-deliveries_header').length > 0) {
            setTimeout(function(){
                plugin.mhdOnload();
            },500);
        } else {
            return;
        }

        plugin.$dateToggle = plugin.$T.find('.date_toggle');
        plugin.$calendarPackageInfo = plugin.$T.find('.calendar-package-info');
        plugin.$packageInfo = plugin.$T.find('.package-info');
        plugin.$select = plugin.$T.find('.ups-dropdown');
        plugin.$packageTotal = plugin.$T.find('.package-total');
        plugin.$calendarDates = plugin.$T.find('.calendar-dates');
        plugin.$upsCTA = plugin.$T.find('.ups-cta');

        

        plugin._updateToggleBtn();
        $(window).on('windowResize', function () {
            plugin._updateToggleBtn();
        });

        plugin._setMinHeight();

        var processServiceResponse = function (res) {
            //////console.log(options);
            /*if(plugin.checkStubUser()){
                plugin.success(plugin.stubResponse());
            }else*/ 
            if (res.data.isError) {
                plugin.networkError();//res.data.statusText will pass if required
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
        plugin.bindEvents();
    };

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
            dataType:"text",
            beforeSend:function () {
                if(plugin.options.isBody){
                    plugin.$T.find("#dpWidgetView").html('<div class="ups-loaderImg"></div>');
                }else{
                    plugin.$T.find("#dpQuickStartView").html('<div class="ups-loaderImg"></div>');
                }
            },
            complete:function(){
                if(plugin.options.isBody){
                    plugin.$T.find("#dpWidgetView").find('.ups-loaderImg').remove();
                }else{
                    plugin.$T.find("#dpQuickStartView").find('.ups-loaderImg').remove();
                }
            }
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
    };

    Plugin.prototype._updateToggleBtn = function () {
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
    };

    /**
     * EZ Logging/Warning (technically private but saving an '_' is worth it imo)
     */
    Plugin.prototype.DLOG = function () {
        if (!this.DEBUG) return;
        /*for (var i in arguments) {
            ////console.log(PLUGIN_NS + ': ', arguments[i]);
        }*/
    };
    Plugin.prototype.DWARN = function () {
        // this.DEBUG && console.warn(arguments);
    };




    // CT code start from here -->

    /*    $(document ).ready(function() {

     if(window.location.href.indexOf("W05") > -1)
     {
     //console.log("in Manage Home Deliveries");
     plugin.requestData = delivery.requestData();
     plugin.ajaxOptions =  {"url": "DeliveryPlanner", "data": requestData, "id": "deliveryPlanner"};
     // To call the publish
     topic.publishAjaxCall(ajaxOptions);
     }
     });*/

    Plugin.prototype.processTime = function(time){
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

    /*Plugin.prototype.formatDate = function (dateString) {
        var plugin = this;
        var date = plugin.getUTCDate(),
                tOpts = {hour: '2-digit', minute:'2-digit'};
        date.setTime(parseInt(dateString));
        ////console.log(date);
        return date.toLocaleTimeString(plugin.lang, tOpts);
    };*/

    Plugin.prototype.noDeliveryDateformat = function(dateString) {
        var plugin = this;
        var date = new Date(dateString),
                mOpts = {month: 'short'},
                dOpts = {day:'numeric'},
                wOpts = { weekday: 'short'};
        return date.toLocaleDateString(plugin.lang, wOpts) +', ' + date.toLocaleDateString(plugin.lang, mOpts) + ' ' +
                date.toLocaleDateString(plugin.lang, dOpts);
    };

    Plugin.prototype.formatDate = function(dateString) {
    //console.log(dateString);
    var y = dateString.substr(0,4),
        m = dateString.substr(4,2) - 1,
        d = dateString.substr(6,2);
    var date = new Date(y,m,d);
    ////console.log((date.getFullYear() == y && date.getMonth() == m && date.getDate() == d) ? date : 'invalid date');
    return (date.getFullYear() === Number(y) && date.getMonth() === Number(m) && date.getDate() === Number(d)) ? date : 'invalid date';
};

    Plugin.prototype.convertDate = function(){
        var plugin = this;
        var date =  plugin.getUTCDate();
        //date.setTime(parseInt(dateString));
        return date+"here";
    };

    Plugin.prototype.fullDay = function(odate){
        var plugin = this;
        return plugin.dayFormat(odate,'long');
    };

    Plugin.prototype.day = function(date){
        var plugin = this;
        return plugin.isEqualDates(date, plugin.getUTCDate()) ? plugin.options.language.today : plugin.dayFormat(date,'short').toLowerCase();
    };

    Plugin.prototype.getUTCDate = function(){
        var odate = new Date();
        return new Date(odate.getFullYear(), odate.getMonth(),odate.getDate(), 0,0, 0);
        //return odate;
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
        if (tzOff !== tzOff2) {
            var diff = tzOff2 - tzOff;
            t += diff;
            d.setTime(t);
        }
        return d;

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

    Plugin.prototype.isEqualDates = function(a,b){
        return (a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getYear() === b.getYear());
    };

    
    Plugin.prototype.getDates = function(days){

        var plugin = this;
        var deliveryDates = [];
        $.each(days, function(i){
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

    //--------------------------------------------------
    // Transform webservice response JSON to
    //     Delivery Planner JSON
    //--------------------------------------------------

    var tempArray = [];
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
        var formattedJson={} , accounts = accountData.DeliveryPlannerDataResponse.DeliveryPlannerEnrollmentResponse;
        if(accounts!==undefined && accounts.Enrollments!==undefined){
            accounts = accounts.Enrollments;
        }

        var shipmentRecords=accountData.DeliveryPlannerDataResponse.DeliveryPlannerShipmentResponse;
        if(shipmentRecords!==undefined){
            shipmentRecords= shipmentRecords.InboundShipments;
            
            if(shipmentRecords !== undefined && Array.isArray(shipmentRecords.Shipment) === false)  {
                tempArray = [];
                var tempVar = shipmentRecords.Shipment;
                tempArray.push(tempVar);
                shipmentRecords.Shipment = tempArray;
            } 
            
        }else{
            if(plugin.options.isBody){
                formattedJson  = plugin.convert( accountData);
                plugin.htmlFragment(formattedJson);
                //plugin.htmlFragment();
            }else{
                plugin.quickStartFragment();
            }
            return;
        }
        
        // CHeck if user has multiple accounts
        if(accounts!==undefined){
            if(!$.isArray(accounts)){
                plugin._isMultiEnrollType=false;
                if(plugin.options.isBody){
                    formattedJson  = plugin.convert( accountData);
                    plugin.htmlFragment(formattedJson);
                }else{
                    plugin.quickStartFragment(shipmentRecords);
                }
            } else {
                plugin._isMultiEnrollType=true;
                //alert("multiple Account");
                if(plugin.options.isBody){
                    formattedJson  = plugin.convert( accountData);
                    plugin._multipleAccountBodyView(accounts,formattedJson);
                }else{
                    plugin._multipleAccountQSView(accounts,shipmentRecords);
                }
            }
        }else{
            if(plugin.options.isBody){
                formattedJson  = plugin.convert( accountData);
                plugin.htmlFragment(formattedJson);
            }else{
                plugin.quickStartFragment(shipmentRecords);
            }
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

    Plugin.prototype.convert = function( accountData){
        var plugin = this;
        var shipments,deliveryDates;
        var shipmentResponse=accountData.DeliveryPlannerDataResponse.DeliveryPlannerShipmentResponse;
        if(shipmentResponse !== undefined && shipmentResponse.InboundShipments !== undefined){
            shipments = accountData.DeliveryPlannerDataResponse.DeliveryPlannerShipmentResponse.InboundShipments.Shipment;
            deliveryDates = (shipments === null || shipments === 'undefined') ? 'undefined' : plugin.getDates(shipments);
        }
        //console.log(shipments);
        var week = [],
                today = plugin.getUTCDate(),
                dates = [],
                packageCount = 0,
                deliveryJson = {};

        //Create a week starting from today
        for (var i = 0; i < 7; i++) {
            week.push(plugin.addDays(today, i));
        }
        //console.log("week used " + JSON.stringify(week));

        // Run a loop on each day and check against shipment delivery dates
        $.each(week, function (deliveryIndex, a) {
            //console.log(deliveryIndex);
            var counter = 0;
            if (deliveryDates !== undefined) {
                $.each(deliveryDates, function (weekIndex, b) {
                    if (a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getYear() === b.getYear()) {
                        counter++;
                    }
                });
                packageCount += counter;
                //console.log(packageCount); 
                //greps delivery items to get and comvert their dates
                var deliveryItems = $.grep(shipments, function (element, i) {
                    return plugin.isEqualDates(plugin.formatDate(shipments[i].ScheduledDeliveryDate), a);
                });
                // creates object of all the delivery items for the week. Important log statement 
                deliveryJson = plugin.deliveries(deliveryItems);
                console.log("Delivery Item new JSON " + JSON.stringify(deliveryJson));

            } else {
                deliveryJson.deliveries = [];
            }

            var date = week[deliveryIndex];
            //Here is shipments are being pushed to week after comparision with dates and delivery dates
            dates.push(
                {
                    "date": date, "total": counter > 0 ? counter : "", fullDay: plugin.fullDay(date),
                    "day": plugin.day(date), "first": "", "deliveries": deliveryJson.deliveries
                }
            );           
        });
        return {"packages": packageCount, "days": dates};
    };

    Plugin.prototype.deliveries = function(deliveries){
        //console.log(deliveries);
        var plugin = this;
        var dayDeliveries = [];
        if(!$.isEmptyObject(deliveries)){
            if(!$.isArray(deliveries)){
                deliveries = $.makeArray(deliveries);
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

                     if(deliveries[i].ScheduledDeliveryDate !== deliveries[i].RescheduledDeliveryDate){
                        dayDeliveries[i].date = plugin.formatDate(deliveries[i].RescheduledDeliveryDate);
                        //dayDeliveries[i].date = plugin.formatDate(deliveries[i].RescheduledDeliveryDate);
                     };
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

    Plugin.prototype.success = function(resp) {
        var plugin = this;
        plugin.$panel.find(".ups-widget_errors").hide();
        plugin.transform(resp);
        plugin._bindClick();
    };

    Plugin.prototype.error = function () {
        var plugin = this;
        if(plugin.options.isBody){
            plugin.$T.find("#dpWidgetView").empty();
        }else{
            plugin.$T.find("#dpQuickStartView").empty();
        }
        plugin.$panel.html('<div class="ups-widget_errors">'+plugin.$panel.attr('data-mhdunavailable')+'</div>');
        plugin.$panel.append('<div class="manage-deliveries_cta clearfix"><a href="'+plugin.options.shipmentTag.url+'" title="'+plugin.options.shipmentTag.title+'" class="ups-cta ups-analytics" data-content-block-id="W5" data-event-id="21" data-content-id="'+plugin.options.shipmentTag.contentBlock+'">'+plugin.options.shipmentTag.title+'</a></div>');
        //plugin.$T.find("#dpWidget").empty();
        //plugin.$panel.html('')
        //plugin.$panel.find(".ups-manage-deliveries .ups-widget_panel .ups-widget_errors").show();
    };

    Plugin.prototype.networkError =  function () {
        //display network error
        var plugin = this;
        if(plugin.options.isBody){
            plugin.$T.find("#dpWidgetView").empty();
        }else{
            plugin.$T.find("#dpQuickStartView").empty();
        }
        plugin.$panel.html('<div class="ups-widget_errors">'+plugin.$panel.attr('data-mhdunavailable')+'</div>');
        plugin.$panel.append('<div class="manage-deliveries_cta clearfix"><a href="'+plugin.options.shipmentTag.url+'" title="'+plugin.options.shipmentTag.title+'" class="ups-cta ups-analytics" data-content-block-id="W5" data-event-id="21" data-content-id="'+plugin.options.shipmentTag.contentBlock+'">'+plugin.options.shipmentTag.title+'</a></div>');
        //plugin.$T.find("#dpWidget").find('.ups-widget_panel').empty();
        //plugin.$T.find(".ups-manage-deliveries .ups-widget_panel .ups-widget_errors").show();
    };

    Plugin.prototype._setAjaxMultipleAccount=function(addressToken,deliveryPlanner){
        var plugin=this;
        plugin.metInfo.DeliveryPlannerDataRequest.RequestData.AddressToken= addressToken;
        plugin.metInfo.DeliveryPlannerDataRequest.RequestData.DeliveryPlannerRequest= deliveryPlanner;
        plugin.mhdOnload();
    };

    Plugin.prototype._multipleAccountBodyView=function(accounts, resultSet){
        
        var plugin = this;
        console.log(accounts, resultSet);
        if(accounts!==undefined && accounts.length>1){
            if(!plugin._isMultipleBodyView){
                var accountOptionsHtml = '';

                if(tempArray.length > 0){
                    accountOptionsHtml += '<div class="manage-deliveries_cta clearfix"><a href="'+plugin.options.shipmentTag.url+'" title="'+plugin.options.shipmentTag.title+'" class="ups-cta ups-analytics" data-content-block-id="W5" data-event-id="21" data-content-id="'+plugin.options.shipmentTag.contentBlock+'">'+plugin.options.shipmentTag.title+'</a></div>\n';
                }
                accountOptionsHtml += '<div class="manage-deliveries_accounts clearfix">\n';
                accountOptionsHtml += '<label for="manage_account_select_view'+plugin.options.isBody+'" class="ups-form_label">'+plugin.options.language.view+'</label>\n';
                accountOptionsHtml += '<div class="ups-dropdown_wrapper">\n';
                accountOptionsHtml += '<select id="manage_account_select_view'+plugin.options.isBody+'" name="manage_account_filter" class="ups-dropdown ups-multipleAccount">\n';
                $.each(accounts, function(){
                    if(this.EnrollmentStatus==='ACTIVE'){
                        accountOptionsHtml += '<option value="'+this.AddressToken+'">'+this.EnrollmentName+'</option>';
                    }    
                });
                accountOptionsHtml += '</select>\n';
                accountOptionsHtml += '</div>\n';
                accountOptionsHtml += '</div>\n';
                plugin.$T.find("#dpWidgetAccountOptions").html(accountOptionsHtml);
                plugin.$T.find('.ups-multipleAccount').bind('change',function(){
                    var _selfInstance=$(this);
                    plugin.$T.find(".manage-deliveries_cta").remove();
                    plugin._setAjaxMultipleAccount(_selfInstance.val(),"4");
                });
                
                plugin.htmlFragment(resultSet);
            }
            //plugin._setAjaxMultipleAccount(accounts[0].AddressToken,1);
        }
    };

    Plugin.prototype.htmlFragment = function (formattedJson) {

        var plugin = this;
        var accounts = formattedJson;
        if(accounts !== null){
            var html = '';
            
            var packageTotalHtml ='';
            var qsSeeShipping='';
            var accountDaySVP='';
            var packages = accounts.packages;
            var days = accounts.days;

            var eachAccountPackage = '';
            if(tempArray.length > 0){
                html += '<div class="manage-deliveries_cta clearfix"><a href="'+plugin.options.shipmentTag.url+'" title="'+plugin.options.shipmentTag.title+'" class="ups-cta ups-analytics" data-content-block-id="W5" data-event-id="21" data-content-id="'+plugin.options.shipmentTag.contentBlock+'">'+plugin.options.shipmentTag.title+'</a></div>\n';
            }
            html += '<div class="manage-deliveries_packages ups-sm_show">\n';

            eachAccountPackage += '<div class="total-text">'+plugin.options.language.yourPackage+'</div>\n';
            eachAccountPackage += '<div class="package-notification">\n';
            eachAccountPackage += '<div>'+accounts.packages+'</div>\n';
            eachAccountPackage += '</div>\n';
            
            packageTotalHtml += eachAccountPackage;
            if(packages===0){
                html+='<div class="no-packages"><div class="title">'+plugin.options.language.deliverySchedulerWeek+'</div></div>';

            }else{
                html+='<div class="package-total">'+eachAccountPackage+'</div>';
            }
            html += '</div>\n';

            html += '<div class="manage-deliveries_calendar ups-sm_hide">\n';
            html += '<div class="calendar-dates row" role="tablist"  id="manage-deliveries_calendar-tab">\n';


            $.each(days, function(i) {

                html += '<div class="col-date" role="tab">';
                html += '<div class="date_toggle" data-day="'+days[i].day+'" data-active="'+plugin.checkActive(i)+'" tabindex="'+i+'" style="height: 164px;">\n';
                html += '<div class="date" aria-label="'+days[i].fullDay+'"><span aria-hidden="true">'+days[i].day+'</span></div>\n';

                if(days[i].total > 0){
                    html += '<div class="package-notification">\n';
                    html += '<div>'+days[i].total+'</div>\n';
                    html += '<span class="ups-readerTxt">'+plugin.options.language.deliveryDay+'</span>\n';
                    html += '</div>\n';
                }
                html += '</div>\n';
                html += '</div>\n';
            });

            html += '</div>\n';
            html += '<div class="calendar-package-info">\n';

            var isShipmentUrl=false;
            $.each(days, function(i) {
                var deliveries = days[i].deliveries;

                ////console.log("Total packages" + days[i].total);

                var deliveryHtml = '';

                if(days[i].total > 0) {

                    deliveryHtml += '<div class="package-info" data-day="'+days[i].day+'" data-active="'+plugin.checkActive(i)+'" role="tabpanel" aria-labelledby="manage-deliveries_calendar-tab'+i+'">\n';
                    deliveryHtml += '<table class="ups-table">\n';
                    deliveryHtml += '<thead>\n';
                    deliveryHtml += '<tr>\n';
                    deliveryHtml += '<th scope="col">'+plugin.options.language.deliveryDate+'</th>\n';
                    deliveryHtml += '<th scope="col">'+plugin.options.language.shipFrom+'</th>\n';
                    deliveryHtml += '<th scope="col" class="col-status">'+plugin.options.language.statusAction+'</th>\n';
                    deliveryHtml += '</tr>\n';
                    deliveryHtml += '</thead>\n';
                    deliveryHtml += '<tbody>\n';
                    accountDaySVP+='<div class="all-packages" data-day="'+days[i].day+'"><div class="package-feed">';
                    if(!$.isEmptyObject(deliveries)){
                        $.each(deliveries, function(j) {
                            var deliveryStatus='';
                            deliveryHtml += '<tr>\n';
                            deliveryHtml += '<th scope="row">\n';
                            deliveryHtml += ' <div class="delivery-date">'+plugin.displayDate(deliveries[j].date)+'</div>\n';
                            deliveryHtml += '<div class="delivery-time">'+deliveries[j].time+'</div>\n';
                            deliveryHtml += '</th>\n';
                            deliveryHtml += '<td>\n';
                            deliveryHtml += '<div class="delivery-carrier">'+deliveries[j].carrier+'</div>\n';
                            // need to correct this code======================= id="trackUrl'+tCounter+'"
                            deliveryHtml += '<div class="delivery-tracking-num">'+deliveries[j].trackNo+'</div>\n';
                            deliveryHtml += '</td>\n';
                            deliveryHtml += '<td>\n';
                            deliveryHtml += '<div class="delivery-status">'+deliveries[j].status+'</div>\n';

                            if(deliveries[j].status !== 'Delivered'){
                                //https://wwwapps.ups.com/dcr/gwDCROverview?trackedNum='+deliveries[j].trackNo+'&loc='+plugin.options.locale+'&requestType=DCO&clientId=WKS previous URL
                                deliveryStatus += '<div class="delivery-change"><a href="'+plugin.options.shipmentTag.url+'" tabindex="0" class="ups-link ups-analytics" data-content-block-id="W5" data-event-id="21">'+plugin.options.language.changeDelivery+'</a>\n';
                                deliveryStatus += '</div>\n';
                            }
                            deliveryHtml +=deliveryStatus;

                            deliveryHtml += '</td>\n';
                            deliveryHtml += '</tr>\n';
                            if(j>0 && !isShipmentUrl){
                                qsSeeShipping +='<div class="manage-deliveries_cta clearfix"><a href="'+plugin.options.shipmentTag.url+'" title="'+plugin.options.shipmentTag.title+'" class="ups-cta ups-analytics" data-content-block-id="W5" data-event-id="21" data-content-id="'+plugin.options.shipmentTag.contentBlock+'">'+plugin.options.shipmentTag.title+'</a></div>';
                                isShipmentUrl= true;
                            }
                            accountDaySVP+='<div class="package-info"><div class="delivery-date">'+plugin.displayDate(deliveries[j].date)+'</div><div class="delivery-time">'+deliveries[j].time+'</div><div class="delivery-carrier">'+deliveries[j].carrier+'</div><div class="delivery-tracking-num">'+deliveries[j].trackNo+'</div><div class="delivery-status">'+deliveries[j].status+'</div>'+deliveryStatus+'</div>';
                        });
                    }

                    deliveryHtml += '</tbody>\n';
                    deliveryHtml += '</table>\n';
                    deliveryHtml += '</div>\n';
                    accountDaySVP+='</div></div>';
                }else{
                    deliveryHtml += '<div class="package-info no-deliveries-container" data-day="'+days[i].day+'" data-active="'+plugin.checkActive(i)+'">\n';
                    deliveryHtml += '<div class="no-deliveries">\n';
                    deliveryHtml += '<span class="info-date"></span> '+ plugin.noDeliveryDateformat(days[i].date)+' '+plugin.options.language.deliverySchedulerToday;
                    deliveryHtml += '</div>\n';
                    deliveryHtml += '</div>\n';
                }
                html += deliveryHtml;
                //tCounter++;
            });

            html += '</div>\n';
            html += '</div>\n';
            
            plugin.$T.find("#dpWidgetPackageTotal").addClass('package-total').html(packageTotalHtml);
            plugin.$T.find("#dpWidgetView").html(html);
            plugin.$T.find("#dpWidgetView").find('.manage-deliveries_packages.ups-sm_show').append(accountDaySVP);
            $(qsSeeShipping).insertBefore("#dpWidgetView");
            plugin.$T.find("#dpWidgetView").find('.ups-change_delivery').bind('click',function(){
                var _selfInstance=$(this);
                plugin._setAnalytics(_selfInstance);
                window.location=_selfInstance.attr('href');
            });

        }
    };
    
    Plugin.prototype._multipleAccountQSView=function(accounts,_deliveries){
        var plugin=this;
        if(accounts!==undefined && accounts.length>1){
            if(!plugin._isMultipleQSView){
                var qsAccOptionsHtml = '';
                qsAccOptionsHtml += '<label for="manage_account_select_address" class="ups-form_label">'+plugin.$panel.attr('data-deliveryaddress-text')+'</label>\n';
                qsAccOptionsHtml += '<div class="header-qs-container clearfix">\n';
                qsAccOptionsHtml += '<div class="ups-dropdown_wrapper">\n';
                qsAccOptionsHtml += '<select id="manage_account_select_address" name="manage_account_filter" class="ups-dropdown ups-multipleAccount">\n';
                $.each(accounts, function(){
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

    Plugin.prototype._setQSHeader= function(_shipping){
        var plugin=this;
        var packageCount=0;
        if(_shipping!==undefined && _shipping.Shipment!==undefined && _shipping.Shipment.length > 0 ){
            packageCount=_shipping.Shipment.length;
        }
        
        
        //plugin._isMultiEnrollType : IS SINGLE ACCOUNT OR MULTI ACCOUNT // DEFAULT IS FALSE
        if(!plugin._isMultiEnrollType){
            if(!plugin.$T.find("#dpQSAccountOptions").hasClass('single_account')){
                plugin.$T.find("#dpQSAccountOptions").addClass('single_account').append('<div class="header-qs-container clearfix"></div>');
            }
        }    
        var $elem = plugin.$T.find("#dpQSAccountOptions > .header-qs-container");

        if(!plugin._isMultipleQSView){
            $elem.append('<h3 class="package-total"><span class="total-text">'+plugin.$panel.attr('data-yourpackages-text')+'</span><span class="package-notification">'+packageCount+'</span></h3>');
            plugin._isMultipleQSView=true;
        }else{
            $elem.find('.package-notification').text(packageCount);
        }
    
    };

    Plugin.prototype.quickStartFragment = function (_shipmentRecord) {
        var plugin = this;
        //if(account !==undefined){
        var qsHtml = '',_deliveries , qsDeliveryHtml = '';
        plugin._setQSHeader(_shipmentRecord);
        if(_shipmentRecord!==undefined && _shipmentRecord.Shipment!==undefined && _shipmentRecord.Shipment.length>0 ){
            _deliveries = plugin.deliveries(_shipmentRecord.Shipment);
        }
        plugin.$T.find("#dpQuickStartView").empty();
        qsDeliveryHtml += '<div class="manage-deliveries_quickstart">';
        
        if (_deliveries!==undefined && _deliveries.deliveries!==undefined  && _deliveries.deliveries.length > 0) {
            //alert(3);
            qsDeliveryHtml += '<table class="ups-table">\n';
            qsDeliveryHtml += '<thead>\n';
            qsDeliveryHtml += '<tr>\n';
            qsDeliveryHtml += '<th scope="col">'+plugin.$panel.attr('data-deliverydatetime-text')+'</th>\n';
            qsDeliveryHtml += '<th scope="col">'+plugin.$panel.attr('data-trackingno-text')+'</th>\n';
            qsDeliveryHtml += '<th scope="col" class="col-status">'+plugin.$panel.attr('data-status-text')+'</th>\n';
            qsDeliveryHtml += '</tr>\n';
            qsDeliveryHtml += '</thead>\n';
            qsDeliveryHtml += '<tbody>\n';

            //if (!$.isEmptyObject(_deliveries.Shipment)) {
            //var isShipmentUrl=false;
            $.each(_deliveries.deliveries, function (j) {
                qsDeliveryHtml += '<tr>\n';
                qsDeliveryHtml += '<td>\n';
                qsDeliveryHtml += ' <div class="delivery-date">' + plugin.displayDate(this.date) + '</div>\n';
                qsDeliveryHtml += '<div class="delivery-time">' + this.time + '</div>\n';
                qsDeliveryHtml += '</td>\n';
                qsDeliveryHtml += '<td>\n';
                qsDeliveryHtml += '<div class="delivery-carrier">' + this.carrier + '</div>\n';
                qsDeliveryHtml += '<div class="delivery-tracking-num">' + this.trackNo + '</div>\n';
                qsDeliveryHtml += '</td>\n';
                qsDeliveryHtml += '<td>\n';
                qsDeliveryHtml += '<div class="delivery-status">' + this.status + '</div>\n';

                if (this.status !== 'Delivered') {
                    //previous URL Using
                    qsDeliveryHtml += '<div class="delivery-change"><a href="'+plugin.options.shipmentTag.url+'" tabindex="0" class="ups-link ups-change_delivery" data-content-block-id="W5" data-event-id="21">'+plugin.options.language.changeDelivery+'</a>\n';
                    qsDeliveryHtml += '</div>\n';
                }
                qsDeliveryHtml += '</td>\n';
                qsDeliveryHtml += '</tr>\n';
                // if(j>0 && !isShipmentUrl){
                //     isShipmentUrl= true;
                // }
                console.log(j);
                if(j>1){
                    return false;
                }
            });
            
            qsDeliveryHtml += '</tbody>\n';
            qsDeliveryHtml += '</table>\n';
            qsDeliveryHtml += '</div>\n';
            
            if(_deliveries.deliveries.length>0){
                //quickStartSeeShipping 
                qsDeliveryHtml +='<div class="manage-deliveries_cta clearfix" ><a href="'+plugin.options.shipmentTag.url+'" title="'+plugin.options.shipmentTag.title+'" class="ups-cta ups-analytics" data-content-block-id="W5" data-event-id="21" data-content-id="'+plugin.options.shipmentTag.contentBlock+'">'+plugin.options.shipmentTag.title+'</a></div>';
            }
        } else {
            //alert("else");
            qsDeliveryHtml += '<div class="package-info no-deliveries-container">\n';
            qsDeliveryHtml += '<div class="no-deliveries">\n';
            qsDeliveryHtml += '<span class="info-date"></span> ' + plugin.options.language.deliverySchedulerWeek;
            qsDeliveryHtml += '</div>\n';
            qsDeliveryHtml += '</div>\n';
            qsDeliveryHtml += '</div>\n';
        }
        qsHtml += qsDeliveryHtml;
            
        qsHtml += '</div>\n';
        qsHtml += '</div>\n';

        plugin.$T.find("#dpQuickStartView").html(qsHtml);
        plugin.$T.find("#dpQuickStartView").find('.ups-change_delivery').bind('click',function(){
            var _selfInstance=$(this);
            plugin._setAnalytics(_selfInstance);
            window.location=_selfInstance.attr('href');
        });
    };

    Plugin.prototype.bindEvents = function(){
        var plugin = this;
        $(".quickStart_manageHomeDeliveries").on('click', function (event) {
            event.preventDefault();
            plugin.mhdOnload();
        });

        /*$(plugin.$T).on("click",".delivery-tracking-num > .ups-link",function(){
            var _self=$(this);
            
            var form=_self.parents('form');
            form.find("#trackNums").val(_self.text());
            form.submit();    
        });*/
    };

    /*Plugin.prototype.checkStubUser = function (){
        var plugin = this;
        var data = JSON.parse(JSON.stringify(plugin.dpRequest));
        var userId = data.UPSSecurity.UsernameToken.Username;
        return stubDataAuth.users.split(',').indexOf(userId) > -1;
    };*/

    /*###################################################################################
     * JQUERY HOOK
     ###################################################################################*/

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