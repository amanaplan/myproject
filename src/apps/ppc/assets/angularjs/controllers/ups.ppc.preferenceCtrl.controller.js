'use strict';

/**
* @module
* @name upsDOApp.controllers
* @description Initialize the module
*/
var PrefrenceModule = angular.module('upsDOApp.controllers');

/**
* @controller
* @name upsDOApp.controllers.controller : preferenceCtrl
* @description Contains the Preferences tab and redirects to the relevant accordion
* @template : ups.ppc-preference.html
*/
	PrefrenceModule.controller('preferenceCtrl',['$scope','$location','$rootScope','localStorageService',function($scope,$location,$rootScope,localStorageService){
		/** Rating Preference navigation* */
	    $scope.tabContentId = $rootScope.tabContentId;
		$scope.redirectPref=function(url) {
			$location.path(url);
		};

		if(localStorageService.get('Redirect')){
			var redirection = localStorageService.get('Redirect').RedirectFrom;

		 	if((redirection === 'signup')|| (redirection === 'openAcount')|| (redirection === 'mychoice')){
		 		$scope.confirm_show = true;
		 	}
		 	else{
		 		$scope.confirm_show = false;
		 		localStorageService.set('Redirect',{'RedirectFrom':''});
		 	}
		 	// to empty the object that stores the redirect from parameter in the localStorage.
		 	$scope.closeMessage = function(){
		 		$scope.confirm_show = false;
		 		localStorageService.set('Redirect',{'RedirectFrom':''});
		 	};
		}

	}]);

/**
* @controller
* @name upsDOApp.controllers.controller : ratingPreferenceCtrl
* @description Controls the Open Account flow
* @template : ups.ppc-rating-preference.html
*/
	PrefrenceModule.controller('ratingPreferenceCtrl',['$scope','UtilService','MappingService','ModalService','$rootScope','paymentService','MockJSONCalls','$filter',function($scope,UtilService,MappingService,ModalService,$rootScope,paymentService,MockJSONCalls,$filter){
		var referenceData='ups.rating-preference.json';

		/** Rating Option* */
		$scope.helpLink = function(){
			UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/time/upsaccount.html');
		};

		$scope.saveRatingOption=function(){
			$scope.ratingOptionSaveFlag = true;
			this.ups_ratingOptionform.$setPristine();
		};

		$scope.defaultPackaging_helpLink = function(){
			UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/create/package_type_help.html');
		};

		$scope.prepaidCharges = function(){
			UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/time/prepaid.html');
		};

		$scope.defaultDest_helpLink = function(){
			UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/time/destinationtype.html');
		};

		$scope.prepayLink = function(){
			UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/time/prepaid.html');
		};

		$scope.savePackageLetter=function(){
			$scope.packgLetterSaveFlag = true;
			this.ups_packgLetterPrefform.$setPristine();
		};

		/** ******Freight************ */
		$scope.saveFreightRating=function(){
			$scope.freightRatingSaveFlag = true;
			this.ups_freightRatingform.$setPristine();
		};
		function callPaymentflow(sc){
			//FIXME to be moved to other controller
			sc.showAuthenticateModal = false;
			sc.showAIAModal = false;
			sc.displayCID = true;
			sc.parentFormObj=[];
			sc.formObj = {};
			sc.accountType=[{'type':'Documents and Packages','isSelected':'true'},
								{'type':'Air Freight','isSelected':'false'}];
			$rootScope.isUPS = true;
			sc.valueEntered = false;

			// Date Picker
			sc.popup1 = {};
			sc.popup1.opened = false;
			sc.format = 'MM/dd/yyyy';
			var tomorrow = new Date();
			tomorrow.setDate(tomorrow.getDate() + 1);
			var afterTomorrow = new Date();
			afterTomorrow.setDate(tomorrow.getDate() + 1);

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



			// Function called on initialize and will call the meta data information
			//Call meta data json for country and other dropdown data
			MockJSONCalls.getJson({urlString: 'ups.doa-metaData.json'})
	        // then() called when response gets back
	        .then(function(data) {
				// promise fulfilled TODO set metadata
				if(data.errorCode){
				}else{
					sc.countryList = data.countries;
					sc.formObj.country = sc.countryList[0].code;
				}
	        }, function() {
	            // promise rejected
	        });
			sc.openChargesBox = function(){
				UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/myups/billing/authentication_indcharges.html');
			};

			sc.getpCode = function(evt){
				var str = evt.target.value;
				if(str.length > 0){
					sc.valueEntered = true;
				}
				else{
					sc.valueEntered = false;
				}
			};
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
		}

		$scope.addAirFrieghtAccount=function(){
			var modalInstance = ModalService.open({
				title: 'Add an Existing Account to your profile.',
			    content: '/app_assets/templates/ups.ppc-addorauthenticateaccountModal.html',
				component: 'ppc'
			},function(sc){
				callPaymentflow(sc);
			});
			modalInstance.result.then(function() {
	            var freightAccntList=paymentService.getData();
				$scope.freightAccnt=[];
				freightAccntList = $filter('filter')(paymentService.savedMethods, { userId: 'Air Freight' });
				for(var i=0;i<freightAccntList.length;i++){
					if(freightAccntList.length !== '0' ){
						if(freightAccntList[i].Number!== 'undefined'){
							$scope.freightAccnt.push(freightAccntList[i].Number);
							console.log($scope.freightAccnt,'num');
						}
					}
				}
	        }, function() {
	            // Cancel
	        });
		};

		/*********/
		function init(){
			$scope.oneAtATime = true;
			$scope.formObj = {};
			$scope.ratingOptionSaveFlag=false;
			$scope.packgLetterSaveFlag=false;
			$scope.freightRatingSaveFlag=false;

			/** Rating Prefrence accordion* */
			$scope.groups = MappingService.getRatingPrefMap();

			/** *********** */
			/** Package/Letter Rating Preferences* */

			$scope.shippingCharges = [ {
					'text' : 'No default selection.'
				},
				{
					'text' : 'I will pay shipping charges and ship my package ata retail location such as The UPS Store&reg; or UPS Customer Center.'
				},
				{
					'text' : 'I will prepay my shipping charges.'
				}
			];

			UtilService.mockServiceCalls({urlString: referenceData}, function(response){
				var obj = response.data;
				if(obj.errorCode){
				} else {
					$scope.formObj = obj;
					$scope.formObj.deafultRatingReq=0;
					$scope.formObj.deafultDestination=0;
					$scope.formObj.deafultRateQuote=0;
					$scope.formObj.prefUnitMeasure=0;
					$scope.formObj.shippingCharges=0;

					$scope.formObj.defaultShipAdd=$scope.formObj.ratingOption.defaultShipAddress[0].shipAddress;
					$scope.formObj.defaultAccntNum=$scope.formObj.ratingOption.defaultUPSAccountNum[0].accNum;
					$scope.formObj.prepayvia=$scope.formObj.packageLetterRatingPref.prepay[0].type;
					$scope.formObj.packType=$scope.formObj.packageLetterRatingPref.defaultShipAddress[0].packagingType;
					//$scope.formObj.defaultAccntNumAfr=0;
					$scope.formObj.freightType=$scope.formObj.freightRatingPref.freightType[0].type;

				}
			});
		}
		init();
	}]);

/**
* @controller
* @name upsDOApp.controllers.controller : FreightShipingPreferenceCtrl
* @description Freight Shipping Preferences
* @template : ups.ppc-FreightShipping-preference.html
*/
	PrefrenceModule.controller('FreightShipingPreferenceCtrl',['notificationServices','$rootScope','$scope','UtilService','DashboardService','MappingService','paymentService','ModalService','$filter','$window','localStorageService',function(notificationService,$rootScope, $scope,UtilService,DashboardService, MappingService, paymentService, ModalService, $filter,$window,localStorageService){

	$scope.calculateVolume = function(){
		if($scope.form.length && $scope.form.width &&  $scope.form.height){
			$scope.volume = $scope.form.length*$scope.form.width*$scope.form.height;
		}
	};

	$scope.form = {};
	var ltl_ratingInfo= localStorageService.get('userInfo')?localStorageService.get('userInfo').ltl_rating:null;

	if(ltl_ratingInfo){
		$scope.form.numberOfUnit = ltl_ratingInfo.units;
		$scope.form.length = ltl_ratingInfo.length;
		$scope.form.width = ltl_ratingInfo.width;
		$scope.form.height = ltl_ratingInfo.height;
		$scope.calculateVolume();
	}
	var email = localStorageService.get('userInfo')?localStorageService.get('userInfo').user_email:null;
	if(email){
		$scope.form.email = email;
	}

	$scope.check = true;
	$scope.alertType = function(){
		if($scope.obj.alert_Type[0].Selected|| $scope.obj.alert_Type[1].Selected|| $scope.obj.alert_Type[2].Selected){
			//console.log($scope.obj.alert_Type[0]);
			$scope.check = false;
		}
		else {

			$scope.check = true;
		}
	};

	function get(ind){
		var temp = notificationService.notificationValue;
		var j;
		var p ='';
		for(j=0;j<temp[ind].alert_Type.length;j++){
				if(temp[ind].alert_Type[j].Selected){
					p= p + String(temp[ind].alert_Type[j].type)+', ';
				}
			}
			var n = p.length;
			p = p.substring(0, n-2);
			$scope.form.notification[ind].type_string = p;
			p='';
	}

	function getString(){
		var temp= notificationService.notificationValue;
		var i;
		$scope.form.notification = notificationService.notificationValue;
		for(i=0;i<temp.length;i++){
			get(i);

		}
	}

	if(notificationService.notificationValue.length>0){
		getString();
		$scope.novalue = false;
	}
	else{
		$scope.novalue = true;
	}

	$scope.editNotification = function(index){

		var data = notificationService.notificationValue[index];
		ModalService.open({
	        title: 'Edit this notification.',
	        content: '/app_assets/templates/ups.ppc-addEdit-notificationModal.html',

	    },function(sc){
	    	sc.obj = data;
	    	sc.notificationDone = function(){
	    		var values = sc.obj;
	    		notificationService.editMethods(index,values);
	    		get(index);
	    		ModalService.dismiss();
	    	};
	    	sc.checkOther = function(){
				if(sc.obj.send_To === 'Shipper'){
					sc.obj.email = 'jsmith@email.com';
				}
				else if(sc.obj.send_To === 'Receiver'){
					sc.obj.email = 'Use the Ship To Email';
				}
				else{
					sc.obj.email = '';
				}
			};
			sc.cancel = function(){
				ModalService.dismiss();
			};

	    });
	};

$scope.addNotification = function(){
		notificationService.getDummy();
		var data = notificationService.notificationDummy;
		var index =  notificationService.notificationValue.length;
		ModalService.open({
	        title: 'Add notification.',
	        content: '/app_assets/templates/ups.ppc-addEdit-notificationModal.html',
	    },function(sc){
	    	var temp = {};
	    	angular.extend(temp, data);
	    	sc.obj = temp;
	    	sc.check = true;
	    	sc.checkOther = function(){
				if(sc.obj.send_To === 'Shipper'){
					sc.obj.email = 'jsmith@email.com';
				}
				else if(sc.obj.send_To === 'Receiver'){
					sc.obj.email = 'Use the Ship To Email';
				}
				else{
					sc.obj.email = '';
				}
			};
			sc.cancel = function(){
				ModalService.dismiss();
			};
			sc.notificationDone = function(){
				var values = sc.obj;
	    		notificationService.saveMethods(values);
	    		get(index);
	    		$scope.novalue = false;
	    		ModalService.dismiss();
			};
			sc.alertType = function(){
			console.log('valled');
				if(sc.notificationFor[0].Selected|| sc.notificationFor[1].Selected|| sc.notificationFor[2].Selected){
					sc.check = false;
				} else {
					sc.check = true;
				}
			};
	    });
	};

	$scope.deleteNotification = function(index){
		notificationService.notificationValue.splice(index,1);
		if(notificationService.notificationValue.length === 0){
			$scope.novalue = true;
		}
	};

	$scope.require = function(){
		if($scope.form.length || $scope.form.width ||  $scope.form.height || $scope.form.numberOfUnit || $scope.form.unitType){
			$scope.requireValue = true;
		}
		if($scope.form.length && $scope.form.width &&  $scope.form.height && $scope.form.numberOfUnit && $scope.form.unitType){
			$scope.requireValue = false;
		}
	};

	/**
	* @function
	* @name accountListOptions;
	* @description to populate the drop down for Air Freight Account Number.
	*/
	function accountListOptions(){
		var freightAccntList=paymentService.getData();
		$scope.freightAccnt=[];
		freightAccntList = $filter('filter')(paymentService.savedMethods, { userId: 'Air Freight' });
		for(var i=0;i<freightAccntList.length;i++){
			if(freightAccntList.length !== '0' ){
				$scope.AccountList = false;
				if(freightAccntList[i].Number!== 'undefined'){
					$scope.freightAccnt.push(freightAccntList[i].Number);
					console.log($scope.freightAccnt,'num');
				}
			}
		}
	}

	/**
	* @function
	* @name addAirFrieghtAccount;
	* @description to act Air Freight Account.
	*/
	$scope.addAirFrieghtAccount=function(){
		var url = 'http://' + $window.location.host +'/ppcProfile.html#/paymentPage';
		$window.location = url;
	};

	$scope.formObj={};
	var referenceData='ups.ppc-freightShipping-preference.json';
	/**
	* @function
	* @name pickUp;
	* @description to populate the drop down for pickup options.
	*/
	function pickUp(){
		var referenceData='ups.ppc-pickupOptions.json';
		UtilService.mockServiceCalls({urlString: referenceData}, function(response){
			var obj = response.data;
			if(obj.errorCode){
				console.log('error');
			} else {
				$scope.formObj.pickupOpt= obj.PickupOptions;
			}
		});

	}
	/**
	* @function
	* @name delivery;
	* @description to populate the drop down for delivery options.
	*/
	function delivery(){
		var referenceData = 'ups.ppc-deliveryOptions.json';
		UtilService.mockServiceCalls({urlString: referenceData}, function(response){
			var obj = response.data;
			if(obj.errorCode){
				console.log('error');
			} else {
				$scope.formObj.deliveryOpt= obj.DeliveryOptions;
			}
		});

	}
	/**
	* @function
	* @name refernceOptions;
	* @description to popluate thr drop down for reference options.
	*/
	function refernceOptions(){
		var referenceData = 'ups.ppc-referenceOption.json';
		UtilService.mockServiceCalls({urlString: referenceData}, function(response){
			var obj = response.data;
			if(obj.errorCode){
				console.log('error');
			} else {
				$scope.formObj.referenceOpt= obj.Reference;
			}

		});

	}
	/**
	* @function
	* @name defaultSelect;
	* @description to set the default values for quantum view notify for UPS freight section.
	*/
	function defaultSelect(){
		$scope.SendNotificationTo=['Shipper','Receiver','Other','Other','Other'];
	}
	/* @function
	* @name saveChangesAirFreight;
	* @description to save and disable the save button in Air Freight Preference.
	*/
	$scope.saveChangesAirFreight = function(){
		this.ups_airFreightform.$setPristine();
	};
	/**
	* @function
	* @name init;
	* @description that gives the initial values to form elements.
	*/
	function init(){
		/** Freight Shipping navigation* */
		$scope.groups = MappingService.getFreightPrefMap();
		$scope.formObj = {};
		$scope.Classes=[1,2,3,4,5];
		$scope.printType = 'LaserPrinter';
		UtilService.mockServiceCalls({urlString: referenceData}, function(response){
			var obj = response.data;
			if(obj.errorCode){
				console.log('error');
			} else {
				$scope.formObj = obj;
				$scope.formObj.defaultAirFreightAccount = obj.DefaultAirFreightAccount;
				$scope.formObj.defaultType = obj.DefaultFreightService;
				$scope.formObj.class = obj.Class;
				$scope.formObj.alertWeight = true;
				$scope.formObj.prefferedBill= obj.PrefferedBill;
				$scope.formObj.handlingChargeType= obj.HandlingChargeType;
				$scope.formObj.HandlingUnitType= obj.HandlingUnitType;
				$scope.formObj.labelPerPage= obj.LabelPerPage;
				$scope.formObj.thermalLabelType= obj.ThermalLabelType;
				$scope.formObj.notificationFor= obj.NotificationFor;
				$scope.formObj.NotificationTo= obj.NotificationTo;
				$scope.formObj.country = $scope.countryList[0].code;
			}
		});

		var freightAccntList=$filter('filter')(paymentService.savedMethods, { userId: 'Air Freight' });
		if(freightAccntList.length === 0){
			$scope.AccountsPresent = false;
		}
		else{
			$scope.AccountsPresent= true;
			accountListOptions();
		}

		pickUp();
		delivery();
		defaultSelect();
		refernceOptions();
	}
	/**
	* @function
	* @name pickupOpt_HelpLink;
	* @description to redirect on clicking the Help Options.
	*/
	$scope.pallet_HelpLink = function(){
		UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/create/ltl_handling_unit_height.html');
	};
	/**
	* @function
	* @name pickupOpt_HelpLink;
	* @description to redirect on clicking the Help Options.
	*/
	$scope.valueAdded_HelpLink = function(){
		//TBD

	};

	/**
	* @function
	* @name additionalFee_HelpLink;
	* @description to redirect on clicking the Help Options.
	*/
	$scope.additionalFee_HelpLink = function(){
		UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/exp_freight_pickup.html');
	};
	/**
	* @function
	* @name notification_HelpLink;
	* @description to redirect on clicking the Help Options.
	*/
	$scope.notification_HelpLink = function(){
		UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/exp_freight_pickup.html');
	};

	init();
	/**
	* @function
	* @name saveFreight;
	* @description to save and disable the save button in less than Truckload Freight Preference.
	*/
	$scope.saveFreight = function(){
		this.ups_lessThanTruckloadform.$setPristine();
	};

}]);

