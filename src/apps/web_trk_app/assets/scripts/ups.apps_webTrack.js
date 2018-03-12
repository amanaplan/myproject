/************************************************
*   script for legacy tracking app              *
*                                               *
*************************************************/

$(function(){
		'use strict';

/*************************************************
*   ct1_tra_tra(3det)							**
*												**
*************************************************/

//When The Page Loads

$('#additional_packages_expanded').show();

/*********************************
*   Tracking Bar Module			**
**********************************
//Authenticated, Authorized
$('#authenticatedAuthoBtn').click(function() {
	$('#authenticatedAutho').show();
	$('#nonAuthenticated').hide();
	$('#authenticatedNonAuthorized').hide();
	$('#nonUSAuthenticatedNonAuthorized').hide();
	});
//Non-Authenticated
$('#nonauthenticatedBtn').click(function() {
	$('#nonAuthenticated').show();
	$('#authenticatedAutho').hide();
	$('#authenticatedNonAuthorized').hide();
	$('#nonUSAuthenticatedNonAuthorized').hide();
	});
//Authenticated, Non-Authorized
$('#authenticatedNonAuthorizedBtn').click(function() {
	$('#authenticatedNonAuthorized').show();
	$('#authenticatedAutho').hide();
	$('#nonAuthenticated').hide();
	$('#nonUSAuthenticatedNonAuthorized').hide();
	});
//Non-US Authenticated, Non-Authorized
$('#nonUSAuthenticatedNonAuthorizedBtn').click(function() {
	$('#nonUSAuthenticatedNonAuthorized').show();
	$('#authenticatedAutho').hide();
	$('#nonAuthenticated').hide();
	$('#authenticatedNonAuthorized').hide();
	});
	*/
	$('#packagePalletsTitle').click(function() {
		$('#additional_packages_expanded').toggle();
	});


/*************************************************
*   ct1_tra_tra(3det)_pod						**
*												**
**************************************************/

/**User Interface - Default **/
$('#defaultBtn').click(function() {
	$('#billOfLadingLabel').hide();
	$('#poNumberLabel').hide();
	$('#productLabel').hide();
	$('#servicesLabel').hide();
	$('#deliveryLabel').hide();
	$('#liftgateLabel').hide();
	$('#numberOfPiecesLabel').hide();
	$('#shippedFromLabel').hide();
	$('#trackingPROLabel').hide();
	$('#gpsmap_partial').hide();
	$('#trackingNumberLabel').show();
	$('#referenceNumberLabel').show();
	$('#productLabel').show();
	$('#serviceLabel').show();
	$('#weightLabel').show();
	$('#upsCarbonNeutralLabel').show();
	$('#specialInstructionsLabel').show();
	$('#shippedBilledLabel').show();
	$('#deliveredOnLabel').show();
	$('#deliveredToLabel').show();
	$('#upsReturnsLabel').show();
	$('#receivedByLabel').show();
	$('#leftAtLabel').show();
	});
/**Postal Service Delivery **/
$('#postalServiceBtn').click(function() {
	$('#trackingPROLabel').hide();
	$('#billOfLadingLabel').hide();
	$('#poNumberLabel').hide();
	$('#productLabel').hide();
	$('#upsCarbonNeutralLabel').hide();
	$('#specialInstructionsLabel').hide();
	$('#servicesLabel').hide();
	$('#deliveryLabel').hide();
	$('#liftgateLabel').hide();
	$('#numberOfPiecesLabel').hide();
	$('#weightLabel2').hide();
	$('#servicesLabel').hide();
	$('#upsReturnsLabel').hide();
	$('#receivedByLabel').hide();
	$('#leftAtLabel').hide();
	$('#gpsmap_partial').hide();
	$('#trackingNumberLabel').show();
	$('#referenceNumberLabel').show();
	$('#weightLabel').show();
	$('#shippedBilledLabel').show();
	$('#deliveredOnLabel').show();
	$('#deliveredToLabel').show();
	});
/**UPS Returns Pack and Collect **/
$('#upsReturnsBtn').click(function() {
	$('#trackingPROLabel').hide();
	$('#billOfLadingLabel').hide();
	$('#poNumberLabel').hide();
	$('#productLabel').hide();
	$('#specialInstructionsLabel').hide();
	$('#servicesLabel').hide();
	$('#deliveryLabel').hide();
	$('#liftgateLabel').hide();
	$('#numberOfPiecesLabel').hide();
	$('#weightLabel2').hide();
	$('#servicesLabel').hide();
	$('#upsReturnsLabel').hide();
	$('#shippedFromLabel').hide();
	$('#gpsmap_partial').hide();
	$('#trackingNumberLabel').show();
	$('#referenceNumberLabel').show();
	$('#serviceLabel').show();
	$('#productLabel').show();
	$('#weightLabel').show();
	$('#upsCarbonNeutralLabel').show();
	$('#specialInstructionsLabel').show();
	$('#shippedBilledLabel').show();
	$('#deliveredOnLabel').show();
	$('#deliveredToLabel').show();
	$('#receivedByLabel').show();
	$('#leftAtLabel').show();
	});
/**LTL Freight**/
$('#ltlFreightBtn').click(function() {
	$('#trackingNumberLabel').hide();
	$('#referenceNumberLabel').hide();
	$('#billOfLadingLabel').hide();
	$('#productLabel').hide();
	$('#serviceLabel').hide();
	$('#specialInstructionsLabel').hide();
	$('#upsCarbonNeutralLabel').hide();
	$('#shippedBilledLabel').hide();
	$('#deliveryLabel').hide();
	$('#liftgateLabel').hide();
	$('#numberOfPiecesLabel').hide();
	$('#weightLabel').hide();
	$('#upsReturnsLabel').hide();
	$('#leftAtLabel').hide();
	$('#receivedByPhoto').hide();
	$('#gpsmap_partial').hide();
	$('#trackingPROLabel').show();
	$('#billOfLadingLabel').show();
	$('#poNumberLabel').show();
	$('#deliveredOnLabel').show();
	$('#servicesLabel').show();
	$('#deliveredToLabel').show();
	$('#numberOfPiecesLabel').show();
	$('#weightLabel2').show();
	$('#shippedFromLabel').show();
	$('#deliveredToLabel').show();
	$('#receivedByLabel').show();
	});
/**Shipment Release Authorized**/
$('#shipmentReleaseAuthorizedBtn').click(function() {
	$('#trackingPROLabel').hide();
	$('#billOfLadingLabel').hide();
	$('#referenceNumberLabel').show();
	$('#poNumberLabel').hide();
	$('#productLabel').hide();
	$('#servicesLabel').hide();
	$('#deliveryLabel').hide();
	$('#liftgateLabel').hide();
	$('#numberOfPiecesLabel').hide();
	$('#weightLabel2').hide();
	$('#shippedFromLabel').hide();
	$('#receivedByPhoto').hide();
	$('#gpsmap_partial').hide();
	$('#trackingNumberLabel').show();
	$('#referenceNumberLabel').show();
	$('#deliveredOnLabel').show();
	$('#serviceLabel').show();
	$('#upsCarbonNeutralLabel').show();
	$('#specialInstructionsLabel').show();
	$('#shippedBilledLabel').show();
	$('#deliveredOnLabel').show();
	$('#weightLabel').show();
	$('#upsReturnsLabel').show();
	$('#deliveredToLabel').show();
	$('#receivedByLabel').show();
	$('#leftAtLabel').show();

	});
/**With GPS Coordinates and Map*/
$('#withGPSBtn').click(function() {
	$('#trackingPROLabel').hide();
	$('#billOfLadingLabel').hide();
	$('#poNumberLabel').hide();
	$('#productLabel').hide();
	$('#servicesLabel').hide();
	$('#deliveryLabel').hide();
	$('#liftgateLabel').hide();
	$('#numberOfPiecesLabel').hide();
	$('#weightLabel2').hide();
	$('#shippedFromLabel').hide();
	$('#receivedByPhoto').hide();

	$('#trackingNumberLabel').show();
	$('#referenceNumberLabel').show();
	$('#deliveredOnLabel').show();
	$('#serviceLabel').show();
	$('#upsCarbonNeutralLabel').show();
	$('#specialInstructionsLabel').show();
	$('#shippedBilledLabel').show();
	$('#deliveredOnLabel').show();
	$('#weightLabel').show();
	$('#upsReturnsLabel').show();
	$('#deliveredToLabel').show();
	$('#receivedByLabel').show();
	$('#leftAtLabel').show();
	$('#gpsmap_partial').show();

	});

});
