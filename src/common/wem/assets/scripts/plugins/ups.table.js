(function($) {
    'use strict';

    var PLUGIN_NS = 'upsTable';

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
    Plugin.prototype._init = function() {
        var plugin = this;

        plugin.$headers = plugin.$T.find('thead tr');
        plugin.$colspan = $(plugin.$headers[0]).children().attr('colspan');
        plugin.$titles = plugin.$T.find('tbody th');
        plugin.$primary = $(plugin.$titles[0]);
        plugin.$index = plugin.$primary.index();
        plugin.$rows = plugin.$T.find('tbody tr');
        // plugin.$rows.each(function(i) {
        //     if ($(this).find('th').length) {
        //         plugin.$rows.splice(plugin.$rows[i], 1);
        //         i--;
        //     }
        // });
        plugin.$btns = null;
        // plugin.$tdContent = [];

        plugin.$titles.each(function() {
            //if (t !== plugin.$index) {
                $(this).addClass('table_sm_hide');
            //}
        });

        plugin.$rows.each(function() {
            if (!$(this).find('th').length) {
                var tempTd = $(this).find('td');
                var length = tempTd.length;
                // var obj = {
                //     title: null,
                //     txt: null
                // };

            //$(this).find('td img').parent().addClass('icon-pad');

                $(tempTd[plugin.$index]).append('<button class="ups-sm_show"><span class="ups-icon-plus ups-iconAlone" aria-hidden="true"></span><span class="ups-readerTxt" data-lang-show="'+plugin.options.langShow+'" data-lang-hide="'+plugin.options.langHide+'">'+plugin.options.langShow+'</span></button><div class="mobile-list"></div>').attr('data-open', 'false').addClass('table-accordion');
                var mobileList = $(this).find('.mobile-list');

                for (var td = 0; td < length; td++) {
                    if (td !== plugin.$index) {
                        $(tempTd[td]).addClass('table_sm_hide');
                        $(mobileList).append('<div class="list-row"><span class="row-detail-name list-cell">' + $(plugin.$titles[td]).text() + ':</span><span class="list-cell">' + $(tempTd[td]).html() + '</span></div>');
                    }
                }
            }
        });

        plugin.$btns = $(plugin.$rows).find('.table-accordion');

        plugin._bindClick();
        plugin._bindColSpan();

        $(window).on('windowResize', function() {
            plugin._bindColSpan();
        });
    };

    Plugin.prototype._bindClick = function() {
        var plugin = this;

        plugin.$btns.on('click', function() {
            var btn = $(this).find('button');

            if (btn.find('.ups-iconAlone').hasClass('ups-icon-plus')) {
                btn.find('.ups-iconAlone').removeClass('ups-icon-plus').addClass('ups-icon-minus');
                btn.find('.ups-readerTxt').text(btn.find('.ups-readerTxt').attr('data-lang-hide'));
                $(this).attr('data-open', 'true');
            } else {
                btn.find('.ups-iconAlone').removeClass('ups-icon-minus').addClass('ups-icon-plus');
                btn.find('.ups-readerTxt').text(btn.find('.ups-readerTxt').attr('data-lang-show'));
                $(this).attr('data-open', 'false');
            }
        });

        return plugin;
    };

    Plugin.prototype._bindColSpan = function() {
        var plugin = this;

        switch (UPS.configs.viewport.size) {
            case 'small':
                plugin.$headers.children().attr('colspan', '1');
                break;
            // case 'medium':
            //     break;
            default:
                plugin.$headers.children().attr('colspan', plugin.$colspan);
                break;
        }

        return plugin;
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