/**
* @controller
* @name upsDOApp.controllers.controller : preferencePaymentMethod
* @description Preference Payment Flow
* @template ups.ppc-preference-paymentMethod.html
*/
	PrefrenceModule.controller('preferencePaymentMethod',['$scope','$filter','$location','$rootScope','paymentService','UtilService','DashboardService','MockJSONCalls',function($scope,$filter,$location,$rootScope,paymentService,UtilService,DashboardService,MockJSONCalls){
	$scope.form={};
	// Function called on initialize and will call the meta data information
	(function(){
		var metaData = DashboardService.getMetaData();
	 	if(!metaData.countries){
			//Call meta data json for country and other dropdown data
			MockJSONCalls.getJson({urlString: 'ups.doa-metaData.json'})
	        // then() called when response gets back
	        .then(function(data) {
				// promise fulfilled TODO set metadata
	        	if(!data.errorCode){
		        	DashboardService.setMetaData(data);
				}
	        }, function() {
	            // promise rejected
	        });
	 	}
	})();

	$scope.shippingCharges=[
		'None At This Time',
		'Shipper\'s UPS Account',
		'Receiver',
		'Third Party',
		'Payment Card',
		'PayPal'
	];
	$scope.form.shippingCharges = $scope.shippingCharges[1];
	$scope.billShipping =[
	'None At This Time',
	'Shipper\'s UPS Account',
	'Receiver',
	'Third Party'
	];
	function getIndexOf(arr, val, prop) {
      var l = arr.length,
        k = 0;
      for (k = 0; k < l; k = k + 1) {
        if (arr[k][prop] === val) {
          return k;
        }
      }
      return undefined;
    }
	$scope.form.billDuties = $scope.billShipping[2];
	$scope.cardType=paymentService.cardOptions;
	$scope.account = $filter('filter')(paymentService.savedMethods, { accountType: 'Account' });
	$scope.paymentCard = $filter('filter')(paymentService.savedMethods, { accountType: 'Payment Card' });
	$scope.PayPal = $filter('filter')(paymentService.savedMethods, { accountType: 'PayPal' });
	$rootScope.index = getIndexOf(paymentService.savedMethods, 'PayPal', 'accountType');
	$scope.changeCard = function(val){
		$scope.cardId =val._id;
		$scope.selectedCard=val.Cardtype;
	};

	$scope.modifyPaymentCard = function(val){
	 	$rootScope.cardId = $scope.cardId;
	 	$rootScope.lastPage ='preferencePage';
	 	if(val){
	 		// $rootScope.index =index;
	 		$location.path('/paymentPage/EditPaymentCard');
	 	}else{
	 		$location.path('/paymentPage');
	 	}
	 };
	 $scope.newPaymentCard = function(){
	 	$rootScope.lastPage ='preferencePage';
	 	$location.path('/paymentPage/AddPaymentCard');
	 };
	 $scope.addPaypal = function(){

	   $rootScope.lastPage ='preferencePage';
       $location.path('/paymentPage/AddPayPal');
	 };
	  $scope.modifyPaypal = function(){

	   $rootScope.lastPage ='preferencePage';
       $location.path('/paymentPage/EditPayPal');
	 };

}]);

/**
* @controller
* @name upsDOApp.controllers.controller : shippingPreferenceCtrl
* @description Shipping Preference Flow
* @template ups.ppc-shipping-preference.html
*/
	PrefrenceModule.controller('shippingPreferenceCtrl',['$scope','$rootScope','DashboardService','UtilService','MappingService','addressServices','ModalService','MockJSONCalls','$location', function($scope,$rootScope,DashboardService,UtilService, MappingService,addressServices,ModalService,MockJSONCalls,$location){
		/** Shipping Prefrence accordion* */
		$scope.formObj={};
		$scope.shippingPrefObj=[];

		var referenceData='ups.shipping-preference.json';
		var addressList=addressServices.getAddress();
		$scope.nicknameArray=[];
		for(var i=0;i<addressList.length;i++){
			if(addressList[i].nick_name!==undefined){
				$scope.nicknameArray.push(addressList[i].nick_name);
			}
		}

		$scope.shippingHistoryObj={
			data:[]
		};

		// Function called on initialize and will call the meta data information
		(function(){
			var metaData = DashboardService.getMetaData();
		 	if(!metaData.countries){
				//Call meta data json for country and other dropdown data
				MockJSONCalls.getJson({urlString: 'ups.doa-metaData.json'})
		        // then() called when response gets back
		        .then(function(data) {
					// promise fulfilled TODO set metadata
		        	if(!data.errorCode){
			        	DashboardService.setMetaData(data);
			        	$scope.countryList = data.countries;
					}
		        }, function() {
		            // promise rejected
		        });
	        	$scope.countryList = metaData.countries;
		 	}
		})();

	    $scope.shippingOptionSaveFlag = false;
	    $scope.returnServiceSaveFlag = false;
	    $scope.refValuesSaveFlag = false;
	    $scope.shippingHistSaveFlag = false;


	    // FUNCTIONS
	    // Add Another Air Frieght account Modals
		$scope.addAirFrieghtAccount = function(){

			var modalInstance = UtilService .openModal(
		        '/app_assets/templates/ups.ppc-add-air-frieght-account.html',
		        function(sc) {
		            sc.data = [ {
		            	title: 'Vacation Dates',
		            	value: '07/10/2016 - 09/10/2016'
		            }, {
		            	title: 'Vacation Settings',
		            	value: 'Reschedule delivery for 07/10/2016'
		            } ];
		            sc.okText = 'Yes';
		            sc.cancelText = 'No';

		            /**
		    		* @function
		    		* @name helpLink
		    		* @description Opens up the UPS provided help URL in WEM styled popup
		    		*/
		            sc.helpLink = function(){
		            	UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/create/dimensions_help.html');
		            };
		        });
			modalInstance.result.then(function() {
		        // Send Service request TODO
		    }, function() {
		        // Cancel
		    });
		};
	    // END FUNCTIONS
		function init(){
			UtilService.mockServiceCalls({urlString: referenceData}, function(response){
				var obj = response.data;
				if(obj.errorCode){
					console.log('error');
				} else {
					$scope.formObj = obj;
					$scope.formObj.packagingType=$scope.formObj.shippingOption.packagingType[0].packType;
					$scope.formObj.shippingOpt_service=$scope.formObj.shippingOption.service[0].type;
					$scope.formObj.shipFromAddress=$scope.formObj.shippingOption.shipFromAddress[0].address;
					$scope.formObj.returnAddress=$scope.formObj.shippingOption.returnAddress[0].address;
					$scope.formObj.pickupOption=$scope.formObj.shippingOption.pickupOption[0].type;
					$scope.formObj.deliveryAddress=$scope.formObj.shippingOption.deliveryOption[0].type;
					$scope.formObj.serviceForReturn=$scope.formObj.returnServiceOpt.serviceForReturn[0].return;
					$scope.formObj.deliveryMethod=$scope.formObj.returnServiceOpt.deliverMethod[0].type;
					$scope.formObj.returnPacakagingType=$scope.formObj.returnServiceOpt.packagingType[0].type;
					$scope.formObj.returnToAddress=$scope.formObj.returnServiceOpt.returnAddress[0].type;
					$scope.formObj.refTypeReturn=$scope.formObj.returnServiceOpt.reftypeForReturn[0].type;
					$scope.formObj.pickupOptions=$scope.formObj.returnServiceOpt.pickupOption[0].type;
					$scope.formObj.deliveryOptions=$scope.formObj.returnServiceOpt.deliveryOption[0].type;

					$scope.formObj.refType1=$scope.formObj.refValues.refType1[0].type;
					$scope.formObj.refType2=$scope.formObj.refValues.refType2[0].type;

					$scope.shippingHistoryObj=$scope.formObj.shippingHistory;
					$scope.shippingHistoryObj.data=[];
					$scope.shippingHistoryObj.numDaysDisplay=$scope.shippingHistoryObj.daysDisplay[1].type;
					$scope.shippingHistoryObj.data[0]=$scope.shippingHistoryObj.column[0];
					$scope.shippingHistoryObj.data[1]=$scope.shippingHistoryObj.column[9];
					$scope.shippingHistoryObj.data[2]=$scope.shippingHistoryObj.column[1];
					$scope.shippingHistoryObj.data[3]=$scope.shippingHistoryObj.column[2];

					$scope.shippingHistoryObj.sortTable=$scope.shippingHistoryObj.sortByTable[0].type;
					$scope.shippingHistoryObj.ascendDes=1;
				}
			});

			$scope.checkColVal=true;
			$scope.submitClicked=false;
		}
		init();

		$scope.$on('changePage', function(ev, obj){
		    if(obj){
		      $scope.modalValues = obj;
		    }else{
		      $scope.modalValues = {
		        title: 'Enter your address.',
		        url: '/app_assets/templates/ups.ppc-addressModal.html',
		        data: 'address'
		      };
		    }
	  });

		 $scope.addAccount = function(){
			$location.path('/paymentPage');
		 };
		// get mapping data
		 $scope.groups = MappingService.getShippingPrefMap();


		if($rootScope.isActive){
			$scope.groups[0].active=false;
			$scope.groups[$rootScope.isActive].active=true;
		}
			/** ****Shipping Option****** */
		$scope.pickupHelpLink = function(){
			UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/exp_freight_pickup.html');
		};

		$scope.deliveryHelpLink = function(){
			UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/exp_freight_dropoff.html');
		};

		$scope.carbonNeutral_helpLink = function(){
			UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/create/shipping/create/carbon_neutral.html');
		};

		$scope.saveShippingOption=function(){
			$scope.shippingOptionSaveFlag = true;
			$scope.shippingPrefObj.push($scope.formObj);
			this.ups_shippingOptionform.$setPristine();
		};

		/** *Return Service Option*** */

		$scope.saveReturnServiceOptform=function(){
			$scope.returnServiceSaveFlag = true;
			this.ups_returnServiceOptform.$setPristine();
		};

		$scope.returnPickupHelpLink = function(){
			UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/exp_freight_pickup.html');
		};

		$scope.returnDeliveryHelpLink = function(){
			UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/exp_freight_dropoff.html');
		};

		/** ****Refernce Values****** */
		$scope.saveReferenceValuesform=function(){
			$scope.refValuesSaveFlag = true;
			this.ups_referenceValuesform.$setPristine();
		};

		/** ****Shipping history****** */

		$scope.columnValCheck=function(){
			$scope.submitClicked=false;
			var i, j, n;
			n=$scope.shippingHistoryObj.data.length;

			for (i=0; i<n; i++) {
				for (j=i+1; j<n; j++) {
					if ($scope.shippingHistoryObj.data[i]===$scope.shippingHistoryObj.data[j]){
						$scope.checkColVal=false;
						return true;
					}
				}
			}
			$scope.checkColVal=true;
			return false;
		};

		$scope.saveShippingHistory=function(){
			$scope.submitClicked=true;
			$scope.shippingHistSaveFlag = true;
			$scope.shippingPrefObj.push($scope.shippingHistoryObj);
			this.ups_shippingHistoryform.$setPristine();
		};


		$scope.resetShippingHistory=function(){
			$scope.shippingHistoryObj={};
			this.ups_shippingHistoryform.$setPristine();
			init();
		};
	}]);

