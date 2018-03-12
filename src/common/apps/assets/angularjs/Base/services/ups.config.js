'use strict';

/**
 * @ angular module
 * @name upsDOApp.services
 */

var tempService = angular.module('upsDoApp.services');

/** ******************* MAPPING SERVICES ****************** */

/**
* @services
* @name MappingService
* @description Controls the mapping service for various controllers
*/

tempService
		.service(
				'MappingService',
				[function() {
					var component = {
						shippingPreference : [
								{
									title : 'Basic Details',
									content : 'app_assets/templates/ups.ppc-shippingOption.html',
									active : true

								},
								{
									title : 'Returns',
									content : 'app_assets/templates/ups.ppc-returnServiceOption.html'

								},
								{
									title : 'Imports',
									content : 'app_assets/templates/ups.ppc-importControlOptions.html'

								},
								{
									title : 'Custom Packaging',
									content : 'app_assets/templates/ups.ppc-customPackagingTypes.html'

								},
								{
									title : 'References',
									content : 'app_assets/templates/ups.ppc-referenceValues.html'

								},
								{
									title : 'Payment',
									content : 'app_assets/templates/ups.ppc-preference-paymentMethod.html'

								},
								{
									title : 'Notifications',
									content : 'app_assets/templates/ups.ppc-preference-notificationOption.html'
								},
								{
									title : 'Pickups',
									content : 'app_assets/templates/ups.ppc-preference-PickupRequest.html'

								},
								{

									title : 'Printing',
									content : 'app_assets/templates/ups.ppc-preference-printing.html'

								},
								{

									title : 'History Table Display',
									content : 'app_assets/templates/ups.ppc-shippinghistoryDisplayOpt.html'

								},
								{
									title : 'Contacts',
									content : 'app_assets/templates/ups.ppc-preference-addressbook-options.html'

								},
								{
									title : 'Store Pickup Notifications',
									content : 'app_assets/templates/ups.ppc-preference-accesspoint.html'

								}

						],
						mychoicePreference : {
							groupOne : [
									{
										title : 'Name and Address',
										content : 'app_assets/templates/ups.ppc-mychoice-preference-updateMyName.html',
										active : true

									},
									{
										title : 'Name Variations',
										content : 'app_assets/templates/ups.ppc-mychoice-preference-addFirstName.html'

									},
									{
										title : 'Household Members',
										content : 'app_assets/templates/ups.ppc-addhouseholdMem.html'

									},
                                    {
										title : 'Package Matching Options',
										content : 'app_assets/templates/ups.ppc-mychoice-preference-packageMatchingOptions.html'

									}
									//{
										//title : 'Payment Method',
										//content : 'app_assets/templates/ups.ppc-mychoicesetpayment.html'

									//},
									//{
										//title : 'Membership Information',
										//content : 'app_assets/templates/ups.ppc-mychoice-preference-manageAddress.html'
									//}
									],
							groupTwo : [
									{
										title : 'Driver Instructions',
										content : 'app_assets/templates/ups.ppc-leaveInstructions.html',

									},
									{
										title : 'Alternate Delivery Location',
										content : 'app_assets/templates/ups.ppc-preference-setAltDelivery.html'

									},
									{
										title : 'Package Upgrades',
										content : 'app_assets/templates/ups.ppc-mychoice-surepost.html'

									}],
							groupThree : [
									{
										title: 'Delivery Alerts',
										content:'app_assets/templates/ups.ppc-mychoice-setDeliveryAlerts.html',
									}],
							groupFour : [{
								title : 'Delivery Hold Requests',
								content : 'app_assets/templates/ups.ppc-set-vacation.html',

							}]
						},
                        quantumViewPreference : {
                            groupOne : [
                            {
                    			title: 'Inbound',
                                content : 'app_assets/templates/ups.ppc-preference-quantumView-inbound.html'
                    		}, {
                    			title: 'Outbound',
                                content : 'app_assets/templates/ups.ppc-preference-quantumView-outbound.html'
                    		}, {
                    			title: 'Third-Party',
                                content : 'app_assets/templates/ups.ppc-preference-quantumView-thirdParty.html'
                    		}],
                            groupTwo : [
                                {
                                    title: 'Company Information',
                                    content:'app_assets/templates/ups.ppc-preference-quantumView-companyInformation.html'
                                },
                                {
                                    title: 'Company Services',
                                    content:'app_assets/templates/ups.ppc-preference-quantumView-companyServices.html'
                                },
                                {
                                    title: 'Users', content:'app_assets/templates/ups.ppc-preference-quantumView-users.html',
                                    active: true
                                }]
                        },
                        quantumViewUserAdministrationPreference : [
								{
									title : 'User Information',
									content : 'app_assets/templates/ups.ppc-preference-quantumView-userInformation.html',
									active : true
								},
								{
									title : 'Manage User Services',
									content : 'app_assets/templates/ups.ppc-preference-quantumView-manageUserServices.html'
								},
								{
									title : 'Manage Data Subscriptions',
									content : 'app_assets/templates/ups.ppc-preference-quantumView-manageDataSubscriptions.html'

								}],
						ratingPrefrence : [
								{
									title : 'Basic Details',
									content : 'app_assets/templates/ups.ppc-rating-option.html',
									active : true
								},
								{
									title : 'Packages and Letters',
									content : 'app_assets/templates/ups.ppc-packagletter-ratingPref.html'
								},
								{
									title : 'Freight',
									content : 'app_assets/templates/ups.ppc-freight-ratingPre.html'

								}],
						freightPrefrence : [
								{
									title : 'Air Freight',
									content : 'app_assets/templates/ups.ppc-AirFreight-preference.html',
									active : true
								},
								{
									title : 'Less-Than-Truckload Freight Preferences',
									content : 'app_assets/templates/ups.ppc-lessThanTruckload-preference.html'
								}],
						editAccount : [
								{
									title : 'Location Address',
									content : 'app_assets/templates/ups.ppc-account-address.html',
									//icons : 'map ups-accordion-icon',
									active : true
								},
								{
									title : 'Account Type',
									content : 'app_assets/templates/ups.ppc-account-types.html',
									//icons : 'setting ups-accordion-icon'
								},
								{
									title : 'Dangerous Goods',
									content : 'app_assets/templates/ups.ppc-hazardous-material.html',
									//icons : 'alert ups-accordion-icon'
								},
								{
									title : 'Pickup Options',
									content : 'app_assets/templates/ups.ppc-pickup-options.html',
									//icons : 'truck ups-accordion-icon'
								},
								{
									title : 'Store Payment',
									content : 'app_assets/templates/ups.ppc-edit-account-bill-my-account.html',
									//icons : 'creditcard ups-accordion-icon'
								},
								{
									title : 'Paperless Invoicing',
									content : 'app_assets/templates/ups.ppc-paperless-invoice.html',
									//icons : 'carbonneutral ups-accordion-icon'
								},
								{
									title : 'Authorized Users',
									content : 'app_assets/templates/ups.ppc-edit-account-invite-user.html',
									//icons : 'contactcircle ups-accordion-icon'
								},
								{
									title : 'Store Payment with Bill My Account',
									content : 'app_assets/templates/ups.ppc-bill-my-account.html',
									//icons : 'contactcircle ups-accordion-icon'
								}],
						myInformation : [
								//{
									//title : 'My Addresses',
									//'icons' : 'map',
									//'content' : 'app_assets/templates/ups.ppc-my-address.html',
									//active : true
								//},
								{
									title : 'Login Settings',
									//'icons' : 'setting',
									'content' : 'app_assets/templates/ups.ppc-login-settings.html'
								},
								{
									title : 'Communication Preferences',
									//'icons' : 'conversation',
									'content' : 'app_assets/templates/ups.ppc-myInformation-communicationPreference.html'
								},
                                {
									title : 'Privacy Preferences',
									//'icons' : 'conversation',
									'content' : 'app_assets/templates/ups.ppc-myInformation-privacyPreference.html'
                                    //active : true
								},
								{
									title : 'Security Questions',
									//'icons' : 'lock',
									'content' : 'app_assets/templates/ups.ppc-security-questions.html'
								}],
						dummyURLMap: {
							contactShipping: 'https://www.ups.com/content/us/en/shipping/index.html?WT.svl=PriNav',
							contactLocate: 'https://www.ups.com/dropoff?loc=en_US&WT.svl=PriNav'

						}

					};

					return {
						getShippingPrefMap : function() {
							return component.shippingPreference;
						},
                        getQuantumViewMap : function() {
                            return component.quantumViewPreference
                        },
                        getQuantumViewUserAdministrationMap : function() {
                            return component.quantumViewUserAdministrationPreference
                        },
						getMyChoicePrefMap : function() {
							return component.mychoicePreference;
						},
						getRatingPrefMap : function() {
							return component.ratingPrefrence;
						},
						getFreightPrefMap : function() {
							return component.freightPrefrence;
						},
						getEditAccountMap : function() {
							return component.editAccount;
						},
						getMyInformationMap : function() {
							return component.myInformation;
						},
						getURLMap : function() {
							return component.dummyURLMap;
						}
					};
				}]);
