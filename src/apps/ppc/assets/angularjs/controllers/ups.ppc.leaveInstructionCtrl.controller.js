'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module and store in the variable 'Controller'
 */
var PrefrenceModule = angular.module('upsDOApp.controllers');

/**
 * @controller
 * @name upsDOApp.controllers.controller : leaveInstructionCtrl
 * @description This controller contains the leave instructions for driver controller and their details
 * @template : ups.ppc-leaveInstructions.html
 */
	PrefrenceModule.controller('leaveInstructionCtrl',['$scope','localStorageService',function($scope,localStorageService){
	/**Leave Instruction for the Driver Navigation**/
		var securityCode = localStorageService.get('active_user_info').gateSecurity;
		var countryCode = localStorageService.get('active_user_info').user_type.locale.county_id;

		if(securityCode){
			$scope.formObj.gateSecutiy = securityCode;
			$scope.formObj.reGateSecutiy = securityCode;
			
			$scope.formObj.countryCode = countryCode;
		}

		$scope.formObj.leaveAtOptions=['Front Door','Rear Door','Side Door','Garage','Porch','Deck','Patio','Reception','Management Office','Door Person','Concierge','Superintendent','Shed'];
		$scope.requiredSecond = false;
		$scope.checked =  false;
		/**
		* @function
		* @name gateSecurity;
		* @description to verify the gateSecurity field.
		*/
		$scope.gateSecurity = function(){
			$scope.requiredSecond = true;
			if($scope.formObj.gateSecutiy!== $scope.formObj.reGateSecutiy){
				$scope.wrongGate = true;
			}
			else{
				$scope.wrongGate = false;
			}
		};
		/**
		* @function
		* @name check;
		* @description to get the suthorized shipment release.
		*/
		$scope.check = function(){
			$scope.checked = !$scope.checked;
		};
		/**
		* @function
		* @name reset;
		* @description to reset all fields.
		*/
		function reset(){
			$scope.VerificationReq = false;
			$scope.ASRnotAllowed = false;
			$scope.SignatureRequired = false;
		}
		/**
		* @function
		* @name VerifyScreen;
		* @description to show the verify Now Screen.
		*/
		$scope.VerifyScreen = function(){
			reset();
			$scope.wrongGate = false;
			$scope.checked = true;
			$scope.VerificationReq = true;
		};
		/**
		* @function
		* @name NotAllowed;
		* @description to show ASR Not allowed screen.
		*/
		$scope.NotAllowed = function(){
			reset();
			$scope.wrongGate = false;
			$scope.checked = true;
			$scope.ASRnotAllowed = true;
		};
		/**
		* @function
		* @name SignatureReq;
		* @description to show ASR Not Allowed screen with Signature required.
		*/
		$scope.SignatureReq = function(){
			reset();
			$scope.wrongGate = false;
			$scope.checked = true;
			$scope.SignatureRequired = true;
		};
		/**
		* @function
		* @name saveLeaveInstruction;
		* @description to save button functionality.
		*/
		$scope.saveLeaveInstruction = function(){
			this.ups_leaveInstructions.$setPristine();
		};
	}]);