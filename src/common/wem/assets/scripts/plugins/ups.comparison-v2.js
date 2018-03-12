(function ($) {
    'use strict';

    var PLUGIN_NS = 'upsNewComparison';

    var Plugin = function (target, options) {
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
    Plugin.prototype._init = function() {
        var plugin = this;

        var $parent = plugin.$T.parent();
        $parent.append('<div class="ups-table-comparisonV2_sm"></div>');
        var $sm = $parent.find('.ups-table-comparisonV2_sm');

        plugin.$mainHeader = plugin.$T.find('caption');
        plugin.$secondaryHeaders = plugin.$T.find('tbody > tr:first-child th');
        plugin.$rows = plugin.$T.find('tbody tr').not('tbody > tr:first-child');
        var cells = [];
        var names = [];
        /*plugin.$secondaryHeaders.each(function(i) {
            if ($(this).find('th').length) {
                plugin.$secondaryHeaders.splice(plugin.$secondaryHeaders[i], 1);
                i--;
            } 
        });*/
        plugin.$rows.each(function() {
            var temp = [];
            $(this).find('th').each(function(){
                if ($(this).index() === 0) {
                    names.push($(this));
                }
            });
            $(this).find('td').each(function(){
                temp.push($(this));
            });
            cells.push(temp);
        });

        $sm.append('<div class="comparison-header">'+$(plugin.$mainHeader).html()+'</div>');
        
        var i = 0;
        var j = 0;
        for (i = 1; i < plugin.$secondaryHeaders.length; i++) {
            if ($(plugin.$secondaryHeaders[i]).text().length > 0) {
                $sm.append('<div class="comparison-subheader subheader-'+i+'">'+$(plugin.$secondaryHeaders[i]).html()+'</div>');
                $sm.find('.subheader-'+i).after('<div class="comparison-options options-'+i+'"></div>');
                for (j = 0; j < names.length; j++) {

                    var img = $(cells[j][i-1]).find('img'),
                        icon = '';
                    if( img.length){
                        icon = '<div class="icon"><img src="' + img.attr('src') + '" alt="' + img.attr('alt') + '"></div>';
                    }

                    $sm.find('.options-'+i).append('<div class="option">'+names[j].html()+icon+'</div>');
                }
            }
        }

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
