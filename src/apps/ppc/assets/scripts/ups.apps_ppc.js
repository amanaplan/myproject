(function () {
	'use strict';

	var ppcAuthStorage = {
		complete : false
	};

	var ppcAuthApp = angular.module('ppcAuthRequired', [
		'ngRoute',
		'ui.bootstrap',
		'upsDOApp.controllers',
        'upsDOApp.directives',
		'upsDoApp.services',
		'upsApp'
	]);

	ppcAuthApp.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {
			templateUrl : '/app_assets/templates/ups.ppc-authRequired.html',
			controller : 'ppcAuth',
			title : 'Authenication Required'
		}).when('/enterpin', {
			templateUrl : '/app_assets/templates/ups.ppc-authRequired2.html',
			controller : 'ppcAuthPin',
			title : 'Authenication Required'
		}).when('/complete', {
			templateUrl : '/app_assets/templates/ups.ppc-authRequired3.html',
			controller : 'ppcAuthComplete',
			title : 'Authenication Complete'
		}).otherwise({
			redirectTo : '/'
		});
	}]);

	ppcAuthApp.controller('ppcDiscountCodes', ['$scope', 'ModalService', function(scope, modalService) {
		scope.promoConflict = function () {
			modalService.open({
				title: 'You\'ve got options.',
				content: '/app_assets/templates/ups.ppc-discountCodesConflictModal.html'
			}, function(sc){

				sc.applyDiscount = function(){
					modalService.next({
						title: 'Start saving now.',
						content: '/app_assets/templates/ups.ppc-discountCodesApply.html'
					}, function (sc) {
						sc.closeDialog = function () {
							modalService.dismiss();
						};
					});
				};

				sc.keepDiscount = function(){
					modalService.dismiss();
				};

			});
		};

		scope.promoConflictNew = function () {
			modalService.open({
				title: 'You\'ve got options.',
				content: '/app_assets/templates/ups.ppc-discountCodesConflictModal.html'
			}, function(sc){

				sc.recommendNew = true;

				sc.applyDiscount = function(){
					modalService.next({
						title: 'Start saving now.',
						content: '/app_assets/templates/ups.ppc-discountCodesApply.html'
					}, function (sc) {
						sc.closeDialog = function () {
							modalService.dismiss();
						};
					});
				};

				sc.keepDiscount = function(){
					modalService.dismiss();
				};

			});
		};

		scope.promoConflictOld = function () {
			modalService.open({
				title: 'You\'ve got options.',
				content: '/app_assets/templates/ups.ppc-discountCodesConflictModal.html'
					});
				};
        scope.promoTermsConditions = function () {
			modalService.open({
				title: 'Terms and Conditions.',
				content: '/app_assets/templates/ups.ppc-promoTermsandConditionsModal.html'

					});
				};

	}]);

    /*****Added for Jan 18 v1.1 1800g****************/
    ppcAuthApp.controller('ppcChangePickupOptions', ['$scope', 'ModalService', function(scope, modalService) {
    		scope.changeNotAvailable = function () {
    			modalService.open({
    				title: 'Some Pickup Options Not Available',
    				content: '/app_assets/templates/ups.ppc-changeInPickupOptionsNotAvailable.html'
    			}, function(sc){

    				sc.selectPickup = function(){
    					modalService.dismiss();
    				};

    				sc.closeDialog = function(){
    					modalService.dismiss();
    				};

    			});
    		};

    		scope.changeMoreAvailable = function () {
    			modalService.open({
    				title: 'Additional Pickup Options Available',
    				content: '/app_assets/templates/ups.ppc-changeInPickupOptionsMoreOptions.html'
    			}, function(sc){

    				sc.continue = function(){
    					modalService.dismiss();
    				};

    			});
    		};

    		scope.changeUnknownAvailable = function () {
    			modalService.open({
    				title: 'Limited Pickup Options Available',
    				content: '/app_assets/templates/ups.ppc-changeInPickupOptionsUnknown.html'
    			}, function(sc){

    				sc.selectPickup = function(){
    					modalService.dismiss();
    				};

    				sc.closeDialog = function(){
    					modalService.dismiss();
    				};

    			});
    		};
    	}]);
    /*****Added for Jan 18 v1.1 1800g****************/
    /*****Added for Jan 18 v1.1 1811****************/
    ppcAuthApp.controller('ppcDuplicatePackageMatchModal', ['$scope', 'ModalService', function(scope, modalService) {
		scope.openDuplicatePackageMatch = function () {
			modalService.open({
				title: 'Duplicate [Email Address / Phone Number]',
				content: '/app_assets/templates/ups.ppc-duplicatePkgMtchModal.html'
			}, function(sc) {
				sc.submit = function() {
					modalService.dismiss();
				};
			});

		};
	}]);
    /*****Added for Jan 18 v1.1 1811****************/


	ppcAuthApp.controller('ppcMobileNotificationsManager', ['$scope', 'ModalService', function(scope, modalService) {
		scope.mobileNotification = function () {
			modalService.open({
				title: 'Mobile Notifications Manager',
				content: '/app_assets/templates/ups.ppc-mobileNotificationsManagerModal.html'
			}, function(sc) {
				sc.closeDialog = function() {
					modalService.dismiss();
				};
			});

		};

		scope.mobileNotificationOptedOut = function () {
			modalService.open({
				title: 'Mobile Number Opted Out',
				content: '/app_assets/templates/ups.ppc-mobileNumberOptedOutModal.html'
			}, function(sc) {
				sc.closeDialog = function() {
					modalService.dismiss();
				};
			});
		};

		scope.mobileNotificationNotOptedIn = function () {
			modalService.open({
				title: 'Mobile Number Not Opted In',
				content: '/app_assets/templates/ups.ppc-mobileNumberNotOptedInModal.html'
			}, function(sc) {
				sc.closeDialog = function() {
					modalService.dismiss();
				};
			});
		};

		scope.mobileUpdatedTermsConditions = function () {
			modalService.open({
				title: 'Updated Terms and Conditions',
				content: '/app_assets/templates/ups.ppc-updatedTermsConditionsModal.html'
			}, function(sc) {
				sc.closeDialog = function() {
					modalService.dismiss();
				};
			});
		};

	}]);

    /*****Added for Jan 18 v1.1 1811****************/
    ppcAuthApp.directive('upsDuplicatePackageMatchModal', function () {
		return {
			restrict: 'E',
			templateUrl: '/app_assets/templates/ups.ppc-duplicatePkgMtch.html',
			controller: 'ppcDuplicatePackageMatchModal'
		};
	});
    /*****Added for Jan 18 v1.1 1811****************/

	ppcAuthApp.directive('upsMobileNotificationsManager', function () {
		return {
			restrict: 'E',
			templateUrl: '/app_assets/templates/ups.ppc-mobile-notifications-manager.html',
			controller: 'ppcMobileNotificationsManager'
		};
	});

	ppcAuthApp.directive('upsDiscountCodes', function () {
		return {
			restrict: 'E',
			templateUrl: '/app_assets/templates/ups.ppc-discountCodes.html',
			controller: 'ppcDiscountCodes'
		};
	});

    /*****Added for Jan 18 v1.1 1800g****************/
    ppcAuthApp.directive('upsChangePickup', function () {
		return {
			restrict: 'E',
			templateUrl: '/app_assets/templates/ups.ppc-changeInPickupOptionsModals.html',
			controller: 'ppcChangePickupOptions'
		};
	});
    /*****Added for Jan 18 v1.1 1800g****************/

	ppcAuthApp.controller('ppcAuth', ['$scope', '$location', function (scope, location) {
		scope.nextScreen = function () {
			ppcAuthStorage.method = scope.pinMethod;

			location.path('/enterpin');
		};
	}]);

	ppcAuthApp.controller('ppcAuthPin', ['$scope', '$location', function (scope, location) {
        scope.pinNum = '';
        scope.invalidPin = false;
        scope.tooManyFailed = false;

		if (!ppcAuthStorage.method) {
			location.path('/');
			return;
		}

		scope.goBack = function () {
			delete ppcAuthStorage.method;
			location.path('/');
		};

		scope.method = ppcAuthStorage.method;

		scope.submitPin = function () {
			if (scope.pinNum.$invalid) {
				return;
			}
			ppcAuthStorage.complete = true;
			location.path('/complete');
		};
	}]);

	ppcAuthApp.controller('ppcAuthComplete', ['$scope', '$rootScope', '$location', function (scope, rootScope, location) {
		if (!ppcAuthStorage.complete) {
			location.path('/');
			return;
		}

		//rootScope.pageTitle = 'Authentication Complete';
	}]);

	/*Loading Screen Buttons*/
	ppcAuthApp.directive('upsLoadingScreen', function () {
		return {
			restrict: 'E',
			templateUrl: '/app_assets/templates/ups.ppc-loading-screens.html',
			controller: 'ppcLoadingScreen'
		};
	});
	ppcAuthApp.controller('ppcLoadingScreen', ['$scope', 'ModalService', function(scope, modalService) {
		scope.loadingScreen = function () {
			modalService.open({
				title: 'Loading...please wait.',
				content: '/app_assets/templates/ups.ppc-loading-screenModal.html'
			},
			function (sc)
			{sc.percent = 45;}
			);
		};
	}]);

    ppcAuthApp.directive('upsQuantumViewResetPasswordModal', function () {
		return {
			restrict: 'E',
			templateUrl: '/app_assets/templates/ups.ppc-preference-quantumView-resetPasswordModal.html',
            controller: 'ppcQuantumViewResetPasswordModal'
		};
	});

    ppcAuthApp.controller('ppcQuantumViewResetPasswordModal', ['$scope', 'ModalService', function($scope, ModalService) {
		$scope.openResetPassword = function () {
			ModalService.open({
				title: 'Are You Sure?',
				content: '/app_assets/templates/ups.ppc-quantumView-remove-account-or-inbound-loc-modal.html'
			}, function(sc) {
                sc.resetPasswordLabels = true;
                sc.deleteUser = false;
                sc.instructional_content = "If you continue, we'll reset this user's password and send them a password reset notification.";
                sc.continueButton = function(){
                    ModalService.dismiss();
                };
			});

		};
	}]);

    ppcAuthApp.directive('upsQuantumViewDeleteUserConfirmationModal', function () {
		return {
			restrict: 'E',
			templateUrl: '/app_assets/templates/ups.ppc-preference-quantumView-deleteUserModal.html',
            controller: 'ppcQuantumViewDeleteUserConfirmationModal'
		};
	});

    ppcAuthApp.controller('ppcQuantumViewDeleteUserConfirmationModal', ['$scope', 'ModalService', function($scope, ModalService) {
		$scope.openDeleteUserModal = function () {
			ModalService.open({
				title: 'Are you sure you want to delete this user?',
				content: '/app_assets/templates/ups.ppc-quantumView-remove-account-or-inbound-loc-modal.html'
			}, function(sc) {
                sc.deleteUser = true;
                sc.yesButton = function(){
                    ModalService.dismiss();
                };
                sc.noButton = function(){
                    ModalService.dismiss();
                };
			});

		};
	}]);
})();

