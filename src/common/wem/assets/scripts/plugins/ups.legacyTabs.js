(function ($) {
    'use strict';

    var PLUGIN_NS = 'upsLegacyTabs';

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

        plugin.$desktopTab = this.$T.find('.ups-tab-headers .tab-header');
        plugin.$newTab = this.$T.find('.ups-tab-move');
        plugin.$accordionTab = this.$T.find('.ups-tab-content .tab-header');
        plugin.$content = this.$T.find('.ups-tab-content');
        plugin.$selectedTab = this.$T.find('.ups-tab-headers .tab-header*[data-open="true"]');

        plugin._init(target, options);
        return plugin;
    };

    /** #### INITIALISER #### */
    Plugin.prototype._init = function () {
        var plugin = this;

        plugin.$id = plugin.$selectedTab.data('tab');
        plugin.$index = -1;

        var newId = Math.round(new Date().getTime() + (Math.random() * 100));

        if (plugin.$T.parents('.col-lg-8').length > 0) {
            plugin.$T.parents('.col-lg-8').append("<div id='"+newId+"'class='ups-legacy-tabs legacy-tabs_appended'></div>");
        } else {
            //    $('#ups-main').append("<div id='"+newId+"'class='ups-legacy-tabs legacy-tabs_appended'></div>");
            if($('.container-fluid:nth-child(2)').html()!==undefined){
                $('.container-fluid:nth-child(2)').append("<div id='"+newId+"'class='ups-legacy-tabs legacy-tabs_appended'></div>");
            }else{
                $("<div id='"+newId+"'class='ups-legacy-tabs legacy-tabs_appended'></div>").insertAfter(".ups-legacy-tabs ~ .ups-wrap");
            }
        }


        $(plugin.$desktopTab).each(function (i) {
            if ($(this).data('tab') === plugin.$id) {
                plugin.$index = i;
            } else if (plugin.$index > -1) {
                $("#"+newId).append($(plugin.$content[i]));
            }
        });
        
        plugin.$newTab.keyup(function(e){
        	var el = e.currentTarget;
    		if (e.keyCode === 39) { //RIGHT
    			if($(el).next().length === 0){
    				$(el).parent().find('.ups-tab-move:first-child').focus();
    			}else{
    				$(el).next().focus();
    			}
    	    }
    		
    		if (e.keyCode === 37) { //LEFT
    			if($(el).prev().length === 0){
    				$(el).parent().find('.ups-tab-move:last-child').focus();
    			}else{
    				$(el).prev().focus();
    			}
    		}
    	});
    };

    /**
     * EZ Logging/Warning (technically private but saving an '_' is worth it imo)
     */
    Plugin.prototype.DLOG = function () {
        if (!this.DEBUG) return;
        /*for (var i in arguments) {
            //console.log(PLUGIN_NS + ': ', arguments[i]);
        }*/
    };
    Plugin.prototype.DWARN = function () {
        // this.DEBUG && console.warn(arguments);
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
