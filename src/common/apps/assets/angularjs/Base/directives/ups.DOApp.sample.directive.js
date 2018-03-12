'use strict';

/**
 * @ angular module
 * @name upsDOApp.directives
 */

angular.module('upsDOApp.directives')

/**
* @directives
* @name upsSample
* @description Initialize the sample template
*/
	.directive('upsView', function() {
		return {
			restrict : 'AE',
			replace : 'true',
			templateUrl : '/app_assets/templates/ups.doa.html'
		};
	})
/**
* @directives
* @name upsSignup
* @description Initialize the SignupCtrl controller
*/

	.directive('upsSignup', function() {
		return {
			controller : 'SignupCtrl',
			restrict : 'AE',
			replace : 'true',
			templateUrl : '/app_assets/templates/ups.doa-sign-up.html'
		};
	})

/**
* @directives
* @name upsAddress
* @description Initialize the myChoiceCtrl controller
*/

	.directive('upsAddress', function() {
		return {
			controller : 'myChoiceCtrl',
			restrict : 'AE',
			replace : 'true',
			templateUrl : '/app_assets/templates/ups.doa-address.html'
		};
	})

/**
* @directives
* @name upsAvailability
* @description Initialize the MyAvailabilityCtrl controller
*/

	.directive(
			'upsAvailability',
			function() {
				return {
					controller : 'MyAvailabilityCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.doa-myavailability.html'
				};
			})

/**
* @directives
* @name upsConfirmation
* @description Initialize the ConfirmationCtrl controller
*/
	.directive(
			'upsConfirmation',
			function() {
				return {
					controller : 'ConfirmationCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.doa-confiramtion.html'
				};
			})

/**
* @directives
* @name upsUta
* @description Initialize the utaCtrl controller
*/

	.directive('upsUta', function() {
		return {
			controller : 'utaCtrl',
			restrict : 'AE',
			replace : 'true',
			templateUrl : '/app_assets/templates/ups.doa-uta.html'
		};
	})

/**
* @directives
* @name upsLogin
* @description Initialize the loginCtrl controller
*/

	.directive('upsLogin', function() {
		return {
			controller : 'loginCtrl',
			restrict : 'AE',
			replace : 'true',
			templateUrl : '/app_assets/templates/ups.ppc-login.html'
		};

	})

/**
* @directives
* @name upsNav
* @description Initialize the profileCtrl controller
*/
	.directive('upsNav', function() {
		return {
			controller : 'profileCtrl',
			restrict : 'AE',
			replace : 'true',
			templateUrl : '/app_assets/templates/ups.ppc-nav.html'
		};
	})

/**
* @directives
* @name upsLoginsettings
* @description Initialize the loginsettingsCtrl controller
*/

	.directive(
			'upsLoginsettings',
			function() {
				return {
					controller : 'loginsettingsCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.ppc-login-settings.html'
				};
			})

/**
* @directives
* @name upsEmailverification
* @description Initialize the email verification template
*/

	.directive(
			'upsEmailverification',
			function() {
				return {
					// controller:'changepasswordCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.ppc-email-verification.html'
				};
			})

/**
* @directives
* @name upsDeletepromo
* @description Initialize the delete promotion template
*/

	.directive(
			'upsDeletepromo',
			function() {
				return {
					// controller:'changepasswordCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.ppc-delete-promotion.html'
				};
			})

/**
* @directives
* @name upsAddpromo
* @description Initialize the add promotion template
*/

	.directive(
			'upsAddpromo',
			function() {
				return {
					// controller:'changepasswordCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.ppc-add-promotion.html'
				};
			})

/**
* @directives
* @name upsAddorauthenticateaccount
* @description Initialize the AddorAuthenticateAccountCtrl controller
*/

	.directive(
			'upsAddorauthenticateaccount',
			function() {
				return {
					controller : 'AddorAuthenticateAccountCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.doa-add-or-authenticate-account.html'
				};
			})

/**
* @directives
* @name upsChoosenotification
* @description Initialize the ChooseNotificationCtrl controller
*/

	.directive(
			'upsChoosenotification',
			function() {
				return {
					controller : 'ChooseNotificationCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.doa-chooseNotification.html'
				};
			})

/**
* @directives
* @name upsAccountoptions
* @description Initialize the AccountOptionsCtrl controller
*/

	.directive(
			'upsAccountoptions',
			function() {
				return {
					controller : 'AccountOptionsCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.doa-account-options.html'
				};
			})

/**
* @directives
* @name upsPayment
* @description Initialize the choosePaymentCtrl controller
*/

	.directive('upsPayment', function() {
			return {
			controller : 'choosePaymentCtrl',
			restrict : 'AE',
			replace : 'true',
			templateUrl : '/app_assets/templates/ups.doa-choosePayment.html'
		};
	})
/**
* @directives
* @name upsGuestshipping
* @description Initialize the guestCtrl controller
*/

	.directive(
			'upsNewpassword',
			function() {
				return {
					controller : 'guestCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.doa-newPassword.html'
				};
			})

/**
* @directives
* @name upsGuestshipping
* @description Initialize the guestCtrl controller
*/

	.directive(
			'upsGuestshipping',
			function() {
				return {
					controller : 'guestCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.doa-FromGuestShipping.html'
				};
			})

/**
* @directives
* @name upsGuestshipping
* @description Initialize the fromExistingUserCtrl controller
*/

	.directive(
			'upsExistinguser',
			function() {
				return {
					controller : 'fromExistingUserCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.doa-FromExistingUser.html'
				};
			})

/**
* @directives
* @name upsGuestshipping
* @description Initialize the guestCtrl controller
*/

	.directive(
			'upsOpenaccountpromo',
			function() {
				return {
					controller : 'OpenAccountCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.doa-openAccount-promo.html'
				};
			})
