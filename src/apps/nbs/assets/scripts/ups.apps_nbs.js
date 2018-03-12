
/***********************************************
**                                            **
**	Payment and Duties/Taxes Page             **
**                                            **
***********************************************/

// Show/Hide CAC if "Enter a different address" radio button is checked.
/*$(function(){
	'use strict';
	//console.log('weoifhjw;oifwihfwuihf');


	$('#alt_cc').hide(); //Alternate Credit Card Payment
	$('#cac').hide(); //Common Address Component
    $("#include_invoice_sec").hide(); //toggle include_invoice_sec and tax ID feild
	$('#switch_error').hide(); //Show when default is reached in switch statement
	$('#ass_acc').hide(); //Associate Account heading copy
	$('#save_lever_4').hide(); //Link this shipment to an account

	var toggleCAC = function(){
		if($(this).val() === 'diffAdd'){
			$('#cac').show();
		}else{
			$('#cac').hide();
		}
	};

	//toggle Default CC Payment
	$('#default_cc_btn').click(function(){
		$('#default_cc').show();
		$('#alt_cc').hide();
	});

	//toggle Alt CC Payment
	$('#alt_cc_btn').click(function(){
		$('#alt_cc').show();
		$('#default_cc').hide();
	});

	//toggle CPC/CAC if choosing to add new card
	$('select[name=savedCard]').change(toggleCAC);

	//toggle bill my account feilds
	$('select[name=selAcc]').change(function(){
		if($(this).val() === 'new'){
			$('#bma_section').show();
		}else{
			$('#bma_section').hide();
		}
	});

	//toggle CAC using CPC "diffadd" radio button
	$('input[name="ups-sameBillingAddress"]').change(toggleCAC);

	//toggle content using "select a payment method" radio group
	$('input[name=ups-cpm-tile]').change(toggleCAC);

	//toggle include_invoice_sec and tax ID feild
	$("#ups-include_invoice_cb").click(function(event) {
		if ($(this).is(":checked")){
			$("#include_invoice_sec").show();
			//toggle tax ID feild
			$("#include_invoice").click(function(event) {
				if ($(this).is(":checked")){
				  $("#tax_ID_for_invoice_sec").show();
				}else{
				  $("#tax_ID_for_invoice_sec").hide();
				}
			});
		}else{
		  $("#include_invoice_sec").hide();
		}
	});

	//toggle "nickname for this address"
	$("#bma_sta").click(function(event) {
		if ($(this).is(":checked")){
			$("#bma_nickname").show();
		}else{
			$("#bma_nickname").hide();
		}
	});

	//toggle "nickname for this address"
	$("#dt_bma_sta").click(function(event) {
		if ($(this).is(":checked")){
			$("#dt_bma_nickname_js").show();
		}else{
			$("#dt_bma_nickname_js").hide();
		}
	});

	$('button').click(function(e){
		var idClicked = e.target.id;

		if(idClicked !== 'promoToApply'){
			$('#switch_error').hide(); //Show when default is reached in switch statement

			//Make sure all fields are hidden before showing various states
			$('#est_dt').hide(); //Estimated duties / taxes heading copy
			$('#ass_acc').hide(); //Associate Account heading copy
			$('#wwyltd_js').hide(); //What would you like to do select box
			$('#crfdat').hide(); //What would you like to do select box
			$('#has_saved_js').hide(); //Select Account
			$('#bma_section_js').hide(); //HTML content block
			$('#dt_accName_js').hide(); //Account Name
			$('#save_lever_1').hide(); //Save account lever
			$('#save_lever_2').hide(); //Save account to {xxx} address book lever
			$('#save_lever_3').hide(); //Make this my saved third party account
			$('#save_lever_4').hide(); //Link this shipment to an account
			$('#dt_bma_nickname_js').hide(); //Nickname for this address
			$('#dt_tp_country_js').hide(); //Country or Territory input
			$('#dt_tp_popcountry_js').hide(); //Populated Country or Territory input
			$('#dt_bma_js').hide(); // Use this as my defaultaccount lever
			$('#billMe_cb_js').hide(); //Bill Me checkbox
			$('#promo').hide(); //Have a Promo Code
			$('#temp_id').hide(); //Associate Your Account filler copy


			switch(idClicked){
				case 'clear_btn' :
					//Hide all feilds
					break;
				case 'ss1yn_pwadts_btn' :
					$('#est_dt').show(); //Estimated duties / taxes heading copy
					$('#wwyltd_js').show(); //What would you like to do select box
					$('select option[value="apple"]').text('Bill account {XNNXNX} for duties and taxes'); //What would you like to do select option
					break;
				case 'ss1yy_pwadtma_btn' :
					$('#est_dt').show(); //Estimated duties / taxes heading copy
					$('#wwyltd_js').show(); //What would you like to do
					$('#bma_section_js').show(); //HTML content block
					$('#dt_accName_js').show(); //Account Name
					$('#dt_tp_popcountry_js').show(); //Populated Country or Territory input
					$('#save_lever_1').show(); //Save account lever
					$('#dt_bma_js').show(); // Use this as my defaultaccount lever
					$('#dt_bma_nickname_js').show(); //Nickname for this address
					$('select option[value="apple"]').text('Bill my account'); //What would you like to do select option
					$('#accNumLabel_js').text('Account Number'); //Account Number
					$('#accNum_jsHelpherTxt').text('6 to 9 digits, found on weekly invoice'); //Account Number subheader Text
					break;
				case 'ss1yy_pwadtmasa_btn' :
					$('#est_dt').show(); //Estimated duties / taxes heading copy
					$('#wwyltd_js').show(); //What would you like to do
					$('#has_saved_js').show(); //Select Account
					$('#dt_accName_js').show(); //Account Name
					$('#dt_bma_js').show(); // Use this as my defaultaccount lever
					$('#selAccLabel_js').text('Select Account'); //Select Account Label
					$('select option[value="orange"]').text('{nickname - nnxnn}'); //Select Account Option
					break;
				case 'ss2yy_pwadtmasa_btn' :
					$('#est_dt').show(); //Estimated duties / taxes heading copy
					$('#wwyltd_js').show(); //What would you like to do
					$('#has_saved_js').show(); //Select Account
					$('#bma_section_js').show(); //HTML content block
					$('#dt_accName_js').show(); //Account Name
					$('#dt_tp_popcountry_js').show(); //Populated Country or Territory input
					$('#save_lever_1').show(); //Save account lever
					$('#dt_bma_js').show(); // Use this as my defaultaccount lever
					$('#dt_bma_nickname_js').show(); //Nickname for this address
					$('select option[value="orange"]').text('Bill my account'); //What would you like to do select option
					$('#selAccLabel_js').text('Select Account'); //Select Account Label
					$('#accNumLabel_js').text('Account Number'); //Account Number
					$('#accNum_jsHelpherTxt').text('6 to 9 digits, found on weekly invoice'); //Account Number subheader Text
					break;
				case 'sr2yn_pwadtrb_btn' :
					$('#est_dt').show(); //Estimated duties / taxes heading copy
					$('#wwyltd_js').show(); //What would you like to do select box
					$('#crfdat').show(); //What would you like to do select box
					$('select option[value="apple"]').text('Charge reciever for duties and taxes'); //What would you like to do select option
					break;
				case 'sr2yy_pwadtra_btn' :
					$('#est_dt').show(); //Estimated duties / taxes heading copy
					$('#wwyltd_js').show(); //What would you like to do select box
					$('#bma_section_js').show(); //HTML content block
					$('#dt_tp_popcountry_js').show(); //Populated Country or Territory input
					$('#dt_bma_nickname_js').show(); //Nickname for this address
					$('#save_lever_2').show(); //Save account to {xxx} address book lever
					$('select option[value="apple"]').text('Bill receivers account'); //What would you like to do select option
					$('#accNumLabel_js').text('Reciever Account Number'); //Account Number
					$('#accNum_jsHelpherTxt').text('6 to 9 digits, found on weekly invoice'); //Account Number subheader Text
					break;
				case 'ssr2yy_pwadstrb_btn' :
					$('#est_dt').show(); //Estimated duties / taxes heading copy
					$('#wwyltd_js').show(); //What would you like to do select box
					$('#has_saved_js').show(); //Select Account
					$('#crfdat').show(); //What would you like to do select box
					$('select option[value="apple"]').text('Bill Account {XNNXN} for duties only'); //What would you like to do select option
					$('#selAccLabel_js').text('How should tax be charged?'); //Select Account Label
					$('select option[value="orange"]').text('Charge taxes to receiver'); //Select Account Option
					break;
				case 'ssr2yy_pwadstra_btn' :
					$('#est_dt').show(); //Estimated duties / taxes heading copy
					$('#wwyltd_js').show(); //What would you like to do select box
					$('#has_saved_js').show(); //Select Account
					$('#bma_section_js').show(); //HTML content block
					$('#dt_tp_popcountry_js').show(); //Populated Country or Territory input
					$('#save_lever_2').show(); //Save account to {xxx} address book lever
					$('select option[value="apple"]').text('Bill receivers account'); //What would you like to do select option
					$('#selAccLabel_js').text('How should tax be charged?'); //Select Account Label
					$('select option[value="orange"]').text('Bill recievers account'); //Select Account Option
					$('#accNumLabel_js').text('Reciever Account Number'); //Account Number
					$('#accNum_jsHelpherTxt').text('6 to 9 digits, found on weekly invoice'); //Account Number subheader Text
					break;
				case 'stp2yy_pwadttpa_btn' :
					$('#est_dt').show(); //Estimated duties / taxes heading copy
					$('#wwyltd_js').show(); //What would you like to do select box
					$('#bma_section_js').show(); //HTML content block
					$('#dt_tp_country_js').show(); //Country or Territory input
					$('#save_lever_3').show(); //Make this my saved third party account
					$('select option[value="apple"]').text('Bill a third party account'); //What would you like to do select option
					$('#accNumLabel_js').text('Third Party Account Number'); //Account Number
					$('#accNum_jsHelpherTxt').text('6 to 9 digits, found on weekly invoice'); //Account Number subheader Text
					break;
				case 'liod_btn' :
					$('#ass_acc').show(); //Associate Account heading copy
					$('#save_lever_4').show(); //Link this shipment to an account
					break;
				case 'lirednsa_btn' :
					$('#ass_acc').show(); //Associate Account heading copy
					$('#temp_id').show(); //Associate Your Account filler copy
					$('#bma_section_js').show(); //HTML content block
					$('#dt_accName_js').show(); //Account Name
					$('#dt_tp_popcountry_js').show(); //Populated Country or Territory input
					$('#promo').show(); //Have a Promo Code
					$('#accNumLabel_js').text('Account Number'); //Account Number
					$('#accNum_jsHelpherTxt').text('6 to 9 digits, found on weekly invoice'); //Account Number subheader Text
					break;
				case 'liredsa_btn' :
					$('#ass_acc').show(); //Associate Account heading copy
					$('#temp_id').show(); //Associate Your Account filler copy
					$('#has_saved_js').show(); //Select Account
					$('#promo').show(); //Have a Promo Code
					$('#selAccLabel_js').text('Select Account'); //Select Account Label
					$('select option[value="orange"]').text('{nickname - nnxxnn}'); //Select Account Option
					break;
				case 'lioednsa_btn' :
					$('#ass_acc').show(); //Associate Account heading copy
					$('#temp_id').show(); //Associate Your Account filler copy
					$('#save_lever_4').show(); //Link this shipment to an account
					$('#bma_section_js').show(); //HTML content block
					$('#dt_accName_js').show(); //Account Name
					$('#dt_tp_popcountry_js').show(); //Populated Country or Territory input
					$('#promo').show(); //Have a Promo Code
					$('#accNumLabel_js').text('Account Number'); //Account Number
					$('#accNum_jsHelpherTxt').text('6 to 9 digits, found on weekly invoice'); //Account Number subheader Text
					break;
				case 'lioedsa_btn' :
					$('#ass_acc').show(); //Associate Account heading copy
					$('#save_lever_4').show(); //Link this shipment to an account
					$('#has_saved_js').show(); //Select Account
					$('#promo').show(); //Have a Promo Code
					$('#selAccLabel_js').text('Select Account'); //Select Account Label
					$('select option[value="orange"]').text('{nickname - nnxnn}'); //Select Account Option
					break;
				}
		}
	});


});*/

