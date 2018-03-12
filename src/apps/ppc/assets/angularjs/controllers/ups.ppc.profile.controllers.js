'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module and store in the variable 'Controller'
 */
angular.module('upsDOApp.controllers')


/**
 * @controller
 * @name upsDOApp.controllers.controller : profileCtrl
 * @description Controls the Profile Flow in PPC
 * @template ups.ppc-my-address.html
 */
	.controller('profileCtrl',['$scope','$filter','$http','$window','$location','$anchorScroll','UtilService','NotificationService','addressServices','$rootScope','MappingService','PPCService','ModalService','MockJSONCalls','DashboardService','localStorageService','UserService',function($scope,$filter,$http,$window,$location,$anchorScroll,UtilService,notification,addressServices,$rootScope,MappingService,PPCService,ModalService,MockJSONCalls,DashboardService,localStorageService,UserService){
		var windowObj = {};
        $rootScope.callWindowEvent = function(name, callback) {
          if (callback && typeof callback === 'function'){
            windowObj[name] = callback;
          }
          $window.onclick = function(event) {
            for ( var i in windowObj) {
              windowObj[i](event);
            }
          };
        };

		//Call ppc meta data
		var metaDataURL = 'ups.ppc-metaData.json';
		 $scope.tabContentId = $rootScope.tabContentId;
		/**
		* @function
		* @name UtilService.mockServiceCalls
		* @description Service to fetch the data from JSON
		*/
		UtilService.mockServiceCalls({urlString: metaDataURL}, function(response){
	        var obj = response.data;
	        // Set meta data in ppc service for further uses
	        PPCService.setMetaData(obj);
	        var slidesArray = document.getElementsByClassName('slick-slide');
	        if(slidesArray.length>0){
	        	angular.forEach(slidesArray, function(value, i) {
	        		slidesArray[i].removeAttribute('aria-describedBy');
	     	       });
	        	}
	    });

	    $scope.zipcodeError=false;

	    /** UPSDO-1839 **/
	    $scope.$on('$routeChangeStart', function(e,current){
	    	if(!localStorageService.get('active_user_info')){
	    		UserService.callUserData('fb');
	    	}

	    	$anchorScroll();
	    	if(current.originalPath === '/login' || current.originalPath === '/cancelMembership' ||current.originalPath === '/viewAndPayBill' || current.originalPath === '/autoRenewValidation' || current.originalPath === '/notYetEnrolled' || current.originalPath === '/signup'){
	    		$rootScope.hideHeader = true;
	    	}else{
	    		$rootScope.hideHeader = false;
	    	}

	    	//Check page title
	    	if(current.$$route !== undefined){
	    		$scope.pageTitle = current.$$route.title;
	    	}
    	});

	    /**
		* @function
		* @name editAddressLink
		* @description Click of edit address in my addresses accordion
		*/
		$scope.editAddressLink = function(index,indexVal){
			$rootScope.addressIndex=indexVal;
			$rootScope.indexVal = index;
			$rootScope.lastPage = 'information';
			$location.path('/contactPage/edit');
		};

	    /**
		* @function
		* @name sortBy
		* @description Sort address
		*/
	    Array.prototype.sortBy = function(p) {
	      return this.slice(0).sort(function(a,b) {
	        return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
	      });
	    };

		/**
		* @function
		* @name onEditName
		* @description change text on edit
		*/
	    $scope.onEditName = function(evt){
	        $scope.editName = !($scope.editName );
	        if(evt.target.innerText === 'Edit') {
	            evt.target.innerText='Save';
	        }
	        else {
	            evt.target.innerText='Edit';
	        }
	    };

	    /**
		* @function
		* @name upsAccOnblur
		* @description Zipcode on blur
		*/
	    $scope.upsAccOnblur = function(val){
	      if(val!==undefined){
	        $scope.zipcodeError=true;
	      this.ups_editaddressform.zipcode2.$setDirty();
	      }
	    };

		/**
		* @function
		* @name reloadState
		* @description Reload state value based on country
		*/
	    $scope.reloadState = function(type){
	        if(type === 'us'){
	            $scope.isUs = true;
	        }else{
	            $scope.isUs = false;
	        }
	    };

		/**
		* @function
		* @name addAddress
		* @description Add address value
		*/
	    $scope.addAddress=function(){
	        $rootScope.lastPage='information';
	        $location.path('/contactPage/open');
	    };

	    /**
		* @function
		* @name toggleDeleteAddressModal
		* @description Delete address from my address page
		*/
	    $scope.toggleDeleteAddressModal = function(index){
	    	 var modalInstance = ModalService.open({
		        	content:'/app_assets/templates/ups.ppc-edit-account-confirmation-box.html',
		        	title:'Delete Address',
					component: 'ppc'
		        },function(sc){
					 sc.okText = 'Yes';
					 sc.cancelText = 'No';
	   				 sc.cancelClass = 'ups-cta_tertiary';
		             sc.pageSubTitle = 'Are you sure you want to remove this address from your profile?';
			 	});
		   	    modalInstance.result.then(function() {
		   			// Send Service request delete TODO
		   	        $scope.currentIndex=index;
		   	    	$scope.parentFormObj.splice($scope.currentIndex, 1);
		   	    }, function() {
		   	        // Cancel
		   	    });
	    };

		/**
		* @function
		* @name toggleDeleteAddressModal
		* @description Toggle deafult address text
		*/
	    $scope.toggleDeafultAddress=function(index){

	      angular.forEach($scope.parentFormObj, function(value,key) {
	        if(key===index){
	          $scope.parentFormObj[key].defaultAddressBtn='Default Address';
	          value.isdefaultAddressBtn=true;
	        }
	        else{
	           $scope.parentFormObj[key].defaultAddressBtn='Make Default';
	             value.isdefaultAddressBtn=false;
	        }

	       });

	      $scope.parentFormObj[index].isdefaultAddressBtn = true;
	      $scope.parentFormObj=$scope.parentFormObj;
	      $scope.parentFormObj = $scope.parentFormObj.sortBy('defaultAddressBtn');
	      addressServices.setAddress($scope.parentFormObj);
	    };

		/**
		* @function
		* @name addPhone
		* @description Add phone value
		*/
	    $scope.addPhone = function(isValid){
	        if (isValid) {
	            $scope.phoneObj={};
	            $scope.addPhoneBtn=false;
	        }
	        else{
	            // invalid form
	        }
		};

		/**
		* @function
		* @name cancelForm
		* @description Cancels the form
		*/
		$scope.cancelForm = function(){
		    if($rootScope.lastPage==='contact'){
		       $location.path('/contactPage');
		       $window.scrollTo(0, 0);
		    }else if($rootScope.lastPage==='information'){
		        $location.path('/informationPage');
		        $window.scrollTo(0, 0);
		    }
		};

		/**
		* @function
		* @name setAddressData
		* @description Set address value and placeholder from JSON in my addresses page
		*/
	    function setAddressData(data){
	    	$scope.countryList = data.countries;
	        $scope.statesList = data.states;
	        $scope.termsAndConditionsURL = data.tncUrl;
	        $scope.ups_placeholder = data.placeholder;// add
	                            // placeholders
	        $scope.referenceList1=data.referenceType1;
	        $scope.referenceList2=data.referenceType2;
	    }

	    /**
		* @function
		* @description keeps a watch on change Length function
		*/
	    $scope.$watch('parentFormObj',function(){
	     	$scope.checkLength();
	    });

	    /**
		* @function
		* @name checkLength
		* @description Checks length for my address tag
		*/
	   	$scope.checkLength = function(){
        	var data= $filter('filter')($scope.parentFormObj, { tagId: 'My Address' });
        	return data.length;
	    };


	    /**
	     * @desc This code will call demo json for user Info data
	     * */
	    (function(){
	    	//Check if active user is set else set user to "demo"
	    	if(!localStorageService.get('active_user_info')){
	    		UserService.callUserData('fb');
	    	}
		})();

	    /**
		* @function
		* @name init
		* @description Used to initialize the variables
		*/
	    function init(){
	    	$scope.otherLinks = [{
	    		title: 'Order Supplies',
	    		link: 'https://www.ups.com/content/us/en/shipping/index.html?WT.svl=PriNav',
	    		active: true
	    	},{
	    		title: 'View and Pay Bill',
	    		link: 'https://www.ups.com/content/us/en/shipping/index.html?WT.svl=PriNav',
	    		active: true
	    	},{
	    		title: 'Administer CampusShip',
	    		link: 'https://www.ups.com/content/us/en/shipping/index.html?WT.svl=PriNav',
	    		active: true
	    	},{
	    		title: 'Manage Quantum View',
	    		link: 'https://www.ups.com/content/us/en/shipping/index.html?WT.svl=PriNav',
	    		active: true
	    	},{
	    		title: 'File a Claim',
	    		link: 'https://www.ups.com/content/us/en/shipping/index.html?WT.svl=PriNav',
	    		active: true
	    	}];

		    $scope.userInfo=UserService.getUser();
		    if($scope.userInfo){
		    	if(!$scope.userInfo.ecs){
		    		$scope.otherLinks[2].active = false;
		    	}
		    }
	    	$scope.tags = [{name: 'My Address',Selected:true}];
			$scope.groups = MappingService.getMyInformationMap();
		    $scope.active=1;
		    $scope.parentFormObj=addressServices.parentFormObj;

		    $scope.editNameJson={firstName: 'John',lastName: 'Smith',middleName: '',suffix: 'Jr'};
		    $scope.formObj={};
		    $scope.phoneObj={};
		    $scope.editAddressModalBox= false;
		    $scope.deleteAddressModalBox=false;
		    $scope.editName = false;
		    $scope.addPhoneBtn=true;
		    $scope.type = ['Mobile','Home','Work','Other'];



		    var metaData = DashboardService.getMetaData();
		 	if(metaData.countries){
		 		setAddressData(metaData);
		 	}else{
				MockJSONCalls.getJson({urlString: 'ups.doa-metaData.json'})
		        // then() called when response gets back
		        .then(function(data) {
		            // promise fulfilled TODO set metadata
		        	DashboardService.setMetaData(data);
		        	setAddressData(data);
		        }, function() {
		            // promise rejected
		        });
		 	}

		 	if(localStorageService.get('Redirect')){
			 	var redirection = localStorageService.get('Redirect').RedirectFrom;

			 	if((redirection === 'signup')|| (redirection === 'openAcount')|| (redirection === 'mychoice')){
			 		$scope.confirm_show = true;
			 	}
			 	else{
			 		$scope.confirm_show = false;
			 		localStorageService.set('Redirect',{'RedirectFrom':''});
			 	}

			 	$scope.closeMessage = function(){
			 		$scope.confirm_show = false;
			 		localStorageService.set('Redirect',{'RedirectFrom':''});
			 	};
		 	}

		    var conditionalConfirm ='ups.ppc-confirmation-signUp.json';
		    UtilService.mockServiceCalls({urlString: conditionalConfirm}, function(response){
		        var obj = response.data;
		        // console.log(obj);
		        if(obj.confirmationCode){
		            $scope.confirmationText=obj;
		        }
		    });

	         $scope.oneAtATime = true;
	          if($rootScope.fromSecurityQuestions){
	              $scope.groups[0].active=false;
	              $scope.groups[3].active=true;
	              $rootScope.fromSecurityQuestions=false;
	          }
	          else if($rootScope.fromChangePassword){
	              $scope.groups[0].active=false;
	              $scope.groups[1].active=true;
	              $rootScope.fromChangePassword=false;
	          }


	         $scope.status = {
	           isFirstOpen: true,
	           isFirstDisabled: false
	         };
		}
		init();
	}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : choosePaymentCtrl
 * @description Controls the Choose Payments Flow in PPC
 * @template ups.doa-choosePayment.html and ups.doa-choosePaymentModal.html
 */
	.controller('choosePaymentCtrl',['$scope','$http','$window','$location','$rootScope','UtilService','paymentService','$timeout','ModalService','$filter','DashboardService','MockJSONCalls',function($scope,$http,$window,$location,$rootScope,UtilService,paymentService,$timeout,ModalService,$filter,DashboardService,MockJSONCalls){
		$scope.palCount = $filter('filter')(paymentService.savedMethods, { accountType: 'PayPal' }).length;
		$scope.cardCount =$filter('filter')(paymentService.savedMethods, { accountType: 'Payment Card' }).length;
		$scope.shipCount =$filter('filter')(paymentService.savedMethods, { accountType: 'Account' }).length;
		$scope.ModalService = ModalService;
		$scope.form={};
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
		function makeOtherNonDefault(){
	    var data = paymentService.savedMethods;
		    angular.forEach(data, function(value, key) {
		       data[key].Default='Make Default Method';
		       data[key].makeDefault=false;
		    });
		}
       	function calladdexisPPCflow(sc){
       	var metaData = DashboardService.getMetaData();
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


		$scope.toggleModal = function(rec){
			$rootScope.typeOfUser = '';
			if(rec==='noRec'){
            	$scope.modalTitle= 'Add a payment method.';
            	$scope.modalContent= '/app_assets/templates/ups.doa-addPaymentModal.html';
            	$scope.modalData= 'Add Promotions';
            	$scope.modalComponent= 'doa';
				$scope.modalPromoSection = false;
            }else if (rec === 'promo') {
				$scope.modalTitle= 'Choose your payment account.';
            	$scope.modalContent= '/app_assets/templates/ups.doa-choosePaymentModal.html';
            	$scope.modalData= 'Add Promotions';
            	$scope.modalComponent= 'doa';
				$scope.modalPromoSection = true;
				$scope.upsAccount1 = '1';
				$scope.updateAccountSel = function (num) {
					$scope.upsAccount1 = num;
				};
			}else{
            	$scope.modalTitle= 'How would you like to pay?';
            	$scope.modalContent= '/app_assets/templates/ups.doa-choosePaymentModal.html';
            	$scope.modalData= 'Add Promotions';
            	$scope.modalComponent= 'doa';
				$scope.modalPromoSection = false;
            }
			var modalInstance = ModalService.open({
	            title: $scope.modalTitle,
	            content: $scope.modalContent,
	            data: $scope.modalData,
				component: $scope.modalComponent,
				promoSection: $scope.modalPromoSection
	        },function(sc){
	        	calladdexisPPCflow(sc);
	        	sc.backtoPayment = function(){
	        		if($rootScope.lastPage ==='choosePayment'){
	          		ModalService.jumpToStep(0);
	            	return;
	          		}
	        	};
	        });
	          modalInstance.result.then(function() {
	          	var indexVal = $rootScope.indexVal;
	            $scope.deleteData(indexVal);

	           }, function() {
	              // Cancel
	          });
	     };

	       $scope.addPaymentMethod = function(){
	        if($scope.addGrey){
	    	   $scope.disableCheck=false;
				$scope.palCount = $filter('filter')(paymentService.savedMethods, { accountType: 'PayPal' }).length;
				$scope.cardCount =$filter('filter')(paymentService.savedMethods, { accountType: 'Payment Card' }).length;
				$scope.shipCount =$filter('filter')(paymentService.savedMethods, { accountType: 'Account' }).length;
	        	ModalService.next({
	                title: 'Add a payment method.',
	                content: '/app_assets/templates/ups.doa-addPaymentModal.html',
	                data: 'Add Promotions'
	            });
	        }
	    };
	    $scope.checkAddone =function(){
	    	$scope.addGrey=true;
	    	$scope.disableCheck = $scope.addGrey;
	        var data = $scope.savedMethods;
	         angular.forEach(data, function(value, key) {
	           data[key].checkSelect=false;
	        });
	    };


	    $scope.savedMethods=paymentService.savedMethods;
	    $scope.Method = paymentService.Method;

	    $scope.checkMethod = function(item,data,payment){
	        if(payment){
	         $scope.selectedPayment =payment;
	         $scope.disableMethodCheck = true;
	        }

	        $scope.disableCheck =false;
	         angular.forEach(data, function(value, key) {
	           data[key].checkSelect=false;
	        });
	         item.checkSelect=true;
	         $scope.checkedData= data;
	         $scope.disableCheck = item.checkSelect;
	         $scope.addGrey=false;
	    };

	     $scope.sortWithoutDefault=function(src,orderBy){
	      	$scope.savedMethods = paymentService.sortWithoutDefault($scope.savedMethods,src,orderBy);
	      	paymentService.setData($scope.savedMethods);
	    };
	    var modal={};
	    $scope.callDeletePopUp=function(index,promo){
	        $scope.indexVal = index;
	        $rootScope.indexVal = $scope.indexVal;
	        $scope.promo = promo;
	            modal = {
	              title: 'Delete This Payment Method(s)?',
	              content: '/app_assets/templates/ups.ppc-modalDelete.html'
	          };
	        ModalService.next(modal,function(sc) {
	          var data = $scope.savedMethods;
	          sc.shippingAccount=data[$scope.indexVal].payementNickName;
	          sc.youSure = 'Are you sure you want to delete the following payment method?';
	          $scope.shiping=true;
	         }) ;

	    };

	    $scope.deleteData =function(indexVal){
	      var data = $scope.savedMethods;
	      if(indexVal){
	      	data.splice(indexVal, 1);
	      	paymentService.setData($scope.savedMethods);
	      	$scope.savedMethods=paymentService.getData();
	      }
	    };



	    $scope.nextToChooseMethod = function(){
	    	  angular.forEach($scope.checkedData, function(value, key) {
	           $scope.checkedData[key].checkSelect=false;
	        });
	            $rootScope.lastPage='choosePayment';
	        if($scope.selectedPayment==='Payment Card'){
	        	$scope.selectedPayment='';
	        	$scope.disableMethodCheck=false;
	            ModalService.next({
	                title: 'Add a payment card.',
	                content: '/app_assets/templates/ups.ppc-payment-card.html',
	                data: 'Add Promotions'
	            });
	        }else if($scope.selectedPayment.toUpperCase()==='PAYPAL'){
	        	  ModalService.next({
	                title: 'Add a paypal.',
	                content: '/app_assets/templates/ups.ppc-add-paypal.html',
	                data: 'Add Promotions'
	            });

	        }else if($scope.selectedPayment==='Shipping Account'){
	        	 ModalService.next({
			        title: 'Add an Existing Account to your profile.',
	        		content: '/app_assets/templates/ups.ppc-addorauthenticateaccountModal.html',
					component: 'ppc'

			    },function(sc){
			    	if($rootScope.typeOfUser === 'premium'){
		        		calladdexisPPCflow(sc);
		        	}
		        });
	        	 $rootScope.parentPage = 'chooseAddress';
	        }
	             $timeout(function() {
	                var ele =$('.modal-body');
	                ele.find('.ups-cms-demo').removeClass('ups-cms-demo');
	            }, 10);

	    };
	    $scope.$on('ChooseCard', function(){
	    	ModalService.next({
	            title: 'How would you like to pay?',
	            url: '/app_assets/templates/ups.doa-choosePaymentModal.html',
	            data: 'Add Promotions'
	        });
	        $scope.savedMethods=paymentService.savedMethods;
	    });
	}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : communicationPerfController
 * @description Controls the communication Preferences in PPC
 * @template ups.ppc-myInformation-communicationPreference.html
 */
	.controller('communicationPerfController',['$scope','$location','UserService',function($scope,$location,UserService){
		//init
		$scope.formObj = {
			comm:[]
		};

	    $scope.userInfo=UserService.getUser();
	    $scope.isCountryUser=false;
	    if($scope.userInfo){
		    $scope.isCountryUser=$scope.userInfo.user_type.locale.inCountry;
	    }
	    if($scope.isCountryUser){
		    $scope.language=[{
				language: 'English',
				code:'en',
				isSelected:true
		    },{
				language: 'Spanish',
				code:'sp',
				isSelected:false
		    }];
	    }else{
	    	$scope.language=[{
				language: 'Dutch',
				code:'dt',
				isSelected:true
		    },{
				language: 'Mandarin',
				code:'mn',
				isSelected:false
		    }];
	    }
	     $scope.savePref = function(){
	    	this.ups_commProfform.$setPristine();
	    };
	    $scope.allowPermission=[{
	        id:'ups-communications_chckbx_10',
	        value:'News and Insights to help me ship smarter',
	        isSelected:$scope.isCountryUser
      	},{
	        id:'ups-communications_chckbx_11',
	        value:'Service Updates to alert me to severe weather and events impacting operations',
	        isSelected:$scope.isCountryUser
      	},{
	        id:'ups-communications_chckbx_12',
	        value:'Promotions and Offers to help me get the most for my money',
	        isSelected:$scope.isCountryUser
      	},{
	        id:'ups-communications_chckbx_13',
	        value:'Product News to keep me up-to-date on news services, tools, and features',
	        isSelected:$scope.isCountryUser
      	}];
	    $scope.communicationLabel={
			allowCommunication:{
				text:'Send me offers, insights, and industry news that can help improve my shipping.',
				isSelected:false
			},
			disAllowCommunication:{
				text:'Please remove me from your mailing list.',
				isSelected:false
			},
			alternateContent:'Alternate Contact Methods',
			commAvailable:'Available UPS Email Communications',
			twitter:'Twitter User Name',
			facebook:'Facebook Name'
	    };
	    $scope.refreshCheckbox = function(){
	    	if(!$scope.formObj.communication){
	    		$scope.formObj.comm= [true,true,true,true];
	    	}
	    	else{
	    		$scope.formObj.comm = [];
	    	}

	    };

        //Added for Jan18 Spec v1.1 ER1812
        //Navigates to Edit Communications Preferences Page in PPC
        $scope.proceedToEditCommunicationPrefs = function(){
			$location.path('/informationPage/editCommunicationPreferences');
		};

	    function init(){
	    	if($scope.communicationLabel.allowCommunication.isSelected){
	    		$scope.refreshCheckbox();
	    	}
	    }
	    init();
	}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : privacyPrefController
 * @description Controls the Privacy Preferences in PPC
 * @template ups.ppc-myInformation-privacyPreference.html
 */
    .controller('privacyPrefController',['$scope','UserService','DashboardService','MockJSONCalls', function($scope,UserService,DashboardService,MockJSONCalls){

        $scope.addressFormObj = {};
        $scope.addressFormObj.countryTxt = true;
        $scope.addressFormObj.zipTxt = false;
        $scope.confirmation = false;
        $scope.loggedIn = true;



        var metaData = DashboardService.getMetaData();
        if(metaData.countries){
            $scope.countryList = metaData.countries;
            $scope.statesList = metaData.states;
            // $scope.termsAndConditionsURL = metaData.tncUrl;
            // $scope.ups_placeholder = metaData.placeholder;
            // $scope.parentFormObj = metaData.savedAddressList;
            $scope.addressFormObj.country= $scope.countryList[0].code;
            //$scope.addressFormObj.state_select= 'Select One';
            $scope.addressFormObj.countryName = 'United States';
            //$scope.addressFormObj.zipCode = '12345';
        }else{
            MockJSONCalls.getJson({urlString: 'ups.ppc-privacy_cac.json'})
            // then() called when response gets back
            .then(function(data) {
                // promise fulfilled TODO set metadata
                DashboardService.setMetaData(data);
                $scope.countryList = data.countries;
                $scope.statesList = data.states;
                // $scope.termsAndConditionsURL = data.tncUrl;
                // $scope.ups_placeholder = data.placeholder;
                // $scope.parentFormObj = data.savedAddressList;
                $scope.addressFormObj.country= $scope.countryList[0].code;
                $scope.addressFormObj.countryName = 'United States';
                //$scope.addressFormObj.zipCode = '12345';
                //$scope.addressFormObj.state_select= 'Select One';

            }, function() {
                // promise rejected
            });
        }
        $scope.proceedToConfirmation = function(valid) {
            $scope.clicked = true;
            if(valid) {
                $scope.confirmation = true;
                $scope.loggedIn = false;
            }
        };



         $scope.privacyLabel={
             yesPleaseShare:{
                 text:'UPS may share my personal information with third parties for those third parties own purposes',
                 isSelected:false
             },
             doNotShare:{
                 text:'UPS may not share my personal information with third parties for those third parties own purposes, except as described in the Privacy Notice.',
                 isSelected:false
             }
         };

         $scope.checkFormErrors = function() {
             //console.log($scope.ups_packageMatchingOptionsForm);
             if ($scope.ups_privacyPrefForm.privacyPrefRadio.$invalid) {
                 return true;
             }
             if ($scope.noAddressAndPhone && $scope.ups_privacyPrefForm.privacyPrefphone_number.$invalid) {
                 return true;
             }
         };

 }])

 /**
  * @controller
  * @name upsDOApp.controllers.controller : packageMatchingOptionsCtrl
  * @description Controls the My Choice in PPC > Package Matching Options
  * @template ups.ppc-mychoice-preference-packageMatchingOptions.html
  */
     .controller('packageMatchingOptionsCtrl',['$scope','UserService','DashboardService','MockJSONCalls',function($scope,UserService,DashboardService,MockJSONCalls){
          $scope.ups_packageMatchingOptionsForm;
          $scope.phoneTypeOptions = {
            availableOptions: [
                {
                    id: '0',
                    name: 'Select One'
                },
              {
                  id: '1',
                  name: 'Mobile'
              },
              {
                  id: '2',
                  name: 'Home'
              },
              {
                  id: '3',
                  name: 'Work'
              },
              {
                  id: '4',
                  name: 'Other'
              }
            ]
        };
        $scope.ups_editDiscounts = {
            'ups_EmailAddress_Input':'',
            'ups_PhoneNumber':'',
            'ups_phoneType': $scope.phoneTypeOptions.availableOptions[0]
        };

        $scope.checkFormErrors = function() {
            //console.log($scope.ups_packageMatchingOptionsForm);
            if ($scope.ups_packageMatchingOptionsForm.upsEmailAddress.$invalid) {
                return true;
            }
            if ($scope.ups_packageMatchingOptionsForm.upsPhoneNumberInput.$invalid) {
                return true;
            }
            if ($scope.ups_editDiscounts.ups_phoneType.id == '0') {
                return true;
            }
        }

        $scope.proceedToEmailConfirmation = function(valid) {
            $scope.clicked = true;
         };

         $scope.proceedToPhoneConfirmation = function(valid) {
             $scope.clicked = true;
         };

  }])

 /**
  * @controller
  * @name upsDOApp.controllers.controller : editCommunicationPrefCtrl
  * @description Controls the Edit Communications Preferences in PPC > My Information
  * @template ups.ppc-editCommunicationPref.html
  */
     .controller('editCommunicationPrefCtrl',['$scope','UserService','DashboardService','MockJSONCalls',function($scope,UserService,DashboardService,MockJSONCalls){
          $scope.serviceUpdates = {}; //Assists with Service Updates Lever data-ng-repeat
          $scope.makeEmailChangesDiscount = false;
          $scope.makeVoiceChangesDiscount = false;
          $scope.ups_editCommunicationsForm;
          $scope.phoneTypeOptions = {
            availableOptions: [
                {
                    id: '0',
                    name: 'Select One'
                },
              {
                  id: '1',
                  name: 'Mobile'
              },
              {
                  id: '2',
                  name: 'Home'
              },
              {
                  id: '3',
                  name: 'Work'
              },
              {
                  id: '4',
                  name: 'Other'
              }
            ]
        };
        $scope.ups_editDiscounts = {
            'ups_EmailAddress_Input':'',
            'ups_PhoneNumber':'',
            'ups_phoneType': $scope.phoneTypeOptions.availableOptions[0]
        };

        //News and Insights Radio Button Group
         $scope.frequencyTypes = [
             {'type':'daily','label':'Daily','isSelected':'false'},
             {'type':'weekly','label':'Weekly','isSelected':'true'},
             {'type':'monthly','label':'Monthly','isSelected':'false'}
         ];

         //Discounts and Offers Radio Button Group
          $scope.frequencyTypesDO = [
              {'type':'daily','label':'Daily','isSelected':'false'},
              {'type':'weekly','label':'Weekly','isSelected':'true'},
              {'type':'monthly','label':'Monthly','isSelected':'false'}
          ];

         //Service Updates Levers
         $scope.alertTypes = [
             {'type':'email','label':'Email','model':'makeEmailChanges'},
             {'type':'voice','label':'Voice','model':'makeVoiceChanges'},
             {'type':'mail','label':'Mail', 'model':'makeMailChanges'}
         ];

         //Service Updates Addresses
         $scope.serviceUpdatesAddresses = [
             {'addressName1':'1313 Mocking Bird Lane','addressName2':'Los Angeles, CA 67890 US','buttonName':'Unsubscribe'},
             {'addressName1':'101 Main Street','addressName2':'Anytown, IL 12121 US','buttonName':'Unsubscribe'}
         ];

         /**
           * @function
           * @name toggleEmailChanges
           * @description When Email Lever is toggled in News and Insights, additional content appears
           */
             $scope.toggleEmailChanges = function(index){
                  $scope.makeEmailChanges = !$scope.makeEmailChanges;
             };

        $scope.checkFormErrors = function() {
            //console.log(ups_editDiscounts.ups_phoneType.id);
            if ($scope.emailLeverDiscount && $scope.ups_editCommunicationsForm.upsEmailAddress.$invalid) {
                return true;
            }
            if ($scope.voiceLeverDiscount && $scope.ups_editCommunicationsForm.upsPhoneNumberInput.$invalid) {
                return true;
            }
            if ($scope.voiceLeverDiscount && $scope.ups_editDiscounts.ups_phoneType.id == '0') {
                return true;
            }
        }

     $scope.proceedToEmailConfirmation = function(valid) {
         $scope.clicked = true;
        //  if(valid) {
         //
        //  }
     };

     $scope.proceedToPhoneConfirmation = function(valid) {
         $scope.clicked = true;
     };

     $scope.proceedToMailConfirmation = function(valid) {
         $scope.clicked = true;
     };

     $scope.addressFormObj = {};

     var metaData = DashboardService.getMetaData();
     if(metaData.countries){
         $scope.countryList = metaData.countries;
         $scope.statesList = metaData.states;
         // $scope.termsAndConditionsURL = metaData.tncUrl;
         // $scope.ups_placeholder = metaData.placeholder;
         // $scope.parentFormObj = metaData.savedAddressList;
         $scope.addressFormObj.country= $scope.countryList[0].code;
         //$scope.addressFormObj.state_select= 'Select One';
     }else{
         MockJSONCalls.getJson({urlString: 'ups.ppc-privacy_cac.json'})
         // then() called when response gets back
         .then(function(data) {
             // promise fulfilled TODO set metadata
             DashboardService.setMetaData(data);
             $scope.countryList = data.countries;
             $scope.statesList = data.states;
             // $scope.termsAndConditionsURL = data.tncUrl;
             // $scope.ups_placeholder = data.placeholder;
             // $scope.parentFormObj = data.savedAddressList;
             $scope.addressFormObj.country= $scope.countryList[0].code;
             //$scope.addressFormObj.state_select= 'Select One';

         }, function() {
             // promise rejected
         });
     }


  }]);
