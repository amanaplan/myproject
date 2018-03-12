(function( $ ){
    'use strict';

    var PLUGIN_NS = 'upsFollowMe';

     var Plugin = function ( target, options ) {
        var plugin = this;

        plugin.$T = $(target);

        plugin.options = {
            expand:  ( typeof options.expand  === 'boolean' ) ? options.expand  : false, // Expand on Hover
            scrlSpd: ( typeof options.scrlSpd === 'number'  ) ? options.scrlSpd : 300    // Scroll Speed
        };

        plugin._FIXED = false;
        plugin._TOP = plugin.$T.offset().top;

        plugin._init( target, options );

        return plugin;
    };

    Plugin.prototype._init = function() {
        var plugin = this;

        $.each(plugin.$T.find('li'),function(){
            if($(this).has('a[href=""]').length>0){
                $(this).addClass(UPS.configs.inActiveClass);
            }
        });

        plugin._setItemHeight();

        // $(window).on('scroll',function() {
        //     plugin._setItemHeight();
        // });

        // plugin.$T.hover(function(){
        //     plugin._setItemHeight();
        // });

        if(Modernizr.touch) {
            plugin.$T.on('click', function(e) {
                e.stopPropagation();

                if(plugin.$T.hasClass(UPS.configs.activeClass)) {
                    UPS.configs.$body.off('click.follow');
                    plugin.$T.removeClass(UPS.configs.activeClass);
                    plugin._setItemHeight();
                } else {
                    plugin.$T.addClass(UPS.configs.activeClass);
                    plugin._setItemHeight();
                    UPS.configs.$body.off('click.follow');

                    UPS.configs.$body.on('click.follow', function() {
                        UPS.configs.$body.off('click.follow');
                        plugin.$T.removeClass(UPS.configs.activeClass);
                        plugin._setItemHeight();
                    });
                }
            });
        } else {
            plugin.$T.on('mouseenter focusin', function() {
                plugin.$T.addClass(UPS.configs.activeClass);
                // plugin._setItemHeight();
            });

            plugin.$T.on('mouseleave focusout', function() {
                plugin.$T.removeClass(UPS.configs.activeClass);
                // plugin._setItemHeight();
            });
        }

        return plugin;
    };

    /** #### PUBLIC API #### */

    /** #### PRIVATE METHODS #### */

    Plugin.prototype._setItemHeight = function() {
        var plugin = this;

        if(!Modernizr.csstransforms) {
            //var $body = $('body'),
                var fm_top = plugin.$T.height()/2;

            // if($body.hasClass('ups-headFixed')){
            //     navVisible = navVisible + parseInt($('#ups-headerWrap').css('top'), 10);
            // }


            plugin.$T.css('marginTop', -fm_top);
        }

        return plugin;
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
