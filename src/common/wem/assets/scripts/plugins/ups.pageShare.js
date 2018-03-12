(function($) {
    'use strict';

    var PLUGIN_NS = 'upsPageShare';

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
        var flag = 0;
        plugin.$open = plugin.$T.find('.share_open');
        plugin.$close = plugin.$T.find('.share_close');
        plugin.$shareList = plugin.$T.find('.share_list');
        
        plugin.$shareList.hide();


        plugin.$open.on('click', function() {
            plugin.$shareList.show(500);
            flag=1;
        });
        
        plugin.$open.on('mouseout', function() {
            $('.share_open').blur();
        });

        plugin.$close.on('click', function() {
            plugin.$open.focus();
            plugin.$shareList.hide(500);
            flag=1;
        });
        
        UPS.configs.$body.on('click.tools', function(e) {
            if(flag!==1){
        	var clickedElemLen = $(e.target).closest('.share-container').length;
        	if(clickedElemLen === 0){
        		plugin.$shareList.hide(500);
        	}
        }
            flag=0;
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
