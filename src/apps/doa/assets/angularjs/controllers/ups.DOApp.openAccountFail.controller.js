'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module and store in the variable 'Controller'
 */
	angular.module('upsDOApp.controllers')

/**
 * @controller
 * @name upsDOApp.controllers.controller : OpenAccountFailCtrl
 * @description Controls the Open Account flow
 * @template : ups.doa-openAccount-fail.html and ups.doa-openAccount-failModal.html
 */
	.controller('OpenAccountFailCtrl',['$scope','$http','$window','UtilService','ModalService','$sce',function($scope,$http,$window,UtilService,ModalService,$sce){
		var modal={};
		$scope.ModalService = ModalService;
		/**
		* @function
		* @name FailModal;
		* @description to open fail modal depending on the option chosen.
		*/
		$scope.FailModal =function(option){
			$scope.Checkbox=false;
			var submitRequestURL='ups.doa-openAccountFail-default.json';
	
			function openModal(title){
				modal = {
					title: title,
					content: '/app_assets/templates/ups.doa-openAccount-failModal.html',
					component: 'doa'
				};
			  	ModalService.open(modal);
			}
		
			var callService= function(errorURL){
			  UtilService.mockServiceCalls({urlString: errorURL}, function(response){
			    var obj= response.data; 
			    var title = obj.Title;
			    $scope.FailError =obj.Details;
			  	$scope.errorMsg = $sce.trustAsHtml($scope.FailError);
			    //$scope.check = '<h1> hello </h1>'
			    //console.log('this is check'+$scope.check);
			    openModal(title);
			  });
			};
	
			switch(option){
			case 'defaultFail':{
			  submitRequestURL='ups.doa-openAccountFail-default.json';
			  callService(submitRequestURL);
			}break;
			case 'EU':{
			  submitRequestURL='ups.doa-openAccountFail-eu.json';
			  $scope.Checkbox=true;
			  callService(submitRequestURL);
			}break;
			case 'ContactUPS':{
	
			  submitRequestURL='ups.doa-openAccountFail-contactUPS.json';
			  callService(submitRequestURL);
			}break;
			case 'BillingSystem':{
			  submitRequestURL='ups.doa-openAccountFail-BillingSystem.json';
			  callService(submitRequestURL);
			}break;
			case 'BillingAddress':{
			  submitRequestURL='ups.doa-openAccountFail-BillingAddress.json';
			  callService(submitRequestURL);
			}break;
			default:{
	
			}
			}
	
		};
	
}]);