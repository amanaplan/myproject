'use strict';
/**
 * @module
 * @name upsDOApp.controllers
 * @description
 * Initialize the module
 */
angular.module('upsDOApp.controllers')
// Address Controller
.controller('AddorAuthenticateAccountCtrl',['$scope','$http','$window','UtilService','NotificationService','$rootScope','ModalService','DashboardService','MockJSONCalls', function($scope,$http,$window,UtilService,notification,$rootScope,ModalService,DashboardService, MockJSONCalls){

	/**
	 * @controller
	 * @name upsDOApp.controllers.controller : AddorAuthenticateAccountCtrl
	 * @description Controls the Add account or Air Freight Account flow
	 * @template : ups.doa-add-or-authenticate-account.html and ups.doa-addorauthenticateaccountModal.html
	 */
	
	// init
	$scope.ModalService = ModalService;
	$scope.toggleModal = function(){
		/**
		* @function
		* @name toggleModal
		* @description Variables initialization and open modal
		*/
		var modalInstance = ModalService.open({
			title:'Add an Existing Account to your profile.',
			content: '/app_assets/templates/ups.ppc-addorauthenticateaccountModal.html',
			component: 'ppc'
		},function(sc) {
			sc.showAuthenticateModal = false;
			sc.displayCID = true;
			sc.parentFormObj=[];
			sc.formObj = {};
			sc.accountType=[{'type':'Documents and Packages','isSelected':'true'},
								{'type':'Air Freight','isSelected':'false'}];
			$rootScope.isUPS = true;
			sc.valueEntered = false;
			
			/**
			* @function
			* @name resetFormFields
			* @description Reset the form fields
			*/
		  sc.resetFormFields = function(){
		  	this.ups_addAuthAccform.$setPristine();
			sc.formObj.acc_number = '';
		    sc.formObj.acc_name = '';
		    sc.formObj.pcode = '1';
		  };

		  var initializeAuthenticatevalues = function(Val){
				$rootScope.authenticateFormObj = {};
				if(Val !== undefined){
					$rootScope.authenticateFormObj.countryName = Val.countryName;
					$rootScope.authenticateFormObj.acc_num = Val.acc_number;
					$rootScope.authenticateFormObj.accName = Val.acc_name;
					if(($rootScope.isUPS === true) && (Val.country === 'us' || Val.country === 'ca' || Val.country === 'pr' || Val.country === 'vi')){
						$rootScope.displayCID = true;
					}else{
						$rootScope.displayCID = false;
					}
				}
			};
			sc.openAuthenticateModal = function(){
				ModalService.next({
					title: 'Authenticate This Account',
					content: '/app_assets/templates/ups.ppc-authenticateModal.html',
					data: sc.formObj
    			});
				initializeAuthenticatevalues(sc.formObj.data);
				$rootScope.formObj = {};
				$rootScope.formObj.tnc = sc.formObj.tnc;
			};
			
			//Call for meta data
			var metaData = DashboardService.getMetaData();
		 	if(metaData.countries){
				sc.countryList = metaData.countries;
				sc.formObj.country = sc.countryList[0].code;		 		
		 	}else{
		 		/**
				* @function
				* @name UtilService.mockServiceCalls
				* @description Call the UtilService and fetch the country data from JSON
				*/
		 		MockJSONCalls.getJson({urlString: 'ups.doa-metaData.json'})
		        // then() called when response gets back
		        .then(function(data) {
					// promise fulfilled TODO set metadata
		        	if(data.errorCode){
					}else{
						DashboardService.setMetaData(data);
						sc.countryList = data.countries;
						sc.formObj.country = sc.countryList[0].code;
					}            
		        }, function() {
		            // promise rejected
		        });
		 	}
		 	
		 	/**
			* @function
			* @name openChargesBox
			* @description Opens help Link URL
			*/
			sc.openChargesBox = function(){
				UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/myups/billing/authentication_indcharges.html');
			};
			/**
			* @function
			* @name getpCode @params evt
			* @description Get Postal Code Value
			*/
			sc.getpCode = function(evt){
				var str = evt.target.value;
				if(str.length > 0){
					sc.valueEntered = true;
				}
				else{
					sc.valueEntered = false;
				}
			};
			/**
			* @function
			* @name toggleAccountType @params index
			* @description Change UI on the basis of selected radio button
			*/
			sc.toggleAccountType = function(index){
		    	this.ups_addAuthAccform.$setPristine();
				
				sc.formObj.acc_number = '';
		    	sc.formObj.acc_name = '';

		    	if(index===0){
		    		sc.isUPS = true;
		    		sc.formObj.country = sc.countryList[0].code;
		    	}
		    	else{
					sc.isUPS = false;
				}    	
			};
		});
		
		modalInstance.result.then(function() {
            // Send Service request TODO
        }, function() {
            // Cancel
        });
	};
}])
.controller('AuthenticateCtrl',['$scope','$location','$http','$window','UtilService','NotificationService','$rootScope','paymentService','ModalService', function($scope,location,$http,$window,UtilService,notification,$rootScope,paymentService,ModalService){

	/**
	 * @controller
	 * @name upsDOApp.controllers.controller : AuthenticateCtrl
	 * @description Controls the next step of the above controller i.e. Authenticate Account Flow
	 * @template : ups.ppc-authenticateModal.html
	 */
	$scope.ModalService = ModalService;
	var active = ModalService.getActiveModal();
	$scope.data = active.data;
	$scope.authenticateFormObj = active.data;
	$scope.isUPS = $rootScope.isUPS;
	
	function init(){
		$scope.authenticateFormObj.invoice_number = '';
		$scope.authenticateFormObj.invoiceDate = '';
		$scope.authenticateFormObj.charges = '';
		$scope.authenticateFormObj.CID = '';
	}
	init();
	//--USE this for data
	$scope.$on('changePage', function(ev, obj){
		if(obj){
		}
	});

	// Date Picker
	$scope.popup1 = {};
	$scope.popup1.opened = false;
	$scope.format = 'MM/dd/yyyy';
	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	var afterTomorrow = new Date();
	afterTomorrow.setDate(tomorrow.getDate() + 1);
	$scope.dateOptions = {
	    formatYear: 'yy',
	    maxDate: new Date(2020, 5, 22),
	    minDate: new Date(),
	    startingDay: 1
    };

  $scope.events = [
    {
      date: tomorrow,
      status: 'full'
    }, {
      date: afterTomorrow,
      status: 'partially'
    }
  ];
  /**
	  * @function
	  * @name openCalender
	  * @description Open the DatePicker on click of the button
	  */
  	$scope.openCalender = function(){
		$scope.popup1.opened = true;
	};
	/**
	  * @function
	  * @name setDate @params year, month and day
	  * @description Set the date format
	  */
	$scope.setDate = function(year, month, day) {
	    $scope.authenticateFormObj.invoiceDate = new Date(year, month, day);
	  };
	  /**
	    * @function
	    * @name makeOtherNonDefault
	    * @description Set the date format
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
	  * @name saveExisting
	  * @description Save the account information into the Payments table
	  */
	$scope.saveExisting = function(){
	    var option={};
	    angular.extend(option,$scope.authenticateFormObj);
      	option.payementNickName= option.acc_name;
      	option.displayAccount = option.payementNickName;
      	option.Number= option.acc_number;
      	option.Method='Account';
      	option.accountType = option.Method; 
      	option.makeDefault= ($rootScope.formObj.tnc?$rootScope.formObj.tnc:false);
      	if(option.makeDefault){
            option.Default='DEFAULT METHOD';
            if($scope.index === undefined){
              makeOtherNonDefault(); // not defined
            }
        }else{
            option.Default='Make Default Method';
        }
        if($rootScope.index === undefined){
            paymentService.saveMethods(option);
            //$scope.payementData.paymentMethods=paymentService.savedMethods.sortBy('Default');
        }
        
        if($rootScope.typeOfUser === 'premium'){
        	$rootScope.typeOfUser = '';
        	ModalService.next({
				title: 'Welcome to UPS My Choice<sup>&reg;</sup>, John.',
				content: '/app_assets/templates/ups.doa-ConfirmationModal.html',
			});
        	return;
        }
        
         if($rootScope.lastPage ==='choosePayment'){
	          		ModalService.jumpToStep(0);
	            	return;
	         }else{
              ModalService.close(option);
		}
	};

	$scope.openChargesBox = function(){
		UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/myups/billing/authentication_indcharges.html');
	};
}]);