$(function(){
	'use strict';

    $('#payCacFields').hide();
    $('#ups-sameBillingAddress').prop('checked', true);
    $('#billReceiverShipCharges').prop('checked', true);

    $('#billReceiverSaved').hide();
    $('#billReceiverSavedEdit').hide();
    $('#billThirdPartySaved').hide();
    $('#billThirdPartySavedMultiple').hide();
    $('#billThirdPartyNoneSaved').hide();
    $('#billConsigneeNoneSaved').hide();
    $('#billConsigneeSaved').hide();
    $('#billMyAccountSaved').hide();
    $('#billThirdPartySavedEdit').hide();

	$('#paypalLoggedInNoneSaved').hide();
	$('#paypalLoggedInSavedAltAccts').hide();
	$('#pymtCardLoggedInSavedCardsAddNewSelected').hide();

    $('#addNewAccountProfile').hide();
	$('#cpc_values2').hide();
    $('#upsCPCNicknameField').hide();

    $('#billMyAccountSavedOver15').hide();

    $('input[name="ups-cpm-tile"]').change(function () {
        switch ($(this).val()) {
            case '1' :
                $('.ups-payment_section').hide();
                $('#billMyAccountSection').show();
            break;
            case '2' :
                $('.ups-payment_section').hide();
                $('#billSomeoneElseSection').show();
            break;
            case '3' :
                $('.ups-payment_section').hide();
                $('#otherWaysToPaySection').show();
            break;
            default :
                $('.ups-payment_section').hide();
                $('#paymentCardSection').show();
            break;
        }
    });

    $('input[name="ups-sameBillingAddress"]').change(function () {
        if ($(this).val() === 'diffAdd') {
            $('#payCacFields').show();
        } else {
            $('#payCacFields').hide();
        }
    });

    $('#demoBillReceiverSavedBtn').click(function () {
        $('#bill-someone-else-tile').prop('checked', true).change();
        $('#billReceiverShipCharges').prop('checked', true).change();
        $('#billReceiverSaved').show();
        $('#billReceiverNoneSaved').hide();
    });

    $('#demoBillReceiverNotSavedBtn').click(function () {
        $('#bill-someone-else-tile').prop('checked', true).change();
        $('#billReceiverShipCharges').prop('checked', true).change();
        $('#billReceiverNoneSaved').show();
        $('#billReceiverSaved').hide();
    });

    $('#billReceiverEditBtn').click(function () {
        $('#billReceiverSavedEdit').show();
        $('#billReceiverSavedView').hide();
    });

    $('#billReceiverCancelEditBtn').click(function () {
        $('#billReceiverSavedView').show();
        $('#billReceiverSavedEdit').hide();
    });

    $('input[name="billShipCharges"]').change(function () {
    //        if ($(this).val() === '0') {
    //            $('#billReceiverNoneSaved').show();
    //            $('#billReceiverSaved').hide();
    //            $('#billThirdPartyNoneSaved').hide();
    //            $('#billThirdPartySavedMultiple').hide();
    //            $('#billThirdPartySaved').hide();
    //        } else {
    //            $('#billThirdPartyNoneSaved').show();
    //            $('#billReceiverNoneSaved').hide();
    //            $('#billReceiverSaved').hide();
    //            $('#billThirdPartySavedMultiple').hide();
    //            $('#billThirdPartySaved').hide();
    //        }
		switch ($(this).val()) {
			case '0':
				$('#billReceiverNoneSaved').show();
				$('#billReceiverSaved').hide();
				$('#billThirdPartyNoneSaved').hide();
				$('#billThirdPartySavedMultiple').hide();
				$('#billThirdPartySaved').hide();
				$('#billConsigneeNoneSaved').hide();
				$('#billConsigneeSaved').hide();
				break;
			case '1':
				$('#billThirdPartyNoneSaved').show();
				$('#billReceiverNoneSaved').hide();
				$('#billReceiverSaved').hide();
				$('#billThirdPartySavedMultiple').hide();
				$('#billThirdPartySaved').hide();
				$('#billConsigneeNoneSaved').hide();
				$('#billConsigneeSaved').hide();
				break;
			case '2':
				$('#billConsigneeNoneSaved').show();
				$('#billReceiverNoneSaved').hide();
				$('#billReceiverSaved').hide();
				$('#billThirdPartyNoneSaved').hide();
				$('#billThirdPartySavedMultiple').hide();
				$('#billThirdPartySaved').hide();
				$('#billConsigneeSaved').hide();
				break;
		}
    });

    $('#demoBillThirdPartySavedBtn').click(function () {
        $('#bill-someone-else-tile').prop('checked', true).change();
        $('#billThirdPartyShipCharges').prop('checked', true).change();
        $('#billThirdPartySaved').show();
        $('#billThirdPartySavedMultiple').hide();
        $('#billThirdPartyNoneSaved').hide();
    });

    $('#demoBillThirdPartySavedMultipleBtn').click(function () {
        $('#bill-someone-else-tile').prop('checked', true).change();
        $('#billThirdPartyShipCharges').prop('checked', true).change();
        $('#billThirdPartySaved').hide();
        $('#billThirdPartySavedMultiple').show();
        $('#billThirdPartyNoneSaved').hide();
    });

    $('#demoBillThirdPartyNoneBtn').click(function () {
        $('#bill-someone-else-tile').prop('checked', true).change();
        $('#billThirdPartyShipCharges').prop('checked', true).change();
        $('#billThirdPartySaved').hide();
        $('#billThirdPartySavedMultiple').hide();
        $('#billThirdPartyNoneSaved').show();
    });

    $('#saveNewAcct').change(function () {
        if ($(this).is(':checked')) {
            $('#saveAccountContainer').show();
        } else {
            $('#saveAccountContainer').hide();
        }
    });

    $('#saveNewAcct2').change(function () {
        if ($(this).is(':checked')) {
            $('#saveAccountContainer2').show();
        } else {
            $('#saveAccountContainer2').hide();
        }
    });

    $('#demoBillMyAcctSavedBtn').click(function () {
        $('#billMyAccountSavedOver15').hide();
        $('#billMyAccountSavedUnder11').show();
        $('#bill-account-tile').prop('checked', true).change();
        $('#billMyAccountNoneSaved').hide();
        $('#billMyAccountSaved').show();
    });

    $('#demoBillMyAcctNoneSavedBtn').click(function () {
        $('#bill-account-tile').prop('checked', true).change();
        $('#billMyAccountNoneSaved').show();
        $('#billMyAccountSaved').hide();
    });

    $('#billMyAcctNewBtn').click(function () {
        $('#addNewAccountProfile').show();
    });

	$('#addNewCardLink').click(function () {
		$('#cpc_values2').toggle();
	});

    $('#demoBillMyAcctOver15Btn').click(function () {
		console.log('Come on and work');
        $('#billMyAccountSavedUnder11').hide();
        $('#billMyAccountNoneSaved').hide();
        $('#billMyAccountSavedOver15').show();
        $('#billMyAccountSaved').show();
    });

    $('#editThirdPartySavedBtn').click(function () {
        $('#billThirdPartySavedEdit').show();
        $('#billThirdPartySavedView').hide();
    });

    $('#canelThirdPartySavedBtn').click(function () {
        $('#billThirdPartySavedEdit').hide();
        $('#billThirdPartySavedView').show();
    });

    $('#editConsigneeSavedBtn').click(function () {
        $('#billConsigneeSavedEdit').show();
        $('#billConsigneeSavedView').hide();
    });

    $('#canelConsigneeSavedBtn').click(function () {
        $('#billConsigneeSavedEdit').hide();
        $('#billConsigneeSavedView').show();
    });

    /***********************************************/

    $('#dutiesChargeMyAcct').hide();
    $('#dutiesChargeMyAcctNone').hide();

    $('#dutiesChargeMyAcctSavedMultiple').hide();
    $('#dutiesChargeMyAcctSavedDefault').hide();
    $('#dutiesChargeMyAcctSaved').hide();
    $('#dutiesChargeReceiverAcct').hide();
    $('#dutiesChargeThirdParty').hide();
    $('#dutiesOnlyBillAccount').hide();

    $('#dutiesChargeReceiverSaved').hide();
    $('#dutiesChargeThirdPartySaved').hide();

    $('#dutiesOnlyBillReceiverAcctNone').hide();
    $('#dutiesOnlyBillReceiverAcctSaved').hide();

    $('#dutiesPayOption').change(function () {
        switch ($(this).val()) {
            case '1' :
                $('#dutiesChargeReceiverAcct').hide();
                $('#dutiesChargeReceiver').hide();
                $('#dutiesChargeMyAcct').show();
                $('#dutiesChargeMyAcctNone').show();
                $('#dutiesChargeMyAcctSaved').hide();
                $('#dutiesChargeMyAcctSavedMultiple').hide();
                $('#dutiesChargeThirdParty').hide();
                $('#dutiesOnlyBillAccount').hide();
            break;
            case '2':
                $('#dutiesChargeReceiverAcct').show();
                $('#dutiesChargeReceiver').hide();
                $('#dutiesChargeMyAcct').show();
                $('#dutiesChargeMyAcctNone').hide();
                $('#dutiesChargeMyAcctSaved').hide();
                $('#dutiesChargeMyAcctSavedMultiple').hide();
                $('#dutiesChargeThirdParty').hide();
                $('#dutiesOnlyBillAccount').hide();
            break;
            case '3':
                $('#dutiesChargeReceiverAcct').hide();
                $('#dutiesChargeReceiver').hide();
                $('#dutiesChargeMyAcct').show();
                $('#dutiesChargeMyAcctNone').hide();
                $('#dutiesChargeMyAcctSaved').hide();
                $('#dutiesChargeMyAcctSavedMultiple').hide();
                $('#dutiesChargeThirdParty').show();
                $('#dutiesOnlyBillAccount').hide();
            break;
            case '4':
                $('#dutiesChargeReceiverAcct').hide();
                $('#dutiesChargeReceiver').hide();
                $('#dutiesChargeMyAcct').show();
                $('#dutiesChargeMyAcctNone').hide();
                $('#dutiesChargeMyAcctSaved').hide();
                $('#dutiesChargeMyAcctSavedMultiple').hide();
                $('#dutiesChargeThirdParty').hide();
                $('#dutiesOnlyBillAccount').hide();
            break;
            case '5':
                $('#dutiesChargeReceiverAcct').hide();
                $('#dutiesChargeReceiver').show();
                $('#dutiesChargeMyAcct').hide();
                $('#dutiesChargeMyAcctNone').hide();
                $('#dutiesChargeMyAcctSaved').hide();
                $('#dutiesChargeMyAcctSavedMultiple').hide();
                $('#dutiesChargeThirdParty').hide();
                $('#dutiesOnlyBillAccount').show();
            break;
            default :
                $('#dutiesChargeReceiverAcct').hide();
                $('#dutiesChargeReceiver').show();
                $('#dutiesChargeMyAcct').hide();
                $('#dutiesChargeMyAcctNone').hide();
                $('#dutiesChargeMyAcctSaved').hide();
                $('#dutiesChargeMyAcctSavedMultiple').hide();
                $('#dutiesChargeThirdParty').hide();
                $('#dutiesOnlyBillAccount').hide();
            break;
        }
    });


    $('#dutiesOnlyPayTaxesSel').change(function () {
        switch ($(this).val()) {
            case '1':
                $('#dutiesOnlyBillReceiverAcctNone').show();
            break;
            default:
                $('#dutiesOnlyBillReceiverAcctNone').hide();
            break;
        }
    });


    $('#demoDutiesBillAcctSavedBtn').click(function () {
        $('#dutiesChargeMyAcctNone').hide();
        $('#dutiesChargeMyAcctSaved').show();
        $('#dutiesChargeMyAcctSavedMultiple').hide();
        $('#dutiesChargeMyAcctSavedDefault').hide();
    });

    $('#demoDutiesBillAcctSavedMultipleBtn').click(function () {
        $('#dutiesChargeMyAcctNone').hide();
        $('#dutiesChargeMyAcctSaved').show();
        $('#dutiesChargeMyAcctSavedMultiple').show();
        $('#dutiesChargeMyAcctSavedDefault').show();
    });

    $('#demoDutiesBillAcctNoneBtn').click(function () {
        $('#dutiesChargeMyAcctNone').show();
        $('#dutiesChargeMyAcctSaved').hide();
        $('#dutiesChargeMyAcctSavedMultiple').hide();
        $('#dutiesChargeMyAcctSavedDefault').hide();
    });


    $('#demoDutiesBillReceiverAcctSavedBtn').click(function () {
        $('#dutiesChargeReceiverNone').hide();
        $('#dutiesChargeReceiverSaved').show();
    });

    $('#demoDutiesBillReceiverAcctNoneBtn').click(function () {
        $('#dutiesChargeReceiverNone').show();
        $('#dutiesChargeReceiverSaved').hide();
    });

    $('#demoDutiesBillThirdPartyAcctSavedBtn').click(function () {
        $('#dutiesChargeThirdPartyNone').hide();
        $('#dutiesChargeThirdPartySaved').show();
    });

    $('#demoDutiesBillThirdPartyAcctNoneBtn').click(function () {
        $('#dutiesChargeThirdPartyNone').show();
        $('#dutiesChargeThirdPartySaved').hide();
    });


    $('#demoDutiesOnlyReceiverSavedBtn').click(function () {
        $('#dutiesOnlyBillReceiverAcctNone').hide();
        $('#dutiesOnlyBillReceiverAcctSaved').show();
    });

    $('#demoDutiesOnlyReceiverNoneBtn').click(function () {
        $('#dutiesOnlyBillReceiverAcctNone').show();
        $('#dutiesOnlyBillReceiverAcctSaved').hide();
    });

    $('#acctDiscountContainer').hide();

    $('input[name="useAcctDiscount"]').change(function () {
        if ($(this).is(':checked')) {
            $('#acctDiscountContainer').show();
        } else {
            $('#acctDiscountContainer').hide();
        }
    });

    $('#associateAcctSaved').hide();

    $('#demoAssociateAccountSavedBtn').click(function () {
        $('#associateAcctSaved').show();
        $('#associateAcctNone').hide();
    });

    $('#demoAssociateAccountNoneBtn').click(function () {
        $('#associateAcctSaved').hide();
        $('#associateAcctNone').show();
    });


    $('#promoCodeContainer').hide();

    $('input[name="promoCode"]').change(function () {
        if ($(this).is(':checked')) {
            $('#promoCodeContainer').show();
        } else {
            $('#promoCodeContainer').hide();
        }
    });

    $('#associateAcctContainer').hide();

    $('#demoShowAssociateAcctBtn').click(function () {
        $('#associateAcctContainer').show();
        $('#useAccountDiscount').prop('checked', false);
        $('#useDiscountContainer').hide();
    });

    $('#demoShowAcctDiscountBtn').click(function () {
        $('#associateAcctContainer').hide();
        $('#useDiscountContainer').show();
    });

	$('#demoPayAtStoreBtn').click(function () {
		$('#payAtStoreAddInvoice').show();
		$('#paypalLoggedInNoneSaved').hide();
		$('#paypalLoggedInSavedAltAccts').hide();
		$('#pymtCardLoggedInSavedCardsAddNewSelected').hide();
	});
	$('#demoPayPalLoggedInNoneSavedBtn').click(function () {
		$('#paypalLoggedInNoneSaved').show();
		$('#payAtStoreAddInvoice').hide();
		$('#paypalLoggedInSavedAltAccts').hide();
		$('#pymtCardLoggedInSavedCardsAddNewSelected').hide();
	});
	$('#demoPayPalLoggedInSavedAltAccounts').click(function () {
		$('#paypalLoggedInNoneSaved').hide();
		$('#payAtStoreAddInvoice').hide();
		$('#paypalLoggedInSavedAltAccts').show();
		$('#pymtCardLoggedInSavedCardsAddNewSelected').hide();
	});
	$('#demoPayPalLoggedInSavedCardsAddNewSel').click(function () {
		$('#paypalLoggedInNoneSaved').hide();
		$('#payAtStoreAddInvoice').hide();
		$('#paypalLoggedInSavedAltAccts').hide();
		$('#pymtCardLoggedInSavedCardsAddNewSelected').show();
	});


    /***********************************************************/

    $('#promoRemoveBtn').hide();
    $('#promoAppliedLink').hide();

    $('#promoApplyBtn').click(function () {
        $(this).hide();
        $('#promoRemoveBtn').show();
        $('#promoAppliedLink').show();
    });

    $('#promoRemoveBtn').click(function () {
        $(this).hide();
        $('#promoApplyBtn').show();
        $('#promoAppliedLink').hide();
    });

    $('#ups-cpc_save_payment').change(function () {
        if ($(this).is(':checked')) {
            $('#upsCPCNicknameField').show();
        } else {
            $('#upsCPCNicknameField').hide();
        }
    });

});

/***********************************************
**                                            **
**	Single Page Shipping                      **
**                                            **
***********************************************/
$(function () {
	'use strict';

	$('.ups-app_single_page #packagesAddReference').change(function () {
		if ($(this).is(':checked')) {
			$('#referenceNumbers').removeClass('hidden');
		} else {
			$('#referenceNumbers').addClass('hidden');
		}
	});

	$('.ups-app_single_page #packagesAddCod').change(function () {
		if ($(this).is(':checked')) {
			$('#cod').removeClass('hidden');
		} else {
			$('#cod').addClass('hidden');
		}
	});

	$('.ups-app_single_page #whenSchedulePickup').change(function () {
		if ($(this).is(':checked')) {
			$('#schedulePickup').removeClass('hidden');
		} else {
			$('#schedulePickup').addClass('hidden');
		}
	});

	$('.ups-app_single_page #useDifferentPickupAddress').change(function () {
		if ($(this).is(':checked')) {
			$('#differentPickupAddress').removeClass('hidden');
		} else {
			$('#differentPickupAddress').addClass('hidden');
		}
	});

	$('#upsPaymentMethodTile0, #upsPaymentMethodTile1, #upsPaymentMethodTile2, #upsPaymentMethodTile3, #upsPaymentMethodTile4')
		.click(function () {
		$('.ups-payment_method_section').hide();
		$('#paymentMethods .ups-boxed_radio').removeClass('ups-gold');

		$(this).parent().addClass('ups-gold');
	});

	$('#upsPaymentMethodTile0').click(function () {
		$('#paymentCardSection').show();
	});

	$('#upsPaymentMethodTile1').click(function () {
		$('#paymentBillReceiverSection').show();
	});

	$('#upsPaymentMethodTile2').click(function () {
		$('#paymentBillAccountSection').show();
	});

	$('#upsPaymentMethodTile3').click(function () {
		$('#paymentBillThirdPartySection').show();
	});

	$('#upsPaymentMethodTile4').click(function () {
		$('#paymentBillAlternateSection').show();
	});

	$('#upsPaymentMethodTile5').click();

	$('.ups-app_single_page #packagesSame').change(function () {
		if ($(this).is(':checked')) {
			$('.ups-app_single_page #addPackageBtn').addClass('hidden');
			$('.ups-app_single_page #packagesNotSame1, .ups-app_single_page #packagesAllSameHeader').addClass('hidden');
		} else {
			$('.ups-app_single_page #addPackageBtn').removeClass('hidden');
			$('.ups-app_single_page #packagesNotSame1, .ups-app_single_page #packagesAllSameHeader').removeClass('hidden');
		}
	});


	$('.ups-app_single_page #numPackages').change(function () {
		if ($(this).val() !== '1') {
			$('.ups-app_single_page #packagesSame').parent().parent().removeClass('hidden');
		} else {
			$('.ups-app_single_page #packagesSame').prop('checked', true).trigger('change');
			$('.ups-app_single_page #packagesSame').parent().parent().addClass('hidden');
		}
	});

	$('#editReturnFields, #editFromFields').hide();

	$('#editFromAddressBtn').click(function () {
		if ($('#editFromFields').is(':visible')) {
			$('#editFromFields').hide();
			$('#editFromText').show();
			$(this).text('Edit');
		} else {
			$('#editReturnFields').hide();
			$('#editFromText').hide();
			$('#editFromFields').show();
			$(this).text('Cancel');
		}
	});

	$('#editReturnAddressBtn').click(function () {
		if ($('#editReturnFields').is(':visible')) {
			$('#editReturnFields').hide();
			$('#editReturnText').show();
			$(this).text('Edit');
		} else {
			//$('#editReturnFields').hide();
			$('#editReturnText').hide();
			$('#editReturnFields').show();
		}
	});
});


/***********************************************
**                                            **
**	UPS Balance Bar Widget                    **
**                                            **
***********************************************/

/* End of NBS Balance Bar Widget */

/* Quick Quote Edit Link */

/*$('#editPackageDetails').click(function () {
	if ($('#editFromFields').is(':visible')) {
		$('#editFromFields').hide();
		$('#editFromText').show();
		$(this).text('Edit');
	} else {
		$('#editReturnFields').hide();
		$('#editFromText').hide();
		$('#editFromFields').show();
		$(this).text('Cancel');
	}
});*/

/* End of Quick Quote Edit Link */


/***********************************************
**                                            **
**	Begin_Shipment (To/From) Page             **
**                                            **
***********************************************/

//Begin Afftene's JS


