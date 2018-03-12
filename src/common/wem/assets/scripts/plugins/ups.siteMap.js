(function($) {
    'use strict';

    var PLUGIN_NS = 'upsSiteMap';

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

        plugin.$transition = plugin.transitionProps();
        plugin.$category = plugin.$T.find('.site-map_category');
        plugin.$toggle = plugin.$T.find('.site-map_toggle');
        plugin.$title = plugin.$T.find('.site-map_title');

        plugin.$title.on('click', function(e) {
            plugin.$toggle.addClass('ups-icon-plus').removeClass('ups-icon-minus');
            plugin.$category.attr('data-border', 'false');
            $(e.currentTarget).parents('.site-map_category').attr('data-border', 'true');

            if ($(e.currentTarget).parents('.site-map_category').attr('data-open') === 'true') {
                plugin.$category.attr('data-open', 'false');
                plugin.$T.one(plugin.$transition,
                    function() {
                        $(e.currentTarget).parents('.site-map_category').attr('data-border', 'false');
                    });
            } else {
                plugin.$category.attr('data-open', 'false');
                $(e.currentTarget).find('.site-map_toggle').addClass('ups-icon-minus').removeClass('ups-icon-plus');
                $(e.currentTarget).parents('.site-map_category').attr('data-open', 'true');
            }
        });
    };

    Plugin.prototype.transitionProps = function() {
      //  var plugin = this;

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
