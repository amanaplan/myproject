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
 * @name upsDOApp.controllers.controller : ChoosePickupStartCtrl
 * @description Controls the Choose Pickup Start date flow
 */
	.controller('ChoosePickupStartCtrl',['$scope','$rootScope','$filter','ModalService',function($scope,$rootScope,$filter,ModalService){
		
	var active = ModalService.getActiveModal();
	$scope.data = active.data; 
	$scope.format = 'MM/dd/yyyy';
	
	/**
	* @function
	* @name setDate;
	* @description to set the date in scope.
	*/
	$scope.setDate = function(year, month, day) {
	    $scope.dt = new Date(year, month, day);
	 };
	 var min= new Date();
	 min.setDate(min.getDate() + 2);
	 var max = new Date();
	 max.setDate(max.getDate() + 15);
	 var subMin=String(min).substring(0,3);
	 var subMax=String(max).substring(0,3);
	 if(subMin==='Sat'){
	 	min.setDate(min.getDate() + 2);
	 }
	 if(subMax==='Sat'){
	 	max.setDate(max.getDate() + 2);
	 }
	 if(subMin==='Sun'){
	 	min.setDate(min.getDate() + 1);
	 }
	 if(subMax==='Sun'){
	 	max.setDate(max.getDate() + 1);
	 }
	 $scope.dt= min;
	 
	/**
	* @function
	* @name check;
	* @description to initialize the first date true.
	*/
	$scope.check = function(){
		$scope.first= true;
	};
	/**
	* @function
	* @name clear;
	* @description to clear the scope date.
	*/
	$scope.clear = function() {
	    $scope.dt = null;
	  };
	
	
		  $scope.dateOptions = {
		    'year-format': 'yy',
		    'starting-day': 1,
		    showWeeks: false,
		     minDate: min,
		     maxDate: max,
		  };
		  $scope.$watch('dt',function(){
		  	var sub=String($scope.dt).substring(0,3) ;
		  	if((sub ==='Sat')||(sub==='Sun')){
		  		$scope.dateSelected = false;
		  		$scope.dt = min;
		  	}
		  	else{
		  		if($scope.dt){
				  $scope.dateSelected=true;
		  		}
			  } 
		  },true);
		
		  $scope.goback = function(){
			  ModalService.back({
				  title: 'Choose your pickup type.',
			        content: '/app_assets/templates/ups.doa-choosePickupOptionsModal.html',
			        data: {
						isNextClicked:false,
						retainVal : $scope.data
					}
				});
		};
		/**
		* @function
		* @name nextToConfirmation;
		* @description to move to the next step in confirming the chosen date.
		*/
		$scope.nextToConfirmation=function(){
	    var datefilter = $filter('date'),
	        formattedDate = datefilter($scope.dt, 'MM/dd/yyyy');
	    $rootScope.startDate= formattedDate;
	    $rootScope.$broadcast('changePage',{
//	    title: 'Your New Account Is Now Active',
	    title: 'Welcome, John' ,  
		content: '/app_assets/templates/ups.doa-inline-confirm-openAccount.html'
	    });
	  };
	 
		}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : OpenAccountCtrl
 * @description Controls the Choose Pickup Start date flow
 */
	.controller('OpenAccountCtrl',['ModalService','$scope','$rootScope','paymentService','$location','localStorageService','$window','UtilService',function(ModalService, $scope,$rootScope,paymentService,$location,localStorageService,$window,UtilService){
	      $scope.choosePayment=$rootScope.choosePayment;
	      $scope.ifNoPickup= true;
		  $scope.ifDailyPickup= true;
		  $scope.ifDailyOnRoutePickup= true;
		  $scope.ifUpsSmart= true;
		  $scope.ifSpecificDays= true;
		  $scope.account = 'NXXXX';
		  $scope.name = 'John Smith';
		  $scope.email = 'jsmith@email.com';
		  $scope.userID = 'jsmith';			  	  
		  var pickupOption=$rootScope.chosenField;
		  if($rootScope.SpecialHazardous){
		  	pickupOption= pickupOption + 1;
		  }

		  $scope.obj = {};
		/**
		* @function
		* @name makeOtherNonDefault;
		* @description to make a mode of payment default.
		*/
		 function makeOtherNonDefault(){
		    var data = paymentService.savedMethods;
		    angular.forEach(data, function(value, key) {
		       data[key].Default='Make Default Method';
		       data[key].makeDefault=false; 
		    });
		}
		/**
		* @function
		* @name PromoModal;
		* @description to open modal with promo code.
		*/
		$scope.PromoModal = function(){
			ModalService.open({
				title:'Your account is ready to use, John.',
				content: '/app_assets/templates/ups.doa-inline-confirm-openAccount.html',
				component: 'doa'}, function(sc){
				sc.Discount = true;
				sc.inlineConfirm = 'No Pickup Needed';
			});
		};
		/**
		* @function
		* @name promoConflictCode;
		* @description to open conflict in promo code modal.
		*/
		$scope.promoConflictCode = function(str){
			ModalService.open({
				title:'You\'ve got options',
				content: '/app_assets/templates/ups.doa-conflictPromoCode.html',
				component: 'doa'}, function(sc){
				sc.discountProcess = str;
				sc.openConditions = function(){
        			UtilService.openTearmsAndConditions('http://www.ups.com/media/{lang}/{promo_id}_{country_code}.pdf');
        		};				
			});
		};
		/**
		* @function
		* @name FailModal;
		* @description to open fail modal depending on the option chosen.
		*/
		(function () {
	      var option =$scope.obj;
	      option.payementNickName= 'AbcNew';
	      option.accountType= 'Account';
	      option.displayAccount = option.payementNickName;
	      option.Number= $scope.account;
	      option.Method='Account';
	      option.displayAccount=option.accountType +' - '+ option.Number;
	     
	      if(option.makeDefault){
	            option.Default='DEFAULT METHOD';
	            if($scope.index === undefined){
	              makeOtherNonDefault();
	            }
	        }else{
	            option.Default='Make Default Method';
	        }
	        if($rootScope.index === undefined && $rootScope.cardId=== undefined){
	            paymentService.saveMethods(option);
	        }
	        else{
	            paymentService.savedMethods[$rootScope.index]=$scope.obj;
	        }
	         
	      $location.path('/paymentPage');
		})();

		/**
		* @function
		* @name redirectToMyProfile;
		* @description to redirect to the profile page.
		*/
		
		$scope.redirectToMyProfile = function(obj){
			localStorageService.set('Redirect',{'RedirectFrom':obj});
			var check = $window.location.href;
			var link = 'ppcProfile.html';
			if(check.toLowerCase().indexOf(link.toLowerCase()) > -1){
				$location.path('/profilePage');	
			}
			else{
				var url = 'http://' + $window.location.host +'/ppcProfile.html#/profilePage';
				$window.location=url;
			}	
		};
	
		  switch(pickupOption) {
		  	case 0:
		  	{
		  		$scope.inlineConfirm='No Pickup Needed';
		  		if($scope.Discount){
		  	
		  		} 
		  	}break;
		  	case 1:
		  	{
		  		$scope.inlineConfirm='Daily Pickup';
		  		$scope.inlineConfirmDetails='Your driver will start daily pickups on '+ $rootScope.startDate + '.';
		  	}break;
		  	case 2:
		  	{
		  		$scope.inlineConfirm='Daily On-Route Pickup';
		  		$scope.inlineConfirmDetails='Your driver will start daily pickups on '+ $rootScope.startDate + '.';
		  	}break;
		  	case 3:
		  	{
		  		$scope.inlineConfirm='UPS Smart Pickup';
		  		$scope.inlineConfirmDetails='A pickup will be scheduled each time you create a shipment.';
		  	}break;
		  	case 4:
		  	{
		  		$scope.inlineConfirm='Pickup on Specific Days';
		  		$scope.inlineConfirmDetails='Your driver will start daily pickups on '+ $rootScope.startDate + '.';
		  	}
		  }
		  
	
	}]);

  