$(function () {
	'use strict';

	/*Default State of the Page */


	/*Hides From and Return PlayBack*/
	$('#fromPlayback').hide();
	$('#returnPlayback').hide();

	/*Hides Return Title*/
	$('#returnTitle').hide();

	/*Hides Return Form*/
	$('#returnColumn').hide();

	/*Hides To Title*/
	$('#toTitle').hide();

	/*Hides To Form*/
	$('#toColumn').hide();

	/*Hides Back Button*/
	$('#upsBack').hide();

	/*Hides Error Message*/
	$('#toErrorMessage').hide();

	//Hides Error States
	$('.toErrorState').hide();

	//Hides Items in the Alternate States
	$('.gtShipAgain, #nickname, #toSaveCont, #applyShp, #myAddy, #applyShp2, #rtnPrfAdd, #ctLtDrpdn, #svDfRtn, #svDfAdd, #addGroup, #ctLtRow, #editLinkForSavedAddress, #ctLtRow2, #ctLtRow3, #svEdAdd, #svEdAdd2, #svNwEnt, #svNwEnt2, #nicknameAdd, #nicknameAdd2, #returnToUIS, #savedAddressRow1').hide();

	/**************************************
	Fixes Continue Button - DO NOT DELETE*/
	$('#upsCont').off();

	/*This function works*/
	$('#upsCont').click(function() {
		console.log('gg');
	});

	/**************************************/


	 // Adds "active" Class to Return Lever, Continue Button
	 $('#addDifferentReturn').change(function() {

		  if($(this).is(":checked")){
			$('#upsCont').removeClass('active');
		  }else{
			$('#upsCont').addClass('active');
		  }

	  });

	  //Adds click function to Edit link in the From Playback section
	  $('#fromEdit').click(function() {
		  $('#fromColumn, #fromTitle').show(200);
		  $('#returnColumn, #returnTitle, #toColumn, #toTitle, #fromPlayback, #returnPlayback').hide(200);
	  });

	  $('#returnEdit').click(function() {
		  $('#returnColumn, #returnTitle').show(200);
		  $('#fromColumn, #fromTitle, #toColumn, #toTitle, #fromPlayback, #returnPlayback').hide(200);
	  });

	//Creates Two User Paths for if/when customer notes that he/she has a different return address
	function clickedContinue() {

		//if customer clicks the return lever...
		if ($('#upsCont').hasClass('active')) {

			//hide the From Column and Title...
			$('#fromColumn, #fromTitle').hide();

			//show the return Column and Title and from Playback
			$('#returnColumn, #returnTitle, #fromPlayback').show();

			//shows the 'From' playback  and adds a tabindex of -1
			$('#fromPlayback').show(250).attr('tabindex','-1');

		} else {
			//hides the 'from&return Column and title'
			$('#fromColumn, #fromTitle, #returnTitle, #returnColumn').hide();

			//show the 'to Column and Title' and from/return Playback
			$('#toTitle, #toColumn, #fromPlayback, #returnPlayback').show();

			//shows the 'From' playback  and adds a tabindex of -1
			$('#fromPlayback, #returnPlayback').show(250).attr('tabindex','-1');

		}
			//Scrolls to the top of the Progress Bar
			$('body').animate({
					scrollTop: $('#ups-main > div.ups-page-title.ups-wrap').offset().top
				}, 300);

			//Makes the Back Button appear
			$('#upsBack').show();

			//Error Message shows on To Screen
			$('#toErrorMessage').show();
	}

	$('#upsCont').click(clickedContinue);

	//Error On-Click States

	$('#cyErrBtn').click(function() {
		  $('.cyErr').toggle();
	  });

 	$('#stErrBtn').click(function() {
		  $('.stErr').toggle();
	  });
	$('#zipErrBtn').click(function() {
		  $('.zipErr').toggle();
	  });
	$('#addErrBtn').click(function() {
		  $('.addErr').toggle();
	  });

	//Alternate On-Click States
	$('#gtShipBtn').click(function() {
		$('.gtShipAgain').toggle();
	});

	/*Opens the Modal
	$('#gtUSCA').click(function() {
		$('#ups-begin_shipment_modal').toggle();
	});*/

	//Close the Modal
	$('#closeModal').click(function() {
		$('#ups-begin_shipment_modal').hide();
	});

	//Testing To See If This Page Is Updating

	//On-Click for Alternate Log-in Bar
	$('#altLogIn').click(function() {
		$('#logIn, #returnToUIS').toggle();
	});

	//On-Click for Logged In - With A Single My Address UPS Account(s)/Profile Discount
	$('#prfDisc').click(function() {
		$('#applyShp').show();
		$('#ctLtRow').show();
		$('#nickname').show();
		$('#address_text_fields').show();
		$('#toCountryRow').show();
		$('#nameRow').show();
		$('#cityStZpRow').show();
		$('#emlPhExt').show();
		$('#enterANewReturnText').show();
		$('#rtnPrfAdd').hide();
		$('#applyShp2').hide();
		$('#svDfRtn').hide();
		$('#myAddy').hide();
		$('#addGroup').hide();
		$('#ctLtRow2').hide();
		$('#svEdAdd2').hide();
	});

	//On-Click for Logged In - With A Single My Address - With Return Profile Address
	$('#rtnProf').click(function() {
		$('#applyShp').show();
		$('#ctLtRow').show();
		$('#nickname').show();
		$('#rtnPrfAdd').show();
		$('#address_text_fields').show();
		$('#toCountryRow').show();
		$('#nameRow').show();
		$('#cityStZpRow').show();
		$('#emlPhExt').show();
		$('#enterANewReturnText').hide();
		$('#applyShp2').hide();
		$('#svDfRtn').hide();
		$('#myAddy').hide();
		$('#addGroup').hide();
		$('#ctLtRow2').hide();
		$('#svEdAdd2').hide();

	});

	//On-Click for Logged In - With A Single My Address - Edit Return Address
	$('#editRtn').click(function() {
		$('#applyShp').show();
		$('#ctLtRow').show();
		$('#svDfRtn').show();
		//$('#savedAddressRow1').show();
		$('#address_text_fields').show();
		$('#toCountryRow').show();
		$('#nameRow').show();
		$('#cityStZpRow').show();
		$('#emlPhExt').show();
		$('#enterANewReturnText').hide();
		$('#applyShp2').hide();
		$('#rtnPrfAdd').hide();
		$('#nickname').hide();
		$('#myAddy').hide();
		$('#addGroup').hide();
		$('#ctLtRow2').hide();
		$('#svEdAdd2').hide();

	});


	//On-Click for Logged In - With Multiple My Address - Default Address Selected
	$('#dftAdd').click(function() {
		$('#myAddy').show();
		$('#applyShp2').show();
		$('#ctLtRow').show();
		$('#nickname').show();
		$('#address_text_fields').show();
		$('#toCountryRow').show();
		$('#nameRow').show();
		$('#cityStZpRow').show();
		$('#emlPhExt').show();
		$('#enterANewReturnText').show();
		$('#checkMyDiscountLink3').show();
		$('#checkMyDiscountsLink1').hide();
		$('#rtnPrfAdd').hide();
		$('#applyShp').hide();
		$('#svDfRtn').hide();
		$('#svDfAdd').hide();
		$('#addGroup').hide();
		$('#ctLtRow2').hide();
		$('#svEdAdd2').hide();
	});


	//On-Click for Logged In - With Multiple My Address - NON Default Address Selected
	$('#nonDftAdd').click(function() {
		$('#applyShp').show();
		$('#myAddy').show();
		$('#ctLtRow').show();
		$('#svDfAdd').show();
		$('#enterANewReturnText').show();
		$('#addGroup').show();
		$('#editLinkForSavedAddress').show();
		$('#nickname').hide();
		$('#checkMyDiscountsLink2').hide();
		$('#toCountryRow').hide();
		$('#nameRow').hide();
		$('#cityStZpRow').hide();
		$('#emlPhExt').hide();
		$('#address_text_fields').hide();
		$('#ctLtRow2').hide();
		$('#svEdAdd2').hide();
		//$('#applyShp, #myAddy, #svDfAdd, #addGroup,  #ctLtRow, #ctLtRow > div.col-xs-2, #myAddy > div.ups-no_label, #toCountryRow, #nameRow, #cityStZpRow, #emlPhExt, #toColumn > div.ups-form_group.ups-form_required, #toColumn > div:nth-child(5), #toColumn > div:nth-child(6)').toggle();
		$("#myAddyDropdown option[value='{NON Default My Address Nickname}'], #contactListDropdown option[value='B']").attr('selected','selected');
	});

	//On-Click for Logged In - Edit Recipient Contact List Address
	$('#editReci').click(function() {
		$('#applyShp').show();
		$('#myAddy').show();
		$('#svDfAdd').show();
		$('#ctLtRow2').show();
		$('#svEdAdd2').show();
		$('#address_text_fields').show();
		$('#toCountryRow').show();
		$('#nameRow').show();
		$('#cityStZpRow').show();
		$('#emlPhExt').show();
		$('#editLinkForSavedAddress').show();
		$('#myAddy > div.ups-no_label').show();
		$('#addGroup').hide();
		$('#applyShp2').hide();
		$('#nickname').hide();
	});

	$('#svEdAdd2').click(function() {
		$('#svNwEnt2').toggle();
	});

	$('#svNwEnt2').click(function() {
		$('#nicknameAdd2').toggle();
	});

	//On-Click for Logged In - Edit Shippers Address

	$('#editShip').click(function() {
		$('#applyShp').show();
		$('#ctLtRow3').show();
		$('#address_text_fields').show();
		$('#toCountryRow').show();
		$('#nameRow').show();
		$('#cityStZpRow').show();
		$('#emlPhExt').show();
		$('#svEdAdd').show();
		$('#frmDiffRtn').show();
		$('#addDifferentReturn').show();
		$('#nickname').hide();
		$('#addGroup').hide();
		$('#applyShp2').hide();
		$('#editLinkForSavedAddress').hide();
		$('#myAddy > div.ups-no_label').hide();
		$('#ctLtRow2').hide();
		$('#svEdAdd2').hide();
		$('#ctLtRow').hide();
		$('#fromPlayback').hide();
		$('#returnPlayback').hide();
	});
	$('#svEdAdd').click(function() {
		$('#svNwEnt, #nicknameAdd, #svDfAdd').show();
	});

});
/***********************************************
** END JS FOR BEGIN_SHIPMENT (TO/FROM) PAGES 	*
************************************************/


/***********************************************
**                                            **
**	UPS Quick Quote Reveal                    **
**                                            **
***********************************************/
$(function () {
	'use strict';
	$('#upsQuoteSection').hide();

	$('#upsGetQuoteBtn').click(function () {
		$('#upsQuoteSection').show();
	});
});


