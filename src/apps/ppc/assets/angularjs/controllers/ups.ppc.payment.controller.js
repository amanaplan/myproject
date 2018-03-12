'use strict';

/**
* @module
* @name upsDOApp.controllers
* @description Initialize the module and store in the variable 'Controller'
*/
	angular.module('upsDOApp.controllers')

/**
* @controller
* @name upsDOApp.controllers.controller : paymentCtrl
* @description Payment flow
* @template ups.ppc-payment.html, ups.ppc-editCard.html, ups.doa-choosePaymentModal.html, ups.ppc-add-paypal.html, ups.ppc-edit-paypal.html and ups.ppc-payment-card.html
*/
	.controller('paymentCtrl',['$scope','$http','$window','$location','$rootScope','UtilService','NotificationService','paymentService','$filter','DashboardService','ModalService','MockJSONCalls','localStorageService',function($scope,$http,$window,$location,$rootScope,UtilService,NotificationService,paymentService,$filter,DashboardService,ModalService,MockJSONCalls,localStorageService){
	    $scope.ModalService = ModalService;
		$scope.form={};
	    $scope.obj={};
	    $scope.ModalService = ModalService;
	    $scope.tabContentId = $rootScope.tabContentId;



	    var metaData = DashboardService.getMetaData();
	 	if(metaData.countries){
	    	$scope.countryList = metaData.countries;
	        $scope.form.country='US';
	        $scope.statesList = metaData.states;
	        $scope.Months = metaData.Months;
	        $scope.Year = metaData.Year;
	 	}else{
			MockJSONCalls.getJson({urlString: 'ups.doa-metaData.json'})
	        // then() called when response gets back
	        .then(function(data) {
	            // promise fulfilled TODO set metadata
	        	DashboardService.setMetaData(data);
	        	$scope.countryList = data.countries;
	            $scope.form.country='US';
	            $scope.statesList = data.states;
	            $scope.Months = data.Months;
	            $scope.Year = data.Year;
	        }, function() {
	            // promise rejected
	        });
	 	}
	    $scope.ok =function(){
	    	ModalService.dismiss();
	    };
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

	    $scope.paymentType=[
	        {'name':'Add New Account','limit':2},
	        {'name':'Add Existing Account','limit':2},
	        {'name':'Add Payment Card','limit':3},
	        {'name':'Add PayPal'}
	    ];


	    $scope.userResponse = [{'type':'Yes','isSelected':'false'},
	            {'type':'No','isSelected':'true'}];

	    $scope.togglePrescriptionResponse = function(index){
	    if (index === 0) {
	      $scope.isPresSelected = true;
	    }else{
	      $scope.isPresSelected = false;
	    }
	  };


	function callPPCflow(sc){

			sc.$on('changePage', function(ev, obj){
				if(obj){
					sc.design = obj;
				}
			});
			//init
			sc.formObj = {};
			sc.isUS = true;
			sc.isPresSelected = false;
			sc.formObj.ShipProd2 = false;
			sc.formObj.ShipProd3 = false;
			var country = 'US';

			sc.shipmentProducts = ['Alcoholic beverages or tobacco products','Hazardous materials [?]','Lithium batteries'];

			sc.userResponse = [{'type':'Yes','isSelected':'false'},
								{'type':'No','isSelected':'true'}];

			var resetFormFields = function(){
				sc.formObj.ShipProd1 = false;
				sc.formObj.ShipProd2 = false;
				sc.formObj.ShipProd3 = false;
			};
			resetFormFields();

			if(country === 'US'){
				sc.accountUsage=[{'type':'Personal','isSelected':'true','isDisabled': 'false'},{'type':'Business','isSelected':'false','isDisabled': 'true'}];
				sc.isUS = true;
			} else{
				sc.accountUsage=[{'type':'Personal','isSelected':'false','isDisabled': 'true'},{'type':'Business','isSelected':'true','isDisabled': 'false'}];
				sc.isUS = false;
			}

			$rootScope.lastTitle='Set your payment account options.';
			$rootScope.lastUrl = '/app_assets/templates/ups.doa-accountOptionsModal.html';


			sc.backUpload = function(){
				if($rootScope.fromPaymentPage === true){
					 ModalService.next({
	    				title: 'Confirmation',
						content: '/app_assets/templates/ups.doa-hazmatConfirmationModal.html'
					});
	    	  	}else{
	    	  		 ModalService.next({
		    				title: $rootScope.lastTitle,
							content: $rootScope.lastUrl
						});
		    	}
		      };

		      sc.openpopup = function(flag){
		  		switch(flag){
		  			case 'hazardous':
		  			UtilService.openTearmsAndConditions('https://www.ups.com/content/en/us/resources/ship/hazardous/index.html');
		  			break;

		  			case 'idg':
		  			UtilService.openTearmsAndConditions('https://www.ups.com/content/en/us/resources/ship/idg/index.html');
		  			break;

		  			case 'tariff':
		  			UtilService.openTearmsAndConditions('http://www.ups.com/tariff');
		  			break;

		  			case 'hazardousHelp':
		  			UtilService.openTearmsAndConditions(' https://www.ups.com/cc/ll/help-center/packaging-and-supplies/special-care-shipments/hazardous-materials.html');
		  			break;

		  			case 'dest':
		  			UtilService.openTearmsAndConditions('https://www.ups.com/content/us/en/resources/ship/idg/information/acl.html');
		  			break;

		  			case 'compliant':
		  			UtilService.openTearmsAndConditions('https://www.ups.com/content/us/en/shipping/account/account/compliant_shipping.html');
		  			break;

		  			case 'tariff_NONUS':
		  			UtilService.openTearmsAndConditions('https://www.ups.com/content/us/en/service.html');
		  			break;
		  		}

		  	};

		  	sc.togglePrescriptionResponse = function(index){
		  		if (index === 0) {
		  			sc.isPresSelected = true;
		  		}else{
		  			sc.isPresSelected = false;
		  		}
		  	};

		  	sc.nextStep = function(){
		  		if(sc.formObj.ShipProd2 === true || sc.formObj.ShipProd3 === true){

		  			if(sc.formObj.ShipProd1 === true){

			      		ModalService.next({
		    				title: 'Please call us to finish opening your payment account.',
							content: '/app_assets/templates/ups.doa-specialShippingNeedsAlcoholModal.html'
						});
			  			$rootScope.lastTitle='Please call us to finish opening your payment account.';
			  			$rootScope.lastUrl = '/app_assets/templates/ups.doa-specialShippingNeedsAlcoholModal.html';
			      	}else{
			  			if(sc.formObj.ShipProd2 === true){
					        $rootScope.SpecialHazardous =true;
					      }
					      if(sc.formObj.ShipProd3 === true){
					        $rootScope.SpecialLithium =true;
					      }

		    	  		 ModalService.next({
			    				title: 'Review our requirements for shipping dangerous goods.',
								content: '/app_assets/templates/ups.doa-specialShippingNeedsModal.html'
							});
			  			$rootScope.lastTitle='Review our requirements for shipping dangerous goods.';
			  			$rootScope.lastUrl = '/app_assets/templates/ups.doa-specialShippingNeedsModal.html';
			  			$rootScope.isHazmat = sc.formObj.ShipProd2;
			  		}
		  		}
		      	else if(sc.formObj.ShipProd1 === true){
		      		ModalService.next({
	    				title: 'Please call us to finish opening your payment account.',
						content: '/app_assets/templates/ups.doa-specialShippingNeedsAlcoholModal.html'
					});
		  			$rootScope.lastTitle='Please call us to finish opening your payment account.';
		  			$rootScope.lastUrl = '/app_assets/templates/ups.doa-specialShippingNeedsAlcoholModal.html';

		      	}
		      	else{
		      		ModalService.next({
	    				title: 'Upload your required documents.',
						content: '/app_assets/templates/ups.doa-uploadRequiredDocs.html',
			              data: 'Add Documents'
					});
		          $rootScope.lastTitle='Set your payment account options.';
		  		$rootScope.lastUrl = '/app_assets/templates/ups.doa-accountOptionsModal.html';
		      	}
		  	};

		  	sc.nextShippingStep = function(){
		  		if(sc.formObj.shipNeed3 !== true || sc.formObj.shipNeed4 !== true ||
		  		   sc.formObj.shipNeed5 !== true || sc.formObj.shipNeed6 !== true ||
		  		   sc.formObj.shipNeed8 !== true){

		      		ModalService.next({
	    				title: 'Confirmation',
						content: '/app_assets/templates/ups.doa-hazmatConfirmationModal.html'
					});
		  		}
		      	else{
		      		ModalService.next({
	      				title: 'Upload your required documents.',
						content: '/app_assets/templates/ups.doa-uploadRequiredDocs.html',
						data: 'Add Documents'
					});
		      	}

		  	};

		  	sc.moveToAPAC = function(){

	      		ModalService.next({
					title: 'Upload your required documents.',
					content: '/app_assets/templates/ups.doa-uploadRequiredDocs.html',
					data: 'Add Documents'
				});

		        $rootScope.lastUrl = '/app_assets/templates/ups.doa-hazmatConfirmationModal.html';
		  	};

		  	sc.backToPrev = function(flag){
		  		switch(flag){
		  			case 'AO':
		  				ModalService.back({
							title: 'Set your payment account options.',
							content: '/app_assets/templates/ups.doa-accountOptionsModal.html'
						});
		  			break;
		  			case 'SN':
		  				ModalService.next({
							title: 'Review our requirements for shipping dangerous goods.',
							content: '/app_assets/templates/ups.doa-specialShippingNeedsModal.html'
						});
		  			break;
		  		}
		  	};


	}
	function makeOtherNonDefault(){
	    var data = paymentService.savedMethods;
	    angular.forEach(data, function(value, key) {
	       data[key].Default='Make Default Method';
	       data[key].makeDefault=false;
	    });
	}
	function calladdexisPPCflow(sc){
		sc.showAuthenticateModal = false;
		sc.showAIAModal = false;
		sc.displayCID = true;
		sc.parentFormObj=[];
		sc.formObj = {};
		sc.accountType=[{'type':'Documents and Shipping','isSelected':'true'},
							{'type':'Air Freight','isSelected':'false'}];
		$rootScope.isUPS = true;
		sc.valueEntered = false;
		$rootScope.radioIndex = 0;

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
	    //sc.formObj.pcode = '1';
	  };

	  var initializeAuthenticatevalues = function(Val){
			$rootScope.authenticateFormObj = {};
			if(Val !== undefined){
				$rootScope.authenticateFormObj.countryName = Val.countryName;
				$rootScope.authenticateFormObj.acc_num = Val.acc_number;
				$rootScope.authenticateFormObj.accName = Val.acc_name;
				if(($rootScope.isUPS === true) && (Val.country === 'us' || Val.country === 'ca' || Val.country === 'pr' || Val.country === 'vi')){
					$rootScope.displayCID = true;
					sc.displayCID = $rootScope.displayCID;
				}else{
					$rootScope.displayCID = false;
					sc.displayCID = $rootScope.displayCID;
				}
			}
		};
		sc.openAuthenticateModal = function(){
			ModalService.next({
				title: 'Authenticate This Account',
				content: '/app_assets/templates/ups.ppc-authenticateModal.html',
				data: sc.formObj
			});
			initializeAuthenticatevalues(sc.formObj);
			$rootScope.formObj = {};
			$rootScope.formObj.tnc = sc.formObj.tnc;
		};

		// Date Picker
		// Steps - Signup - address - availability - confirmation

		sc.countryList = metaData.countries;
		sc.formObj.country = sc.countryList[0].code;

		sc.openChargesBox = function(){
			UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/myups/billing/authentication_indcharges.html');
		};

		sc.openCVVBox = function(){
			UtilService.openTearmsAndConditions('https://www.ups.com/cc/ll/cvv.html');
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
	    	sc.formObj.pcode = '';

	    	if(index===0){
	    		sc.isUPS = true;
	    		$rootScope.isUPS = true;
	    		sc.formObj.country = sc.countryList[0].code;
	    	}
	    	else{
				sc.isUPS = false;
				$rootScope.isUPS = false;
			}
	    	$rootScope.radioIndex = index;
		};

		sc.saveExisting = function(){
	        ModalService.dismiss();
		    var option=$scope.authenticateFormObj;
	      	option.payementNickName= option.accName;
      		option.displayAccount = option.payementNickName;
	      	option.Number= option.acc_num;
	      	option.Method='Account';
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
	            $scope.payementData.paymentMethods=paymentService.savedMethods.sortBy('Default');
	        }
		};

		sc.backtoAIA = function(){
			ModalService.back();
			if($rootScope.radioIndex===0){
				sc.accountType=[{'type':'Documents and Shipping','isSelected':'true'},
								{'type':'Air Freight','isSelected':'false'}];
				}else{
					sc.accountType=[{'type':'Documents and Shipping','isSelected':'false'},
									{'type':'Air Freight','isSelected':'true'}];
				}
		};
	}

	function openPPCmodals(){
		ModalService.open({
	        title: 'Choose your address.',
	        content: '/app_assets/templates/ups.ppc-chooseaddressModal.html',
			component: 'ppc'

	    },function(sc){
	    callPPCflow(sc);
	 });

	}

	function openAddExistingPPCmodals(){
		ModalService.open({
	        title: 'Add an Existing Account to your profile.',
	        content: '/app_assets/templates/ups.ppc-addorauthenticateaccountModal.html',
			component: 'ppc'
	    },function(sc){ calladdexisPPCflow(sc);});
	   $scope.formObj.country = $scope.countryList[0].code;
	}

	$rootScope.$on('addAccount',function(){
		openPPCmodals();
	});

	$scope.payments = {
		add: function(name){
			$rootScope.index=undefined;
		    if(name==='Add Payment Card'){
				$rootScope.isAddCard = true;
		    	$location.path('/paymentPage/AddPaymentCard');
			}else if(name==='Add PayPal'){
				$rootScope.paypalAdd = true;
				$location.path('/paymentPage/AddPayPal');
			}else if(name==='Add New Account'){
				openPPCmodals();
				$rootScope.parentPage = 'chooseAddress';
			}else if(name==='Add Existing Account'){
				openAddExistingPPCmodals();
			}
			$scope.sortWithoutDefault('payementNickName',true);
		},
		edit: function(index,methodType ,data){
		    $rootScope.index =index;
		    $rootScope.editItem =data;
			//console.log(paymentService.savedMethods);
		    if(methodType==='PayPal'){
		    	$rootScope.isEdit='edit';
				$rootScope.paypalAdd = false;
				$location.path('/paymentPage/EditPayPal');
			}else if(methodType === 'Account'){

				$location.path('/paymentPage/EditCardAccount');
				//if ($rootScope.index) {
					$rootScope.payementNickName = paymentService.savedMethods[index].payementNickName;
					//$scope.payementNickName = paymentService.savedMethods[$rootScope.index].payementNickName;
			  	//}
			} else{
				$rootScope.isAddCard = false;
				$location.path('/paymentPage/EditPaymentCard');
			}
		},
		remove: function(){}
	};
	$scope.setUS = true;
	var formData;
	if($rootScope.index !== undefined){
		formData= paymentService.savedMethods[$rootScope.index];
		angular.extend($scope.form,formData);
	}
	 if($rootScope.cardId){
	  formData = $filter('filter')(paymentService.savedMethods, { _id: $rootScope.cardId });
	  angular.extend($scope.form,formData[0]);
	  $rootScope.cardId=false;
	 }
	 if($rootScope.lastPage==='choosePayment'){
		$scope.ischoosePayment=true;
	 }
	 $scope.form.SameAddr=true;
	 if(formData){
		 if(formData.addressStatus==='diffAdd'){
			$scope.form.SameAddr=false;
			$scope.form.diffAddr=true;
			$scope.diffAddress=true;
		 }
		 if(formData.country!=='US'){
			$scope.setUS = false;
		 }
	 }
	 $scope.showModal = false;
	 $scope.title = 'Card Payment';
	 $scope.showModal=false;

	$scope.cancel = function(){
		if($rootScope.lastPage==='preferencePage'){
		  $rootScope.cardId=undefined;
		  $rootScope.lastPage='';
		  $rootScope.isActive=5;
		  $location.path('/preferencePage/ShippingPreference');
		  return;
		}
		$location.path('/paymentPage');
	};

   var modal={};
	$scope.callDeletePopUp=function(index,promo){

		$scope.indexVal = index;
		$scope.promo = promo;
		if(promo ==='promotion'){
			modal = {
			title: 'Delete This Discount?',
			content: '/app_assets/templates/ups.ppc-delete-promotion.html',
			data: 'DeleteModal'
		};
		s}else{
			modal = {
			  title: 'Delete This Payment Method(s)?',
			  content: '/app_assets/templates/ups.ppc-modalDelete.html',
			  component: 'ppc'
		  };

		}
		 var modalInstance = ModalService.open(modal,function(sc) {
		  var data = $scope.payementData.paymentMethods;
		  sc.shippingAccount=data[$scope.indexVal].payementNickName;
		  sc.youSure = 'Are you sure you want to delete the following payment method?';

		  /* 7601 v1.08 */
		  sc.accountType = data[$scope.indexVal].accountType;
		  sc.paymentMethod = data[$scope.indexVal].Method;
		  if (data[$scope.indexVal].cardNumber) {
			var cardNumber = data[$scope.indexVal].cardNumber;
			sc.cardLastFour = cardNumber.substr(cardNumber.length - 4);
		  }
		  /* End Edit */

		  sc.shiping=true;
		 });
		   modalInstance.result.then(function() {
			$scope.deleteData();

		   }, function() {
			  // Cancel
		  });
	};

	/**
	* @function
	* @name openNicknameDlg
	* @description open the Edit Nickname Dialog
	*/
	$scope.openNicknameDlg = function(index){
		console.log($scope.payementData.paymentMethods[index].payementNickName);

		ModalService.open({
			title: 'Enter a nickname for this payment method.',
			content: '/app_assets/templates/ups.ppc-payment-edit-nickname.html',
			component: 'ppc'
		}, function(sc){
			sc.name = $scope.payementData.paymentMethods[index].payementNickName;
		});
	};

    /**
    * @function
    * @name openReactivateCodeDialog
    * @description opens Request Reactivation Code Modal;
    * You can access the dialog on uidev.ups.com/ppcProfile.html#/paymentPage > click Reactivate button
    */
    $scope.openReactivateCodeDialog = function(){
        ModalService.open({
             title: 'Request Reactivation Code/PIN',
             content: '/app_assets/templates/ups.ppc-request-reactivation-code.html',
             component: 'ppc'},
             function(sc){
                sc.requestReactivationCodeModalForm = {
                    sendByRadio : ''
                };
                //sc.ups_enterReactivationCodeModalForm;
                sc.ups_enterCode = {
                    'upsEnterReactivation_Input':''
                };
                sc.cancel = function() {
                    ModalService.dismiss();
                };
                sc.nextStep = function(valid) {
                    sc.clicked = true;
                    if(valid) {
                        sc.clicked = false;
                        ModalService.next({
                            title: 'Enter Reactivation Code/PIN',
                            content: '/app_assets/templates/ups.ppc-enter-reactivation-code.html',
                            component: 'ppc'
                        });
                    }
                };
                sc.checkFormErrors = function() {
                    if (sc.requestReactivationCodeModalForm.sendByRadio == '') {
                        return true;
                    }
                };
                sc.backBtn = function() {
                    ModalService.back();
                };
                sc.submitBtn = function(valid) {
                    sc.clicked = true;
                    if(valid) {
                        ModalService.dismiss();
                    }
                };
                sc.checkFormErrorsTwo = function() {
                    if (sc.ups_enterCode.upsEnterReactivation_Input == '') {
                        return true;
                    }
                }
                sc.sendByRadioButton = [{'id': '1','label':'Email'},
									{'id': '2','label':'SMS (to mobile phone only)'},
                                    {'id': '3','label':'Voice Notification'},
                                    {'id': '4','label':'I already have a PIN code'}];
         });
    };

		/**
		* @function
		* @name saveNickname
		* @description save edited nickname from "Edit Nickname Dialog"
		*/
		$scope.saveNickname = function(){
			ModalService.open({
				 title: 'Make this your default payment method.',
				 content: '/app_assets/templates/ups.ppc-defaultPaymentAirFreightModal.html',
				 component: 'ppc'
			 },function(sc){
					sc.cancel = function() {
						ModalService.dismiss();
					};
			 });
		};

	    $scope.changeCard= function(src){
	        if(src){
	          $scope.invalidCard=false;
	        }
	    };
	    $scope.changeVerCode = function(src){
	         if(src){
	          $scope.invalidCode=false;
	        }
	    };
	    $scope.deleteData =function(){
	         if($scope.promo==='promotion'){
	            var src = $scope.payementData.promotionMethods;
	            src.splice($scope.indexVal, 1);
	        }else{
	            var data = $scope.payementData.paymentMethods;
	            data.splice($scope.indexVal, 1);
	        }
	        paymentService.setData($scope.payementData.paymentMethods);
	        $scope.payementData.paymentMethods=paymentService.getData();
	    };
	    $scope.changeDefault = function(data,index){
	       // console.log(data);

	      $scope.payementData.paymentMethods = data.sortBy('Default');
	      $scope.sortWithoutDefault('payementNickName',true);

			//defaultPaymentAirFreightModal
			console.log(data);
			if (data[index].Method === 'Account') {
				//console.log(data);
				ModalService.open({
					 title: 'Make this your default payment method.',
					 content: '/app_assets/templates/ups.ppc-defaultPaymentAirFreightModal.html',
					 component: 'ppc'
				 },function(sc){
						sc.nickName = data[index].payementNickName;
						sc.method = data[index].Method;
						sc.airFreight = (typeof data[index].pcode !== 'undefined') ? true : false;
						console.log(data[index]);
						sc.done = function() {
							angular.forEach(data, function(value, key) {
								if(key=== index){
									data[index].Default='DEFAULT METHOD';
									data[index].makeDefault=true;
								}else{
									data[0].Default='Make Default Method';
									data[0].makeDefault=false;
								}
							});

							ModalService.dismiss();
						};

						sc.cancel = function() {
							ModalService.dismiss();
						};

				 });
			} else {
				angular.forEach(data, function(value, key) {
					if(key=== index){
						data[index].Default='DEFAULT METHOD';
						data[index].makeDefault=true;
					}else{
						data[0].Default='Make Default Method';
						data[0].makeDefault=false;
					}
				});
			}
	    };
	    $scope.sortWithoutDefault=function(src,orderBy){
	      	$scope.payementData.paymentMethods = paymentService.sortWithoutDefault($scope.payementData.paymentMethods,src,orderBy);
	      	paymentService.setData($scope.payementData.paymentMethods);
	    };
	    $scope.sortTable = function(src){
	        if(src){
	         $scope.payementData.paymentMethods = $scope.payementData.paymentMethods.sortBy(src);
	         paymentService.setData($scope.payementData.paymentMethods);
	        }
	    };
	    $scope.disortTable = function(src){
	        if(src){
	           $scope.payementData.paymentMethods = $scope.payementData.paymentMethods.disortBy(src);
	           paymentService.setData($scope.payementData.paymentMethods);
	        }
	    };
	    $scope.AddPromotion = function(){
	     ModalService.open({
	         title: 'Save on your next eligible shipment.',
	         content: '/app_assets/templates/ups.ppc-add-promotion.html',
	         component: 'ppc'
	     },function(sc){
	     	  sc.viewDiscount = function(){
	            	UtilService.openTearmsAndConditions('https://www.ups.com/mrd/promodiscount?loc=en_CA&promoCd=BC5X1YMW1');
	            	ModalService.dismiss();
	            };
	     });
	    };

	    $scope.openViewDiscounts= function(){
	        UtilService.openTearmsAndConditions('https://www.ups.com/mrd/promodiscount?loc=en_US&promoCd=BON5XYU72');
	    };

	    $scope.openPromoPage = function(){
	        UtilService.openTearmsAndConditions('https://www.ups.com/mrd/promodiscount?loc=en_CA&promoCd=BC5X1YMW1');
	    };

	    $scope.selectCountry = function(text){
	      if(text === 'us' || text==='pr'){
	        $scope.setUS = true;
	      }else{
	        $scope.setUS = false;
	      }
	    };

	     $scope.changeImage=function(str){
	        if(str){
	            $scope.isImage=true;
	        }else{
	            $scope.isImage=false;
	        }

	     };
	     $scope.checkLength=function(str){
	     	if(!str){
	      	 $scope.invalidCard = false;
	      	 return;
	     	}
	     var strLength = str.length;
	      if(strLength < 14){
	        $scope.invalidCard = true;
	      }else{
	        $scope.invalidCard = false;
	      }

	    };
	    $scope.checkAddress=function(){
	    	$scope.form.country='us';
	    	$scope.form.address={};
	    };
	    $scope.checkcodeLength=function(str){
	    	if(!str){
	           $scope.invalidCode = false;
	      	 return;
	     	}
	    	var strLength = str.length;
	              if(strLength <= 2){
	                $scope.invalidCode = true;
	              }else{
	                $scope.invalidCode = false;
	              }
	    };
	    Array.prototype.sortBy = function(p) {
	          return this.slice(0).sort(function(a,b) {
	          return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
	          });
	    };
	    Array.prototype.disortBy = function(p) {
	          return this.slice(0).sort(function(a,b) {
	          return (b[p] > a[p]) ? 1 : (b[p] < a[p]) ? -1 : 0;
	          });
	    };
	    $scope.changeYear = function(selectedYear){
	        selectedYear= parseInt(selectedYear);
	        var date = new Date();
	        var currentYear= date.getFullYear();
	        var currentMonth= date.getMonth();
	        var data = $scope.Months;
	        if(selectedYear===currentYear){
	           angular.forEach(data, function(value, key) {
	                if(currentMonth>=data[key].id){
	                    data[key].isValid =true;
	                }
	            });
	                $scope.form.month=data[currentMonth].month.toString();
	        }
	        else{
	            angular.forEach(data, function(value, key) {
                    data[key].isValid =false;
	            });
	        }
	    };

	    $scope.openCVVBox = function(){
			UtilService.openTearmsAndConditions('https://www.ups.com/cc/ll/cvv.html');
		};

	    $scope.saveMethods = function(valid,invalidCard,invalidCode){
	    	$scope.clicked=true;
	    	if(valid && !invalidCard && !invalidCode){
	        var option =$scope.form;
	        option._id = paymentService.savedMethods.length+1;
	        option.payementNickName= option.Cardtype + option.cardNumber.slice(-3);
	        option.Method='Payment Card-'+ option.Cardtype;
	        option.Number='XXXXXXXXXXXXX'+option.cardNumber.slice(-3);
	        option.displayAccount=option.Cardtype+' - '+ option.Number;
	        option.accountType='Payment Card';
	        if(option.makeDefault){
	            option.Default='DEFAULT METHOD';
	              makeOtherNonDefault();
	        }else{
	            option.Default='Make Default Method';
	        	option.makeDefault=false;
	        }
	        if(option.SameAddr){
	           option.address = paymentService.address;
	        }

	        if($rootScope.index === undefined && $rootScope.cardId===undefined){
	            paymentService.saveMethods(option);
	        }else{
	          paymentService.savedMethods[$rootScope.index]=$scope.form;
	        }

	        if($rootScope.typeOfUser === 'premium'){
	        	$rootScope.typeOfUser = '';
	        	if($rootScope.basicIndex >= 0){
	        		$rootScope.deliveryAddressData.address[$rootScope.basicIndex].memLevel ='premium';
	        		$rootScope.$broadcast('sortAddressDescriptions', {});
	        		$rootScope.basicIndex = '';
	        	}
	        	ModalService.next({
					title: 'Welcome to UPS My Choice<sup>&reg;</sup>, John.',
					content: '/app_assets/templates/ups.doa-ConfirmationModal.html',
				});
	        	return;
	        }

	        if($rootScope.lastPage==='choosePayment'){
	          ModalService.jumpToStep(0);
	            return;
	        }


	        if($rootScope.lastPage==='preferencePage'){
	          $rootScope.cardId=undefined;
	          $rootScope.lastPage='';
	          $rootScope.isActive=5;
	          $location.path('/preferencePage/ShippingPreference');
	          return;
	        }
	         $rootScope.index=undefined;
	         $location.path('/paymentPage');
	     }
	    };
	    $scope.checkDisableButton = function(data){
	    	$rootScope.typeOfUser='';
	    	if($scope.Cardtype){
	     	 $scope.Cardtype.isAdd = false;
		      if(data){
		        $scope.Cardtype.isAdd=true;
		      }

	    	}
	    };

	  $scope.payementData = {};
	  $scope.payementData.paymentMethods=paymentService.savedMethods.sortBy('Default');
	  paymentService.setData(paymentService.savedMethods.sortBy('Default'));
	  $scope.payementData.cardOptions=paymentService.cardOptions;
      $scope.payementData.cardCountries = paymentService.cardCountries;
	  $scope.payementData.promotionMethods = paymentService.promotionMethods;

      $scope.filterPaymentOptions = function(cCode) {
          return function(value, index, array) {
              //console.log($scope.payementData.cardCountries[cCode]);

              if ($scope.payementData.cardCountries[cCode]
                    && $scope.payementData.cardCountries[cCode].indexOf(value) !== -1) {
                  return true;
              }

              return false;
          };
      };

	  if($rootScope.index !== undefined){
	    if(paymentService.savedMethods[$rootScope.index].address){
	      $scope.form.address=paymentService.savedMethods[$rootScope.index].address;
	    }
	  }
	  else{
	     $scope.form.address=paymentService.address;
	  }


	  $scope.isTable=true;

	    /** ********** Functions for PAYPAL ***************** */
	    if($rootScope.paypalAdd !== true){
	      $scope.obj.payementNickName='PayPal';
	    }

	    if($rootScope.isEdit==='edit' || $rootScope.cardId===undefined){
	      var formData2= $filter('filter')(paymentService.savedMethods, { accountType: 'PayPal' })[0];
	      angular.extend($scope.obj,formData2);
	    }

		var credentials = localStorageService.get('active_user_info');
	    if(credentials && credentials.user_type && credentials.user_type.locale.county_id==='pt'){
	    	$scope.isPortugal=true;
	    }

	    $scope.savePaypal = function(){
	      $rootScope.paypalAdd = true;
	      var option =$scope.obj;
	      option.payementNickName= option.payementNickName;
	      option.accountType= 'PayPal';
	      option.Number= 'XXXX';
	      option.Method='PayPal';
	      option.displayAccount=option.accountType +' - '+ option.Number;
	      if(option.makeDefault){
	            option.Default='DEFAULT METHOD';
	             makeOtherNonDefault();
	        }else{
	            option.Default='Make Default Method';
	        	option.makeDefault=false;
	        }
	        if($rootScope.index === undefined && $rootScope.cardId=== undefined){
	            paymentService.saveMethods(option);
	        }
	        else{
	            paymentService.savedMethods[$rootScope.index]=$scope.obj;
	        }
	         if($rootScope.lastPage==='preferencePage'){
	          $rootScope.cardId=undefined;
	          $rootScope.lastPage='';
	          $rootScope.isActive=5;
	          $location.path('/preferencePage/ShippingPreference');
	          return;
	        }
	         if($rootScope.typeOfUser === 'premium'){
	        	$rootScope.typeOfUser = '';
	        	ModalService.next({
					title: 'Welcome to UPS My Choice<sup>&reg;</sup>, John.',
					content: '/app_assets/templates/ups.doa-ConfirmationModal.html',
				});
	        	return;
	        }
	        if($rootScope.lastPage==='choosePayment'){
	        	ModalService.jumpToStep(0);
		       	return;

	        }
	      $location.path('/paymentPage');
	    };

		$scope.backUploadPPC = function(){
			if($rootScope.fromPaymentPage === true){
				$scope.modalValues = {
					title: 'Confirmation',
					url: '/app_assets/templates/ups.doa-hazmatConfirmationModal.html'
				};
			}else{
		      $scope.modalValues = {
			      title: $rootScope.lastTitle,
			      url: $rootScope.lastUrl
		      };
			}
		};

		//Window SVP logic
		$scope.viewPortHtml= 'ups.ppc-paymentLVP.html';
		$scope.portObjComp2 = {
			back: function(){
		    	 $scope.viewPortHtml = 'ups.ppc-paymentSVP.html';
			},
			next: function(index, data){
				$scope.selected = {
					index: index,
					data: data
				};
				if($scope.selectedValueContent.type === 'payment'){
					$scope.viewPortHtml = 'ups.ppc-paymentSVP_payment2.html';
				}
			}
		};
		$scope.portObjComp3 = {
			back: function(){
				if($scope.selectedValueContent.type === 'payment'){
					$scope.viewPortHtml = 'ups.ppc-paymentSVP_payment1.html';
				}
			}
		};
		$scope.portObjComp1 = {
			content: [{
				type: 'payment',
				title: 'My Payment Methods'
			}, {
				type: 'discount',
				title: 'My Discounts'
			}],
			next: function(value){
				$scope.selectedValueContent = value;
		    	if(value.type === 'payment'){
			    	$scope.viewPortHtml = 'ups.ppc-paymentSVP_payment1.html';
			    	$scope.portObjComp2.content = $scope.payementData.paymentMethods;
		    	}else{
			    	$scope.viewPortHtml = 'ups.ppc-paymentSVP_discount1.html';
			    	$scope.portObjComp2.content = $scope.payementData.promotionMethods;
		    	}
			}
		};

		//Port view change logic - width defined for svp is 769
		$scope.$watch('windowWidth', function(windowWidth){
		     if(windowWidth && windowWidth <= 769){
		    	 if(!$scope.isSVP){
			    	 $scope.isSVP = true;
			    	 $scope.viewPortHtml = 'ups.ppc-paymentSVP.html';
		    	 }
		     }else{
		    	 $scope.isSVP = false;
		    	 $scope.viewPortHtml = 'ups.ppc-paymentLVP.html';
		     }
		 });

	}]);
