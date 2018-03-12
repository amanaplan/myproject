'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module
 */
angular.module('upsDOApp.controllers')

/**
 * @controller
 * @name upsDOApp.controllers.controller : myChoiceSetDeliveryAlertCtrl
 * @description Controls the Open Account flow
 * @template ups.ppc-mychoice-setDeliveryAlerts.html
 */
	.controller('myChoiceSetDeliveryAlertCtrl',['$scope','UtilService','UserService',function($scope,UtilService,UserService){

			$scope.addClicked = true;
			$scope.user=UserService.getActiveUserInfo();
			$scope.voiceNumber=$scope.user.phone;
			$scope.smsNumber=$scope.user.phone;
			$scope.alerts=[{
				key:'Ready for Shipment',
				value:'ship',
				checkbox:{
					email:false,
					sms:false,
					voice:false
				}
			},{
				key:'Day Before Delivery',
				value:'day_before',
				checkbox:{
					email:true,
					sms:false,
					voice:false
				}
			},{
				key:'Day of Delivery',
				value:'day_delivery',
				checkbox:{
					email:false,
					sms:false,
					voice:false
				}
			},{
				key:'Delivery Date Change',
				value:'delivery_schedule',
				checkbox:{
					email:true,
					sms:false,
					voice:false
				}
			},{
				key:'Delivered',
				value:'delivery_confirm',
				checkbox:{
					email:true,
					sms:false,
					voice:false
				}
			},{
				key:'Ready for Pickup',
				value:'package_pickup',
				checkbox:{
					email:true,
					sms:false,
					voice:false
				}
			}];

			$scope.emailRequired=false;
			$scope.checkEmail=function(isFirst){
				var counter=0;
				if(isFirst===true){
					angular.forEach($scope.alerts,function(obj){
						if(obj.checkbox.email===true){
							counter++;
						}
					});
				}
				if($scope.formObj.email!==undefined){
					Object.keys($scope.formObj.email).forEach(function(key){
						if($scope.formObj.email.hasOwnProperty(key) && $scope.formObj.email[key]===true){
							counter++;
						}
					});
				}
				if(counter>0){
					$scope.emailRequired=true;
				}else{
					$scope.emailRequired=false;
				}
			};

			$scope.smsRequired=false;

			$scope.smsCheck=function(){
				var counter=0;
				Object.keys($scope.formObj.sms).forEach(function(key){
					if($scope.formObj.sms.hasOwnProperty(key) && $scope.formObj.sms[key]===true){
						counter++;
					}
				});
				if(counter>0){
					$scope.smsRequired=true;
				}else{
					$scope.smsRequired=false;
				}
			};

			$scope.voiceRequired=false;
			$scope.voiceCheck=function(){
				var counter=0;
				Object.keys($scope.formObj.voice).forEach(function(key){
					if($scope.formObj.voice.hasOwnProperty(key) && $scope.formObj.voice[key]===true){
						counter++;
					}
				});
				if(counter>0){
					$scope.voiceRequired=true;
				}else{
					$scope.voiceRequired=false;
				}

			};
			$scope.languages=[{
				key:'United States - English',
				value:'en'
			}];
			if($scope.user.languages!==undefined && $scope.user.languages.length>0){
				angular.forEach($scope.user.languages,function(values){
					this.push(values);
				},$scope.languages);
			}

			$scope.mailReceiver=[{
				valueTo:'emailAddr',
				valueFrom:'sendEmail'
			}];

			$scope.formObj={};

            $scope.checkFormErrors = function() {
                if ($scope.formObj.email_address_0.$invalid) {
                    return true;
                }
                if ($scope.formObj.sendNameTo_0.$invalid) {
                    return true;
                }
                if ($scope.formObj.smsNumber.$invalid) {
                    return true;
                }
            }

			$scope.openTermsCondition=function(){
				UtilService.openTearmsAndConditions('https://www.ups.com/content/us/en/tracking/help/tracking/umc_deliveryalerts.html');
			};
			$scope.deleteRow=function(index){
				$scope.mailReceiver.splice(index,1);
			};
			$scope.addMoreMailers=function(){
				$scope.addClicked = false;
				if($scope.mailReceiver.length<5){
					$scope.mailReceiver.push({
						keyTo:'Email Address',
						valueTo:'emailAddr',
						keyFrom:'Send To Email',
						valueFrom:'sendEmail'
					});
				}
			};
			// Submit function saveAlertOption
			$scope.saveAlertOption=function(valid){
				//this.formObj.$setPristine();
				$scope.addClicked = true;
                $scope.clicked = true;
			};

		}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : pushNotificationCtrl
 * @description Controls the Push Notification flow
 * @template ups.ppc-mychoice-recievePushNotification.html
 */
	.controller('pushNotificationCtrl',[function(){

		}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : myChoiceUpdateNameCtrl
 * @description Controls the My Choice Update name flow
 * @template ups.ppc-mychoice-preference-updateMyName.html
 */
	.controller('myChoiceUpdateNameCtrl', ['$scope','PPCService','localStorageService','ModalService','$location','$rootScope','UtilService', function($scope,PPCService,localStorageService,ModalService,$location,$rootScope,UtilService){
            $scope.ModalService = ModalService;
            $scope.isMyChoice =localStorageService.get('active_user_info').user_type.mychoice;
			$scope.userInfo = localStorageService.get('active_user_info');
			$scope.activeUser = localStorageService.get('active_user_info');
			var nonUsMember = localStorageService.get('nonUsMember');
			$scope.addressFormObj = {};
			$scope.addressFormObj.obj = {};
			$scope.addressFormObj.first_name=$scope.activeUser.first_name;
	    	$scope.addressFormObj.obj.last_name=$scope.activeUser.last_name;

	    	var metaData = PPCService.getMetaData();


	    	$scope.$watch('addressFormObj.obj',function(newVal, oldVal){
	    		var urlVal = '/preferencePage/mychoice/ActivationExistingUsers';

	    		$scope.url = '';
	    		if(newVal.last_name !== $scope.activeUser.last_name){
	    			$scope.url = urlVal;
	    		}
	    		else if(newVal.country !== $scope.meta.country[0].code){
	    			$scope.url = urlVal;
	    		}
	    		else if(newVal.address1 !== $scope.activeUser.default_address.street){
	    			$scope.url = urlVal;
	    		}
	    		else if(newVal.city !== $scope.activeUser.default_address.city){
	    			$scope.url = urlVal;
	    		}
	    		else if(newVal.state_select !== $scope.activeUser.default_address.zip.split(' ')[0]){
	    			$scope.url = urlVal;
	    		}
	    		else if(newVal.zipcode !== $scope.activeUser.default_address.zip.split(' ')[1]){
	    			$scope.url = urlVal;
	    		}
	    		if(newVal.address2 !== '' && newVal.address2){
	    			if(newVal.address2 !== $scope.address2){
	    				$scope.url = urlVal;
	    			}
	    		}else {
		    			if(oldVal.address2){
		    			$scope.url = urlVal;
	    			}
	    		}
	    		if(newVal.address3 !== '' && newVal.address3){
	    			if(newVal.address3 !== $scope.address3){
	    				$scope.url = urlVal;
	    			}
	    		}else {
		    			if(oldVal.address3){
		    			$scope.url = urlVal;
	    			}
	    		}

	    	},true);



			$scope.verifyNow = function(){
	  			$location.path('/preferencePage/mychoice/authenticate');
	  		};
			$scope.saveChanges = function(){
		        $rootScope.addressForm = $scope.addressFormObj;
		        if($scope.url){
		        	$location.path($scope.url);
		        }
				this.ups_mychoiceform.$setPristine();
			};
			if($scope.activeUser.default_address){
				if($scope.activeUser.default_address.country === 'us'){
					$scope.isUS = true;
					}else{
					$scope.isUS = false;
					}
			}
			$scope.meta = {
				languages: metaData.languages,
				country: metaData.countries,
				suffixVals : metaData.suffix_options
			};

			function initFormFields(){
				var zipcodeArray = [];
				var startYear = 1985;
				var endYear = 2005;
				zipcodeArray = $scope.activeUser.default_address.zip.split(' ');

				$scope.addressFormObj.address0 = $scope.activeUser.default_address.street;
				$scope.addressFormObj.city = $scope.activeUser.default_address.city;
				$scope.addressFormObj.state = zipcodeArray[0];
				$scope.addressFormObj.zipCode = zipcodeArray[1];

				/**
				 * Self Invoking function to populate date of Birth drop down values
				 */
		  		    (function(){
		  		      for(var x=1;x<=31;x++){
		  		         $scope.Days.push({'value': x});
		  		      }
		  		      for(var y=startYear;y<=endYear;y++){
		  		         $scope.Years.push({'value': y});
		  		      }
		  		      for(var z=0;z<metaData.Months.length;z++){
		  		    	$scope.Months.push({'value':metaData.Months[z].month});
		  		      }
		  		    })();

		  		//$scope.addressFormObj.day = 'DD';
		  		$scope.Days.unshift({'value': 'DD'});
		  		$scope.Months.unshift({'value': 'MM'});
		  		$scope.Years.unshift({'value': 'YYYY'});
		  		$scope.addressFormObj.day = $scope.Days[0].value;
				$scope.addressFormObj.month = $scope.Months[0].value;
		  		$scope.addressFormObj.year = $scope.Years[0].value;
			}

            //Controls Address Validation Error Modal button in the Name and Address section
            //UIDEV Link: http://uidev.ups.com/ppcProfile.html#/preferencePage/mychoicePreference
            $scope.toggleModal = function(){
    			ModalService.open({
    				title:'We could not validate your address.',
    				content: '/app_assets/templates/ups.doa-addressValidationErrorModal.html',
    				//controller:'ConfirmationCtrl',
    				component: 'doa'});
    		};

			function init(){
				$scope.Days = [];
				$scope.Years = [];
				$scope.Months = [];

				$scope.addressFormObj.name_suffix = $scope.meta.suffixVals[0].value;
				$scope.addressFormObj.country = $scope.meta.country[0].code;

				if(nonUsMember){
                $scope.addressFormObj.country='af';
				}else{
                $scope.addressFormObj.country='us';

				}
				//$scope.addressFormObj.state_select = 'Select One';
				$scope.addressFormObj.language =  $scope.meta.languages[0].value;

				initFormFields();
			}
			init();


			$scope.populateDateVal = function(month, year,dayVal) {
		     if(month !== 'MM' && year !== 'YYYY'){

		    	var dat = new Date('1 ' + month + ' '+year);
			    month = dat.getMonth();

		    	var date = new Date(year, month, 1);
		        var days = [];

		         while (date.getMonth() === month) {
		            days.push(new Date(date));
		            date.setDate(date.getDate() + 1);
		         }
		         $scope.Days = [];
		         for(var x=1;x<=days.length;x++){
	  		         $scope.Days.push({'value': x});
	  		      }
		         $scope.Days.unshift({'value': 'DD'});
			  	 $scope.addressFormObj.day = dayVal;
				}
		    };

		    $scope.$on('preferenceChange', function(){
				if($rootScope.prefVal === '1'){

			    	UtilService.mockServiceCalls({
		                urlString : 'ups.doa-success-social-fb-PrefVacation.json'
		            }, function(response) {
		                var obj = response.data;
		                if (!obj.errorCode) {
		                    $scope.activeUser = obj;
		                    $scope.addressFormObj = {};
		                    $scope.addressFormObj.first_name=$scope.activeUser.first_name;
					    	$scope.addressFormObj.obj.last_name=$scope.activeUser.last_name;
		                    init();
		                }
		            });

				}else{
					$scope.activeUser = {};
					$scope.isMyChoice =localStorageService.get('active_user_info').user_type.mychoice;
					$scope.userInfo = localStorageService.get('active_user_info');
					$scope.activeUser = localStorageService.get('active_user_info');

					$scope.addressFormObj = {};
					$scope.addressFormObj.first_name=$scope.activeUser.first_name;
			    	$scope.addressFormObj.obj.last_name=$scope.activeUser.last_name;

			    	init();
				}
			});
			if($rootScope.addressForm){
				var data ={};
				angular.extend(data, $rootScope.addressForm);
				$scope.addressFormObj = data;
				$scope.address2 = data.obj.address2;
				$scope.address3 = data.obj.address3;
				$rootScope.addressForm=null;
			}
		}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : myChoiceAddNameCtrl
 * @description Controls the My Choice Add name flow
 * @template ups.ppc-mychoice-preference-addFirstName.html
 */
.controller('myChoiceAddNameCtrl', ['$scope', 'UtilService','$location','addnameService',function($scope, UtilService,$location,addnameService){
	/**
	* @function
	* @name init
	* @description Used to initialize the variables
	*/
	function init(){
		var name = addnameService.getNames();
		$scope.nameReceiver = angular.copy(name);
	}

	/**
	* @function
	* @name helpLink
	* @description Help link for nickanames
	*/
	$scope.helpLink = function(){
		UtilService.openTearmsAndConditions('https://www.ups.com/content/us/en/tracking/help/tracking/nicknames.html');
	};

	/**
	* @function
	* @name deleteRow
	* @description Deletes name variation row
	*/
	$scope.deleteRow=function(index){
		$scope.nameReceiver.splice(index,1);
	};

	/**
	* @function
	* @name addNameVariation
	* @description Add row for name variation maximum 10 length
	*/
	$scope.addNameVariation = function(){
		if($scope.nameReceiver.length<10){
			$scope.nameReceiver.push({
				'nameVar' : ''
			});
		}
	};

	/**
	* @function
	* @name saveChanges
	* @description On click of save changes it redirects to verify authentication page
	*/
	$scope.saveChanges=function(){
		addnameService.addName($scope.nameReceiver);
		$location.path('/preferencePage/mychoice/authenticate');
	};

	init();
}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : verifyAuthenticationCheckCtrl
 * @description Controls the Verify Authenticate Check flow
 * @template ups.ppc-myChoice-verifyAuthentication_process.html
 */
	.controller('verifyAuthenticationCheckCtrl',['$scope','$controller','UtilService',function($scope,$controller,UtilService){
		$controller('verifyCurrentAuthCtrl', {$scope: $scope});
		$scope.showQNPBirthday=false;
		$scope.formObj={};
		$scope.formArray=[];
		$scope.form={};

		$scope.Days = [];
		$scope.Years = [];
		$scope.Months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
		var startYear = 1900;
		var endYear = 2011;
		(function(){
			for(var x=1;x<=31;x++){
			 $scope.Days.push(x);
			}
			for(var y=startYear;y<=endYear;y++){
			 $scope.Years.push( y);
			}

	    })();

  		//$scope.addressFormObj.day = 'DD';
  		$scope.Days.unshift('DD');
  		$scope.Months.unshift('MM');
  		$scope.Years.unshift('YYYY');
  		$scope.addressFormObj={};
  		$scope.addressFormObj.day = $scope.Days[0];
		$scope.addressFormObj.month = $scope.Months[0];
  		$scope.addressFormObj.year = $scope.Years[0];
		$scope.populateDateVal = function(month, year) {
		     if(month !== 'MM' ){
		    	if(month==='JAN' || month==='MAR' || month==='MAY' || month==='JUL' || month==='AUG' || month==='OCT' || month==='DEC'){
		    		if($scope.Days.length<32){
		    			$scope.Days.push(31);
		    		}
		    	}else if(month==='APR' || month==='JUN' || month==='SEP' || month==='NOV' ){
		    		if($scope.Days.length>31){
		    			$scope.Days.splice($scope.Days.length,0);
		    		}
		    	}else{
		    		if(year !=='MM' && year%4===0){
		    			if($scope.Days.length===29){
		    				$scope.Days.push(29);
		    			}else if($scope.Days.length>29){
		    				$scope.Days.splice(30,3);
		    			}
		    		}else{
		    			$scope.Days.splice(29,3);
		    		}
		    		if(!isNaN($scope.addressFormObj.day) && Number($scope.addressFormObj.day)>28){
		    			$scope.addressFormObj.day = $scope.Days[0];
		    		}
		    	}
			}
	    };
	    $scope.checkAgeLimit=0;
	    $scope.checkAge=function(){
	    	var yearLimit=new Date().getFullYear()-18;
	    	if($scope.addressFormObj.month === 'MM' || $scope.addressFormObj.year === 'YYYY' || $scope.addressFormObj.day=== 'DD'){
	    		$scope.checkAgeLimit=1;
	    	}else if( (Number($scope.addressFormObj.year)>yearLimit) ||( new Date(Number($scope.addressFormObj.year), ($scope.Months.indexOf($scope.addressFormObj.month)-1), Number($scope.addressFormObj.day)) > new Date(yearLimit, ($scope.Months.indexOf($scope.addressFormObj.month)-1), Number($scope.addressFormObj.day)))) {
	    		$scope.checkAgeLimit=2;
	    	}else{
	    		$scope.checkAgeLimit=0;
	    	}
	    };
 		$scope.openLink=function(){
 			UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/tracking/help/tracking/date_of_birth.html');
 		};
 		$scope.generateQuiz=function(){
			$scope.errorQuizMessage='The system is unavailable at this time. Please try again later.';
			$scope.showQNPBirthday=true;
			$scope.showQuestions=false;
			$scope.showGenerateQuiz=false;
		};

		$scope.generateMoreQuiz=function(){
			//console.log($scope.formObj.dateFrom);
			$scope.checkAge();
			if($scope.checkAgeLimit===0 ){
				$('.tab-header[data-open="false"]').click();
			}
		};

	}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : verifyAuthenticationMailCtrl
 * @description Controls the Verify Authenticate mail flow
 * @template ups.ppc-myChoice-verifyAuthentication_mailProcess.html
 */
	.controller('verifyAuthenticationMailCtrl',['$scope','$location','ModalService','UserService','$rootScope',function($scope,$location,ModalService,UserService,$rootScope){
		$scope.user = UserService.getActiveUserInfo();
		$scope.verifyActivation={
			code:''
		};
		$scope.openCancelPopUp=function(){
			var values={
				title:'Are you sure?',
				content:'/app_assets/templates/ups.ppc-myChoice-verifyAuthentication-cancelModal.html',
				component: 'ppc'//html file/url
			};
			ModalService.open(values, function(sc){
				sc.enrollmentType=$scope.user.enrollmentType;
				sc.redirectToUserType = function(){
					if($scope.user && $scope.user.enrollmentType && $scope.user.enrollmentType==='accelrated'){
						window.location.href='https://www.ups.com';
					}else{
						//$location.path('/preferencePage/mychoicePreference');
						window.location.href='/ppcProfile.html#/preferencePage/mychoicePreference';
					}
					sc.cancel();
				};
				sc.openCancellation=function(){
					ModalService.close();
				};
			});
		};

		$scope.errorFound=false;

		$scope.checkValue=function(){
			if($scope.verifyActivation.code==='' || $scope.verifyActivation.code===undefined){
				$scope.errorFound=true;
			}else{
				$scope.errorFound=false;
			}
		};

		if($scope.user.verifiedUser===true){
			window.location.href='/ppcProfile.html#/preferencePage/mychoicePreference';
		}

		$scope.requestOTP=function(){
			$location.path('/preferencePage/mychoice/authenticate');
		};

		$scope.verifyNow=function(){
			//console.log($scope.code);
			if($scope.user.user_type.locale.inCountry===true){
				if($scope.code==='12345'){
					$scope.errorText='';
					$rootScope.parentPage = 'chooseAddress';
		    		var modal = {
		    			title: 'Choose your address.',
						content: '/app_assets/templates/ups.ppc-chooseaddressModal.html'
					};
					ModalService.open(modal,function() {
						//initializeAddressvalues();
					});
				}else{
					$scope.errorText='Too much time has passed since the PIN was sent to you. You will need to get a new PIN';
				}
			}else{
				$scope.errorText='Too much time has passed since the PIN was sent to you. You will need to get a new PIN';
			}
		};

	}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : verifyAuthenticationMailVerifyCtrl
 * @description Controls the Verify Authenticate mail flow
 * @template ups.ppc-myChoice-verifyAuthentication_mailVerify.html
 */
	.controller('verifyAuthenticationMailVerifyCtrl',['$scope','ModalService','$location','UserService',function($scope,ModalService,$location,UserService){

			$scope.user=UserService.getActiveUserInfo();
			$scope.openCancelPopUp=function(){
				var values={
					title:'Cancel UPS My Choice Enrollment ?',
					content:'/app_assets/templates/ups.ppc-myChoice-verifyAuthentication-cancelModal.html',
					component: 'ppc'//html file/url
				};
				ModalService.open(values, function(sc){
					sc.enrollmentType=$scope.user.enrollmentType;
					sc.redirectToUserType = function(){
						if($scope.user && $scope.user.enrollmentType && $scope.user.enrollmentType==='accelrated'){
							window.location.href='https://www.ups.com';
						}else{
							window.location.href='/ppcProfile.html#/preferencePage/mychoicePreference';
						}
						sc.cancel();
					};
					sc.openCancellation=function(){
						ModalService.close();
					};
				});
			};

	}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : verifyAuthenticationFailedCtrl
 * @description Controls the Verify Authenticate Failed flow
 * @template ups.ppc-myChoice-verifyAuthentication_failed.html
 */
	.controller('verifyAuthenticationFailedCtrl',['$scope',function($scope){
		$scope.error='Error message place holder.';
		$scope.returnBack=function(){

		};
	}])
/**
 * @controller
 * @name upsDOApp.controllers.controller : verifyCurrentAuthCtrl
 * @description Controls the Verify Authenticate flow
 * @template ups.ppc-myChoice-verifyAuth.html
 */
	.controller('verifyCurrentAuthCtrl',['$scope','ModalService','UserService','$location',function($scope,ModalService,UserService,$location){
		$scope.user = UserService.getActiveUserInfo();
        $scope.myChoiceLite = false;

		$scope.formObj={};
		//$scope.otpForm={};
		$scope.verifyAuth={
			txtmsg:true,
			vcemsg:false
		};

		$scope.tabs= $('.ups-tabs').upsTabs({});

		$scope.isError=false;
		$scope.isOTPProcess=false;
		$scope.sendOTPCode=function(){
			$scope.isOTPProcess=true;
		};

		$scope.otp={
			otpNumber:''
		};

		$scope.resendOTP=function(){
			$scope.otp.otpNumber='';
			$scope.isOTPProcess=false;
			$scope.isError=false;
		};

		$scope.submitOTPCode=function(){
			if(!isNaN($scope.otp.otpNumber) && Number($scope.otp.otpNumber)===12345){
				$scope.isError=false;
				$scope.errorOTPText='';
				$location.path('/preferencePage/mychoicePreference');
			}else{
				$scope.isError=true;
				$scope.errorOTPText='This PIN is not valid. Please check the number and try again.';
			}
		};

		$scope.showGenerateQuiz=false;
		$scope.showQuestions=true;
		$scope.errorQuizMessage='We were unable to verify your identity by phone. Please generate a quiz to continue.';
		$scope.validateQuiz=function(){
			$scope.showQuestions=false;
			$scope.showGenerateQuiz=true;
		};

		$scope.generateQuiz=function(){
			$scope.errorQuizMessage='The system is unavailable at this time. Please try again later.';
		};

		$scope.openCancelPopUp=function(){
			var values={
				title:'Are you sure?',
				content:'/app_assets/templates/ups.ppc-myChoice-verifyAuthentication-cancelModal.html',
				component: 'ppc'//html file/url
			};
			ModalService.open(values, function(sc){
				sc.enrollmentType=$scope.user.enrollmentType;
                sc.myChoiceLite = $scope.myChoiceLite;
				sc.redirectToUserType = function(){
					if($scope.user && $scope.user.enrollmentType && $scope.user.enrollmentType==='accelrated'){
						window.location.href='https://www.ups.com';
					}else{
						window.location.href='/ppcProfile.html#/preferencePage/mychoicePreference';
					}
					sc.cancel();
				};
				sc.openCancellation=function(){
					ModalService.close();
				};
			});
		};

		$scope.showQuestions=true;
		$scope.isPhoneNumber=false;
		$scope.checkPhoneNumber=function(){
			if($scope.user.phone==='' || $scope.user.phone===undefined){
				$scope.isPhoneNumber=true;
				$scope.errorPhoneText='The phone number you entered isn\'t a valid phone number.';
			}else{
				$scope.isPhoneNumber=false;
				$scope.errorPhoneText='';

			}
		};
	}]).controller('myChoiceReactivate', ['$scope', '$location', 'UserService', function (scope, location, userService) {
		scope.user = userService.getActiveUserInfo();

		scope.updatePreferences = function () {
			location.path('/preferencePage/mychoicePreference');
		};
	}]).controller('myChoiceCancelBasic', ['$scope', 'UserService', function (scope, userService) {
		scope.user = userService.getActiveUserInfo();
	}]).controller('myChoiceCancelPremium', ['$scope', '$location', 'UserService', function (scope, location, userService) {
		scope.user = userService.getActiveUserInfo();

		scope.reactivateMembership = function () {
			location.path('/preferencePage/mychoice/membershipReactivate');
		};
	}]);
