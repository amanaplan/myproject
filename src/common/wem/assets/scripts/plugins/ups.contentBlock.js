(function($) {
    'use strict';

    var PLUGIN_NS = 'upsContentBlock';

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

        plugin._init();
        return plugin;
    };

    Plugin.prototype._init=function(){
        var plugin=this;
        plugin.$comparisonTable = plugin.$T.find('.ups-table-comparison:not(.ups-table-comparison_v2)');
        plugin.$table = plugin.$T.find('.ups-table:not(.ups-table-v2)');
        plugin.$newTable= plugin.$T.find('.ups-table.ups-table-v2');
        plugin.$newComparisonTable= plugin.$T.find('.ups-table-comparison.ups-table-comparison_v2 ');
        plugin._viewOnLoad();
        plugin._bindOnResize();
        plugin._bindPlugins();

    };

    Plugin.prototype._bindPlugins=function(){
        var plugin=this;
        if(plugin.$comparisonTable.html()!==undefined){
            $.each(plugin.$comparisonTable,function(){
                $(this).find('table').upsComparison({
                    langShow: plugin.options.expand,
                    langHide: plugin.options.collapse
                });
                
            });
        }
        
        if(plugin.$newComparisonTable.html()!==undefined){
            $.each(plugin.$newComparisonTable,function(){
                $(this).find('table').upsNewComparison({
                    langShow: plugin.options.expand,
                    langHide: plugin.options.collapse
                });
                
            });
        }

        if(plugin.$table.length){
            $.each(plugin.$table,function(){
                $(this).upsTable({
                    langShow: plugin.options.expand,
                    langHide: plugin.options.collapse
                });
                
            });
        }
        if(plugin.$newTable.length){
            $.each(plugin.$newTable,function(){
                $(this).upsNewTable();
                
            });
        }
        
    };

    Plugin.prototype._viewOnLoad=function(){
        var plugin=this;
        $.each(plugin.$T.find('figure'),function(){
            if(!plugin.$T.parents('.col-lg-4')){
                if(UPS.configs.viewport.size==='medium' ||UPS.configs.viewport.size==='small'){
                   $(this).css('width',plugin.$T.width()); 
                }else{
                    $(this).css('width','auto');
                }
            }
        });
        
    };

    Plugin.prototype._bindOnResize= function(){
        var plugin= this;
        $(window).on('windowResize',function(){
            plugin._viewOnLoad();
        });
    };

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