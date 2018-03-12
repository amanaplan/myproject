
(function( $ ) {
    'use strict';

    var PLUGIN_NS = 'upsAlertsBar';

    var Plugin = function ( target, options ) {

        var plugin = this;
        plugin.$T = $(target);

        plugin.options= $.extend(
            true,  // deep extend
            {},
            options
        );

        plugin.$body = $('body');
        plugin.$list = plugin.$T.find('.ups-alerts_list');
        plugin.$items = plugin.$T.find('.ups-alert_msg');
        plugin.$index = plugin.$T.find('.ups-alert_index');
        plugin.$size = plugin.$T.find('.ups-alert_size');
        plugin.$close = plugin.$T.find('.ups-alerts_close');

        plugin.tData = plugin.$T.data();
        plugin.link = plugin.tData.link;
        plugin.linkTxt = plugin.tData.linktxt;
        plugin.prevTxt = plugin.tData.prevtxt;
        plugin.nextTxt = plugin.tData.nexttxt;

        plugin.duration = 600;
        plugin.hasLink = false;
        plugin.alertUrl= plugin.options.alertUrl;
        plugin.alertHide = plugin.$T.data("alerthide");

        plugin._init( target, options );
        return plugin;
    };


    Plugin.prototype._init = function () {
        var plugin = this;

        UPS.configs.$body.addClass('ups-hasAlerts');

        plugin.$list.on('init', function() {
            var $btns = plugin.$T.find('.slick-prev,.slick-next');

            $btns.on('click', function() {
                setTimeout(function() {
                    plugin.$list.find('.slick-active').focus();
                }, plugin.duration+10);
            });
        });
        
        plugin.alertConfig = {
                slide: '.ups-alert_msg',
                slidesToShow: 1,
                speed: plugin.duration,
                arrows: true,
                nextArrow: '<button type="button" class="slick-next ups-iconAlone"><span class="icon" aria-hidden="true"></span><span class="ups-readerTxt">'+ plugin.nextTxt +'</span></button>',
                prevArrow: '<button type="button" class="slick-prev ups-iconAlone"><span class="icon" aria-hidden="true"></span><span class="ups-readerTxt">'+ plugin.prevTxt +'</span></button>',
                appendArrows: $('.ups-alerts_controls'),
                infinite: true,
                rtl: UPS.configs.isRTL
            };
        plugin.slick= plugin.$list.slick(plugin.alertConfig)
        .on({
            'beforeChange': function(evt, slide, currentSlide, nextSlide){
                plugin.$index.text(nextSlide + 1);
            }
        }).on('afterChange',function(slick,currentSlide){
	            setTimeout(function(){
	            	plugin._removeAlertAria();
	        },1000);
        
        });
        
        plugin._removeAlertAria();
        $(window).load(function(){
        	plugin.currentSlide = $('.ups-alert_msg.slick-current.slick-active');
            if($(plugin.currentSlide).length){
            	plugin.currentSlide.width = $(plugin.currentSlide).width();
            	//console.log(plugin.currentSlide.width);
            	if(plugin.currentSlide.width === 0){
                    setTimeout(function(){
                        plugin.slick.slick('unslick');
                        plugin.slick.slick(plugin.alertConfig).on({
                            'beforeChange': function(evt, slide, currentSlide, nextSlide){
                                plugin.$index.text(nextSlide + 1);
                            }
                        });
                    },3000);
                }
            }
        });
        

        if(window.location.search!=='' && window.location.search.indexOf('id=') > -1  && window.location.search.split('id=')[1].split("&")[0]!==""){
            plugin.setSlick(window.location.search.split('id=')[1].split("&")[0]);
        }

        plugin.$index.text(plugin.$list.slick('slickCurrentSlide') + 1);
        plugin.$size.text(plugin.$items.length);

        if(plugin.alertHide !== undefined){
            if(plugin.alertHide === "" || plugin.alertHide === false || plugin.alertHide === "false" ) {
                plugin.showAlerts();
            } else if(plugin.alertHide === true || plugin.alertHide === "true") {
                plugin.hideAlerts();
            }else{
                console.log("Condition missing for alert bar");
            }
        }else{
            console.log("Data attribute is not present in Alert bar");
        }

        plugin.$close.on('click', function() {
            plugin.hideAlerts(plugin);
        });

        plugin._setHeight();

        return plugin;
    };
    
    Plugin.prototype._removeAlertAria = function(){
    	var plugin = this;
    	plugin.$T.find('.slick-track').removeAttr('role');
        plugin.$T.find('.ups-alert_msg').removeAttr('role');
        plugin.$T.find('.ups-alert_msg.slick-slide').not('.slick-cloned').each(function(){
        	$(this).removeAttr("aria-describedby");
        });
    };

    Plugin.prototype.readCookie= function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0;i < ca.length;i++) {
            var c = ca[i];
            while (c.charAt(0)===' ') c = c.substring(1,c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length,c.length);
        }
        return null;
    };

    Plugin.prototype.setSlick=function(data){
        var plugin=this;
        var $index=1;
        $.each(plugin.$list.find("li.ups-alert_msg"),function(i){
            if($(this).attr("data-position")===data){
                $index=i;
            }
        });
        plugin.slick.slick("slickGoTo",($index-1),false);
        plugin.$index.text($index); 
    };

    Plugin.prototype.showAlerts = function() {
        var plugin = this;

        UPS.configs.$body.addClass('ups-hasAlerts');

        if(plugin.hasLink) {
            plugin.$link.detach();
        }

        plugin._setHeight();

        $(window).on('windowResize.alerts', function() {
            plugin._setHeight();
        });

        return plugin;
    };
    
    

    Plugin.prototype.hideAlerts = function() {
        var plugin = this;
        //console.log(plugin.alertUrl)
        if(!plugin.hasLink) {
            //var linkTxt = plugin.$T.data('link');
            plugin.$utils = $('.ups-header_utils');
            plugin.$link = $('<li class="ups-alerts_link"><a href="'+ plugin.link +'">'+ plugin.linkTxt +' ('+ plugin.$items.length +')</a></li>');

            plugin.$link.find('a').on('click', function(e) {
                e.preventDefault();
                //$.cookie('alertsHide',null,{ path: '/' });
                $.ajax({
                    type: 'POST',
                    url: plugin.alertUrl+'hideAlertsBar='+false,
                    success: function(msg){
                        console.log("Alert Success");
                    },
                    error: function (error) {
                        console.log('error; ' + eval(error));
                    }
                });
                if(UPS.configs.viewport.size === 'large' || UPS.configs.viewport.size === 'xlarge') {
                    plugin.showAlerts();
                } else {
                    window.location.href = $(this).attr('href');
                }
            });

            plugin.hasLink = true;
        }

        plugin.$utils.prepend(plugin.$link);

        UPS.configs.$body.removeClass('ups-hasAlerts');
        //$.cookie('alertsHide', true, { path: '/' });
        $.ajax({
            type: 'POST',
            url: plugin.alertUrl+'hideAlertsBar='+true,
            success: function(msg){
                console.log("Alert Success");
            },
            error: function (error) {
                console.log('error; ' + eval(error));
            }
        });

        $('#ups-headerWrap').css('margin-top', 0);
        UPS.configs.$body.css('padding-top', 0);

        return plugin;
    };

    Plugin.prototype._setHeight = function() {
        var plugin = this;

        var alertH = plugin.$T.outerHeight();
        var $head = $('#ups-headerWrap');

        if(UPS.configs.$body.hasClass('ups-hasAlerts') && UPS.configs.viewport.size === 'small') {
            $head.css('margin-top', '-23px');
            UPS.configs.$body.css('padding-top', 0);
        }else if(UPS.configs.$body.hasClass('ups-hasAlerts') && (UPS.configs.viewport.size === 'medium')) {
            //alertH = plugin.$T.outerHeight();
            $head.css('margin-top', alertH);
            UPS.configs.$body.css('padding-top', 0);
        }else if(UPS.configs.$body.hasClass('ups-hasAlerts') && ( UPS.configs.viewport.size === 'mediumMid')) {
            //alertH = plugin.$T.outerHeight();
            $head.css('margin-top', alertH);
            UPS.configs.$body.css('padding-top', alertH);
        } else {
            $head.css('margin-top', 0);
            UPS.configs.$body.css('padding-top', 0);
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
