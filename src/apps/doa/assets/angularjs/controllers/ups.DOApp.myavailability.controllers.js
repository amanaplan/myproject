'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module
 */
angular.module('upsDOApp.controllers')

/**
 * @controller
 * @name upsDOApp.controllers.controller : MyAvailabilityCtrl
 * @description Controls the My Availability flow
 * @template ups.doa-myavailabilityModal.html
 */
	.controller('MyAvailabilityCtrl',['$scope','DashboardService','ModalService', function($scope,DashboardService,ModalService){
		$scope.ModalService = ModalService;
		$scope.isNext = true;
		
		/**
		* @function
		* @name checkPostalCode
		* @description Checks the postal code and basis initialize the error code variable values
		*/
		$scope.checkPostalCode = function(){
			if($scope.checkObj.postalcode==='12345' && ($scope.checkObj.country === 'us'||$scope.checkObj.country === 'dk')){
				$scope.isValid = true;
				$scope.message = 'Yes, select Next to continue.';
				$scope.inlineError= false;
				$scope.isNext = true;
			}else if($scope.checkObj.postalcode==='1452' && $scope.checkObj.country === 'dk'){
				$scope.isValid = true;
				$scope.message = 'Not Yet. Please check again soon.';
				$scope.inlineError= false;
				$scope.isNext = false;
			}else{
				$scope.isValid = false;
				$scope.message = '';
				$scope.inlineError= 'This is not a valid postal code for your country.';
			}
		};
		
		/**
		* @function
		* @name submitForm
		* @params valid,Next
		* @description Next Button Functionality
		*/
		$scope.submitForm = function(valid,Next){
			var countryPostalTxt = true;
			$scope.checkObj.countryPostalTxt = countryPostalTxt;
			if(valid && Next){
				if(!$scope.notAvailable){
					ModalService.next({
						title: 'Enter your address',
						content: '/app_assets/templates/ups.ppc-addressModal.html',
						data: {
							val:$scope.data,
							checkObj: $scope.checkObj
						}
					});
					console.log($scope);
				}			
			}else{
				ModalService.dismiss();
			}
		};
	
		/**
		* @function
		* @name clearPostalCode
		* @description Clear Postal Code values and other error variables when user resets the form
		*/
		$scope.clearPostalCode = function(){
			$scope.checkObj.postalcode = '';
			$scope.isValid = false;
			$scope.message = '';
		};
		
		/**
		* @function
		* @name $scope.$watch
		* @description Angular Watcher to monitor the value of data
		*/
		$scope.$watch('data', function(dat) {
			if(dat){
		 		if(dat === 'nonus'){
		 			$scope.checkObj = {
	 					country: 'dk',
	 					postalcode: '12345'
	 				};
		 		}else{
		 			$scope.checkObj = {
	 					country:$scope.countryList[0].code,
	 					postalcode: '12345'
	 				};
		 		}
		 	}
	    });

		/**
		* @function
		* @name init
		* @description Initialize the form variables
		*/
		(function init(){
			var metaData = DashboardService.getMetaData();
			$scope.countryList = metaData.countries;
			$scope.isValid = false;
			$scope.message = '';
			$scope.checkObj = {
					country: 'dk',
					countryTxt: true
			};
		})();
	}]);