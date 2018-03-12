(function($) {
    'use strict';

    var PLUGIN_NS = 'upsShipBy';

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
    Plugin.prototype._init = function () {
        var plugin = this;

        plugin.$accordionBehavior = plugin.$T.find('.ups-table').attr('data-accordion');

        plugin.$primaryHeader = plugin.$T.find('table.ship-by_primary thead');
        plugin.$primaryBtns = $(plugin.$primaryHeader).find('button');
        plugin.$secondaryHeader = plugin.$T.find('table.ship-by_secondary thead');
        plugin.$secondaryBtns = $(plugin.$secondaryHeader).find('button');
        plugin.$secondaryList = $(plugin.$secondaryHeader).find('.mobile-list');

        plugin.$tdContent = plugin.$T.find('tbody tr').addClass('table_sm_hide');

        plugin.$primaryTables = plugin.$T.find('table.ship-by_primary');

        plugin.$calenderBtn = plugin.$T.find('.calendar-btn');
        plugin.$calenderInput = plugin.$T.find('.ship-by_calendar_input');

//        plugin.$calendar = plugin.$T.find('.ship-by_calendar_datepicker');
//        plugin.$dropdowns = plugin.$T.find('.ship-by_calendar_dropdowns');
	    plugin.$select = plugin.$T.find('.ship-by_year_dropdown .ups-dropdown');
        plugin.$calMonth = plugin.$T.find('.ship-by_container');

        plugin.$primaryTables.each(function() {
            var mobileList = $(this).find('.mobile-list');

            var tdContent = $(this).find('tbody tr');
            tdContent.each(function() {
                if ($(this).find('th').length === 0) {
                    $(mobileList).append('<div class="mobile-list_item">' + $(this).children().first().html() + '<span class="ship-by_asterick"></span></div>');
                    if ($(this).children().last().hasClass('exception')) {
                        $(plugin.$secondaryList).append('<div class="mobile-list_item"><span class="ship-by_asterick"></span><span class="ship-by_type">' + $(this).attr('data-name') + ':</span> ' + $(this).children().last().html() + '</div>');
                    }
                }
            });
        });

        if(plugin.$primaryBtns.first().hasClass('ups-icon-minus')){
            plugin.$primaryBtns.first().find('.ups-readerTxt').text(plugin.options.collapse);
        }

        plugin.$secondaryAstericks = plugin.$secondaryList.find('.ship-by_asterick');
        plugin.$primaryAstericks = plugin.$primaryHeader.find('.ship-by_asterick');
        var asterick = plugin.$primaryAstericks.length;
        //var str = '*';

        plugin.$primaryAstericks.each(function(i) {
            for (var ast = 0; ast < (asterick - i); ast++) {
               $(this).append('*');
            }
        });

        plugin.$secondaryAstericks.each(function(i) {
            for (var ast = 0; ast < (asterick - i); ast++) {
               $(this).append('*');
            }
        });

        plugin.$primaryHeader = plugin.$T.find('table.ship-by_primary thead');
        plugin.$primaryAccordion = $(plugin.$primaryHeader).find('.ship-by_accordion');
        plugin.$secondaryAccordion = $(plugin.$secondaryHeader).find('.ship-by_accordion');

        plugin.$primaryBtns = $(plugin.$primaryHeader).find('button');
        plugin.$secondaryHeader = plugin.$T.find('table.ship-by_secondary thead');
        plugin.$secondaryBtns = $(plugin.$secondaryHeader).find('button');

        if (plugin.$primaryHeader.length <= 2) {
            plugin.$primaryHeader.attr('data-open', 'true');
            plugin.$primaryBtns.removeClass('ups-icon-plus').addClass('ups-icon-minus');
            plugin.$primaryBtns.find('.ups-readerTxt').text(plugin.options.collapse);
        }
       /* 
        if(!Modernizr.inputtypes.date) { 
            plugin.$calendar.addClass('inactive');
            plugin.$dropdowns.addClass('active');
        }
        */
        plugin.$transition = plugin._transitionProps();
        plugin._bindClick();
    };

    Plugin.prototype._bindClick = function() {
        var plugin = this;

        switch (plugin.$accordionBehavior) {
        case 'single':
            plugin.$primaryAccordion.on('click', function (e) {
                if ($(e.currentTarget).parents('thead').attr('data-open') === 'false') {
                    $(e.currentTarget).find('button').removeClass('ups-icon-plus').addClass('ups-icon-minus');
                    $(e.currentTarget).parents('thead').attr('data-open', 'true');
                    $(e.currentTarget).find('.ups-readerTxt').text(plugin.options.collapse);
                } else {
                    $(e.currentTarget).find('button').removeClass('ups-icon-minus').addClass('ups-icon-plus');
                    $(e.currentTarget).parents('thead').attr('data-open', 'false');
                    $(e.currentTarget).find('.ups-readerTxt').text(plugin.options.expand);
                }
            });
            break;
        default:
            plugin.$primaryAccordion.on('click', function (e) {
                if ($(e.currentTarget).parents('thead').attr('data-open') === 'false') {
                    plugin.$primaryAccordion.parents('thead').attr('data-open', 'false');
                    plugin.$primaryAccordion.find('button').removeClass('ups-icon-minus').addClass('ups-icon-plus');
                    plugin.$primaryAccordion.find('.ups-readerTxt').text(plugin.options.expand);

                    $(e.currentTarget).parents('thead').attr('data-open', 'true');
                    $(e.currentTarget).find('button').removeClass('ups-icon-plus').addClass('ups-icon-minus');
                    $(e.currentTarget).find('.ups-readerTxt').text(plugin.options.collapse);
                } else {
                    plugin.$primaryAccordion.parents('thead').attr('data-open', 'false');
                    plugin.$primaryAccordion.find('button').removeClass('ups-icon-minus').addClass('ups-icon-plus');
                    plugin.$primaryAccordion.find('.ups-readerTxt').text(plugin.options.expand);
                }
            });
            break;
        }

        plugin.$secondaryAccordion.on('click', function (e) {
            if ($(e.currentTarget).parents('thead').attr('data-open') === 'false') {
                $(e.currentTarget).find('button').removeClass('ups-icon-plus').addClass('ups-icon-minus');
                $(e.currentTarget).parents('thead').attr('data-open', 'true');
                $(e.currentTarget).find('.ups-readerTxt').text(plugin.options.collapse);
            } else {
                $(e.currentTarget).find('button').removeClass('ups-icon-minus').addClass('ups-icon-plus');
                $(e.currentTarget).parents('thead').attr('data-open', 'false');
                $(e.currentTarget).find('.ups-readerTxt').text(plugin.options.expand);
            }
        });

        plugin.$calenderBtn.on('click', function () {
            plugin.$calenderInput.focus();
            plugin.$calenderInput.trigger('click');
        });

        plugin.$T.find('.shipby-popup').click(function(e) {
            e.preventDefault();
            var _self=$(this);
            var w = 400;
            var h = 300;

            //Get the destination URL and the class popup specs
            var popurl = _self.attr('href');
            //Create a "unique" name for the window using a random number
            var popupName = Math.floor(Math.random()*10000001);

            var dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left;
            var dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top;

            var screenWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
            var screenHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            var left = ((screenWidth / 2) - (w / 2)) + dualScreenLeft;
            var top = ((screenHeight / 2) - (h / 2)) + dualScreenTop;
            plugin._setAnalyticShipBy(_self,_self.text());  
            var newWindow = window.open(popurl, popupName, 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

            // Puts focus on the newWindow
            if (window.focus) {
                newWindow.focus();
            }

            return false;
        });
        
        plugin.$select.change(function(){
        	var _self = $(this),
        	val = _self.val(),
        	anval = _self.find('option:selected').text();
        	plugin.$calMonth.attr('data-active','false');
        	$(plugin.$calMonth).each(function() {
                if ($(this).data('name') === val) {
                    $(this).attr('data-active', 'true');
                }
            });
            plugin._setAnalyticShipBy(_self,anval);
        });

        return plugin;
    };
    
    Plugin.prototype._setAnalyticShipBy = function (_SelfInstance,val) {
        //var plugin = this;
        var componentShipBy={};
      //  console.log(_SelfInstance)
        componentShipBy.event_id=_SelfInstance.attr("data-event-id");
        componentShipBy.link_name=_SelfInstance.attr("data-prelinkname")+val;
        componentShipBy.link_page_name=document.title;
        componentShipBy.content_block_id="M55";
        componentShipBy.navigation_class=_SelfInstance.parent("div").attr("class");
         if(_SelfInstance.parents('.ups-analytics-render').attr('data-content-id')!==undefined && _SelfInstance.parents('.ups-analytics-render').attr('data-content-id')!==''){
            componentShipBy.content_id = _SelfInstance.closest('.ups-analytics-render').attr('data-content-id');
        } 
        console.log("Shipby", componentShipBy);
        utag.track("link", componentShipBy);
    };

    Plugin.prototype._transitionProps = function () {
//        var plugin = this;

        var t,
            el = document.createElement('fakeelement');

        var transitions = {
            'transition': 'transitionend',
            'OTransition': 'oTransitionEnd',
            'MozTransition': 'transitionend',
            'WebkitTransition': 'webkitTransitionEnd'
        };

        for (t in transitions) {
            if (el.style[t] !== undefined) {
                return transitions[t];
            }
        }
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