/**
* @controller
* @name upsDOApp.controllers.controller : mychoicePreferenceCtrl
* @description My Choice Preference Flow
* @template ups.ppc-mychoice-preference.html
*/
	PrefrenceModule.controller('mychoicePreferenceCtrl',['$scope','UtilService','MappingService','localStorageService','$rootScope','$location',function($scope,UtilService,MappingService,localStorageService,$rootScope,$location){
		/** Shipping Preference accordion* */
		// Confirmation Stand Alone Modals
		// After the pages are created move to respective pages
		var mapdata;
		function init(){
			$scope.form={};
			$scope.formObj={};
			$scope.showPreference=['Home','Vacation Home'];
			$scope.form.showPref= $scope.showPreference[0];

			mapdata = MappingService.getMyChoicePrefMap();
			$scope.groupOne = mapdata.groupOne;
			$scope.groupTwo = mapdata.groupTwo;
			$scope.groupThree = mapdata.groupThree;
			$scope.groupFour =  mapdata.groupFour;
		}

		init();

		function disableAccordion(arr){
			var retArray = [];
			angular.forEach(arr, function(value) {
		       if(value.title === 'Manage Membership/Addresses'){
		    	   value.active = true;
		    	   value.disabled = false;
		       }else{
		    	   if(value.active){
			    	   value.active = false;
			       }
			       value.disabled = true;
		       }

		       retArray.push(value);
	        });

			return retArray;
		}
		$rootScope.myChoiceEnrolled = true;
		var metaData = localStorageService.get('userInfo');

        if(metaData){
        	if(metaData.enrollmentActive===false){
			$scope.groupOne = disableAccordion(mapdata.groupOne);
			$scope.groupTwo = disableAccordion(mapdata.groupTwo);
			$scope.groupThree = disableAccordion(mapdata.groupThree);
			$scope.groupFour =  disableAccordion(mapdata.groupFour);
		}else if(metaData.myChoiceNotYetEnrolled === true){
			$rootScope.myChoiceEnrolled = false;
			$location.path('/notYetEnrolled');
		 }
        }

        $scope.showPreferences = function(selectedVal){
        	if(selectedVal === 'Home'){
        		$rootScope.prefVal = '0';
        		$scope.$broadcast('preferenceChange');
        	}else{
        		$rootScope.prefVal = '1';
        		$scope.$broadcast('preferenceChange');
        	}
        };
	}]);

/**
* @controller
* @name upsDOApp.controllers.controller : preferenceMyChoiceSetPayment
* @description My Choice Set Payment Flow
* @template ups.ppc-mychoicesetpayment.html
*/
	PrefrenceModule.controller('preferenceMyChoiceSetPayment',['$scope','paymentService','$filter',function($scope,paymentService,$filter){
		if(paymentService.savedMethods.length===0){
			$scope.accountMethod=[{'displayAccount':'Enter A Different Payment Card'},
			{'displayAccount':'Enter A Different Account'}];
			$scope.formObj.delivery=$scope.accountMethod[0];
		}else{
			var data =paymentService.savedMethods;
			var obj=[];
			angular.extend(obj,data);
			obj.push({'displayAccount':'Enter A Different Payment Card'});
			obj.push({'displayAccount':'Enter A Different Account'});
			$scope.accountMethod = obj;
			$scope.formObj.delivery=$scope.accountMethod[0];
			$scope.defaultVal = $filter('filter')(paymentService.savedMethods, { makeDefault: true });
			$scope.formObj.delivery=$scope.defaultVal[0];
		}

	}]);

/**
* @controller
* @name upsDOApp.controllers.controller : notificationOptionCtrl
* @description Preferences Set Notification Option Flow
* @template ups.ppc-preference-notificationOption.html
*/
	PrefrenceModule.controller('notificationOptionCtrl',['notificationServices','ModalService','$scope','UtilService',function(notificationService,ModalService,$scope,UtilService){

		function get(ind){
			var temp = notificationService.notificationValue;
			var j;
			var p ='';
			for(j=0;j<temp[ind].alert_Type.length;j++){
					if(temp[ind].alert_Type[j].Selected){
						p= p + String(temp[ind].alert_Type[j].type)+', ';
					}

				}
				var n = p.length;
				p = p.substring(0, n-2);
				$scope.form.notification[ind].type_string = p;
				p='';
		}

	$scope.form = {};
	$scope.check = true;
	$scope.alertType = function(){
		if($scope.obj.alert_Type[0].Selected|| $scope.obj.alert_Type[1].Selected|| $scope.obj.alert_Type[2].Selected){
			$scope.check = false;
		} else {
			$scope.check = true;
		}
	};

	function getString(){
		var temp= notificationService.notificationValue;
		var i;
		$scope.form.notification = notificationService.notificationValue;
		for(i=0;i<temp.length;i++){
			get(i);
		}
	}
	if(notificationService.notificationValue.length>0){
		getString();
		$scope.novalue = false;
	} else{
		$scope.novalue = true;
	}



	$scope.editNotification = function(index){

		var data = notificationService.notificationValue[index];

		ModalService.open({
	        title: 'Edit this notification.',
	        content: '/app_assets/templates/ups.ppc-addEdit-notificationModal.html',

	    },function(sc){
	    	sc.obj = data;
	    	sc.notificationDone = function(){
	    		var values = sc.obj;
	    		//console.log(values);
	    		notificationService.editMethods(index,values);
	    		get(index);
	    		ModalService.dismiss();
	    	};
	    	sc.checkOther = function(){
	    		//console.log('inside ');
				if(sc.obj.send_To === 'Shipper'){
					sc.obj.email = 'jsmith@email.com';
				}
				else if(sc.obj.send_To === 'Receiver'){
					sc.obj.email = 'Use the Ship To Email';
				}
				else{
					sc.obj.email = '';
				}
			};
			sc.cancel = function(){
				ModalService.dismiss();
			};


	    });
	};

	$scope.addNotification = function(){
		notificationService.getDummy();
		var data = notificationService.notificationDummy;
		var index =  notificationService.notificationValue.length;
		ModalService.open({
	        title: 'Add notification.',
	        content: '/app_assets/templates/ups.ppc-addEdit-notificationModal.html',
	    },function(sc){
	    	var temp = {};
	    	angular.extend(temp, data);
	    	sc.obj = temp;
	    	sc.check = true;
	    	sc.checkOther = function(){
				if(sc.obj.send_To === 'Shipper'){
					sc.obj.email = 'jsmith@email.com';
				}
				else if(sc.obj.send_To === 'Receiver'){
					sc.obj.email = 'Use the Ship To Email';
				}
				else{
					sc.obj.email = '';
				}
			};
			sc.cancel = function(){
				ModalService.dismiss();
			};
			sc.notificationDone = function(){
				var values = sc.obj;
	    		notificationService.saveMethods(values);
	    		get(index);
	    		$scope.novalue = false;
	    		ModalService.dismiss();
			};
			sc.alertType = function(){
				if(sc.notificationFor[0].Selected|| sc.notificationFor[1].Selected|| sc.notificationFor[2].Selected){
					sc.check = false;
				} else {
					sc.check = true;
				}
			};

	    });
	};

	$scope.deleteNotification = function(index){
		notificationService.notificationValue.splice(index,1);
		ModalService.dismiss();
		if(notificationService.notificationValue.length === 0){
			$scope.novalue = true;
		}
	};

		function defaultSet(){
			$scope.SendNotificationTo=['Shipper','Receiver','Other','Other','Other'];
		}
	// function to populate the notification option dropdowns.
		function notificationOption(){
			var notificationTo='ups.ppc-notificationTo.json';
			var notificationFor ='ups.ppc-notificationFor.json';
			UtilService.mockServiceCalls({urlString: notificationTo}, function(response){
				var obj = response.data;
				if(obj.errorCode){
					console.log('error');
				} else {
					$scope.formObj.NotificationTo= obj.NotificationTo;
					// console.log($scope.formObj.deliveryOpt);
				}
			});
			UtilService.mockServiceCalls({urlString: notificationFor}, function(response){
				var obj = response.data;
				if(obj.errorCode){
					console.log('error');
				} else {
					$scope.formObj.notificationFor= obj.NotificationFor;
					// console.log($scope.formObj.deliveryOpt);
				}
			});
		}
	// function called when the others option is selected.
		$scope.others = function(ind){
			if(ind==='Other'){
				return true;
			}
			else{
				return false;
			}
		};
	// function to save the notification and disable the save button.
		$scope.saveNotification=function(){
			this.ups_NotificationOption.$setPristine();
		};
	// function to initialize the form objects.
		function init(){
			var referenceData='ups.ppc-sendNotification.json';
			UtilService.mockServiceCalls({urlString: referenceData}, function(response){
				var obj = response.data;
				//console.log(obj);
				if(obj.errorCode){
					console.log('error');
				} else {
					$scope.formObj.notification= obj.SendNotification;
					$scope.formObj.defaultSubjectLine=obj.DefaultSubjectLine;
					$scope.defaultSubjectLine=obj.DefaultSubjectLine[0];
				}
			});
			$scope.ShipperEmail='jsmith@email.com';
			$scope.ReceiverEmail='Use the Ship To Email';
			notificationOption();
			defaultSet();
		}
		init();

	}]);

/**
* @controller
* @name upsDOApp.controllers.controller : PrintingPrefCtrl
* @description Preferences Printing Flow
* @template ups.ppc-preference-printing.html
*/
	PrefrenceModule.controller('PrintingPrefCtrl',['$scope',function($scope){

		$scope.formObj = {};
		$scope.formObj.labelInstruction = ['Print for all labels in a shipment.','Print on the first label only.'];
		$scope.savedPrev=false;

		// function to set default values to the form objects.
		function defaultSet(){
			$scope.formObj.label=true;
			$scope.formObj.printLabel= true;
			$scope.formObj.labelType= '0';
		}
		defaultSet();

		$scope.savePritingPref= function(){
			this.ups_PrintingPrefernce.$setPristine();
		};
	}]);

/**
* @controller
* @name upsDOApp.controllers.controller : PreferredLocCtrl
* @description Pickup Request Preferences Flow
* @template ups.ppc-preference-PickupRequest.html
*/
	PrefrenceModule.controller('PreferredLocCtrl',['$scope',function($scope){

	// initializing the form input parameters.
		$scope.obj={};

		$scope.formObj.preferredLocation = ['Front Door','Back Door','Side Door','Garage','Dog House','Roof'];
		$scope.formObj.pickupCharges = ['NNXNNX','NNXNNX (Green)'];
		$scope.obj.contactOptions = [];
		$scope.obj.time = ['1','2','3','4','5','6','7','8','9','10','11','12'];
		$scope.obj.minutes = ['00','15','30','45'];
		$scope.obj.options =['A.M.','P.M.'];
		$scope.obj.labelValue = '0';

		$scope.obj.undeliverable = 'jsmith@email.com';
		/**
		* @function
		* @name savePickupRequest;
		* @description to save the pickup request time.
		*/
		$scope.savePickupRequest = function(){
			this.ups_PickupRequest.$setPristine();
		};
		/**
		* @function
		* @name calculateTimings;
		* @description to check if the timing chosen is allowed or not. The earliest timing should but before the latest timing.
		*/
		$scope.calculateTimings = function(){
			var earlyhour = $scope.obj.earlyTime;
			var earlymin = $scope.obj.earlyMintime;
			var ampm = $scope.obj.labelValue;
			var latesthour = $scope.obj.latestTime;
			var latestMin = $scope.obj.latestMintime;
			var check1;
			var check2;

			if(ampm === '1'){
				check1 = parseInt(earlyhour*60 + earlymin);
				check2 = parseInt(latesthour*60 + latestMin);
				// to check if there is error in choosing the timing.
				if(check1 > check2){
					$scope.errorTiming = true;
				}
				else{
					$scope.errorTiming = false;
				}
			}
			else{
				$scope.errorTiming = false;
			}

		};
	}]);

