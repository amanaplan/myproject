(function($) {
    'use strict';

    var PLUGIN_NS = 'upsTabs';

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

        plugin.$tabHeaders = this.$T.find('.ups-tab-headers');
        plugin.$desktopTab = this.$T.find('.ups-tab-headers .tab-header');
        plugin.$content = this.$T.find('.ups-tab-content');
        plugin.$accordionTab = this.$T.find('.ups-accordion-tab');

        plugin._init(target, options);
        return plugin;
    };

    /** #### INITIALISER #### */
    Plugin.prototype._init = function () {
        var plugin = this;
        if( plugin.$tabHeaders.parents('.ups-compact_feed').length===0){
            $.each(plugin.$tabHeaders.find('.tab-header'),function(){
                var _selfInstance=$(this);
                var tabId= _selfInstance.attr('data-tab');
                if($('div.ups-tab-content[data-tab="'+tabId+'"]').find('.sub-detail-container').children().length===0){
                    $('*[data-tab="'+tabId+'"]').addClass(UPS.configs.inActiveClass);
                }
            });
        }

        plugin._checkChild();
        plugin._bindClick();
        plugin._bindAccessibility();
        plugin._roleChange();
    };

    Plugin.prototype._checkChild = function() {
        var plugin = this;

        if (plugin.$T.index() === 0) { // first child
            plugin.$T.addClass('first-child');
        }

        return plugin;
    };

    Plugin.prototype._bindClick = function() {
        var plugin = this;

        plugin.$desktopTab.on('click', function(e) {
            // tab name for reference
            var tabName = $(e.currentTarget).data('tab');

            // DESKTOP TABS
            // update tabs in this viewport
            plugin.$desktopTab.attr('data-open', 'false').attr('aria-expanded', 'false').attr('tabindex','-1');
            $(e.currentTarget).attr('data-open', 'true').attr('aria-expanded', 'true').attr('tabindex','0');

            // fix tab borders on medium-large viewport
            var prev = $(e.currentTarget).prev();
            plugin.$desktopTab.removeClass('hide-tab-border');
            $(prev).addClass('hide-tab-border');

            // ------------------------- //

            // TAB CONTENT && MOBILE TABS
            $(plugin.$content).each(function() {
                if ($(this).data('tab') === tabName) {
                	plugin.$accordionTab.attr('data-open','false').attr('aria-expanded','false');
                    plugin.$content.attr('data-prev-active', 'false').attr('data-open', 'false').attr('data-content-selected', 'false').attr('aria-hidden', 'true').attr('tabindex','-1');
                    $(this).next().attr('data-prev-active', 'true');
                    $(this).attr('data-open', 'true').attr('data-content-selected', 'true').attr('aria-hidden', 'false').attr("tabindex","0");
                    plugin.$content.find('.tab-header button').removeClass('ups-icon-minus').addClass('ups-icon-plus');
                    //$(this).find('.tab-header .ups-icon-plus').removeClass('ups-icon-plus').addClass('ups-icon-minus');
                    $(this).prev().find('.ups-accordion-tab').attr('data-open','true').attr('aria-expanded','true');
                    plugin._focusWithoutScrolling($(this).find('.sub-detail-container'));
                }
            });
        });

        plugin.$accordionTab.on('click', function(e) {
            e.preventDefault();
            var updateTab = false;
            var tab = $(e.currentTarget);
            var tabContent = plugin.$T.find('#'+tab.attr('aria-controls'));
            //var tabContentExpand = tab.data('lang-expand');
            //var tabContentCollapse = tab.data('lang-collapse');
            var tabName = tab.data('tab');
            //var tabIcon = tab.find('.ups-readerTxt');
            var next = tabContent.next();


            if (tabContent.attr('data-open') === 'false') {
                updateTab = true;
            }
            plugin.$content.attr('data-open', 'false').attr('data-prev-active', 'false').attr('aria-hidden','true');
            plugin.$accordionTab.find('.icon').removeClass('ups-icon-minus').addClass('ups-icon-plus');
            //plugin.$accordionTab.find('.ups-readerTxt').html(tabContentExpand+' ' + tabName);
            plugin.$accordionTab.attr('data-open', 'false').attr('aria-expanded', 'false');

            var extraHeight = 0;

            if (updateTab) {
                tab.attr('data-open', 'true').attr('aria-expanded', 'true').attr('data-content-selected','true');
                tabContent.attr('data-open', 'true').attr('aria-hidden','false');
                $(next).attr('data-prev-active', 'true');
//                $(tabIcon).removeClass('ups-icon-plus').addClass('ups-icon-minus');
                //$(tabIcon).html(tabContentCollapse+' '  + tabName);
            }else{
            	tab.attr('data-open', 'false').attr('aria-expanded', 'false').attr('data-content-selected','false');
            }

            plugin.$content.each(function() {
                if ($(this).index() < tabContent.index()) {
                    extraHeight += $(this).find('.tab-header').outerHeight();
                } else {
                    return false;
                }
            });

            $('html, body').animate({
                scrollTop: plugin.$T.offset().top + extraHeight
            }, 300, 'easeOutExpo');

            plugin.$content.attr('data-content-selected', 'false');
            tabContent.attr('data-content-selected', 'true');

//            $(tabBtn).focus();

            // ------------------------- //

            // DESKTOP TABS
            $(plugin.$desktopTab).each(function() {
                if ($(this).data('tab') === tabName) {
                    plugin.$desktopTab.attr('data-open', 'false');
                    $(this).attr('data-open', 'true');
                    plugin.$desktopTab.removeClass('hide-tab-border');
                    $(this).prev().addClass('hide-tab-border');
                }
            });

        });

        return plugin;
    };

    Plugin.prototype._focusWithoutScrolling  = function(elem) {
        var plugin = this;

        elem.attr('tabindex', 0);
        var x = $(document).scrollLeft(), y = $(document).scrollTop();
        elem.focus();
        window.scrollTo(x, y);

        elem.focusout(function() {
            elem.attr('tabindex', null);
        });

        return plugin;
    };
    
    Plugin.prototype._roleChange = function(){
    	var plugin = this;
    	if(UPS.configs.viewport.size==='small'){
    		plugin.$tabHeaders.attr('role','presentation');
    		plugin.$content.attr('role','region');
    	}else  if(UPS.configs.viewport.size !== 'small'){
    		plugin.$tabHeaders.attr('role','tablist');
    		plugin.$content.attr('role','tabpanel');
    	}
    };

    Plugin.prototype._bindAccessibility  = function(elem) {
    	var plugin = this;
    	// Convert Role to presentation for accordion and Tablist for Tabs
        $(window).on('windowResize', function() {
        	plugin._roleChange();
        });
    	
    	/* 480316 Accessibility - Domestic Shipping Services - Keyboard Access [3.7] */
        $(".ups-tabs .tab-header").keydown(function(e){
    		if (e.keyCode === 39) {//RIGHT
    			e.preventDefault();
    			if($(".ups-tab-move:focus").next().length === 0){
    				$(".ups-tab-move:first-child").focus();
    			} else{
    				$(".ups-tab-move:focus").next().focus();
    			}
    	    }
    		else if (e.keyCode === 37) {//LEFT
    			e.preventDefault();
    			if($(".ups-tab-move:focus").prev().length === 0){
    				$(".ups-tab-move:last-child").focus();
    			}else{
    				$(".ups-tab-move:focus").prev().focus();
    			}
    		}
    		else if (e.keyCode === 35) {//END
    			e.preventDefault();
    			$(".ups-tab-move:last-child").focus();
    		}
    		else if (e.keyCode === 36) { //HOME
    			e.preventDefault();
    			$(".ups-tab-move:first-child").focus();
    		}
    		else if (e.keyCode === 32) { //SPACE
    			e.preventDefault();
    			$(this).click();
    		}
    	});
        
        /* 480412 Accessibility - Accordion - Keyboard Access [3.7] */
        plugin.$accordionTab.keydown(function(e){
        	var $focused = $(':focus'),
        	parentLi = ($focused).parents('.ups-acc-headcont');
        	//var hasFocus = $('.ups-accordion_toggle').is(':focus');
    		if (e.keyCode === 38 || e.keyCode === 33) { //UP && PAGE UP
    			e.preventDefault();
    			 if((parentLi).prev().prev().length === 0){
    				 (parentLi).parent().find('.ups-accordion-tab:last-child').focus();
    			 } else{
    				 (parentLi).prev().prev().find(plugin.$accordionTab).focus(); 
    			 }
    			 
    	    }
    		if (e.keyCode === 40 || e.keyCode === 34) { //DOWN && PAGE DOWN
    			e.preventDefault();
    			if((parentLi).next().next().find(plugin.$accordionTab).length === 0){
    				(parentLi).parent().find('.ups-accordion-tab')[0].focus();
    			 }else{
    				 (parentLi).next().next().find(plugin.$accordionTab).focus(); 
    			 }
    			 
    		}
    		if (e.keyCode === 35) { //END 
    			e.preventDefault();
    			(parentLi).parent().find('.ups-accordion-tab:last-child').focus();
    		}
    		if (e.keyCode === 36) { //HOME
    			e.preventDefault();
    			(parentLi).parent().find('.ups-accordion-tab')[0].focus();
    		}
    	});
        
        plugin.$content.keydown(function(e){
        	var $focused = $(':focus'),parentLi;
        	if (e.keyCode === 33) { //UP && PAGE UP
        		e.preventDefault();
        		parentLi = ($focused).prev().find(plugin.$accordionTab);
    			e.preventDefault();
    			(parentLi).focus();
    	    }
        	if (e.keyCode === 34) { //DOWN && PAGE DOWN
        		e.preventDefault();
        		parentLi = ($focused).next().find(plugin.$accordionTab);
    			e.preventDefault();
    			(parentLi).focus();
    	    }
        	if (e.keyCode === 35) { //END 
    			e.preventDefault();
    			parentLi = ($focused).next();
    			(parentLi).parent().find('.ups-accordion-tab:last-child').focus();
    		}
        	if (e.keyCode === 36) { //HOME 
    			e.preventDefault();
    			parentLi = ($focused).prev().find(plugin.$accordionTab);
    			(parentLi).parent().find('.ups-accordion-tab')[0].focus();
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
    $.fn[PLUGIN_NS] = function(methodOrOptions) {
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
