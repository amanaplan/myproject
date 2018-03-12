$(function () {
    'use strict';
    
    /*var initDefaultPnls = function() {
        $('div[id^="pnl_"]:not(div[id$="_1"])').hide();
    };
    
    var hidePnlGroup = function (groupNum) {
        $('div[id^=pnl_' + groupNum + ']').hide();
    };
    
    var showPnl = function(groupNum, pnlNum) {
        $('#pnl_' + groupNum + '_' + pnlNum).show();
    };
    
    initDefaultPnls();*/
    
    $('#acctInfoExpPickupContainer').hide();
    $('#pickUpDiffContainer').hide();
    
    $('#acctInfoExpPickup').click(function () {
        if ($('#acctInfoExpPickupContainer').is(':visible')) {
            $('#acctInfoExpPickupContainer').hide();
        } else {
            $('#acctInfoExpPickupContainer').show();
        }
    });
    
    $('input[name="pickUpChoice"]').change(function () {
        if ($(this).val() === '0') {
            $('#pickUpSelectedContainer').show();
            $('#pickUpDiffContainer').hide();
        } else {
            $('#pickUpDiffContainer').show();
            $('#pickUpSelectedContainer').hide();
        }
    });
	
	$('#removePickupDetailsBtn').hide();
    $('#pickupAccountDetailsContainer').hide();
	
	 $('#addPickupDetailsBtn').click(function () {
            $('#addPickupDetailsBtn').hide();
    		$('#pickupAccountDetailsContainer').show();
            $('#removePickupDetailsBtn').show();
     });
	 
	 $('#removePickupDetailsBtn').click(function () {
            $('#addPickupDetailsBtn').show();
    		$('#pickupAccountDetailsContainer').hide();
            $('#removePickupDetailsBtn').hide();
     });
	 
	 $('#showPickupNotificationsDisplayed').hide();
	 $('#hidePickupNotificationsBtn').hide();
	 $('#showPickupNotificationsBtn').click(function () {
		 $('#showPickupNotificationsDisplayed').show();
		 $('#showPickupNotificationsBtn').hide();
		 $('#hidePickupNotificationsBtn').show();
	 });
	 $('#hidePickupNotificationsBtn').click(function () {
		 $('#showPickupNotificationsDisplayed').hide();
		  $('#showPickupNotificationsBtn').show();
		   $('#hidePickupNotificationsBtn').hide();
	 });
    
    /*$('#acctInfoExpPickup2').click(function () {
        if ($('#acctInfoExpPickupContainer2').is(':visible')) {
            $('#acctInfoExpPickupContainer2').hide();
        } else {
            $('#acctInfoExpPickupContainer2').show();
        }
    });
    
    $('#acctInfoExpPickup3').click(function () {
        if ($('#acctInfoExpPickupContainer3').is(':visible')) {
            $('#acctInfoExpPickupContainer3').hide();
        } else {
            $('#acctInfoExpPickupContainer3').show();
        }
    });*/
    
    /* Account Info Section */
    /*$("#acctInfoDefaultBtn").click(function () {
        hidePnlGroup(1);
        showPnl(1, 1);
    });
    
    $("#acctInfoDailyNoPendBtn").click(function () {
        hidePnlGroup(1);
        showPnl(1, 2);
    });
    
    $("#acctInfoWhenNeededBtn").click(function () {
        hidePnlGroup(1);
        showPnl(1, 3);
    });
    
    $("#acctInfoWhenNeededTimeNoSetBtn").click(function () {
        hidePnlGroup(1);
        showPnl(1, 4);
    });
    
    $("#acctInfoWhenNeededTimeSetBtn").click(function () {
        hidePnlGroup(1);
        showPnl(1, 5);
    });*/
    /* End Account Info Section */
});