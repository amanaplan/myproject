
(function( $ ) {
    'use strict';

    var PLUGIN_NS = 'upsMobSearch';

    var Plugin = function( target, options ) {

        var plugin = this;
        plugin.$T = $(target);

        plugin.options= $.extend(
            true,  // deep extend
            {},
            options
        );

        plugin.$form = $('#ups-header_search-mob');
        plugin.$input = plugin.$form.find('input[type="search"]').first();
        plugin.$submit = plugin.$form.find('button[type="submit"]');
        plugin.$menu = $('.ups-menuToggle');

        plugin.isActive = false;

        plugin._init( target, options );
        return plugin;
    };


    Plugin.prototype._init = function () {
        var plugin = this;

        plugin.$T.on({
            click: function() {
                if(!plugin.isActive) {
                    plugin.showSearch();
                } else {
                    plugin.hideSearch();
                }
            },
            'click.mobSearch': function(e) {
                e.stopPropagation();
            }
        });

        plugin.$form.on({
            'click.mobSearch': function(e) {
                e.stopPropagation();
            }
        });

        plugin.$submit.on({
            'blur.mobSearch': function() {
                plugin.$T.focus();
            }
        });
        $(document).on('keydown',function(e){
            if(e.keyCode === 27) { // ESC
            	var isMobSearchActive = plugin.$T.hasClass(UPS.configs.activeClass);
            	if(isMobSearchActive){
            		plugin.hideSearch();
            	}
            }
        });


        return plugin;
    };

    Plugin.prototype.showSearch = function() {
        var plugin = this;

        UPS.configs.$body.on({
            'click.mobSearch': function() {
                plugin.hideSearch();
            }
        });

        plugin.$T.on({
            'blur.mobSearch': function() {
                plugin.$input.focus();
            }
        });

        plugin.$T.addClass(UPS.configs.activeClass);
        plugin.$form.addClass(UPS.configs.activeClass);
        plugin.$T.attr("aria-expanded","true");

        plugin.isActive = true;

        return plugin;
    };

    Plugin.prototype.hideSearch = function() {
        var plugin = this;

        UPS.configs.$body.off('click.mobSearch');
        plugin.$T.off('blur.mobSearch');

        plugin.$T.removeClass(UPS.configs.activeClass);
        plugin.$form.removeClass(UPS.configs.activeClass);
        plugin.$T.attr("aria-expanded","false");
        //plugin.$form.attr("aria-expanded","true");


        plugin.isActive = false;

        return plugin;
    };

    $.fn[ PLUGIN_NS ] = function( methodOrOptions ) {
        if (!$(this).length) {
            return $(this);
        }
        var instance = $(this).data(PLUGIN_NS);
        if ( instance && methodOrOptions!==undefined && (methodOrOptions.hasOwnProperty('indexOf') && methodOrOptions.indexOf('_') !== 0) && instance[ methodOrOptions ] && typeof( instance[ methodOrOptions ] ) === 'function' ) {
            return instance[ methodOrOptions ]( Array.prototype.slice.call( arguments, 1 ) );
        } else if ( typeof methodOrOptions === 'object' || ! methodOrOptions ) {
            instance = new Plugin( $(this), methodOrOptions );
            $(this).data( PLUGIN_NS, instance );
            return $(this);
        } else if ( !instance ) {
            $.error( 'Plugin must be initialised before using method: ' + methodOrOptions );
        } else if ( methodOrOptions.indexOf('_') === 0 ) {
            $.error( 'Method ' +  methodOrOptions + ' is private!' );
        } else {
            $.error( 'Method ' +  methodOrOptions + ' does not exist.' );
        }
    };
})(jQuery);
