(function( $ ) {
    'use strict';

    var PLUGIN_NS = 'upsDaysOfOp';

    var Plugin = function ( target, options ) {
        var plugin = this;
        plugin.$T = $(target);
        plugin.options = $.extend(
            true, // deep extend
            {},
            options
        );

        /**********
            modification start from here 
        **********/
        plugin.$doopData = plugin.options.daysData|| {};
        plugin.$doopType= plugin.options.type;
        plugin.$ajaxURL= plugin.options.localeURL;
        /**********
            modification ends here 
        **********/

        plugin.$views   = plugin.$T.find('.ups-daysofop_loc');
        plugin.$daysCont = plugin.$T.find('.ups-daysofop_days');

        plugin.tData    = plugin.$T.data();
       // console.log(plugin.tData)
        plugin.full     = plugin.tData.full;
        plugin.fullTxt  = plugin.tData.fulltxt;
        plugin.fullUrl  = plugin.tData.fullurl;
        plugin.downTxt  = plugin.tData.downtxt;
        plugin.source   = plugin.tData.source;
        plugin.moreDets = plugin.tData.moredetails+'<span class ="ups-readerTxt">'+plugin.options.expand+'</span>';
        plugin.lessDets = plugin.tData.lessdetails+'<span class ="ups-readerTxt">'+plugin.options.collapse+'</span>';

        plugin.$countrySel = plugin.$T.find('.ups-daysofop_loc select');
        plugin.country = '';

        plugin.$cta = plugin.$T.find('.ups-daysofop_cta .ups-cta');

        plugin.hasFullBtn = false;
        plugin.view=plugin.$countrySel.val();

        plugin.firstView = true;

        plugin._init( target, options );
        return plugin;
    };

    Plugin.prototype._init = function () {
        var plugin = this;

        //plugin._getData();
        /**********
            modification start from here 
        **********/

        plugin._checkView();
        plugin.$countrySel.on('change', function() {
            plugin.view=$(this).val();
            plugin._callAnalytics($(this));
            plugin._checkView();
        });
        /**********
            modification ends here 
        **********/

        return plugin;
    };

    Plugin.prototype._callAnalytics = function(_self) {
        //var plugin= this;
        var component={};
        component.link_page_name=document.title;
        component.link_name=_self.find('option:selected').text();
        component.event_id='22';
        component.content_block_id='M54';
        component.country_language_name=_self.find('option:selected').text();
        if(_self.parents('.ups-analytics-render').attr('data-content-id')!==undefined && _self.parents('.ups-analytics-render').attr('data-content-id')!==''){
            component.content_id = _self.closest('.ups-analytics-render').attr('data-content-id');
        }
        if(typeof window.utag_data!=='undefined' && window.utag_data!==undefined){
            component.user_type=window.utag_data.user_type;
            component.site_indicator=window.utag_data.site_indicator;
            component.page_country_code=window.utag_data.page_country_code;
            component.state=window.utag_data.state;
            component.city=window.utag_data.city;
            component.myups_login_state=window.utag_data.myups_login_state;
            component.page_language=window.utag_data.page_language;
        }
        if(typeof window.utag !=='undefined' && window.utag!==undefined){
            window.utag.track('link', component);
        }
    };

    Plugin.prototype._checkView=function(){
        var plugin= this;
        plugin._getView();
        if(plugin.$doopType!==undefined && plugin.$doopType==="full") {
            plugin._displayFull(plugin.$doopData);
        } else {
            plugin._maintainJSONStruct(plugin.$doopData);
        }
        return plugin;
    };

    Plugin.prototype._getView = function() {
        var plugin = this;

        var hash = '';

        if(plugin.firstView) {
            hash = window.location.hash.substr(1);

            if(hash) {
                plugin.view = hash;
                plugin.$countrySel.val(hash);
            } else {
                plugin.view = plugin.$views.find(':selected').attr('value');
            }
            plugin.firstView = false;
        }

        return plugin;
    };

    /*Plugin.prototype._getData = function() {
        var plugin = this;

        plugin._getView();

        plugin.$promise = $.ajax({ //comment this block
            url: plugin.source +'_'+ plugin.view +'.json',
            dataType: 'json'
        });

        plugin.$promise = $.ajax({
            url: plugin.$ajaxURL+"?selLoc="+plugin.view,
            dataType: 'xml'
        });
        plugin.$promise.done(function(data, response, jqXHR) {
            plugin.$doopData= $.parseJSON($(data).find("DOPResult")[0].textContent);
            if(plugin.$doopType!=undefined && plugin.$doopType=="full") {
                plugin._displayFull(plugin.$doopData);
            } else {
                plugin._maintainJSONStruct(plugin.$doopData);
            }
            if(plugin.full) { // comment if block
                plugin._displayFull(data);
            } else {
                plugin._maintainJSONStruct(data);
            }
        });

        plugin.$promise.fail(function(jqXHR) {
            plugin._dataError(jqXHR);
        });

        return plugin;
    };
    */
    Plugin.prototype._dataError = function() {
        var plugin = this;

        //console.log(  jqXHR  );
        plugin.$daysCont.empty()
            .append('<p class="ups-error">'+plugin.$T.attr('data-lang-error')+'</p>');

        return plugin;
    };
    /***
        changes starts here
    ***/
                
    Plugin.prototype._sortDateObject=function(fMonth,sMonth){
        return new Date(fMonth.date.datetime).getTime() - new Date(sMonth.date.datetime).getTime();
    };
    /***
        changes ends here
    ***/
    
    Plugin.prototype._displayFull = function(data) {
        var plugin = this;

        plugin.$daysCont.empty()
            .addClass('ups-daysofop_days-full');

        var $daysAccord = $('<div class="ups-accordion_wrapper ups-daysofop_accordion"/>');
        var $daysList = $('<ul class="ups-accordion_content"/>').appendTo($daysAccord);

        var dataDates;
        if(plugin.view!==undefined && plugin.view!==''){
            for(var i=0;i<data.locales.length;i++){
                if(data.locales[i].countryName===plugin.view){
                    dataDates=data.locales[i].dates;
                    break;
                }
            }
        }else{
            dataDates= data.locales[0].dates;
        }
        if(dataDates && dataDates.length>0){

            for (var iMonth = 0; iMonth < dataDates.length; iMonth++) {
                (function() {
                    var month = dataDates[iMonth];
                    var $month = $('<li class="ups-accordion_item"/>');
                    var $monthBtn = $('<button class="ups-accordion_toggle">'+ month.monthLabel +'<i><span class="icon ups-icon-plus" aria-hidden="true"></span><span class ="ups-readerTxt" data-lang-show="expand" data-lang-hide="collapse">collapse</span></i></button');
                    var $monthExp = $('<ul class="ups-accordion_expand"/>');


                    $monthBtn.appendTo($month);
                    $monthExp.appendTo($month);
                    $month.appendTo($daysList);
                    /***
                        changes starts here
                    ***/
                    month.monthDates.sort(plugin._sortDateObject);
                    /***
                        changes ends here
                    ***/
                    for (var iDay = 0; iDay < month.monthDates.length; iDay++) {
                        (function() {
                            var day = month.monthDates[iDay];
                            //console.log(day.date.datetime)
                            var $day = $('<li class="ups-daysofop_day"/>'); 

                            if(day.image && day.image.src && day.image.src !== '' ) {
                                var img = '<img src="'+ day.image.src +'" alt="'+ day.image.alt +'">';
                                $day.append(img);
                            }

                            var time = '<time datetime="'+ day.date.datetime +'"> \
                                   <span class="ups-daysofop_dow">'+ day.date.dow +'</span> \
                                   <span class="ups-daysofop_date">'+ day.date.date +'</span> \
                                   <span class="ups-daysofop_month">'+ month.monthLabelAbbr +'</span> \
                                   <span class="ups-daysofop_year">'+ day.date.year +'</span> \
                                </time>';

                            $day.append(time);

                            var details = '<div class="ups-daysofop_details"> \
                                   <h3>'+ day.title +'</h3>';
                            if(day.status.closed==="true") {
                            	details += '<span class="ups-daysofop_status ups-daysofop_status-closed"><span class="icon" aria-hidden="true"></span>'+ day.status.label +'</span>';
                            } else {
                            	details += '<span class="ups-daysofop_status"><span class="icon" aria-hidden="true"></span>'+ day.status.label +'</span>';
                            }

                            details += '<p>'+ day.note +'</p> \
                                </div>';

                            $day.append(details);

                            if(day.info) {
                                var $info = $('<div class="ups-daysofop_addInfo">'+ day.info +'</div>');
                                var $infoToggle = $('<button class="ups-daysofop_detToggle">'+ plugin.moreDets +'</button>');

                                $infoToggle.on('click', function() {
                                    $infoToggle.toggleClass(UPS.configs.activeClass);
                                    if($infoToggle.hasClass(UPS.configs.activeClass)) {
                                        $infoToggle.html(plugin.lessDets);
                                        $info.addClass(UPS.configs.activeClass);
                                    } else {
                                        $infoToggle.html(plugin.moreDets);
                                        $info.removeClass(UPS.configs.activeClass);
                                    }
                                }).appendTo($day);

                                $day.append($info);
                            }

                            $monthExp.append($day);
                        })();
                    }

                    if(iMonth === 0) {
                        $month.addClass(UPS.configs.activeClass);
                        $monthBtn.addClass(UPS.configs.activeClass);
                        $monthBtn.find('i.icon.ups-icon-plus .ups-readerTxt').text('collapse');
                    }
                })();
            }
        }else{
            plugin._dataError();
            return;
        }

        if(data.downloads && data.downloads.length>0) {
            if(plugin.downTxt !== undefined && !plugin.$downloads) {
                var $downCont = $('<div class="ups-daysofop_downloads"><h3>'+ plugin.downTxt +'</h3></div>');
                plugin.$downloads = $('<ul/>').appendTo($downCont);
                plugin.$T.append($downCont);
            }

            plugin.$downloads.empty();
            for (var iDown = 0; iDown < data.downloads.length; iDown++) {
                (function() {
                    var down = data.downloads[iDown];
                    var $down = $('<li><a class="ups-analytics '+(down.link===undefined?'ups-daysofop_hide':'')+'" data-event-id="20" data-content-block-id="M54" href="'+ down.link +'">'+ down.label +'</a>');

                    plugin.$downloads.append($down);
                })();
            }
        }

        if(data.disclaimer) {
            
            if(!plugin.$disclaimer) {
                plugin.$disclaimer = $('<div class="ups-daysofop_disclaimer">'+ data.disclaimer +'</div>');
                plugin.$T.append(plugin.$disclaimer);
            } else {
                $(".ups-daysofop_disclaimer").remove();
                plugin.$disclaimer = $('<div class="ups-daysofop_disclaimer">'+ data.disclaimer +'</div>');
                plugin.$T.append(plugin.$disclaimer);
            }
        }

        plugin.$daysCont.append($daysAccord);

        $daysAccord.upsAccordion({});

        return plugin;
    };
    /**********
        modification start from here 
    **********/
    Plugin.prototype._maintainJSONStruct= function(data){
        var plugin = this;
        var locales=data.locales;
        var dates;
        if((plugin.view!==undefined && plugin.view!=="" ) || locales.length>1 ){
            for(var iLoc=0; iLoc<locales.length;iLoc++){
                if(locales[iLoc].countryName===plugin.view){
                    dates=locales[iLoc].dates;
                    break;
                }
            }
        }else{
            dates=locales[0].dates;
        }
        if(dates!==undefined && dates.length>0){

            var $twoMonthArr=[];
            var dt= new Date();
            for (var i = 0;i < dates.length ; i++) {
                if(dates[i].monthDates!==undefined){
                    for (var j = 0;j < dates[i].monthDates.length ; j++) {
                        var jsnDateTime= new Date(dates[i].monthDates[j].date.datetime);
                        if(jsnDateTime.getFullYear()===dt.getFullYear() && jsnDateTime.getMonth()===dt.getMonth()){
                            if(jsnDateTime.getDate()>=dt.getDate()){
                                $twoMonthArr.push(dates[i].monthDates[j]); // show current month and latest events
                            }
                        }else if((jsnDateTime.getFullYear()===dt.getFullYear() && jsnDateTime.getMonth()>dt.getMonth()) || (jsnDateTime.getFullYear()>dt.getFullYear()) ){
                            $twoMonthArr.push(dates[i].monthDates[j]);  // if size of array less than two and need more events to show of other month
                        }else{
                        //eliminate those who does not fit in...
                        }
                        if($twoMonthArr.length===2){
                            break;
                        }
                    }
                    if($twoMonthArr.length===2){
                        break;
                    }
                }
            }

            plugin._displayTwo($twoMonthArr); 
        }else{
            plugin._dataError();
        }
    };
    /**********
        modification ends here 
    **********/
    Plugin.prototype._displayTwo = function(data) {
        var plugin = this;

        plugin.$daysCont.empty()
            .removeClass('ups-daysofop_days-full');
        /**********
            modification Starts from here 
        **********/
        //data.sort(plugin._sortDateObject);
        for (var iData = 0; iData < data.length; iData++) {
            (function() {
                var day = data[iData];
        /**********
            modification ends here 
        **********/
                var $day = $('<li class="ups-daysofop_day col-sm-6"/>');

                if(day.image && day.image.src && day.image.src !== '' ) {
                    var img = '<img src="'+ day.image.src +'" alt="'+ day.image.alt +'">';
                    $day.append(img);
                }

                var time = '<time datetime="'+ day.date.datetime +'"> \
                       <span class="ups-daysofop_dow">'+ day.date.dow +'</span> \
                       <span class="ups-daysofop_date">'+ day.date.date +'</span> \
                       <span class="ups-daysofop_month">'+ day.date.month +'</span> \
                       <span class="ups-daysofop_year">'+ day.date.year +'</span> \
                    </time>';

                $day.append(time);

                var details = '<div class="ups-daysofop_details"> \
                       <h3>'+ day.title +'</h3>';

                if(day.status.closed==="true") {
                	details += '<span class="ups-daysofop_status ups-daysofop_status-closed"><span class="icon" aria-hidden="true"></span>'+ day.status.label +'</span>';
                } else {
                	details += '<span class="ups-daysofop_status"><span class="icon" aria-hidden="true"></span>'+ day.status.label +'</span>';
                }

                details += '<p>'+ day.note +'</p> \
                    </div>';

                $day.append(details);

                if(day.info) {
                    var info = '<div class="ups-daysofop_addInfo">'+ day.info +'</div>';
                    $day.append(info);
                }

                plugin.$daysCont.append($day);
            })();
        }

        plugin._setFullBtn();

        return plugin;
    };

    Plugin.prototype._setFullBtn = function() {
        var plugin = this;

        if(!plugin.$fullBtn) {

            plugin.$fullBtn = $('<div class="ups-daysofop_cta"/>');

            plugin.$fullInput = $('<a class="ups-cta ups-analytics '+(plugin.fullUrl!==undefined && plugin.fullUrl!==''?'':'ups-daysofop_hide')+'" data-event-id="21" data-content-block-id="M54" href="'+ plugin.fullUrl +'">'+ plugin.fullTxt +'</a>')
                .appendTo(plugin.$fullBtn);

            plugin.$fullInput.on('click', function(e) {
                e.preventDefault();
                window.location = plugin.fullUrl +'#'+ plugin.$countrySel.val();
            });
        }

        if(!plugin.hasFullBtn) {
            plugin.$T.append(plugin.$fullBtn);
        }

        return plugin;
    };


    $.fn[ PLUGIN_NS ] = function( methodOrOptions ) {
        if (!$(this).length) {
            return $(this);
        }
        var instance = $(this).data(PLUGIN_NS);
        if ( instance && methodOrOptions!==undefined && (methodOrOptions.hasOwnProperty('indexOf') && methodOrOptions.indexOf('_') !== 0) && instance[ methodOrOptions ] && typeof( instance[ methodOrOptions ] ) === 'function' ) {
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