/**
* @controller
* @name upsDOApp.controllers.controller : preferenceMyChoiceSurePost
* @description Preferences SurePost Flow
* @template ups.ppc-mychoice-surepost.html
*/
	PrefrenceModule.controller('preferenceMyChoiceSurePost',['$scope','UtilService','localStorageService','paymentService','$filter','$rootScope',function($scope,UtilService,localStorageService,paymentService,$filter,$rootScope){
		var userInformation = localStorageService.get('active_user_info');
		$scope.isPremium = userInformation.user_type.locale.isPremium;
		$rootScope.$watch('isvacation', function(){
			$scope.isvacation = $rootScope.isvacation;
		});
		$scope.notifyClicked = true;
	    $scope.DefaultCount= $filter('filter')(paymentService.savedMethods, { makeDefault: true }).length;
		$scope.Notify =['Select One','E-mail','Phone','SMS Text'];
		$scope.form.selectnotify=$scope.Notify[1];
		$scope.form.radVal='notifyMe';
		$scope.form.sendTo='jsmith@email.com';
		if($rootScope.surePostForm){
			$scope.form=$rootScope.surePostForm;
		}
		$scope.openTearmsAndConditions=function(url){
	     UtilService.openTearmsAndConditions(url);
		};
		$scope.cancel = function(){
			$scope.form.selectnotify=$scope.Notify[1];
			$scope.notifyChecked=true;
			$scope.form.radVal='notifyMe';
			$scope.form.sendTo='jsmith@email.com';

		};
		$scope.disableNotify =function(){
			$scope.notifyClicked = false;
		};
		$scope.saveChanges = function(){
			$rootScope.surePostForm = $scope.form;
		};

	}]);

/**
* @controller
* @name upsDOApp.controllers.controller : prefImportControlOptions
* @description mport Control Options Flow. This controller contains the import control options
* @template ups.ppc-importControlOptions.html
*/
PrefrenceModule.controller('prefImportControlOptions',['$scope','UtilService',function($scope,UtilService){

	var referenceData='ups.shipping-preference.json';
	$scope.ServiceType = [];
	$scope.delMethod = [];
	$scope.refTypeImport = [];
	$scope.deliveryOption = [];
	$scope.pickupOption = [];

	/**
	* @function
	* @name UtilService.mockServiceCalls
	* @description Service call to fetch the drop down values from JSON 'ups.shipping-preference.json'
	*/
	UtilService.mockServiceCalls({urlString: referenceData}, function(response){
		var obj = response.data;
		if(obj.errorCode){
			console.log('error');
		} else {
			$scope.ServiceType = obj.importControlOptions.serviceType;
			$scope.ServiceType.unshift({'type': 'Select Service'});
			$scope.formObj.ServiceType = $scope.ServiceType[0].type;

			$scope.delMethod = obj.importControlOptions.deliveryMethod;
			$scope.delMethod.unshift({'name': 'None Selected'});
			$scope.formObj.delMethod = $scope.delMethod[0].name;

			$scope.packageType = obj.importControlOptions.packagingType;
			$scope.packageType.unshift({'type': 'Select One'});
			$scope.formObj.packageType = $scope.packageType[0].type;

			$scope.refTypeImport = obj.importControlOptions.importTypes;
			$scope.refTypeImport.unshift({'type': 'Select One'});
			$scope.formObj.refTypeImport = $scope.refTypeImport[0].type;

			$scope.pickupOption = obj.returnServiceOpt.pickupOption;
			$scope.formObj.pickupOptionImport = $scope.pickupOption[0].type;

			$scope.deliveryOption = obj.returnServiceOpt.deliveryOption;
			$scope.formObj.deliveryAddressImport = $scope.deliveryOption[0].type;
		}
	});

	/**
	* @function
	* @name openTermsAndConditions
	* @params url
	* @description Opens the UPS provided URL in WEM popup window
	*/
	$scope.openTermsAndConditions=function(url){
     UtilService.openTearmsAndConditions(url);
	};

	/**
	* @function
	* @name saveImportControlOptionsData
	* @description Saves the data and Disabled the Save Changes Button
	*/
	$scope.saveImportControlOptionsData = function(){
		$scope.isDisabled = true;
		this.ups_importControlOptionsform.$setPristine();
	};

}]);

/**
this controller is not using anywhere ..
this is a conflict issue.
**/
/**
* @controller
* @name upsDOApp.controllers.controller : myChoiceManageAddressCtrl
* @description Add Household members flow
* @template ups.ppc-addhouseholdMem.html and ups.ppc-addedit-household-member.html
*/
	PrefrenceModule.controller('myChoiceManageAddressCtrl',['$scope','UtilService','$location','$timeout','ModalService',function($scope,UtilService,$location,$timeout,ModalService){
		var suffixValURL = 'ups.ppc-metaData.json';
		/**
		* @function
		* @name UtilService.mockServiceCalls
		* @description Service to fetch the data from JSON
		*/
		UtilService.mockServiceCalls({urlString: suffixValURL}, function(response){
			var obj = response.data;
			if(obj.errorCode){
				//notification.handleError(obj);
			} else{
				$scope.suffixVals = obj.suffix_options;
				if(obj.countries[0].code === 'us'){
					$scope.isUS=true;
				}else{
					$scope.isUS=false;
				}
			}
		});

		$scope.breadCrumbs=[{
			name:'Home',
			url:'Home'
			},{
				name:'Profile',
				url:'profile'
			},{
				name:'Preference',
				url:'preference'
			},{
				name:'UPS My Choice Preferences',
				url:'upsMyChoice'
			},{
				name:'Manage Membership/Addresses',
				url:''
			}];

		$scope.label={
			head:'UPS My Choice Preferences',
			tabs:[{
					name:'Overview',
					url:'Overview',
					isActive:false
				},{
					name:'My Information',
					url:'myinfo',
					isActive:false
				},{
					name:'Contact',
					url:'contact',
					isActive:false
				},{
					name:'Payment Options',
					url:'payOpt',
					isActive:false
				},{
					name:'Preferences',
					url:'pref',
					isActive:true
				}],
			content:{
				address:{
					name: 'John Smith',
					street:'1234 Apple Blossom Lane',
					city:'Roswell, GA 30076'
				},
				payment:'Payment Method:',
				paymentOptions:[{
					key:'Visa - xxxxxxxxxx1234',
					value:'visa'
				},{
					key:'Rupay - xxxxxxxxxx1234',
					value:'visa'
				},{
					key:'American Express - xxxxxxxxxx1234',
					value:'visa'
				},{
					key:'master Card - xxxxxxxxxx1234',
					value:'visa'
				}],
				promotion:'Promotion Code:',
				applyPromo:'Apply Promotion Code',
				clearPromo:'Clear Promotion Code',
				back:'Back',
				renew:'Renew'
			}
		};

		$scope.clearPromo=function(){
			$scope.promoCode='';
		};

		$scope.applyPromoCode=function(){

		};

		/****Add household member****/

		/**
		* @function
		* @name addHouseholdMember
		* @description Add new household member
		*/
		$scope.addHouseholdMember =function(type, index){
			var mTitle = 'Add a';

			if (type === 'edit') {
				mTitle = 'Edit';
			}

			//create modal when adding / editing
			var modalInstance = ModalService.open({
				title : mTitle + ' household member',
				content : '/app_assets/templates/ups.ppc-addHouseholdMemModal.html',
				component : 'ppc'
			}, function(sc) {

				//are we adding a name or editing one, get data accordingly
				if (type === 'edit') {
					sc.addMember = {
						first_name : $scope.householdMem[index].first_name,
						middle_name : $scope.householdMem[index].middle_name,
						last_name : $scope.householdMem[index].last_name
					};

					if ($scope.householdMem[index].name_suffix[0]) {
						sc.addMember.name_suffix = $scope.householdMem[index].name_suffix[0];
					} else {
						sc.addMember.name_suffix = '';
					}
					sc.nameReceiver = $scope.householdMem[index].nameReceiver;

				} else {
					sc.addMember = {
						first_name : '',
						middle_name : '',
						last_name : '',
						name_suffix : ''
					};
					sc.nameReceiver = [];
				}

				//some div visibility vars
				sc.LastNameMismatch = false;
				sc.isUS = $scope.isUS;

				//see if that last name matches what we have when last name field is blurred
				sc.checkLastName = function(val) {
					sc.LastNameMismatch = false;

					for(var i = 0; i < $scope.householdMem.length; i++){
						if ($scope.householdMem[i].last_name && val && ($scope.householdMem[i].last_name.toLowerCase() !== val.toLowerCase())) {
							sc.LastNameMismatch = true;
							return;
						}
					}
				};

				//save button click action
				sc.saveMember = function() {
					var tNameVarJoined = '';
					for (var i = 0; i < sc.nameReceiver.length; i++) {
						if (i > 0) {
							tNameVarJoined += ' ';
						}

						tNameVarJoined += sc.nameReceiver[i];
					}

					if (type === 'edit') {
						$scope.householdMem[index].first_name = sc.addMember.first_name;
						$scope.householdMem[index].last_name = sc.addMember.last_name;
						$scope.householdMem[index].middle_name = sc.addMember.middle_name;
						$scope.householdMem[index].name = sc.addMember.first_name + ' ' + sc.addMember.last_name;
						$scope.householdMem[index].nameReceiver = sc.nameReceiver;
						$scope.householdMem[index].nameVarJoined = tNameVarJoined;
						$scope.householdMem[index].name_suffix = [
							sc.addMember.name_suffix
						];
					} else {
						$scope.householdMem.push({
							_id : ($scope.householdInfo.length + 1),
							first_name : sc.addMember.first_name,
							last_name : sc.addMember.last_name,
							middle_name : sc.addMember.middle_name,
							name : sc.addMember.first_name + ' ' + sc.addMember.last_name,
							nameReceiver : sc.nameReceiver,
							nameVarJoined : tNameVarJoined,
							name_suffix : sc.addMember.name_suffix
						});
					}

					if (sc.LastNameMismatch) {
						$location.path('/preferencePage/mychoice/authenticate');
					}

					modalInstance.dismiss();
				};

				//add name button click action
				sc.addNameVariation = function () {
					sc.nameReceiver.push('');
				};

				//delete name variation button click action
				sc.deleteRow = function (index) {
					sc.nameReceiver.splice(index, 1);
				};

				//back button click action
				sc.back = function() {
					modalInstance.dismiss();
				};
			});

		};

		/**
		* @function
		* @name deleteHouseholdMember
		* @description Deletes selected household member
		*/
		$scope.deleteHouseholdMember=function(ind){

			$scope.currentIndex=ind;
			var modalInstance = ModalService.open({
					title: 'Are you sure?',
					content: '/app_assets/templates/ups.ppc-deleteHousehold.html',
					component: 'ppc'
				}, function(sc){
					sc.householdMember = $scope.householdMem[ind].name;
					sc.deleteHouseholdMem = function() {
						$scope.householdMem.splice($scope.currentIndex, 1);
						modalInstance.dismiss();
					};
					sc.back=function(){
						modalInstance.dismiss();
				};
			});
		};
		/**
		* @function
		* @name checkLastName
		* @description Checks last name duplicate values
		*/
		/*$scope.checkLastName=function(index, val){
			for(var j=0;j<$scope.addhouseholdMem.length;j++){
				$scope.duplicateLastName[j]=false;
			}
			for(var i=0;i<$scope.addhouseholdMem.length;i++){
				if ($scope.addhouseholdMem[i].last_name && val && $scope.addhouseholdMem[i].last_name.toLowerCase() !== val.toLowerCase()) {
					if(i!==index){
						$scope.duplicateLastName[index]= true;
					}
				}
			}
		};*/

		/**
		* @function
		* @name householdInfo
		* @description Array stores the household member value on initialization *
		*/
		$scope.householdInfo = [ {
			_id: 1,
			'name' : 'Jennifer Smith',
			'first_name':'Jennifer',
			'middle_name':'',
			'last_name':'Smith',
			'name_suffix':[],
			'nameReceiver' : ['Jenny'],
			'nameVarJoined':'Jenny'
		}];

		/**
		* @function
		* @name init
		* @description Used to initialize the variables
		*/
		function init(){
			$scope.addeditMember=false;
			$scope.formObj = {};
			$scope.nameReceiver=[];
			$scope.duplicateLastName=[];
			$scope.householdMem= angular.copy($scope.householdInfo);
		}

		/**
		* @function
		* @name cancel
		* @description Cancels the updated value
		*/
		/*$scope.cancel =function(){
			//Change editable to false
			for(var i=0;i<$scope.addhouseholdMem.length;i++){
				$scope.addhouseholdMem[i].isEditable =false;

			}
			init();
			$scope.addeditMember=false;
		};*/

		/**
		* @function
		* @name saveChanges
		* @description Saves the updated value
		*/
		/*$scope.saveChanges =function(){
			for(var i=0;i<$scope.addhouseholdMem.length;i++){
				$scope.addhouseholdMem[i]=UtilService.mergeNames($scope.addhouseholdMem[i]);

				if($scope.addhouseholdMem[i].nameReceiver!==undefined){
					console.log('f');
					for(var j=0;j<$scope.addhouseholdMem[i].nameReceiver.length;j++){
					$scope.addhouseholdMem[i].nameReceiver[j]=($scope.addhouseholdMem[i].nameReceiver[j]).replace(/\s+/g, ' ');
					if( $scope.addhouseholdMem[i].nameReceiver[j] === '' || $scope.addhouseholdMem[i].nameReceiver[j] === ' '){
						$scope.addhouseholdMem[i].nameReceiver.splice(j,1);

						}
					}
					$scope.addhouseholdMem[i].nameVarJoined=($scope.addhouseholdMem[i].nameReceiver).join(', ');
				}



				$scope.addhouseholdMem[i].isEditable =false;

				if($scope.duplicateLastName[i]===true){
					$location.path('/preferencePage/mychoice/authenticate');
				}
			}

			$scope.householdInfo = angular.copy($scope.addhouseholdMem);
		};*/

		/**
		* @function
		* @name addNameVariation
		* @description Add row for name variation
		*/
		/*$scope.addNameVariation = function(index){
			if(!$scope.addhouseholdMem[index].nameReceiver){
				$scope.addhouseholdMem[index].nameReceiver = [];
			}
			$scope.addhouseholdMem[index].nameReceiver.push(' ');
			$timeout(function(){
				var emptyInput = document.getElementsByClassName('dynamicTextBox');
				emptyInput[emptyInput.length -1].focus();
	    	  },100);

			//console.log(index);
		};*/

		/**
		* @function
		* @name checkLength
		* @description Cehcks length of name variation members
		*/
		/*$scope.checkLength = function(index){
        	var data= $scope.addhouseholdMem[index].nameReceiver;
        	return data.length;
	    };*/

		/**
		* @function
		* @name deleteRow
		* @description Delete row of name variation
		*/
		/*$scope.deleteRow=function(obj,index){
			if(!index){
				return;
			}
			obj.splice(index,1);
		};*/

		init();
	}]);

