(function($) {
    'use strict';

    var PLUGIN_NS = 'upsSubscribeEmail';

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

        plugin.$open = plugin.$T.find('.templates_toggle');
        plugin.$close = plugin.$T.find('.templates_close');
        plugin.$templates = plugin.$T.find('.templates');
        plugin.$linkText = plugin.$open.find('.ups-link');

        plugin.resizeTemplate();

        plugin.$T.addClass('inactive');

        plugin.$open.on('click', function() {
            plugin.$T.toggleClass('active');

            if(plugin.$T.hasClass('inactive')){
                plugin.$T.removeClass('inactive');
                plugin.$linkText.addClass('inactive');
            } else {
                //plugin.$linkText.html('View Examples');
               // plugin.$T.one(plugin.$transition,
                //function() {
                    //if(!plugin.$T.hasClass('active')) {
                        plugin.$T.addClass('inactive');
                        plugin.$linkText.removeClass('inactive');
                    //}
                //});
            }
        });

        plugin.$close.on('click', function() {
            plugin.$T.removeClass('active');
            plugin.$linkText.addClass('inactive');
            plugin.$open.focus();
            plugin.$T.one(plugin.$transition,
                function() {
                    plugin.$T.addClass('inactive');
                });
        });

        $(window).on('windowResize', function() {
            plugin.resizeTemplate();
        });
    };

    Plugin.prototype.resizeTemplate = function() {
        var plugin = this;

        plugin.$title = plugin.$templates.find('.template-title');
        plugin.$imgContainer = plugin.$templates.find('.template-img');
        plugin.$img = plugin.$imgContainer.find('img');

        var tempHeight = 0;
        plugin.$title.each(function() {
            if ($(this).find('h3').outerHeight() > tempHeight) {
                tempHeight = $(this).find('h3').outerHeight();
            }
        });
        plugin.$title.css('min-height', tempHeight);

        tempHeight = 0;
        plugin.$imgContainer.each(function() {
            if ($(this).find('img').outerHeight() > tempHeight) {
                tempHeight = $(this).find('img').outerHeight();
            }
        });
        plugin.$imgContainer.css('min-height', tempHeight);

        return plugin;
    };

    Plugin.prototype.transitionProps = function() {
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
