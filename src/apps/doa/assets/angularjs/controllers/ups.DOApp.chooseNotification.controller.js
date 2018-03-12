'use strict';
/**
 * @module
 * @name upsDOApp.controllers
 * @description
 * Initialize the module and store in the variable 'Controller'
 */
angular.module('upsDOApp.controllers')

/**
 * @controller
 * @name upsDOApp.controllers.controller : ChooseNotificationCtrl
 * @description
 * Controls the Choose Notifications flow
 */
	.controller('ChooseNotificationCtrl',['$scope','$rootScope','$window','UtilService','DashboardService','ModalService','MockJSONCalls',function($scope,$rootScope,$window,UtilService,DashboardService,ModalService,MockJSONCalls){
		// init
		$scope.ModalService = ModalService;
		$scope.showAuthenticateModal = false;
		$scope.parentFormObj=[];
		$scope.formObj = {};
		$scope.accountType=[{'type':'UPS Shipping Account','isSelected':'true'},
							{'type':'9 Digit Air Freight Account','isSelected':'false'}];
	
		$scope.Choices=[{'Option':'This Package', 'Select':false},
						{'Option':'All Packages', 'Select':false}];
	
		$scope.isUPS = true;
	
		$scope.toggleModal = function(){
			$rootScope.parentPage = 'notification';
			var modalInstance = ModalService.open({
				title:'Request delivery notifications.',
				content: '/app_assets/templates/ups.doa-chooseNotificationModal.html',
				component: 'doa'
			},function(sc) {
				sc.openAuthenticateModal = function(){
			    	if($scope.Choices[1].Select===true){
			    		ModalService.next({
		      				title: 'Enter your address.',
							content: '/app_assets/templates/ups.ppc-addressModal.html',
						});
			    	}
				};					
			});
			modalInstance.result.then(function() {
	        }, function() {
	            // Cancel
	        });
		};
		/**
	       * @function
	       * @name toggleAccountType
	       * @description country list depending on the user.
	       */
		$scope.toggleAccountType = function(index){
	    	if(index===0){
	    		$scope.isUPS = true;
	    		$scope.formObj.country = $scope.countryList[0].code;
	    	}
	    	else{
	    			$scope.isUPS = false;
	    		}
	    	
		};
		/**
	       * @function
	       * @name toggleselectText
	       * @description variables to get the choice of the user.
	       */
		$scope.toggleselectText = function(ind){
	    	$scope.enableNextbtn = true;
	    	// console.log(ind);
	    	if(ind===0){
	    		$scope.Choices[0].Select=true;
	    		$scope.Choices[1].Select=false;
	    	}
	    	else{
	    		$scope.Choices[0].Select=false;
	    		$scope.Choices[1].Select=true;
	    	}
	    };
	
	  (function(){
		var metaData = DashboardService.getMetaData();
 	 	if(metaData.countries){
	        DashboardService.setMetaData(metaData);
 	 	}else{
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
	}]);