/***********************************************
**                                            **
**	UPS Service/When/How                      **
**                                            **
***********************************************/
$(function () {
	'use strict';
	/*
    $('#ups-sch_pickup_checkbox').click(function() {
		if( $('#ups-sch_pickup_checkbox').is(':checked')) {
			$('#repl_id_datepicker01').addClass(' hidden ');
			$('#repl_id_shift').removeClass('col-sm-6')
				.addClass(' col-md-12 ');
			$('#repl_id_pickup_block').removeClass('hidden');
		} else {
			$('#repl_id_datepicker01').removeClass('hidden');
			$('#repl_id_shift').removeClass(' col-md-12 ')
				.addClass('col-sm-6');
			$('#repl_id_pickup_block').addClass('hidden');
		}
	});
	$('#ups-dif_add_checkbox').click(function() {
		if( $('#ups-dif_add_checkbox').is(':checked')) {
			$('#repl_id_contact_block').addClass('hidden');
			$('#repl_id_address_block').removeClass('hidden');
		} else {
			$('#repl_id_address_block').addClass('hidden');
			$('#repl_id_contact_block').removeClass('hidden');
		}
	});
	$('#repl_id_edit_add').click(function() {
		if( $('#repl_id_prepoulated_add').is(':visible')) {
			$('#repl_id_prepoulated_add').addClass('hidden');
			$('#repl_id_address_block').removeClass('hidden');
			$('#repl_id_edit_add').text('cancel');
		} else {
			$('#repl_id_address_block').addClass('hidden');
			$('#repl_id_prepoulated_add').removeClass('hidden');
			$('#repl_id_edit_add').text('edit');
		}
	});*/
	//End Will's JS

	//Begin Andrew's JS

	//initial property set / hiding
	$('#shipmentEntrancePickup').prop('checked', true);
    $('#shipmentDeliveryReceiver').prop('checked', true);
    $('#shipmentEntranceOptions2').prop('checked', true);

    $('#shipmentAltLocationView').hide();

    $('#shipmentEntrancePickupUnavailable').hide();
    $('#shipmentEntranceOptions2').hide();

    $('#includeCurrentShipmentOptions').hide();
    $('#shipmentPickupIncludeNextPickupOption').hide();

	$('#shipmentDropoffView').hide();
    $('#editPickup').hide();
    $('#editPickupTime').hide();
    $('#apLocatorContainer').hide();

    $('#pickupInEditTxt').hide();
    $('#pickupTimeInEditTxt').hide();
    $('#pickupOnCallScheduled').hide();
	$('#pickupDailyDefault').hide();
    $('#pickupDailyAddOnCall').hide();
	$('#pickupDaySpecificScheduledToday').hide();
    $('#pickupDaySpecificNotScheduledToday').hide();
	$('#pickupDaySpecificOnePendingPickup').hide();
    $('#pickupDaySpecificNotScheduledTodayOnCall').hide();
    $('#pickupDaySpecificNotScheduledTodayOnCallNo').hide();
	$('#pickupOtherAvailableNotSelected').hide();

    $('#smartPreviouslyforAccountYesIncludePickup').hide();
    $('#smartPreviouslyforAccountDropOff').hide();
    $('#smartPreviouslyforAccountSchedule').hide();
    $('#smartRequestedPendingOnCall').hide();
	$('#smartRequestedAddOnCall').hide();
	$('#smartRequestedPastNotifyTime').hide();
    $('#smartNotPreviouslyforAccountYesIncludePickup').hide();
    $('#smartOccuredYesPickupNoNotToday, #smartOccuredYesPickupNoNotToday2').hide();
    $('#smartAccountInProfileNotIncludeToday').hide();
    $('#smartAccountInProfileMultipleNoPickup').hide();
    $('#smartRequestedInclude').hide();
    $('#smartPreviouslyforAccount').hide();
    $('#smartNotPreviouslyforAccount').hide();
	$('#smartNotRequested').hide();
    $('#smartOccuredYesPickup').hide();
    $('#smartAccountInProfile').hide();
    $('#smartAccountInProfileMultiple').hide();

    $('#wwxf').hide();
    $('#wwxfDropoffOptions').hide();
    $('#wwxfAirportNoResults').hide();
    $('#wwxfTooHeavy').hide();
    $('#wwxfNotResponding').hide();
    $('#wwxfHoldForPickup').hide();
    $('#wwxfDropoff').hide();
    $('#wwxfDropoffNotAvailable').hide();

    $('#yesRadioLiftGate').hide();

    $('#rateTbl4').hide();
    $('#rateTbl2dayWeekend').hide();
    $('#rateTbl2day').hide();
    $('#rateTbl2dayAlt').hide();
    $('#rateTbl1day').hide();

    $('#holdLocation').hide();

    $('p[id^=lithiumBatterPackagingInfo]').hide();

    //$('#apLocatorContainer').hide();

    /**
     ** Used to hide all states of shipping_schedule_partialthat are not
     ** used by WorldWideFreight and show the one that is.
     **/

    var defaultScheduleTable = function () {
        $('#rateTbl5').show();
        $('#rateTbl4').hide();
        $('#rateTbl2dayWeekend').hide();
        $('#rateTbl2day').hide();
        $('#rateTbl2dayAlt').hide();
        $('#rateTbl1day').hide();
    };

	$('input[name=shipmentEntrance]').change(function () {
		if ($(this).val() === '0') {
			$('#shipmentDropoffView').show();
			$('#shipmentPickupView').hide();
			$('#pickupDaySpecificScheduledToday').hide();
			$('#pickupOnCallScheduled').hide();
			$('#pickupDailyDefault').hide();
			$('#pickupDailyAddOnCall').hide();
			$('#pickupDaySpecificNotScheduledToday').hide();
			$('#pickupDaySpecificNotScheduledTodayOnCall').hide();
			$('#pickupDaySpecificOnePendingPickup').hide();
			$('#pickupOtherAvailableNotSelected').hide();
			$('#smartPreviouslyforAccount').hide();
			$('#smartRequestedAddOnCall').hide();
			$('#smartRequestedPastNotifyTime').hide();
			$('#smartNotPreviouslyforAccount').hide();
			$('#smartOccuredYesPickup').hide();
			$('#smartAccountInProfile').hide();
			$('#smartAccountInProfileMultiple').hide();
			$('#smartRequestedInclude').hide();
			$('#smartRequestedPendingOnCall').hide();
			$('#smartNotRequested').hide();
			$('#wwxf').hide();
			$('#wwxfAirportNoResults').hide();
			$('#wwxfTooHeavy').hide();
			$('#wwxfNotResponding').hide();
            $('#wwxfUPSDelivery').hide();
            $('#wwxfHoldForPickup').hide();
            $('#wwxfDropoff').show();
            $('#wwxfDropoffNotAvailable').hide();
		} else {
			$('#shipmentDropoffView').hide();
			$('#shipmentPickupView').show();
			$('#wwxfUPSDelivery').show();
            $('#wwxfDropoff').hide();
		}
	});

    /*  $('#shipmentEntranceDroppedOff').click(function () {
        if($('#shipmentDropoffView').is(':visible')) {
		 	$('#pickupOnCallScheduled').show();
			$('#pickupDailyDefault').show();
			$('#pickupDailyAddOnCall').show();
			$('#pickupDaySpecificScheduledToday').show();
			$('#pickupDaySpecificNotScheduledToday').show();
			$('#pickupDaySpecificOnePendingPickup').show();
			$('#smartPreviouslyforAccountYesIncludePickup').show();
			$('#smartPreviouslyforAccountDropOff').show();
			$('#smartPreviouslyforAccountSchedule').show();
			$('#smartRequestedPendingOnCall').show();
			$('#smartRequestedAddOnCall').show();
			$('#smartRequestedPastNotifyTime').show();
			$('#smartNotPreviouslyforAccountYesIncludePickup').show();
			$('#smartOccuredYesPickupNoNotToday, #smartOccuredYesPickupNoNotToday2').show();
			$('#smartAccountInProfileNotIncludeToday').show();
			$('#smartAccountInProfileMultipleNoPickup').show();
			$('#smartRequestedInclude').show();
			$('#wwxfDropoffOptions').show();

			$('#includeCurrentShipmentOptions').show();
			$('#shipmentPickupIncludeNextPickupOption').show();
			$('#pickupDaySpecificNotScheduledTodayOnCall').show();
			$('#pickupDaySpecificNotScheduledTodayOnCallNo').show();
			$('#pickupOtherAvailableNotSelected').show();
			$('#smartPreviouslyforAccount').show();
			$('#smartNotPreviouslyforAccount').show();
			$('#smartNotRequested').show();
			$('#smartOccuredYesPickup').show();
			$('#smartAccountInProfile').show();
			$('#smartAccountInProfileMultiple').show();
			$('#wwxf').show();
			$('#wwxfAirportNoResults').show();
			$('#wwxfTooHeavy').show();
			$('#wwxfNotResponding').show();
		} else {

			$('#pickupOnCallScheduled').hide();
			$('#pickupDailyDefault').hide();
			$('#pickupDailyAddOnCall').hide();
			$('#pickupDaySpecificScheduledToday').hide();
			$('#pickupDaySpecificNotScheduledToday').hide();
			$('#pickupDaySpecificOnePendingPickup').hide();
			$('#smartPreviouslyforAccountYesIncludePickup').hide();
			$('#smartPreviouslyforAccountDropOff').hide();
			$('#smartPreviouslyforAccountSchedule').hide();
			$('#smartRequestedPendingOnCall').hide();
			$('#smartRequestedAddOnCall').hide();
			$('#smartRequestedPastNotifyTime').hide();
			$('#smartNotPreviouslyforAccountYesIncludePickup').hide();
			$('#smartOccuredYesPickupNoNotToday, #smartOccuredYesPickupNoNotToday2').hide();
			$('#smartAccountInProfileNotIncludeToday').hide();
			$('#smartAccountInProfileMultipleNoPickup').hide();
			$('#smartRequestedInclude').hide();
			$('#wwxfDropoffOptions').hide();

			$('#includeCurrentShipmentOptions').hide();
			$('#shipmentPickupIncludeNextPickupOption').hide();
			$('#pickupDaySpecificNotScheduledTodayOnCall').hide();
			$('#pickupDaySpecificNotScheduledTodayOnCallNo').hide();
			$('#pickupOtherAvailableNotSelected').hide();
			$('#smartPreviouslyforAccount').hide();
			$('#smartNotPreviouslyforAccount').hide();
			$('#smartNotRequested').hide();
			$('#smartOccuredYesPickup').hide();
			$('#smartAccountInProfile').hide();
			$('#smartAccountInProfileMultiple').hide();
			$('#wwxf').hide();
			$('#wwxfAirportNoResults').hide();
			$('#wwxfTooHeavy').hide();
			$('#wwxfNotResponding').hide();
		}
	   });
    */


    $('#editPickupBtn').click(function () {
        if ($('#editPickup').is(':visible')) {
            $('#pickupInEditTxt').hide();
            $('#pickupNotInEditTxt').show();
            $('#editPickup').hide();
            $('#noEditPickup').show();
        } else {
            $('#pickupNotInEditTxt').hide();
            $('#pickupInEditTxt').show();
            $('#editPickup').show();
            $('#noEditPickup').hide();
            $('#pickupName').focus();
        }
    });

    $('#pickupTimeEditBtn').click(function () {
        if ($('#editPickupTime').is(':visible')) {
            $('#pickupTimeInEditTxt').hide();
            $('#pickupTimeNotInEditTxt').show();
            $('#editPickupTime').hide();
            $('#noEditPickupTime').show();
        } else {
            $('#pickupTimeNotInEditTxt').hide();
            $('#pickupTimeInEditTxt').show();
            $('#editPickupTime').show();
            $('#noEditPickupTime').hide();
            $('#pickupEarliestTime').focus();
        }
    });

    $('#onCallScheduledBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').show();
		$('#shipmentEntrancePickupContainer').show();
		$('#shipmentEntrancePickupUnavailable').hide();

        $('#pickupDaySpecificScheduledToday').hide();
        $('#pickupOnCallScheduled').show();
		$('#pickupDailyDefault').hide();
        $('#pickupDailyAddOnCall').hide();
	    $('#pickupDaySpecificNotScheduledToday').hide();
        $('#pickupDaySpecificNotScheduledTodayOnCall').hide();
		$('#pickupDaySpecificOnePendingPickup').hide();
		$('#pickupOtherAvailableNotSelected').hide();
        defaultScheduleTable();
    });

	$('#pickupDailyDefaultBtn').click(function () {
		$('#shipmentDropoffView').hide();
		$('#shipmentPickupView').hide();
		$('#shipmentEntranceOptions').show();
		$('input[name=shipmentEntrance]').attr('checked', true);
		$('#shipmentEntrancePickupContainer').show();
		$('#shipmentEntrancePickupUnavailable').hide();

		$('#pickupDaySpecificScheduledToday').hide();
		$('#pickupOnCallScheduled').hide();
		$('#pickupDailyDefault').show();
		$('#pickupDailyAddOnCall').hide();
		$('#pickupDaySpecificNotScheduledToday').hide();
		$('#pickupDaySpecificNotScheduledTodayOnCall').hide();
		$('#pickupDaySpecificOnePendingPickup').hide();
		$('#pickupOtherAvailableNotSelected').hide();
        defaultScheduleTable();
	});

	$('#dailyAddOnCallBtn').click(function () {
		$('#shipmentDropoffView').hide();
		$('#shipmentPickupView').hide();
		$('#shipmentEntranceOptions').show();

		$('#pickupDaySpecificScheduledToday').hide();
		$('#pickupOnCallScheduled').hide();
		$('#pickupDailyDefault').hide();
		$('#pickupDailyAddOnCall').show();
		$('#pickupDaySpecificNotScheduledToday').hide();
		$('#pickupDaySpecificNotScheduledTodayOnCall').hide();
		$('#pickupDaySpecificOnePendingPickup').hide();
		$('#pickupOtherAvailableNotSelected').hide();
        defaultScheduleTable();
	});

    $('#daySpecificScheduledTodayBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').hide();

        $('#pickupDaySpecificScheduledToday').show();
        $('#pickupOnCallScheduled').hide();
        $('#pickupDailyAddOnCall').hide();
        $('#pickupDailyDefault').hide();
		$('#pickupDaySpecificNotScheduledToday').hide();
        $('#pickupDaySpecificNotScheduledTodayOnCall').hide();
		$('#pickupDaySpecificOnePendingPickup').hide();
		$('#pickupOtherAvailableNotSelected').hide();
        defaultScheduleTable();
    });

    $('#includeCurrentShipment').change(function () {
        if ($(this).prop('checked')) {
            $('#includeCurrentShipmentOptions').hide();
        } else {
            $('#includeCurrentShipmentOptions').show();
        }
    });

    $('#daySpecificNotScheduledTodayBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').hide();

        $('#pickupDaySpecificScheduledToday').hide();
        $('#pickupOnCallScheduled').hide();
        $('#pickupDailyDefault').hide();
		$('#pickupDailyAddOnCall').hide();
		$('#pickupDaySpecificNotScheduledToday').show();
        $('#pickupDaySpecificNotScheduledTodayOnCall').hide();
		$('#pickupDaySpecificOnePendingPickup').hide();
		$('#pickupOtherAvailableNotSelected').hide();
        defaultScheduleTable();
    });

    $('#shipmentGoOutToday').change(function () {
        if ($(this).prop('checked')) {
            $('#shipmentPickupIncludeNextPickupOption').hide();
        } else {
            $('#shipmentPickupIncludeNextPickupOption').show();
        }
    });

    $('#daySpecificNotScheduledTodayOnCallBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').hide();

        $('#pickupDaySpecificScheduledToday').hide();
        $('#pickupOnCallScheduled').hide();
		$('#pickupDailyDefault').hide();
        $('#pickupDaySpecificNotScheduledToday').hide();
        $('#pickupDaySpecificNotScheduledTodayOnCall').show();
		$('#pickupOtherAvailableNotSelected').hide();
		$('#pickupDaySpecificOnePendingPickup').hide();
        defaultScheduleTable();
    });

    $('#shipmentGoOutToday2').change(function () {
        if ($(this).prop('checked')) {
            $('#pickupDaySpecificNotScheduledTodayOnCallYes').show();
            $('#pickupDaySpecificNotScheduledTodayOnCallNo').hide();
        } else {
            $('#pickupDaySpecificNotScheduledTodayOnCallYes').hide();
            $('#pickupDaySpecificNotScheduledTodayOnCallNo').show();
        }
    });

	$('#daySpecificOnePendingPickupBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').show();

        $('#pickupDaySpecificScheduledToday').hide();
        $('#pickupOnCallScheduled').hide();
		$('#pickupDailyDefault').hide();
		$('#pickupDailyAddOnCall').hide();
        $('#pickupDaySpecificNotScheduledToday').hide();
        $('#pickupDaySpecificNotScheduledTodayOnCall').hide();
		$('#pickupDaySpecificOnePendingPickup').show();
        defaultScheduleTable();
    });

	$('#pickupOtherAvailableNotSelectedBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').show();

        $('#pickupDaySpecificScheduledToday').hide();
        $('#pickupOnCallScheduled').hide();
		$('#pickupDailyDefault').hide();
		$('#pickupDailyAddOnCall').hide();
        $('#pickupDaySpecificNotScheduledToday').hide();
        $('#pickupDaySpecificNotScheduledTodayOnCall').hide();
		$('#pickupDaySpecificOnePendingPickup').hide();
		$('#pickupOtherAvailableNotSelected').show();
        defaultScheduleTable();
    });

	$('#smartRequestedIncludeBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').show();

        $('#smartRequestedInclude').show();
        $('#smartPreviouslyforAccount').hide();
		$('#smartRequestedPendingOnCall').hide();
        $('#smartNotPreviouslyforAccount').hide();
		$('#smartRequestedAddOnCall').hide();
		$('#smartRequestedPastNotifyTime').hide();
		$('#smartNotRequested').hide();
        $('#smartOccuredYesPickup').hide();
        $('#smartAccountInProfile').hide();
        $('#smartAccountInProfileMultiple').hide();
        defaultScheduleTable();
    });

    $('#smartPreviouslyforAccountBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').hide();

        $('#smartPreviouslyforAccount').show();
		$('#smartRequestedAddOnCall').hide();
		$('#smartRequestedPendingOnCall').hide();
        $('#smartNotPreviouslyforAccount').hide();
		$('#smartNotRequested').hide();
        $('#smartOccuredYesPickup').hide();
        $('#smartAccountInProfile').hide();
        $('#smartAccountInProfileMultiple').hide();
		$('#smartRequestedPastNotifyTime').hide();
		$('#smartRequestedInclude').hide();
        defaultScheduleTable();
    });
    $('#smartRequestedPendingOnCallBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').show();

        $('#smartPreviouslyforAccount').hide();
		$('#smartPreviouslyforAccountYesIncludePickup').hide();
        $('#smartRequestedPendingOnCall').show();
        $('#smartNotPreviouslyforAccount').hide();
		$('#smartNotRequested').hide();
		$('#smartRequestedAddOnCall').hide();
		$('#smartRequestedPastNotifyTime').hide();
        $('#smartOccuredYesPickup').hide();
        $('#smartAccountInProfile').hide();
        $('#smartAccountInProfileMultiple').hide();
	    $('#smartRequestedInclude').hide();
        defaultScheduleTable();
    });
    $('#includeCurrentShipment2').change(function () {
        if ($(this).prop('checked')) {
            $('#smartPreviouslyforAccountNoIncludePickup').show();
            $('#smartPreviouslyforAccountYesIncludePickup').hide();
        } else {
            $('#smartPreviouslyforAccountNoIncludePickup').hide();
            $('#smartPreviouslyforAccountYesIncludePickup').show();
        }
    });

    $('input[name=shipmentPickupScheduleOption4]').change(function () {
        if ($(this).val() === '2') {
            $('#smartPreviouslyforAccountSchedule').show();
            $('#smartPreviouslyforAccountDropOff').hide();
            $('#smartPreviouslyforAccountIncludeShipment').hide();
        } else if ($(this).val() === '1') {
            $('#smartPreviouslyforAccountSchedule').hide();
            $('#smartPreviouslyforAccountDropOff').show();
            $('#smartPreviouslyforAccountIncludeShipment').hide();
        } else {
            $('#smartPreviouslyforAccountSchedule').hide();
            $('#smartPreviouslyforAccountDropOff').hide();
            $('#smartPreviouslyforAccountIncludeShipment').show();
        }
    });

    $('#smartNotPreviouslyforAccountBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').hide();

        $('#smartPreviouslyforAccount').hide();
		$('#smartRequestedPendingOnCall').hide();
		$('#smartRequestedAddOnCall').hide();
        $('#smartNotPreviouslyforAccount').show();
		$('#smartNotRequested').hide();
        $('#smartOccuredYesPickup').hide();
        $('#smartAccountInProfile').hide();
        $('#smartAccountInProfileMultiple').hide();
		$('#smartRequestedPastNotifyTime').hide();
		$('#smartRequestedInclude').hide();
        defaultScheduleTable();
    });

	$('#smartNotRequestedBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').show();

        $('#smartPreviouslyforAccount').hide();
        $('#smartNotPreviouslyforAccount').hide();
		$('#smartNotRequested').show();
		$('#smartRequestedAddOnCall').hide();
		$('#smartRequestedPastNotifyTime').hide();
        $('#smartOccuredYesPickup').hide();
        $('#smartAccountInProfile').hide();
        $('#smartAccountInProfileMultiple').hide();
	    $('#smartRequestedInclude').hide();
        defaultScheduleTable();
    });

    $('#includeCurrentShipment3').change(function () {
        if ($(this).prop('checked')) {
            $('#smartNotPreviouslyforAccountNoIncludePickup').show();
            $('#smartNotPreviouslyforAccountYesIncludePickup').hide();
        } else {
            $('#smartNotPreviouslyforAccountNoIncludePickup').hide();
            $('#smartNotPreviouslyforAccountYesIncludePickup').show();
        }
    });

    $('#smartOccuredYesPickupBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').hide();

		$('#smartPreviouslyforAccount').hide();
		$('#smartRequestedPendingOnCall').hide();
		$('#smartRequestedAddOnCall').hide();
        $('#smartNotPreviouslyforAccount').hide();
        $('#smartOccuredYesPickup').show();
        $('#smartAccountInProfile').hide();
        $('#smartAccountInProfileMultiple').hide();
		$('#smartRequestedPastNotifyTime').hide();
		$('#smartRequestedInclude').hide();
		$('#smartNotRequested').hide();
        defaultScheduleTable();
    });

    $('#smartOccuredYesPickupAlreadyCompletedBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').hide();

	    $('#smartPreviouslyforAccount').hide();
		$('#smartRequestedPendingOnCall').hide();
		$('#smartRequestedAddOnCall').hide();
        $('#smartNotPreviouslyforAccount').hide();
        $('#smartOccuredYesPickup').show();
        $('#smartAccountInProfile').hide();
        $('#smartAccountInProfileMultiple').hide();
		$('#smartRequestedPastNotifyTime').hide();
        $('#smartOccuredYesPickupAlreadyCompleted').show();
		$('#smartRequestedInclude').hide();
		$('#smartNotRequested').hide();
    });

    $('#shipmentGoOutToday3').change(function () {
        if ($(this).prop('checked')) {
            $('#smartOccuredYesPickupNoNotToday, #smartOccuredYesPickupNoNotToday2').hide();

        } else {
            $('#smartOccuredYesPickupNoNotToday, #smartOccuredYesPickupNoNotToday2').show();
        }
    });

	$('#smartRequestedAddOnCallBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').show();

		$('#smartPreviouslyforAccount').hide();
		$('#smartRequestedAddOnCall').show();
		$('#smartRequestedPastNotifyTime').hide();
		$('#smartRequestedPendingOnCall').hide();
        $('#smartNotPreviouslyforAccount').hide();
        $('#smartOccuredYesPickup').hide();
        $('#smartAccountInProfile').hide();
        $('#smartAccountInProfileMultiple').hide();
	    $('#smartRequestedInclude').hide();
		$('#smartNotRequested').hide();
        defaultScheduleTable();
    });

	$('#smartRequestedPastNotifyTimeBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').show();

		$('#smartPreviouslyforAccount').hide();
		$('#smartRequestedAddOnCall').hide();
		$('#smartRequestedPastNotifyTime').show();
		$('#smartRequestedPendingOnCall').hide();
        $('#smartNotPreviouslyforAccount').hide();
        $('#smartOccuredYesPickup').hide();
        $('#smartAccountInProfile').hide();
        $('#smartAccountInProfileMultiple').hide();
	    $('#smartRequestedInclude').hide();
		$('#smartNotRequested').hide();
        defaultScheduleTable();
    });

    $('#smartAccountInProfileBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').show();

		$('#smartPreviouslyforAccount').hide();
		$('#smartRequestedAddOnCall').hide();
		$('#smartRequestedPendingOnCall').hide();
        $('#smartNotPreviouslyforAccount').hide();
		$('#smartNotRequested').hide();
        $('#smartOccuredYesPickup').hide();
        $('#smartAccountInProfile').show();
        $('#smartAccountInProfileMultiple').hide();
		$('#smartRequestedInclude').hide();
		$('#smartRequestedPastNotifyTime').hide();
        defaultScheduleTable();
    });

    $('#shipmentGoOutToday4').change(function () {
        if ($(this).prop('checked')) {
            $('#smartAccountInProfileNotIncludeToday').hide();
            $('#smartAccountInProfileIncludeToday').show();
        } else {
            $('#smartAccountInProfileNotIncludeToday').show();
            $('#smartAccountInProfileIncludeToday').hide();
        }
    });

    $('#smartAccountInProfileMultipleBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').hide();

        $('#pickupDaySpecificScheduledToday').hide();
        $('#pickupOnCallScheduled').hide();
		$('#pickupDailyDefault').hide();
        $('#pickupDaySpecificNotScheduledToday').hide();
        $('#pickupDaySpecificNotScheduledTodayOnCall').hide();
		$('#pickupOtherAvailableNotSelected').hide();
		$('#pickupDaySpecificOnePendingPickup').hide();
		$('#pickupDailyAddOnCall').hide();
	    $('#smartPreviouslyforAccount').hide();
		$('#smartRequestedAddOnCall').hide();
		$('#smartRequestedPendingOnCall').hide();
        $('#smartNotPreviouslyforAccount').hide();
		$('#smartNotRequested').hide();
        $('#smartOccuredYesPickup').hide();
        $('#smartAccountInProfile').hide();
        $('#smartAccountInProfileMultiple').show();
		$('#smartRequestedPastNotifyTime').hide();
		$('#smartRequestedInclude').hide();
        defaultScheduleTable();
    });

    $('#shipmentGoOutToday5').change(function () {
        if ($(this).prop('checked')) {
            $('#smartAccountInProfileMultipleYesPickup').show();
            $('#smartAccountInProfileMultipleNoPickup').hide();
        } else {
            $('#smartAccountInProfileMultipleYesPickup').hide();
            $('#smartAccountInProfileMultipleNoPickup').show();

        }
    });

    $('#wwxfBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').hide();

        $('#wwxf').show();
        $('#wwxfAirportNoResults').hide();
        $('#wwxfTooHeavy').hide();
        $('#wwxfNotResponding').hide();
        $('#wwxfUPSDelivery').hide();
        $('#wwxfHoldForPickup').hide();
        $('#wwxfDropoff').hide();
        $('#wwxfDropoffNotAvailable').hide();
    });

    $('#wwxfUPSDeliveryBtn').click(function () {
        $("#shipmentEntranceDroppedOff").prop("checked", false);
        $("#shipmentEntrancePickup").prop("checked", true);
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').show();

        $('#wwxf').hide();
        $('#wwxfAirportNoResults').hide();
        $('#wwxfTooHeavy').hide();
        $('#wwxfNotResponding').hide();
        $('#wwxfUPSDelivery').show();
        $('#wwxfHoldForPickup').hide();
        $('#wwxfDropoff').hide();
        $('#wwxfDropoffNotAvailable').hide();
    });

    $('#wwxfHoldForPickupBtn').click(function () {
        $("#shipmentEntranceDroppedOff").prop("checked", false);
        $("#shipmentEntrancePickup").prop("checked", true);
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').show();

        $('#wwxf').hide();
        $('#wwxfAirportNoResults').hide();
        $('#wwxfTooHeavy').hide();
        $('#wwxfNotResponding').hide();
        $('#wwxfUPSDelivery').hide();
        $('#wwxfHoldForPickup').show();
        $('#wwxfDropoff').hide();
        $('#wwxfDropoffNotAvailable').hide();
    });

    $('#wwxfDropoffBtn').click(function () {
        $("#shipmentEntranceDroppedOff").prop("checked", true);
        $("#shipmentEntrancePickup").prop("checked", false);
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').show();

        $('#wwxf').hide();
        $('#wwxfAirportNoResults').hide();
        $('#wwxfTooHeavy').hide();
        $('#wwxfNotResponding').hide();
        $('#wwxfUPSDelivery').hide();
        $('#wwxfHoldForPickup').hide();
        $('#wwxfDropoff').show();
        $('#wwxfDropoffNotAvailable').hide();
    });

    $('#wwxfDropoffNotAvailableBtn').click(function () {
        $("#shipmentEntranceDroppedOff").prop("checked", true);
        $("#shipmentEntrancePickup").prop("checked", false);
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').show();

        $('#wwxf').hide();
        $('#wwxfAirportNoResults').hide();
        $('#wwxfTooHeavy').hide();
        $('#wwxfNotResponding').hide();
        $('#wwxfUPSDelivery').hide();
        $('#wwxfHoldForPickup').hide();
        $('#wwxfDropoff').hide();
        $('#wwxfDropoffNotAvailable').show();
    });

    $('#shipmentPickup').change(function () {
        if ($(this).prop('checked')) {
            $('#wwxfPickupOptions').show();
            $('#wwxfDropoffOptions').hide();
        } else {
            $('#wwxfPickupOptions').hide();
            $('#wwxfDropoffOptions').show();
        }
    });

    $('#wwxfLocNotAvailableBtn').click(function () {
        $('#wwxfBtn').click();

        $('#shipmentPickup').prop('checked', false).trigger('change');
    });

    $('#wwxfLocAirportNoResultsBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').hide();

        $('#wwxf').show();
        $('#wwxfAirportNoResults').show();
        $('#wwxfTooHeavy').hide();
        $('#wwxfNotResponding').hide();
        $('#wwxfUPSDelivery').hide();
        $('#wwxfHoldForPickup').hide();
        $('#wwxfDropoff').hide();
        $('#wwxfDropoffNotAvailable').hide();
    });

    $('#wwxfTooHeavyBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').hide();

        $('#wwxf').hide();
        $('#wwxfAirportNoResults').hide();
        $('#wwxfTooHeavy').show();
        $('#wwxfNotResponding').hide();
        $('#wwxfUPSDelivery').hide();
        $('#wwxfHoldForPickup').hide();
        $('#wwxfDropoff').hide();
        $('#wwxfDropoffNotAvailable').hide();
    });

    $('#wwxfNotRespondingBtn').click(function () {
        $('#shipmentDropoffView').hide();
        $('#shipmentPickupView').hide();
        $('#shipmentEntranceOptions').hide();

        $('#wwxf').hide();
        $('#wwxfAirportNoResults').hide();
        $('#wwxfTooHeavy').hide();
        $('#wwxfNotResponding').show();
        $('#wwxfUPSDelivery').hide();
        $('#wwxfHoldForPickup').hide();
        $('#wwxfDropoff').hide();
        $('#wwxfDropoffNotAvailable').hide();
    });

	$('#shipmentReceiverView').hide();
    //$('#noRadioLiftGate').hide();

    $('input[name=shipmentDelivery]').change(function () {
		if ($(this).val() === '0') {
			$('#shipmentReceiverView').hide();
			$('#shipmentAltLocationView').hide();
            $('#noRadioLiftGate').show();
            $('#yesRadioLiftGate').hide();
		} else {
			$('#shipmentReceiverView').hide();
			$('#shipmentAltLocationView').show();
            $('#noRadioLiftGate').hide();
            $('#yesRadioLiftGate').show();
		}
	});

    $('#dropOffAddPickupBtn').click(function () {
        //$('#shipmentDropoffView').show();
        //$('#shipmentPickupView').show();
        $('#shipmentEntrancePickupContainer').show();
        $('#shipmentEntrancePickupUnavailable').hide();
        $('#shipmentEntranceOrTxt p').show();
        $('#shipmentEntranceOptions').show();
        $('#shipmentEntrancePickup').prop('checked', true).trigger('change');

        $('#pickupDaySpecificScheduledToday').hide();
        $('#pickupOnCallScheduled').hide();
		$('#pickupDailyDefault').hide();
        $('#pickupDaySpecificNotScheduledToday').hide();
        $('#pickupDaySpecificNotScheduledTodayOnCall').hide();
		$('#pickupOtherAvailableNotSelected').hide();
		$('#pickupDaySpecificOnePendingPickup').hide();
        $('#pickupDailyAddOnCall').hide();
        defaultScheduleTable();
    });

    $('#pickupNotAvailableBtn').click(function () {
        //$('#defaultBtn').click();
        $('#shipmentEntranceDroppedOff').prop('checked', true).trigger('change');
        $('#shipmentEntrancePickupContainer').hide();
        $('#shipmentEntranceOrTxt p').hide();
        $('#shipmentEntrancePickupUnavailable').show();
        defaultScheduleTable();
    });

    $('#selectAPLocationBtn').click(function () {
        if ($('#apLocatorContainer').is(':visible')) {
            $('#apLocatorContainer').hide();
            $('.icon', this).removeClass('ups-icon-wedgeup');
            $('.icon', this).addClass('ups-icon-wedgedown');
            $(this).attr('aria-expanded', 'false');
        } else {
            $('#apLocatorContainer').show();
            $('.icon', this).removeClass('ups-icon-wedgedown');
            $('.icon', this).addClass('ups-icon-wedgeup');
            $(this).attr('aria-expanded', 'true');
        }
    });

    /******************************
    ** Begin Shipping Schedule
    *******************************/
    $('#rateTbl4Btn').click(function () {
        $('#rateTbl5').hide();
        $('#rateTbl2day').hide();
        $('#rateTbl2dayAlt').hide();
        $('#rateTbl2dayWeekend').hide();
        $('#rateTbl4').show();
        $('#rateTbl1day').hide();
    });

    $('#rateTbl5Btn').click(function () {
        $('#rateTbl4').hide();
        $('#rateTbl2day').hide();
        $('#rateTbl2dayAlt').hide();
        $('#rateTbl2dayWeekend').hide();
        $('#rateTbl5').show();
        $('#rateTbl1day').hide();
    });

    $('#rateTbl2dayBtn').click(function () {
        $('#rateTbl4').hide();
        $('#rateTbl2day').show();
        $('#rateTbl2dayAlt').hide();
        $('#rateTbl2dayWeekend').hide();
        $('#rateTbl5').hide();
        $('#rateTbl1day').hide();
    });

    $('#rateTbl2dayWeekendBtn').click(function () {
        $('#rateTbl4').hide();
        $('#rateTbl2day').hide();
        $('#rateTbl2dayAlt').hide();
        $('#rateTbl2dayWeekend').show();
        $('#rateTbl5').hide();
        $('#rateTbl1day').hide();
    });

    $('#rateTbl2dayAltBtn').click(function () {
        $('#rateTbl4').hide();
        $('#rateTbl2day').hide();
        $('#rateTbl2dayAlt').show();
        $('#rateTbl2dayWeekend').hide();
        $('#rateTbl5').hide();
        $('#rateTbl1day').hide();
    });

    $('#rateTbl1dayBtn').click(function () {
        $('#rateTbl4').hide();
        $('#rateTbl2day').hide();
        $('#rateTbl2dayAlt').hide();
        $('#rateTbl2dayWeekend').hide();
        $('#rateTbl5').hide();
        $('#rateTbl1day').show();
    });
    /******************************
    ** End Shipping Schedule
    *******************************/

    $('#holdLocationNoSelected').click(function () {
        $('#holdLocation').hide();
    });

    $('#holdLocationSelected').click(function () {
        $('#holdLocation').show();
    });

    $('#lithiumBatteryHowIncluded').change(function () {
        switch ($(this).val()) {
            case '1':
                $('p[id^="lithiumBatterPackagingInfo1"]').hide();
                $('#lithiumBatterPackagingInfo11').show();
            break;
            case '2':
                $('p[id^="lithiumBatterPackagingInfo1"]').hide();
                $('#lithiumBatterPackagingInfo12').show();
            break;
            case '3':
                $('p[id^="lithiumBatterPackagingInfo1"]').hide();
                $('#lithiumBatterPackagingInfo13').show();
            break;
            default:
                $('p[id^="lithiumBatterPackagingInfo1"]').hide();
            break;
        }
    });

    $('#lithiumBatteryHowIncluded2').change(function () {
        switch ($(this).val()) {
            case '1':
                $('p[id^="lithiumBatterPackagingInfo2"]').hide();
                $('#lithiumBatterPackagingInfo21').show();
            break;
            case '2':
                $('p[id^="lithiumBatterPackagingInfo2"]').hide();
                $('#lithiumBatterPackagingInfo22').show();
            break;
            case '3':
                $('p[id^="lithiumBatterPackagingInfo2"]').hide();
                $('#lithiumBatterPackagingInfo23').show();
            break;
            default:
                $('p[id^="lithiumBatterPackagingInfo2"]').hide();
            break;
        }
    });

    $('#lithiumBatteryHowIncluded3').change(function () {
        switch ($(this).val()) {
            case '1':
                $('p[id^="lithiumBatterPackagingInfo3"]').hide();
                $('#lithiumBatterPackagingInfo31').show();
            break;
            case '2':
                $('p[id^="lithiumBatterPackagingInfo3"]').hide();
                $('#lithiumBatterPackagingInfo32').show();
            break;
            case '3':
                $('p[id^="lithiumBatterPackagingInfo3"]').hide();
                $('#lithiumBatterPackagingInfo33').show();
            break;
            default:
                $('p[id^="lithiumBatterPackagingInfo3"]').hide();
            break;
        }
    });

	//End Andrew's JS

});

