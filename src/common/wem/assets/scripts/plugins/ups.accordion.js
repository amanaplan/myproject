(function($) {
    'use strict';

    var PLUGIN_NS = 'upsAccordion';

    var Plugin = function(target, options) {
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
    Plugin.prototype._init = function() {
        var plugin = this;

        plugin.$accordion = $('.ups-accordion_wrapper');
        plugin.$accordionLang = $('.ups-langSelect_accordion');
        plugin.$accordionToggle = plugin.$T.find('.ups-accordion_toggle');
        plugin.$accordionWrapper = plugin.$T.find('.ups-accordion_item');
        plugin.$accordionTitle = plugin.$T.find('.ups-accordion_title');
        plugin.$accordionContent = plugin.$T.find('.ups-accordion_expand');

        plugin.hasScroll = (function() {
            var sData = plugin.$accordion.data('noscroll');
            return (typeof sData === 'boolean')? !sData: true;
        })();


        //Set closed height for each accordion section.
        //plugin.initHeight();

        for(var aToggle = 0; aToggle < plugin.$accordionToggle.length; aToggle++) {
            (function() {
                var $aTog = $(plugin.$accordionToggle[aToggle]);
                var $aWrap = $aTog.parents('.ups-accordion_item');
                var $aContent= $aWrap.find('.ups-accordion_expand');

                if(!$aTog.hasClass('current_page')) {
                    $aTog.on('click', function(e) {
                        e.preventDefault();
                        if (!$aTog.hasClass(UPS.configs.activeClass)) {
                            //plugin.$accordionToggle.removeClass(UPS.configs.activeClass).attr('aria-selected',false).attr('aria-expanded',false);
                            plugin.$accordionToggle.removeClass(UPS.configs.activeClass).attr('aria-expanded',false);
                            //plugin.$accordionToggle.find('.ups-readerTxt').text(plugin.$accordionToggle.find('.ups-readerTxt').attr('data-lang-show'));
                            plugin.$accordionWrapper.removeClass(UPS.configs.activeClass);
                            plugin.$accordionContent.attr('aria-hidden',true);
                            $aTog.toggleClass(UPS.configs.activeClass).promise().done(function(){
                                var $isBool=$(this).hasClass(UPS.configs.activeClass);
                                if($isBool){
                                    //$aTog.attr('aria-selected',$isBool).attr('aria-expanded',$isBool);
                                    $aTog.attr('aria-expanded',$isBool);
                                    $aContent.attr('aria-hidden',!$isBool);
                                }else{
                                    //$aTog.attr('aria-selected',$isBool).attr('aria-expanded',$isBool);
                                	$aTog.attr('aria-expanded',$isBool);
                                    $aContent.attr('aria-hidden',!$isBool);
                                }
                            });
                            //$aTog.find('.ups-readerTxt').text($aTog.find('.ups-readerTxt').attr('data-lang-hide'));
                            /*$aWrap.toggleClass(UPS.configs.activeClass,
                             $aTog.hasClass(UPS.configs.activeClass)
                             );*/
                            //var sAgent = window.navigator.userAgent;
                            //var Idx = sAgent.indexOf('MSIE');
                            if (navigator.appName === 'Microsoft Internet Explorer' ||  !!(navigator.userAgent.match(/Trident/) || navigator.userAgent.match(/rv:11/)) || (typeof $.browser !== "undefined" && $.browser.msie === 1) && plugin.$accordionLang.length > 0){
                                //if((Idx >= 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) && plugin.$accordionLang.length > 0){
                                if($aTog.hasClass(UPS.configs.activeClass)){
                                    //$aWrap.removeClass(UPS.configs.activeClass);
                                    $aWrap.addClass(UPS.configs.activeClass);
                                }else{
                                    $aWrap.removeClass(UPS.configs.activeClass);
                                    //$aWrap.addClass(UPS.configs.activeClass);
                                }
                            }else{
                                $aWrap.toggleClass(UPS.configs.activeClass,
                                    $aTog.hasClass(UPS.configs.activeClass)
                                );
                            }

                            // //Scroll to newly opened element
                            if(plugin.hasScroll && !UPS.configs.$body.hasClass("modal-open")) {
                                plugin.scrollToElement(e.target, 617);
                            }

                        } else {
                            //$aTog.removeClass(UPS.configs.activeClass).attr('aria-selected',$aTog.hasClass(UPS.configs.activeClass)).attr('aria-expanded',false);
                        	$aTog.removeClass(UPS.configs.activeClass).attr('aria-expanded',false);
                            //$aTog.find('.ups-readerTxt').text($aTog.find('.ups-readerTxt').attr('data-lang-show'));
                            $aWrap.removeClass(UPS.configs.activeClass);
                            $aContent.attr('aria-hidden',true);
                        }
                    });
                }
            })();
        }

        if(plugin.$T.hasClass('ups-accordion_sub')) {
            if(UPS.configs.viewport.size === 'small'){
                plugin.$T.removeClass(UPS.configs.activeClass);
            }

            plugin.$accordionTitle.on('click', function () {
                if(plugin.$T.hasClass(UPS.configs.activeClass)){
                    plugin.$T.removeClass(UPS.configs.activeClass);
                    plugin.$T.find('.ups-accordion_content').attr('aria-hidden','true');
                    plugin.$accordionTitle.attr('aria-expanded','false');
                    //plugin.$accordionTitle.find('.ups-readerTxt').text(plugin.$accordionTitle.find('.ups-readerTxt').attr('data-lang-show'));
                } else {
                    plugin.$T.addClass(UPS.configs.activeClass);
                    plugin.$T.find('.ups-accordion_content').attr('aria-hidden','false');
                    plugin.$accordionTitle.attr('aria-expanded','true');
                    //plugin.$accordionTitle.find('.ups-readerTxt').text(plugin.$accordionTitle.find('.ups-readerTxt').attr('data-lang-hide'));
                }
            });
        }

        //FAQ

        if(plugin.$T.hasClass('ups-accordion_faq')) {

            //var firstToggle = plugin.$T.find('.ups-accordion_item:first-child');

            //Not on mobile, display first tab open by default
            // if(UPS.configs.viewport.size !== "small"){
//                firstToggle.addClass(UPS.configs.activeClass);
//                firstToggle.find('.ups-accordion_toggle').addClass(UPS.configs.activeClass);
//                firstToggle.find('i.icon.ups-icon-plus .ups-readerTxt').text('collapse');
//                firstToggle.find('.ups-collapsable_wrap:first-child').addClass(UPS.configs.activeClass);
//                firstToggle.find('.ups-collapsable_wrap:first-child .ups-readerTxt').text('collapse');
            // }


            plugin.$collapsable = plugin.$T.find('.ups-collapsable_wrap').not('.ups-faq_single');

            //
            plugin.$collapsable.on('click',function(e){
            	e.preventDefault();
                var $this = $(this);
                if($this.hasClass(UPS.configs.activeClass)){
                    $this.removeClass(UPS.configs.activeClass);
                    //$this.find('.ups-collapsable_toggle').attr('aria-selected',false).attr('aria-expanded',false);
                    $this.find('.ups-collapsable_toggle').attr('aria-expanded',false);
                    $this.find('.ups-collapsable_content').attr('aria-hidden',true);
                    $this.find('.ups-iconAlone .icon').addClass('ups-icon-plus').removeClass('ups-icon-minus');
                    //$this.find('.ups-readerTxt').text($this.find('.ups-readerTxt').attr('data-lang-show'));
                } else {
                    plugin.$collapsable.removeClass(UPS.configs.activeClass);
                    plugin.$collapsable.find('.ups-iconAlone .icon').removeClass('ups-icon-minus').addClass('ups-icon-plus');
                    //plugin.$collapsable.find('.ups-readerTxt').text(plugin.$collapsable.find('.ups-readerTxt').attr('data-lang-show'));
                    $this.addClass(UPS.configs.activeClass);
                    //$this.find('.ups-collapsable_toggle').attr('aria-selected',true).attr('aria-expanded',true);
                    $this.find('.ups-collapsable_toggle').attr('aria-expanded',true);
                    $this.find('.ups-collapsable_content').attr('aria-hidden',false);
                    $this.find('.ups-iconAlone .icon').addClass('ups-icon-minus').removeClass('ups-icon-plus');
                    //$this.find('.ups-readerTxt').text($this.find('.ups-readerTxt').attr('data-lang-hide'));
                }
                $this.find('.ups-iconAlone').focus();
            });
            
            plugin.$collapsable.keydown(function(event){
            	if(event.keyCode === 32){//Space
            		event.preventDefault();
            		$(this).click();
            	}
            });
            

        }
        plugin.bindKeyboard();
    };

    Plugin.prototype._focusWithoutScrolling  = function (elem) {
        var plugin = this;

        elem.attr('tabindex', 0);
        var x = $(document).scrollLeft(), y = $(document).scrollTop();
        elem.focus();
        window.scrollTo(x, y);

        elem.focusout(function () {
            elem.attr('tabindex', null);
        });

        return plugin;
    };

    Plugin.prototype.scrollToElement = function(el) {
        //Scroll to newly opened accordian element

        //Main Nav Offset:
        var mainNavOffset = document.getElementById('ups-headerWrap').offsetHeight;
        $('html, body').animate({
            scrollTop: $(el).offset().top - mainNavOffset
        }, window.UPS.configs.mainTransitionSpeed);
    };
    
    Plugin.prototype.bindKeyboard = function(el) {
    	var plugin = this;
	    /* 480412 Accessibility - Accordion - Keyboard Access [3.7] */
    	plugin.$accordionToggle.keydown(function(e){
	    	var $focused = $(':focus'),
	    	parentLi = ($focused).parents('.ups-accordion_item');
	    	//var hasFocus = $('.ups-accordion_toggle').is(':focus');
			if (e.keyCode === 38 || e.keyCode === 33) { //UP && PAGE UP
				e.preventDefault();
				 if((parentLi).prev().length === 0){
					 (parentLi).parents('.ups-accordion_content').find('.ups-accordion_toggle').last().focus();
				 } else{
					 (parentLi).prev().find('.ups-accordion_toggle').focus(); 
				 }
				 
		    }
			if (e.keyCode === 40 || e.keyCode === 34) { //DOWN && PAGE DOWN
				e.preventDefault();
				if((parentLi).next().find('.ups-accordion_toggle').length === 0){
					 (parentLi).parents('.ups-accordion_content').find('.ups-accordion_toggle').first().focus();
				 }else{
					 (parentLi).next().find('.ups-accordion_toggle').focus(); 
				 }
				 
			}
			if (e.keyCode === 35) { //END 
				e.preventDefault();
				(parentLi).parents('.ups-accordion_content').find('.ups-accordion_toggle').last().focus();
			}
			if (e.keyCode === 36) { //HOME
				e.preventDefault();
				(parentLi).parents('.ups-accordion_content').find('.ups-accordion_toggle').first().focus();
			}
			if (e.keyCode === 0 || e.keyCode === 32) { //SPACE 
				e.preventDefault();
				parentLi = ($focused).click();
			}
			
		});
	    
	    
    	plugin.$accordionContent.keydown(function(e){ 
	    	var $focused = $(':focus'),
	    	parentLi;
	    	if (e.keyCode === 33) {//PAGE UP
	    		e.preventDefault();
	    		parentLi = ($focused).parents('.ups-accordion_item');
	    		(parentLi).find('.ups-accordion_toggle').focus();
	    	}
	    	if (e.keyCode === 34) {//PAGE DOWN
	    		e.preventDefault();
	    		parentLi = ($focused).parents('.ups-accordion_item').next();
	    		(parentLi).find('.ups-accordion_toggle').focus();
	    	}
	    });
    };
    

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
