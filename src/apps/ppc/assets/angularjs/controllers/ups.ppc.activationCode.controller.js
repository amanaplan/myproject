'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module
 */
angular.module('upsDOApp.controllers')
/**
 * @controller
 * @name upsDOApp.controllers.controller : activationCodeCtrl
 * @description Controls the Activation Code flow
 * @template : ups.doa-openAccount-fail.html and ups.doa-openAccount-failModal.html
 */
.controller('activationCodeCtrl',['$scope','$location','UtilService','activationCodeService','$rootScope','localStorageService','ModalService',function($scope,$location,UtilService,activationService,$rootScope,localStorageService,ModalService){
	
	$scope.address=	activationService.pendingActivation;
	// to decide if this is a case of new activation code or pending activation.
	if(activationService.pendingActivation.length > 1){
		$scope.multipleEnrollment= true;
	}
	else{
		$scope.multipleEnrollment= false;
	}

	var localdata = localStorageService.get('active_user_info');
	if(localdata && !$scope.multipleEnrollment){
		$scope.AddressLine1 = localdata.first_name +' '+ localdata.last_name;
		$scope.AddressLine2 = localdata.default_address.street;
		$scope.AddressLine3 = localdata.default_address.city + ',' + localdata.default_address.zip;
	}

	
	// initializing values.
	$scope.languageList =['US - English'];
	var newCode= 0;
	var codeValue = '12345678';
	$scope.errorCode = false;
	var count =0;
	$scope.enrollment=	activationService.pendingnumber;
	$scope.formObj.language = $scope.languageList[0];
	$scope.formObj.country = $scope.countryList[0].code;
	/**
	* @function
	* @name nextActivation;
	* @description to take the user to next page of activation.
	*/
	$scope.nextActivation = function(){
		var	localdata = localStorageService.get('active_user_info');
		var info = {};
		info.AddressLine1= localdata.first_name +' '+ localdata.last_name;
		info.AddressLine2= localdata.default_address.street;
		info.AddressLine3= localdata.default_address.city + ',' + localdata.default_address.zip;
		if(activationService.pendingActivation.length<10){
			activationService.saveMethods(info);
		}

		if($rootScope.Updated === true){
			$location.path('/preferencePage/mychoice/ActivationExistingUsers');
			$scope.multipleEnrollment= false;
		}
		else{
			$location.path('/preferencePage/mychoice/activationCodeStep2');
			$scope.multipleEnrollment= true;
		}
	};
	/**
	* @function
	* @name startOver;
	* @description to start over the activation process.
	*/
	$scope.startOver = function(obj){

		if(obj === 'existingMember'){
			$rootScope.Updated = true;
		}
		else{
			$rootScope.Updated = false;
		}

		activationService.pendingnumber = [];
		newCode= 0;
		count =0;
		activationService.pendingActivation = [];
		$scope.multipleEnrollment= false;
		$rootScope.startOverProcess = false;
		$location.path('/preferencePage/mychoice/activationCodeStep1');
	};
	/**
	* @function
	* @name newCode;
	* @description to keep a count of new codes generated.
	*/
	//$scope.startOverProcess = false;
	$scope.newCode = function(obj){
		if(obj === 'existingMember'){
			$rootScope.Updated = true;
		}
		else{
			$rootScope.Updated = false;
		}
		
		activationService.requestCount();
		if(activationService.codeCount === 2){
			$rootScope.startOverProcess = true;
			activationService.codeCount = 0;
		}
		else{
			$rootScope.startOverProcess = false;
		}
		$location.path('/preferencePage/mychoice/codeConfirm');

	};
	/**
	* @function
	* @name printPage;
	* @description to open the default browser print option.
	*/
	$scope.printPage = function(){
		window.print();
	};

	function welcomeMessage(){
		ModalService.open({
	        title: 'Welcome to UPS My Choice<sup>&reg;</sup>, John.',
	        content: '/app_assets/templates/ups.doa-ConfirmationModal.html',
			data: $scope.checkObj
	    },function(sc){ 
	    	sc.welcome = function(){
	    		$location.path('/preferencePage/mychoicePreference');
	    	};

	    });		 
	}

	var referenceData = 'ups.ppc-invalid-Code.json';
	/**
	* @function
	* @name VerifyCode;
	* @description to verify the activation code entered.
	*/
	$scope.VerifyCode = function(){
		
		count++;
		$scope.disableVerification = true;
		
		if($scope.Activation_Code === codeValue){
			$scope.invalidCode = false;
			$scope.CodeValid = true;
			activationService.pendingActivation = [];
			$scope.userInfo = localStorageService.get('active_user_info');
			$scope.userInfo.last_name= $rootScope.addressForm.obj.last_name;
			$scope.userInfo.address1= $rootScope.addressForm.obj.address1;
			$scope.userInfo.country= $rootScope.addressForm.obj.country;
			$scope.userInfo.city= $rootScope.addressForm.obj.city;
			$scope.userInfo.default_address.zip= $rootScope.addressForm.obj.state_select +' '+ $rootScope.addressForm.obj.zipcode  ;


			localStorageService.set('active_user_info',$scope.userInfo);
			

			welcomeMessage();
		}
		else{
			$scope.invalidCode = true;
			$scope.CodeValid = false;
			switch(count){
			case 1:
				 referenceData = 'ups.ppc-invalid-Code.json';
				break;
			case 2:
				 referenceData = 'ups.ppc-tooManyAttempts-Code.json';
				break;
			case 3:
				 referenceData = 'ups.ppc-expired-Code.json';
				break;
			case 4:
				 {referenceData = 'ups.ppc-cantRequest-Code.json';
				 $scope.startOverProcess = true;}
				break;
			case 5:
				 {referenceData = 'ups.ppc-expiredCantRequest-Code.json';
				 $scope.startOverProcess = true;}
				break;
			}
		}
		UtilService.mockServiceCalls({urlString: referenceData}, function(response){
			var obj = response.data; 
			if(obj.errorCode){
				console.log('error');
			} else {
				$scope.ErrorMessage= obj.errorMessage;
			}
		});
	};

	function cancelModal(){
		ModalService.open({
	        title: 'Cancel Activation?',
	        content: '/app_assets/templates/ups.ppc-cancelActivationModal.html',
			data: $scope.checkObj
	    },function(sc){ 
	    	sc.noDelete = function(){
	    		ModalService.dismiss();
	    	};
	    	sc.delete = function(){
	    		$location.path('/preferencePage/mychoicePreference');
	    		ModalService.dismiss();
	    	};

	    });
	}
	
	/**
	* @function
	* @name cancel;
	* @description to cancel the activation process.
	*/
	$scope.cancel = function(){
		cancelModal();
		
	};
	/**
	* @function
	* @name returnToPrefernces;
	* @description to return to the prefernces page.
	*/		
	$scope.returnToPrefernces = function(){

		$rootScope.Updated = false;
		$rootScope.addressForm=null;
		$location.path('/preferencePage/mychoicePreference');
		ModalService.dismiss();
	};
	/**
	* @function
	* @name openAddressTermsAndConditions;
	* @description open the window for my choice activate.
	*/
	$scope.openAddressTermsAndConditions = function(){
		UtilService.openTearmsAndConditions('https://www.ups.com/mychoiceactivate');
	};
}]);