/**
* @controller
* @name upsDOApp.controllers.controller : prefcustomPackagingTypesCtrl
* @description Custom Packaging Types Controller. This controller contains the custom packaging types
* @template ups.ppc-customPackagingTypes.html and ups.ppc-add-air-frieght-account.html
*/
	PrefrenceModule.controller('prefcustomPackagingTypesCtrl',['$scope', 'UtilService','paymentService','ModalService','$rootScope',function($scope, UtilService, paymentService,ModalService,$rootScope){

		$scope.info = [ {
			_id: 1,
		    'name' : 'Package Name 1',
		    'length' : '11',
		    'width' : '11',
		    'height' : '11',
		    'unit' : 'in',
		    'Default' : 'DEFAULT METHOD',
		    'makeDefault' : true,
		},{
			_id: 2,
		    'name' : 'Package Name 2',
		    'length' : '22',
		    'width' : '22',
		    'height' : '22',
		    'unit' : 'cm',
		    'Default' : 'MAKE DEFAULT',
		    'makeDefault' : false,
		},{
			_id: 3,
		    'name' : 'Package Name 3',
		    'length' : '33',
		    'width' : '33',
		    'height' : '33',
		    'unit' : 'in',
		    'Default' : 'MAKE DEFAULT',
		    'makeDefault' : false,
		},{
			_id: 4,
		    'name' : 'Package Name 4',
		    'length' : '44',
		    'width' : '44',
		    'height' : '44',
		    'unit' : 'cm',
		    'Default' : 'MAKE DEFAULT',
		    'makeDefault' : false,
		},{
			_id: 5,
		    'name' : 'Package Name 5',
		    'length' : '55',
		    'width' : '55',
		    'height' : '55',
		    'unit' : 'in',
		    'Default' : 'MAKE DEFAULT',
		    'makeDefault' : false,
		}];


		/**
		* @function
		* @name checkZeroDim
		* @params pObj
		* @description Check whether the dimensions input boxes(l,W and H) contains 0 as value or not
		*/
		function checkZeroDim(pObj){
			$scope.isZeroDimL = false;
			$scope.isZeroDimW = false;
			$scope.isZeroDimH = false;
			var zeroDim;

			var len = parseInt(pObj.afrLength);
			var wid = parseInt(pObj.afrWidth);
			var heg = parseInt(pObj.afrHeight);

			if(len === 0  || wid === 0  || heg === 0){
				zeroDim = true;
				if(len===0){$scope.isZeroDimL = true;}else{$scope.isZeroDimL = false;}
				if(wid===0){$scope.isZeroDimW = true;}else{$scope.isZeroDimW = false;}
				if(heg===0){$scope.isZeroDimH = true;}else{$scope.isZeroDimH = false;}
			}else{
				zeroDim = false;
			}

			return zeroDim;
		}

		/**
		* @function
		* @name saveStatement
		* @params pObj and index
		* @description Saves the data into the table after add/edit operation and shows error in duplicates package names
		*/
		function saveStatement(action,pObj,index){
			  var option = {};
			  $scope.isDupName = false;
			  $scope.isZeroDim = false;

			  if($scope.newStatementChecked === true || action === 'Add' || action === 'Edit'){
			  angular.forEach($scope.customPackageData.packageInfo, function (item) {
		            if(item.name === pObj.name){
		            	$scope.isDupName = true;
		            }
		        });
			  }

			  $scope.isZeroDim = checkZeroDim(pObj);

			  if($scope.isDupName === false && $scope.isZeroDim === false){
				  if($scope.isEdModal === true && $scope.newStatementChecked !== true){
					  $scope.customPackageData.packageInfo[index].name = pObj.name;
					  $scope.customPackageData.packageInfo[index].length = pObj.afrLength;
					  $scope.customPackageData.packageInfo[index].width = pObj.afrWidth;
					  $scope.customPackageData.packageInfo[index].height = pObj.afrHeight;
					  $scope.customPackageData.packageInfo[index].unit = pObj.Unit;
				  }else{
					  option.name= pObj.name;
				      option.length=pObj.afrLength;
				      option.width=pObj.afrWidth;
				      option.height=pObj.afrHeight;
				      option.unit=pObj.Unit;

				      $scope.customPackageData.packageInfo.push(option);
					  $scope.customPackageData.packageInfo = paymentService.sortWithoutDefault($scope.customPackageData.packageInfo,'name',true);
				      $scope.noRecords = false;
				      if($scope.customPackageData.packageInfo.length === 20){
				    	  $rootScope.isAddDisabled=true;
				      }
				  }
			  }
		  }

		/**
		* @function
		* @name addCustomPackage
		* @params action, name, len, wid, hgt, selected and index
		* @description Opens up the Add/Edit package Modals
		*/
		$scope.addCustomPackage = function(action,name,len,wid,hgt,selected,index){

			var modalTitle = '';
			if(action === 'Add'){
				modalTitle = 'Create custom packaging.';
			}else{
				modalTitle = 'Edit custom packaging.';
			}

			/**
			* @function
			* @name ModalService.open
			* @description calls the ModalService to opens up the Add/Edit package Modals
			*/
			var modalInstance = ModalService.open({
		        content :'/app_assets/templates/ups.ppc-add-air-frieght-account.html',
		        title : modalTitle
			},
		        function(sc) {
		            sc.data = [ {
		            	title: 'Vacation Dates',
		            	value: '07/10/2016 - 09/10/2016'
		            }, {
		            	title: 'Vacation Settings',
		            	value: 'Reschedule delivery for 07/10/2016'
		            } ];
		            sc.okText = 'Yes';
		            sc.cancelText = 'No';
		            sc.unitMeasure = ['in','cm'];

		            /**
		    		* @function
		    		* @name helpLink
		    		* @description Opens up the UPS provided help URL in WEM styled popup
		    		*/
		            sc.helpLink = function(){
		            	UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/create/dimensions_help.html');
		            };

		            /**
		    		* @function
		    		* @name saveNewStatement
		    		* @params check
		    		* @description stores the values of New Statement Checkbox in a variable
		    		*/
		            sc.saveNewStatement = function(check){
		            	$scope.newStatementChecked = check;
		            };
		            if(action === 'Add'){
		    			sc.isEditModal = false;
		    			//sc.title = 'Create Custom Packaging';
		    			sc.formObj.name='';
		    			sc.formObj.afrLength='';
		    			sc.formObj.afrWidth='';
		    			sc.formObj.afrHeight='';
		    			sc.formObj.Unit = sc.unitMeasure[0];

		    			$scope.isEdModal = sc.isEditModal;
		    		}else{
		    			sc.isEditModal = true;
		    			//sc.title = 'Edit Custom Packaging';
		    			sc.formObj.name=name;
		    			sc.formObj.afrLength=len;
		    			sc.formObj.afrWidth=wid;
		    			sc.formObj.afrHeight=hgt;
		    			sc.formObj.Unit = selected;

		    			$scope.isEdModal = sc.isEditModal;
		    		}

		            sc.submit = function (formObj){
		            	saveStatement(action,formObj,index);
		            	if($scope.isDupName === false && $scope.isZeroDim === false){
		            		sc.ok();
		            	}else{
		            		sc.isDupName = $scope.isDupName;
		            		sc.isZeroDimL = $scope.isZeroDimL;
		            		sc.isZeroDimW = $scope.isZeroDimW;
		            		sc.isZeroDimH = $scope.isZeroDimH;
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
		* @name remove
		* @params index
		* @description Removes the statement from the table
		*/
		$scope.remove = function(index) {
			if(index!==undefined){
				$scope.rowDeleted = index;
			}else{
				$scope.rowDeleted = undefined;
			}
		 	$scope.rowIndex = index;
		 	var tempArr = [];
			if($scope.rowDeleted!==undefined){
				 for(var i=0;i<$scope.customPackageData.packageInfo.length;i++){
					 if(i !== $scope.rowDeleted){
						 tempArr.push($scope.customPackageData.packageInfo[i]);
					 }
				 }
			 }else{
				 for(var j=0;j<$scope.customPackageData.packageInfo.length;j++){
					 if(!$scope.customPackageData.packageInfo[j].Selected){
						 tempArr.push($scope.customPackageData.packageInfo[j]);
					 }
				 }
			 }

			$scope.customPackageData.packageInfo = tempArr;
			 if($scope.customPackageData.packageInfo.length === 0){
				 $scope.noRecords = true;
				 $rootScope.isAddDisabled=false;
			}else if($scope.customPackageData.packageInfo.length < 20){
		    	  $rootScope.isAddDisabled=false;
		      	}
		};

		/**
		* @function
		* @name checkAll
		* @params selectedAll and list
		* @description Checks all of the checkboxes at once when header checkbox is checked
		*/
		$scope.checkAll = function(selectedAll, list){
			if (selectedAll) {
				selectedAll = true;
	        } else {
	        	selectedAll = false;
	        }
	        angular.forEach(list, function (item) {
	            item.Selected = selectedAll;
	        });
		};

		/**
		* @function
		* @name getSelected
		* @params list
		* @description Checks and stores all the Checked rows from the table
		*/
		$scope.getSelected = function(list){
			var selectedList = [];
			angular.forEach(list, function (item) {
	            if(item.Selected){
	            	selectedList.push(item);
	            }
	        });
			return selectedList.length === 0 ? true: false;
		};

		/**
		* @function
		* @name init
		* @description Initializes all the variables
		*/
		function init(){
			$scope.customPackageData = {};
			$scope.customPackageData.packageInfo = $scope.info;
			$scope.isEditModal = false;
			$scope.isEdModal = false;
			$scope.newStatementChecked = false;
			$scope.noRecords = false;
			$rootScope.isAddDisabled=false;
		}

		init();

	}]);


/*  PrefrenceModule.controller('preferenceEditAdl',['$scope',function($scope){

 }]); */

/**
* @controller
* @name upsDOApp.controllers.controller : preferenceSetAltDelivery
* @description Preferences Set alternate Delivery flow
* @template
*/
	PrefrenceModule.controller('preferenceSetAltDelivery',[function(){}]);


/**
 * @controller
 * @name upsDOApp.controllers.controller : prefrenceAddressBookCtrl
 * @description Address Book Preferences Flow
 * @template ups.ppc-preference-addressbook-options.html
 */
	PrefrenceModule.controller('prefrenceAddressBookCtrl',['$scope', 'UtilService',function($scope, UtilService){

		var submitJSON = 'ups.ppc-submit-form.json';

		// Save function will call the service to save the current data that is
		// formObj
		$scope.save = function(){
			var self = this;
			// Save Function called
			// service call goes here- TODO
			UtilService.mockServiceCalls({urlString: submitJSON}, function(response){
				var obj = response.data;
		        if(obj.errorCode){
		        	// On error goto error handeler
		        }else{
		        	// On success
		        	self.ups_addressbookform.$setPristine();
		    		console.log(obj, $scope.formObj);
		        }
			});
		};

		$scope.openNewWindow = function(){
			UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/create/shipping/create/ext_address_book.html');
		};

		// called when the controller is loaded
		function init(){
			$scope.formObj = {};

			// addressOptions Tab Functions -- >Start
			$scope.addressOptions = [
				{title:'Save new addresses to my contacts.'},
				{title:'Validate new addresses for accuracy.'},
				{title:'Update contact addresses based on validation results.'}
			];
		}
		init();
	 }]);


/**
 * @controller
 * @name upsDOApp.controllers.controller : prefrenceAddressBookCtrl
 * @description Preference Access Point Flow
 * @template ups.ppc-preference-addressbook-options.html
 */
	PrefrenceModule.controller('prefrenceAccessCtrl',['$scope', 'UtilService','MockJSONCalls','DashboardService','localStorageService',function($scope, UtilService, MockJSONCalls,DashboardService, localStorageService){

		var userInformation;
		//Call meta data
		var submitJSON = 'ups.ppc-submit-form.json';
		var accessJSON = 'ups.ppc-preference-access.json';

		$scope.openNewWindow = function(){
			UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/create/shipping/create/ext_address_book.html');
		};

		// Save function will call the service to save the current data that is
		// formObj
		$scope.save = function(){
			var self = this;
			// Save Function called
			// service call goes here- TODO
			UtilService.mockServiceCalls({urlString: submitJSON}, function(response){
				var obj = response.data;
		        if(obj.errorCode){
		        	// On error goto error handeler
		        }else{
		        	// On success
		        	self.ups_shippingAccessPoint.$setPristine();
		    		console.log(obj, $scope.formObj);
		        }
			});
		};

		$scope.shipperType = function(val){
			$scope.formObj.shipper.sendto = '';
			if(val === 'E-mail'){
				$scope.setEmail= true;
			}else{
				$scope.setEmail= false;
			}
			//console.log(val);
		};

		// called when the controller is loaded
		(function(){
			userInformation = localStorageService.get('active_user_info');
			$scope.formObj = {
				receiver: {},
				shipper: {}
			};

			// Fetch
			var metaData = DashboardService.getMetaData();
	 	 	if(!metaData.countries){
	 			MockJSONCalls.getJson({urlString: 'ups.ppc-metaData.json'})
	 	        // then() called when response gets back
	 	        .then(function(data) {
	 	            // promise fulfilled TODO set metadata
	 	        	DashboardService.setMetaData(data);
					$scope.data = {
						notificationType: data.communicationOptions,
						notificationLanguage: data.languages,
						countryCodeList: metaData.countryCode
					};
	 	        }, function() {
	 	            // promise rejected
	 	        });
	 	 	}else{
				$scope.data = {
					notificationType: metaData.communicationOptions,
					notificationLanguage: metaData.languages,
					countryCodeList: metaData.countryCode
				};
	 	 	}

			UtilService.mockServiceCalls({urlString: accessJSON}, function(response){
				var obj = response.data;
		        if(obj.errorCode){
		        	// On error goto error handeler
		        }else{
		        	// On success addressOptions Tab Functions -- >Start
					$scope.formObj = obj.selection;
					$scope.setEmail= true;
					$scope.formObj.shipper.countryCode = $scope.data.countryCodeList[0].code;
					$scope.formObj.email = userInformation.user_email;
					$scope.formObj.emailTo = userInformation.user_email;
					$scope.formObj.shipper.email = userInformation.user_email;
		        }
			});

		})();
	 }]);

/**
 * @controller
 * @name upsDOApp.controllers.controller : myChoiceManageMembershipAddCtrl
 * @description Manage membership / Address  Controller. This controller contains the membership or address controller
 * @template ups.ppc-mychoice-preference-manageAddress.html
 */
PrefrenceModule.controller('myChoiceManageMembershipAddCtrl',['$scope','$window','paymentService','UtilService','ModalService','$rootScope', '$location',function($scope,$window,paymentService,UtilService,ModalService,$rootScope, $location){
	$scope.address = [ {
		_id: 1,
		'description' : 'My House',
		'address' : {
			'street':'1234 Apple Blossom Lane',
			'city' : 'Roswell',
			'stateCode' : 'GA',
			'pCode' : 30007,
            'email' : 'sample@sample.com',
            'phoneNumber' : '000-555-5555'
		},
		'expText':'No expiration date.',
		'memLevel':'basic',
		'pendingActCode':false,
		'active':true,
		'expired':false,
		'pendingExp':false,
		'cancelled':false,
        'modal_content': {
            'cancel' : "If you continue, we'll cancel your UPS My Choice membership."
        }
	},{
		_id: 2,
		'description' : 'Vegas Condo',
		'address' : {
			'street':	'1001 Paradise Rd.',
			'city' : 'Las Vegas',
			'stateCode' : 'NV',
			'pCode' : '89109',
            'email' : 'sample@sample.com',
            'phoneNumber' : '000-555-5555',
		},
		'expText':'Premium membership expires 02/15/2010.',
		'memLevel':'premium',
		'pendingActCode':false,
		'active':true,
		'expired':false,
		'pendingExp':false,
		'cancelled':false,
        'modal_content': {
            'downgrade': "If you continue, we'll downgrade your membership after your expiration date. You will still receive package notification and other basic UPS My Choice privileges.",
            'cancel' : "If you continue, we'll cancel your UPS My Choice membership."
        }
	},{
		_id: 3,
		'description' : 'LA Villa',
		'address' : {
			'street':'9876 Hollywood Blvd.',
			'city' : 'Los Angeles',
			'stateCode' : 'CA',
			'pCode' : '90028',
		},
		'expText':'No expiration date. Activate your membership to access all service features.',
		'pendingActCode':true,
		'active':false,
		'expired':false,
		'pendingExp':false,
		'cancelled':false
	},{
		_id: 4,
		'description' : 'Pent House',
		'address' : {
			'street':'144 East 68th Street',
			'city' : 'New York City',
			'stateCode' : 'NY',
			'pCode' : '10001',
		},
		'expText':'Premium membership ends on 12/31/2010.',
		'pendingActCode':false,
		'active':false,
		'expired':false,
		'pendingExp':true,
		'cancelled':false
	},{
		_id: 5,
		'description' : 'Mountain Cabin',
		'address' : {
			'street':'789 Hillside Lane',
			'city' : 'Blue Ridge',
			'stateCode' : 'GA',
			'pCode' : '30513',
		},
		'expText':'Expired on 10/01/2010.',
		'pendingActCode':false,
		'active':false,
		'expired':false,
		'pendingExp':false,
		'cancelled':false
    },{
        _id: 6,
        'description' : 'Beach House',
        'address' : {
            'street':'32 Sand Court',
            'city' : 'Destin',
            'stateCode' : 'FL',
            'pCode' : '32451',
            'email' : 'kelly@gmail.com',
            'phoneNumber' : '001-888-9959',
        },
        'expText':'No expiration date.',
        'memLevel':'basic',
		'pendingActCode':false,
		'active':true,
		'expired':false,
		'pendingExp':false,
		'cancelled':false,
        'modal_content': {
            'cancel' : "If you continue, we'll cancel your UPS My Choice membership."
        }
    }];

	$scope.nonUSAddress = [ {
		_id: 1,
		'description' : 'My House',
		'address' : {
			'street':'108 Rue Saint-Lazare',
			'city' : 'Paris',
			'stateCode' : 'France',
			'pCode' : 75008,
		},
		'expText':'No expiration date.',
		'memLevel':'basic',
		'pendingActCode':false,
		'active':false,
		'expired':false,
		'pendingExp':false,
		'cancelled':false
	},{
		_id: 2,
		'description' : 'Bordeaux Chateau',
		'address' : {
			'street':	'153 Rue Georges Bonnac',
			'city' : 'Bordeaux',
			'stateCode' : 'France',
			'pCode' : '33000',
		},
		'expText':'Activate your membership by 12/31/2016 to access all service features.',
		'pendingActCode':true,
		'active':false,
		'expired':false,
		'pendingExp':false,
		'cancelled':false
	},{
		_id: 3,
		'description' : 'Beach House',
		'address' : {
			'street':'12 Rue du Temple',
			'city' : 'Bordeaux',
			'stateCode' : 'France',
			'pCode' : '33000',
		},
		'expText':'No expiration date.',
		'pendingActCode':false,
		'active':true,
		'expired':false,
		'pendingExp':false,
		'cancelled':false,
        'modal_content': {
            'cancel' : "If you continue, we'll cancel your UPS My Choice membership."
        }
	},{
		_id: 4,
		'description' : 'Mom\'s House',
		'address' : {
			'street':'2 Place de la Defense',
			'city' : 'Puteaux',
			'stateCode' : 'France',
			'pCode' : '92800',
		},
		'expText':'Cancelled on 12/31/2010',
		'pendingActCode':false,
		'active':false,
		'expired':false,
		'pendingExp':false,
		'cancelled':true
	}];
	//$scope.activeDesc=[];
	//$scope.othersDesc=[];
	//$scope.deliveryAddressData = {};
	//$scope.deliveryAddressData.address = $scope.address;
	$scope.isUS = true;
	$rootScope.isManageMembershipFlow = false;

	$rootScope.deliveryAddressData = {};
	$rootScope.deliveryAddressData.address = $scope.address;

	$rootScope.$broadcast('sortAddressDescriptions', {});

	$rootScope.$on('sortAddressDescriptions',function(){
		$scope.activeDesc=[];
		$scope.othersDesc=[];

		/**
		* @function
		* @name Anonymous Self Invoking function
		* @description Pushes active and non-active members in separate arrays
		*/
		(function(){
			angular.forEach($rootScope.deliveryAddressData.address, function (item) {
	            if(item.active === true){
	            	$scope.activeDesc.push(item);
	            }else{
	            	$scope.othersDesc.push(item);
	            }
	        });
	    })();
		$scope.activeDesc = paymentService.sortWithoutDefault($scope.activeDesc,'description',true);
		$scope.othersDesc = paymentService.sortWithoutDefault($scope.othersDesc,'description',true);

		$scope.deliveryAddressData.address = $scope.activeDesc;
		angular.forEach($scope.othersDesc, function (item) {
			$scope.deliveryAddressData.address.push(item);
	    });
	});

	$scope.getAddresses = function () {
		if ($scope.isUS) {
			return $scope.address;
		}

		return $scope.nonUSAddress;
	};

	/**
	* @function
	* @name openCancelMembership
	* @params address and desc
	* @description Opens up Cancel membership modal on click of 'Cancel Membership' Link
	*/
	$scope.openCancelMembership=function(address, desc, memLevel, modal_content, index){
		ModalService.open({
			title: 'Are you sure?',
            content: '/app_assets/templates/ups.ppc-cancelMembershipModal.html'
        },function(sc){
        	sc.address=address;
        	sc.address.house=desc;
            sc.modal_content=modal_content;
			sc.cancelMembership=function(){
				if (memLevel === 'premium') {
					$location.path('/preferencePage/mychoice/membershipCancelPremium');
					sc.cancel();
				} else {
					$location.path('/preferencePage/mychoice/membershipCancelBasic');
					sc.cancel();
				}
				//sc.cancel();
			};
		});
    };

    /**
	* @function
	* @name openDowngradeModal
	* @params address and desc
	* @description Opens up Downgrade Membership modal on click of 'Downgrade My Membership' Link
	*/
	$scope.openDowngradeModal=function(address, desc, memLevel, modal_content, index){
		ModalService.open({
			title: 'Are you sure?',
            content: '/app_assets/templates/ups.ppc-downgradeMembershipModal.html'
        },function(sc){
        	sc.address=address;
        	sc.address.house=desc;
            sc.modal_content=modal_content;
            sc.yesDowngrade = function () {
                $scope.downgradeToBasic(index);
                sc.cancel();
            }
		});
    };

    $scope.downgradeToBasic = function(ind){
        $rootScope.deliveryAddressData.address[ind].memLevel = 'basic';
        $rootScope.$broadcast('sortAddressDescriptions', {});
    };

    /**
	* @function
	* @name openMyChoiceModal
	* @description Opens up Enter Address modal on click of 'Add another delivery Address' button
	*/
    $scope.openMyChoiceModal = function(){
    	$rootScope.isManageMembershipFlow = true;
    	$rootScope.typeOfUser = '';
		$rootScope.lastPage ='';
		var modalInstance = ModalService.open({
			title: 'Choose your address.',
			content: '/app_assets/templates/ups.ppc-chooseaddressModal.html'
		},
	        function(sc) {
	            sc.data = [ {
	            	title: 'Vacation Dates',
	            	value: '07/10/2016 - 09/10/2016'
	            }, {
	            	title: 'Vacation Settings',
	            	value: 'Reschedule delivery for 07/10/2016'
	            } ];
	            sc.okText = 'Yes';
	            sc.cancelText = 'No';
	        });
		modalInstance.result.then(function() {

	    }, function() {
	        // Cancel
	    });
	};

	$scope.upgradeToPremium = function(ind){
		/*$rootScope.typeOfUser = 'premium';*/
		$rootScope.basicIndex = ind;
		$rootScope.upgrade = true;

		$location.path('/preferencePage/mychoice/membershipRenewal');
		/*var modalInstance = ModalService.open({
			title: 'How would you like to pay?',
            content: '/app_assets/templates/ups.doa-choosePaymentModal.html'
		},
	        function(sc) {
	            sc.data = [ {
	            	title: 'Vacation Dates',
	            	value: '07/10/2016 - 09/10/2016'
	            }, {
	            	title: 'Vacation Settings',
	            	value: 'Reschedule delivery for 07/10/2016'
	            } ];
	            sc.okText = 'Yes';
	            sc.cancelText = 'No';
	        });
		modalInstance.result.then(function() {

	    }, function() {
	        // Cancel
	    });*/


	};

}]);


/**
 * @controller
 * @name upsDOApp.controllers.controller : myChoiceManageRenewCtrl
 * @description Manage Renewal Flow
 * @template ups.ppc-mychoice-preference-manageMembershipRenewal.html
 */
	PrefrenceModule.controller('myChoiceManageRenewCtrl',['$scope','$location','UtilService','paymentService','$rootScope',function($scope,$location,UtilService,paymentService,$rootScope){
		var source= angular.copy(paymentService.savedMethods,source);
		$scope.pref={};
		$scope.promoApplied = false;
		$scope.label={
			content:{
				address:{
					name: 'John Smith',
					street:'1234 Apple Blossom Lane',
					city:'Roswell, GA 30076'
				},
				paymentOptions:[{
					key:'Enter A Different Payment Card',
					value:'diffPayment'
				},{
					key:'Enter A Different Account',
					value:'diffAccount'
				}],
				payment:source
			}
		};

		$scope.isAnUpgrade = $rootScope.upgrade;

		if($scope.label.content.payment.length>0){
			var checkObj=false;
			console.log($scope.label.content.payment);
			for(var i=0; i < $scope.label.content.payment.length; i++){
				if($scope.label.content.payment[i].makeDefault===undefined){
					$scope.label.content.payment[i].makeDefault=false;
				}
				if($scope.label.content.payment[i].makeDefault){
					checkObj=$scope.label.content.payment[i].makeDefault;
					break;
				}
			}
			if(!checkObj){
				$scope.label.content.payment.unshift({
					displayAccount: 'Select one',
					cardNumber : 'dddssdfdfdsf',
					noDefaultPayment:true,
					makeDefault:true
				});
			}
		}

		$scope.disableButton=true;
		$scope.requirePayment=true;

		if($scope.currentPrice<1){
			$scope.requirePayment=false;
		}
		function convertToFloat(number){
			return number.toFixed(2);
		}
		$scope.currentPrice= $scope.dupPrice= convertToFloat(40);
		$scope.clearPromo=function(){
			$scope.promoCode='';
			$scope.disableButton=true;
			$scope.currentPrice= $scope.dupPrice;
			$scope.promoApplied = false;
		};

		$scope.enableButton=function(){
			if($scope.promoCode.length>0){
				$scope.disableButton=false;
			}else{
				$scope.disableButton=true;
			}
		};

		$scope.redirectUrl=function(){
			UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/resources/ship/terms/service_mychoice.html');
		};



		// to do open manage membership accordion
		$scope.redirectMembership=function(){
			$location.path('/preferencePage/mychoicePreference');
		};
		//Apply discount coupon code to be implement with external web services.
		$scope.applyPromoCode=function(){
			if($scope.promoCode==='12345'){
				$scope.currentPrice = convertToFloat($scope.currentPrice - 20);
				$scope.promoApplied = true;

			}
		};

		$scope.renew=function(){
			$location.path('/preferencePage/mychoice/membershipConfirmation');
			//$rootScope.upgrade = false;
		};

		$scope.back=function(){
			//redirect it to membership renewal accordion
			$location.path('/membershipInfo');
			$rootScope.upgrade = false;

		};
	}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : myChoiceConfirmRenewCtrl
 * @description Renewal Confirmation Flow
 * @template ups.ppc-mychoice-preference-confirmationRenewal.html
 */
	.controller('myChoiceConfirmRenewCtrl',['$scope','UtilService', '$rootScope',function($scope,UtilService, $rootScope){
        $scope.isAnUpgrade = $rootScope.upgrade;

		$scope.profile={
			address:{
				head:'Address',
				street:'1234 Apple Blossom Lane',
				city:'Roswell, GA 30076',
				country:'United States'
			},
			contactInfo:{
				head:'Contact Info',
				email:'john@email.com',
				phone:'678-123-4567'
			},
			active_user_info:{
				head:'User ID',
				id:'JSmith1234',
				phone:'(678) 123-4567'
			}
		};
		$scope.redirectTrack=function(){
			UtilService.openTearmsAndConditions('https://www.ups.com/WebTracking/track');
		};
	}]);

/**
 * @controller
 * @name upsDOApp.controllers.controller : myChoicesetVacationCtrl
 * @description Set Vacation Flow
 * @template ups.ppc-set-vacation.html
 */
	PrefrenceModule.controller('myChoicesetVacationCtrl',['$scope','$filter','paymentService','localStorageService','$rootScope','$location','ModalService',function($scope,$filter,paymentService,localStorageService,$rootScope,$location,ModalService){

		$scope.ModalService = ModalService;
		var userInfo = localStorageService.get('active_user_info');
		var nonUsMember = localStorageService.get('nonUsMember');
		//code for ups my choiseAtenticated user will chnage once user defined.
		//var myChoiceUser = localStorageService.get('myChoiceUser');
	    $scope.isMyChoiceLogin =localStorageService.get('active_user_info').user_type.mychoice;
		$scope.formObj.email = userInfo.user_email;
		$scope.countryCode = userInfo.user_type.locale.county_id.toLowerCase();
		$scope.formArray=[];
		$scope.verifyNow = function(){
			$location.path('/preferencePage/mychoice/authenticate');
		};

		function PrintDiv() {
            var contents = document.getElementById('ups-setVac-Ctrl').innerHTML;
            var frame1 = document.createElement('iframe');
            frame1.name = 'frame1';
            frame1.style.position = 'absolute';
            frame1.style.top = '-1000000px';
            document.body.appendChild(frame1);
            var frameDoc = (frame1.contentWindow) ? frame1.contentWindow : (frame1.contentDocument.document) ? frame1.contentDocument.document : frame1.contentDocument;
            frameDoc.document.open();
            frameDoc.document.write('<html><head><title>DIV Contents</title>');
            frameDoc.document.write('</head><body>');
            frameDoc.document.write(contents);
            frameDoc.document.write('</body></html>');
            frameDoc.document.close();
            setTimeout(function () {
                window.frames.frame1.focus();
                window.frames.frame1.print();
                document.body.removeChild(frame1);
            }, 500);
            return false;
        }

		$scope.printInformation = function(){
          var print = new PrintDiv();
          print();
		};

		//Date Picker
		function loadModal(sc){
		sc.popup1 = {};
		sc.popup2 = {};
		sc.formOb={};
		sc.showvalidDates=true;
		//sc.validDates = userInfo.valid_dates;
		sc.validDates = 'both';
		sc.locAddress = userInfo.address[0];
		sc.userAdress = userInfo.address;
		sc.form={};
		sc.isButtonEnable=false;
		sc.popup1.opened = false;
		sc.format = 'MM/dd/yyyy';
		sc.isPremium = userInfo.user_type.locale.isPremium;
		sc.nonUsMember = nonUsMember;

		function init(){
		sc.formObj.email = $scope.formObj.email;
		if(paymentService.savedMethods.length===0){
		sc.accountMethods=[{'displayAccount':'Enter A Different Payment Card'},
		{'displayAccount':'Enter A Different Account'}];
		sc.formObj.methods=sc.accountMethods[0];
		}else{
			var data =paymentService.savedMethods;
			var obj=[];
			angular.extend(obj,data);
			obj.push({'displayAccount':'Enter A Different Payment Card'});
			obj.push({'displayAccount':'Enter A Different Account'});
			sc.accountMethods = obj;
			sc.formObj.methods=sc.accountMethods[0];
			sc.defaultVal = $filter('filter')(paymentService.savedMethods, { makeDefault: true });
			if(sc.defaultVal!==0){
				sc.formObj.methods=sc.defaultVal[0];
			}
		}
		  if($scope.vacMode==='edit'){
		  	    sc.datesDecided = $scope.datesDecided;
				sc.formObj = $scope.formObj;
				sc.formObj.methods = $scope.selectedMethod;
				sc.shDelivery = true;

			}else{
				var date = new Date();
				sc.formObj.dateFrom = date.setDate(date.getDate() + 1 );
	    		sc.formObj.dateTo = date.setDate(date.getDate() + 1);
				sc.formObj.contactName= userInfo.user_name;
				sc.formObj.ContactNumber= userInfo.phone;

			}


		sc.dateOptions = {
	    //dateDisabled: disabled,
	    formatYear: 'yy',
	    maxDate: new Date(2020, 5, 22),
	    minDate: new Date(),
	    startingDay: 1
	  };

	  sc.events = [
	    {
	      date: sc.formObj.dateFrom,
	      status: 'full'
	    },
	    {
	      date: sc.formObj.dateTo,
	      status: 'partially'
	    }
	  ];

		}
		init();
		sc.form.address={};

	 sc.findLocation = function(){
	    if(sc.form.city||sc.form.address.state||sc.form.zipCode){
	    	sc.isError = false;
	    }else{
	    	sc.isError = true;
	    }

	 };
	 sc.findanotherLocation = function(){
	        if(sc.formOb.city||sc.formOb.state||sc.formOb.zipCode){
	    	sc.isError = false;
	    }else{
	    	sc.isError = true;
	    }

	 	};

	  sc.setAddress = function(){
		sc.form.address0 = userInfo.address[0].street;
		sc.form.city = userInfo.address[0].city;
		sc.form.zipCode = userInfo.address[0].zip;
	  };
	  sc.discardChanges = function(){
	  	sc.formOb={};
	  };
	  sc.buttonDisabled = function(obj){
        sc.isButtonEnable = obj;
        $scope.upsPickup = sc.isButtonEnable;
	  };

	  sc.verifyNow = function(){
	  	$location.path('/preferencePage/mychoice/authenticate');
	  };
	  sc.setPackageDel = function(val){
	  	sc.isButtonEnable = val;
	  };

	  	sc.openFromCalender = function(){
			sc.popup1.opened = !sc.popup1.opened;
		};
		sc.openToCalender = function(){
			sc.popup2.opened = !sc.popup2.opened;
		};

		sc.setDate = function(year, month, day) {
		    sc.authenticateFormObj.invoiceDate = new Date(year, month, day);
		  };
		  if($scope.upsPickup){
		  	 sc.form.radVal ='location';
		  	 sc.isButtonEnable=true;
		  	sc.showPanel =$scope.showPanel;
		  	sc.getanotherPanel =$scope.getanotherPanel;
		  	sc.disableNearMe = $scope.disableNearMe;
		  }else{
		  	 sc.form.radVal ='package';
		  }
		  sc.showLocationNearAnother = function(){
		  	sc.disableNearMe=true;
		  	sc.showPanel=false;
		  	sc.getanotherPanel=true;
		  	$scope.showPanel =sc.showPanel;
		  	$scope.getanotherPanel =sc.getanotherPanel;
		  	$scope.disableNearMe = sc.disableNearMe;
		  };
		  sc.showLocationNearBy = function(){
		  	sc.disableNearMe=true;
		  	sc.showPanel=true;
		  	$scope.showPanel =sc.showPanel;
		  	$scope.disableNearMe = sc.disableNearMe;
		  };
		  sc.showDelivery = function(){
		  	 sc.shDelivery = !sc.shDelivery;
		  	 sc.isButtonEnable=false;
		  	 sc.form.radVal ='package';
		  	 if(sc.validDates==='none'){
		  	 	sc.showvalidDates=false;
		  	 }
		  };

		Date.prototype.addDays = function(days) {
	    	this.setDate(this.getDate() + parseInt(days));
	    	return this;
		};
		var daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
		  sc.datesDefined = function(){
		  	sc.datesDecided=[];
		  	for(var i=1;i<4;i++){
		  		var obj={};
		  		var date = new Date(sc.formObj.dateTo);
		  		var sdate= date.addDays(i);
		  		var newDate = (daysInWeek[sdate.getDay()]+', '+('0'+(sdate.getMonth()+1)).slice(-2)+'/'+('0'+sdate.getDate()).slice(-2)+'/'+sdate.getFullYear());
		  		obj.date = newDate;
		  		sc.datesDecided.push(obj);
		  	}
		  	if(!sc.isChangeDelievery){
		  			sc.formObj.datesDecide =sc.datesDecided[0];
		  		}else{
		  			sc.formObj.datesDecide= sc.datesDecided[$scope.dateindex];
		  		}
		  };
		  sc.$watch('formObj.dateTo',function(newval,oldval){
		  	if(newval){
		       if(sc.formObj.dateFrom  >= newval){
		       	sc.notvalidDate = true;
		       }else{
		       	sc.notvalidDate = false;
		       if(newval!==oldval){
		       	 sc.datesDefined();
		       }
		       }
		   }
		  });
		   sc.$watch('formObj.dateFrom',function(){
		       if(sc.formObj.dateFrom  >= sc.formObj.dateTo){
		       	sc.notvalidDate = true;
		       }else{
		       	sc.notvalidDate = false;
		       }
		  });
		  sc.SavePickup = function(){
		  	$scope.upsPickup = true;
		  		var fromDate,toDate;
		  	if($scope.isAdd){
			  	$scope.formArray.push(sc.formObj);
			  	fromDate = new Date(sc.formObj.dateFrom);
			  	toDate = new Date(sc.formObj.dateTo);
			  }else{
			  	sc.shDelivery = true;
			  	fromDate = new Date($scope.formObj.dateFrom);
			  	toDate = new Date($scope.formObj.dateTo);
			  }
			  	sc.datesDefined();
			  	$scope.isEditVacation=true;
			  	$rootScope.isvacation = true;
			  	sc.formObj.strdateFrom = ('0'+(fromDate.getMonth()+1)).slice(-2)+'/'+('0'+fromDate.getDate()).slice(-2)+'/'+fromDate.getFullYear();
			  	sc.formObj.strdateTo = ('0'+(toDate.getMonth()+1)).slice(-2)+'/'+('0'+toDate.getDate()).slice(-2)+'/'+toDate.getFullYear();
			  	sc.formObj.deliveryDate =sc.formObj.datesDecide.date.split(',')[1];
			  	$scope.formObj.strdateFrom = sc.formObj.strdateFrom ;
			  	$scope.formObj.strdateTo = sc.formObj.strdateTo;
			  	$scope.formObj.deliveryDate = sc.formObj.deliveryDate ;
			  	$scope.formObj = sc.formObj;
			  	$scope.datesDecided = sc.datesDecided;
			  	$scope.selectedMethod= sc.formObj.methods;
			  	$scope.ModalService.dismiss();
			  	$scope.decidePickUp = $scope.upsPickup;
		  };
		  sc.Save =function(){
		  	var fromDate,toDate;
		  	if($scope.isAdd){
			  	$scope.formArray.push(sc.formObj);
			  	fromDate = new Date(sc.formObj.dateFrom);
			  	toDate = new Date(sc.formObj.dateTo);
			  }else{
			  	sc.shDelivery = true;
			  	fromDate = new Date($scope.formObj.dateFrom);
			  	toDate = new Date($scope.formObj.dateTo);
			  }

			  	sc.datesDefined();
			  	$scope.isEditVacation=true;
			  	$rootScope.isvacation = true;
			  	sc.formObj.strdateFrom = ('0'+(fromDate.getMonth()+1)).slice(-2)+'/'+('0'+fromDate.getDate()).slice(-2)+'/'+fromDate.getFullYear();
			  	sc.formObj.strdateTo = ('0'+(toDate.getMonth()+1)).slice(-2)+'/'+('0'+toDate.getDate()).slice(-2)+'/'+toDate.getFullYear();
			  	sc.formObj.deliveryDate =sc.formObj.datesDecide.date.split(',')[1];
			  	$scope.formObj.strdateFrom = sc.formObj.strdateFrom ;
			  	$scope.formObj.strdateTo = sc.formObj.strdateTo;
			  	$scope.formObj.deliveryDate = sc.formObj.deliveryDate ;
			  	$scope.formObj = sc.formObj;
			  	$scope.datesDecided = sc.datesDecided;
			  	$scope.selectedMethod= sc.formObj.methods;
			  	$scope.decidePickUp = $scope.upsPickup;
			  	$scope.ModalService.dismiss();

		  };
		  sc.changedelDates = function(data){
		  	sc.isChangeDelievery = true;
		  	//checking index of dates and assigning it to scope of date index.
        	sc.datesDecided.filter(function(obj,index){if(obj.date===data.date){$scope.dateindex = index;}});
		  };

		}
	    $scope.removeVacation = function(){
	  		var modal = {
		        title: 'Are you sure?',
		        content: '/app_assets/templates/ups.ppc-removeVacationDialog.html',
		        data: 'vacation',
				component: 'ppc'
			};
	  	ModalService.open(modal,
			function(sc) {
		             	sc.okText = 'Yes';
		            	sc.cancelText = 'No';
		            	sc.upsPickup = $scope.upsPickup;
					   	sc.deleteVac = function(){
					    	$scope.formArray.pop();
					    	$scope.shDelivery = false;
					    	$scope.isEditVacation=false;
					    	$rootScope.isvacation=false;
					    	$scope.upsPickup = false;
					    	ModalService.dismiss();
				     	};
			});


		};

		$scope.addVacationPage = function(str){
			var modal;
			$scope.vacMode = str;
			if(str==='add'){
				modal ={
					title: 'Add Vacation',
		 		    content: '/app_assets/templates/ups.ppc-add-vacation.html',
					component: 'ppc'
				};
				$scope.isAdd= true;
			}else{
				modal ={
					title: 'Edit Vacation',
		 		    content: '/app_assets/templates/ups.ppc-add-vacation.html',
					component: 'ppc'
				};
				$scope.isAdd= false;

			}
			ModalService.open(modal,
			function(sc) {
				sc.shDelivery = false;
				sc.allowDelivery = true;
				sc.allowPickup = true;
				loadModal(sc);
				sc.cancel = function(){
				  ModalService.dismiss();
				};
			});

		};


	}]);

/**
 * @controller
 * @name upsDOApp.controllers.controller : myChoiceSetAltDelievryCtrl
 * @description Edit ADL Flow
 * @template ups.ppc-set-vacation.html
 */
	PrefrenceModule.controller('myChoiceSetAltDelievryCtrl',['$scope','$location','UtilService','$rootScope','ModalService','localStorageService','paymentService','$filter',function($scope,$location,UtilService,$rootScope,ModalService,localStorageService,paymentService,$filter){
	  $scope.isMyChoice =localStorageService.get('active_user_info').user_type.mychoice;
	  $rootScope.$watch('isvacation',function(newval){
	 		$scope.isvacation=newval;
	 	});
	  $scope.isEditAdl = $rootScope.isEditAdl;



	  	/****User Info - non premium, country USA and transport charge applied*******/
	  	$scope.active_user_info={
	      nonPremium:true,
	      us:true,
	      transportCharge:true
	    };

	 	$scope.openTermsAndConditions=function(url){
	     UtilService.openTearmsAndConditions(url);
		};
		$scope.setLocation = function(){
			$location.path('/preferencePage/mychoice/editADL');
		};

		$scope.clearLocation = function () {
			$scope.isEditAdl = $rootScope.isEditAdl = false;
			$scope.cancel();
		};

		$scope.showMap = function(){
			$scope.isshowMap = !$scope.isshowMap;
		};

		/**
		* @function
		* @name init
		* @description Used to initialize the variables
		*/

		function init(){
			$scope.isEditAdl = $rootScope.isEditAdl;
			$scope.saveLoc=[];
			$scope.formObj={};
			$scope.formObj.location={};
			$scope.formObj.deliveryOpt='0';
			$scope.apShow=false;
			$scope.dpShow=false;
			$scope.paymentRequired=false;
			$scope.selectPrimaryLoc=false;
			$scope.selectSecLoc=false;

			$scope.inlineMap = true;
			$scope.formObj.upsLocation1 = '0';

			if($rootScope.formObj){
				$scope.formObj.location= $rootScope.formObj;
			}
			if($rootScope.altformObj){
				$scope.altformObj.location= $rootScope.altformObj;
			}

			if(paymentService.savedMethods.length===0){
				$scope.accountMethod=[{'displayAccount':'Enter A Different Payment Card'},
				{'displayAccount':'Enter A Different Account'}];
				$scope.formObj.paymentMethod=$scope.accountMethod[0];
			}else{
				var data =paymentService.savedMethods;
				var obj=[];
				angular.extend(obj,data);
				obj.push({'displayAccount':'Enter A Different Payment Card'});
				obj.push({'displayAccount':'Enter A Different Account'});
				$scope.accountMethod = obj;
				$scope.formObj.paymentMethod=$scope.accountMethod[0];
				$scope.defaultVal = $filter('filter')(paymentService.savedMethods, { makeDefault: true });
				if($scope.defaultVal!==0){
					$scope.formObj.paymentMethod=$scope.defaultVal[0];
				}
			}
		}
		init();


		/**
		* @function
		* @name eligibleShip
		* @description Link for Eligible Shipment
		*/
		$scope.eligibleShip=function(){
			UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/tracking/tracking/eligible_shipments.html');
		};

		/** Array stores Delivery Options content**/
		$scope.deliveryOptions=[
			{
				'text' : 'Skip home delivery and send all my packages directly to my preferred UPS Access Point location.'
			},
			{
				'text' : 'Only send packages to my preferred UPS Access Point location if no one\'s home on the first delivery attempt.'
			},
			{
				'text' : 'Make up to three attempts to deliver my packages.'
			}
		];

		/**
		* @function
		* @name cancel
		* @description Cancels the updated value and redirects to preference page
		*/
		$scope.cancel=function(){
			$scope.formObj={};
			 $rootScope.formObj={};
			 $rootScope.isEditAdl=false;
			 $rootScope.altformObj={};
			this.ups_editADL.$setPristine();
			init();
			$location.path('/preferencePage/mychoicePreference');
		};

		/**
		* @function
		* @name saveChanges
		* @description Saves the updated value and redirects to preference page
		*/
		$scope.saveChanges=function(){
			if($scope.formObj.deliveryOpt === '0' && $scope.dpShow===false){
				$scope.selectPrimaryLoc=false;
				$scope.selectSecLoc=true;

			}
			else if($scope.formObj.deliveryOpt === '1' && (($scope.dpShow===false && $scope.apShow===false)|| ($scope.dpShow===true && $scope.apShow===false))){
				$scope.selectSecLoc=true;
				$scope.selectPrimaryLoc=false;
			}
			/* else if( angular.equals($scope.saveLoc[0], $scope.saveLoc[1])===true){
				$scope.sameAdd = angular.equals($scope.saveLoc[0], $scope.saveLoc[1]);
				console.log('test');
			} */
			else{
				$scope.selectPrimaryLoc=false;
				$scope.selectSecLoc=false;
				$scope.dpShow=false;
				$rootScope.isEditAdl = true;
				$location.path('/preferencePage/mychoicePreference');
			}

		};

		$scope.saveLocation=function() {

			if($scope.dpShow === true){
				$scope.apShow = true;

				$scope.altformObj = {
					'location': {
						address1: 'The UPS Store',
						address2: '4321 Hill Street',
						address3: 'Suite A',
						state: 'Roswell, GA',
						county: 'US',
						pincode: '30076',
						tel: '555-123-4567',
						email: 'store1422@theupstore.com'
					}
				};

			}

			else {
					$scope.dpShow=true;
			  	$scope.inlineMapSection=false;

				$scope.formObj.location = {
						address1: 'The UPS Store',
						address2: '2300 Holcomb Bridge Rd',
						address3: 'Ste 103',
						state: 'Roswell, GA',
						county: 'US',
						pincode: '30076',
						tel: '678-352-7934',
						email: 'store2300@theupstore.com'
					};

				$rootScope.formObj = $scope.formObj.location;
				}

		};


		/**
		* @function
		* @name selectLoc
		* @description Select location from JSON value for Map based on condition
		*/
		function selectLoc(obj,type){
			if(type==='do'){
				$scope.formObj.location = obj;
				$rootScope.formObj= obj;
				$scope.saveLoc[0]=($scope.formObj.location);

			}
			else{
				$scope.altformObj={};
				$scope.altformObj.location=obj;
				$rootScope.altformObj =obj;
				$scope.saveLoc[1]=($scope.altformObj.location);

			}
		}

		/**
		* @function
		* @name verifyNowUps
		* @description verify
		*/
		$scope.verifyNowUps = function(){
			$location.path('/preferencePage/mychoice/authenticate');
		};

		/**
		* @function
		* @name chooseLocation
		* @description choose location from stored json value
		*/
		$scope.chooseLocation = function(type){
			$scope.ModalService=ModalService;
			var modalInstance = ModalService.open({
				content : '/app_assets/templates/ups.ppc-chooseLocation.html',
				title:'Select a UPS Access Point Location',
				component: 'ppc'
			},
			function(sc) {
				sc.form = {};
				sc.locationVal = [
				{
					id: 1,
					name: 'Location 1',
					val:{
						address1: 'The UPS Store',
						address2: '4321 Hill Street',
						address3: 'Suite A',
						state: 'Roswell, GA',
						county: 'US',
						pincode: '30076',
						tel: '555-123-4567',
						email: 'store1422@theupstore.com'
					}
				},
				{
					id: 2,
					name: 'Location 2',
					val:{
						address1: 'The UPS Store',
						address2: '4221 Hill Street',
						address3: 'Suite B',
						state: 'Roswell, GA',
						county: 'US',
						pincode: '30076',
						tel: '555-123-4567',
						email: 'store1422@theupstore.com'
					}
				}];
				sc.cancel=function(){
					ModalService.dismiss();
				};

				sc.saveLocation=function(){
					$scope.saveLocation();
					ModalService.dismiss();
				};

			});
			modalInstance.result.then(function(loc) {
				loc=JSON.parse(loc);
				if(type==='do'){
					$scope.dpShow=true;
				}
				else{
					$scope.apShow=true;
					$scope.selectSecLoc=false;
				}
				selectLoc(loc,type);
			}, function() {
			// Cancel
			});
		};

		$scope.clearADL = function() {
			$scope.dpShow = false;
			$scope.apShow = false;
			$scope.hideInlineMapBtn = false;
		};

		$scope.cancelPreferredLocation = function() {
			$scope.dpShow = false;
			$scope.apShow = false;
			$scope.hideInlineMapBtn = false;
			$scope.inlineMapSection = false;
		};

	}]);

/**
 * @controller
 * @name upsDOApp.controllers.controller : prefServiceTermsDialogCtrl
 * @description Service Terms Dialog Controller. This controller contains the Service Terms Dialog
 * @template ups.ppc-serviceTerms.html
 */
	PrefrenceModule.controller('prefServiceTermsDialogCtrl',['$scope','UtilService','ModalService','$rootScope',function($scope,UtilService,ModalService,$rootScope){
		$scope.ModalService = ModalService;
		$scope.toggleModal = function(type){

            ModalService.open({
	        title: 'Please review the UPS My Choice Service Terms',
	        content: '/app_assets/templates/ups.serviceTerms-Modal.html',
	        component : 'ppc'

	    },function(sc){
	   sc.data = [ {
		            	title: 'Vacation Dates',
		            	value: '07/10/2016 - 09/10/2016'
		            }, {
		            	title: 'Vacation Settings',
		            	value: 'Reschedule delivery for 07/10/2016'
		            } ];
		 sc.okText = 'Yes';
		 sc.cancelText = 'No';
		   sc.helpLink = function(){
		            	UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/resources/ship/terms/service_mychoice.html');
		            };
		            if(type === 'normal'){
		    			sc.isType = type;
		    		}else{
		    			sc.isType = type;
		    		}
		            $rootScope.isType = sc.isType;
			 });

		};
	}]);


	/**
	 * @controller
	 * @name upsDOApp.controllers.controller : autoRenewValidationCtrl
	 * @description Auto Renew validation Controller. This controller contains the Auto Renew validation
	 * @template ups.ppc-autoRenewvalidation.html
	 */
		PrefrenceModule.controller('autoRenewValidationCtrl',['$scope','UtilService','ModalService','$rootScope',function($scope,UtilService,ModalService,$rootScope){
			$scope.ModalService = ModalService;
			$rootScope.typeOfUser = '';
			var expDate = new Date('2016-12-31');
			var dd = expDate.getDate();
			var mm = expDate.getMonth() + 1;
			var y = expDate.getFullYear();
			$scope.expirationDate = mm+'/'+dd+'/'+y;

			var numberOfDaysToAdd = 7;
			var advDate = expDate;
			advDate.setDate(expDate.getDate() + numberOfDaysToAdd);
			var advDD = expDate.getDate();
			var advMM = expDate.getMonth() + 1;
			var advY = expDate.getFullYear();
			$scope.advancedDate = advMM+'/'+advDD+'/'+advY;


			$scope.toggleModal = function(type){
				$rootScope.typeOfUser = type;
	            ModalService.open({
	            	title: 'Choose your address.',
					content: '/app_assets/templates/ups.ppc-chooseaddressModal.html'
		    },function(sc){
			    sc.okText = 'Yes';
				sc.cancelText = 'No';
			});

		};
	}]);


    /**
	 * @controller
	 * @name upsDOApp.controllers.controller : autoRenewValidationCtrl
	 * @description Auto Renew validation Controller. This controller contains the Auto Renew validation
	 * @template ups.ppc-autoRenewvalidation.html
	 */
    PrefrenceModule.controller('prefSaveChangesCtrl', ['$scope', 'ModalService', function(scope, modalService) {
        scope.saveChanges = function () {
            modalService.open({
	            title: 'Your changes have been saved.',
				content: '/app_assets/templates/ups.ppc-changessaveModal.html'
		    }, function(sc){
                sc.closeDialog = function () {
                    modalService.dismiss();
                };
			});
        };
    }]);
