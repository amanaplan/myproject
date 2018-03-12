/*
 * Javascript utils for SPA & Legacy app support
 * Author: Stephen Redeker
 * Date: 08/02/2016
 *
 */

$(function() {
    'use strict';

    // -------------------------------------------------
    // Detects Right-Rail Legacy Apps and adds ID to Teamsite layout elements for proper CSS overrides.
    // -------------------------------------------------
    (function() {
        var LegacyRightRail = $('#ups-rr_legacy_app_wrap');
        if(LegacyRightRail.length){
            LegacyRightRail.closest('.iw_columns.col-lg-12').attr('id', 'ups-rr-legacy_app_container');
        }
    }());


    // -------------------------------------------------
    // GDOL - WEM Print Results Page Header and Footer
    // -------------------------------------------------
	(function() {
        if ($('#printMain').length > 0) {
            window.UPS.configs.$body.addClass('ups-printPreview');
        }
	}());


	// -------------------------------------------------
	// Script to wrap apps in a <div id="main">
	// -------------------------------------------------
    (function() {
        var $fwLegacy = $(".ups-fw_legacy_app_inner");
        var $rrLegacy = $(".ups-rr_legacy_app_inner");
        var $upsDivMain = $("#main");
        if (!($upsDivMain).length) {
           if (($fwLegacy).length) {
                $fwLegacy.wrapInner('<div id="main"/>');
            } else if (($rrLegacy).length) {
                $rrLegacy.wrapInner('<div id="main"/>');
            }
        }
    }());


    // -------------------------------------------------
    // Check for doAppDiv container and then initialize doApp
    // -------------------------------------------------
    (function() {
        if($('#doAppDiv').length > 0 && typeof angular !== "undefined" && typeof angular.bootstrap !== "undefined"){
            console.log('#doAppDiv found, run angular.bootstrap');
            angular.bootstrap(document.getElementById('doAppDiv'), ['upsDOApp']);
        }
    }());


    // -------------------------------------------------
    // Add support for ICTooltip Plugin as is conflicts with Bootstrap classes
    // -------------------------------------------------
    (function() {
        var anchors = '.hozAnchor, .hintAnchor, .dlgTTAnchor, .ups-tt_legacy',
            $defaultTooltip = $('.ups-appPage .tooltip').addClass('ups-legacy_tooltip'),
            $currentTooltip;

        $('body').on('mouseenter', anchors, function(e) {
            console.log('show tooltip');
            var $target = $(e.currentTarget);

            // if anchor specifies a tooltip container different than the default, use that one instead
            if ($target.attr('data-tooltip') && $target.attr('data-tooltip') !== "#" + $defaultTooltip.attr('id')) {
                $currentTooltip = $($target.attr('data-tooltip')).addClass('ups-legacy_tooltip');
                showTooltip();
            }
            else {
                $currentTooltip = $defaultTooltip;
                showTooltip();
            }
        });

        $('body').on('mouseleave', anchors, function(e) {
            console.log('close tooltip');
            hideTooltip();
        });

        function showTooltip(){
            console.log('tooltip container: ' + $currentTooltip.attr('id'));
            $currentTooltip.removeClass('hidden').addClass('ups-show_tooltip');
        }
        function hideTooltip(){
            $currentTooltip.addClass('hidden').removeClass('ups-show_tooltip');
        }
    }());
});
