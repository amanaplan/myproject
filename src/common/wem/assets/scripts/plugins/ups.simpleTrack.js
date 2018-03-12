(function( $ ){
    'use strict';

    var PLUGIN_NS = 'upsSimpleTrack';

    var Plugin = function(target) {
        var plugin = this;

        plugin.$T = $(target);

        plugin.$window     = $(window);

        plugin._init( target );

        return plugin;
    };

    Plugin.prototype._init = function() {
        var plugin = this;

        var $trackingNumbers = plugin.$T.find('.ups-simpleTrack_input');

        $trackingNumbers.keypress(function(event) {
            if (event.which === 13) {
                event.preventDefault();
                var s = $(this).val();
                $(this).val(s+'\n');
                var currNumRows = $(this).attr('rows');
                // if (currNumRows < 3) {
                    $(this).attr({rows: currNumRows++});
                // }
           }
        });



        // $trackingList.on( 'click', '.ups-input_wrapper', function( event ) {
        //     if(UPS.configs.viewport.size === 'small'){
        //             event.preventDefault();
        //             window.location.href = $( this ).find('a').attr( 'href' );
        //     }
        // });

    };


    /** #### JQUERY HOOK #### */
    $.fn[ PLUGIN_NS ] = function( methodOrOptions ) {
        var plugin = this;
        if (!$(plugin).length) {
            return $(plugin);
        }
        var instance = $(plugin).data(PLUGIN_NS);

        if ( instance && methodOrOptions.indexOf('_') !== 0 && instance[ methodOrOptions ] && typeof( instance[ methodOrOptions ] ) === 'function' ) {
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