/***********************************************
**                                            **
**	UPS Addons Forms Show/Hide                **
**                                            **
***********************************************/
$(function () {
	'use strict';

	$('#addAnother').show(); //QV Notifications Demo Btn
	$('#notifyProblemEmail_input').hide(); //QV Notifications Demo Btn
	$('#message_ta').hide(); //QV Notifications Demo Btn

    $('#intFormsNoValueAlert').hide();
    $('#intFormsAddFormUpload').hide();

    $('#intFormsCommercialInvoiceOptions').hide();
    $('#intFormsHelpNo').hide();
    $('#intFormsHelpYes').hide();
    $('#viewMoreOptionsContainer').hide();
    $('#codContainer').hide();
    $('#packageReleaseCodeContainer').hide();
    $('#proactiveResponseContainer').hide();

    $('#intFormsUSCertOptions').hide();
    $('#intFormsNAFTAOptions').hide();

    $('[id^="intFormYesDone"]').hide();
    $('[id^="intFormNoDone"]').hide();

    $('#intFormsPaper').hide();

    $('#viewMoreOptionsHideTxt').hide();

    $('#codLocationNotAccept').hide();

    $('#shipmentWhy').change(function () {
        if ($(this).val() === '1') {
            $('#intFormsNoValueAlert').show();
        } else {
            $('#intFormsNoValueAlert').hide();
        }
    });

    $('.ups-app_nbs #addEmail').change(function () {
		if ($(this).is(':checked')) {
			$('#addEmailNotificationContainer').removeClass('hidden');
		} else {
			$('#addEmailNotificationContainer').addClass('hidden');
		}
	});

	$('.ups-app_nbs #exchangeNotification').change(function () {
		if ($(this).is(':checked')) {
			$('#exchangeNotificationContainer').removeClass('hidden');
		} else {
			$('#exchangeNotificationContainer').addClass('hidden');
		}
	});

    $('.ups-app_nbs #cod').change(function () {
        if ($(this).is(':checked')) {
			$('#codContainer').show();
		} else {
			$('#codContainer').hide();
		}
    });

    $('.ups-app_nbs #packageReleaseCode').change(function () {
        if ($(this).is(':checked')) {
			$('#packageReleaseCodeContainer').show();
		} else {
			$('#packageReleaseCodeContainer').hide();
		}
    });

    $('.ups-app_nbs #proactiveResponse').change(function () {
        if ($(this).is(':checked')) {
			$('#proactiveResponseContainer').show();
		} else {
			$('#proactiveResponseContainer').hide();
		}
    });

    $('#intFormAddInvoiceSel').change(function () {
        if ($(this).val() === '1') {
            $('#intFormsAddFormUpload').show();
            $('#intFormsAddFormCompleteOnline').hide();
        } else {
            $('#intFormsAddFormUpload').hide();
            $('#intFormsAddFormCompleteOnline').show();
        }
    });

    $('#intFormCommercialInvoice').change(function () {
        if ($(this).is(":checked")) {
            $('#intFormsCommercialInvoiceOptions').show();
            $('#intFormCommercialInvoiceView').hide();
        } else {
            $('#intFormsCommercialInvoiceOptions').hide();
            $('#intFormCommercialInvoiceView').show();
        }
    });

    $('#intFormPackingList').change(function () {
        if ($(this).is(":checked")) {
            $('#intFormPackingListView').hide();
        } else {
            $('#intFormPackingListView').show();
        }
    });

    /*$('#intFormUSCert').change(function () {
        if ($(this).is(":checked")) {
            $('#intFormUSCertView').hide();
        } else {
            $('#intFormUSCertView').show();
        }
    });

    $('#intFormUSCert').change(function () {
        if ($(this).is(":checked")) {
            $('#intFormUSCertView').hide();
        } else {
            $('#intFormUSCertView').show();
        }
    });*/

    $('input[name="helpInternationalForms"]').change(function () {
        if ($(this).val() === '1') {
            $('#intFormsHelpNo').show();
            $('#intFormsHelpYes').hide();
        } else {
            $('#intFormsHelpNo').hide();
            $('#intFormsHelpYes').show();
            $('#intFormCommercialInvoice').prop('checked', true).change();
        }
    });

    $('#viewMoreOptions').change(function () {
        if ($(this).is(':checked')) {
            $('#viewMoreOptionsContainer').show();
        } else {
            $('#viewMoreOptionsContainer').hide();
        }
    });

    $('#intFormUSCert').change(function () {
        if ($(this).is(':checked')) {
            $('#intFormsUSCertOptions').show();
            $('#intFormUSCertView').hide();
        } else {
            $('#intFormsUSCertOptions').hide();
            $('#intFormUSCertView').show();
        }
    });

    $('#intFormNAFTA').change(function () {
        if ($(this).is(':checked')) {
            $('#intFormsNAFTAOptions').show();
            $('#intFormNAFTAView').hide();
        } else {
            $('#intFormsNAFTAOptions').hide();
            $('#intFormNAFTAView').show();
        }
    });

    $('#intFormEEI').change(function () {
        if ($(this).is(':checked')) {
            $('#intFormEEIView').hide();
        } else {
            $('#intFormEEIView').show();
        }
    });

    $('#intFormYesAllDoneBtn').click(function () {
        $('[id^="intFormYesIncomplete"]').hide();
        $('[id^="intFormYesDone"]').show();
    });

    $('#intFormYesSomeCompletedBtn').click(function () {
        $('[id^="intFormYesDone"]').hide();
        $('[id^="intFormYesIncomplete"]').show();
    });

    $('#intFormNoNoneCompletedBtn').click(function () {
        $('[id^="intFormNoDone"]').hide();
        $('[id^="intFormNoIncomplete"]').show();
    });

    $('#intFormNoSomeCompletedBtn').click(function () {
        $('#intFormCommercialInvoice').prop('checked', false).change();
        $('#intFormUSCert').prop('checked', false).change();
        $('[id^="intFormNoDone"]').show();
        $('[id^="intFormNoIncomplete"]').hide();
    });

    $('#intFormsSetPaper').click(function () {
        $('#intFormsPaper').show();
        $('#intFormsPaperless').hide();
    });

    $('#intFormsSetPaperless').click(function () {
        $('#intFormsPaper').hide();
        $('#intFormsPaperless').show();
    });

    $('#viewMoreOptionsDrawer .ups-drawer-btn').click(function () {
        if ($('#viewMoreOptionsShowTxt').css('display') === 'inline' ){
            $('#viewMoreOptionsShowTxt').hide();
            $('#viewMoreOptionsHideTxt').show();
        } else {
            $('#viewMoreOptionsShowTxt').show();
            $('#viewMoreOptionsHideTxt').hide();
        }
    });


	/*$('#internationalFormsSection').hide();

	$('input[name="formsSel"]').change(function () {
		if ($(this).val() === '1') {
			$('#internationalFormsSection').show();
		} else {
			$('#internationalFormsSection').hide();
		}
	});

	$('.ups-tile_link button').click(function () {
		$(this).parent().parent().click();
	});*/

    $('#intFormCommercialInvoice').prop('checked', true).change();

    $('#codLocationNotAcceptBtn').click(function () {
        $('#codLocationNotAccept').show();
        $('#codLocationDoesAccept').hide();
    });

    $('#codLocationDoesAcceptBtn').click(function () {
        $('#codLocationNotAccept').hide();
        $('#codLocationDoesAccept').show();
    });

    /**
	 ** toggle demo buttons in QV Notifications addon
	 **/
	var countEmail = 0;
	var shownEmailTiles = [false,false,false,false,false];
	var hideEmailTiles = function(){
		for(var r=0; r<5; r++){
			$('#emailTile'+ r).hide();
		}
	};

	hideEmailTiles();
	for(var r= 0; r<5; r++){
		$('#removeEmail'+ r).click(function(){
			$('#emailTile'+ $(this).data('email-id')).hide();
			shownEmailTiles[$(this).data('email-id')] = false;
			$('#addAnother').show();
			countEmail --;
		});
	};

    $('#noEmailBtn').click(function () {
		countEmail = 0;
		hideEmailTiles();
		for(var r=0;r<5; r++){
			shownEmailTiles[r] = false;
		}
		$('#addAnother').show();
    });

    $('#addAnotherEmailBtn').click(function () {
		if(countEmail > 3){
			$('#addAnother').hide();
		}
		countEmail ++;
		for(var r=0; r<5; r++){
		console.log(shownEmailTiles[r]);
			if(shownEmailTiles[r] == false){
				$('#emailTile'+ r).show();
				shownEmailTiles[r] = true;
				return;
			}
		};
    });

//    $('#emailProvidedBtn').click(function () {
//		$('#providedEmails').show();
//		$('#addEmailTile').hide();
//		$('#5EmailTiles').hide();
//		$('#addAnother').show();
//    });
//
//    $('#emailProvidedAddBtn').click(function () {
//		$('#providedEmails').show();
//		$('#addEmailTile').show();
//		$('#5EmailTiles').hide();
//		$('#addAnother').show();
//    });
//
//    $('#maxEmailBtn').click(function () {
//		$('#providedEmails').hide();
//		$('#addEmailTile').show();
//		$('#5EmailTiles').show();
//		$('#addAnother').hide();
//    });
//
	$('#message_cb').change(function () {
        if ($(this).is(':checked')) {
            $('#message_ta').show();
        } else {
            $('#message_ta').hide();
        }
    });

	$('#notifyProblemEmail').change(function () {
        if ($(this).is(':checked')) {
            $('#notifyProblemEmail_input').show();
        } else {
            $('#notifyProblemEmail_input').hide();
        }
    });

	/** END toggle demo buttons in QV Notifications addon **/

});


