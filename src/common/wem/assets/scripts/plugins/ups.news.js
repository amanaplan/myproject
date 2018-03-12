
(function( $ ) {
    'use strict';

    var PLUGIN_NS = 'upsNews';

    var Plugin = function( target, options ) {
        var plugin = this;
        plugin.$T = $(target);

        plugin.options = $.extend(
            true, // deep extend
            {},
            options
        );

        /*$.each(plugin.$T.find('.ups-news_item.ups-feed_auth a.ups-news_more'),function(){
            var _self=$(this);
            var $_empATag =  _self.attr('href');//100
            if($_empATag==undefined || $_empATag.length===0){
                _self.parents('.ups-news_item.ups-feed_auth').remove();
            }
        });*/
        plugin.$list = plugin.$T.find('.ups-news_list');
        plugin.$items = plugin.$list.find('.ups-news_item');
        plugin.$header = plugin.$T.find('.ups-news_header');

        plugin.tData = plugin.$T.data();
        plugin.prevTxt = plugin.tData.prevtxt;
        plugin.nextTxt = plugin.tData.nexttxt;
        plugin.hasSlider = false;
        plugin.hasNav = false;

        plugin.listWidth = 0;
        plugin.current = 0;
        plugin._expandView();
        plugin._init( target, options );
        return plugin;
    };

    Plugin.prototype._init = function() {
        var plugin = this;
        plugin._checkView();

        $(window).on('windowResize', function() {
            plugin._checkView();
        });

        plugin.$T.find('.ups-news_all.ups-body-link').on('click',function(){
            plugin.$T.parents('.ups-news').parent().find('.ups-news').toggleClass('ups-hidden');
        });

        return plugin;
    };

    Plugin.prototype._expandView=function(){
        var plugin = this;
        var component =plugin.$T.parents('.ups-news');
        var newComponent= component.clone().addClass('ups-expand');
        newComponent.find('.ups-news_all.ups-body-link').bind('click',function(){
            plugin.$T.parents('.ups-news').parent().find('.ups-news').toggleClass('ups-hidden');

            if(UPS.configs.viewport.size === 'small'){
                if(plugin.hasSlider) {
                    plugin.$list.slick('unslick');
                }
                plugin.hasSlider=false;
                plugin._setMobile();
            }
            if($('.ups-news:not(.ups-expand)').attr('data-unbind')!== undefined && $('.ups-news:not(.ups-expand)').attr('data-unbind')==='true'){
               $('.ups-news:not(.ups-expand)').removeAttr('data-unbind');
               plugin._setEventBinding();
            }
        }).text(newComponent.find('.ups-news_all.ups-body-link').attr('data-expand-text'));
        /*$.each(newComponent.find('.ups-news_item.ups-feed_auth a.ups-news_more'),function(){
            var _self=$(this);
            var $_empATag =  _self.attr('href');//100
            if($_empATag==undefined || $_empATag.length===0){
                _self.parents('.ups-news_item.ups-feed_auth').remove();
            }
        });*/
        component.parent().append(newComponent.addClass('ups-hidden'));

        return plugin;
    };

    Plugin.prototype._checkView = function() {
        var plugin = this;

        if(UPS.configs.viewport.size === 'small') {
            plugin._setMobile();
        } else {
            plugin._setFull();
            if(!$('.ups-news.ups-hidden').hasClass('ups-expand')){
                $('.ups-news:not(.ups-expand)').attr('data-unbind',true);
            }
        }

        return plugin;
    };

    Plugin.prototype._setFull = function() {
        var plugin = this;

        if(plugin.hasSlider) {
            plugin.$list.slick('unslick');
            plugin.hasSlider = false;
        }

        if(!plugin.hasNav) {
            plugin._createNav();
        }

        plugin._setEventBinding();

        return plugin;
    };

    Plugin.prototype._setEventBinding=function(){
        var plugin = this;
        plugin.current = 0;

        plugin._setDimensions();
        plugin._setPosition();
        plugin._setDisabled();

        plugin._bindSwipe();
        return plugin;
    };
    Plugin.prototype._bindSwipe = function() {
        var plugin = this;

        var xDown = null;
        var yDown = null;

        function handleTouchStart(evt) {
            xDown = evt.originalEvent.touches[0].clientX;
            yDown = evt.originalEvent.touches[0].clientY;
        }

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }

            var xUp = evt.originalEvent.touches[0].clientX;
            var yUp = evt.originalEvent.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                if ( xDiff > 0 ) {
                    /* left swipe */
                    plugin.goNext();
                } else {
                    /* right swipe */
                    plugin.goPrev();
                }
            }

            /* reset values */
            xDown = null;
            yDown = null;
        }

        plugin.$T.on('touchstart.full', handleTouchStart);
        plugin.$T.on('touchmove.full', handleTouchMove);

        return plugin;
    };


    Plugin.prototype._createNav = function() {
        var plugin = this;
        plugin.$nav = $('<div/>').addClass('ups-news_slideNav');
        plugin.$prev = $('<button type="button" class="ups-news_prev ups-iconAlone"><span class="icon" aria-hidden="true"></span><span class="ups-readerTxt">'+ plugin.prevTxt +'</span></button>');
        plugin.$next = $('<button type="button" class="ups-news_next ups-iconAlone"><span class="icon" aria-hidden="true"></span><span class="ups-readerTxt">'+ plugin.nextTxt +'</span></button>');

        plugin.$prev.on('click', function() {
            plugin.goPrev(plugin.$prev);
        }).appendTo(plugin.$nav);

        plugin.$next.on('click', function() {
            plugin.goNext();
        }).appendTo(plugin.$nav);

        plugin.$header.append(plugin.$nav);

        plugin.hasNav = true;
        return plugin;
    };

    Plugin.prototype._setDimensions = function() {
        var plugin = this;

        var itemH = 0;
        var listW = 0;

        for (var iItem = 0; iItem < plugin.$items.length; iItem++) {
            (function() {
                var $item = $(plugin.$items[iItem]).css('height', 'auto');
                var thisH = $item.outerHeight();

                itemH = (thisH >= itemH)? thisH: itemH;

                listW += $item.outerWidth();
            })();
        }

        for (var iItem2 = 0; iItem2 < plugin.$items.length; iItem2++) {
            (function() {
                var $item = $(plugin.$items[iItem2]);

                $item.css('height', itemH);
            })();
        }

        plugin.listWidth = listW;

        plugin.$list.css('width', plugin.listWidth);


        return plugin;
    };

    Plugin.prototype._setMobile = function() {
        var plugin = this;

        plugin.$T.off('touchstart.full');
        plugin.$T.off('touchmove.full');

        if (!plugin.hasSlider) {

            plugin.$items.css('height', 'auto');

            plugin.$list.css({
                    width: 'auto',
                    left: 'auto',
                    right: 'auto'
                })
                .slick({
                    slide: '.ups-news:not(.ups-expand) .ups-news_item:not(.ups-inactive)',
                    slidesToShow: 1,
                    speed: 600,
                    arrows: true,
                    nextArrow: ($('.ups-news:not(.ups-expand) .ups-news_nav button.slick-next').length>0?$('.ups-news:not(.ups-expand) .ups-news_nav button.slick-next').remove():'')+'<button type="button" class="slick-next ups-iconAlone"><span class="icon" aria-hidden="true"></span><span class="ups-readerTxt">'+ plugin.nextTxt +'</span></button>',
                    prevArrow: ($('.ups-news:not(.ups-expand) .ups-news_nav button.slick-prev').length>0?$('.ups-news:not(.ups-expand) .ups-news_nav button.slick-prev').remove():'')+'<button type="button" class="slick-prev ups-iconAlone"><span class="icon" aria-hidden="true"></span><span class="ups-readerTxt">'+ plugin.prevTxt +'</span></button>',
                    autoplaySpeed: 7000,
                    infinite: false,
                    appendArrows: $('.ups-news:not(.ups-expand) .ups-news_nav'),
                    rtl: UPS.configs.isRTL
                });

            plugin.current = 0;
            plugin.listWidth = 0;
            plugin.hasSlider = true;
        }

        return plugin;
    };

    Plugin.prototype._setPosition = function() {
        var plugin = this;
        var dir ='left';
        if(plugin.$items.length<3){
        	if($(plugin.$items[0]).parents('.col-lg-8').html()!==undefined  && $(plugin.$items[0]).parents('.col-lg-8').length>0){
        		dir = (UPS.configs.isRTL)? 'right' : 'left';
        	}else{
            dir = (UPS.configs.isRTL)? 'left': 'right';
        	}
        }else{
            dir = (!UPS.configs.isRTL)? 'left': 'right';
        }
        var pos = 0;

        var getPos = function() {
            var $item = plugin.$items.eq(plugin.current);

            var xPos = $item.position().left;
            var newsW = plugin.$T.outerWidth();

            if(UPS.configs.isRTL) {
                xPos = plugin.listWidth - $item.outerWidth() - xPos;
            }

            if(xPos + newsW >= plugin.listWidth) {
                xPos = plugin.listWidth - newsW;
                plugin.$next.addClass('ups-disabled').attr('disabled','disabled');
            }

            return -xPos;
        };

        pos = getPos();

        if(Modernizr.csstransitions) {
            plugin.$list.css(dir, pos);
        } else {
            var posProp = (!UPS.configs.isRTL)? {left: pos}: {right: pos};
            plugin.$list.animate(posProp, 600);
        }


        return plugin;
    };


    Plugin.prototype._setDisabled = function() {
        var plugin = this;

        var isStart = plugin.current === 0;
        var $item = plugin.$items.eq(plugin.current);
        var xPos = $item.position().left;
        var newsW = plugin.$T.outerWidth();
        // var isEnd = plugin.current === plugin.$items.length - 2;


        plugin.$prev.toggleClass('ups-disabled', isStart);
        if(plugin.$prev.hasClass('ups-disabled')){
        	plugin.$prev.attr('disabled','disabled');
        }else{
        	plugin.$prev.removeAttr('disabled');
        }
        

        if(UPS.configs.isRTL) {
            setTimeout(function() {
                var listRt = -parseInt( plugin.$list.css('right') );

                if(listRt + newsW >= plugin.listWidth) {
                    xPos = plugin.listWidth - newsW;
                    plugin.$next.addClass('ups-disabled').attr('disabled','disabled');
                } else {
                    plugin.$next.removeClass('ups-disabled').removeAttr('disabled');
                }
            }, 600);
        } else {

            if(xPos + newsW >= plugin.listWidth) {
                xPos = plugin.listWidth - newsW;
                plugin.$next.addClass('ups-disabled').attr('disabled','disabled');
            } else {
                plugin.$next.removeClass('ups-disabled').removeAttr('disabled');
            }
        }

        return plugin;
    };


    Plugin.prototype.goNext = function() {
        var plugin = this;

        if(!plugin.$next.hasClass('ups-disabled')) {
            plugin.current++;
            plugin._setPosition(true);
        }
        plugin._setDisabled();

        return plugin;
    };


    Plugin.prototype.goPrev = function() {
        var plugin = this;

        if(!plugin.$prev.hasClass('ups-disabled')) {
            plugin.current--;
            plugin._setPosition(false);
        }
        plugin._setDisabled();

        return plugin;
    };

    $.fn[ PLUGIN_NS ] = function( methodOrOptions ) {
        if (!$(this).length) {
            return $(this);
        }
        var instance = $(this).data(PLUGIN_NS);
        if ( instance && methodOrOptions!==undefined  && (methodOrOptions.hasOwnProperty('indexOf') && methodOrOptions.indexOf('_') !== 0) && instance[ methodOrOptions ] && typeof( instance[ methodOrOptions ] ) === 'function' ) {
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
