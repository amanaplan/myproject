(function( $ ){
    'use strict';

    var PLUGIN_NS = 'upsZipLookUp';

    var Plugin = function(target) {
        var plugin = this;

        plugin.$T = $(target);

        plugin.$window     = $(window);

        plugin._init( target );

        return plugin;
    };

    Plugin.prototype._init = function() {
        var plugin = this;

        plugin.$T.find('.ups-zip_lookUp_btn').on('click',function(e){
            e.preventDefault();
            plugin._zipLookUp(this);
        });

        plugin.$btn = plugin.$T.find('.ups-zip_lookUp_zipList button');
        plugin.$zips = plugin.$T.find('.ups-zip_lookUp_zip ul');

        plugin.$btn.on('click',function(e){
            e.preventDefault();

            plugin.$btn.toggleClass(UPS.configs.activeClass);

            if(plugin.$btn.hasClass(UPS.configs.activeClass)) {
                plugin.$zips.addClass(UPS.configs.activeClass);
                plugin.$btn.text('Hide Zip Codes');
            } else {
                plugin.$zips.removeClass(UPS.configs.activeClass);
                plugin.$btn.text('Show Zip Codes');
            }

        });

        plugin.$T.find('.ups-zip_lookUp_zip span').on('keypress click',function(){
            var $this = $(this);

            if ($this.siblings('ul').hasClass(UPS.configs.activeClass)) {
                plugin.$zips.removeClass(UPS.configs.activeClass);
                plugin.$btn.text('Show Zip Codes');
            } else {
                plugin.$zips.removeClass(UPS.configs.activeClass);
                $this.siblings('ul').addClass(UPS.configs.activeClass);
                plugin.$btn.text('Hide Zip Codes');
            }

        });
    };

    Plugin.prototype._zipLookUp = function() {

        var plugin = this;

        var input = plugin.$T.find('#ups-zipSearch').val();
        var zipList = plugin.$T.find('.ups-zip_lookUp_zip ul li:contains("'+input+'")');

        plugin.$T.find('.ups-zip_lookUp_alert, .ups-zip_lookUp_message').hide();

        if(input !== '' && zipList.length > 0) {
            plugin.$T.find('.ups-zip_lookUp_alert').show().find('span').text(input);
        } else {
            plugin.$T.find('.ups-zip_lookUp_message').show().find('span').text(input);
        }
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
