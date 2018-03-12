
    (function( $ ) {
        'use strict';

        var PLUGIN_NS = 'upsCalendar';

        var Plugin = function ( target, options ) {
            var plugin = this;
            plugin.$T = $(target);


            plugin.options = $.extend(
                true, // deep extend
                {},
                options
            );

            plugin.tData    = plugin.$T.data();

            plugin.month    = plugin.tData.date;
            plugin.listView = !!plugin.tData.list;
            
            // Defined for displaying default layout for calendar 
            if (window.isListView){
                plugin.listView = !plugin.tData.list;
            }
            
            plugin.hasNav   = false;
            plugin.setMob   = false;
            plugin.setDesk  = false;
            plugin.$nav     = {};
            
            //plugin.hiddenClass= "ups-calendar-hide-events";
            plugin.data = {};
            
            plugin._init( target, options );
            return plugin;
        };

        Plugin.prototype._init = function ( target ) {
            var plugin = this;
            plugin.$T = target;

            plugin.$calendarBody = $('<div class="ups-calendar_body"/>').appendTo(plugin.$T);

            plugin._getData();

            return plugin;
        };

        Plugin.prototype._getData = function() {
            var plugin = this;
            var param='';

            if(plugin.options.country!==undefined){
                param+='&country='+plugin.options.country;
            }
            if(plugin.options.locale_lang!==undefined){
                param+='&locale='+plugin.options.locale_lang;
            }
            plugin.$promise = $.ajax({           
                url: window.eventsUrl + '&eventMonth=' + plugin.month+param,// eventURL comes from XSL.
                datatype:'xml'
            });

            plugin.$promise.done(function(data) {
                var $xml = $(data);
                data = $xml.find('calendarJson').text();                
                if(data !== "") {       
                    data = $.parseJSON($xml.find('calendarJson').text());
                    plugin.data = data;
                    
                    plugin.setMob = UPS.configs.viewport.size === 'small';

                    if(plugin.listView || plugin.setMob) {
                        plugin._displayList();
                    } else {
                        plugin._displayFull();
                    }

                    if(!plugin.hasNav) {
                        plugin._createNav();
                    } else {
                        plugin._updateNav();
                    }

                    $(window).off('windowResize.cal')
                        .on('windowResize.cal', function() {
                            plugin.mobList = plugin.listView;
                            if(UPS.configs.viewport.size === 'small' && !plugin.setMob) {
                                if(!plugin.listView) {
                                    plugin._displayList();
                                }
                                plugin.setMob = true;
                                plugin.setDesk = false;
                            } else if (UPS.configs.viewport.size !== 'small') {
                                if(!plugin.setDesk) {
                                    if(!plugin.listView && plugin.setMob) {
                                        plugin._displayFull();
                                    }
                                }
                                plugin.setMob = false;
                                plugin.setDesk = true;
                            }
                        });
                }
                else
                {
                    var errorNode = $xml.find('error').text();                  
                    plugin._dataError(errorNode);
                }
            });

            plugin.$promise.fail(function() {
                plugin._dataError(window.errorMessage);//errorMessage is comming from XSL.
            });

            return plugin;
        };

        Plugin.prototype._dataError = function(errorMessage) {
            var plugin = this;

            plugin.$T.empty()
                .append('<p class="ups-error">'+ errorMessage +'</p>');

            return plugin;
        };

        Plugin.prototype._toggleBtns = function() {
            var plugin = this;
            
            plugin.$list.toggleClass(UPS.configs.activeClass, plugin.listView);
            plugin.$full.toggleClass(UPS.configs.activeClass, !plugin.listView);

            return plugin;
        };

        Plugin.prototype._createNav = function() {
            var plugin = this;

            plugin.$calToggle = $('<ul class="ups-calendar_toggle"/>');

            plugin.$list = $('<li><button class="ups-calendar_listBtn"><span class="icon" aria-hidden="true"></span>'+ plugin.data.listLabel +'</button></li>')
                .appendTo(plugin.$calToggle)
                .on('click', function(e) {
                    e.preventDefault();
                    plugin.listView = true;
                    plugin._displayList();
                    plugin._toggleBtns();
                });
            plugin.$full = $('<li><button class="ups-calendar_fullBtn"><span class="icon" aria-hidden="true"></span>'+ plugin.data.fullLabel +'</button></li>')
                .appendTo(plugin.$calToggle)
                .on('click', function(e) {
                    e.preventDefault();
                    plugin.listView = false;
                    plugin._displayFull();
                    plugin._toggleBtns();
                });

            plugin._toggleBtns();

            plugin.$T.prepend(plugin.$calToggle);

            plugin.$nav = $('<div class="ups-calendar_nav"/>')
                .append('<h1>'+ plugin.data.title +'</h1>');

            plugin.$prev = $('<a class="ups-calendar_prev" href="'+ plugin.data.prev.link +'"><span class="icon" aria-hidden="true"></span>'+ plugin.data.prev.label +'</a>')
                .appendTo(plugin.$nav)
                .on('click.cal', function(e) {
                    e.preventDefault();
                    plugin.month = $(this).attr('href');
                    plugin._getData();
                });
            plugin.$next = $('<a class="ups-calendar_next" href="'+ plugin.data.next.link +'"><span class="icon" aria-hidden="true"></span>'+ plugin.data.next.label +'</a>')
                .appendTo(plugin.$nav)
                .on('click.cal', function(e) {
                    e.preventDefault();
                    plugin.month = $(this).attr('href');
                    plugin._getData();
                });

            plugin.$T.prepend(plugin.$nav);

            plugin.hasNav = true;

            return plugin;
        };


        Plugin.prototype._updateNav = function() {
            var plugin = this;

            plugin.$nav.find('h1').text(plugin.data.title);
            plugin.$prev.attr('href', plugin.data.prev.link);
            plugin.$next.attr('href', plugin.data.next.link);

            return plugin;
        };

        Plugin.prototype._displayFull = function() {
            var plugin = this;

            plugin.$calendarBody.empty();

            var $weekdays = $('<ul class="ups-calendar_weekdays"/>');
            for (var iNames = 0; iNames < plugin.data.weekdays.length; iNames++) {
                (function() {
                    $weekdays.append('<li>' + plugin.data.weekdays[iNames] + '</li>');
                })();
            }

            plugin.$calendarBody.append($weekdays);

            var dayBlocks = plugin.data.days + plugin.data.start;

            var numWeeks = Math.ceil(dayBlocks/7);

            var dayCount = 0;

            for (var iWeek = 0; iWeek < numWeeks; iWeek++) {
                (function() {
                    var $week = $('<ul class="ups-calendar_week"/>');
                    for (var iDay = 0; iDay < 7; iDay++) {
                        (function() {
                            var $day = $('<li><span>&nbsp;</span></li>');
                            if( dayCount < plugin.data.start || dayCount >= (plugin.data.days + plugin.data.start)) {
                                $day.addClass('ups-calendar_empty');
                                if(dayCount === (plugin.data.start - 1)) {
                                    $day.addClass('ups-calendar_first');
                                }
                            } else {
                                $day.append('<h2>'+ (dayCount - plugin.data.start + 1) + '</h2>' );
                                $day.attr('data-day', dayCount - plugin.data.start + 1);
                            }

                            $week.append($day);
                            dayCount++;
                        })();
                    }

                    plugin.$calendarBody.append($week);
                })();
            }

            for (var iEvt = 0; iEvt < plugin.data.events.length; iEvt++) {
                (function() {
                    var evt = plugin.data.events[iEvt];

                    var $evtDate = plugin.$T.find('li[data-day="'+ evt.date +'"]');

                    var $evtLink;

                    if(!$evtDate.hasClass(UPS.configs.activeClass)) {
                        $evtLink = $('<a class=" ups-analytics" data-content-block-id="M24" data-event-id="22" href="#evt'+ iEvt +'">'+ evt.title +'</a>')
                            .on('click', function() {
                                plugin._displayList( $evtLink.attr('href') );
                            });

                        $evtDate.append($evtLink)
                            .addClass(UPS.configs.activeClass)
                            .find('span')
                            .remove();
                    } else {
                        var evtLinks = $evtDate.find('a');
                        if(evtLinks.length < 2) {
                            $evtLink = $('<a data-content-block-id="M24" class=" ups-analytics" href="#evt'+ iEvt +'">'+ evt.title +'</a>');
                        } else if(evtLinks.length === 2){
                        	$evtLink = $('<a href="#day'+ evt.date +'" class="ups-calendar_more"><span>'+ plugin.data.more +'</span><span class="icon" aria-hidden="true"></span></a>');
                        }

                        if(evtLinks.length <= 2) {
                            $evtLink.on('click', function() {
                                plugin._displayList( $evtLink.attr('href') );
                            });

                            $evtDate.append($evtLink);
                        }
                    }
                })();
            }

            var hasToday = plugin.data.today.indexOf(plugin.month) === 0;
            if(hasToday) {
                var today = parseInt( plugin.data.today.substr(plugin.data.today.length - 2) );
                plugin.$T.find('li[data-day="'+ today +'"]')
                    .addClass('ups-calendar_today');
            }

            return plugin;
        };

        Plugin.prototype._displayList = function(evtId) {
            var plugin = this;
            var dspLmt = 10;
            var dataLength = plugin.data.events.length;
            plugin.$calendarBody.empty();

            if(dataLength>0){
                var count = '<p class="ups-calendar_count">';
                    count += plugin.data.count.pre +' <span>'+ plugin.data.events.length +'</span> '+ plugin.data.count.post;
                    count += '</p>';

                plugin.$calendarBody.append(count);
            }

            if(dataLength > 0){
                var newLmt;
                if (dataLength <= dspLmt) {
                    newLmt = dataLength;
                } else{
                    newLmt = 10;
                }
                //console.log("new limit is: "+newLmt);

                plugin._buildListStructure(0,newLmt);
                var $moreDspBtn;
                if(dataLength > dspLmt){
                    plugin.$calendarBody.append('<div class="ups-article_readMore"><a href="#moreDisplay" class="ups-calendar_more ups-analytics" data-content-block-id="M24">View More</a></div>');
                    $moreDspBtn = plugin.$calendarBody.find('.ups-calendar_more');

                    $moreDspBtn.on('click', function() {
                        $moreDspBtn.remove();
                        //plugin.$calendarBody.find("article").removeClass(plugin.hiddenClass);
                        plugin._buildListStructure(dspLmt,dataLength);
                    });
                }
                if(evtId) {
                    if(!$(evtId).is(":visible")){
                        plugin._buildListStructure(dspLmt,dataLength);
                        if($moreDspBtn!==undefined){
                            $moreDspBtn.remove();
                        }
                    }
                    var $evt = $(evtId);
                    plugin.listView = true;
                    $('html, body').animate({
                        scrollTop: $evt.offset().top - 150
                    }, 600);
                    plugin._toggleBtns();
                }
                return plugin;
            }

        };
        Plugin.prototype._processRTE=function(data){
            var plugin=this;
            var content = data.split('$UPS_LINK[').join(plugin.options.locale+'/');
            var newContent= content.split(']').join('.page');
            return newContent;
        };

        Plugin.prototype._buildListStructure=function(start,end){
            var plugin = this;
            var days = [];
            var hdEvts="";
            for (var iEvt = start; iEvt < end; iEvt++) {
                var evt = plugin.data.events[iEvt];
                if ( $.inArray( evt.date, days ) === -1 ) {
                    days.push(evt.date);
                    plugin.$calendarBody.append('<div id="day'+ evt.date + '"></div>');
                }
                var $evtCont = $('<article id=evt'+ iEvt +' class="'+hdEvts+'">');

                var evtText = '<header><p>'+ evt.time.datename+'</p><h2>'+ evt.title +'</h2></header><img src="'+ evt.image.src +'" alt="'+ evt.image.alt +'" title="'+ evt.image.title +'"><div class="ups-calendar_dayCont"><p>'+ plugin._processRTE(evt.summary);

                /*if(evt.more) {
                    evtText += '<button class="ups-calendar_more">'+ evt.more.label +'</button></p>';
                    evtText += '<p class="ups-calendar_moreTxt">'+ evt.more.text +'</p>';
                } else {
                    evtText += '</p>';
                }
                */
                if(evt.venue || evt.time) {
                    evtText += '<dl>';

                    if(evt.venue) {
                        evtText += '<dt>'+ evt.venue.label +':</dt>';
                        evtText += (evt.venue.link)?
                            '<dd><a href="'+evt.venue.link+'" target="'+evt.venue.targetWindow+'" title="'+evt.venue.title+'" class="ups-analytics" data-event-id="21" data-content-block-id="M24">'+evt.venue.place+((evt.venue.targetWindow!==undefined && evt.venue.targetWindow!=='' && evt.venue.targetWindow.trim()==='_blank')?'<span class="icon ups-link_newwindow" aria-hidden="true"></span>':'')+'</a></dd>':
                            '<dd>'+ evt.venue.place +'</dd>';
                    }

                    if(evt.time) {
                        evtText += '<dt>'+ evt.time.label +':</dt>';
                        evtText += '<dd><time datetime="'+ evt.time.datetime +'">'+ evt.time.timename +'</time></dd>';
                    }

                    evtText += '</dl>';
                }

                if(evt.ctas.length) {

                    evtText += '<ul class="ups-calendar_dayCtas">';

                    for (var iCta = 0; iCta < evt.ctas.length; iCta++) {
                        (function() {
                            var cta = evt.ctas[iCta];
                            if(cta.link){
                                evtText += '<li><a href="'+cta.link+'" target="'+cta.targetWindow+'" title="'+ cta.title +'" class="ups-cta ups-analytics" data-event-id="21" data-content-block-id="M24">'+ cta.label +((cta.targetWindow!==undefined && cta.targetWindow!=='' && cta.targetWindow.trim()==='_blank')?'<span class="icon ups-link_newwindow" aria-hidden="true"></span>':'')+'</a></li>';
                            }
                        })();
                    }

                    evtText += '</ul>';
                }

                evtText += '</div>';
                $evtCont.append(evtText);
                if(evt.more) {
                    var $moreBtn = $evtCont.find('.ups-calendar_more');

                    $moreBtn.on('click', function() {
                        $moreBtn.remove();
                        $evtCont.find('.ups-calendar_moreTxt')
                            .addClass(UPS.configs.activeClass);
                    });
                }

                plugin.$calendarBody.append($evtCont);

            }
        };
        
        /*Plugin.prototype.getPageLink=function(linkAttrs){
            if(linkAttrs){
                if(linkAttrs.indexOf('.page') > -1 && linkAttrs.indexOf('/sites/') > -1){
                    var dataArr=linkAttrs.split("/");
                    dataArr.splice(0,3);
                    var concatData=dataArr.join("/");
                    concatData=concatData.split(".");
                    linkAttrs= '$PAGE_LINK['+concatData[0]+"]";
                    return linkAttrs;
                }
            }
        }*/


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
