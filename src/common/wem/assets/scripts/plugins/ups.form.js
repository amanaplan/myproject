  (function( $ ){
    'use strict';

    var PLUGIN_NS = 'upsForm';

    var Plugin = function(target) {
        var plugin = this;

        plugin.$T = $(target);

        plugin.$window = $(window);

        plugin._init( target );

        return plugin;
    };


    Plugin.prototype._init = function() {
        var plugin = this;

        plugin._setTooltips();
        //plugin._setInputPopovers();


//      var charactersRemaining = plugin.$T.find('.ups-textArea_characters');
        var textArea = plugin.$T.find('.ups-textArea');
        var dropdown = plugin.$T.find('.ups-dropdown');
        var charAnounce = plugin.$T.find('.ups-charAnounce');
        
        



        //Set up Help bubbles


//        plugin.$T.find('.ups-help_wrapper').each(function(i,el) {
//            var $this = $(this);
//
//            var link = $this.find('.ups-help_link');
//            var tooltip = $this.find('.ups-help_tooltip');
//
//            var margin = $this.outerWidth() - $this.find('.ups-input_wrapper').children().outerWidth();
//
//            if(margin !== 0) {
//                if(tooltip.css('right') === 'auto'){
//                    link.css('right', margin);
//                    tooltip.css('left',$this.outerWidth() - margin);
//                } else {
//                    link.css('left', margin);
//                    tooltip.css('right',$this.outerWidth() - margin);
//                }
//
//            }
//
//
//        });

        dropdown.on('click',function(){
            var _self=$(this);
            if(_self.val()==='0' ||_self.val()===0 ){
                _self.siblings('.ups-form_group').addClass(UPS.configs.activeClass);
                _self.siblings('.ups-form_group').find('input[type="text"]').removeAttr('disabled');
            }else{
                _self.siblings('.ups-form_group').removeClass(UPS.configs.activeClass);
                _self.siblings('.ups-form_group').find('input[type="text"]').attr('disabled','disabled');
            }
        });

        textArea.on('keyup blur', function() {
            var _self=$(this);
            var $_parent = _self.parents('.ups-form_group');
            var totalCharactersLength = $_parent.find('.ups-charCount');
            var enteredCharactersLength = $_parent.find('.ups-charLeft');
            var maxlength = _self.attr('maxlength');
            
            

            //     charactersRemaining.html('(0 of '+maxlength+' characters)');
            totalCharactersLength.html(maxlength);
            enteredCharactersLength.html('0');
            var val = _self.val();
            var $_length= val.length;
            var chrome= window.chrome;
            if(chrome){
                var $enterLen=  val.match(/(\r\n|\n|\r)/g);
                if($enterLen!==null && $enterLen.length>0 ){
                    $_length=$_length+$enterLen.length;
                }
            }

            // Trim the field if it has content over the maxlength for IE9
            if ($_length >= Number(maxlength)) {
                _self.val(val.slice(0, maxlength));
//                charactersRemaining.html('('+maxlength + ' of '+maxlength+' characters)');
                enteredCharactersLength.html(maxlength);
                totalCharactersLength.html(maxlength);
                $_parent.find('.ups-textArea_characters').addClass(UPS.configs.activeClass);
            } else {
//              charactersRemaining.html('('+val.length + ' of '+maxlength+' characters)');
                enteredCharactersLength.html($_length);
                $_parent.find('.ups-textArea_characters').removeClass(UPS.configs.activeClass);
            }
            if((Number(enteredCharactersLength.html())) % 50 === 0 ||(Number(enteredCharactersLength.html())) === 0 ){
            	//$(charAnounce).html(enteredCharactersLength.text()+' of '+totalCharactersLength.text());
            	if($('.ups-textArea_characters').length){
                	//plugin.$T.find('.ups-textArea_characters').append('<span class="ups-readerTxt ups-charAnounce">'+enteredCharactersLength.text()+' of '+totalCharactersLength.text()+  '</span>');
            		plugin.$T.find('.ups-textArea_characters').attr('aria-live','polite');
            		$(charAnounce).attr('aria-hidden','false');
            		$(charAnounce).html(enteredCharactersLength.text()+' of '+totalCharactersLength.text());
                }
            	
            } else{
            	$(charAnounce).attr('aria-hidden','true');
            	plugin.$T.find('.ups-textArea_characters').attr('aria-live','off');
            }

        });

        // Allows user to hit the enter key to check
        plugin.$T.find('.ups-checkbox-custom').keypress(function(e){
            if((e.keyCode ? e.keyCode : e.which) === 13){
                e.preventDefault();
                $(this).trigger('click');
            }
        });


        $(window).load(function() {
            plugin.$T.find('#g-recaptcha-response').attr({'required':'','aria-required':'true','data-parsley-required-message':(plugin.$T.find("#captcha_element").data('captcha-errormsg')!==undefined?plugin.$T.find("#captcha_element").data('captcha-errormsg'):'Captcha is required')});
        });

        plugin.$T.parsley().on('field:validated', function(formInstance) {
            //console.log(formInstance);
            /*var $_elem=plugin.$T.find('[data-parsley-id="'+formInstance.__id__+'"]').parent();
            var ok = $_elem.find('.parsley-error').length === 0;
            if(!ok){
                $_elem.removeClass('ups-noError').addClass('ups-showError');
            }else{
                $_elem.addClass('ups-noError').removeClass('ups-showError');
            }
            if(plugin.$T.find('.parsley-error').length === 0){
                plugin.$T.removeClass('ups-error_show');
            }else{
                plugin.$T.addClass('ups-error_show');
                plugin._checkErrors();
            }*/
        	setTimeout(function(){
                var $_elem = plugin.$T.find('[data-parsley-id="' + formInstance.__id__ + '"]').parent();
                var $_actualElem = plugin.$T.find('[data-parsley-id="' + formInstance.__id__ + '"]');
                var $_elemErrorDiv = $($_actualElem).parent().find('.parsley-errors-list.filled');
                var $_elemErrorDivId = $($_actualElem).parent().find('.parsley-errors-list.filled').attr('id');
                var ok = $_elem.hasClass('parsley-error') ? false :  $_elem.find('.parsley-error').length === 0;

                //console.log($_elem, ok);

                if(!ok){
                    $_elem.removeClass('ups-noError').addClass('ups-showError');
                    $_actualElem.attr("aria-invalid","true");
                    if(($_actualElem).parents('.ups-form_group').find('.ups-form_subheader').length){
                    	var secLabel = ($_actualElem).parents('.ups-form_group').find('.ups-form_subheader'),
                    	secLabelId = ($_actualElem).parents('.ups-form_group').find('.ups-form_subheader').attr('id');
                    	$(secLabel).attr('tabindex','-1');
                    	$($_elemErrorDiv).attr('tabindex','-1');
                    	$_actualElem.attr("aria-describedby",$_elemErrorDivId + ' ' + secLabelId);
                    }else{
                    	$_actualElem.attr("aria-describedby",$_elemErrorDivId);
                    }
                    
                }
                else{
                    $_elem.addClass('ups-noError').removeClass('ups-showError');
                    $_actualElem.attr("aria-invalid","false");
                    $_actualElem.removeAttr("aria-describedby");
                }

                if(plugin.$T.find('.parsley-error').length === 0){
                    plugin.$T.removeClass('ups-error_show');
                }
                else{
                    plugin.$T.addClass('ups-error_show');
                    plugin._checkErrors();
                }
            }, 100);
        }).on('form:error',function(instance){
            for (var i=0;i<instance.fields.length;i++){
            	var formGroup = $(instance.fields[i].$element[0]).closest('.ups-form_group');

                if(!formGroup.find('.error-list-wrapper').length){
                    formGroup.find('.parsley-errors-list').wrap('<div class="error-list-wrapper"></div>');
                }

                if(formGroup.find('.error-list-wrapper').siblings('select').length <1 && !formGroup.find('.error-list-wrapper').find('.ups-icon-exclamation').length){
                    formGroup.find('.error-list-wrapper').prepend('<span class="ups-icon-exclamation" aria-hidden="true"></span>');
                }
                if($(instance.fields[i].$element[0]).attr('type')==='checkbox'){
                    if($(instance.fields[i].$element[0]).closest('fieldset').length>0){
                        var $_fieldset=$(instance.fields[i].$element[0]).closest('fieldset');
                        $_fieldset.find('.parsley-errors-list').appendTo($_fieldset);
                    }
                }
            }

            if(plugin.$T.find('.ups-zoneChart').length ===0 && typeof utag!=='undefined' && utag!==undefined){
                utag.track('link',{
                    link_name : "RMI",
                    link_page_name : document.title,
                    event_id : '702',
                    event_type: 'Form Error'
                });
            }
        }).on('form:submit', function() {
            if(plugin.$T.find('.ups-zoneChart').length){
                plugin.$T.submit();
                return false;
            } else{
                plugin._toJson();
                return false;
            }
            //return false; // Don't submit form for this demo
        });

        plugin.$T.find('.ups-checkbox-custom[required]').on('change', function(){
            //console.log('change');
            $(this).parsley().validate();
        });

        /* plugin.$T.find('.ups-form_ctaGroup .ups-cta_primary').on('click',function(e){
            e.preventDefault();
             //var form = plugin.$T;
           if(plugin._validateForm()) {
	            if($(this).parents('.ups-zoneChart').length){
	                plugin.$T.submit();
	                return false;
	        	} else{
	        		plugin._toJson();
	                return false;
	        	}
            }
        });*/

        plugin.$T.find('.ups-form_ctaGroup .ups-form_cancel').on('click',function(e){
            e.preventDefault();
             var r = confirm(plugin.$T.find('.ups-cancelText').text());
            if (r === true) {
                var _selfForm=$(this).parents("form");
                _selfForm.removeClass('ups-error_show');
                _selfForm.find('.ups-noError').removeClass('ups-noError');
                _selfForm.find('.parsley-errors-list').remove();
                _selfForm.find('.ups-charLeft').text(0);
                _selfForm[0].reset();
            }
        });

        //Handle input type file interaction
        /*
        plugin.$T.find('.ups-browse_button').on('click', function() {
            var formGroup = $(this).closest('.ups-form_group');
            var inputFile = formGroup.find('input[type='file']');
            inputFile.trigger('click');
        });
        plugin.$T.find('input[type='file']').on('change', function() {
            var formGroup = $(this).closest('.ups-form_group');
            formGroup.find('.ups-file_input').val($(this).val());
        });
        /*

        //Handle show/hide password buttons
        /*
        plugin.$T.find('.ups-show_password_wrapper button').on('click', function() {
            var formGroup = $(this).closest('.ups-show_password_wrapper');
            var showLink = formGroup.find('.ups-show_password_link');
            var hideLink = formGroup.find('.ups-hide_password_link');
            var passwordInput = formGroup.find('.ups-form_input');
            if($(this).hasClass('ups-show_password_link')) {
                passwordInput.attr('type', 'text');
                if(!hideLink.hasClass(UPS.configs.activeClass)){
                    hideLink.addClass(UPS.configs.activeClass);
                    showLink.removeClass(UPS.configs.activeClass);
                    hideLink.focus();
                }
            } else {
                passwordInput.attr('type', 'password');
                if(!showLink.hasClass(UPS.configs.activeClass)){
                    showLink.addClass(UPS.configs.activeClass);
                    hideLink.removeClass(UPS.configs.activeClass);
                    showLink.focus();
                }
            }
        });
        */

        /*
        plugin.$T.find('.ups-form_user_id input').on('focus keyup', function() {
            plugin._validateUserID();
        });
        plugin.$T.find('.ups-form_user_password input').on('focus keyup', function() {
            plugin._validateUserPassword();
        });
        plugin.$T.find('.ups-checkbox_reveal .ups-checkbox input').on('change', function() {
            plugin.checkedReveal();
        });
        */
    };
    Plugin.prototype._checkErrors=function(){
        var plugin=this;
        plugin.$T.find('.ups-errorChannel').empty();
        if(plugin.$T.hasClass('ups-error_show')){
            $.each(plugin.$T.find('.parsley-errors-list'),function(){
                var _self=$(this),
                _actElem = (_self).parents('.ups-form_group').find('input, select, textarea').attr('id');
                plugin.$T.find('.ups-errorChannel').append('<li><a href="#'+_actElem+'">'+_self.find('li').text()+'</a></li>');
            });
        }else{
        }
    };

    Plugin.prototype._toJson = function(){
    	var plugin = this;
    	plugin.formData = {};
    	var form = plugin.$T, key, val, str='';
    	form.find('input').each(function(){
            if($(this).attr('data-name')!== undefined){
                if($(this).attr('type') === 'checkbox' ){
                    if($(this).is(':checked')){
                        if(plugin.formData[$(this).attr('data-name')]){
                            str = plugin.formData[$(this).attr('data-name')] +','+ $(this).val();
                            plugin.formData[key] = str; //encodeURIComponent(str);
                        } else{
                            key = $(this).attr('data-name');
                            val = $(this).val();
                            plugin.formData[key] = val; //encodeURIComponent(val);
                        }
                    }
                }else{
                    key = $(this).attr('data-name');
                    val = $(this).val();
                    plugin.formData[key] = val; //encodeURIComponent(val);
                }
            }
    	});

        if(plugin.formData.st === undefined || plugin.formData.st === ''){
            plugin.formData.st = 'X';
        }

        if(plugin.formData.rmiPath === undefined || plugin.formData.rmiPath === ''){
            plugin.formData.rmiPath = window.location.href;
        }

    	form.find('select,textarea').each(function(){
			//key = $(this).attr('data-name');
    		if($(this).attr('data-name') !== undefined){
                	key = $(this).attr('data-name');
				}else{
	                key = $(this).attr('name');
	                if(key === "g-recaptcha-response"){
	                	$("input[name=recaptchaResp]").attr("value",$(this).val());
	                	plugin.formData.recaptchaResp = $(this).val(); //encodeURIComponent($(this).val());
	                }
				}
    		val = $(this).val();
    		plugin.formData[key] = val; //encodeURIComponent(val);
    	});


        $('.ups-formConfirmation_wrap').show(function(){
            if($('.ups-formConfirmation_wrap .ups-article-header').length) {
                $('html, body').animate({
                    scrollTop: $('.ups-formConfirmation_wrap .ups-article-header').offset().top - 250
                }, 500);
            }
        });

    	//console.log(plugin.formData);
    	//var msg = form.find($('input[name='confirmBodyCopy']')).attr('value');
    	//form.hide();


        $.ajax({
            //url: 'https://www.ups.com/bussol_servlet/BSEAServlet?action=requestMoreInfo',
            url: plugin.$T.attr('action'),
            type: 'post',
            dataType: 'html',
            data: plugin.formData,
            contentType:"application/x-www-form-urlencoded",
            crossDomain:true,
            success: function (data,textStatus,jqxhr) {
                //console.log("Form Success",data,textStatus,jqxhr);
                $('.ups-formConfirmation_wrap').show(function(){
                     $('html, body').animate({
                            scrollTop: $(".ups-formConfirmation_wrap").offset().top - 150
                        }, 500);
                });
                if(typeof utag!=='undefined' && utag!==undefined){
                    utag.track('link',{
                        link_name: "RMI",
                        link_page_name: document.title,
                        event_id: '701',
                        event_type: 'Form Success'
                    });
                }
            },
            error:function(event, request, settings){
                //console.log("Form Error",event,request,settings);
                $('.ups-formConfirmation_wrap').hide();
                $('.ups-formFailure_wrap').show(function(){
                    $('html, body').animate({
                        scrollTop: $(".ups-formFailure_wrap").offset().top - 150
                    }, 500);
                });
                if(typeof utag!=='undefined' && utag!==undefined){
                    utag.track('link',{
                        link_name : "RMI",
                        link_page_name : document.title,
                        event_id : '702',
                        event_type: 'Form Error'
                    });
                }
            }

        });
        form.parents('.ups-form_wrap').hide();
    };

    /*
    Plugin.prototype._setInputPopovers = function() {
        var plugin = this;

        // INITIALIZE BOOTSTRAP POPOVERS
        //--------------------------------------------------
        $('[data-toggle="popover"]').popover();

        var popoverWraps = plugin.$T.find('.ups-form_group.ups-form_popover');

        for(var i = 0; i<popoverWraps.length; i++) {
            var inputWrapper = $(popoverWraps[i]).find('.ups-input_wrapper');
            var input = $(inputWrapper).find('.ups-form_input');
            var popoverContent = $(inputWrapper).find('.ups-popover_content');
            var placement = 'top';
            switch (UPS.configs.viewport.size) {
                case 'small':
                    placement = 'top';
                    break;
                //case 'mediumMid':
                    //placement = 'top';
                    //break;
                default:
                    if(UPS.configs.isRTL) {
                        placement = 'left';
                    } else {
                        placement = 'right';
                    }
            }

            input.popover({
                html: 'true',
                trigger: 'focus',
                placement: placement,
                content: popoverContent.html()
            });
        }
    };
    */

    Plugin.prototype._setTooltips = function() {
        var $helpBtns = $('.ups-help');

        for (var iHelp = 0; iHelp < $helpBtns.length; iHelp++) {
            (function() {
                var $helpBtn = $($helpBtns[iHelp]).find('.ups-help_link');
                var $closeBtn = $($helpBtns[iHelp]).find('.ups-help_close');

                $helpBtn.on('click',function() {
                    var $this = $(this);

                    if(!$this.hasClass(UPS.configs.activeClass)){
                        $this.addClass(UPS.configs.activeClass);
                        $('.ups-help_tooltip').fadeOut();
                        $this.siblings('.ups-help_tooltip').fadeIn();
                    }
                });

                $closeBtn.on('click',function() {
                    $('.ups-help_link').removeClass(UPS.configs.activeClass);
                    $('.ups-help_tooltip').fadeOut();
                });
            })();
        }
    };

   /* Plugin.prototype._validateForm = function() {
        var plugin = this;

        var formGroups = plugin.$T.find('.ups-form_group.ups-form_required');

        var submit = true;

        for(var i = 0; i<formGroups.length; i++){
            var inputs = $(formGroups[i]).find('.ups-input_wrapper');
            var completed = true;
            var error_msg = 'This field is required';

            if(inputs.data('errormsg')) {
                error_msg = inputs.data('errormsg');
            }

            if(inputs.hasClass('ups-text_wrapper')) {
                if(inputs.find('.ups-form_input').val() === '') {
                    completed = false;
                }
            } else if(inputs.hasClass('ups-dropdown_wrapper')) {
                if(inputs.find('.ups-dropdown').val() === '') {
                    completed = false;
                }
            } else if(inputs.hasClass('ups-textArea_wrapper')) {
                if(inputs.find('.ups-textArea').val() === ''){
                    completed = false;
                }
            } else if(inputs.hasClass('ups-buttonList_wrapper')) {
                if(inputs.parent().find('.ups-radio-custom:checked, .ups-checkbox-custom:checked').length === 0) {
                    completed = false;
                }
            } else if(inputs.hasClass('ups-checkbox')) {
                if(inputs.parent().find('.ups-checkbox-custom:checked').length === 0) {
                    completed = false;
                }
            }


            if(completed === false) {
                submit = false;
                if(!$(formGroups[i]).hasClass('ups-error')) {
                    $(formGroups[i]).find('.ups-form_label').not('.ups-buttonList_wrapper .ups-form_label').prepend('<span class = "ups-error_exclaim">[ ! ]</span>');
                       if(!inputs.hasClass('ups-checkbox')){
                           $(formGroups[i]).addClass('ups-error_showMsg').find('.ups-form_label').not('.ups-buttonList_wrapper .ups-form_label');//.append('<div class="ups-form_errorWrap"><div class="ups-form_errorMsg"><p>'+error_msg+'</p></div></div>');
                       }
                    $(formGroups[i]).addClass('ups-error');
//                    inputs.find(">:first-child");
                }
            } else {
                $(formGroups[i]).removeClass('ups-error');
                $(formGroups[i]).find('.ups-error_exclaim').remove();
                $(formGroups[i]).find('.ups-form_errorWrap').remove();
            }
        }

        if(formGroups.hasClass('ups-error')){
            plugin.$T.find('.ups-form_group.ups-error .ups-input_wrapper').first().children().focus();
        }

        if(!submit){
            plugin.$T.addClass('ups-error_show');
        }

        return submit;
    };*/

    /*
    Plugin.prototype.checkedReveal = function() {
        var plugin = this;

        var wrappers = plugin.$T.find('.ups-checkbox_reveal');

        for(var i = 0; i<wrappers.length; i++) {
            var formGroup = $(wrappers[i]).find('.ups-form_group');
            var revealContent = $(wrappers[i]).find('.ups-reveal_content');
            var input = formGroup.find('.ups-input_wrapper input');

            if(input.prop('checked')) {
                revealContent.slideDown(UPS.configs.mainTransitionSpeed);
            } else {
                revealContent.slideUp(UPS.configs.mainTransitionSpeed);
            }
        }
    };
    */

    /*
    Plugin.prototype._validateUserID = function() {
        var plugin = this;

        var formGroups = plugin.$T.find('.ups-form_group.ups-form_user_id');

        var submit = true;

        for(var i = 0; i<formGroups.length; i++){
            var inputWrapper = $(formGroups[i]).find('.ups-input_wrapper');
            var input = $(inputWrapper).find('.ups-form_input');
            var completionCheck = $(inputWrapper).find('.ups-icon-check');
            var popoverContent = $(inputWrapper).find('.popover');
            var credentialsList = popoverContent.find('li');
            //credentialsList:[length, spaces, special]
            var value = input.val();
            var idLength = value.length;

            var longEnough = false;
            var spaces = false;
            var specials = false;

            //test length
            if(idLength >= 1 && idLength <=16) {
                longEnough = true;
                if(!$(credentialsList[0]).hasClass(UPS.configs.activeClass)) {
                    $(credentialsList[0]).addClass(UPS.configs.activeClass);
                }
            } else {
                longEnough = false;
                if($(credentialsList[0]).hasClass(UPS.configs.activeClass)) {
                    $(credentialsList[0]).removeClass(UPS.configs.activeClass);
                }
            }

            //test no spaces
            if(!/\s/.test(value)) {
                spaces = true;
                if(!$(credentialsList[1]).hasClass(UPS.configs.activeClass)) {
                    $(credentialsList[1]).addClass(UPS.configs.activeClass);
                }
            } else {
                spaces = false;
                if($(credentialsList[1]).hasClass(UPS.configs.activeClass)) {
                    $(credentialsList[1]).removeClass(UPS.configs.activeClass);
                }
            }

            //test no specials
            if(!/[:;<>"&\\%]/.test(value)) {
                specials = true;
                if(!$(credentialsList[2]).hasClass(UPS.configs.activeClass)) {
                    $(credentialsList[2]).addClass(UPS.configs.activeClass);
                }
            } else {
                specials = false;
                if($(credentialsList[2]).hasClass(UPS.configs.activeClass)) {
                    $(credentialsList[2]).removeClass(UPS.configs.activeClass);
                }
            }

            //met all criteria
            if(longEnough && spaces && specials) {
                if(!completionCheck.hasClass(UPS.configs.activeClass)) {
                    completionCheck.addClass(UPS.configs.activeClass);
                }
                submit = true;
            } else {
                if(completionCheck.hasClass(UPS.configs.activeClass)) {
                    completionCheck.removeClass(UPS.configs.activeClass);
                }
                submit = false;
            }
        }

        return submit;
    };
    */

    /*
    Plugin.prototype._validateUserPassword = function() {
        var plugin = this;

        var formGroups = plugin.$T.find('.ups-form_group.ups-form_user_password');

        var submit = true;
        for(var i = 0; i<formGroups.length; i++){
            var inputWrapper = $(formGroups[i]).find('.ups-input_wrapper');
            var input = $(inputWrapper).find('.ups-form_input');
            var completionCheck = $(inputWrapper).find('.ups-icon-check');
            var popoverContent = $(inputWrapper).find('.popover');
            var credentialsList = popoverContent.find('li');
            //credentialsList:[lowercase, uppercase, number, special]
            var value = input.val();
            var pwdLength = value.length;
            var longEnough = false;
            var counter = 0;

            //test length
            if(pwdLength >= 7 && pwdLength <=26) {
                longEnough = true;
            }

            //test lowercase
            if(/[a-z]/.test(value)) {
                counter++;
                if(!$(credentialsList[0]).hasClass(UPS.configs.activeClass)) {
                    $(credentialsList[0]).addClass(UPS.configs.activeClass);
                }
            } else {
                if($(credentialsList[0]).hasClass(UPS.configs.activeClass)) {
                    $(credentialsList[0]).removeClass(UPS.configs.activeClass);
                }
            }

            //test uppercase
            if(/[A-Z]/.test(value)) {
                counter++;
                if(!$(credentialsList[1]).hasClass(UPS.configs.activeClass)) {
                    $(credentialsList[1]).addClass(UPS.configs.activeClass);
                }
            } else {
                if($(credentialsList[1]).hasClass(UPS.configs.activeClass)) {
                    $(credentialsList[1]).removeClass(UPS.configs.activeClass);
                }
            }

            //test number
            if(/\d/.test(value)) {
                counter++;
                if(!$(credentialsList[2]).hasClass(UPS.configs.activeClass)) {
                    $(credentialsList[2]).addClass(UPS.configs.activeClass);
                }
            } else {
                if($(credentialsList[2]).hasClass(UPS.configs.activeClass)) {
                    $(credentialsList[2]).removeClass(UPS.configs.activeClass);
                }
            }

            //test special
            if(/[!@#$%&*]/.test(value)) {
                counter++;
                if(!$(credentialsList[3]).hasClass(UPS.configs.activeClass)) {
                    $(credentialsList[3]).addClass(UPS.configs.activeClass);
                }
            } else {
                if($(credentialsList[3]).hasClass(UPS.configs.activeClass)) {
                    $(credentialsList[3]).removeClass(UPS.configs.activeClass);
                }
            }

            if(longEnough && counter >= 3) {
                if(!completionCheck.hasClass(UPS.configs.activeClass)) {
                    completionCheck.addClass(UPS.configs.activeClass);
                }
            } else {
                if(completionCheck.hasClass(UPS.configs.activeClass)) {
                    completionCheck.removeClass(UPS.configs.activeClass);
                }
            }
        }

        return submit;
    };
    */


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
