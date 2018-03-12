(function ($) {
    'use strict';

    var PLUGIN_NS = 'upsList';

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
        /****************
            changes start from here 
        *****************/
    
        plugin.$dataObject=[];
        plugin.$sortedAlpha=[];
        plugin.$_sortLastDate=[];
        plugin.$_sortExpiredDate=[];
        /****************
            changes ends from here 
        *****************/
        
        plugin._init(target, options);
        return plugin;
    };

    /** #### INITIALISER #### */
    Plugin.prototype._init = function () {
        var plugin = this;

        plugin.$listComponent = plugin.$T.find('.ups-list_component');
        plugin.$items = plugin.$T.find('.ups-list_detail');
        plugin.$filter = plugin.$T.find('.ups-list_filter select.ups-dropdown');

        if (plugin.$T.find('.ups-list_filter').length > 0) {
            /****************
                changes start from here 
            *****************/
            
            $.each(plugin.$items,function(){
                var _container={
                    alpha:$(this).attr('data-alpha'),
                    date:$(this).attr('data-date'),
                    expiry: $(this).attr('data-expiry'),
                    content:$(this).html()
                };
                plugin.$dataObject.push(_container);
            });
            /****************
                changes ends from here 
            *****************/
    
            plugin.$items.addClass('filter');
            plugin.$filter.on('change', function (e) {
                var selected = $(e.currentTarget).find('option:selected').val();
                switch (selected) {
                    case 'all':
                        plugin.$items.addClass('active').removeClass('inactive');
                        break;
                    case 'alpha':
                        plugin._sortListAlphabetical();
                        break;
                    case 'date':
                        plugin._sortLastUpdatedDate();
                        break;
                    case 'expiry':
                        plugin._sortExpiryDate();
                        break;
                    default:
                        plugin.$items.removeClass('active').removeClass('inactive');
                        plugin.$items.each(function() {
                            if ($(this).attr('data-tag') === selected) {
                                $(this).addClass('active');
                            } else {
                                $(this).addClass('inactive');
                            }
                        });
                        break;
                }

            });
        }

        //plugin._resizeList();

        $(window).on('windowResize', function () {
            //plugin._resizeList();
        });
    };
    /****************
        changes start from here 
    *****************/
    Plugin.prototype.drawSortedList=function(chnnl){
        var plugin = this;
        var array = [];
        if(chnnl === "alpha"){
            array = plugin.$sortedAlpha;
        }else if(chnnl === "date"){
            array = plugin.$_sortLastDate;
        }else if(chnnl==="expiry"){
            array = plugin.$_sortExpiredDate;
        }
        var _mainContainer= plugin.$T.find(".list_row");
        _mainContainer.empty();
        for(var j=0; j<array.length;j++){
            for(var i=0;i<plugin.$dataObject.length; i++){
                if(array[j]===plugin.$dataObject[i][chnnl]){
                    _mainContainer.append('<div class="ups-list_detail filter" data-alpha="'+plugin.$dataObject[i].alpha+'" data-expiry="'+plugin.$dataObject[i].expiry+'" data-date="'+plugin.$dataObject[i].date+'" style="min-height:133px;">'+plugin.$dataObject[i].content+'</div>');
                    break;
                }
            }
        }
    };

    Plugin.prototype._sortExpiryDate=function(){
        var plugin=this;
        if(plugin.$_sortExpiredDate!==undefined && plugin.$_sortExpiredDate.length<=0){
            for(var i in plugin.$dataObject){
                plugin.$_sortExpiredDate.push(plugin.$dataObject[i].expiry);
            }
            plugin.$_sortExpiredDate.sort(function(start,end){
                 return new Date(end) - new Date(start);
            });
        }

        plugin.drawSortedList("expiry");
    };

    Plugin.prototype._sortListAlphabetical=function () {
        var plugin=this;
        if(plugin.$sortedAlpha!==undefined && plugin.$sortedAlpha.length<=0){
            for(var i in plugin.$dataObject){
                plugin.$sortedAlpha.push(plugin.$dataObject[i].alpha);
            }
            plugin.$sortedAlpha.sort();
        }

        plugin.drawSortedList("alpha");
    };

    Plugin.prototype._sortLastUpdatedDate=function () {
        var plugin=this;
        if(plugin.$_sortLastDate!==undefined && plugin.$_sortLastDate.length<=0){
            for(var i in plugin.$dataObject){
                plugin.$_sortLastDate.push(plugin.$dataObject[i].date);
            }
            plugin.$_sortLastDate.sort(function(start,end){
                 return new Date(end) - new Date(start);
            });
        }

        plugin.drawSortedList("date");
            
    };
    /****************
        changes ends from here 
    *****************/
    
    /*Plugin.prototype._resizeList = function () {
        var plugin = this;

        if (plugin.$T.parents('.col-lg-12').length > 0) {
            switch (UPS.configs.viewport.size) {
                case 'small':
                    plugin.resize = 1;
                    break;
                case 'mediumMid':
                    plugin.resize = 2;
                    break;
                case 'medium':
                    plugin.resize = 1;
                    break;
                default:
                    plugin.resize = 3;
                    break;
            }
        } else if (plugin.$T.parents('.col-lg-8').length > 0) {
            switch (UPS.configs.viewport.size) {
                case 'small':
                    plugin.resize = 1;
                    break;
                case 'mediumMid':
                    plugin.resize = 2;
                    break;
                case 'medium':
                    plugin.resize = 1;
                    break;
                default:
                    plugin.resize = 1;
                    break;
            }
        } else {
            switch (UPS.configs.viewport.size) {
                case 'small':
                    plugin.resize = 1;
                    break;
                case 'mediumMid':
                    plugin.resize = 2;
                    break;
                case 'medium':
                    plugin.resize = 2;
                    break;
                default:
                    plugin.resize = 3;
                    break;
            }
        }

        if (plugin.resize > 1) {
            var temp = [];
            var section = [];

            for (var i = 1; i < plugin.$items.length+1; i++) {
                if (i%plugin.resize > 0) {
                    section.push(plugin.$items[i-1]);
                } else { // === 0
                    section.push(plugin.$items[i-1]);
                    temp.push(section);
                    section = [];
                }
            }

            if (section.length > 0) {
                temp.push(section);
            }

            $(plugin.$items).css('min-height', '0px');

            for (var k = 0; k < temp.length+1; k++) {
                var height = 0;
                //var newColor = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6);
                $(temp[k]).each(function () {
                    if ($(this).outerHeight(true) >= height) {
                        height = $(this).outerHeight(true);
                    }
                });
                //$(temp[k]).css('background-color', newColor);
                $(temp[k]).css('height', height);
            }
        } else {
            $(plugin.$items).css('height', '');
        }

        return plugin;
    }*/

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
