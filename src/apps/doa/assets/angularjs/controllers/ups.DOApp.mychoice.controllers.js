'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module
 */
angular.module('upsDOApp.controllers')

/**
 * @controller
 * @name upsDOApp.controllers.controller : myChoiceCtrl
 * @description Controls the Enter Address flow
 */
	.controller('myChoiceCtrl',['$scope','$rootScope', 'DashboardService','UtilService','NotificationService','ModalService','MockJSONCalls',function($scope,$rootScope,DashboardService,UtilService,notification,ModalService,MockJSONCalls){
		var initializeAddressvalues = function(Val){
			$scope.addressFormObj = {};
			if(Val !== undefined){
				$scope.addressFormObj.address1 = Val.address1;
				$scope.addressFormObj.address2 = Val.address2;
				$scope.addressFormObj.address3 = Val.address3;
				$scope.addressFormObj.state_select = Val.state_select;
				$scope.addressFormObj.zipCode = Val.zipcode;
				$scope.addressFormObj.country = Val.country;
				$scope.addressFormObj.city = Val.city;

			}
		};
	    $scope.$on('handleError', function(ev, errors){
	    	// Handle Errors
	    	$scope.errorList = errors;
	    });
	    var modal = {};
	    $scope.toggleAddressModal = function(val){
			var nameField = true;
			var myChoiceStatement = true;
			var promoCode = false;
			var province = false;
			var contactAndEmailInput = false;
			if(val === 'chooseAddress'){
				nameField = true;
				myChoiceStatement = true;

				$rootScope.parentPage = 'chooseAddress';
				modal = {
					title: 'Choose your address.',
					content: '/app_assets/templates/ups.ppc-chooseaddressModal.html'
				};
				$rootScope.isRecAval = true;
			}else if(val === 'noRecordsChooseAddress'){
				nameField = true;
				myChoiceStatement = true;
				modal = {
					title: 'Enter your address.',
					content: '/app_assets/templates/ups.ppc-addressModal.html',
					data: {
						val: val
					},
					component: 'doa'
				};
				$rootScope.parentPage = undefined;
				$rootScope.isRecAval = false;
			}else if(val === 'myChoiceAddress'){
				nameField = true;
				myChoiceStatement = true;
				promoCode = true;
				$rootScope.parentPage = 'myChoiceAddress';
				modal = {
					title: 'Enter your home address.',
					content: '/app_assets/templates/ups.ppc-addressModal.html',
					data: {
						val: val
					},
					component: 'doa'
				};
				$rootScope.parentPage = undefined;
				$rootScope.isRecAval = false;
			}else if(val === 'pickup'){
				nameField = false;
				myChoiceStatement = false;
				promoCode = false;
				contactAndEmailInput = true;
				$rootScope.parentPage = 'pickup';
				modal = {
					title: 'Enter your pickup address.',
					content: '/app_assets/templates/ups.ppc-addressModal.html',
					data: {
						val: val
					},
					component: 'doa'
				};
				$rootScope.parentPage = undefined;
				$rootScope.isRecAval = false;
			}else if(val === 'non-us-geo'){
				nameField = false;
				myChoiceStatement = false;
				promoCode = false;
				province = true;
				$rootScope.parentPage = 'non-us-geo';
				modal = {
					title: 'Enter your address.',
					content: '/app_assets/templates/ups.ppc-addressModal.html',
					data: {
						val: val
					},
					component: 'doa'
				};
				$rootScope.parentPage = undefined;
				$rootScope.isRecAval = false;
			}else if(val === 'non-us-no-geo'){
				nameField = false;
				myChoiceStatement = false;
				promoCode = false;
				$rootScope.parentPage = 'non-us-no-geo';
				modal = {
					title: 'Enter your address.',
					content: '/app_assets/templates/ups.ppc-addressModal.html',
					data: {
						val: val
					},
					component: 'doa'
				};
				$rootScope.parentPage = undefined;
				$rootScope.isRecAval = false;
			}else if(val === 'streetLevel'){
				nameField = false;
				myChoiceStatement = false;
				promoCode = false;
				$rootScope.parentPage = 'streetLevel';
				modal = {
					title: 'Enter your address.',
					content: '/app_assets/templates/ups.ppc-addressModal.html',
					data: {
						val: val
					},
					component: 'doa'
				};
				$rootScope.parentPage = undefined;
				$rootScope.isRecAval = false;
			}else if(val === 'regionalLevel'){
				nameField = false;
				myChoiceStatement = false;
				promoCode = false;
				$rootScope.parentPage = 'regionalLevel';
				modal = {
					title: 'Enter your address.',
					content: '/app_assets/templates/ups.ppc-addressModal.html',
					data: {
						val: val
					},
					component: 'doa'
				};
				$rootScope.parentPage = undefined;
				$rootScope.isRecAval = false;
			}else if(val === 'homePhone'){
				nameField = true;
				myChoiceStatement = true;
				$rootScope.parentPage = 'homePhone';
				modal = {
					title: 'Enter your phone number.',
					content: '/app_assets/templates/ups.doa-homephoneModal.html'
				};
			}else{
				if(val === 'nonus'){
					modal = {
						title: 'See if you\'re in the UPS My Choice<sup>&reg;</sup> service area.',
						content: '/app_assets/templates/ups.doa-myavailabilityModal.html',
						data: val
					};
				$rootScope.parentPage = 'availability';
				}else{
					if(val=== 'us'){
						nameField = false;
						myChoiceStatement = false;
					}else{
						nameField = true;
						myChoiceStatement = true;
					}
					modal = {
						title: 'Enter your address.',
						content: '/app_assets/templates/ups.ppc-addressModal.html',
						data: {
							val: val,
							nameField: nameField,
						},
						component: 'doa'
					};
					$rootScope.parentPage = undefined;
				}
			}
			$scope.ModalService = ModalService;

			ModalService.open(modal,function(sc) {
				initializeAddressvalues();
				sc.nameField = nameField;
				sc.myChoiceStatement = myChoiceStatement;
				sc.promoCode = promoCode;
				sc.province = province;
				sc.contactAndEmailInput = contactAndEmailInput;
			});
		};

		(function init(){
			var metaData = DashboardService.getMetaData();
	 	 	if(!metaData.countries){
	 			MockJSONCalls.getJson({urlString: 'ups.doa-metaData.json'})
	 	        // then() called when response gets back
	 	        .then(function(data) {
	 	            // promise fulfilled TODO set metadata
	 	        	DashboardService.setMetaData(data);
	 	        }, function() {
	 	            // promise rejected
	 	        });
	 	 	}
		})();
	}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : AddressCtrl
 * @description Controls the Enter Address flow
 */
	.controller('AddressCtrl',['$scope','$rootScope','DashboardService','UtilService','NotificationService','ModalService','MockJSONCalls',function($scope,$rootScope,DashboardService,UtilService,notification,ModalService,MockJSONCalls){

		$scope.ModalService = ModalService;

		var active = ModalService.getActiveModal();
		$scope.data = active.data;
		// init
		var addressRequestURL='ups.doa-valid-address.json';

		/**
		* @function
		* @name init
		* @description Initialize the variables when controller loaded
		*/
		function init(){
			$scope.parentFormObj=[];
			$scope.addressFormObj = {};
			$scope.phType=['Mobile','Home','Work','Other'];
			$scope.addressFormObj.phone_type = $scope.phType[0];
			$scope.addClicked = false;
			$scope.disabled=false;

			var metaData = DashboardService.getMetaData();
			if(metaData.countries){
				$scope.countryList = metaData.countries;
				$scope.statesList = metaData.states;
				$scope.termsAndConditionsURL = metaData.tncUrl;
				$scope.ups_placeholder = metaData.placeholder;
				$scope.parentFormObj = metaData.savedAddressList;
		 		$scope.addressFormObj.country= $scope.countryList[0].code;
			 	//$scope.addressFormObj.state_select= 'Select One';
			}else{
				MockJSONCalls.getJson({urlString: 'ups.doa-metaData.json'})
	 	        // then() called when response gets back
	 	        .then(function(data) {
	 	            // promise fulfilled TODO set metadata
	 	        	DashboardService.setMetaData(data);
	 	        	$scope.countryList = data.countries;
					$scope.statesList = data.states;
					$scope.termsAndConditionsURL = data.tncUrl;
					$scope.ups_placeholder = data.placeholder;
					$scope.parentFormObj = data.savedAddressList;
			 		$scope.addressFormObj.country= $scope.countryList[0].code;
				 	//$scope.addressFormObj.state_select= 'Select One';

	 	        }, function() {
	 	            // promise rejected
	 	        });
			}

		 	if($scope.data){
		 		var dat = $scope.data;
				notification.handleError();
		 		/**Switching value based on error scenario**/
		 		switch(dat.val){
					case 'promoError':
						addressRequestURL = 'ups.doa-promo-error.json';
					break;
					case 'addresserror':
			    		addressRequestURL = 'ups.doa-error-address.json';
					break;
					case 'regionalLevel':
						addressRequestURL = 'ups.doa-regional-error.json';
					break;
					case 'streetLevel':
						addressRequestURL = 'ups.doa-street-error.json';
					break;
					default:
						$scope.addressFormObj = dat;
				}

		 		/*if(!$scope.addressFormObj.state_select || $scope.addressFormObj.state_select=== '' ){
		 			$scope.addressFormObj.state_select= 'Select One';
		 			}*/
		 		$scope.phType=['Mobile','Home','Work','Other'];
				$scope.addressFormObj.phone_type = $scope.phType[0];


		 		if(dat.checkObj){
			 		$scope.addressFormObj.country= dat.checkObj.country;
			 		$scope.addressFormObj.zipCode = dat.checkObj.postalcode;

					if (dat.checkObj.countryPostalTxt) {
						var countryName = '';
						for (var r = 0; r < $scope.countryList.length; r++) {
							if ($scope.countryList[r].code === dat.checkObj.country) {
								countryName = $scope.countryList[r].country;
								break;
							}
						}
						$scope.addressFormObj.countryTxt = dat.checkObj.countryPostalTxt;
						$scope.addressFormObj.countryName = countryName;
                        $scope.addressFormObj.countryTxt = false;
                        $scope.addressFormObj.zipTxt = true;
					}
			 		$scope.disabled=true;
			 		$scope.changeVal();
		 		}else{
			 		$scope.addressFormObj.country= $scope.countryList[0].code;
		 		}
		 	}else{
		 		notification.handleError();
		 	}
		}

		/**
		* @function
		* @description Keeps watch on init() function
		*/
		$scope.$watch('data', function(){
			init();
		});

		/**
		* @function
		* @name toggleselectText
		* @description From loop for fetching data from JSON
		*/
	   $scope.toggleselectText = function(index){
	    	$scope.enableNextbtn = true;
	    	$scope.addClicked = false;
	    	$scope.isChooseAddress= true;
	    	angular.forEach($scope.parentFormObj, function(value, key) {
			  if(key === index){
			  	value.isSelected = true;
			    $scope.selectedAddressInfo = value;
			}
			  else{
			  	value.isSelected = false;
			  }
			});
	    };

		/**
		* @function
		* @name addBtnClicked
		* @description Setting state dropdown value based country
		*/
		$scope.addBtnClicked = function(index){
			$scope.addClicked = true;
			$scope.enableNextbtn = true;
			$scope.isChooseAddress= false;
			angular.forEach($scope.parentFormObj, function(value, key) {
			  if(key === index){
			  	value.isSelected = true;
			    $scope.selectedAddressInfo = value;
			}
			  else{
			  	value.isSelected = false;
			  }
			});
		};

		/**
		* @function
		* @name changeVal
		* @description Setting state dropdown value based country
		*/
		$scope.changeVal=function(){
			if($scope.addressFormObj.country==='us'){
				//$scope.addressFormObj.state_select= 'Select One';
			}
			else{
				$scope.addressFormObj.state_select= '';
			}
		};

		/**
		* @function
		* @name saveAddressCBox
		* @description Saving checkbox value
		*/
	    $scope.saveAddressCBox=function(val, code){
	    	if (val === true && code === 13) {
	    		console.log('saveAddressCBox'); // TODO
	    	}
	    };

		/**
		* @function
		* @name openAddressTermsAndConditions
		* @description URL for terms and condition
		*/
		$scope.openAddressTermsAndConditions = function(){
			UtilService.openTearmsAndConditions('https://www.ups.com/CC/ll/help-center/legal-terms-conditions/my-choice.html');
		};

		/**
		* @function
		* @name submitForm
		* @description Moves to next page on validation - Verify Your Identity
		*/
		$scope.submitForm = function(){
			// @description Fetching value of address from JSON ups.doa-valid-address.json
			UtilService.mockServiceCalls({urlString: addressRequestURL}, function(response){
				var obj = response.data;
				if(obj.errorCode){
					notification.handleError(obj);
				} else {
					notification.handleError();

					ModalService.next({
						title: 'Verify your identity.',
						content: '/app_assets/templates/ups.doa-id-verification.html'
					});
					$rootScope.updatedAddressValue = $scope.addressFormObj;

				}
			});
		};

		/**
		* @function
		* @name goback
		* @description Moves to previous page based on parent page
		*/
		$scope.goback = function(){
			$scope.close = false;
			if($rootScope.parentPage === 'availability'){
				$scope.$emit('changePage', {
					title: 'See if you\'re in the UPS My Choice® service area.',
					url: '/app_assets/templates/ups.doa-myavailabilityModal.html'
				});
			}else if($rootScope.parentPage === 'notification'){
				$scope.$emit('changePage', {
					title: 'Request delivery notifications.',
					url: '/app_assets/templates/ups.doa-chooseNotificationModal.html',
				});
			}else if($rootScope.parentPage === 'chooseAddress'){
				$scope.$emit('changePage', {
					title: 'Choose your address.',
					url: '/app_assets/templates/ups.ppc-chooseaddressModal.html'
				});
			}else{
				$scope.close = true;
			}
		};
	}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : chooseAddressCtrl
 * @description Controls the Choose Address flow
 */
	.controller('chooseAddressCtrl',['$scope','ModalService','MockJSONCalls','$rootScope',function($scope,ModalService,MockJSONCalls,$rootScope){

		$scope.ModalService = ModalService;

		/**
		* @function
		* @name init
		* @description Variables initialization
		*/
		function init(){
			$scope.parentFormObj=[];
			$scope.addressFormObj = {};
			$scope.addClicked = false;
			$scope.disabled=false;

			MockJSONCalls.getJson({urlString: 'ups.doa-enter-address.json'})
 	        // then() called when response gets back
 	        .then(function(data) {
 	            // promise fulfilled TODO set metadata
 	        	if($rootScope.isRecAval === true || $rootScope.isRecAval === undefined){
 	        		$scope.parentFormObj = data.addressList;
 	        	}else{
 	        		$scope.parentFormObj = '';
 	        	}

 	        }, function() {
 	            // promise rejected
 	        });
		}
		init();


		function selectAddressInit(){
			angular.forEach($scope.parentFormObj, function(value) {
				value.isSelected = false;
			 });
		 }
		selectAddressInit();

		/**
		* @function
		* @name callNextPage
		* @description Next Button Functionality
		*/
			$scope.callNextPage = function(){
			$rootScope.updatedAddressValue = $scope.selectedAddressInfo;
			if($scope.isChooseAddress){
				if(!$scope.selectedAddressInfo.phone){
					ModalService.next({
					title: 'Enter your phone number.',
					content: '/app_assets/templates/ups.doa-homephoneModal.html'
					});
				}else{
					ModalService.next({
					title: 'Verify your identity.',
					content: '/app_assets/templates/ups.doa-id-verification.html'
					});
				}

			}
			else if($scope.addClicked){
				ModalService.next({
					title: 'Enter your address.',
					content: '/app_assets/templates/ups.ppc-addressModal.html',
					data: $scope.initialAddressInfo
				});
			}else{
				ModalService.next({
					title: 'Enter your address.',
					content: '/app_assets/templates/ups.ppc-addressModal.html'
				});
			}
		};


	/**
	* @function
	* @name toggleselectText
	* @params index
	* @description Activate the selected address box and apply classes on it
	*/
	   $scope.toggleselectText = function(index){
	    	$scope.enableNextbtn = true;
	    	$scope.addClicked = false;
	    	$scope.isChooseAddress= true;
	    	angular.forEach($scope.parentFormObj, function(value, key) {
			  if(key === index){
			  	value.isSelected = true;
			    $scope.selectedAddressInfo = value;
			}
			  else{
			  	value.isSelected = false;
			  }
			});
	    };

	    /**
		* @function
		* @name addBtnClicked
		* @params index
		* @description Activate the Next button on click of Add Address Box
		*/
	    $scope.addBtnClicked = function(index){
			$scope.addClicked = true;
			$scope.enableNextbtn = true;
			$scope.isChooseAddress= false;
			angular.forEach($scope.parentFormObj, function(value, key) {
			  if(key === index){
			  	value.isSelected = true;
			    $scope.selectedAddressInfo = value;
			}
			  else{
			  	value.isSelected = false;
			  }
			});
		};
	}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : homePhoneCtrl
 * @description Controls Enter Phone flow
 */
	.controller('homePhoneCtrl', ['$scope','ModalService', function ($scope, ModalService) {
	    $scope.ModalService = ModalService;

        /**
        * @function
        * @name redirectToNextPage
        * @description Next Button Functionality
        */
        $scope.redirectToNextPage = function(){
            ModalService.next({
                title: 'Verify your identity.',
                content: '/app_assets/templates/ups.doa-id-verification.html'
            });
        };

        /**
        * @function
        * @name resetForm
        * @description Reset the form values when Modal opens up
        */
        (function(){
            $scope.formObj = {};
            $scope.phoneType=['Mobile','Home','Work','Other'];
            $scope.formObj.phone_type_selection = $scope.phoneType[0];
        })();

}]);
