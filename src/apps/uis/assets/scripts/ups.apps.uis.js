// JavaScript Document
$(function () {
    'use strict';
    
    $('#shippingFeesHide, #shippingFees').hide();
    
    $('#shippingFeesHide').click(function () {
        $('#shippingFees').hide();
        $('#shippingFeesShow').show();
    });
    
    $('#shippingFeesShow').click(function () {
        $('#shippingFees').show();
        $('#shippingFeesHide').hide();
    });

    $('[data-toggle="popover-focus"]').popover({
        trigger: 'focus'
    });
});