/**
* @directives
* @name upsGuestshipping
* @description Initialize the guestCtrl controller
*/

	.directive(
			'upsSchedulepickup',
			function() {
				return {
					controller : 'schedulePickupCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.doa-FromSchedulePickup.html'
				};
			})


/**
* @directives
* @name upsOpenaccountfail
* @description Initialize the guestCtrl controller
*/

	.directive(
			'upsOpenaccountfail',
			function() {
				return {
					controller : 'guestCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.doa-openAccount-fail.html'
				};
			})
/**
* @directives
* @name upsAddressvalidationerror
* @description Initialize the AddressValidationErrorCtrl controller
*/

	.directive(
			'upsAddressvalidationerror',
			function() {
				return {
					controller : 'AddressValidationErrorCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.doa-AddressValidationError.html'
				};
			})
/**
* @directives
* @name upsQuantumviewoptions
* @description Initialize the QuantumViewOptionsModalCtrl controller
*/
    .directive(
        'upsQuantumviewoptions',
        function() {
            return {
                controller : 'QuantumViewOptionsModalCtrl',
                restrict : 'AE',
                replace: 'true',
                templateUrl : '/app_assets/templates/ups.doa-quantumViewOptions.html'
            };
        })

/**
* @directives
* @name upsChoosepickupoptions
* @description Initialize the doaChoosePickupOptionsCtrl controller
*/

	.directive(
			'upsChoosepickupoptions',
			function() {
				return {
					controller : 'doaChoosePickupOptionsCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.doa-choosePickupOptions.html'
				};
			})

/**
* @directives
* @name upsChoosepickupstart
* @description Initialize the ChoosePickupStartCtrl controller
*/

	.directive(
		'upsChoosepickupstart',
			function() {
				return {
					controller : 'ChoosePickupStartCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.doa-choosePickupStart.html'
				};

		})

/**
* @directives
* @name upsLocationWidget
* @description Initialize the selectAPLocation controller
*/

.directive(
		'upsLocationWidget',
			function() {
				return {
					controller : 'selectAPLocation',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.ppc-locationWidget.html'
				};

		})

/**
* @directives
* @name upsServiceterms
* @description Initialize the prefServiceTermsDialogCtrl controller
*/

	.directive(
		'upsServiceterms',
			function() {
				return {
					controller : 'prefServiceTermsDialogCtrl',
					restrict : 'AE',
					replace : 'true',
					templateUrl : '/app_assets/templates/ups.ppc-serviceTerms.html'
				};

	})


/**
* @directives
* @name upsSaveChanges
* @description Initialize the prefSaveChangesCtrl controller
*/

    .directive(
        'upsSaveChanges',
        function () {
            return {
                controller: 'prefSaveChangesCtrl',
                restrict: 'AE',
                replace: 'true',
                templateUrl: '/app_assets/templates/ups.ppc-changessave.html'
            };
        }
     );

/**
* @directives
* @name upsVerifyAuthentication
* @description Initialize the verifyAuthenticationCtrl controller
*/
/*
.directive('upsVerifyAuthentication',function() {
		return {
			controller : 'verifyAuthenticationCtrl',
			restrict : 'AE',
			replace : 'true',
			templateUrl : '/app_assets/templates/ups.ppc-myChoice-verifyAuthentication.html'
		};
	})
*/
/**
* @directives
* @name upsVerifyAuthenticationCheck
* @description Initialize the verifyAuthenticationCheckCtrl controller
*/
/*
.directive('upsVerifyAuthenticationCheck',function() {
		return {
			controller : 'verifyAuthenticationCheckCtrl',
			restrict : 'AE',
			replace : 'true',
			templateUrl : '/app_assets/templates/ups.ppc-myChoice-verifyAuthentication_process.html'
		};
	})
*/
/**
* @directives
* @name upsVerifyAuthenticationMail
* @description Initialize the verifyAuthenticationMailCtrl controller
*/
/*
.directive('upsVerifyAuthenticationMail',function() {
		return {
			controller : 'verifyAuthenticationMailCtrl',
			restrict : 'AE',
			replace : 'true',
			templateUrl : '/app_assets/templates/ups.ppc-myChoice-verifyAuthentication_mailProcess.html'
		};
	})
*/
/**
* @directives
* @name upsVerifyAuthenticationMailverify
* @description Initialize the verifyAuthenticationMailVerifyCtrl controller
*/
/*
.directive('upsVerifyAuthenticationMailverify',function() {
		return {
			controller : 'verifyAuthenticationMailVerifyCtrl',
			restrict : 'AE',
			replace : 'true',
			templateUrl : '/app_assets/templates/ups.ppc-myChoice-verifyAuthentication_mailVerify.html'
		};
	})
*/
/**
* @directives
* @name upsVerifyAuthenticationFailed
* @description Initialize the verifyAuthenticationFailedCtrl controller
*/
/*
.directive('upsVerifyAuthenticationFailed',function() {
		return {
			controller : 'verifyAuthenticationFailedCtrl',
			restrict : 'AE',
			replace : 'true',
			templateUrl : '/app_assets/templates/ups.ppc-myChoice-verifyAuthentication_failed.html'
		};
	})
*/
/**
* @directives
* @name upsAuth
* @description Initialize the verifyCurrentAuthCtrl controller
*/
/*
.directive('upsAuth',function() {
		return {
			controller : 'verifyCurrentAuthCtrl',
			restrict : 'AE',
			replace : 'true',
			templateUrl : '/app_assets/templates/ups.ppc-myChoice-verifyAuth.html'
		};
	});
*/
