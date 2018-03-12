(function() {
    'use strict';

    //====================================================
    //    Indexof does not work with IE previous versions
    //====================================================
    if (!Array.prototype.indexOf){
        Array.prototype.indexOf = function(elt /*, from*/){
            /*jshint bitwise: false*/
            var len = this.length >>> 0;
            /*jshint bitwise: true*/

            var from = Number(arguments[1]) || 0;
            from = (from < 0)? Math.ceil(from) : Math.floor(from);
            if (from < 0)
                from += len;

            for (; from < len; from++){
                if (from in this && this[from] === elt)
                    return from;
            }
            return -1;
        };
    }

    //==================================================
    // "UPS" NAMESPACE
    //--------------------------------------------------
    window.UPS = (typeof UPS !== 'undefined' && UPS instanceof Object) ? UPS : {

        //--------------------------------------------------
        // CONFIGS
        //--------------------------------------------------
        configs: {
            activeClass: 'ups-active',
            inActiveClass: 'ups-inactive',
            views: {
                'small': 767,
                'medMid': 840,
                'medium': 992,
                'large': 1440
            },
            isMobile: {
                Android: (function() {
                    return navigator.userAgent.match(/Android/i);
                })(),
                BlackBerry: (function() {
                    return navigator.userAgent.match(/BlackBerry/i);
                })(),
                iOS: (function() {
                    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                })(),
                Opera: (function() {
                    return navigator.userAgent.match(/Opera Mini/i);
                })(),
                Windows: (function() {
                    return navigator.userAgent.match(/IEMobile/i);
                })()
            },
            position: false,
            mainTransitionSpeed: 150,
            isRTL: $('html').hasClass('ups-rtl'),
            $body: $('body'),
            $window: $(window),
            pageURL : document.location.href
        },

        queryStrings: (function() {
            var vars = {},
                hash;
            var q = document.URL.split('?')[1];
            if (q !== undefined) {
                q = q.split('&');
                for (var i = 0; i < q.length; i++) {
                    hash = q[i].split('=');
                    vars[hash[0]] = hash[1];
                }
            }
            return vars;
        })(),

        //--------------------------------------------------
        // UTILITY METHODS
        //--------------------------------------------------
        utils: {
            getIEVersion: function() {
                var agent = navigator.userAgent;
                var reg = /MSIE\s?(\d+)(?:\.(\d+))?/i;
                var matches = agent.match(reg);
                if (matches !== null) {
                    return {
                        major: matches[1],
                        minor: matches[2]
                    };
                }
                return {
                    major: '-1',
                    minor: '-1'
                };
            },

            getPlaceholderSupport: function() {
                var test = document.createElement('input');
                return ('placeholder' in test);
            },

            getViewport: function() {
                var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

                var size;
                if ($('html').hasClass('lt-ie9')) {
                    size = 'large';
                } else {
                    size = 'small';
                    size = (w > UPS.configs.views.small) ? 'mediumMid' : size;
                    size = (w > UPS.configs.views.medMid) ? 'medium' : size;
                    size = (w > UPS.configs.views.medium) ? 'large' : size;
                    size = (w > UPS.configs.views.large) ? 'xlarge' : size;
                }

                UPS.configs.viewport = {
                    size: size,
                    width: w,
                    height: h
                };

                return UPS.configs.viewport;
            },

            getTransitionEvent: function(){
                var t, el = document.createElement('fakeelement');

                var transitions = {
                    'transition':'transitionend',
                    'OTransition':'oTransitionEnd',
                    'MozTransition':'transitionend',
                    'WebkitTransition':'webkitTransitionEnd'
                };

                for(t in transitions){
                    if( el.style[t] !== undefined ){
                        return transitions[t];
                    }
                }
            }
        }
    };
    //--------------------------------------------------
    // end "UPS" NAMESPACE
    //==================================================

    UPS.utils.currentIEVersion=UPS.utils.getIEVersion().major;

    //==================================================
    // DOCUMENT READY...
    //--------------------------------------------------

    $(function () {
        if(typeof window.utag_data !== 'undefined' && window.utag_data!==undefined){
            window.utag_data.page_description= $('meta[name="description"]').attr('content');
            if($('.ups-breadcrumb').length>0){
                //window.utag_data.content_group_name= $('.ups-breadcrumb > ol > li:first-child').text();
                //window.utag_data.content_sub_group_name= $('.ups-breadcrumb > ol > li:nth-child(2)').text();
                var textUtag='';
                $.each($('.ups-breadcrumb > ol li'),function(){
                    textUtag += $(this).text()+' ';
                });
                window.utag_data.brdcrmb= textUtag;
            }
            //console.log("Populating tags from JS ",window.utag_data);
        }

        UPS.utils.getViewport();

        //--------------------------------------------------
        // Add IE10 Class
        //--------------------------------------------------
        if (UPS.utils.currentIEVersion === '10') {
            $('html').addClass('ie10');
        }

        // For Location Finder...  IE will not work in less then 11
        if(UPS.utils.currentIEVersion<'11'){
            $('html').addClass('iedepVer');
        }
        //--------------------------------------------------
        
        function detectIE() {
        	try{
	            var ua = window.navigator.userAgent;
	
	            var msie = ua.indexOf('MSIE ');
	            if (msie > 0) {
	                // IE 10 or older => return version number
	                return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
	            }
	
	            var trident = ua.indexOf('Trident/');
	            if (trident > 0) {
	                // IE 11 => return version number
	                var rv = ua.indexOf('rv:');
	                return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
	            }
	
	            var edge = ua.indexOf('Edge/');
	            if (edge > 0) {
	               // Edge (IE 12+) => return version number
	               return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
	            }
	
	            // other browser
	            return false;
	        }
        	catch(e){
        		console.log("IE Version Error");
        	}
        }
        
        var ieV = detectIE();
        if(ieV === 11){
        	$('html').addClass('ie11');
        }else  if(ieV >= 12){
        	$('html').addClass('ieHigh');
        }
        

        //PLACEHOLDER SUPPORT
        var addPlaceholderSupport = function(input, placeholder) {
            input.value = placeholder;
            $(input).addClass('ups-placeholder');
            input.addEventListener('focus', clearInput);
            input.addEventListener('focusout', reAddPlaceholder);
        };

        var clearInput = function(event) {
            var input = event.target;
            $(input).removeClass('ups-placeholder');
            if (input.value === input.getAttribute('placeholder')) {
                input.value = '';
            }
        };

        var reAddPlaceholder = function(event) {
            var input = event.target;
            $(input).addClass('ups-placeholder');
            if (input.value === '') {
                input.value = input.getAttribute('placeholder');
            }
        };



        //-----------
        // Add place holders in IE9
        //-----------
        UPS.utils.placeholders = function() {
            if(!UPS.utils.getPlaceholderSupport()) {
                var inputs = document.getElementsByTagName('input');

                for (var i=0; i<inputs.length; i++) {
                    var placeholder = inputs[i].getAttribute('placeholder');
                    if(placeholder !== null) {
                        addPlaceholderSupport(inputs[i], placeholder);
                    }
                }
            }
        };

        UPS.utils.placeholders();



        //--------------------------------------------------
        // RESIZE EVENT (IE9+)
        // Fires "windowResize" on $(window)
        //--------------------------------------------------
        var resizeTimer;
        if (UPS.utils.currentIEVersion < 0 || UPS.utils.currentIEVersion >= 9) {
            $(window).resize(function () {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(function() {
                    var oldW = UPS.configs.viewport.width;
                    var oldH = UPS.configs.viewport.height;
                    UPS.utils.getViewport();
                    if (oldW !== UPS.configs.viewport.width) {
                        $(window).trigger('windowResize');
                    }
                    if (oldH !== UPS.configs.viewport.height) {
                        $(window).trigger('windowResizeH');
                    }
                }, 60);
            });
        }
        //--------------------------------------------------



        //--------------------------------------------------
        // CHECK FOR REPEATING MODULES WITH GRAY BACKGROUND
        //--------------------------------------------------
        var graySelectors = [
            '.bg-gray',
            '.contentBlock_secondary_gray'
        ];
        $(graySelectors).each(function(){
            var $nextComponent = $(this).closest('.iw_component').next().find(graySelectors.join(","));
            if($nextComponent.length){
                $nextComponent.addClass('ups-collapse_top');
            }
        });
        //--------------------------------------------------



        //--------------------------------------------------
        // CENTER IMAGES
        //--------------------------------------------------
        var centerSelects = [
            '.ups-imgFrame'
        ].join(',');

        UPS.utils.centerImgs = function($context, selectors) {
            var selects = selectors || centerSelects;
            var $imgFrames = $context.find(selects);

            var cleanSrc = function(src) {
                var newSrc = encodeURI(src)
                    .replace(/\(/g, '%28')  // "("
                    .replace(/\)/g, '%29')  // ")"
                    .replace(/\~/g, '%7E')  // "~"
                    .replace(/\*/g, '%2A')  // "*"
                    .replace(/\'/g, '%27'); // "'"

                return newSrc;
            };

            //for (var iFrm = 0; iFrm < $imgFrames.length; iFrm++) {
            $.each($($imgFrames),function(i){

                var $frame = $(this);
                var $img = $frame.find('img');
                var wi = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                if ($('html').hasClass('backgroundsize')) {
                    var src;
                    var size = UPS.configs.viewport.size;
                    //console.log($($frame),size);
                    if( $frame.parents('.col-lg-4') !== undefined && $frame.parents('.col-lg-4').length > 0){
                        size='small';
                    }
                    if(wi === 768){
                        size = 'mediumMid';
                    }
                    switch (size) {
                        case 'small':
                            src = $frame.data('sm');
                            break;
                        case 'mediumMid':
                            src = $frame.data('md');
                            break;
                        case 'medium':
                            src = $frame.data('md');
                            break;
                        default:
                            src = $frame.data('lg');
                    }
                    $frame.css({
                        'background-image': 'url(' + cleanSrc(src) + ')',
                        'background-repeat': 'no-repeat',
                        'background-size': 'cover'
                    });
                    if($img!==undefined){
                        $img.hide();
                    }

                } else {
                    setTimeout(function() {
                        var frmH = $frame.height();
                        var frmW = $frame.width();
                        var imgH = $img.height();
                        var imgW = $img.width();
                        var frmRatio = frmH / frmW;
                        var ratio = imgH / imgW;

                        if (frmRatio < ratio) {
                            $img.css({
                                'width': frmW,
                                'height': frmW * ratio,
                                'margin-top': -((frmW * ratio) - frmH) / 2
                            }, 60);
                        } else {
                            var newRatio = imgW / imgH;
                            $img.attr('newRatio', newRatio);
                            $img.css({
                                'height': frmH,
                                'width': frmH * newRatio,
                                'margin-left': -((frmH * newRatio) - frmW) / 2
                            }, 60);
                        }
                    }, 500);
                }

            });

            //   }
        };

        UPS.utils.centerImgs(UPS.configs.$body);

        $(window).on('windowResize', function() {
            UPS.utils.centerImgs(UPS.configs.$body);
        });
        //--------------------------------------------------



        //--------------------------------------------------
        // Skip to Content
        //--------------------------------------------------
        $('#ups-skipNav').on('click', function(e) {
            var $main;
            if($('.ups-page-title h1').length){
                $main = $('.ups-page-title h1');
            } else{
                $main = $('.container-fluid.iw_section:nth-child(2), #ups-main');
            }
            e.preventDefault();
            /* $('html, body').animate({
             scrollTop: $main.offset().top
             }, 300);*/
            $main.attr('tabindex', '-1').focus();
        });
        //--------------------------------------------------


        //--------------------------------------------------
        // Main Navigation
        //--------------------------------------------------

        var $hWrap = $('#ups-headerWrap');
        var $head = $('#ups-header');
        var $logo = $('#ups-header_logo');

        $head.upsMainNav({
            ext_locale:window.wems_ext_locale,
            country: window.wems_country
        });

        // Header Tools ('Quick Start')
        $('#ups-headerTools').upsNavTools({
            country:window.wems_country,
            locale:window.wems_ext_locale,
            isTeam:window.wems_ts,
            header:$head
        });



        // CLOSE MENU WHEN LINK IN MENU IS CLICKED
        var $links = $('#ups-navItems').find('a').not('.ups-menu_toggle');
        $links.on('click', function(){
            UPS.configs.$body.removeClass('ups-offCanvas').removeClass('ups-offCanvas-subnav');
            UPS.configs.$body.one(UPS.utils.getTransitionEvent(),
                function() {
                    UPS.configs.$window.trigger('menu-toggled', UPS.configs.$body.hasClass('ups-offCanvas'));
                });
        });



        // TEMP OFF CANVAS TOGGLE
        $('#ups-touchNav .ups-menuToggle, #ups-navItems .ups-menuClose').on('click', function() {

            UPS.configs.$body.toggleClass('ups-offCanvas')
                .removeClass('ups-offCanvas-subnav');

            // trigger event for plugins to detect toggle state
            if(UPS.configs.$body.hasClass('ups-offCanvas')){
                UPS.configs.$window.trigger('menu-toggled', UPS.configs.$body.hasClass('ups-offCanvas'));
                $('#ups-navItems').find('.ups-mobmenu-close').focus();
            }
            else {
                // when closed, wait until css transition is complete to dispatch toggle event
                UPS.configs.$body.one(UPS.utils.getTransitionEvent(),
                    function() {
                        UPS.configs.$window.trigger('menu-toggled', UPS.configs.$body.hasClass('ups-offCanvas'));
                    });
            }
        });


        var wrapH, logoH, logoM, newH;
        // var scrollPos = 0;
        var lastScroll = 0;

        // RESIZE LOGO

        var scrollLogo = function() {
            var $scrollTop = $(this).scrollTop();

            var dir = ($scrollTop > lastScroll) ? 'up' : 'down';

            if ((UPS.configs.viewport.size === 'large' || UPS.configs.viewport.size === 'xlarge') && !UPS.configs.$body.hasClass('ups-headFixed')) {

                if (!wrapH) { wrapH = $hWrap.innerHeight() + $('#ups-alertsWrap').outerHeight() - parseInt($hWrap.css('padding-top')); }
                if (!logoH) { logoH = $logo.outerHeight(); }
                if (!logoM) { logoM = wrapH - logoH; }

                newH = wrapH - $scrollTop - logoM;

                if ($scrollTop > lastScroll) {
                    // //console.log(  'DOWN'  );
                    $logo.css('padding-top', newH);
                } //else {
                //     //console.log(  'UP'  );
                //     $logo.css('padding-top', '+='+ scrollPos/4 );
                // }
            } else {
                $logo.attr('style', '');
            }

            lastScroll = $scrollTop;
        };

        scrollLogo();

        $(window).on('scroll', function() {
            scrollLogo();
        });


        // Fixed Nav
        var utilNav = ($hWrap.hasClass('ups-header_light'))? 0: 32;
        var alertsH, scrollH;
        var setFixed = function() {
            if (UPS.configs.$body.hasClass("modal-open")) {
                UPS.configs.$body.addClass("ups-headFixed");
            }
            else if (!UPS.configs.$body.hasClass('ups-touchDemo')) {
                alertsH = $('#ups-alertsWrap').outerHeight();
                scrollH = (alertsH) ? alertsH + utilNav : utilNav;
                UPS.configs.$body.toggleClass('ups-headFixed', $(window).scrollTop() >= scrollH);
            }
            // Will check if it is a Light Header and add a new class to Container-fluid(2)
            //to adjust spacing when header is fixed
            if($('.ups-headFixed .ups-header_light').length){
                $('.container-fluid.iw_section:nth-child(2)').addClass('light-header');
            }
        };

        var $sBtn = $('#ups-header_search button');
        var $sInput = $('#ups-header_search input');

        $sBtn.on({
            'focus': function() {
                $sInput.addClass(UPS.configs.activeClass);
            },
            'blur': function() {
                $sInput.removeClass(UPS.configs.activeClass);
            }
        });

        setFixed();

        $(window).scroll(setFixed);

        //--------------------------------------------------


        //--------------------------------------------------
        // ALERTS
        //--------------------------------------------------
        if($('#ups-alertsWrap').length){
        	$('#ups-alerts').upsAlertsBar({
            	alertUrl: window.alertsUrl || {}
            });
        }
        

        //--------------------------------------------------

        //--------------------------------------------------


        //--------------------------------------------------
        // Subsection (Right Rail)
        //--------------------------------------------------
//        var $subsection = $('.ups-subsection');
//
//        for (var iSubsection = 0; iSubsection < $subsection.length; iSubsection++) {
//            (function() {
//                var $s = $($subsection[iSubsection]);
//                $s.upsSubsection({})
//            })();
//        };

        //--------------------------------------------------


        //--------------------------------------------------
        // Accordion List
        //--------------------------------------------------
        var $accordion = $('.ups-accordion_wrapper');

        for (var iAccordion = 0; iAccordion < $accordion.length; iAccordion++) {
            (function() {
                var $a = $($accordion[iAccordion]);
                $a.upsAccordion({});
            })();
        }

        //--------------------------------------------------


        //--------------------------------------------------
        // M15 List
        //--------------------------------------------------
        var $list = $('.ups-list');

        for (var iList = 0; iList < $list.length; iList++) {
            (function() {
                var $l = $($list[iList]);
                if ($l.find('.list_multi').length !== 0) {
                    $l.upsList({});
                }
            })();
        }

        //--------------------------------------------------


        //--------------------------------------------------
        // Footer - Mobile Accordion
        //--------------------------------------------------
        var $footer = $('#ups-footer');
        var $footToggle = $footer.find('.ups-footer_toggle');
        var $footAccords = $footer.find('.ups-footer_expand');
        var $footAccordButton = $footer.find('.ups-footer_toggle button.ups-med_show');

        for (var iFtoggle = 0; iFtoggle < $footToggle.length; iFtoggle++) {
            (function() {
                var $fTog = $($footToggle[iFtoggle]);
                var $fExp = $fTog.siblings('.ups-footer_expand');
                var $fTogB = $fTog.find('button.ups-med_show');

                $fTog.on('click', function() {

                    // reset aria attrs
                	$footAccordButton.attr({
                        'aria-expanded': false
                        //'aria-selected': false
                    });
                    //$footAccordButton.attr('aria-hidden', true);
                    
                    /*$footToggle.find('.ups-readerTxt').each(function(){
                        var toggleText = $(this);
                        toggleText.text(toggleText.attr('data-lang-show'));
                    });*/


                    if (!$fTog.hasClass(UPS.configs.activeClass)) {
                        $footToggle.removeClass(UPS.configs.activeClass);
                        $fTogB.attr('aria-expanded','true');
                    }
                    $footAccords.removeClass(UPS.configs.activeClass);

                    $fTog.toggleClass(UPS.configs.activeClass);

                   /* if($fTog.hasClass(UPS.configs.activeClass)){
                        $fTog.find('.ups-readerTxt').text($fTog.find('.ups-readerTxt').attr('data-lang-hide'));
                    }*/

                    $fExp.toggleClass(UPS.configs.activeClass,
                        $fTog.hasClass(UPS.configs.activeClass)
                    );

                    if($fExp.hasClass(UPS.configs.activeClass)){
                        $fExp.attr('aria-hidden', false);
                    }else {
                    	$fExp.attr('aria-hidden', true);
                    }
                });
            })();
        }

        // adds aria attributes for mobile footer, removes them for desktop
        $(window).on('windowResize', function(){
            if(UPS.utils.getViewport().width > UPS.configs.views.medium){
                $footToggle.removeClass(UPS.configs.activeClass);
                $footAccords.removeClass(UPS.configs.activeClass);
                $footer.removeAttr('aria-multiselectable');
                //$footToggle.removeAttr('aria-controls');
                //$footToggle.removeAttr('role');
                $footAccordButton.removeAttr('aria-expanded');
                $footAccords.removeAttr('aria-hidden');
            }
            else {
                $footer.attr({
                    //'role': 'tablist',
                    'aria-multiselectable': true
                });
                /*$footToggle.attr({
                    'role': 'tab',
                    'aria-expanded': false
                    'aria-selected': false
                });*/
                $footAccords.attr({
                    //'role': 'tabpanel',
                    'aria-hidden': true
                });
            }
        });



        //--------------------------------------------------

        //--------------------------------------------------
        // UPS - Page Share
        //--------------------------------------------------

        var $share = $('.ups-page-share');

        for (var iShare = 0; iShare < $share.length; iShare++) {
            (function() {
                var $s = $($share[iShare]);
                $s.upsPageShare({});
            })();
        }

        //--------------------------------------------------

        //--------------------------------------------------
        // Subscribe to Email / Templates
        //--------------------------------------------------

        var $subscribeEmail = $('.ups-subscribe-email');

        for (var iEmail = 0; iEmail < $subscribeEmail.length; iEmail++) {
            (function() {
                var $sE = $($subscribeEmail[iEmail]);
                $sE.upsSubscribeEmail({});
            })();
        }

        //--------------------------------------------------


        //--------------------------------------------------
        // Hero Carousel
        //--------------------------------------------------
        /** TFS-496832 & UPS-6723 **/
        UPS.configs.$window.on('load',function(){
            if($('div').hasClass('ups-carousel_list')){
            	$('.ups-carousel_list').each(function(index,element){
            		var carouselIndex = index;
            		
	            	if($('.ups-carousel_list').attr('role') === 'toolbar'){
	            		$('.ups-carousel_list').removeAttr('role');
	            	}
	            	
	            	$(this).find('.ups-carousel-navbuttons ul li').each(function(index,element){
                		var dotsID = element.id;
                		$("div[aria-describedby='"+dotsID+"'] h2").attr('id','carouselHeading'+carouselIndex+index);
                	});
	            });
            }else if($('div').hasClass('ups-glossary_carousel')){
            	$('.ups-glossary_carousel').each(function(index,element){
            		var carouselIndex = index;
            		
            		$(this).find('.ups-carousel-navbuttons ul li').each(function(index,element){
                		var dotsID = element.id;
                		$("div[aria-describedby='"+dotsID+"'] h2").attr('id','glossarycarouselHeading'+carouselIndex+index);
                	});
            	});
            }else if($('div').hasClass('ups-video-downloads')){
            	$('.ups-video-downloads').each(function(index,element){
            		var carouselIndex = index;
            		
            		$(this).find('.ups-carousel-navbuttons ul li').each(function(index,element){
                		var dotsID = element.id;
                		$("div[aria-describedby='"+dotsID+"'] h3").attr('id','videocarouselHeading'+carouselIndex+index);
                	});
            	});
            }
            
            $('.ups-carousel-navbuttons').each(function(){
        		if($(this).attr('role') === 'toolbar'){
            		$(this).removeAttr('role');
            	}
        	});
            
            $('.ups-carousel, .ups-glossary_carousel, .ups-carousel_sm, .ups-video-downloads ').each(function(index,element){
        		$(this).on('focusin mouseover',function(e){
        			if(e.originalEvent !== undefined){
        				$(this).find('.ups-skipNav_carousel').addClass('ups-autoplay_show');
        			}
                });
        		
        		setTimeout(function(){
            		$(this).on('focusout mouseout',function(){
                    	$('.ups-skipNav_carousel').removeClass('ups-autoplay_show');
                    });
        		},1000);
        		
        	});
            
            
            (function(){
            	$('.slick-dots li').each(function(index,element){
            		var headingID;
            		var dotsID = element.id;
            		var $self = $("div[aria-describedby='"+dotsID+"']");
            		if($self.has('h2').length > 0){
            			headingID = $("div[aria-describedby='"+dotsID+"'] h2").attr('id');
            		}else{
            			headingID = $("div[aria-describedby='"+dotsID+"'] h3").attr('id');
            		}
            		$(element).children("button").attr('aria-describedby',headingID);
            	});
            })();
        });
        /** TFS-496832 & UPS-6723 **/
        
        var heroSliders = [
            '.ups-carousel-homeHero .ups-carousel_list:not(.col-lg-4 .ups-carousel-homeHero .ups-carousel_list)',
            '.ups-carousel-landing .ups-carousel_list:not(.col-lg-4 .ups-carousel-landing .ups-carousel_list)',
            '.ups-carousel-article .ups-carousel_list'
        ];

        var $sliders = $(heroSliders.join(','));
        var $focused;
        

        for (var ups_slider = 0; ups_slider < $sliders.length; ups_slider++) {
            (function() {
                var $slider = $($sliders[ups_slider]);
                // var slide_count = $slider.find('.ups-carousel-item').length - 1;
                var cycle = false;

                var sData = $slider.data();
                var prevTxt = sData.prevtxt;
                var nextTxt = sData.nexttxt;

                $slider.on('init', function(slick) {
                    var $btns = $slider.find('.slick-prev,.slick-next,.slick-dots button');

                    $btns.on('click', function(e) {
                        setTimeout(function() {
                            $slider.find('.ups-carousel_item.slick-active').focus();
                            var analytics_comp=$slider.find('.ups-carousel_item.slick-active').find('.ups-analytics_change');
                            var compCrslComp={};
                            compCrslComp.content_block_id='M4';
                            compCrslComp.event_id=50;
                            compCrslComp.content_id=$slider.find('.ups-carousel_item.slick-current').attr('data-content-id');
                            /*if(analytics_comp.attr('data-link-name')!=undefined){
                             compCrslComp.link_name=analytics_comp.attr('data-link-name');
                             }*/
                            if(typeof window.utag_data!=='undefined' && window.utag_data!==undefined){
                                compCrslComp.user_type=window.utag_data.user_type;
                                compCrslComp.site_indicator=window.utag_data.site_indicator;
                                compCrslComp.page_country_code=window.utag_data.page_country_code;
                                compCrslComp.state=window.utag_data.state;
                                compCrslComp.city=window.utag_data.city;
                                compCrslComp.myups_login_state=window.utag_data.myups_login_state;
                                compCrslComp.page_language=window.utag_data.page_language;
                            }

                            compCrslComp.navigation_class=analytics_comp.parent('div').attr('class');
                            compCrslComp.link_page_name=document.title;
                            //console.log('compCrslComp',compCrslComp);
                            if(typeof utag!=='undefined' && utag!==undefined){
                                utag.track('view', compCrslComp);

                            }

                        }, 610);
                    });

                    var setTop = function() {
                        var pFrame = $slider.find('.ups-paraFrame').eq(0);
                        var topPos  = (UPS.configs.viewport.size === 'small')? pFrame.outerHeight(): 'auto';
                        var $nav = $slider.find('.slick-prev,.slick-next,.slick-dots');
                        $nav.css({ top: topPos });
                    };

                    $(window).on('windowResize', setTop);
                    setTimeout(setTop, 1);
                    $slider.find('.slick-prev').after($slider.find('.slick-dots'));
                    
                    var setFocusOrder = function(){
                    	if(UPS.utils.getViewport().width <= UPS.configs.views.small){
                    		if($slider.attr("data-focusorder")==="" || $slider.attr("data-focusorder")===undefined){
                    			$slider.find(".slick-next").after($slider.find('.slick-list'));
                    			$slider.attr("data-focusorder","small");
                    		}
 	                	   
 	                   }else{
 	                	  if($slider.attr("data-focusorder")==="small"){
 	                		  $slider.find(".slick-prev").before($slider.find('.slick-list'));
 	                		  $slider.attr("data-focusorder","");
 	                	  }
 	                   }
                    }
                    setFocusOrder();	
	                $(window).on('windowResize', setFocusOrder);
                });
                
                if($slider.children().length > 0){
	                var slickOpts = {
	                    slide: '.ups-carousel_item',
	                    slidesToShow: 1,
	                    speed: 600,
	                    autoplay: true,
	                    autoplaySpeed: 11000,
	                    infinite: true,
	                    dots: true,
	                    rtl: UPS.configs.isRTL,
	                    nextArrow:'<button type="button" class="slick-next ups-iconAlone"><span class="icon" aria-hidden="true"></span><span class="ups-readerTxt">' + nextTxt + '</span></button>',
	                    prevArrow:'<button type="button" class="slick-prev ups-iconAlone"><span class="icon" aria-hidden="true"></span><span class="ups-readerTxt">' + prevTxt + '</span></button>',
	                    appendArrows: $slider.find('.ups-carousel-navbuttons'),
	                    appendDots: $slider.find('.ups-carousel-navbuttons')
	                };


	                if(sData.thumbs) {
	                    slickOpts.arrows = false;
	                    slickOpts.customPaging = function(slider, i) {
	                        var $slide = $(slider.$slides[i]);
	                        var img = '<img src="'+ $slide.data('thumbnail') +'" alt="">';
	                        var buttonTxt = '<span>' + $slide.find('h1').text() +'</span>';
	                        return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">'+ img + buttonTxt +'</button>';
	                    };
	                    slickOpts.responsive = [{
	                          breakpoint: UPS.configs.views.small + 1,
	                          settings: {
	                                arrows: true,
	                                customPaging: function(slider, i) {
	                                    return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + '</button>';
	                                }
	                            }
	                        }];
	                }

	                $slider.slick(slickOpts).on({
	                    'beforeChange': function(){
	                    	$focused = $(document.activeElement);
	                    },
	                	'reInit': function () {
	                        //console.log('CAROUSEL');
	                    },
	                    'afterChange': function () {
	                        if (!cycle && $slider.slick('slickCurrentSlide') === 0) {
	                            $slider.slick('slickSetOption', 'autoplay', false, false);
	                            cycle = true;
	                        }
	                        
	                        setTimeout(function(){
	                        	if($(this).parent().find(':focus').length > 0){
	                        		$focused.focus();
	                        	}
	                        	
                        		if($slider.find('.ups-carousel-navbuttons').attr('role') === 'toolbar'){
                        			$slider.find('.ups-carousel-navbuttons').removeAttr('role');
            	            	}
	                        },500);
	                        
	                    }
	                });

                    // listen for menu to toggle. pause carousel when opened and play when closed
	                UPS.configs.$window.on('menu-toggled', function(e, menuOpened){
	                    if(!menuOpened) {
	                        $slider.slick('slickPlay');
	                    }
	                    else{
	                        $slider.slick('slickPause');
	                    }
	                });
	            }

            	$slider.parent().find('.ups-skipNav_carousel').click(function(e){
                	e.preventDefault();
                	var isAutoPlay = $slider.slick('slickGetOption','autoplay');
                	if(isAutoPlay === true){
            			$slider.slick('slickPause');
            			$slider.slick('slickSetOption','autoplay',false);
            		}else{
            			$slider.slick('slickPlay');
            			$slider.slick('slickSetOption','autoplay',true);
            		}
               }); 
            	
            	$slider.parent().on('keydown',function(e){
        			if(e.keyCode === 27){
        				$(this).find('.ups-skipNav_carousel').click();
        			}
        		});

            })();
        }

        //--------------------------------------------------


        //--------------------------------------------------
        // Sidebar Carousel
        //--------------------------------------------------
        var sidebarSliders = [
            '.col-lg-4 .ups-carousel-landing .ups-carousel_list',
            '.col-lg-4 .ups-carousel-homeHero .ups-carousel_list'
        ];

        var $slidersLG4 = $(sidebarSliders.join(','));

        for (var iSlider = 0; iSlider < $slidersLG4.length; iSlider++) {
            (function() {
                var $slider = $($slidersLG4[iSlider]);
                // var slide_count = $slider.find('.ups-carousel-item').length - 1;
                var cycle = false;

                var sData = $slider.data();
                var prevTxt = sData.prevtxt;
                var nextTxt = sData.nexttxt;

                $slider.on('init', function() {
                    var $btns = $slider.find('.slick-prev,.slick-next,.slick-dots button');

                    $btns.on('click', function() {
                        setTimeout(function() {
                            $slider.find('.ups-carousel_item.slick-active').focus();
                        }, 610);
                    });

                    var setTop = function() {
                        var imgFrame = $slider.find('.ups-imgFrame').eq(0);
                        var heightBtns = $btns.outerHeight();
                        var paddingBtns = 10;
                        var topPos  = imgFrame.outerHeight();
                        var $nav = $slider.find('.slick-prev,.slick-next,.slick-dots');
                        $nav.css({ top: topPos });
                    };

                   $(window).on('windowResize', setTop);
                   setTimeout(setTop, 1);
                   $slider.find('.slick-prev').after($slider.find('.slick-dots'));
                   $slider.find(".slick-next").after($slider.find('.slick-list'));
                });
                if($slider.children().length > 0){
                    var slickOpts = {
                        slide: '.ups-carousel_item',
                        slidesToShow: 1,
                        speed: 600,
                        autoplay: true,
                        autoplaySpeed: 11000,
                        infinite: true,
                        dots: true,
                        rtl: UPS.configs.isRTL,
                        nextArrow:'<button type="button" class="slick-next ups-iconAlone"><span class="icon" aria-hidden="true"></span><span class="ups-readerTxt">' + nextTxt + '</span></button>',
                        prevArrow:'<button type="button" class="slick-prev ups-iconAlone"><span class="icon" aria-hidden="true"></span><span class="ups-readerTxt">' + prevTxt + '</span></button>',
                        arrows: true,
                        appendArrows: $slider.find('.ups-carousel-navbuttons'),
	                    appendDots: $slider.find('.ups-carousel-navbuttons'),
                        customPaging: function(slider, i) {
                            return '<button type="button" data-role="none" role="button" aria-required="false" tabindex="0">' + (i + 1) + '</button>';
                        }
                    };

	               //console.log($slider);

	               $slider.slick(slickOpts).on({
	            	   'beforeChange': function(){
	                    	$focused = $(document.activeElement);
	                    },
	            	   'reInit': function() {
	                       //console.log('CAROUSEL');
	                   },
	                   'afterChange': function() {
	                       if (!cycle && $slider.slick('slickCurrentSlide') === 0) {
	                           $slider.slick('slickSetOption', 'autoplay', false, false);
	                           cycle = true;
	                       }
	                       
	                       setTimeout(function(){
	                    	   if($(this).parent().find(':focus').length > 0){
	                        		$focused.focus();
	                        	}
	                    	   if($slider.find('.ups-carousel-navbuttons').attr('role') === 'toolbar'){
	                       			$slider.find('.ups-carousel-navbuttons').removeAttr('role');
	           	            	}
	                        },500);
	                   }
	               });

                   // listen for menu to toggle. pause carousel when opened and play when closed
	               UPS.configs.$window.on('menu-toggled', function(e, menuOpened){
	                   if(!menuOpened) {
	                       $slider.slick('slickPlay');
	                   }
	                   else{
	                       $slider.slick('slickPause');
	                   }
	               });
	               
	               $slider.parent().find('.ups-skipNav_carousel').click(function(e){
	                	e.preventDefault();
	                	var isAutoPlay = $slider.slick('slickGetOption','autoplay');
	                	if(isAutoPlay === true){
	            			$slider.slick('slickPause');
	            			$slider.slick('slickSetOption','autoplay',false);
	            		}else{
	            			$slider.slick('slickPlay');
	            			$slider.slick('slickSetOption','autoplay',true);
	            		}
	               }); 
	               
	               $slider.parent().on('keydown',function(e){
		       			if(e.keyCode === 27){
		       				$(this).find('.ups-skipNav_carousel').click();
		       			}
	       			});

                }
            })();
        }

        //--------------------------------------------------


        //--------------------------------------------------
        // News
        //--------------------------------------------------
        var $news = $('.ups-news .ups-wrap_inner');

        for (var iNews = 0; iNews < $news.length; iNews++) {
            (function() {
                var $n = $($news[iNews]);
                $n.upsNews({});
            })();
        }
        //--------------------------------------------------


        //--------------------------------------------------
        // Tabs
        //--------------------------------------------------
        var $tabs = $('.ups-tabs');

        for (var iTabs = 0; iTabs < $tabs.length; iTabs++) {
            (function() {
                var $t = $($tabs[iTabs]);
                $t.upsTabs({});
            })();
        }
        //--------------------------------------------------


        //--------------------------------------------------
        // Legacy Tabs
        //--------------------------------------------------
        var $legs = $('.ups-legacy-tabs');

        for (var iLeg = 0; iLeg < $legs.length; iLeg++) {
            (function() {
                var $l = $($legs[iLeg]);
                $l.upsLegacyTabs({});
            })();
        }
        //--------------------------------------------------

        //--------------------------------------------------
        // Tables
        //--------------------------------------------------
        // var $table = $('.ups-contentBlock .ups-table table');

        // for (var iTable = 0; iTable < $table.length; iTable++) {
        //     (function () {
        //         var $t = $($table[iTable]);
        //         $t.upsTable({
        //             langShow: expand,
        //             langHide: collapse
        //         });
        //     })();
        // }

        // var $comparison = $('.ups-contentBlock .ups-table-comparison table');

        // for (var iComparison = 0; iComparison < $comparison.length; iComparison++) {
        //     (function () {
        //         var $c = $($comparison[iComparison]);
        //         $c.upsComparison({
        //             langShow: expand,
        //             langHide: collapse
        //         });
        //     })();
        // }

        var $contentBlock= $('.ups-contentBlock');

        for (var iBlock = 0; iBlock < $contentBlock.length; iBlock++) {
            (function () {
                var $t = $($contentBlock[iBlock]);
                $t.upsContentBlock({
                    langShow: window.expand,
                    langHide: window.collapse
                });
            })();
        }

        var $shipBy = $('.ups-ship-by');

        for (var iShipBy = 0; iShipBy < $shipBy.length; iShipBy++) {
            (function () {
                var $sb = $($shipBy[iShipBy]);
                $sb.upsShipBy({
                    expand: window.expand,
                    collapse: window.collapse
                });
            })();
        }
        //--------------------------------------------------


        //--------------------------------------------------
        // Site Map
        //--------------------------------------------------
        var $siteMap = $('.ups-site-map');

        for (var iSiteMap = 0; iSiteMap < $siteMap.length; iSiteMap++) {
            (function() {
                var $site = $($siteMap[iSiteMap]);
                $site.upsSiteMap({});
            })();
        }

        //--------------------------------------------------


        //--------------------------------------------------
        // Follow Me
        //--------------------------------------------------
        var $followMe = $('.ups-follow-me');

        if(!Modernizr.touch) {
            for (var ifMe = 0; ifMe < $followMe.length; ifMe++) {
                (function() {
                    var $fm = $($followMe[ifMe]);
                    $fm.upsFollowMe({});
                })();
            }
        }


        //--------------------------------------------------


        //--------------------------------------------------
        // Widget Track History
        //--------------------------------------------------
        var $widgetTrackHistory = $('.ups-widget.ups-trackHistory');
        var $textarea_widgetTrackHistory = $('.ups-trackHistory_input');

        for (var iTH = 0; iTH < $widgetTrackHistory.length; iTH++) {
            (function () {
                var $trackHistoryForm = $($widgetTrackHistory[iTH]);
                $trackHistoryForm.upsTrackHistory({
                    locale:window.wems_ext_locale
                });
            })();
        }
        //var TrackHistory_simpleTrackWidgetCount = 0;
        var TrackHistory_trackingVals = [];
        $textarea_widgetTrackHistory.keypress(function(e) {
            if(e.keyCode === 13){ //13 is the ASCII code for ENTER
                /*if(TrackHistory_simpleTrackWidgetCount >= 24  ){
                 e.preventDefault();
                 return false;
                 }*/
                var newHeight = parseInt($(this).css('height')) * 2;
                var newRowCount = parseInt($(this).attr('rows')) + 1;
                if (newRowCount <= 2) {
                    var _self=$(this);
                    _self.attr('rows', newRowCount).css({'height': newHeight,'line-height':'28px','overflow-y':'visible'});
                    _self.siblings('.ups-trackHistory_btn').css('height', newHeight);
                    _self.siblings('.ups-trackHistory_btn').addClass('ups-trackHistory_btn_lineHeight');
                }
                //TrackHistory_simpleTrackWidgetCount++;
            }else{
                TrackHistory_trackingVals.push(String.fromCharCode(e.keyCode));
            }
        });


        //--------------------------------------------------
        // Simple Track Widget
        //--------------------------------------------------
        var $simpleTrackWidget= $('.ups-simpleTrack.ups-widget ');
        var $simpleTrackWidgetInput = $simpleTrackWidget.find('.ups-simpleTrack_input');
        //var simpleTrackWidgetCount = 0;
        var trackingVals = [];
        $simpleTrackWidgetInput.keypress(function(e) {
            //trackingVals.push($(this).val());
            //trackingVals = trackingVals[trackingVals.length - 1].toString();
            if(e.keyCode === 13){ //13 is the ASCII code for ENTER
                /*if(simpleTrackWidgetCount >= 24  ){
                 $(this).val($(this).val().substring(0, 25));
                 return;
                 e.preventDefault();
                 return false;
                 }*/
                var newHeight = parseInt($(this).css('height')) * 2;
                var newRowCount = parseInt($(this).attr('rows')) + 1;
                if (newRowCount <= 2) {
                    $(this).attr({rows: newRowCount});
                    $(this).css({'height': newHeight, 'line-height': '28px'});
                    $(this).parent().siblings('.ups-simpleTrack_btn').css('height', newHeight);
                }
                //simpleTrackWidgetCount++;
                //console.log(simpleTrackWidgetCount);
            }else{
                trackingVals.push(String.fromCharCode(e.keyCode));
                //console.log(trackingVals);
                //trackingVals = $(this).val();
                //trackingVals.push($(this).val());
            }
        });
        $simpleTrackWidget.find('.ups-simpleTrack_btn').click(function(e){
            e.preventDefault();
            var _self=$(this);
            var component = {
                link_page_name: document.title,

            };
            component.navigation_class = _self.parents('div').attr('class');
            if (_self.attr('href') !== undefined) {
                component.destination_url = _self.attr('href');
            }
            if (_self.attr('data-event-id') !== undefined) {
                component.event_id = _self.attr('data-event-id');
            }
            if (_self.attr('data-content-block-id') !== undefined && _self.attr('data-content-block-id') !== '') {
                component.content_block_id = _self.attr('data-content-block-id');
            }
            component.link_name = _self.text().trim() || _self.val().trim();
            if(typeof window.utag_data!=='undefined' && window.utag_data!==undefined){
                component.user_type=window.utag_data.user_type;
                component.site_indicator=window.utag_data.site_indicator;
                component.page_country_code=window.utag_data.page_country_code;
                component.state=window.utag_data.state;
                component.city=window.utag_data.city;
                component.myups_login_state=window.utag_data.myups_login_state;
                component.page_language=window.utag_data.page_language;
            }
            if(typeof utag!=='undefined' && utag!==undefined){
                utag.track('link',component);
            }
            var parentForm =_self.parents('form');
            parentForm.attr('data-action',parentForm.attr('action'));
            if(UPS.configs.viewport.size==='small'){
                parentForm.attr('action',parentForm.attr('data-svp-track'));
                parentForm.find('.ups-simpleTrack_input').attr('name','trackingNumber');
                parentForm.find('input[name="track.x"]').attr('name','t').val('t');
            }else{
                parentForm.attr('action',parentForm.attr('data-action'));
                parentForm.find('input[name=t]').attr('name','track.x').val('Track');
                parentForm.find('.ups-simpleTrack_input').attr('name','trackNums');
            }

            parentForm.submit();
        });

        //--------------------------------------------------
        // Jump to Specific link Description
        //--------------------------------------------------

        $('.ups-article_index ul li a').on('click',function(){
            var href = $(this).attr('href');
            $('html, body').animate({
                scrollTop: $(href).offset().top - $('header').outerHeight()
            });
        });

        //--------------------------------------------------


        //--------------------------------------------------
        // Widget Help
        //--------------------------------------------------
        var $widgetHelp = $('.ups-widget .ups-help_button');

        for (var iHL = 0; iHL < $widgetHelp.length; iHL++) {
            (function() {
                var $helpLink = $($widgetHelp[iHL]);

                $helpLink.on('click', function(e){
                    e.preventDefault();
                    $(this).closest('.ups-widget').toggleClass('ups-help_show');
                    if($(this).parents('.ups-widget').hasClass('ups-help_show')){
                    	$(this).attr('aria-expanded','true');
                    }else{
                    	$(this).attr('aria-expanded','false');
                    }
                });
            })();
        }

        //--------------------------------------------------

        //--------------------------------------------------
        // Widget Shipping
        //--------------------------------------------------
        var $widgetShipping = $('.ups-widget.ups-shipping:not(.ups-widget.ups-shipping.ups-campusShip)');

        for (var iWS = 0; iWS < $widgetShipping.length; iWS++) {
            (function () {
                var $shippingForm = $($widgetShipping[iWS]);
                $shippingForm.upsShipping({
                    isLoggedIn: $('#ups-header').data('islogged'),
                    locale:window.wems_ext_locale,
                    pageContent: content
                });
            })();
        }

        //--------------------------------------------------


        //--------------------------------------------------
        // Widget Quote
        //--------------------------------------------------
        var $widgetQuote = $('.ups-widget.ups-quote');

        for (var iWQ = 0; iWQ < $widgetQuote.length; iWQ++) {
            (function () {
                var $quoteForm = $($widgetQuote[iWQ]);
                $quoteForm.upsQuote({
                    isLoggedIn: $('#ups-header').data('islogged'),
                    locale:window.wems_locale,
                    extLocale:window.wems_ext_locale,
                    country:window.wems_country,
                    uomUrl:countryUOMURL,
                    content:quoteContent
                });
            })();
        }

        //--------------------------------------------------

        //--------------------------------------------------
        // Zip Look-up
        //--------------------------------------------------
        var $zipLookUp = $('.ups-widget.ups-zip_lookUp');

        for (var iWZ = 0; iWZ < $zipLookUp.length; iWZ++) {
            (function() {
                var $zipForm = $($zipLookUp[iWZ]);
                $zipForm.upsZipLookUp({});
            })();
        }

        //--------------------------------------------------




        //--------------------------------------------------
        // Glossary Carousel
        //--------------------------------------------------
        var $glossary = $('.ups-glossary_carousel');

        for (var iGL = 0; iGL < $glossary.length; iGL++) {
            var cycle = false;
            (function() {
                if ($($glossary[iGL]).find('.ups-glossary_slide').length > 1) {
                    var $glSlide = $($glossary[iGL]);
                    $glSlide.on('init', function(slick) {
                        var $btns = $glSlide.find('.slick-prev,.slick-next,.slick-dots button');
                        $btns.on('click', function() {
                            setTimeout(function() {
                                $glSlide.find('.ups-glossary_slide.slick-active').focus();
                            }, 610);
                        });
                        
                        $($glossary[iGL]).find('.slick-prev').after($($glossary[iGL]).find('.slick-dots'));
                    });

                    $($glossary[iGL]).slick({
                        slide: '.ups-glossary_slide',
                        slidesToShow: 1,
                        speed: 600,
                        arrows: true,
                        nextArrow: '<button type="button" class="slick-next ups-iconAlone"><span class="icon" aria-hidden="true"></span><span class="ups-readerTxt">Next</span></button>',
                        prevArrow: '<button type="button" class="slick-prev ups-iconAlone"><span class="icon" aria-hidden="true"></span><span class="ups-readerTxt">Previous</span></button>',
                        autoplay: true,
                        autoplaySpeed: 7000,
                        infinite: true,
                        dots: true,
                        rtl: UPS.configs.isRTL,
                        appendArrows: $($glossary[iGL]).find('.ups-carousel-navbuttons'),
	                    appendDots: $($glossary[iGL]).find('.ups-carousel-navbuttons')
                    }).on({
                    	'beforeChange': function(){
	                    	$focused = $(document.activeElement);
	                    },
                        'reInit': function() {
                            //console.log('CAROUSEL');
                        },
                        'afterChange': function() {
                            if (!cycle && $($glossary[iGL]).slick('slickCurrentSlide') === 0) {
                                $($glossary[iGL]).slick('slickSetOption', 'autoplay', false, false);
                                cycle = true;
                            }
                            
                            setTimeout(function(){
                            	if($(this).parent().find(':focus').length > 0){
	                        		$focused.focus();
	                        	}
                        		if($glSlide.find('.ups-carousel-navbuttons').attr('role') === 'toolbar'){
                        			$glSlide.find('.ups-carousel-navbuttons').removeAttr('role');
            	            	}
	                        },500);
                        }
                    });
                    $glSlide.find('.ups-skipNav_carousel').click(function(e){
                    	e.preventDefault();
                    	var isAutoPlay = $glSlide.slick('slickGetOption','autoplay');
                    	if(isAutoPlay === true){
                    		$glSlide.slick('slickPause');
                    		$glSlide.slick('slickSetOption','autoplay',false);
                		}else{
                			$glSlide.slick('slickPlay');
                			$glSlide.slick('slickSetOption','autoplay',true);
                		}
                   }); 
                	
                    $glSlide.on('keydown',function(e){
            			if(e.keyCode === 27){
            				$(this).find('.ups-skipNav_carousel').click();
            			}
            		});
                }
            })();
        }
        //--------------------------------------------------

        //--------------------------------------------------
        // Pop-Up Window
        //--------------------------------------------------

        function openPopUp(href) {
            var w = Math.round(UPS.configs.viewport.width * 0.8),
                h = Math.round(UPS.configs.viewport.height * 0.8),
                dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : screen.left,
                dualScreenTop = window.screenTop !== undefined ? window.screenTop : screen.top,
                width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width,
                height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

            // if (!(!window.screenTop && !window.screenY)) {
            //     component = component +"_light";
            // }

            var left = ((width / 2) - (w / 2)) + dualScreenLeft;
            var top = ((height / 2) - (h / 2)) + dualScreenTop;

            var newWindow = window.open(href, '_blank', 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

            // Puts focus on the newWindow
            if (window.focus) {
                newWindow.focus();
            }

        }

        $('.ups-popUp_link').on('click',function(e){
            e.preventDefault();
            openPopUp($(this).attr('href'));
        });


        //--------------------------------------------------
        // Video Downloads Carousel
        //--------------------------------------------------
        var $videoDownloads = $('.ups-video-downloads');

        for (var iVD = 0; iVD < $videoDownloads.length; iVD++) {
            var vidCycle = false;
            (function() {
                if ($($videoDownloads[iVD]).find('.ups-resource').length > 1) {
                    var $vidSlide = $($videoDownloads[iVD]);
                    $vidSlide.on('init', function(slick) {
                        var $btns = $vidSlide.find('.slick-prev,.slick-next,.slick-dots button');

                        $btns.on('click', function() {
                            setTimeout(function() {
                                $vidSlide.find('.ups-resource.slick-active').focus();
                            }, 610);
                        });
                        $($videoDownloads[iVD]).find('.slick-prev').after($($videoDownloads[iVD]).find('.slick-dots'));
                    });
                    $vidSlide.slick({
                        slide: '.ups-resource',
                        slidesToShow: 1,
                        speed: 600,
                        arrows: true,
                        nextArrow: '<button type="button" class="slick-next ups-iconAlone"><span class="icon" aria-hidden="true"></span><span class="ups-readerTxt">'+$vidSlide.data('next')+'</span></button>',
                        prevArrow: '<button type="button" class="slick-prev ups-iconAlone"><span class="icon" aria-hidden="true"></span><span class="ups-readerTxt">'+$vidSlide.data('prev')+'</span></button>',
                        appendArrows: $($videoDownloads[iVD]).find('.ups-carousel-navbuttons'),
	                    appendDots: $($videoDownloads[iVD]).find('.ups-carousel-navbuttons'),
                        autoplay: true,
                        autoplaySpeed: 7000,
                        infinite: true,
                        dots: true,
                        rtl: UPS.configs.isRTL
                    }).on({
                    	'beforeChange': function(){
	                    	$focused = $(document.activeElement);
	                    },
                        'reInit': function() {
                            //console.log('CAROUSEL');
                        },
                        'afterChange': function() {
                            if (!vidCycle && $vidSlide.slick('slickCurrentSlide') === 0) {
                                $vidSlide.slick('slickSetOption', 'autoplay', false, false);
                                vidCycle = true;
                            }
                            
                            setTimeout(function(){
                            	if($(this).parent().find(':focus').length > 0){
	                        		$focused.focus();
	                        	}
                        		if($($vidSlide).find('.ups-carousel-navbuttons').attr('role') === 'toolbar'){
                        			$($vidSlide).find('.ups-carousel-navbuttons').removeAttr('role');
            	            	}
	                        },500);
                        }
                    });
                    
                    $vidSlide.find('.ups-skipNav_carousel').click(function(e){
                    	e.preventDefault();
                    	var isAutoPlay = $vidSlide.slick('slickGetOption','autoplay');
                    	if(isAutoPlay === true){
                    		$vidSlide.slick('slickPause');
                    		$vidSlide.slick('slickSetOption','autoplay',false);
                		}else{
                			$vidSlide.slick('slickPlay');
                			$vidSlide.slick('slickSetOption','autoplay',true);
                		}
                   });
                    
                    $vidSlide.on('keydown',function(e){
            			if(e.keyCode === 27){
            				$(this).find('.ups-skipNav_carousel').click();
            			}
            		});

                }
            })();
        }
        
        /** UPS-7665 532976 Changing the Video Button position to fix the Tab Order**/
        if($('.vjs-progress-control').length){
            $('.vjs-volume-menu-button').insertAfter($('.vjs-progress-control'));
        }
        /** UPS-7665 **/

        //--------------------------------------------------



        //--------------------------------------------------
        // Banner- analytics
        //--------------------------------------------------

            var bannerAnalytics=$('.ups-banner');
            bannerAnalytics.find('.ups-cta').click(function(e){
                e.stopPropagation();
                var _self=$(this);
                var componentBanner={};
                componentBanner.event_id=_self.attr('data-event-id');
                componentBanner.content_id=_self.attr('data-content-id');
                componentBanner.content_block_id=_self.attr('data-content-block-id');
                componentBanner.onsite_ad_display = _self.attr('data-onsite-ad-display');
                componentBanner.onsite_ad_click = _self.attr('data-onsite-ad-click');
                //componentBanner.banner_type=_self.attr('data-banner-type');
                componentBanner.link_page_name=document.title;
                componentBanner.navigation_class=_self.parent('div').attr('class');
                componentBanner.link_name=_self.attr('data-preLinkName')+_self.text();
                if(typeof window.utag_data!=='undefined' && window.utag_data!==undefined){
                    componentBanner.user_type=window.utag_data.user_type;
                    componentBanner.site_indicator=window.utag_data.site_indicator;
                    componentBanner.page_country_code=window.utag_data.page_country_code;
                    componentBanner.state=window.utag_data.state;
                    componentBanner.city=window.utag_data.city;
                    componentBanner.myups_login_state=window.utag_data.myups_login_state;
                    componentBanner.page_language=window.utag_data.page_language;
                }
                componentBanner.destination_url=_self.parents('.ups-analytics').attr('href');
                //console.log('banner',componentBanner);
                if(typeof utag!=='undefined' && utag!==undefined){
                    utag.track('link', componentBanner);

                }
            });
            
            var bannerLength = $('.ups-banner').length; 
            // 496795 Banner clickable through JS
            $('.ups-banner').each(function(i,v){
            	if(bannerLength > 1){
            		var h2Title = $(this).find('h2'),
            		h2TitleId = $(h2Title).attr('id'),
            		cta = $(this).find('#ups-banner-ctatxtid'),
            		ctaTxtId = $(cta).attr('id');
            		h2TitleId = String(h2TitleId+i);
            		ctaTxtId = String(ctaTxtId+i);
            		$(h2Title).attr('id',h2TitleId);
            		$(cta).attr('id',ctaTxtId);
            		$(cta).parent().attr('aria-labelledby',h2TitleId+' '+ctaTxtId);
            	}
            	var ctaButton = $(this).find('a.ups-cta');
            	$(this).click(function(){
            		ctaButton[0].click();
            	});
            	$(this).keydown(function(e){
            		if (e.keyCode === 13) { //ENTER
            			ctaButton[0].click();
            		}
            	});
            });
            //console.log('banner length is: '+bannerLength);
        //--------------------------------------------------


//        var $banner = $('.subsection_main .ups-banner');
//
//        for (var iBanner = 0; iBanner < $banner.length; iBanner++) {
//            (function() {
//                var minWidth = null;
//                switch (UPS.configs.viewport.size) {
//                case 'small':
//                    minWidth = '';
//                    break;
//                case 'mediumMid':
//                    minWidth = '';
//                    break;
//                case 'medium':
//                    minWidth = $(window).outerWidth();
//                    break;
//                default:
//                    minWidth = $(window).outerWidth();
//                };
//
//                for (var iBanner = 0; iBanner < $banner.length; iBanner++) {
//                    (function() {
//                        $($banner[iBanner]).find('picture').css('min-width', minWidth);
//                    })();
//                };
//            })();
//        };
//
//        $(window).on('windowResize', function() {
//            var minWidth = null;
//            switch (UPS.configs.viewport.size) {
//            case 'small':
//                minWidth = '';
//                break;
//            case 'mediumMid':
//                minWidth = '';
//                break;
//            case 'medium':
//                minWidth = $(window).outerWidth();
//                break;
//            default:
//                minWidth = $(window).outerWidth();
//            };
//
//            for (var iBanner = 0; iBanner < $banner.length; iBanner++) {
//                (function() {
//                    $($banner[iBanner]).find('picture').css('min-width', minWidth);
//                })();
//            };
//        });

        //--------------------------------------------------



        //--------------------------------------------------
        // Featured Three Piece
        //--------------------------------------------------

        var $featuredThree = $('.ups-featured-three-piece');

        for (var iFeatured = 0; iFeatured < $featuredThree.length; iFeatured++) {
            (function() {
                var $f = $($featuredThree[iFeatured]);
                $f.upsFeaturedThree({});
            })();
        }

        //--------------------------------------------------



        //--------------------------------------------------
        // M27 Search Support
        //--------------------------------------------------

        var $searchSupport = $('.ups-search_support');

        for (var iSearchSupport = 0; iSearchSupport < $searchSupport.length; iSearchSupport++) {
            (function() {
                var $ss = $($searchSupport[iSearchSupport]);
                $ss.upsSearchSupport({
                    jsonRequest: window.jsonRequest||{},
                    lingual:window.localize,
                    isLoggedIn: $('#ups-header').data('islogged')
                    //URL:reqURL,
                });
            })();
        }

        //--------------------------------------------------



        //--------------------------------------------------
        // W05 Manage Home Deliveries
        //--------------------------------------------------

        /*var $manageDeliveries = ;

         for (var iManageDeliveries = 0; iManageDeliveries < $manageDeliveries.length; iManageDeliveries++) {
         (function () {
         var $md = $($manageDeliveries[iManageDeliveries]);
         // console.log($manageDeliveries[iManageDeliveries])
         });;
         };*/
        var $manageDeliveries = $('.ups-manage-deliveries');
        if($manageDeliveries.length>0 ){
            for (var iManageDeliveries = 0; iManageDeliveries < $manageDeliveries.length; iManageDeliveries++) {
                var $md = $($manageDeliveries[iManageDeliveries]);
                $md.upsManageDeliveries({
                    jsonURL: window.mhd_url,
                    isBody: true,
                    language:window.multilingual,
                    shipmentTag:window.seeShipment,
                    locale:window.wems_ext_locale,
                    lang:window.wems_locale
                });
            }
        }

        //--------------------------------------------------



        //--------------------------------------------------
        // Days of Operation
        //--------------------------------------------------

        var $daysofop = $('.ups-daysofop');

        for (var iDays = 0; iDays < $daysofop.length; iDays++) {
            var $days = $($daysofop[iDays]);
            $days.upsDaysOfOp({
                //daysData:doopData,
                daysData:eval($days.attr('data-render')),
                type:window.doopType,
                localeURL:window.ajaxUrl,
                expand: window.expand,
                collapse: window.collapse
            });
        }

        //--------------------------------------------------



        //--------------------------------------------------
        // Language Selector
        //--------------------------------------------------

        if($('.ups-langSelect_map').length > 0) {

            //var curLang = $.cookie('defaultHome');

            var $svgMap = $('#ups-svg-countries');
            var svgRegions = [
                '#ups-svg-asia',
                '#ups-svg-africa',
                '#ups-svg-centsouthcarribean',
                '#ups-svg-oceania',
                '#ups-svg-namerica',
                '#ups-svg-europe',
                '#ups-svg-mideast',
            ];

            // if(window.history.length > 1) {
            //     $('.ups-langSelect_back').addClass(UPS.configs.activeClass)
            //         .on('click', function(e) {
            //             e.preventDefault();
            //             window.history.back();
            //         });
            // }

            var $svgRegs = $svgMap.find(svgRegions.join(','));

            var $langAcc = $('.ups-langSelect_accordion');
            var $langRegs = $langAcc.find('.ups-accordion_toggle');
            var $langLinks = $langAcc.find('.ups-accordion_expand a');

            for (var iReg = 0; iReg < $langRegs.length; iReg++) {
                (function() {
                    var $reg = $($langRegs[iReg]);
                    var map = $reg.data('map');
                    var $map = $svgMap.find('#' + map);

                    $reg.on({
                        'click': function () {
                            var isActive = $reg.hasClass(UPS.configs.activeClass);
                            $svgRegs.attr('class', 'ups-svg_region');
                            if (isActive) {
                                $map.attr('class', 'ups-svg_region ' + UPS.configs.activeClass);
                            }
                            return false;
                        },
                        'mouseenter': function() {
                            var isActive = $reg.hasClass(UPS.configs.activeClass);
                            if (!isActive) {
                                $map.attr('class', 'ups-svg_region ups-mousein');
                            }
                        },
                        'mouseleave': function() {
                            var isActive = $reg.hasClass(UPS.configs.activeClass);
                            if (!isActive) {
                                $map.attr('class', 'ups-svg_region');
                            }
                        }
                    });
                })();
            }

            for (var iMap = 0; iMap < $svgRegs.length; iMap++) {
                (function() {
                    var $map = $($svgRegs[iMap]);
                    var mapId = $map.attr('id');
                    var $regBtn = $langAcc.find('[data-map="' + mapId + '"]');
                    $map.on({
                        'click': function() {
                            $regBtn.trigger('click');
                        },
                        'mouseenter': function() {
                            $regBtn.addClass('ups-mousein');
                        },
                        'mouseleave': function() {
                            $regBtn.removeClass('ups-mousein');
                        }
                    });

                })();
            }

            // for (var iLang = 0; iLang < $langLinks.length; iLang++) {
            //     (function() {
            //         var $lang = $($langLinks[iLang]);
            //         var langData = $lang.data();
            //         var langUrl = $lang.attr('href');

            //         $lang.on('click', function(e) {
            //             e.preventDefault();
            //             $.cookie('defaultHome', langData.code);
            //             window.location.href = langUrl;
            //         });

            //     })();
            // }

            if(wems_ext_locale){
                var $curLink = $('a[data-code="' + wems_ext_locale.toLowerCase() + '"]');

                $curLink.addClass(UPS.configs.activeClass)
                    .closest('.ups-accordion_item')
                    .find('.ups-accordion_toggle')
                    .trigger('click');

                $curLink.focus();
                // $('html, body').animate({
                //     scrollTop: $(myEl).offset().top
                // }, 500);
            }

        }


        //--------------------------------------------------


        // MAP
        //--------------------------------------------------
        /* var $maps = $('.ups-locFinder');
         var gotLoc = false;

         var setLocFinder = function() {
         for (var iMap = 0; iMap < $maps.length; iMap++) {
         (function () {
         var $map = $($maps[iMap]);
         if ($map.data().hasloc) {
         $map.upsLocFinder({
         locationData: locationJson,
         locateData  : locatorRequest
         });
         }
         })();
         }
         };

         if(navigator.geolocation) {
         navigator.geolocation.getCurrentPosition(function(position) {
         UPS.configs.position = position;
         setLocFinder();
         },
         function() {
         UPS.configs.position = false;
         setLocFinder();
         }, {
         timeout: 10000
         });
         } else {
         setLocFinder();
         }*/
        var $locEl = $('.ups-locFinder_wrap');
        if($locEl.length){
            $locEl.upsLocFinder({
                langJSON:window.locMsg,
                //mapSession:JSbingMapSessionKeys,
                //mapKey:JSbingMapKeys
                //keyGDOL: $locEl.attr('data-gdol'),
                keyWEMS: $locEl.attr('data-wem'),
                locale:window.wems_ext_locale,
                country:window.wems_country
            });
        }



        //--------------------------------------------------

        // Forms
        //--------------------------------------------------

        var $forms = $('.ups-form_wrap.ups-formStrict form');
        for (var iForm = 0; iForm < $forms.length; iForm++) {
            (function() {
                var $form = $($forms[iForm]);
                $form.upsForm({});
            })();
        }

        //--------------------------------------------------


        // PARALLAX
        //--------------------------------------------------
        if (UPS.utils.currentIEVersion < 0 || UPS.utils.currentIEVersion > 9) {
            var $parallax = $('.ups-paraFrame:not(.iw_columns.col-lg-4 .ups-carousel .ups-paraFrame)');
            for (var iPara = 0; iPara < $parallax.length; iPara++) {
                (function() {
                    var $para = $($parallax[iPara]);
                    $para.upsParallax({});
                })();
            }
        }
        //--------------------------------------------------

        // CALENDAR
        //--------------------------------------------------
        var $calendars = $('.ups-calendar');
        for (var iCal = 0; iCal < $calendars.length; iCal++) {
            (function () {
                var $cal = $($calendars[iCal]);
                $cal.upsCalendar({
                    locale:window.wems_locale,
                    country:window.wems_country,
                    locale_lang:window.wems_locale
                });
            })();
        }
        //--------------------------------------------------


        //--------------------------------------------------
        //    UPS FSC
        //--------------------------------------------------
        var $fsc = $('.fuel-surcharge');
        //for(var i = 0 ; i < $fsc.length ; i++){
        //    var $fuelSurcharge=$($fsc[i]);
        $fsc.upsFSC({
            country:window.wems_country,
            locale:window.wems_ext_locale,
            locale_lang:window.wems_locale,
            isTeam:window.wems_ts,
            langShow: window.expand,
            langHide: window.collapse
        });
        //}
        //--------------------------------------------------

        // MOBILE SEARCH
        //--------------------------------------------------
        $('#ups-mobSearch_btn').upsMobSearch({});
        //--------------------------------------------------


        // // RESTRICT NUMBER INPUT
        // //--------------------------------------------------
        // $('input.ups-numberOnly').keypress(function(key) {
        //     var verified = (key.which === 8 || key.which === undefined || key.which === 0) ? null : String.fromCharCode(key.which).match(/[^0-9]/);
        //     if (verified) {key.preventDefault();}
        // });
        //--------------------------------------------------
        // RESIZE VIDEO on LARGE SCREENS
        //--------------------------------------------------
        var $vidFrame = $('.ups-video_frameWrap');
        var vidBfr = 100;

        var setVideo = function() {
            var vidMaxW;

            if(UPS.configs.viewport.size !== 'small') {
                var headH = $('#ups-headerWrap').outerHeight();
                var vidMaxH = UPS.configs.viewport.height - headH - vidBfr;
                vidMaxW = (vidMaxH * 1.7777) + 'px';
            } else {
                vidMaxW = 'none';
            }

            $vidFrame.css({
                'max-width': vidMaxW
            });
        };

        setVideo();

        $(window).on('windowResizeH', setVideo);


        //--------------------------------------------------


        // PREVENT ZOOM ON MOBILE FOCUS
        //--------------------------------------------------
        // var $viewportMeta = $('meta[name="viewport"]');

        // $('select, textarea').bind('focus blur', function(event) {
        //     $viewportMeta.attr('content', 'width=device-width,initial-scale=1,maximum-scale=' + (event.type == 'blur' ? 10 : 1));
        // });
        //--------------------------------------------------

        //--------------------------------------------------
        // Page Title with Share Icons
        //--------------------------------------------------

        $('.page-title_table .share_list .list a').bind('click',function(){
            var url = '',
                title = encodeURIComponent(document.title),
                desc = $('meta[name="description"]').attr('content'),
                w = screen.width,
                h = 400,
                count = 0,
                left, top;
            //link = document.location.href;
            if($(this).hasClass('ups-share_social-facebook')){
                url = window.Share_Facebook_URL + UPS.configs.pageURL;
                url += '&t=' + title;
            }
            else if ($(this).hasClass('ups-share_social-twitter'))  {
                url = window.Share_Twitter_URL+'url=' +UPS.configs.pageURL +'&source=@UPS_Connect&text=' +desc;
                w = 520;
                title='share';
                h = 260;
            }else if ($(this).hasClass('ups-share_social-linkedin')){
                url = window.Share_LinkedIn_URL;
                url += '&url=' + UPS.configs.pageURL;
                url += '&title=' + title;
                url += '&summary=' + desc;
                w = 610;
                h = 500;
            }else if ($(this).find('.ups-icon-email')){
                url = 'mailto:?subject=';
                url += window.Share_Email_Subject;
                url += '&body=';
                url += encodeURIComponent(Share_Email_Body + '\n' + UPS.configs.pageURL);
                window.location.href = url;
                count = 1;
            }
            if(url !== '' && count === 0){
                left = (screen.width/2)-(w/2),
                    top = (screen.height/2)-(h/2);
                var dialog = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left);
                if (window.focus) { dialog.focus(); }
            }
        });
        //--------------------------------------------------

        //--------------------------------------------------
        // M10 article -> Read more Implementations
        //--------------------------------------------------

        var readMore= $('.ups-article_readMore');
        readMore.on('click',function(){
            var _selfElement= $(this);
            var parentElement= _selfElement.parent();
            if(parentElement.find('.ups-content_readMore.ups-content_post').length>0){
                parentElement.find('.ups-content_readMore.ups-content_post').addClass(UPS.configs.activeClass);
                _selfElement.remove();
            }
        });


        // PERSONALIZATION
        //------------------------------------------------------
        if($('.ups-personalize').length>0){
            $('.ups-personalize').upsPersonalize({
                url:window.ghosteryUrl,
                country:window.wems_country,
                locale:window.wems_locale
            });
        }


        //-----------------------------------------------------


        //--------------------------------------------------
        // M54 Print Code
        //--------------------------------------------------
        $('.ups-daysofop_print').click(function(e){
            e.preventDefault();
            window.print();
        });
        //--------------------------------------------------

        //--------------------------------------------------
        // YouTube list Implementation
        //==================================================
        var youTubeNode= $('#ups-youtube-list');
        if(youTubeNode.length>0){
            (function($){
                var youTubeApiKey='AIzaSyB1kz1ued9d6yLB1QfUTfB1IxIyZHGK1XY';
                var youTubeChannel={};
                youTubeChannel.promise = $.ajax({
                    url:'https://www.googleapis.com/youtube/v3/channels?part=contentDetails&forUsername=ups&key='+youTubeApiKey,
                    dataType:'JSON'
                });

                youTubeChannel.promise.done(function(data) {
                    var youTubePlaylist={};
                    youTubePlaylist.promise = $.ajax({
                        url:'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId='+data.items[0].contentDetails.relatedPlaylists.uploads+'&maxResults=5&key='+youTubeApiKey,
                        dataType:'JSON'
                    });

                    youTubePlaylist.promise.done(function(data) {
                        var youTubeList='';
                        for(var i=0; i < data.items.length;i++){
                            youTubeList+='<li class="ups-youtube-list"><iframe class="" src="//www.youtube.com/embed/'+data.items[i].snippet.resourceId.videoId+'?rel=0" frameborder="0" allowfullscreen=""></iframe></li>';
                        }
                        youTubeNode.append("<ul class='ups-youTube_lifestream'>"+youTubeList+"</ul>");
                    });

                    // youTubePlaylist.promise.fail(function(jqXHR) {

                    // });
                });

                // youTubeChannel.promise.fail(function(jqXHR) {

                // });

            })(jQuery);
        }
        //--------------------------------------------------

        //--------------------------------------------------
        // M09 Secondary navigation
        //==================================================
        var  loadSecondaryNav= function() {
            if(UPS.configs.viewport.size === 'small' || UPS.configs.viewport.size === 'mediumMid') {
                var _secondaryNav= $(".ups-secondaryNav");
                var _secondarySubsection = $(".col-lg-12").find(".col-lg-8");
                if(_secondaryNav.length>0 && _secondarySubsection.find(".ups-secondaryNav").html()=== undefined){
                    var cloned=$(".ups-secondaryNav").parent(".iw_component").clone();
                    $(".col-lg-12").find(".col-lg-8").first().prepend(cloned);
                    _secondarySubsection.find(".ups-secondaryNav").find(".ups-accordion_wrapper").upsAccordion({});
                }
            }
        };

        loadSecondaryNav();
        $(window).on('windowResizeH', loadSecondaryNav);

     // SEE ALL M09 SUB NAVIGATION
        //--------------------------------------------------
        $(".ups-secNavAccordion_showhidetext").click(function(e){
            e.preventDefault();
            if($(this).hasClass("active")){
            	$(this).attr("aria-expanded","true");
                $(this).parents(".ups-accordion_wrapper").find(".ups-accordion_allLinks").addClass("fullHeight").attr("aria-hidden","false");
                $(this).addClass("inactive");
                $(this).removeClass("active");
            }
            else{
            	$(this).attr("aria-expanded","false");
                $(this).parents(".ups-accordion_wrapper").find(".ups-accordion_allLinks").removeClass("fullHeight").attr("aria-hidden","true");
                $(this).addClass("active");
                $(this).removeClass("inactive");
            }
        });

        // SEE ALL M09 SUB NAVIGATION PEER NAVIGATION
        //--------------------------------------------------
        $(".ups-secNav_showhidetext").click(function(e){
            e.preventDefault();
            if($(this).hasClass("active")){
            	$(this).attr("aria-expanded","true");
                $(this).parents(".ups-secondarynav-extn").find(".ups-secNav_allLinks").addClass("fullHeight").attr("aria-hidden","false");
                $(this).addClass("inactive");
                $(this).removeClass("active");
            }
            else{
            	$(this).attr("aria-expanded","false");
            	$(this).parents(".ups-secondarynav-extn").find(".ups-secNav_allLinks").removeClass("fullHeight").attr("aria-hidden","true");
                $(this).addClass("active");
                $(this).removeClass("inactive");
            }
        });


        // -------------------------------------------------
        // M59 Service Alerts
        // -------------------------------------------------
        var serviceAlerts= $('.ups-service_alerts');
        for (iCal = 0; iCal < serviceAlerts.length; iCal++) {
            (function() {
                var $serviceAlert = $(serviceAlerts[iCal]);
                $serviceAlert.upsServiceAlerts({
                    zipAffected: window.areasAffected || {}
                });
            })();
        }

        // -------------------------------------------------
        // M59 Service Alerts Ends
        // -------------------------------------------------

        //Back to Top Link
        var $link = $('.ups-content_with_wrapper_link');
        $link.on('click',function(e){
            if(this.hash !== ""){
                e.preventDefault();
                var elem_href = $(this).attr('href');
                var elem_height = $(elem_href).offset().top;
                $("html, body").scrollTop(elem_height - $('#ups-headerWrap').height());
            }
        });
        //Back to Top Link

        // Footer :  Remove header and its child links when either no child links are present or child links are empty
        $.each($('.ups-footer_links > ul'),function(){
            var liPresent = $(this).children().length;
            if(liPresent > 0){
                var txt = $("li", this).text();
                if(txt.length <= 0){
                    $(this).hide();
                    $(this).siblings('h2').hide();
                }
            }else{
                $(this).hide();
                $(this).siblings('h2').hide();
            }

        });
        // Footer :  Remove header and its child links when either no child links are present or child links are empty


        $(document).on('click', '.ups-analytics', function() {
            var _self = $(this);
            var component = {
                link_page_name: document.title
            };
            component.navigation_class = _self.parents('div').attr('class');
            if (_self.attr('href') !== undefined) {
                component.destination_url = _self.attr('href');
            }
            if(_self.attr('data-onsite-ad-position')!== undefined){
                component.onsite_ad_position = (Number(_self.parents('.ups-carousel_item').attr('data-slick-index'))+1)+'';
            }
            if(_self.attr('data-onsite-ad-display')!== undefined){
                component.onsite_ad_display = _self.attr('data-onsite-ad-display');
            }
            if(_self.attr('data-onsite-ad-click')!== undefined){
                component.onsite_ad_click = _self.attr('data-onsite-ad-click');
            }
            if (_self.attr('data-event-id') !== undefined) {
                component.event_id = _self.attr('data-event-id');
            }
            if (_self.attr('data-content-block-id') !== undefined && _self.attr('data-content-block-id') !== '') {
                component.content_block_id = _self.attr('data-content-block-id');
            }else if(_self.attr('data-isrte') !==undefined && _self.attr('data-isrte')==='true' && _self.parents('.ups-analytics-render')!==undefined && _self.parents('.ups-analytics-render').attr('data-content-block-id')!==undefined){
                component.content_block_id = _self.parents('.ups-analytics-render').attr('data-content-block-id');
            }
            if(_self.parents('.ups-analytics-render').attr('data-content-id')!==undefined && _self.parents('.ups-analytics-render').attr('data-content-id')!==''){
                component.content_id = _self.closest('.ups-analytics-render').attr('data-content-id');
            }else if((_self.attr('data-isrte') !==undefined && _self.attr('data-isrte')==='true') ||  _self.attr('data-content-id')!==undefined){
                component.content_id = _self.attr('data-content-id');
            }
            if(_self.attr('data-on-site-search-result-position')!==undefined){
                component.on_site_search_result_position=_self.attr('data-on-site-search-result-position');
            }

            if (_self.attr('data-preLinkName') !== undefined && _self.attr('data-postLinkName') !== undefined) {
                component.link_name = _self.attr('data-preLinkName') + _self.text().trim() + _self.attr('data-postLinkName');
            } else if (_self.attr('data-preLinkName') !== undefined) {
                if(_self.attr('data-content-block-id')==='M3'){
                    component.link_name = _self.attr('data-preLinkName') + _self.find('h2').text().trim();
                }else{
                    component.link_name = _self.attr('data-preLinkName') + _self.text().trim();
                }
            } else if (_self.attr('data-postLinkName') !== undefined) {
                component.link_name = _self.text().trim() + _self.attr('data-postLinkName');
            } else if(_self.hasClass("ups-email_link")){// for Widget Email
                component.link_name = (_self.parents('.ups-subscribe-email').hasClass('inactive'))?_self.find('.ups-subscribe-hide').text():_self.find('.ups-subscribe-view').text();
            }else if(_self.hasClass("ups-showstates")){// for M59 Service Alerts
                if(_self.find('span.icon').hasClass('ups-icon-chevrondown')){
                    component.link_name = _self.attr('data-hide');
                }else{
                    component.link_name = _self.attr('data-show');
                }
            }else {

                // --- FeaturedThreePiece - M52 & Search - M27
                if (_self.attr('data-content-block-id') === 'M52' || _self.attr('data-content-block-id') === 'M27' || _self.attr('data-isrte') === 'true') {
                    component.link_name = _self.attr('data-link-name');
                } else {
                    var linkValue='';
                    if(_self.text()!==undefined && _self.text()!==''){
                        if(_self.text().indexOf('expand')>-1){
                            linkValue=_self.text().substring(0,_self.text().indexOf('expand')).trim();

                        }else if(_self.text().indexOf('collapse')>-1){
                            linkValue=_self.text().substring(0,_self.text().indexOf('collapse')).trim();

                        }else{
                            if(_self.attr('data-content-block-id') ==='M13'){
                                linkValue=_self.find('.tab-title').text()+' : '+ _self.find('.tab-sub-title').text();
                            }else if(_self.attr('data-content-block-id') ==='M8'){
                                linkValue=_self.find('.tab-title').text();
                            }else if(_self.attr('data-content-block-id') ==='M15'){

                                if(_self.parent('.detail_imageblock').length>0){
                                    linkValue=_self.find('h3').text();
                                }else if(_self.hasClass('.list_link')){
                                    linkValue=_self.find('h2').text();
                                }else{
                                    linkValue= _self.text().trim();
                                }
                            }else{
                                linkValue= _self.clone().children().remove().end().text().trim();
                            }
                        }
                    }else{
                        if(_self.attr('data-content-block-id') ==='M15'){
                            if(_self.parents('.list-image-container').length>0){
                                linkValue=_self.parents('.list_detail').find('h2').text();
                            }
                        }else{
                            linkValue=_self.val().trim();
                        }
                    }
                    component.link_name = linkValue;
                }
            }

            /*if(_self.attr('data-appendlinkName')!=undefined){
             component.link_name=_self.attr('data-appendlinkName')+_self.text();
             }else{
             component.link_name=_self.text();
             }*/

            // --- TAB - M8
            if (_self.attr('data-tab-name') !== undefined) {
                component.tab_name = _self.text();
            }

            // --- Image Map - M21 & Header - M1
            if (_self.attr('data-country-language-name') !== undefined) {
                component.country_language_name = _self.attr('data-country-language-name');
            }

            // --- Accordion List - M22
            if (_self.attr('data-list-title') !== undefined) {
                component.list_title = _self.attr('data-list-title');
            }

            // --- FAQ - M29
            if (_self.attr('class') !== undefined && _self.attr('data-content-block-id') === 'M29') {
                if (_self.attr('class').indexOf('ups-active') < 0 && _self.attr('class').indexOf('ups-collapsable_toggle') < 0) {
                    if(_self.attr('class') !== undefined && _self.attr('data-isSingleFAQ') !== 'true'){
                        return;
                    }
                }
                if (component.link_name.indexOf('expand') > 0) {
                    component.link_name = component.link_name.substring(0, component.link_name.indexOf('expand'));
                }

                if (_self.attr('data-event-id') === '22' && _self.attr('class').indexOf('ups-collapsable_toggle') >= 0) {
                    if (_self.parents('div').attr('class').indexOf('ups-active') < 0) {
                        return;
                    }
                }
            }

            // --- CompactFeed - M33
            if (_self.attr('data-content-block-id') === 'M33') {
                component.link_name = 'Feed-' + component.link_name.substring(component.link_name.lastIndexOf('_') + 1);
            }

            // --- Search -  M27
            if (_self.attr('data-on-site-search-term') !== undefined) {
                component.on_site_search_term = _self.attr('data-on-site-search-term');
            }

            /* if (_self.attr('data-on-site-search-result') != undefined) {
             component.OnSiteSearchResults = _self.attr('data-on-site-search-result');
             if (_self.attr('data-on-site-search-result') > 0) {
             component.OnSiteSearchNoResults = '1';
             } else {
             component.OnSiteSearchNoResults = '0';
             }
             }

             if(_self.attr('data-banner-type')!=undefined){
             component.banner_type=_self.attr('data-banner-type');
             }*/

            if(_self.attr('data-link-type')!==undefined){
                component.link_type =_self.attr('data-link-type');
            }

            if(_self.attr('data-article-author')!==undefined){
                component.article_author =_self.attr('data-article-author ');
            }

            if(_self.attr('data-article-title')!==undefined){
                component.article_title  =_self.attr('data-article-title');
            }

            if(_self.attr('data-content-id')!==undefined && _self.attr('data-content-id')!==''){
                component.content_id =_self.attr('data-content-id');
            }

            if(_self.attr('data-author-id')!==undefined){
                component.author_id =_self.attr('data-author-id');
            }

            if(_self.attr('data-link-type')!==undefined){
                component.link_type =_self.attr('data-link-type');
            }
            if(_self.attr('data-document-id')!==undefined){
                component.document_id =_self.attr('data-document-id');
            }

            /*if(_self.attr('data-step')!=undefined){
             component.step =_self.attr('data-step');
             }

             if(_self.attr('data-journey')!=undefined){
             component.journey =_self.attr('data-journey');
             }*/

            if(_self.attr('data-field-name')!==undefined){
                component.field_name =_self.attr('data-field-name');
            }

            // Follow Me
            if(_self.attr('data-follow-me-title')!==undefined){
                component.link_name =_self.attr('data-follow-me-title');
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

            //console.log(component);
            if(typeof utag!=='undefined' && utag!==undefined){
                utag.track('link', component);
            }
        });
    });

    //--------------------------------------------------
    // end DOCUMENT READY...
    //==================================================


    var emptyPTags= $('table').parent('div').siblings('p');
    if(emptyPTags.length>0){
        $.each(emptyPTags,function(){
            if($(this).is(':empty')){
                $(this).remove();
            }
        });
    }

}());

/*
 function loadArticleAnalytics () {
 var _self=$('.ups-article');
 if(_self.length>0){
 var componentArticle={
 article_title:_self.find('.ups-article-header').text()
 };
 if(_self.find('.ups-article_authorImg').length>0){
 componentArticle.article_author=_self.find('.ups-article_authorImg').text();
 }
 componentArticle.page_section='sec-1';

 componentArticle.content_id=_self.find('.ups-analytics').attr('data-content-id');
 if(typeof window.utag_data!=='undefined' && window.utag_data!==undefined){
 componentArticle.user_type=window.utag_data.user_type;
 componentArticle.site_indicator=window.utag_data.site_indicator;
 componentArticle.page_country_code=window.utag_data.page_country_code;
 componentArticle.state=window.utag_data.state;
 componentArticle.city=window.utag_data.city;
 componentArticle.myups_login_state=window.utag_data.myups_login_state;
 componentArticle.page_language=window.utag_data.page_language;
 }
 //console.log('componentArticle',componentArticle);
 if(typeof utag!=='undefined' && utag!==undefined){
 utag.track('link', componentArticle);

 }
 }
 }*/
/*
 function loadArticleAnalytics () {
 var _self=$('.ups-article');
 if(_self.length>0){
 var componentArticle={
 article_title:_self.find('.ups-article-header').text()
 };
 if(_self.find('.ups-article_authorImg').length>0){
 componentArticle.article_author=_self.find('.ups-article_authorImg').text();
 }
 componentArticle.page_section='sec-1';

 componentArticle.content_id=_self.find('.ups-analytics').attr('data-content-id');
 console.log('componentArticle',componentArticle);
 utag.track('link', componentArticle);
 }
 }

 function loadFeedBasedBlog(){
 var _self=$('.ups-feedBased_blog-wrapper');
 var _selfChild=_self.find('.ups-content_wrap');

 $.each(_selfChild,function(i){
 var componentFeedBased={
 content_title:$(this).find('.ups-article-header').text(),
 content_id:'content_id',
 content_author:'content_author',
 published_date:$(this).find('.ups-article_date').text(),
 page_section:'sec-1'
 };
 console.log('componentFeedBased',componentFeedBased);

 utag.track('link', componentFeedBased);
 });
 }
 $(document).ready(function(){
 setTimeout(function(){
 // loadArticleAnalytics();
 //loadFeedBasedBlog();

 },3000);

 })


 */

function getAccountInfoResponse(response){
    "use strict";

    if ( response.errorCode === 0 ) {
        var profile = response.profile;
        //var msg = profile['firstName'] + ' is ' + profile['age'] + ' years old';
        //alert(msg);
        if(profile.photoURL!==undefined){
            $('.ups-menu.ups-account').find('.ups-menu_toggle').prepend('<img alt="'+profile.firstName+'" class="ups-account_user" src="'+profile.photoURL+'">');
        }
        // $('.ups-account_user').attr('src',profile['photoURL']);
        if(window.localStorage!==undefined){
            window.localStorage.setItem('gigya.profile',profile);
        }
    }
    else {
        console.log('Gigya Authentication Error :' + response.errorMessage,response);
    }
}
$(document).ready(function(){
    "use strict";

    if($("#ups-header").attr('data-islogged')==='true'){
        if(typeof gigya !== 'undefined' && gigya!==undefined){
            gigya.accounts.getAccountInfo({ callback: getAccountInfoResponse });
        }

        // commented as code can't be test
        /*
         if(typeof gigya !== 'undefined' && gigya!==undefined){
         if(window.localStorage!==undefined && window.localStorage.getItem("gigya.profile")==null){
         gigya.accounts.getAccountInfo({ callback: getAccountInfoResponse });
         }else{
         var profileStorage= window.localStorage.getItem("gigya.profile");
         $('.ups-account_user').attr('src',JSON.parse(profileStorage).photoURL);
         }
         }*/
    }

    $(".ups-logout").click(function(){
        window.localStorage.removeItem('gigya.profile');
    });
});

/* 496707 - Add Role attribute to third container fluid */
	if(!$('main').length){
		var thirdContFluid = $('body').find('.container-fluid.iw_section:nth-child(3)');
		$(thirdContFluid).attr('role','main');
	}

function getPagelink(link){
    "use strict";

    var pageLink = "";
    if(link.substring(0, 6) === "/sites" || link.substring(0, 6) === "sites/" ){
        var pageURL = link.substring(link.indexOf("/") + 1);
        pageURL = pageURL.substring(pageURL.indexOf("/") + 1);
        pageURL = pageURL.substring(pageURL.indexOf("/") + 1);
        pageURL = pageURL.substring(0, pageURL.lastIndexOf("."));
        pageLink = '$UPS_LINK[pageURL]';
        pageLink = pageLink.replace("pageURL", pageURL);
    }else{
        pageLink =link;
    }
    return pageLink;
}

/** LIVE Chat functionality implementation **/
function encode64(input) {
    "use strict";
    /*jshint bitwise: false*/
    var keyStr = "ABCDEFGHIJKLMNOP" +
        "QRSTUVWXYZabcdef" +
        "ghijklmnopqrstuv" +
        "wxyz0123456789+/" +
        "=";
    var output = "";
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    do {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
            enc3 = enc4 = 64;
        } else if (isNaN(chr3)) {
            enc4 = 64;
        }
        output = output +
            keyStr.charAt(enc1) +
            keyStr.charAt(enc2) +
            keyStr.charAt(enc3) +
            keyStr.charAt(enc4);
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return output;
    /*jshint bitwise: true*/
}

function createChatURL(appID){
    var str = "",
        $pSU = $('meta[name="DCSext.pSU"]'),
        $pID = $('meta[name="DCSext.pPID"]'),
        $pCC = $('meta[name="DCSext.pCC"]'),
        $pLL = $('meta[name="DCSext.pLL"]'),
        $trackNums = $('input[name=trackNums]');

    if ( $pSU.attr("content") !== undefined && $pSU.attr("content") !== "" ){
        str = "p_appid=" + $pSU.attr("content");
    }else if(obj_live_chat.spa_app_id !== ''){
        str = "p_appid=" + obj_live_chat.spa_app_id;
    }else{
        str = "p_appid=" + "WemContent";
    }

    if(appID !== undefined){
        str = "p_appid=" + appID;
    }

    if ( $pID.attr("content") !== undefined && $pID.attr("content") !== "" ){
        str = str + "&p_pageid=" + $pID.attr("content");
    }else{
        str = str + "&p_pageid=" + utag_data.page_id;
    }

    if ( $pCC.attr("content") !== undefined && $pCC.attr("content") !== "" ){
        str = str + "&p_country=" + $pCC.attr("content");
    }else{
        str = str + "&p_country=" + utag_data.page_country_code;
    }

    if ( $pLL.attr("content") !== undefined && $pLL.attr("content") !== ""){
        str = str + "&p_lang=" + $pLL.attr("content");
    }else{
        str = str + "&p_lang=" + utag_data.page_language;
    }

    if ( $trackNums !== undefined && $trackNums !== "" ){
        var $elem = $trackNums.toArray();
        for(var i=0; i<$elem.length; i++){
            if($elem[i].value !== ""){
                str = str + "&p_trk=" + $elem[i].value;
            }
        }
    }

    return str;
}

$(document).ready(function(){
    "use strict";

    var initialParameter;
    if(typeof obj_live_chat === "undefined" || obj_live_chat.live_chat === ''){
        return;
    }else{
        initialParameter = obj_live_chat.live_chat;
    }

    // store the dom references
    var $emailTrackingChatBtn = $('#uea_chat_header'),
        $trackingAppChatLink = $("#TrackChatLinkId"),
        $headerChatLink = $('header a[href="'+initialParameter+'"]'),
        $footerChatLink = $('footer a[href="'+initialParameter+'"]'),
        $listChatLink = $('.ups-list_help a[href="'+initialParameter+'"]'),
        $secNavChatLink = $('.ups-secnavExtn-links a[href="'+initialParameter+'"]');

    // set the chat url for the following links when the page loads
    if($headerChatLink.length || $footerChatLink.length || $listChatLink.length || $secNavChatLink.length){
        var $LC_items = $("a[href='"+initialParameter+"']");
        var $items = $LC_items.toArray();
        if($items.length){
            var str = createChatURL();
            if(str !== ""){
                str = encode64(str);
                var encodedURI = initialParameter + str;
                for(var i=0; i<$items.length; i++){
                    $items[i].setAttribute("href",encodedURI);
                }
            }
        }
    }

    // !! TEMPORARY FIX (long term solution will be done by the app team)
    // override Get Help link in Tracking App. p_appid should always be com.ups.trackWebLiveChatModule for this link
    if($trackingAppChatLink.length){
        var trackStr = createChatURL("com.ups.trackWebLiveChatModule");
        if(trackStr !== ""){
            trackStr = encode64(trackStr);
            /*jshint scripturl:true*/
            $trackingAppChatLink.attr("href", "javascript:popWrapper('" + initialParameter + trackStr + "','pop_up_full_page')");
            /*jshint scripturl:false*/
        }
    }


    // !! TEMPORARY FIX (long term solution will be done by the app team)
    // override Chat button click from within Email Support application to properly get tracking num and update chat url
    if($emailTrackingChatBtn.length){
        $emailTrackingChatBtn.unbind().on('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            var emailStr = createChatURL();
            if(emailStr !== "" && typeof popWrapper === 'function'){
                popWrapper(initialParameter + encode64(emailStr),'pop_up_full_page');
            }
        });
    }
});
/** LIVE Chat functionality implementation **/
