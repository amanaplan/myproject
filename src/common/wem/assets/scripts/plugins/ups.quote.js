(function( $ ){
    'use strict';

    var PLUGIN_NS = 'upsQuote';

    var Plugin = function ( target, options ) {
        var plugin = this;

        plugin.$T = $(target);

        plugin.$window     = $(window);
        this.options = $.extend(
            true, // deep extend
            {
                DEBUG: false,
                defaultOptionA: 'defaultValue'
            },
            options
        );
        plugin._init( target );
        if (!$('.ups-quote.ups-form_wrap').is(":visible")){
            return;
        }

        if (plugin.isLogged) {
            plugin.initUserInfo();
            //plugin.initAddress();
        }
        return plugin;
    };

    Plugin.prototype._init = function() {
        var plugin = this;

        var $quoteType = plugin.$T.find('.qt-select');

        //Set Date time in hidden field =========== pickerDate

        var date= new Date();
        var localeLang = plugin.options.locale !==undefined ? plugin.options.locale.split('_').join('-') : '';
        plugin.$T.find('.ups-hidden_date').val(date.toLocaleDateString(localeLang,{month:'2-digit',year:'numeric',day:'2-digit'}));

        /*plugin.$packageObj = [{
         'key':'package',
         'value':'04'
         },{
         'key':'letter',
         'value':'01'
         },{
         'key':'freight',
         'value':'freight'
         }];*/

        plugin.$packageObj = {
            'package':'04',
            'letter':'01',
            'freight':'freight'
        };

        if($quoteType.length){
            plugin.quoteRequest = ''; //variable to hold the generated AJAX request
            plugin.ajaxOptionsQuote = '';
            plugin.requestUserInfo = '';
            plugin.ajaxOptions = '';
            plugin.sourceInfo='';
            plugin.currentSelectID='';
            plugin.isLogged = plugin.options.isLoggedIn;
            //plugin.locale = $('html').attr('lang');
            plugin.checkView=false;
            if(!plugin.isLogged){
                plugin._changeForm($quoteType);
            }

            var processAddressResp = function(response) {
                plugin._changeForm($quoteType);
                if (response.data.isError) {
                    plugin.processAddressNetError();//response.data.statusText will be passed if required
                    plugin.checkView=false;
                    plugin._loggedInFailedView();
                } else {
                    if (response.data.responseJSON.hasOwnProperty("Fault")){
                        plugin.checkView=false;
                        plugin._loggedInFailedView();
                        plugin.processAddressErrorResp();//response ..
                    } else {
                        plugin._loggedInSuccessView();
                        plugin.checkView=true;
                        plugin.processAddressSuccessResp(response);
                    }
                }
            };

            var processUserInfoResponse = function (response) {
                //console.log(response);
                if (response.data.isError) {
                    //plugin.processUserInfoNetworkError(response.data.statusText);
                    plugin.checkView=false;
                    plugin._loggedInFailedView();
                } else {
                    if (response.data.responseJSON.hasOwnProperty("Fault")){
                        plugin.checkView=false;
                        plugin._loggedInFailedView();
                        //plugin.processUserInfoErrorResponse(response);
                    } else {
                        plugin.checkView=true;
                        //plugin._loggedInSuccessView();
                        plugin.processUserInfoSuccessResponse(response);
                    }
                }
            };

            // var defaultOption=plugin.$T.find('.ups-dropdown.quote-shipFrom:not(.logged)').find('option[value='+plugin.options.country+']');
            // var defaultOptionTo=plugin.$T.find('.ups-dropdown.quote-shipTo').find('option[value='+plugin.options.country+']');
            // plugin.$T.find('.ups-dropdown.quote-shipFrom:not(.logged)').prepend('<option value="'+plugin.options.country+'">'+defaultOption.text()+'</option>')
            // plugin.$T.find('.ups-dropdown.quote-shipTo').prepend('<option value="'+plugin.options.country+'">'+defaultOptionTo.text()+'</option>');
            // defaultOption.remove();
            // defaultOptionTo.remove();
            plugin.$T.find('.ups-dropdown').find('option[value='+plugin.options.country+']').attr('selected');
            //Listen to Quote widget ID. When published to this topic, initiate call 'processResponse'
            $.Topic("quote").subscribe(processAddressResp);
            $.Topic("quote-1").subscribe(processUserInfoResponse);

            plugin.bindEvents();
            plugin.authenticationInfo = {
                "UPSSecurity": {
                    "UsernameToken": {
                        "Username": authentication.uname,
                        "Password": authentication.upwd,
                    },
                    "ServiceAccessToken": {
                        "AccessLicenseNumber": authentication.akey
                    }
                }
            };
            // set default request JSON
            plugin.methodInfo = {
                "ManageAddressesByTagsRequest": {
                }
            };

            //user info request
            plugin.getUserInfo = {
                "ProfileRetrieveUserInfoRequest": {
                    "Request": {
                        "TransactionReference": {
                            "CustomerContext": "",
                            "TransactionIdentifier": "x"
                        }
                    },
                    "UserID": "PamPrice"
                }
            };
            $quoteType.on('change', function() {
                plugin._changeForm(this);
            });
        }
    };

    //Generate AJAX request
    Plugin.prototype.generateAjaxRequest = function() {
        var plugin=this;
        plugin.quoteRequest = $.extend(plugin.quoteRequest, plugin.methodInfo);
    };

    Plugin.prototype.generateAjaxRequestUserInfo = function() {
        var plugin=this;
        plugin.requestUserInfo = $.extend(plugin.requestUserInfo, plugin.getUserInfo);
    };

    // set AJAX options for the AJAX call
    Plugin.prototype.setAjaxOptionsQuote = function() {
        var plugin=this;
        var ajaxSource = plugin.$T.find(".quoteForm").data("ajax-source");
        var widgetID = plugin.$T.find(".quoteForm").data("widget-source");
        if(ajaxSource!==undefined && widgetID!==undefined){
            //set ajax options
            plugin.ajaxOptionsQuote = {
                id: widgetID,
                url: ajaxSource,
                data:  JSON.stringify(plugin.quoteRequest),
                dataType:"json"
            };
        }
    };
    Plugin.prototype.setAjaxOptionsUserInfo = function() {
        var plugin=this;
        var ajaxSource = plugin.$T.find(".quoteForm").data("ajax-source-profile");
        var widgetID = plugin.$T.find(".quoteForm").data("widget-source-userinfo");
        if(ajaxSource!==undefined && widgetID!==undefined){
            plugin.ajaxOptions = {
                id: widgetID,
                url: ajaxSource,
                data:  JSON.stringify(plugin.requestUserInfo),
                dataType:"JSON"
            };
        }
    };

    Plugin.prototype.publishQuoteAddressAjaxCall = function(ajaxOptions) {
        $.Topic("Ajax").publish({
            ajaxOptions: ajaxOptions
        });
    };

    Plugin.prototype.publishQuoteAjaxCall = function(ajaxOptions) {
        $.Topic("Ajax").publish({
            ajaxOptions: ajaxOptions
        });
    };

    Plugin.prototype.initAddress = function(){
        var plugin=this;
        plugin.generateAjaxRequest();
        plugin.setAjaxOptionsQuote();
        plugin.publishQuoteAddressAjaxCall(plugin.ajaxOptionsQuote);
    };

    Plugin.prototype.initUserInfo = function(){
        var plugin=this;
        plugin.generateAjaxRequestUserInfo();
        plugin.setAjaxOptionsUserInfo();
        plugin.publishQuoteAjaxCall(plugin.ajaxOptions);
    };

    Plugin.prototype._formView=function(){
        var plugin = this;
        if(plugin.isLogged){
            //if(plugin.options.isQuickStart){
            plugin.$T.find('.ups-quote_package-weight').parents('.ups-quote_package.ups-form_group.ups-form_requiredNoAlert').addClass(UPS.configs.activeClass).removeClass(UPS.configs.inActiveClass).find('input,select').removeAttr('disabled');
            //}
            if(plugin.checkView===true){

                plugin._loggedInSuccessView();
            }else{
                plugin._loggedInFailedView();
            }
        }else{
            plugin.$T.find('.ups-quote_package:not(.ups-quote_type)').addClass(UPS.configs.activeClass).removeClass(UPS.configs.inActiveClass).find('textarea, input, select').removeAttr('disabled');
        }
    };

    Plugin.prototype._changeForm = function(select) {

        var plugin = this;
        var selectedType = $(select).val();
        var formElements = plugin.$T.find('.ups-form_group:not(.ups-quote_type), .ups-form_ctaGroup');

        formElements.addClass(UPS.configs.inActiveClass).removeClass(UPS.configs.activeClass);
        formElements.find('.ups-quote_type').addClass(UPS.configs.activeClass);
        formElements.find('textarea, input').val('');
        formElements.find('select').prop('selectedIndex',0);
        formElements.find('.ups-checkbox-custom').prop('checked', false);
        formElements.find('textarea, input, select').prop('disabled', true);

        //reset error states
        formElements.removeClass('ups-error');
        plugin.$T.find('.ups-form_errorWrap').remove();
        plugin.$T.find('.ups-error_exclaim').remove();
        //plugin.$T.find('.ups-dropdown').find('option[selected=selected]').removeAttr('selected');
        //plugin.$T.find('.ups-dropdown').find('option[value='+plugin.options.country+']').attr('selected','selected');
        //plugin.$T.find('.ups-dropdown').find('option[value='+plugin.options.country+']').prop('selected','selected');
        plugin.$T.find(".ups-dropdown").find('option[value='+plugin.options.country+']').prop('selected','selected');
        if(UPS.configs.viewport.size==='small'){
            plugin.$T.find('.ups-packageType').val(plugin.$packageObj[selectedType]);
        }
        switch(selectedType) {
            case 'package':
                plugin._formView();
                break;
            case 'letter':
                plugin._formView();
                //plugin.$T.find('.ups-quote_letter:not(.ups-quote_type)').addClass(UPS.configs.activeClass).removeClass(UPS.configs.inActiveClass).find('textarea, input, select').prop('disabled', false);
                break;
            case 'freight':

                plugin.$T.find('.ups-quote_freight:not(.ups-quote_type)').addClass(UPS.configs.activeClass).removeClass(UPS.configs.inActiveClass).find('textarea, input, select').removeAttr('disabled');
                // if(plugin.checkView===true){
                //     plugin.$T.find('.ups-quote_residential').addClass(UPS.configs.inActiveClass).removeClass(UPS.configs.activeClass).find('input').attr('disabled',true);
                // }
                break;
        }
    };

    /*Plugin.prototype._validateForm = function() {
     var plugin = this;
     var formGroups = plugin.$T.find('.ups-form_group.ups-form_required');
     var submit = true;

     for(var i = 0; i<formGroups.length; i++) {
     var inputs = $(formGroups[i]).find('.ups-input_wrapper');
     var completed = true;

     if(inputs.hasClass('ups-text_wrapper')) {
     if(inputs.find('.ups-form_input').val() === '') {
     completed = false;
     }
     } else if(inputs.hasClass('ups-dropdown_wrapper')) {
     if(inputs.find('.ups-dropdown').val() === '') {
     completed = false;
     }
     } else if(inputs.hasClass('ups-textArea_wrapper')) {
     if(inputs.find('.ups-textArea').val() === '') {
     completed = false;
     }
     } else if(inputs.hasClass('ups-buttonList_wrapper')) {
     if(inputs.parent().find('.ups-radio-custom:checked').length === 0) {
     completed = false;
     }
     } else if(inputs.hasClass('ups-checkbox')) {
     if(inputs.parent().find('.ups-checkbox-custom:checked').length === 0) {
     completed = false;
     }
     }

     if(!completed) {
     submit = false;
     if(!$(formGroups[i]).hasClass('ups-error')) {
     $(formGroups[i]).find('label').prepend('<span class = "ups-error_exclaim">[ ! ]</span>');
     $(formGroups[i]).addClass('ups-error');
     }
     } else {
     $(formGroups[i]).removeClass('ups-error');
     $(formGroups[i]).find('.ups-error_exclaim').remove();
     }
     }

     if(!submit){
     plugin.$T.addClass('ups-error_show');
     }

     return submit;
     };*/

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
        if(typeof utag_data!=='undefined' && utag_data!==undefined){
            component.user_type=utag_data.user_type;
            component.site_indicator=utag_data.site_indicator;
            component.page_country_code=utag_data.page_country_code;
            component.state=utag_data.state;
            component.city=utag_data.city;
            component.myups_login_state=utag_data.myups_login_state;
            component.page_language=utag_data.page_language;
        }
        if(typeof utag!=='undefined' && utag!==undefined){
            utag.track('link',component);
        }
    };


    Plugin.prototype.bindEvents = function() {
        var plugin=this;
        // $(".ups-quote-QuickStart").on('click', function(event) {
        //   event.preventDefault();
        /*if(plugin.isLogged){
         plugin.initUserInfo();
         }*/

        //plugin.initAddress();
        //});


        // Posting form to CTC application on click of Get Quote button
        $(".ups-get-quote-btn").click(function(event) {
            event.preventDefault();
            var _selfInstance=$(this);
            plugin._setAnalytics(_selfInstance);
            var locLang= $('html').attr('lang');
            var currentEl = _selfInstance.attr("data-qs"),
                result = $("#quote_type_select" + currentEl).val(),
                currentForm =  _selfInstance.parents('.inputForm'),
                residentCheck = $(currentForm).find('.ups-checkbox-custom');
            $(currentForm).find("input[name=fromAddressBook]").val($(currentForm).find(".quote-shipFrom option:selected").attr("data-fromid"));
            $(currentForm).find('input[name="toAddressBook"]').val($(currentForm).find(".quote-shipTo option:selected").attr("data-fromid"));
            $(currentForm).find("input[name=userid]").val($(currentForm).find(".quote-selectAddressFrom option:selected").attr("data-userid"));
            $(currentForm).find("input[name=profileCountry]").val($(currentForm).find(".quote-shipFrom option:selected").attr("data-profilecountry"));
            plugin.$T.find('.ups-packageWeight').val(plugin.$T.find('.ups-quote_package-weight').val());
            plugin.$T.find('.ups-destLocale,.ups-origLocale').val(plugin.options.extLocale);

            if(plugin.isLogged && UPS.configs.viewport.size==='small'){
                $(currentForm).find("input[name='origCountry']").val($(currentForm).find(".quote-shipFrom").val());
                $(currentForm).find("input[name='destCountry']").val($(currentForm).find(".quote-shipTo").val());
                if(plugin.checkView){
                    $(currentForm).find("input[name='origPostalCode']").val($(currentForm).find(".quote-shipFrom option:selected").attr("data-zipcode"));
                    $(currentForm).find("input[name='destPostalCode']").val($(currentForm).find(".quote-shipTo option:selected").attr("data-zipcode"));
                }else{
                    $(currentForm).find("input[name='origPostalCode'][type='hidden']").remove();
                    $(currentForm).find("input[name='destPostalCode'][type='hidden']").remove();
                }
            }

            /*$(currentForm).find("input[name=fromAddressBook]").val($(currentForm).find(".quote-selectAddress option:selected").attr("data-fromid"));
             fromAdd = $(".inputForm .quote-selectAddress[name=origCity] option:selected").attr("data-fromid"),
             toAdd = $(".inputForm .quote-selectAddress[name=destCity] option:selected").attr("data-fromid");*/

            if($(currentForm).find('.ups-checkbox-custom').length){
                var chkBox = _selfInstance.parents('.inputForm').find('input[name="destResident"]');
                if($(residentCheck).is(":checked")){
                    $(chkBox).val("01");
                }else{
                    $(chkBox).val("02");
                }
            }


            //added to handle navigation for us spain to different location
            //------------------
            // if(plugin.options.extLocale = "es_US"){
            //         if ( result === "letter") {
            //         if(UPS.configs.viewport.size!=='small'){
            //             $(currentForm).attr('action', 'https://es-us-apps.ups.com/ctc/request?loc='+plugin.options.extLocale+'&WT.svl=PNRO_L1&weight=&data-content-block-id=W11');
            //         }else{
            //             $(currentForm).attr('action', 'https://www.ups.com/mobile/quoteService?loc='+plugin.options.extLocale+'&t=t');
            //         }
            //     }else if (result === "package") {
            //         if(UPS.configs.viewport.size!=='small'){
            //              $(currentForm).attr('action', 'https://es-us-apps.ups.com/ctc/request?WBPM_lid=homepage/ct1.html_pnl_ctc&data-content-block-id=W11&loc='+plugin.options.extLocale);
            //         }else{
            //              $(currentForm).attr('action', 'https://www.ups.com/mobile/quoteService?loc='+plugin.options.extLocale+'&t=t');
            //         }
            //     }else {
            //          var freightType = $(currentForm).find('select[name=quote_freight-offereings]').val();
            //          $(currentForm).attr('action', 'https://es-us-apps.ups.com/fctc/timeandcost?loc='+plugin.options.extLocale+'&data-content-block-id=W11&FREIGHT_TYPE='+freightType);
            //     }

            // } else {
             //added to handle navigation for us spain and 1801C countries to different location
            
            if ( result === "letter") {
                if(UPS.configs.viewport.size!=='small'){
                    if(plugin.options.extLocale === "es_US"){
                        $(currentForm).attr('action', 'https://es-us-apps.ups.com/ctc/request?loc='+plugin.options.extLocale+'&WT.svl=PNRO_L1&data-content-block-id=W11');
                    }else if(plugin.options.country === 'SI' && locLang ==='sl'){
                        $(currentForm).attr('action', 'https://si-apps.ups.com/ctc/request?loc='+plugin.options.extLocale+'&WT.svl=PNRO_L1&data-content-block-id=W11');
                    }else if(plugin.options.country === 'UA' && locLang ==='uk'){
                        $(currentForm).attr('action', 'https://ua-apps.ups.com/ctc/request?loc='+plugin.options.extLocale+'&WT.svl=PNRO_L1&data-content-block-id=W11');
                    }else if(plugin.options.country === 'UA' && locLang ==='ru'){
                        $(currentForm).attr('action', 'https://ru-apps.ups.com/ctc/request?loc='+plugin.options.extLocale+'&WT.svl=PNRO_L1&data-content-block-id=W11');
                    }else{
                        $(currentForm).attr('action', 'https://wwwapps.ups.com/ctc/request?loc='+plugin.options.extLocale+'&WT.svl=PNRO_L1&data-content-block-id=W11');
                    }
                }else{
                    $(currentForm).attr('action', 'https://www.ups.com/mobile/quoteService?loc='+plugin.options.extLocale+'&t=t');
                }
            }else if (result === "package") {
                if(UPS.configs.viewport.size!=='small'){
                    if(plugin.options.extLocale === "es_US"){
                        $(currentForm).attr('action', 'https://es-us-apps.ups.com/ctc/request?WBPM_lid=homepage/ct1.html_pnl_ctc&data-content-block-id=W11&loc='+plugin.options.extLocale);
                    }else if(plugin.options.country === 'SI' && locLang ==='sl'){
                        $(currentForm).attr('action', 'https://si-apps.ups.com/ctc/request?WBPM_lid=homepage/ct1.html_pnl_ctc&data-content-block-id=W11&loc='+plugin.options.extLocale);
                    }else if(plugin.options.country === 'UA' && locLang ==='uk'){
                        $(currentForm).attr('action', 'https://ua-apps.ups.com/ctc/request?WBPM_lid=homepage/ct1.html_pnl_ctc&data-content-block-id=W11&loc='+plugin.options.extLocale);
                    }else if(plugin.options.country === 'UA' && locLang ==='ru'){
                        $(currentForm).attr('action', 'https://ru-apps.ups.com/ctc/request?WBPM_lid=homepage/ct1.html_pnl_ctc&data-content-block-id=W11&loc='+plugin.options.extLocale);
                    }else{
                        $(currentForm).attr('action', 'https://wwwapps.ups.com/ctc/request?WBPM_lid=homepage/ct1.html_pnl_ctc&data-content-block-id=W11&loc='+plugin.options.extLocale);
                    }
                }else{
                    $(currentForm).attr('action', 'https://www.ups.com/mobile/quoteService?loc='+plugin.options.extLocale+'&t=t');
                }
            }else {
                var freightType = $(currentForm).find('select[name=quote_freight-offereings]').val();
                if(plugin.options.extLocale === "es_US"){
                        $(currentForm).attr('action', 'https://es-us-apps.ups.com/fctc/timeandcost?loc='+plugin.options.extLocale+'&data-content-block-id=W11&FREIGHT_TYPE='+freightType);
                    }else if(plugin.options.country === 'SI' && locLang ==='sl'){
                        $(currentForm).attr('action', 'https://si-apps.ups.com/fctc/timeandcost?loc='+plugin.options.extLocale+'&data-content-block-id=W11&FREIGHT_TYPE='+freightType);
                    }else if(plugin.options.country === 'UA' && locLang ==='uk'){
                        $(currentForm).attr('action', 'https:/ua-apps.ups.com/fctc/timeandcost?loc='+plugin.options.extLocale+'&data-content-block-id=W11&FREIGHT_TYPE='+freightType);
                    }else if(plugin.options.country === 'UA' && locLang ==='ru'){
                        $(currentForm).attr('action', 'https://ru-apps.ups.com/fctc/timeandcost?loc='+plugin.options.extLocale+'&data-content-block-id=W11&FREIGHT_TYPE='+freightType);
                    }else{
                    $(currentForm).attr('action', 'https://wwwapps.ups.com/fctc/timeandcost?loc='+plugin.options.extLocale+'&data-content-block-id=W11&FREIGHT_TYPE='+freightType);
                }
            }

            //}

            //----------------
            /* if ( result === "letter") {
             if(UPS.configs.viewport.size!=='small'){
             $(currentForm).attr('action', 'https://wwwapps.ups.com/ctc/request?loc='+plugin.options.extLocale+'&WT.svl=PNRO_L1&weight=&data-content-block-id=W11');
             }else{
             $(currentForm).attr('action', 'https://www.ups.com/mobile/quoteService?loc='+plugin.options.extLocale+'&t=t');
             }
             }else if (result === "package") {
             if(UPS.configs.viewport.size!=='small'){
             $(currentForm).attr('action', 'https://wwwapps.ups.com/ctc/request?WBPM_lid=homepage/ct1.html_pnl_ctc&data-content-block-id=W11&loc='+plugin.options.extLocale);
             }else{
             $(currentForm).attr('action', 'https://www.ups.com/mobile/quoteService?loc='+plugin.options.extLocale+'&t=t');
             }
             }else {
             var freightType = $(currentForm).find('select[name=quote_freight-offereings]').val();
             $(currentForm).attr('action', 'https://wwwapps.ups.com/fctc/timeandcost?loc='+plugin.options.extLocale+'&data-content-block-id=W11&FREIGHT_TYPE='+freightType);
             }*/

            $(currentForm).submit();
        });


        /*************  Unit of Measures for weight ****************/
        //$("#quote_from--authenticated--qs, #quote_from--authenticated").change(function(e){
        plugin.$T.find('.quote-shipFrom').change(function(){
            //alert(1);
            //var _selfInstance=$(this);
            plugin.$selectedOption=$(this).find('option:selected');
            if(plugin.$selectedOption.attr('data-ischanged') ===undefined || plugin.$selectedOption.attr('data-ischanged') ==='false' ){
                plugin._fetchUOMInfo(plugin.$selectedOption.val());

                return;
            }
            plugin._formatHTML();

        });

        // RESTRICT NUMBER INPUT
        //--------------------------------------------------
        $('input.ups-numberOnly').keypress(function(key) {
            var verified = (key.which === 8 || key.which === undefined || key.which === 0) ? null : String.fromCharCode(key.which).match(/[^0-9.,]/);
            if (verified) {key.preventDefault();}
        });
    };

    Plugin.prototype._fetchUOMInfo = function(countryCode) {
        var plugin=this;
        $.ajax({
            url:plugin.options.uomUrl+"&selectedCountry="+countryCode+"&locale="+plugin.options.locale+"&country="+plugin.options.country,
            type:"post",
            dataType:"XML",
            success:function(data){
                console.log(data,$(data).find('key').length);
                var key=[],label=[];
                $.each($(data).find('key'),function(){
                    key.push( $(this).text());
                });
                $.each($(data).find('label'),function(){
                    label.push( $(this).text());
                });
                plugin.$selectedOption.attr('data-ischanged',true).attr('data-uom-key',key.join(',')).attr('data-uom-label',label.join(','));
                plugin._formatHTML();
            }
        });
    };
    
    Plugin.prototype._assignAriaLabel = function(unit){
    	var plugin = this,
    	lowerUnit = unit.toLowerCase();
    	if(lowerUnit === 'kgs' || lowerUnit === 'kg'){
            plugin.$weightInputField.attr('aria-label',plugin.$weightInputDiv.data('kgs'));
        }else if(lowerUnit === 'lbs' || lowerUnit === 'lb'){
            plugin.$weightInputField.attr('aria-label',plugin.$weightInputDiv.data('lbs'));
        }
    };

    Plugin.prototype._formatHTML=function(){
        var plugin=this;
        var key = plugin.$selectedOption.attr('data-uom-key');
        plugin.$weightInputDiv = plugin.$T.find('.weight_input');
        plugin.$weightInputField = plugin.$T.find('.weight_input input');
        //var currentForms = $(this).attr("data-qs");
        var keyArr=key.split(",");
        if(keyArr.length>1){
            //$(".ups-uom" + currentForms).hide();
            //$("#ups-dropdown-mutliUnit" + currentForms).show();
            plugin.$T.find(".ups-input_unit.ups-uom").addClass(UPS.configs.inActiveClass).removeClass(UPS.configs.activeClass).empty();
            plugin.$T.find(".ups-input_unit.ups-dropdown_wrapper").removeClass(UPS.configs.inActiveClass).addClass(UPS.configs.activeClass);
            var options='';
            var labelArr=plugin.$selectedOption.attr('data-uom-label').split(',');
            for(var i=0;i<keyArr.length;i++){
                options+='<option value="'+keyArr[i]+'">'+labelArr[i]+'</option>';
            }
            plugin.$T.find(".ups-dropdown-mutliUnit").html(options);
            var dropKey = plugin.$T.find(".ups-dropdown-mutliUnit option:selected").attr('value');
            plugin._assignAriaLabel(dropKey);
            plugin.$T.find(".ups-dropdown-mutliUnit").change(function(){
            	var newDropKey = $(this).find('option:selected').attr('value');
            	plugin._assignAriaLabel(newDropKey);
            });
        } else {
        	plugin._assignAriaLabel(key);
            plugin.$T.find(".ups-input_unit.ups-uom").removeClass(UPS.configs.inActiveClass).addClass(UPS.configs.activeClass);
            plugin.$T.find(".ups-input_unit.ups-dropdown_wrapper").addClass(UPS.configs.inActiveClass).removeClass(UPS.configs.activeClass);
            plugin.$T.find(".ups-input_unit.ups-uom").text(plugin.$selectedOption.attr('data-uom-label'));
            // $(".ups-uom" + currentForms).show();
            // $("#ups-dropdown-mutliUnit" + currentForms).hide();
        }
    };

    Plugin.prototype._loggedInFailedView = function() {
        var plugin=this;

        plugin.$T.find(".ups-notLoggedIn").addClass(UPS.configs.activeClass).removeClass(UPS.configs.inActiveClass);
        plugin.$T.find(".ups-loggedIn").addClass(UPS.configs.inActiveClass).removeClass(UPS.configs.activeClass);
        plugin.$T.find(".ups-notLoggedIn").find('input,select').removeAttr('disabled',"true");
        plugin.$T.find(".ups-loggedIn").find('input,select').attr('disabled',"true");
        plugin.$T.find('.ups-quote_residential').removeClass(UPS.configs.inActiveClass).addClass(UPS.configs.activeClass).find('input').removeAttr('disabled');
        plugin.$T.find(".ups-notLoggedIn").find('select[name=destCountry]').find('option[value='+plugin.options.country+']').prop('selected','selected');
        plugin.$T.find(".ups-notLoggedIn").find('select[name=origCountry]').find('option[value='+plugin.options.country+']').prop('selected','selected');
    };

    Plugin.prototype._loggedInSuccessView = function() {
        var plugin=this;
        plugin.$T.find(".ups-notLoggedIn").addClass(UPS.configs.inActiveClass).removeClass(UPS.configs.activeClass);
        plugin.$T.find(".ups-loggedIn").addClass(UPS.configs.activeClass).removeClass(UPS.configs.inActiveClass);
        plugin.$T.find(".ups-notLoggedIn").find('input,select').attr('disabled',"true");
        plugin.$T.find(".ups-loggedIn").find('input,select').removeAttr('disabled',"true");
        plugin.$T.find('.ups-quote_residential').addClass(UPS.configs.inActiveClass).removeClass(UPS.configs.activeClass).find('input').attr('disabled',true);
    };

    /*
     * process AJAX success response
     */
    Plugin.prototype.processAddressSuccessResp = function(resp) {
        var plugin=this;
        var userAddress=resp.data.responseJSON.ManageAddressesByTagsResponse;
        if(userAddress!==undefined && userAddress.AddressList!==undefined){
            var addressList;
            if(Array.isArray(userAddress.AddressList)){
                addressList = userAddress.AddressList;
            }else{
                addressList = [];
                addressList.push(userAddress.AddressList);
            }
            console.log(addressList);
            if(addressList!==undefined && addressList.length>0){
                plugin.renderQuoteAddress(addressList);
                plugin.checkView=true;
                plugin._loggedInSuccessView();
            }else{
                plugin.checkView=false;
                plugin._loggedInFailedView();
            }
        }else{
            plugin.checkView=false;
            plugin._loggedInFailedView();
        }
    };

    Plugin.prototype.processUserInfoSuccessResponse = function(resp) {
        var plugin=this;
        var availableUserInfo = resp.data.responseJSON.ProfileRetrieveUserInfoResponse.UserInformation.PhysicalAddress;
        plugin.renderUserInfo(availableUserInfo);
    };


    // process error response from webservice
    Plugin.prototype.processAddressErrorResp = function() {
        //var errorMessage = response.data.responseJSON.ManageAddressesByTagsResponse.Response.ResponseStatusDescription;
        var plugin = this;
        //$("#quoteWidget").hide();
        plugin.$T.find(".ups-quote .ups-widget_panel .ups-widget_errors").show();
    };

    //process AJAX error response
    Plugin.prototype.processAddressNetError = function() {
        //var errorMessage = status;
        var plugin=this;
        plugin.$T.find(".ups-quote .ups-widget_panel .ups-widget_errors").show();
        //display network error
    };

    Plugin.prototype.renderQuoteAddress = function(data) {
        var plugin=this;
        var options, index, selectFrom, selectTo, optionFrom="", optionTo = "<option value=''>"+plugin.options.content.shipTo+"</option>";
        selectFrom = $(".quote-shipFrom");
        selectTo = $(".quote-shipTo");
        //console.log(sourceInfo);
        //console.log(data);
        //data.unshift(sourceInfo);
        if(data.length === 0) {
            return;
        }
        options = data;
        //optionFrom += "'<option value= '"+plugin.sourceInfo.Country+ "' data-profilecity= '"+plugin.sourceInfo.City+"' data-profilecountry= '"+plugin.sourceInfo.Country+ "' data-profilezipcode= '"+plugin.sourceInfo.PostalCode+"' data-zipcode= '"+plugin.sourceInfo.PostalCode+"'>"+plugin.options.content.profileAddress+" </option>";
        var defaultIndex;
        for (index = 0; index < options.length; ++index) {
            var result = options[index];
            if(result.hasOwnProperty('DefaultContactIndicator')){
                defaultIndex = "<option data-zipcode='"+result.PhysicalAddress.PostalCode+"' data-countrycode='"+result.PhysicalAddress.Country+"' value='"+result.PhysicalAddress.Country+"' data-fromid='"+ result.AddressID +"'>"+plugin.options.content.profileAddress+"</option>";
            }
            optionFrom += "<option data-zipcode='"+result.PhysicalAddress.PostalCode+"' data-countrycode='"+result.PhysicalAddress.Country+"' value='"+result.PhysicalAddress.Country+"' data-fromid='"+ result.AddressID +"'>"+result.AddressNickname+"</option>";

            optionTo += "<option data-zipcode='"+result.PhysicalAddress.PostalCode+"' data-countrycode='"+result.PhysicalAddress.Country+"' value='"+result.PhysicalAddress.Country+"' data-fromid='"+result.AddressID+"'>"+result.AddressNickname+"</option>";
        }

        $.each(selectFrom,function(i,item){
            if($(item).attr("data-isLogged") === "true")
                item.innerHTML = defaultIndex + optionFrom;
        });

        $.each(selectTo,function(i,item){
            if($(item).attr("data-isLogged") === "true")
                item.innerHTML = optionTo;
        });

    };

    // process error response from webservice
    // Plugin.prototype.processUserInfoErrorResponse = function(response) {
    //       console.log(response);
    //       $("#quoteWidget").hide();
    //       $(".nonLoggedQuote").show();
    // };

    //process AJAX error response
    // Plugin.prototype.processUserInfoNetworkError = function(status) {
    //     var errorMessage = status;
    //       //display network error
    // };


    Plugin.prototype.renderUserInfo = function(data) {
        var plugin=this;
        plugin.getUserInfo.ProfileRetrieveUserInfoResponse = data;
        plugin.sourceInfo = data;
        plugin.initAddress();
    };

    /** #### JQUERY HOOK #### */
    $.fn[ PLUGIN_NS ] = function( methodOrOptions ) {
        var plugin = this;
        if (!$(plugin).length) {
            return $(plugin);
        }
        var instance = $(plugin).data(PLUGIN_NS);

        if ( instance && methodOrOptions!==undefined && (methodOrOptions.hasOwnProperty('indexOf') && methodOrOptions.indexOf('_') !== 0) && instance[ methodOrOptions ] && typeof( instance[ methodOrOptions ] ) === 'function' ) {
            return instance[ methodOrOptions ]( Array.prototype.slice.call( arguments, 1 ) );
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            instance = new Plugin( $(plugin), methodOrOptions );
            $(plugin).data( PLUGIN_NS, instance );
            return $(plugin);
        } else if ( !instance ) {
            $.error( 'Plugin must be initialised before using method: ' + methodOrOptions );
        } else if ( methodOrOptions.indexOf('_') === 0 ) {
            $.error( 'Method ' +  methodOrOptions + ' is private!' );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist.' );
        }
    };
})(jQuery);
