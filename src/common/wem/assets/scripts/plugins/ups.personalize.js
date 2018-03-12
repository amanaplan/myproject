
(function( $ ) {
    'use strict';

    var PLUGIN_NS = 'upsPersonalize';

    var Plugin = function( target, options ) {
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

        plugin._init();
        return plugin;
    };
    
    Plugin.prototype._init = function(){
    	var plugin=this;
    	plugin.$T.find('.ups-cta').click(function(){
    		var _self= $(this);
    		$.ajax({
    			url:plugin.options.url+"&country="+plugin.options.country+"&locale="+plugin.options.locale,
    			type:'POST',
    			dataType:'XML',
    			success:function(){
    				var targetedElement=_self.parents('.ups-contentOpt').find('.ups-personalize_content');
    	    		targetedElement.text(targetedElement.attr('data-targeted'));
    	    		_self.addClass(UPS.configs.inActiveClass);	
    			},
    			error:function(){
    				
    			}
    		});
    		
    	});
    };
    
    $.fn[ PLUGIN_NS ] = function( methodOrOptions ) {
        if (!$(this).length) {
            return $(this);
        }
        var instance = $(this).data(PLUGIN_NS);
        if ( instance && (methodOrOptions.hasOwnProperty('indexOf') && methodOrOptions.indexOf('_') !== 0) && instance[ methodOrOptions ] && typeof( instance[ methodOrOptions ] ) === 'function' ) {
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