/***********************************************
**                                            **
**	Confirmation Page            			  **
**                                            **
***********************************************/
$(function () {
	'use strict';
	//Begin Afftene's JS

	//Eliminates email icon when window is less than 769px (SVP)

	$(window).resize(function() {
	  if ($(window).width() < 769) {
		 $('#ups-icon-email').hide();
	  }
	 else {
		$('#ups-icon-email').show();
	 }
	});

	//Hides Full Shipping Details section
	$('#fullDetailsSection').hide();

	//Toggles Full Details Section by click
	$('#expandDetails, #hideDetails').on('click', function() {
		$('#fullDetailsSection, #expandDetails').toggle();
	});

	//Scrolls back up after clicking Hide Details button
	$('#hideDetails').click(function() {
		$('body').animate({
				scrollTop: $('#introSection').offset().top
			});
	});
});
	//End Afftene's JS

/***********************************************
**                                            **
**	UPS what package page                     **
**                                            **
***********************************************/
$(function () {
	'use strict';

	//initial hiding
	//$('#sameSizeWeight').hide();
	//$('#packageNum').hide();
	$('#signatureOptionsSection').hide();
	$('#addCODSection').hide();
	$('#referenceNumbersSection').hide();
	$('#additionalHandlingSection').hide();
    $('#lithiumBatteryOptionsSection').hide();
	//$('#collapsedPackageRow').hide();
	$('#nonDimWeightFields').hide();
	$('#palletSize_selectBox, .palletSel').hide();
    $('#ups-num_pieces_input').hide();
	$('#collapsedPackageRow1, #collapsedPackageRow2, #packageSaveTxt, #curPackageDelBtn, #packageDupTxt').hide();
	$('#collapsedPackageRow2alt, #collapsedPackageRow3alt, #pkgSaveBtn, #pkgCancelBtn').hide();
	$('#packageUpdTxt, #packageDelTxt, #packageEditTxt').hide();
	$('#imgPkgLetter').hide();
	$('#imgPkgExBox').hide();
	$('#imgPkgPallet').hide();
	$('#imgPkgExPack').hide();
	$('#imgPkgTube').hide();
    $('#imgPkgUnpackaged').hide();
	//$('#rawWoodGuidelinesTxt').hide();
	$('#over150Pallet').hide();
    $('#freightFields').hide();
    $('#descriptionGoodsField').hide();
    $('#freightPackagingDetail').hide();

    $('#packageHelpFreight').hide();
    $('#packageHelpRawWood').hide();
	$('#packageHelpRawWood2').hide();
    $('#packageHelpUnpackaged').hide();
    $('#packageHelpPlaceholder').hide();

    $('#packageHelpFreight2').hide();
    $('#packageHelpUnpackaged2').hide();
    $('#packageHelpPlaceholder2').hide();

    $('#collapsedCurPackageRow').hide();

    $('#additionalPackageOptionsContainer').hide();

    $('#lithiumBatteriesTile2, #lithiumBatteriesTile3, #lithiumBatteriesDel1, #lithiumBattShipTip1View2').hide();


	var numPackages = 1;
	var curPackage = 1;

    var numBatteries = 1;

	/*$('#package_number').change(function () {
		if ($(this).val() === '3') {
			$('#sameSizeWeight').show();
			$('#packageNum').show();
			$('#collapsedPackageRow').show();
			$('#packageContinueBtn').text('Add Package 3');
		} else if ($(this).val() === '2') {
			$('#sameSizeWeight').show();
			$('#packageNum').show();
			$('#collapsedPackageRow').show();
			$('#packageContinueBtn').text('Continue');
		} else {
			$('#sameSizeWeight').hide();
			$('#packageNum').hide();
			$('#collapsedPackageRow').hide();
			$('#packageContinueBtn').text('Continue');
		}
	});*/

	$('#addAdditionalPkgBtn').click(function () {
		if (numPackages === 1) {
			$('#collapsedPackageRow1').show();
			$('#packageSaveTxt, #curPackageDelBtn').show();
			$('#packageSaveTxt').focus();
			$('#prevPackageNum').text('1');
			$('#curPackageNum, #curPackageNum2, #curPackageNum3').text('2');
			$('#packageDupTxt').hide();
			numPackages++;
			curPackage = 2;
		} else if (numPackages === 2) {
			$('#collapsedPackageRow2').show();
			$('#packageDupTxt').hide();
			$('#packageSaveTxt').show();
			$('#packageSaveTxt').focus();
			$('#prevPackageNum').text('2');
			$('#curPackageNum, #curPackageNum2, #curPackageNum3').text('3');
			numPackages++;
			curPackage = 3;
		}

		$('#packageDelTxt').hide();
	});

	$('#pkg1EditBtn').click(function () {
		$('#pkgSaveBtn, #pkgCancelBtn').show();
		$('#packageSaveTxt, #packageDupTxt').hide();
		curPackage = 1;

		if (numPackages === 2) {
			$('#collapsedPackageRow2alt').show();
			$('#collapsedPackageRow1').hide();

		} else {
			$('#collapsedPackageRow2alt, #collapsedPackageRow3alt').show();
			$('#collapsedPackageRow1, #collapsedPackageRow2').hide();
		}

		$('#packageDelTxt').hide();
		$('#packageEditTxt').show();
		$('#packageEditTxt').focus();

		$('#curPackageNum, #curPackageNum2, #curPackageNum3').text('1');
	});

	$('#pkg2EditBtn').click(function () {
		$('#pkgSaveBtn, #pkgCancelBtn').show();
		$('#packageSaveTxt, #packageDupTxt').hide();
		curPackage = 2;

		$('#collapsedPackageRow1, #collapsedPackageRow3alt').show();
		$('#collapsedPackageRow2, #collapsedPackageRow2alt').hide();

		$('#packageDelTxt').hide();
		$('#packageEditTxt').show();
		$('#packageEditTxt').focus();
		$('#curPackageNum, #curPackageNum2, #curPackageNum3').text('2');
	});

	$('#pkg2altEditBtn').click(function () {
		$('#pkgSaveBtn, #pkgCancelBtn').show();
		$('#packageSaveTxt, #packageDupTxt').hide();
		curPackage = 2;

		if (numPackages === 2) {
			$('#collapsedPackageRow2alt').hide();
			$('#collapsedPackageRow1').show();
			$('#curPackageNum, #curPackageNum2, #curPackageNum3').text('2');
		} else {
			$('#collapsedPackageRow3alt').show();
			$('#collapsedPackageRow2alt').hide();
			$('#collapsedPackageRow1').show();
			$('#curPackageNum, #curPackageNum2, #curPackageNum3').text('2');
		}

		$('#packageDelTxt').hide();
		$('#packageEditTxt').show();
		$('#packageEditTxt').focus();
		$('#curPackageNum, #curPackageNum2, #curPackageNum3').text('2');
	});

	$('#pkg3altEditBtn').click(function () {
		$('#pkgSaveBtn, #pkgCancelBtn').show();
		$('#packageSaveTxt, #packageDupTxt').hide();
		curPackage = 3;

		/*if (numPackages === 2) {
			$('#collapsedPackageRow2alt').show();
			$('#collapsedPackageRow1').hide();
			$('#curPackageNum').text('1');
		} else {*/
			$('#collapsedPackageRow2alt, #collapsedPackageRow3alt').hide();
			$('#collapsedPackageRow1, #collapsedPackageRow2').show();
			$('#curPackageNum, #curPackageNum2, #curPackageNum3').text('3');
		/*}*/

		$('#packageDelTxt').hide();
		$('#packageEditTxt').show();
		$('#packageEditTxt').focus();
		$('#curPackageNum, #curPackageNum2, #curPackageNum3').text('3');
	});

	$('#pkgSaveBtn').click(function () {
		$('#curPackageContainer').hide();
        $('#collapsedCurPackageRow').show();

        if (numPackages === 2) {
            $('.ups-collapsed_cur_package').text('2');

            $('#collapsedPackageRow1').show();
            $('#collapsedPackageRow2alt').hide();
        } else {
            $('.ups-collapsed_cur_package').text('3');

            $('#collapsedPackageRow1, #collapsedPackageRow2').show();
            $('#collapsedPackageRow2alt, #collapsedPackageRow3alt').hide();
        }
	});

    $('#curPkgEditBtn, #openCurPkg').click(function () {
        $('#curPackageContainer').show();
        $('#collapsedCurPackageRow').hide();
    });

	$('#pkg1DelBtn, #pkg2DelBtn, #curPackageDelBtn').click(function () {
		if (numPackages === 3) {
			$('#collapsedPackageRow2').hide();
			$('#curPackageNum, #curPackageNum2, #curPackageNum3').text('2');
			$('#prevPackageNum').text('1');
			$('#collapsedPackageRow3alt').hide();
			numPackages--;
		} else if (numPackages === 2) {
			$('#collapsedPackageRow2alt').hide();
			$('#collapsedPackageRow1').hide();
			$('#curPackageNum, #curPackageNum2, #curPackageNum3').text('1');
			numPackages--;
			$('#curPackageDelBtn').hide();
		}

		$('#packageDelTxt').show();
		$('#packageDelTxt').focus();

		switch ($(this).attr('id')) {
			case 'curPackageDelBtn' :
				$('#prevPackageDelNum').text(curPackage);
				curPackage = numPackages;
			break;
			case 'pkg1DelBtn' :
				$('#prevPackageDelNum').text('1');
			break;
			case 'pkg2DelBtn' :
				$('#prevPackageDelNum').text('2');
			break;
		}

		$('#packageEditTxt, #pkgSaveBtn, #packageSaveTxt, #packageDupTxt, #pkgCancelBtn').hide();
	});

	$('#pkg1DupBtn, #pkg2altDupBtn').click(function () {
		if (numPackages === 2) {
			$('#curPackageNum, #curPackageNum2, #curPackageNum3').text('3');
			$('#packageSaveTxt, #packageEditTxt').hide();
			$('#packageDupTxt').show();
			$('#packageDupTxt').focus();
			$('#collapsedPackageRow1, #collapsedPackageRow2').show();
			$('#collapsedPackageRow2alt, #collapsedPackageRow3alt, #pkgSaveBtn, #pkgCancelBtn').hide();
			numPackages++;
			curPackage = 3;
		}
	});

	$('#packaging_type').change(function () {
        switch($(this).val()){
            case '0':
                $('#lengthGroup, #widthGroup, #heightGroup, #dimWeight').show();
                $('#palletSize_selectBox, .palletSel').hide();
                $('#ups-num_pieces_input').hide();
                $('#over150Pallet').hide();
                $('#boxTypeFigure').show();
                $('#imgPkgExBox').hide();
                $('#imgPkgLetter').hide();
                $('#imgPkgPallet').hide();
                $('#imgPkgExPack').hide();
                $('#imgPkgTube').hide();
                $('#imgPkgUnpackaged').hide();
                //$('#rawWoodGuidelinesTxt').hide();
                $('#freightFields').hide();
                $('#descriptionGoodsField').hide();
                $('#freightPackagingDetail').hide();

                $('#packageHelpDefault').show();
                $('#packageHelpPlaceholder').hide();
                $('#packageHelpUnpackaged').hide();
                $('#packageHelpFreight').hide();
                $('#packageHelpRawWood').hide();
                $('#packageHelpRawWood2').hide();
                $('#packageHelpDefault2').show();
                $('#packageHelpPlaceholder2').hide();
                $('#packageHelpUnpackaged2').hide();
                $('#packageHelpFreight2').hide();

                $('#shipTipAlert').show();
                break;
            case '1':
                $('#lengthGroup, #widthGroup, #heightGroup, #dimWeight').hide();
                $('#palletSize_selectBox, .palletSel').hide();
                $('#ups-num_pieces_input').hide();
                $('#over150Pallet').hide();
                $('#boxTypeFigure').hide();
                $('#imgPkgExBox').hide();
                $('#imgPkgPallet').hide();
                $('#imgPkgExPack').hide();
                $('#imgPkgTube').hide();
                $('#imgPkgLetter').show();
                $('#imgPkgUnpackaged').hide();
                //$('#rawWoodGuidelinesTxt').hide();
                $('#freightFields').hide();
                $('#descriptionGoodsField').hide();
                $('#freightPackagingDetail').hide();

                $('#packageHelpDefault').hide();
                $('#packageHelpPlaceholder').hide();
                $('#packageHelpUnpackaged').hide();
                $('#packageHelpFreight').hide();
                $('#packageHelpRawWood').hide();
                $('#packageHelpRawWood2').hide();
                $('#packageHelpDefault2').hide();
                $('#packageHelpPlaceholder2').hide();
                $('#packageHelpUnpackaged2').hide();
                $('#packageHelpFreight2').hide();

                $('#shipTipAlert').show();
                break;
            case '2':
                $('#lengthGroup, #widthGroup, #heightGroup, #dimWeight').show();
    			$('#palletSize_selectBox').hide();
                $('#ups-num_pieces_input, .palletSel').show();
    			$('#over150Pallet').show();
    			$('#boxTypeFigure').hide();
    			$('#imgPkgExBox').hide();
    			$('#imgPkgPallet').show();
    			$('#imgPkgExPack').hide();
    			$('#imgPkgTube').hide();
    			$('#imgPkgLetter').hide();
                $('#imgPkgUnpackaged').hide();
    			//$('#rawWoodGuidelinesTxt').show();
                $('#freightFields').hide();
                $('#descriptionGoodsField').show();
                $('#freightPackagingDetail').hide();

                $('#packageHelpDefault').hide();
                $('#packageHelpPlaceholder').hide();
                $('#packageHelpUnpackaged').hide();
                $('#packageHelpFreight').hide();
                $('#packageHelpRawWood').show();
                $('#packageHelpDefault2').hide();
                $('#packageHelpPlaceholder2').hide();
                $('#packageHelpUnpackaged2').hide();
    			$('#packageHelpRawWood2').show();
                $('#packageHelpFreight2').hide();

                $('#shipTipAlert').show();
                break;
            case '3':
                $('#lengthGroup, #widthGroup, #heightGroup, #dimWeight').hide();
                $('#palletSize_selectBox, .palletSel').hide();
                $('#ups-num_pieces_input').hide();
                $('#over150Pallet').hide();
                $('#boxTypeFigure').hide();
                $('#imgPkgLetter').hide();
                $('#imgPkgExBox').show();
                $('#imgPkgPallet').hide();
                $('#imgPkgExPack').hide();
                $('#imgPkgTube').hide();
                $('#imgPkgLetter').hide();
                $('#imgPkgUnpackaged').hide();
                //$('#rawWoodGuidelinesTxt').hide();
                $('#freightFields').hide();
                $('#descriptionGoodsField').hide();
                $('#freightPackagingDetail').hide();

                $('#packageHelpDefault').hide();
                $('#packageHelpPlaceholder').hide();
                $('#packageHelpUnpackaged').hide();
                $('#packageHelpFreight').hide();
                $('#packageHelpRawWood').hide();
                $('#packageHelpRawWood2').hide();
                $('#packageHelpDefault2').hide();
                $('#packageHelpPlaceholder2').hide();
                $('#packageHelpUnpackaged2').hide();
                $('#packageHelpFreight2').hide();

                $('#shipTipAlert').show();
                break;
            case '4':
                $('#lengthGroup, #widthGroup, #heightGroup, #dimWeight').show();
                $('#palletSize_selectBox, .palletSel').hide();
                $('#ups-num_pieces_input').hide();
                $('#over150Pallet').hide();
                $('#boxTypeFigure').hide();
                $('#imgPkgExBox').hide();
                $('#imgPkgPallet').hide();
                $('#imgPkgExPack').show();
                $('#imgPkgTube').hide();
                $('#imgPkgLetter').hide();
                $('#imgPkgUnpackaged').hide();
                //$('#rawWoodGuidelinesTxt').hide();
                $('#freightFields').hide();
                $('#descriptionGoodsField').hide();
                $('#freightPackagingDetail').hide();

                $('#packageHelpDefault').hide();
                $('#packageHelpPlaceholder').hide();
                $('#packageHelpUnpackaged').hide();
                $('#packageHelpFreight').hide();
                $('#packageHelpRawWood').hide();
                $('#packageHelpRawWood2').hide();
                $('#packageHelpDefault2').hide();
                $('#packageHelpPlaceholder2').hide();
                $('#packageHelpUnpackaged2').hide();
                $('#packageHelpFreight2').hide();

                $('#shipTipAlert').show();
                break;
            case '5':
                $('#lengthGroup, #widthGroup, #heightGroup, #dimWeight').show();
    			$('#palletSize_selectBox, .palletSel').hide();
                $('#ups-num_pieces_input').hide();
    			$('#over150Pallet').hide();
    			$('#boxTypeFigure').hide();
    			$('#imgPkgExBox').hide();
    			$('#imgPkgPallet').hide();
    			$('#imgPkgExPack').hide();
    			$('#imgPkgTube').show();
    			$('#imgPkgLetter').hide();
                $('#imgPkgUnpackaged').hide();
    			//$('#rawWoodGuidelinesTxt').hide();
                $('#freightFields').hide();
                $('#descriptionGoodsField').hide();
                $('#freightPackagingDetail').hide();

                $('#packageHelpDefault').hide();
                $('#packageHelpPlaceholder').hide();
                $('#packageHelpUnpackaged').hide();
                $('#packageHelpFreight').hide();
                $('#packageHelpRawWood').hide();
    			$('#packageHelpRawWood2').hide();
                $('#packageHelpDefault2').hide();
                $('#packageHelpPlaceholder2').hide();
                $('#packageHelpUnpackaged2').hide();
                $('#packageHelpFreight2').hide();

                $('#shipTipAlert').show();
                break;
            case '6':
                $('#lengthGroup, #widthGroup, #heightGroup, #dimWeight').hide();
                $('#palletSize_selectBox, .palletSel').hide();
                $('#ups-num_pieces_input').hide();
                $('#over150Pallet').hide();
                $('#boxTypeFigure').hide();
                $('#imgPkgExBox').hide();
                $('#imgPkgPallet').hide();
                $('#imgPkgExPack').hide();
                $('#imgPkgTube').hide();
                $('#imgPkgLetter').hide();
                $('#imgPkgUnpackaged').show();
                //$('#rawWoodGuidelinesTxt').hide();
                $('#freightFields').hide();
                $('#descriptionGoodsField').hide();
                $('#freightPackagingDetail').hide();

                $('#packageHelpDefault').hide();
                $('#packageHelpPlaceholder').hide();
                $('#packageHelpUnpackaged').show();
                $('#packageHelpFreight').hide();
                $('#packageHelpRawWood').hide();
                $('#packageHelpRawWood2').hide();
                $('#packageHelpDefault2').hide();
                $('#packageHelpPlaceholder2').hide();
                $('#packageHelpUnpackaged2').show();
                $('#packageHelpFreight2').hide();

                $('#shipTipAlert').hide();
                break;
            default:
                $('#lengthGroup, #widthGroup, #heightGroup, #dimWeight').show();
                $('.palletSel').hide();
                $('#palletSize_selectBox').show();
                $('#ups-num_pieces_input').hide();
                $('#over150Pallet').hide();
                $('#boxTypeFigure').hide();
                $('#imgPkgExBox').hide();
                $('#imgPkgPallet').show();
                $('#imgPkgExPack').hide();
                $('#imgPkgTube').hide();
                $('#imgPkgLetter').hide();
                $('#imgPkgUnpackaged').hide();
                //$('#rawWoodGuidelinesTxt').hide();
                $('#freightFields').show();
                $('#descriptionGoodsField').show();
                $('#freightPackagingDetail').show();

                $('#packageHelpDefault').hide();
                $('#packageHelpPlaceholder').hide();
                $('#packageHelpUnpackaged').hide();
                $('#packageHelpFreight').show();
                $('#packageHelpRawWood').hide();
                $('#packageHelpDefault2').hide();
                $('#packageHelpPlaceholder2').hide();
                $('#packageHelpUnpackaged2').hide();
                $('#packageHelpRawWood2').show();
                $('#packageHelpFreight2').show();

                $('#shipTipAlert').show();
                break;
        }
	});

    $('#curPackageDupBtn').click(function () {
        if (numPackages === 1) {
            $('#addAdditionalPkgBtn').click();
        } else if (numPackages === 2) {
            $('#pkg1DupBtn').click();
        }
    });

	$('#signatureOptions').change(function () {
		if ($(this).is(':checked')) {
			$('#signatureOptionsSection').show();
		} else {
			$('#signatureOptionsSection').hide();
		}
	});

	$('#addCOD').change(function () {
		if ($(this).is(':checked')) {
			$('#addCODSection').show();
		} else {
			$('#addCODSection').hide();
		}
	});

	$('#addreference').change(function () {
		if ($(this).is(':checked')) {
			$('#referenceNumbersSection').show();
		} else {
			$('#referenceNumbersSection').hide();
		}
	});

	$('#additionalHandling').change(function () {
		if ($(this).is(':checked')) {
			$('#additionalHandlingSection').show();
		} else {
			$('#additionalHandlingSection').hide();
		}
	});

    $('#includeLithium').change(function () {
        if ($(this).is(':checked')) {
            $('#lithiumBatteryOptionsSection').show();
        } else {
            $('#lithiumBatteryOptionsSection').hide();
        }
    });

	$('#dimWeight').change(function () {
		if ($(this).is(':checked')) {
			$('#nonDimWeightFields').hide();
			$('#dimWeightField').show();
		} else {
			$('#nonDimWeightFields').show();
			$('#dimWeightField').hide();
		}
	});

    $('#additionalPkgOptions').change(function () {
		if ($(this).is(':checked')) {
			$('#additionalPackageOptionsContainer').show();
		} else {
			$('#additionalPackageOptionsContainer').hide();
		}
	});


	//check if over 150 or wwef page is loaded
    //if true change #packaging_type value to 2
    var nonWWEF = document.getElementById('shipTipAlert');
    //console.log(nonWWEF);
	if ($('#fromWeight').val() === '151') {
		$('#packaging_type').val('2').change();
	}
    if (!nonWWEF === null) {
		$('#packaging_type').val('2').change();
	}

    $('#lithiumBatteriesIncludeAnother').click(function () {
        if (numBatteries >= 2) {
            $(this).hide();
        }

        if (numBatteries >= 1) {
            $('#lithiumBatteriesTile2').show();

            $('#lithiumBatteriesDel1').show();
        }

        if (numBatteries >= 2) {
            $('#lithiumBatteriesTile3').show();
        }

        if (numBatteries <= 2) {
            numBatteries ++;
        }
    });

    $('#lithiumBatteriesDel1, #lithiumBatteriesDel2, #lithiumBatteriesDel3').click(function () {
        if (numBatteries <= 3) {
            $('#lithiumBatteriesIncludeAnother').show();
        }

        if (numBatteries <= 3) {
            $('#lithiumBatteriesTile3').hide();
        }

        if (numBatteries <= 2) {
            $('#lithiumBatteriesTile2').hide();
            $('#lithiumBatteriesDel1').hide();
        }

        if (numBatteries >= 2) {
            numBatteries --;
        }
    });

    $('#lithiumBattShipTip1ViewBtn').click(function () {
        $('#lithiumBattShipTip1View2').hide();
        $('#lithiumBattShipTip1View1').show();
    });

    $('#lithiumBattShipTip2ViewBtn').click(function () {
        $('#lithiumBattShipTip1View1').hide();
        $('#lithiumBattShipTip1View2').show();
    });

    $('#lithiumBattShipTipNoneViewBtn').click(function () {
        $('#lithiumBattShipTip1View1').hide();
        $('#lithiumBattShipTip1View2').hide();
    });



});

