// -------------------------------------------------
// Fuel Surcharge  namespace
// -------------------------------------------------
 

(function($) {
  
    'use strict';
   
    var PLUGIN_NS = 'upsFSC';


      var Plugin = function(target, options) {
        var plugin = this;
        plugin.$T = $(target);

        /** #### OPTIONS #### */
        plugin.options = $.extend(
            true, // deep extend
            {
                DEBUG: false,
                defaultOptionA: 'defaultValue'
            },
            options 
        );
        plugin._init( target );
        return plugin;
    };

        Plugin.prototype._init = function() {
            var plugin = this;
             //var param = '';
             plugin.lang = '';
            plugin.$table= plugin.$T.find('table');
            //var $fscFragment = plugin.$T.find('.fuel-surcharge');
            plugin._getFSCData();
            return plugin;
        };


        Plugin.prototype.bindToTable = function(id, item){
            //var plugin=this;
            //var __table= plugin.$T.find('table');
            var tableTd = ""; 
                for (var key in item) {
                     if(key.split("_")[1] !== undefined){
                        tableTd += "<td>"+ item[key] +"</td>";
                    } else {
                        if(item[key] === "N/A"){
                            item[key] = "";
                        }
                tableTd += "<td>"+ item[key] +"</td>";
                }
            }

            $('#'+id).find('tbody').append("<tr>"+ tableTd +"</tr>");                
            tableTd = "";
              
        };

        Plugin.prototype.renderData = function(data){
             var plugin = this;
            //console.log(data,plugin.lang);
            var $initTable;
             $.each(data.FuelSurchargeResponse, function(childItem){ // 1 1. surcharge rate and 2. history surcharge
                if(childItem.split("_")[1] === plugin.lang.split("_")[0]){
                    $.each(data.FuelSurchargeResponse[childItem], function(index1, item){ // fuel surcharge and 2 history
                        //console.log("1",index1, item)
                        if(Array.isArray(item)){
                            $.each(item, function(index, innerItem){
                                plugin.bindToTable(index1, innerItem);
                            });
                            $("#"+index1).upsTable({
                                langShow: plugin.options.expand,
                                langHide: plugin.options.collapse
                            });
                        }else{
                            //console.log("second p" , childItem.split("_")[0],item);
                            $initTable=childItem.split("_")[0];
                            plugin.bindToTable($initTable, item);                            
                        }   
                    });
                    if($initTable!==undefined){
                        $("#"+$initTable).upsTable({
                            langShow: plugin.options.expand,
                            langHide: plugin.options.collapse
                        });
                        $initTable=undefined;
                    }
                }
                
            });

            
        };


        Plugin.prototype._getFSCData = function() {
            var plugin = this;
            var param=''; 
            if (plugin.options.country !== undefined) {
                param = plugin.options.country.toLowerCase();
                //console.log(param);
            }

            if (plugin.options.locale!== undefined){
                plugin.lang = plugin.options.locale;
                //  console.log(plugin.lang);
            }


           plugin.$promise = $.ajax({
               url: "/assets/resources/fuel-surcharge/" + param + ".json",
               datatype: 'json',
               method: 'GET'
           });

            plugin.$promise.done(function(data) {
                 var FuelSurchargeResponseObj = data;
                plugin.renderData(FuelSurchargeResponseObj);
            });
            
            plugin.$promise.fail(function() {
                 console.log("Please Try again later");
            });
            return plugin;
        };

    /** #### JQUERY HOOK #### */
    $.fn[PLUGIN_NS] = function(methodOrOptions) {
        var plugin = this;
        if (!$(plugin).length) {
            return $(plugin);
        }
        var instance = $(plugin).data(PLUGIN_NS);

        if (instance && (methodOrOptions.hasOwnProperty('indexOf') && methodOrOptions.indexOf('_') !== 0) && instance[methodOrOptions] && typeof(instance[methodOrOptions]) === 'function') {
            return instance[methodOrOptions](Array.prototype.slice.call(arguments, 1));
        } else if (typeof methodOrOptions === 'object' || !methodOrOptions) {
            instance = new Plugin($(plugin), methodOrOptions);
            $(plugin).data(PLUGIN_NS, instance);
            return $(plugin);
        } else if (!instance) {
            $.error('Plugin must be initialised before using method: ' + methodOrOptions);
        } else if (methodOrOptions.indexOf('_') === 0) {
            $.error('Method ' + methodOrOptions + ' is private!');
        } else {
            $.error('Method ' + methodOrOptions + ' does not exist.');
        }
    };

})(jQuery);
