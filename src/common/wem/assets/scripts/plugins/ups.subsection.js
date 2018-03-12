(function($) {
    'use strict';

    var PLUGIN_NS = 'upsSubsection';

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

        plugin.$inner = plugin.$T.find('.ups-subsection_inner');
        plugin.$container = plugin.$T.find('.subsection_container');
        plugin.$screenWidth = $(window).outerWidth();

        plugin._subsectionResize();

        $(window).on('windowResize', function() {
            plugin._subsectionResize();
        });
    };

    Plugin.prototype._subsectionResize = function() {
        var plugin = this;

        if (UPS.configs.viewport.size !== 'mediumMid' && UPS.configs.viewport.size !== 'small') {
            if (UPS.configs.isRTL) {
                plugin.$container.css('margin-right', -plugin.$inner.offset().left);
                plugin.$container.css('margin-left', - 320 - plugin.$inner.offset().left);
            } else {
                plugin.$container.css('margin-left', -plugin.$inner.offset().left);
                plugin.$container.css('margin-right', - 320 - plugin.$inner.offset().left);
            }
        } else {
            plugin.$container.css('margin-right', '');
            plugin.$container.find('.ups-wrap').css('padding-right', '');
            plugin.$container.css('margin-left', '');
            plugin.$container.find('.ups-wrap').css('padding-left', '');
        }

        return plugin;
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
