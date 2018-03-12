'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description
 * Initialize the module
 */
	angular.module('upsDOApp.controllers')

/**
 * @controller
 * @name upsDOApp.controllers.controller : ConfirmationCtrl
 * @description
 * Controls the Account confirmation flow
 */
	.controller('ConfirmationCtrl',['$scope','$http','$window','UtilService','$rootScope','$location','localStorageService',function($scope,$http,$window,UtilService,$rootScope,$location,localStorageService){
		// init
		var confirmationData='ups.doa-sample.json';
		if($location.path() ===  '/signup/confirmation'){
			$rootScope.hideHeader = true;
		}else{
			$rootScope.hideHeader = false;
		}
		/**
		* @function
		* @name redirectToMyProfile
		* @description redirection to the profile.
		*/

		$scope.redirectToMyProfile = function(obj){
			localStorageService.set('Redirect',{'RedirectFrom':obj});
			var url = 'http://' + $window.location.host +'/ppcProfile.html#/profilePage';
			$window.location = url;
		};
		/**
		* @function
		* @name init
		* @description initialize through service.
		*/
		function init(){
			UtilService.mockServiceCalls({urlString: confirmationData}, function(response){
				var obj = response.data;
				if(obj.errorCode){
					console.log('error');
				} else {
					$scope.userInfo = obj;
				}
			});
		}

		$scope.changePage = function(){
			var url = 'http://' + $window.location.host +'/ppcProfile.html';
			$window.location = url;

		};

		$scope.openpopup = function(){
			UtilService.openTearmsAndConditions('https://www.ups.com/content/us/en/resources/techsupport/mychoice.html');
		};

		$scope.close = function(){
			if($rootScope.isManageMembershipFlow === true){
				var addedAddressValue = {};
				addedAddressValue.address={};
				addedAddressValue._id = $rootScope.deliveryAddressData.address.length + 1;
				addedAddressValue.description = $rootScope.updatedAddressValue.address1;
				addedAddressValue.expText = '';
				addedAddressValue.memLevel = 'basic';
				addedAddressValue.pendingActCode = false;
				addedAddressValue.active = true;
				addedAddressValue.expired = false;
				addedAddressValue.pendingExp = false;
				addedAddressValue.cancelled = false;

				addedAddressValue.address.street = $rootScope.updatedAddressValue.address1;
				addedAddressValue.address.city = $rootScope.updatedAddressValue.city;
				addedAddressValue.address.pCode = $rootScope.updatedAddressValue.zipcode;
				addedAddressValue.address.stateCode = $rootScope.updatedAddressValue.state_select;

				$rootScope.deliveryAddressData.address.push(addedAddressValue);
				$rootScope.isManageMembershipFlow = false;

				$rootScope.$broadcast('sortAddressDescriptions', {});
			}
		};

		init();

		$scope.toolTip = {
				templateUrl : '/app_assets/templates/ups.ppc-tooltipPopover.html',
				position : 'top'
		};
	}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : popupCtrl
 * @description Controls the Modal open throughout the application
 */
	.controller('popupCtrl',['$scope','$uibModalInstance','$sce', '$compile', '$location','ModalService','design', 'callback',function($scope,$uibModalInstance,$sce, $compile, $location,ModalService, design, callback){
		$scope.trustAsHtml = $sce.trustAsHtml;
		$scope.design = design;
		if (callback && typeof (callback) === 'function') {
	        callback($scope, $uibModalInstance, $compile);
		}
		$scope.$on('modal.closing', function() {
			ModalService.clearValues();
	    });
		$scope.ok = function (data) {
			$uibModalInstance.close(data, $scope);
		};

		$scope.cancel = function () {
			ModalService.dismiss();
		};

		$scope.safeApply = function(fn) {
		  var phase = this.$root.$$phase;
		  if(phase === '$apply' || phase === '$digest') {
		    if(fn && (typeof(fn) === 'function')) {
		      fn();
		    }
		  } else {
		    this.$apply(fn);
		  }
		};

		$scope.$on('changeDesign', function(ev, obj, callback){
			if (callback && typeof (callback) === 'function') {
		        callback($scope, $uibModalInstance, $compile);
			}
			$scope.safeApply(function(){
				$scope.design = angular.copy(obj);
			});
		});
		$scope.$on('changeTitle', function(ev, obj){
			$scope.safeApply(function(){
				$scope.design.title = obj.title;
			});
		});
	}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : IdVerification
 * @description Controls the ID verification Flow
 */
	.controller('IdVerification',['$scope','$location', 'UtilService','$rootScope','ModalService',function($scope,$location,UtilService,$rootScope,ModalService){

		$scope.ModalService = ModalService;
		var user={
			name:'John'
		};
		/**
		* @function
		* @name init
		* @description Used to initialize the variables
		*/
		function init(){
			$scope.formObj = {
				key:[]
			};

			$scope.count=0;
			$scope.formObj.checkedVal= true;
			$scope.submitclicked=false;
			$scope.selectedItemArray = [];
			$scope.selectedIndexValue = 0;
			$scope.step = 1;
			// Fetch Fraud score and options to be displayed
			UtilService.mockServiceCalls({urlString: 'ups.doa-id-verification.json'}, function(response){
				var obj = response.data;
				if(obj.errorCode){
					console.log('error');
				} else {
					$scope.secureOptions = obj.options;
				}
			});
		}

		/**
		* @function
		* @name optionChanged
		* @description Change of verification options
		*/
		$scope.optionChanged = function(item){
			$scope.selectedItem = item;
			if($scope.formObj && $scope.formObj.stepOne === 'Shipping Address'){
				$scope.selectedItem.content[0].checked = false;
			}
			else{
				$scope.selectedItem.content[0].checked = true;
			}

		};

		/**
		* @function
		* @name checkboxClicked
		* @description Shipping address checked value
		*/
		function checkboxClicked(index){
			$scope.selectedIndexValue = index;
			if($scope.formObj && $scope.formObj.stepOne === 'Shipping Address' ){
				for(var i=0;i<$scope.selectedItem.content.length;i++){
					if($scope.selectedItem.content[i].checked){
						$scope.formObj.checkedVal= false;
						break;
					}
					else{
						$scope.formObj.checkedVal= true;
					}

				}
			}

		}

		/**
		* @function
		* @name clickFunc
		* @description Check for shipping address checkbox value
		*/
		$scope.clickFunc = function(item,index){
			if($scope.formObj.stepOne==='Shipping Address'){
				item.checked=!item.checked;
				checkboxClicked(index,item);
			}else{
				checkboxClicked(index,item);
			}
		};

		$scope.redirectMyProfile=function(obj){
			console.log(obj);
		};

		/**
		* @function
		* @name accountOptionStep
		* @description On successful verification page redirects to payment page
		*/
		$scope.accountOptionStep = function(){
			/** For Add new account flow **/
			if($location.path() === '/paymentPage'){
				$rootScope.parentPage = 'IDSuccess';
				$rootScope.isFromPaymentPage = true;
				ModalService.next({
	            	title: 'Set your payment account options.',
	                content: '/app_assets/templates/ups.doa-accountOptionsModal.html',
				});
			}else{
				ModalService.dismiss();
			}
		};

		/**
		* @function
		* @name nextStep
		* @description Next step check for verification page
		*/
		$scope.nextStep = function(){
			if($scope.step === 1){
				$scope.step = 2;
				var securityQuesArray= document.getElementsByClassName('ups-securityQues');
				for (var i=0; i<securityQuesArray.length; i++) {
					securityQuesArray[i].setAttribute('aria-describedby', 'secQues-error');
					securityQuesArray[i].setAttribute('aria-required', 'true');
				}
			}
			else if($scope.step === 2 && ($scope.formObj && $scope.formObj.stepOne === 'PIN' && $scope.formObj.stepTwo && $scope.selectedIndexValue === 3)){
				$scope.step = 4;
			}
			else if($scope.step === 2 && ($scope.formObj && $scope.formObj.stepOne === 'PIN')){
					$scope.step = 3;

			}
			else if($scope.step === 3 && ($scope.formObj && $scope.formObj.stepOne === 'PIN')){
				$scope.submitclicked=true;
				if($scope.formObj.stepThree && $scope.formObj.stepThree === '12345'){
					$scope.step = 5;

					ModalService.changeSelfContent({
						title: 'Thanks for confirming your identity, ['+user.name+'].'
					});
				}
				else{
					$scope.count += 1;
					if($scope.count>=4){
						$scope.step = 6;
						ModalService.changeSelfContent({
							title: 'We\'re unable to confirm your identity.'
						});
					}
				}
			}
			else{
				/** For Add new account flow **/
				if($location.path()==='/paymentPage' || $location.path()==='/preferencePage/ShippingPreference' || ($rootScope.lastPage ==='choosePayment' && $rootScope.typeOfUser === '')){
					$rootScope.parentPage = 'IDSuccess';
					$rootScope.isFromPaymentPage = true;
					ModalService.next({
	                	title: 'Set your payment account options.',
	                    content: '/app_assets/templates/ups.doa-accountOptionsModal.html',
					});
				}else if($rootScope.typeOfUser === 'premium'){
					ModalService.next({
						title: 'How would you like to pay?',
			            content: '/app_assets/templates/ups.doa-choosePaymentModal.html',
					});
				}else{
					ModalService.next({
						title: 'Welcome to UPS My Choice<sup>&reg;</sup>, John.',
						content: '/app_assets/templates/ups.doa-ConfirmationModal.html',
						data: $scope.checkObj
					});
				}
			}
		};

		init();
	}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : popoverCtrl
 * @description Controls the ID verification Flow
 */
	.controller('popoverCtrl', ['$scope', '$rootScope',function($scope,$rootScope){
		$scope.hide = function(){
			$rootScope.$broadcast('hidePopover');
			if($rootScope.linkClicked === 'filterByTags'){
				angular.element('#filterByTags').focus();
			}else if($rootScope.linkClicked === 'addTags'){
				angular.element('#addTag').focus();
			}
			$rootScope.linkClicked = '';
		};
		$scope.closeFocus = function(){
			angular.element('#closeBtn').focus();
		};
		$scope.toolTip = {
				templateUrl : '/app_assets/templates/ups.ppc-tooltipPopover.html',
				position : 'top'
		};
	}]);