/***********************************************
**                                            **
**	UPS Duties and Taxes Page                 **
**                                            **
***********************************************/
$(function () {
	'use strict';

	var billGroup = $('input[name=ups-cpm-tile]');

	billGroup.change(function () {
		//$(this).val();

		billGroup.parent().removeClass('ups-gold');

		$(this).parent().addClass('ups-gold');

		if ($(this).val() === '0') {
			$('#billReceiverFields').show();
			$('#billAccountFields').hide();
			$('#billThirdPartyFields').hide();
		} else if ($(this).val() === '1') {
			$('#billReceiverFields').hide();
			$('#billAccountFields').hide();
			$('#billThirdPartyFields').hide();
		} else if ($(this).val() === '2') {
			$('#billReceiverFields').hide();
			$('#billAccountFields').show();
			$('#billThirdPartyFields').hide();
		} else {
			$('#billReceiverFields').hide();
			$('#billAccountFields').hide();
			$('#billThirdPartyFields').show();
		}


	});

	var billReceiver = $('input[name=billReceiver]');

	billReceiver.change(function () {
		if ($(this).val() === '1') {
			$('#billReceiverAccountFields').show();
		} else {
			$('#billReceiverAccountFields').hide();
		}
	});

	$('input[name=billReceiver][value=0]').prop('checked', true).change();

	$('input[name=ups-cpm-tile][value=0]').prop('checked', true).change();
});

/***********************************************
**                                            **
**	UPS Electronic Export Information         **
**                                            **
***********************************************/
$(function () {
	'use strict';
	//console.log('g');
	//initial hiding
	$('#noEEINeeded').hide();
	$('#haveITN').show();
	$('#transNumType').hide();
	$('#transNumGroup').show();
	$('#completeFilingOpt').hide();
	$('#upsFileEEI').hide();
	$('#ultimateConsignee').show();
	$('#intermediateRecipient').show();
	$('#remove_int_recipientBtn').hide();
	$('#refNumGroup').hide();
	$('#ultimateConsigneeCAC').show();


	$('#eeiFilingMethod').change(function () {
		if ($(this).val() === '2') {
			$('#noEEINeeded').show();
			$('#haveITN').hide();
			$('#transNumType').hide();
			$('#refNumGroup').hide();
			$('#transNumGroup').hide();
		} else if ($(this).val() === '1') {
			$('#haveITN').show();
			$('#transNumGroup').show();
			$('#noEEINeeded').hide();
			$('#transNumType').hide();
			$('#refNumGroup').hide();
		} else {
			$('#noEEINeeded').hide();
			$('#haveITN').show();
			$('#transNumType').hide();
			$('#transNumGroup').show();
			$('#refNumGroup').hide();
		}
	});

	$("#transNumTypeBtn").click(function(){
        $('#transNumType').show();
		$('#haveITN').show();
		$('#transNumGroup').hide();
		$('#noEEINeeded').hide();
		$('#selectFilingMethod').hide();
		$('#completeFilingOpt').hide();
		$('#upsFileEEI').hide();
		$('#refNumGroup').hide();
    });

	$("#completeEEIBtn").click(function(){
        $('#completeFilingOpt').show();
		$('#noEEINeeded').hide();
		$('#selectFilingMethod').hide();
		$('#haveITN').hide();
		$('#upsFileEEI').hide();
		$('#refNumGroup').show();
		$('#transNumGroup').hide();
		$('#transNumType').hide();
    });

	$("#notCompleteEEIBtn").click(function(){
		$('#selectFilingMethod').show();
        $('#haveITN').show();
		$('#transNumType').hide();
		$('#transNumGroup').show();
		$('#noEEINeeded').hide();
		$('#completeFilingOpt').hide();
		$('#upsFileEEI').hide();
		$('#refNumGroup').hide();
    });

	$("#upsFileEEIBtn").click(function(){
		$('#upsFileEEI').show();
		$('#refNumGroup').hide();
		$('#transNumGroup').hide();
		$('#selectFilingMethod').hide();
        $('#haveITN').hide();
		$('#noEEINeeded').hide();
		$('#completeFilingOpt').hide();
		$('#transNumType').hide();
    });

	$('#ultimateConsigneeRecipient').change(function () {
		if ($(this).is(':checked')) {
			$('#ultimateConsignee').hide();
			$('#add_int_recipientBtn').show();
			$('#intermediateRecipient').hide();
			$('#ultimateConsigneeCAC').hide();
		} else {
			$('#ultimateConsignee').show();
			$('#add_int_recipientBtn').hide();
			$('#remove_int_recipientBtn').hide();
			$('#intermediateRecipient').show();
			$('#ultimateConsigneeCAC').show();
		}
	});

	$("#add_int_recipientBtn").click(function(){
		$('#intermediateRecipient').show();
		$('#remove_int_recipientBtn').show();
		$('#add_int_recipientBtn').hide();
    });
	$("#remove_int_recipientBtn").click(function(){
		$('#intermediateRecipient').hide();
		$('#add_int_recipientBtn').show();
		$('#remove_int_recipientBtn').hide();
    });

	$('#exportLicenseExcemption').change(function () {
		if ($(this).is(':checked')) {
			$('#exportLicenseExemptionProduct1').show();
		} else {
			$('#exportLicenseExemptionProduct1').hide();
		}
	});

	$('#exportLicenseExcemption2').change(function () {
		if ($(this).is(':checked')) {
			$('#exportLicenseExemptionProduct2').show();
		} else {
			$('#exportLicenseExemptionProduct2').hide();
		}
	});

});

/***********************************************
**                                            **
**	UPS Forms Help Me Complete                **
**                                            **
***********************************************/
$(function () {
	'use strict';

	//$('#hmc_product_add_fields').hide();
	$('#hmc_saved_item_selected_fields').hide();
	$('#hmc_num_pack_input').hide();
	$('#hmc_item_gross_weight_input').hide();
	$('#hmc_inbond_type_code_input').hide();
	$('#hmc_ftz_id_input').hide();
	$('#hmc_exemption_citation_container').hide();
	$('#hmc_assign_to_packing_list').hide();
	$('#hmcMaterialsCAMXUSLever3_container').hide();
	$('#limitedSetProductsParagraph').hide();
	$('#hmc_chooseAPref').hide();
	$('#yourProductNotEligibleNafta').hide();
	$('#yourProductNotEligibleNafta2').hide();
	$('#NAFTA_eligibility').hide();
	$('#costofMaterialsTip').hide();
	$('#hmc_chooseACost').hide();
	$('#NAFTA_eligibility2').hide();
	//$('#hmc_itn_input_container').hide();

	//$('#hmcNoITNFields').hide();

	/* $('#hmc_complete_co').change(function () {
        if ($(this).is(':checked')) {
            $('#hmc_num_pack_input').show();
			$('#hmc_item_gross_weight_input').show();
        } else {
 			$('#hmc_num_pack_input').hide();
			$('#hmc_item_gross_weight_input').hide();
		}
    });*/
	$('#hmc_complete_now').click(function () {
		$('#hmc_num_pack_input').toggle();
		$('#hmc_item_gross_weight_input').toggle();
	});

	$("#Titlest_Golf_Balls").click(function () {
		$('#hmc_saved_item_selected_fields').show();
	});

	$('#hmc_product_packaged').change(function () {
		if ($(this).val() === '1') {
			$('#hmc_saved_item_selected_fields').show();
        } else {
			$('#hmc_saved_item_selected_fields').hide();
        }
	});

	$('#hmcHaveITN7').change(function () {
		if ($(this).is(':checked')) {
			$('#hmc_itn_input_container').show();
		} else {
			$('#hmc_itn_input_container').hide();
		}
	});

	$('#hmcProducerQuestion2').change(function () {
		if ($(this).is(':checked')) {
			$('#yourProductNotEligibleNafta').hide();
			$('#hmc_nafta_prod2_cb').hide();
		} else {
			$('#hmc_nafta_prod2_cb').show();
			//$('#yourProductNotEligibleNafta').show();
		}
	});

	/*$('#yourProductNotEligibleNafta').change(function () {
	if ($('#hmcProducerQuestion2, #hmc_nafta_prod_signed_cert').is('!:checked')) {
			$(this).show();
	} else {
			$(this).hide();
	}
	});*/


	$('#hmc_nafta_prod_signed_cert').change(function () {
		if ($(this).is(':checked')) {
			$('#yourProductNotEligibleNafta').hide();
		} else {
			$('#yourProductNotEligibleNafta').show();
		}
	});

	$('#hmcMaterialsCAMXUSLever2').click(function () {
		$('#hmcMaterialsCAMXUSLever3_container').toggle();
	});

	$('#hmcMaterialsCAMXUSLever3').click(function () {
		$('#costofMaterialsTip, #limitedSetProductsParagraph, #hmc_chooseAPref, #yourProductNotEligibleNafta2').toggle();
	});

	$('#hmcMaterialsCAMXUSLever6').click(function() {
		$('#hmcDifferentKindOfProductLever_container').toggle();
	});

	$('#hmcDifferentKindOfProductLever').click(function() {
		$('#limitedSetProductsParagraph, #costofMaterialsTip, #NAFTA_eligibility, #hmc_chooseACost, #NAFTA_eligibility2').toggle();
	});

	$('#hmcBondedGoodsQuestion').change(function () {
		if ($(this).is(':checked')) {
			$('#hmc_inbond_type_code_input').show();
		} else {
			$('#hmc_inbond_type_code_input').hide();
		}
	});

	$('#hmcShipFTZQuestion').change(function () {
		if ($(this).is(':checked')) {
			$('#hmc_ftz_id_input').show();
		} else {
			$('#hmc_ftz_id_input').hide();
		}
	});

	$('#hmcfileAnEEILever').click(function () {
		$('#hmc_exemption_citation_container').toggle();
	});

	$('#hmc_assign_item_btn').click(function () {
		$('#hmc_assign_to_packing_list').toggle();
	});
	$('#hmc_assign_btn').click(function () {
		$('#hmc_assign_to_packing_list').toggle();
	});
	$('#hmc_remove_pkg_btn').click(function () {
		$('#hmc_package_details').hide();
	});
	$('#hmc_assign_item_btn2').click(function () {
		$('#hmc_package_details').show();
	});

    $('#requireLicenseYesContainer').hide();
    $('#hmcRequireExportLicenseExemptionQuestion').change(function () {
        if ($(this).is(':checked')) {
            $('#requireLicenseYesContainer').show();
        } else {
            $('#requireLicenseYesContainer').hide();
        };
    });

});

