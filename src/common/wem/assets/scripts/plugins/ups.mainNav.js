
(function( $ ) {
    'use strict';

    var PLUGIN_NS = 'upsMainNav';

    var Plugin = function( target, options ) {
        var plugin = this;
        plugin.$T = $(target);

        plugin.options= $.extend(
            true,  // deep extend
            {},
            options
        );

        plugin.$searchDesk= plugin.$T.find("#ups-header_search");
        plugin.$searchMob= plugin.$T.find("#ups-header_search-mob");
        plugin.$menus = plugin.$T.find('.ups-menu');
        plugin.$currentMenu;
        plugin.$currentList;
        plugin.$listAndpanel = plugin.$T.find('.ups-menu_list, .ups-menu_toggle');
        plugin.$menu = plugin.$T.find('.ups-menu_list');
        plugin.$panel = plugin.$T.find('.ups-menu_toggle');

        plugin.duration = 200;

        plugin._init( target, options );
        return plugin;
    };

    Plugin.prototype._init = function() {
        var plugin = this;
        plugin._bindToggles();
        plugin._bindSearch();
        plugin._escapeFunction();
        plugin._eventDetect();
        plugin._focusFunction();
        return plugin;
    };
    
    /* 496726 |Accessibility - Header- Keyboard Access [B.7] Focus Out function When navigation Menu is tabbed out, focus out the menus will close | CODE START */
    Plugin.prototype._eventDetect = function(){
    	var plugin = this;
    	$('.ups-menu_list, .ups-menu_toggle').on('mousedown',function(e){
        	plugin.$mainNavEvent = e.type;
        });
    	$('.ups-menu_list, .ups-menu_toggle').on('keydown',function(e){
        	 plugin.$mainNavEvent = e.type;
        });
    }
   
    Plugin.prototype._focusFunction = function(){
    	var plugin = this;
    	 $('.ups-menu_list, .ups-menu_toggle').focusout(function(e){
    	 	var $elem = $(this);
    	 	if(!(plugin.$mainNavEvent === 'mousedown')){
            if(plugin.$currentMenu !== undefined && UPS.configs.viewport.size !== 'small' && UPS.configs.viewport.size !== 'medium'){
                    if($elem.parent().hasClass(UPS.configs.activeClass)) {
                        plugin.$clearMenuTimer = setTimeout(function(){
                        	var hasFocus = !! ($elem.parent().find(':focus').length > 0);
					        if (! hasFocus) {
					             plugin._closeMenu(plugin.$currentMenu,plugin.$currentList);
					        }
                        },100);
                    }
                }
    	 	}
    	 });
    };
    /* 496726 |Accessibility - Header- Keyboard Access [B.7] Focus Out function When navigation Menu is tabbed out, focus out the menus will close | CODE END */

    /* 496726 |Accessibility - Header- Keyboard Access [B.7] If Escape key is pressed  while Navigation Menu is in Open state it will close | CODE START */
    Plugin.prototype._escapeFunction = function(){
        var plugin = this;
        $(document).on('keydown',function(e) {
          if (e.keyCode === 27){ // esc
            if( plugin.$menus.hasClass(UPS.configs.activeClass) ) {
                plugin._closeMenu(plugin.$currentMenu,plugin.$currentList);
                clearTimeout(plugin.$clearMenuTimer);
            } 
          }   
      });
    };
    /* 496726 |Accessibility - Header- Keyboard Access [B.7] If Escape key is pressed  while Navigation Menu is in Open state it will close | CODE END */ 
    
    Plugin.prototype._bindToggles = function() {
        var plugin = this;

        for (var iMenu = 0; iMenu < plugin.$menus.length; iMenu++) {
            (function() {
                var $menu = $(plugin.$menus[iMenu]);
                var $toggle = $menu.find('.ups-menu_toggle');
                var $list = $menu.find('.ups-menu_list');

                $toggle.on('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();

                    //console.log('.ups-menu_toggle clicked', e);

                    if( $menu.hasClass(UPS.configs.activeClass) ) {
                        plugin._closeMenu($menu, $list);
                    } else {
                        /**
                         This peice of code is defined for SPA pages when Page URL for different locale is not generating.
                         **/
                        if($menu.hasClass('ups-language') && $menu.not('.ups-apps_called') && $menu.attr('data-apps')!==undefined && $menu.attr('data-apps')==='true'){
                            //console.log("called ==============================================================");
                            $menu.addClass('ups-apps_called');
                            $.each($list.find('ul').find('a.ups-analytics'),function(){
                                var lang= $(this).parent().attr('lang');
                                var host= window.location.hostname;
                                if(plugin.options.country==='US' && lang==='es'){
                                    if(host.indexOf('wwwapps')===0){
                                        host= host.replace('wwwapps',lang+'-'+plugin.options.country.toLowerCase()+'-apps');
                                    }else if(host.indexOf('www')===0){
                                        host= host.replace('www',lang+'-'+plugin.options.country.toLowerCase());
                                    }else{

                                    }
                                }
                                if(plugin.options.country==='US' && lang==='en'){
                                    if(host.indexOf('es-us-apps')===0){
                                        host= host.replace('es-us-apps','wwwapps');
                                    }else if(host.indexOf('es-us')===0){
                                        host= host.replace('es-us','www');
                                    }else{

                                    }
                                }
                                if (plugin.options.country === 'SI' && index === 1) {
                                    if (host.indexOf('wwwapps') === 0) {
                                        host = host.replace('wwwapps', plugin.options.country.toLowerCase() + '-apps');
                                    } else if (host.indexOf('www') === 0) {
                                        host = host.replace('www', plugin.options.country.toLowerCase());
                                    } else {

                                    }
                                }
                                if (plugin.options.country === 'SI' && index === 0) {
                                    if (host.indexOf('si-apps') === 0) {
                                        host = host.replace('si-apps', 'wwwapps');
                                    } else if (host.indexOf('si') === 0) {
                                        host = host.replace('si', 'www');
                                    } else {

                                    }
                                }
                                if (plugin.options.country === 'UA' && index === 0) {
                                    if (host.indexOf('ua-apps') === 0) {
                                        host = host.replace('ua-apps', 'wwwapps');
                                    } else if (host.indexOf('ru-apps') === 0) {
                                        host = host.replace('ru-apps', 'wwwapps');
                                    } else if (host.indexOf('ua') === 0) {
                                        host = host.replace('ua', 'www');
                                    } else if (host.indexOf('ru') === 0) {
                                        host = host.replace('ru', 'www');
                                    } else {

                                    }
                                }
                                if (plugin.options.country === 'UA' && index === 1) {
                                    if (host.indexOf('wwwapps') === 0) {
                                        host = host.replace('wwwapps', plugin.options.country.toLowerCase() + '-apps');
                                    } else if (host.indexOf('ru-apps') === 0) {
                                        host = host.replace('ru-apps', plugin.options.country.toLowerCase() + '-apps');
                                    } else if (host.indexOf('www') === 0) {
                                        host = host.replace('www', plugin.options.country.toLowerCase());
                                    } else if (host.indexOf('ru') === 0) {
                                        host = host.replace('ru', 'www');
                                    } else {

                                    }
                                }
                                if (plugin.options.country === 'UA' && index === 2) {                                    
                                    if (host.indexOf('wwwapps') === 0) {
                                        host = host.replace('wwwapps', 'ru-apps');
                                    } else if (host.indexOf('ua-apps') === 0) {
                                        host = host.replace('ua-apps', 'ru-apps');
                                    } else if (host.indexOf('www') === 0) {
                                        host = host.replace('www', 'ru');
                                    } else if (host.indexOf('ua') === 0) {
                                        host = host.replace('ua', 'ru');
                                    } else {

                                    }
                                }
                                $(this).attr('href',window.location.protocol+"//"+host+window.location.pathname+'?loc='+(lang+"_"+plugin.options.country)+window.location.hash);
                            });
                        }
                        plugin._openMenu($menu, $list);
                    }
                    plugin._setAnalytics($(this));
                });
            })();
        }

        /*$(window).on('windowResize', function() {
         for (var iMenu2 = 0; iMenu2 < plugin.$menus.length; iMenu2++) {
         (function() {
         var $menu2 = $(plugin.$menus[iMenu2]);
         plugin._closeMenu($menu2);
         })();
         }

         if(screen.width <= window.UPS.configs.views.medium){
         $('html').removeClass('no-touch');
         $('html').addClass('touch');
         }else{
         $('html').removeClass('touch');
         $('html').addClass('no-touch');
         }
         });*/

        return plugin;
    };

    Plugin.prototype._setAnalytics=function(_self){
        //var plugin=this;
        var component = {
            link_page_name: document.title
        };
        component.link_name = _self.clone().children().remove().end().text().trim();
        component.navigation_class = _self.parents("div").attr("class");
        if (_self.attr("href") !== undefined) {
            component.destination_url = _self.attr("href");
        }
        if (_self.attr("data-event-id") !== undefined) {
            component.event_id = _self.attr("data-event-id");
        }
        if (_self.attr("data-content-block-id") !== undefined && _self.attr("data-content-block-id") !== "") {
            component.content_block_id = _self.attr("data-content-block-id");
        }
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
            component.page_id = window.utag_data.page_id;
        }
        if(typeof window.utag!=='undefined' && window.utag !== undefined ){
            window.utag.track('link',component);
        }
    };

    Plugin.prototype._bindSearch = function() {
        var plugin =this;
        plugin.$searchMob.find("#ups-mainNav_search_mob").click(function(e){
            e.preventDefault();
            var _self=$(this);
            var parentForm = _self.parent("form");
            var inputElement=_self.siblings('#ups-search-mob').val();
            if(inputElement.trim()!=='' && (inputElement.toLowerCase()).trim()!=='search'){
                plugin._setAnalytics(_self);
                if((inputElement.toLowerCase()).trim().indexOf('1z')===0){
                    parentForm.attr('method','post');
                    if(UPS.configs.viewport.size==='small'){
                        parentForm.attr('action','/mobile/track?loc='+plugin.options.ext_locale+'#Track');
                        parentForm.find('.ups-trackSearch_header').attr('name','trackingNumber').val(inputElement.trim());
                        parentForm.find('input[name="track.x"]').attr('name','t').val('t');
                    }else{
                        parentForm.attr('action',parentForm.attr('data-track'));
                        parentForm.find('input[name=t]').attr('name','track.x').val('Track');
                        parentForm.find('.ups-trackSearch_header').attr('name','trackNums').val(inputElement.trim());
                    }
                    // parentForm.attr('action',parentForm.attr('data-track'));
                    // parentForm.find('.ups-trackSearch_header').val(inputElement.trim());
                    parentForm.submit();
                }else{
                    window.location.href=parentForm.attr("data-action")+"?q="+ encodeURIComponent(inputElement.trim())+'&index=1';
                }
            }
        });

        /*plugin.$searchDesk.find("#ups-mainNav-search").keypress(function(e){
         //e.preventDefault();
         var _self=$(this);
         if(e.which==13){
         if(_self.val().trim()!=='' && (_self.val().toLowerCase()).trim()!='search'){
         plugin.$searchDesk.find("#ups-mainNav_search_submit").trigger("click");
         }
         }
         });*/

        plugin.$searchDesk.find("#ups-mainNav_search_submit").click(function(e){
            e.preventDefault();
            var _self=$(this);
            var parentForm = _self.parent("form");
            var inputElement=_self.siblings('#ups-mainNav-search').val();
            if(inputElement.trim()!=='' && (inputElement.toLowerCase()).trim()!=='search'){
                plugin._setAnalytics(_self);
                if((inputElement.toLowerCase()).trim().indexOf('1z')===0){
                    parentForm.attr('method','post');
                    if(UPS.configs.viewport.size==='small'){
                        parentForm.attr('action',parentForm.attr('data-svp-track'));
                        parentForm.find('.ups-trackSearch_header').attr('name','trackingNumber').val(inputElement.trim());
                        parentForm.find('input[name="track.x"]').attr('name','t').val('t');
                    }else{
                        parentForm.attr('action',parentForm.attr('data-track'));
                        parentForm.find('input[name=t]').attr('name','track.x').val('Track');
                        parentForm.find('.ups-trackSearch_header').attr('name','trackNums').val(inputElement.trim());
                    }

                    // parentForm.attr('action',parentForm.attr('data-track'));
                    // parentForm.find('.ups-trackSearch_header').val(inputElement.trim());
                    parentForm.submit();
                }else{
                    window.location.href=parentForm.attr("data-action")+"?q="+ encodeURIComponent(inputElement.trim())+'&index=1';
                }
            }
        });

        // body...
    };
    Plugin.prototype._openMenu = function(menu, list) {
        var plugin = this;
        var $menu = menu;
        var $list = list;
        plugin.$currentMenu = menu;
        plugin.$currentList = list;
        //console.log('openMenu');

        for (var iOth = 0; iOth < plugin.$menus.length; iOth++) {
            (function() {
                var $other = $(plugin.$menus[iOth]);

                if(!$other.is($menu)) {
                    plugin._closeMenu($other, false);
                }
            })();
        }
        UPS.configs.$body.addClass('ups-navOpen');
        $menu.addClass(UPS.configs.activeClass);
        $menu.find('.ups-menu_toggle').attr('aria-expanded',true);
        //$menu.find('.ups-menu_toggle').find('.ups-readerTxt').text($menu.find('.ups-menu_toggle').find('.ups-readerTxt').attr('data-lang-hide'));
        UPS.configs.$body.addClass('ups-offCanvas-subnav');
        $menu.parents('#ups-navItems').find('.ups-menuBack-button').focus();
        if( !UPS.configs.$body.hasClass('ups-offCanvas') ) {
            $list.slideDown(plugin.duration).attr('aria-hidden',false);
            $('#ups-headerTools').upsNavTools('closeTools');
        } else {
            $list.slideDown(plugin.duration).attr('aria-hidden',false);
            $list.show();
        }

        UPS.configs.$body.on('click.menu', function() {
            plugin._closeMenu($menu, $list);
        });

        return plugin;
    };

    Plugin.prototype._closeMenu = function(menu, list) {
        var plugin = this;
        var $menu = menu;
        var $list = list || $menu.find('.ups-menu_list');
        //console.log('closeMenu');

        UPS.configs.$body.removeClass('ups-navOpen');

        // $menu.removeClass(UPS.configs.activeClass);
        UPS.configs.$body.removeClass('ups-offCanvas-subnav');
        $menu.parents('#ups-navItems').find('.ups-mobmenu-close').focus();
        var menu_toggle=$menu.find('.ups-menu_toggle');
        if( !UPS.configs.$body.hasClass('ups-offCanvas') ) {
            $list.slideUp(plugin.duration, function() {
                $menu.removeClass(UPS.configs.activeClass);
                menu_toggle.attr('aria-expanded',false);
                menu_toggle.find('.ups-readerTxt').text(menu_toggle.find('.ups-readerTxt').attr('data-lang-show'));
            }).attr('aria-hidden',true) ;
        } else {
            setTimeout(function() {
                $list.attr('aria-hidden',true).hide();
                $menu.removeClass(UPS.configs.activeClass);
                menu_toggle.attr('aria-expanded',false);
                menu_toggle.find('.ups-readerTxt').text(menu_toggle.find('.ups-readerTxt').attr('data-lang-show'));
            }, 500);
        }

        UPS.configs.$body.off('click.menu');

        return plugin;
    };

    Plugin.prototype.closeAll = function() {
        var plugin = this;

        var $lists = plugin.$menus.find('.ups-menu_list');

        UPS.configs.$body.removeClass('ups-navOpen');
        var toggle_menu=plugin.$menus.find('.ups-menu_toggle');
        toggle_menu.attr('aria-expanded',false);
        //toggle_menu.find('.ups-readerTxt').text(toggle_menu.find('.ups-readerTxt').attr('data-lang-show'));
        // $menu.removeClass(UPS.configs.activeClass);
        UPS.configs.$body.removeClass('ups-offCanvas-subnav');
        if( !UPS.configs.$body.hasClass('ups-offCanvas') ) {
            $lists.slideUp(plugin.duration, function() {
                plugin.$menus.removeClass(UPS.configs.activeClass);
            }).attr('aria-hidden',true);
        }

        UPS.configs.$body.off('click.menu');

        return plugin;
    };

    $.fn[ PLUGIN_NS ] = function( methodOrOptions ) {
        if (!$(this).length) {
            return $(this);
        }
        var instance = $(this).data(PLUGIN_NS);
        if ( instance && methodOrOptions!==undefined && (typeof methodOrOptions ==='string' || (typeof methodOrOptions ==='object' && methodOrOptions.hasOwnProperty('indexOf') && methodOrOptions.indexOf('_') !== 0)) && instance[ methodOrOptions ] && typeof( instance[ methodOrOptions ] ) === 'function' ) {
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