(function(){
	'use strict';

	var cancelMemStandalone = angular.module('cancelMemStandalone', [
		'ngRoute',
		'ui.bootstrap',
		'upsDOApp.controllers',
        'upsDOApp.directives',
		'upsDoApp.services',
		'upsApp'
	]);

	cancelMemStandalone.config(['$routeProvider', function (routeProvider) {
		routeProvider.when('/', {
			templateUrl : '/app_assets/templates/ups.ppc-cancelMembership-standalone.html',
			controller : 'cmsCtrl',
			title : 'Cancel My Membership'
		}).when('/cmcConfirm', {
			templateUrl : '/app_assets/templates/ups.ppc-cancelMembership-standalone-confirm.html',
			controller : 'cmsConfirmCtrl',
			title : 'Thank You'
		}).otherwise({
			redirectTo : '/'
		});
	}]);

	//Call json file
	var metaDataURL = 'ups.ppc-metaData.json';
//	cancelMemStandalone.directive('upsCancelMembership', function(){
//		return {
//			restrict: 'E',
//			templateUrl: '/app_assets/templates/ups.ppc-cancelMembership-standalone.html',
//			controller: 'cmsCtrl'
//		};
//	});
	cancelMemStandalone.controller('cmsCtrl', ['$scope', '$location', function(scope, location){
		scope.addressForm = {};
		scope.confirm = function () {
			location.path('/cmcConfirm');
		};

//		MockJSONCalls.getJson({urlString: 'ups.ppc-metaData.json'})
//		        // then() called when response gets back
//		        .then(function(data) {
//					// promise fulfilled TODO set metadata
//		        	if(data.errorCode){
//					}else{
//						DashboardService.setMetaData(data);
//						sc.countryList = data.countries;
//						sc.formObj.country = sc.countryList[0].code;
//					}
//		        }, function() {
//		            // promise rejected
//		        });
	}]);
	cancelMemStandalone.controller('cmsConfirmCtrl', ['$scope', function(scope){	}]);

})();