/***********************************************
**                                            **
**					Review                    **
**                                            **
***********************************************/
$(function () {
	'use strict';
	//console.log('g');
	//initial hiding
	$('#defaultDeliveryAddress').show();
	$('#residentialDeliveryAddress').hide();
	$('#alternateDeliveryAddress').hide();
	$('#packageMultiPieceBtn').hide();
	$('#packageMultiPieceBtn3').hide();
	$('#packageMultiPieceBtn4').hide();
	$('#packageMultiPiece').hide();
	$('#packageMultiPiece2').hide();
	$('#packageMultiPiece3').hide();
	$('#packageMultiPiece4').hide();
	$('#packageDefault3').hide();
	$('#packageDefault4').hide();
	$('#packageInformation').hide();
	$('#packageMultiPieceBtn2').hide();
	$('#alternateDeliveryAddress').hide();
	$('#packageUSNonUS').hide();
	$('#deToDePackageProcessing').hide();
	$('#euShipmentDetermination').hide();
	$('#euPackageDetermination').hide();
	$('#deFRPackagingProcessing').hide();
	$('#deEUGnifcShipment').hide();
	$('#scheduledPickup').hide();
	$('#addOns').hide();
	$('#altMethodNickname').hide();
	$('#payAtStore').hide();
	$('#addOns').hide();
	$('#applyPromoCodeEntered').hide();

	//Where

	$("#defaultDeliveryBtn").click(function(){
		$('#defaultDeliveryAddress').show();
		$('#residentialDeliveryAddress').hide();
        $('#alternateDeliveryAddress').hide();
    });

	$("#residentialDeliveryBtn").click(function(){
		$('#defaultDeliveryAddress').hide();
		$('#residentialDeliveryAddress').show();
        $('#alternateDeliveryAddress').hide();
    });

	$("#alternateDeliveryBtn").click(function(){
        $('#alternateDeliveryAddress').show();
		$('#residentialDeliveryAddress').hide();
		$('#defaultDeliveryAddress').hide();
    });

	// What

	$("#packageDefaultBtn").click(function(){
        $('#packageMultiPiece').show();
		$('#packageMultiPieceBtn').show();
		$('#packageDefaultBtn').hide();
    });

	$("#packageDefaultBtn2").click(function(){
        $('#packageMultiPiece2').show();
		$('#packageMultiPieceBtn2').show();
		$('#packageDefaultBtn2').hide();
    });

	$("#packageDefaultBtn3").click(function(){
        $('#packageMultiPiece3').show();
		$('#packageMultiPieceBtn3').show();
		$('#packageDefaultBtn3').hide();
    });

	$("#packageDefaultBtn4").click(function(){
        $('#packageMultiPiece4').show();
		$('#packageMultiPieceBtn4').show();
		$('#packageDefaultBtn4').hide();
    });

	$("#packageMultiPieceBtn").click(function(){
        $('#packageMultiPiece').hide();
		$('#packageMultiPieceBtn').hide();
		$('#packageDefaultBtn').show();
    });

	$("#packageMultiPieceBtn2").click(function(){
        $('#packageMultiPiece2').hide();
		$('#packageMultiPieceBtn2').hide();
		$('#packageDefaultBtn2').show();
    });

	$("#packageMultiPieceBtn3").click(function(){
        $('#packageMultiPiece3').hide();
		$('#packageMultiPieceBtn3').hide();
		$('#packageDefaultBtn3').show();
    });

	$("#packageMultiPieceBtn4").click(function(){
        $('#packageMultiPiece4').hide();
		$('#packageMultiPieceBtn4').hide();
		$('#packageDefaultBtn4').show();
    });

	$("#usToUSBtn").click(function(){
		$('#packageDefault').show();
		$('#packageDefault2').show();
		$('#packageDefault3').hide();
		$('#packageDefault4').hide();
        $('#packageUSNonUS').hide();
		$('#packageMultiPiece').hide();
		$('#packageInformation').hide();
		$('#deToDePackageProcessing').hide();
		$('#euShipmentDetermination').hide();
		$('#euPackageDetermination').hide();
		$('#deFRPackagingProcessing').hide();
		$('#deEUGnifcShipment').hide();
    });

	$("#usNonUSBtn").click(function(){
        $('#packageUSNonUS').show();
		$('#packageMultiPiece').hide();
		$('#packageInformation').show();
		$('#packageDefault').show();
		$('#packageDefault2').show();
		$('#packageDefault3').hide();
		$('#packageDefault4').hide();
		$('#deToDePackageProcessing').hide();
		$('#euShipmentDetermination').hide();
		$('#euPackageDetermination').hide();
		$('#deToFRPackageDetermination').hide();
		$('#deFRPackagingProcessing').hide();
		$('#deEUGnifcShipment').hide();
    });

	$("#deToDeProcessingBtn").click(function(){
		$('#deToDePackageProcessing').show();
		$('#packageUSNonUS').hide();
		$('#packageInformation').show();
		$('#packageMultiPiece').hide();
		$('#packageDefault').hide();
		$('#packageDefault2').hide();
		$('#packageDefault3').show();
		$('#packageDefault4').show();
		$('#euShipmentDetermination').hide();
		$('#euPackageDetermination').hide();
		$('#deToFRPackageDetermination').hide();
		$('#deFRPackagingProcessing').hide();
		$('#deEUGnifcShipment').hide();
	});

	$("#euShipmentDeterminationBtn").click(function(){
		$('#euShipmentDetermination').show();
		$('#deToDePackageProcessing').hide();
		$('#packageUSNonUS').hide();
		$('#packageMultiPiece').hide();
		$('#packageDefault').hide();
		$('#packageDefault2').hide();
		$('#packageDefault3').hide();
		$('#packageDefault4').hide();
		$('#euPackageDetermination').hide();
		$('#deToFRPackageDetermination').hide();
		$('#deFRPackagingProcessing').hide();
		$('#deEUGnifcShipment').hide();
	});

	$("#euPackageDeterminationBtn").click(function(){
		$('#euShipmentDetermination').hide();
		$('#deToDePackageProcessing').hide();
		$('#packageUSNonUS').hide();
		$('#packageMultiPiece').hide();
		$('#packageInformation').show();
		$('#packageDefault').hide();
		$('#packageDefault2').hide();
		$('#packageDefault3').show();
		$('#packageDefault4').show();
		$('#euPackageDetermination').show();
		$('#deFRPackagingProcessing').hide();
		$('#deEUGnifcShipment').hide();

	});

	$("#deFRPackagingProcessingBtn").click(function(){
		$('#euShipmentDetermination').hide();
		$('#deToDePackageProcessing').hide();
		$('#packageUSNonUS').hide();
		$('#packageMultiPiece').hide();
		$('#packageInformation').show();
		$('#packageDefault').hide();
		$('#packageDefault2').hide();
		$('#packageDefault3').show();
		$('#packageDefault4').show();
		$('#euPackageDetermination').hide();
		$('#deFRPackagingProcessing').show();
		$('#deEUGnifcShipment').hide();
	});

	$("#deEUGnifcShipmentBtn").click(function(){
		$('#euShipmentDetermination').hide();
		$('#deToDePackageProcessing').hide();
		$('#packageUSNonUS').hide();
		$('#packageMultiPiece').hide();
		$('#packageDefault').hide();
		$('#packageDefault2').hide();
		$('#packageDefault3').hide();
		$('#packageDefault4').hide();
		$('#euPackageDetermination').hide();
		$('#deFRPackagingProcessing').hide();
		$('#deEUGnifcShipment').show();
	});

	// When

	$("#defaultPickupBtn").click(function(){
		$('#scheduledPickup').hide();
		$('#defaultPickup').show();
	});

	$("#scheduledPickupBtn").click(function(){
		$('#scheduledPickup').show();
		$('#defaultPickup').hide();
	});

	// Add Ons

	$("#addOnsNoneSelectedBtn").click(function(){
		$('#addOns').hide();
		$('#addOnsNoneSelected').show();
	});

	$("#addOnsBtn").click(function(){
		$('#addOns').show();
		$('#addOnsNoneSelected').hide();
	});

	// Payment

	$("#applyPromoCodeBtn").click(function(){
		$('#payAtStore').hide();
		$('#altMethodNickname').hide();
		$('#applyPromoCode').show();
		$('#applyPromoCodeEntered').hide();
		$('#applyPromo').show();
	});

	$("#altMethodNicknameBtn").click(function(){
		$('#payAtStore').hide();
		$('#altMethodNickname').show();
		$('#applyPromoCode').hide();
		$('#applyPromoCodeEntered').hide();
		$('#applyPromo').show();
	});

	$("#payAtStoreBtn").click(function(){
		$('#payAtStore').show();
		$('#altMethodNickname').hide();
		$('#applyPromoCode').hide();
		$('#applyPromoCodeEntered').hide();
		$('#applyPromo').show();
	});

	$("#applyPromoCodeEnteredBtn").click(function(){
		$('#payAtStore').hide();
		$('#altMethodNickname').hide();
		$('#applyPromoCode').show();
		$('#applyPromo').hide();
		$('#applyPromoCodeEntered').show();
	});

});


/***********************************************
**                                            **
**	Payment                					  **
**                                            **
***********************************************/

/*
//Afftene's JS
$(function () {
	'use strict';


//Default State

	//Tile Section
	$('#tile-1, #tile-2, #tile-3').hide();

	//Payment Type Selection
	$('#johnDoeLabel, #accountLabel, #thirdPartyLabel, #selectAcctLabel, #savedThirdLabel, #accountNumLink, #checkMyDisc2').hide();
	$("select#savedPaymentSB option[value='2']").attr("selected","selected");

	//Common Payment Component
	$('#CPC').hide();

	//Common Address Component
	$('#CAC').hide();

	//Payment - Associate Account Selection
	$('#linkThisPymtSB, #accountNumInput, #accountNumLink2, #thirdPartyLabel, #accountNameInput, #receiverLabel, #accountNumLink3, #countryInput, #countryStaticLabel, #countryStaticValue, #zipInput').hide();

	//Checkboxes
	$('#saveAccountCB, #3rdPartyCB, #billAcctCB').hide();

	//Promo Code
	$('#promoApplied, #promo40, #promoTC').hide();

// Adds toggle function to Lever
	$('#linkThisPayment').click(function() {
		  $('#accountNumInput, #accountNameInput, #countryStaticLabel, #countryStaticValue, #zipInput').toggle();
	  });

// Hides Button Toggle 'On'
$('.onToggle').hide().css('color', 'green');

// Tiles State
	$('#tilesState1Btn').click(function() {
		  $('#tile-0, #tile-4').show();
		  $('#tile-1, #tile-2, #tile-3').hide();
		  $('#tilesState1Btn > span').toggle();
	  });

  	$('#tilesState2Btn').click(function() {
		  $('#tile-0, #tile-1, #tile-2, #tile-3, #tile-4').show();
		  $('#tilesState2Btn > span').toggle();
	  });

	$('#tilesState3Btn').click(function() {
		  $('#tile-0, #tile-1, #tile-2, #tile-3, #tile-4').show();
		  $('#tilesState3Btn > span').toggle();
 	  });
//CPC and CAC
	$('#cpcBtn').click(function() {
		$('#CPC, #cpcBtn > span').toggle();
		$('#CPC > div > section > div:nth-child(3), #CPC > div > section > div.ups-form_group.ups-checkbox.ups-input_wrapper').hide();
	});
	$('#cpcBtn2').click(function() {
		//$('#CPC').show();
		$('#CPC, #CAC, #cpcBtn2 > span').toggle();
	});
	$('#cpcBtn3').click(function() {
		$('#CPC, #cpcBtn3 > span').toggle();
		$('#CAC').hide();
	});
//Payment Type Selection
	//Payment - Payment Type Selection - Payment Card - Profile has Saved Card(s)
	$('#pymtProfileSvdAcctsBtn').click(function() {
		$('#accountNumLink, #pymtProfileSvdAcctsBtn > span').toggle();
		$('#linkThisPymtSB, #accountNumInput, #accountNumLink2, #thirdPartyLabel, #accountNameInput, #countryInput, #countryStaticLabel, #countryStaticValue, #zipInput').hide();
  	  });

	//Payment - Payment Type Selection - Payment Card
	$('#pymtCardBtn').click(function() {
		$('#savedPayment, #checkMyDisc2, #checkMyDisc1, #pymtCardBtn > span').toggle();
  	  });

	//Payment - Payment Type Selection - Bill The Receiver
	$('#pymtBillBtn').click(function() {
		$('#savedPayment, #checkMyDisc2, #checkMyDisc1, #paymentCardLabel, #johnDoeLabel, #pymtBillBtn > span').toggle();
  	  });

	//Payment - Payment Type Selection - Bill Account
	$('#pymtBillAcctBtn').click(function() {
		$('#savedPayment, #checkMyDisc2, #checkMyDisc1, #paymentCardLabel, #accountLabel, #pymtBillAcctBtn > span').toggle();
  	  });

	//Payment - Payment Type Selection - Bill Account - Profile has Saved Accts
	$('#pymtBillAcctBtn2').click(function() {
		$('#paymentCardLabel, #accountLabel, #savedPaymentLabel, #accountNumLink, #selectAcctLabel, #pymtBillAcctBtn2 > span').toggle();
		$("select#savedPaymentSB option[value='3']").attr("selected","selected");
  	  });
	//Payment - Payment Type Selection - Bill Account - Third Party Account Payment
	$('#pymt3rdPartyBtn').click(function() {
		$('#savedPayment, #checkMyDisc2, #checkMyDisc1, #thirdPartyLabel, #paymentCardLabel, #pymt3rdPartyBtn > span').toggle();
  	  });
	//Payment - Payment Type Selection - Bill Account - Third Party Account Payment - Profile has Saved 3rd Party Accts
	$('#pymt3rdPartyBtn2').click(function() {
		$('#thirdPartyLabel, #savedPaymentLabel, #savedThirdLabel, #paymentCardLabel, #accountNumLink, #pymt3rdPartyBtn2 > span').toggle();
		$("select#savedPaymentSB option[value='3']").attr("selected","selected");
  	  });
	  //Payment - Payment Type Selection - Bill The Reciever - Add New
	$('#pymtBillAddNewBtn').click(function() {
		$('#linkThisPymtLever, #accountNumInput, #receiverLabel, #zipInput, #saveAccountCB, #countryStaticLabel, #countryStaticValue, #pymtBillAddNewBtn > span').toggle();
		$('#countryInput, ##accountNameInput').hide();
	  });
	  //Payment - Payment Type Selection - Bill The Reciever - Account Saved In Contact list
	$('#pymtBillAcctSvdBtn').click(function() {
		$('#linkThisPymtLever, #accountNumInput, #receiverLabel, #countryStaticLabel, #countryStaticValue, #zipInput, #pymtBillAcctSvdBtn > span').toggle();
		 $('#accountNumInput > div > input').val('{NNXNNX}');
		 $('#zipInput > div > input').val('{00000}');
  	  });
	  //Payment - Payment Type Selection - Bill Account - Add New
	$('#pymtBillAcctAddNewBtn').click(function() {
		$('#linkThisPymtLever, #accountNumInput, #accountNameInput, #countryStaticLabel, #countryStaticValue, #zipInput, #saveAccountCB, #3rdPartyCB, #pymtBillAcctAddNewBtn > span').toggle();
  	  });
	  //Payment - Payment Type Selection - Thrid Party Account - Add New
	$('#pymt3rdPartyAddNewBtn').click(function() {
		$('#linkThisPymtLever, #thirdPartyLabel, #accountNumInput, #countryInput, #zipInput, #saveAccountCB, #3rdPartyCB, #pymt3rdPartyAddNewBtn > span').toggle();
  	  });
	  //Payment - Associate Account(Default/Enter Details)
	$('#pymtLeverDetailsBtn').click(function() {
		$('#linkThisPymtLever').show();
		$('#receiverLabel, #thirdPartyLabel, #countryInput, #saveAccountCB, #3rdPartyCB, #billAcctCB').hide();
		$('#pymtLeverDetailsBtn > span').toggle();
  	  });
	  //Payment - Associate Account (Default) - Profile has Saved Account(s) - (Add New/Enter Details)
	$('#pymtSBSavedAccountBtn').click(function() {
		$('#linkThisPymtLever, #linkThisPymtSB, #accountNumLink3, #pymtSBSavedAccountBtn > span').toggle();
		$('#accountNumCancelLink').hide();
		$('#accountNumLink3').click(function() {
			$('#accountNumInput, #accountNameInput, #countryStaticLabel, #countryStaticValue, #zipInput, #billAcctCB').toggle();
			$('#accountNumCancelLink').show();
		});
	});

	//Promo States

	  $('#promoDefaultBtn').click(function() {
		  $('#promo40, #promoTC, #promoApplied').hide();
		  $('#promoToApply').show();
		  $('promoDefaultBtn > span').toggle();
	  });
	  $('#promoAppliedBtn').click(function() {
		  $('#promo40, #promoTC, #promoApplied, #promoAppliedBtn > span').toggle();
		  $('#promoToApply').hide();
  	  });
});*/


/***********************************************
**                                            **
**	Service Table Clicks                      **
**                                            **
***********************************************/
$(function () {
    'use strict';

    $('.ups-day_rate button').click(function () {
        $(this).parent().parent().find('input').prop('checked', true);
        $(this).parent().focus();
    });

});


/***********************************************
**                                            **
**  Header Action Buttons Toggles             **
**                                            **
***********************************************/
$(function () {
    'use strict';

    $('#headerClassicLink').hide();

    $('#headerLoggedinViewBtn').click(function () {
        $('#headerClassicLink').show();
        $('#headerLoginLink').hide();
    });

    $('#headerNotLoggedinViewBtn').click(function () {
        $('#headerLoginLink').show();
        $('#headerClassicLink').hide();
    });
});

/***********************************************
**                                            **
**  NBS Location Found/Selected               **
**                                            **
***********************************************/
$(function () {
    'use strict';

    $('#location_found_selected').hide();

    $('#locationFoundSelectedBtn').click(function () {
        $('#location_found_selected').show();
    });
});
