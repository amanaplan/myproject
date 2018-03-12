(function( $ ){
    'use strict';

    var PLUGIN_NS = 'upsParallax';

    var Plugin = function( target, options ) {
        var plugin = this;

        plugin.$T = $(target);

        plugin.options= {
            buffer: ( typeof options.buffer  === 'number' ) ? options.buffer  : 0,  // Top Buffer
            speed:  ( typeof options.speed   === 'number' ) ? options.speed   : 2    // Speed Variable
        };

        plugin.$window = $(window);
        plugin.$img    = plugin.$T.find('picture');
        plugin.$tools  = $('.ups-headerTools_list');

        plugin._init( target, options );

        return plugin;
    };

    Plugin.prototype._init = function() {
        var plugin = this;

        plugin.$window.on('windowResize', function() {
            plugin._setStart();
        });

        plugin._setStart();
        plugin._parallax();
    };

    Plugin.prototype._parallax = function() {
        var plugin      = this;

        plugin.$img.css({ 'top': Math.floor( - plugin.options.buffer ) });

        var onScroll = function() {
            if(UPS.configs.viewport.size === 'small' || UPS.configs.viewport.size === 'mediumMid') {
                plugin.$img.css({ 'top': 0 });
            } else {
                var winTop = plugin.$window.scrollTop();
                // var winHgt = UPS.configs.viewport.height;
                // var imgTop = plugin.$img.offset().top;
                var imgH = plugin.$img.outerHeight();
                var imgTop = plugin.$T.position().top;
                // var imgH = plugin.$T.outerHeight();

                var winLoc = imgTop - winTop;
                var pos = (Math.floor(winLoc/plugin.options.speed) * (imgH*0.0005) - plugin.options.buffer);

                pos = (pos > 0)? 0: pos;

                plugin.$img.css({ 'top':  pos});
            }
        };

        plugin.$window.scroll(onScroll);
        onScroll();
    };

    Plugin.prototype._setStart = function() {
        var plugin      = this;

        if(UPS.configs.viewport.size === 'small' || UPS.configs.viewport.size === 'mediumMid') {
            plugin.$img.css({ 'top': 0 });
        } else {
            plugin.$img.css({ 'top': Math.floor( - plugin.options.buffer ) });
        }
    };

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
