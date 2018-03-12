'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module and store in the variable 'app'
 */
	var app = angular.module('upsDOApp.controllers');

/**
 * @controller
 * @name upsDOApp.controllers.controller : SignupCtrl
 * @description Controls the Open Account flow
 * @template : ups.doa-sign-up.html and ups.doa-signupModal.html
 */
	app.controller('SignupCtrl', ['$scope','ModalService','localStorageService','$window', function($scope,ModalService,localStorageService,$window) {
		/**
		 * @desc Opens signup modal
		 * @type defines different entry points defined for multiple scenarios
		 */
		$scope.toggleModal = function(type){
			ModalService.open({
				title:'Sign up.',
				content: '/app_assets/templates/ups.doa-signupModal.html',
				component: 'doa'
			},function(sc) {
				sc.formInputType = type;
				sc.offerscheckBox = function(val, code){
	        		if (val === true && code === 13) {
	        			sc.offerscheckBoxvalue = true;
	        			for(var i in sc.formObj.email_offers){
	        				sc.formObj.email_offers[i] =true;
	        			}
	        		}else{
	        			sc.offerscheckBoxvalue = false;
	        		}
	        	};
	        	sc.redirectToProfile = function(obj){
	        		localStorageService.set('Redirect',{'RedirectFrom':obj});
	        		var url = 'http://' + $window.location.host +'/ppcProfile.html#/profilePage';
	        			$window.location = url;
	        	};
			});
		};
	}]);


	/**
	 * @controller
	 * @name upsDOApp.controllers.controller : StandaloneSignupCtrl
	 * @description Standalone Sign Up Flow
	 * @template : ups.doa-sign-up.html and ups.doa-signupModal.html
	 */
		app.controller('StandaloneSignupCtrl', ['$scope', '$rootScope', '$window', 'NotificationService', 'UtilService', '$location','ModalService','localStorageService', function($scope,$rootScope,$window, notification, UtilService, $location,ModalService,localStorageService) {
			// REQUEST URLS
			var submitRequestURL = 'ups.doa-success-onsubmit.json';
			var signUpValuesURL = 'ups.doa-signup.json';
			// END REQUEST URLS

			submitRequestURL = 'ups.doa-success-onsubmit.json';
			signUpValuesURL = 'ups.doa-signup.json';

			$scope.ModalService = ModalService;
			$scope.redirectToMyProfile = function(obj){
				localStorageService.set('Redirect',{'RedirectFrom':obj});
        			var url = 'http://' + $window.location.host +'/ppcProfile.html#/profilePage';
        			$window.location = url;
			};

			$scope.$on('handleError', function(ev, errors){
		    	// Handle Errors
		    	$scope.errorList = errors;
		    });
			$scope.$on('hideSocial', function(){
            	$scope.hideInfo = false;
        	});

        	$scope.$on('socialDataLoaded', function(ev, obj){
        		if(obj){
        			$scope.formObj = obj;
        			$scope.formObj.isSocialLogin = true;
        			$scope.isSocialLogin = true;
                    $scope.hideHeader=false;
        		}
        	});
        	// End Social


    		function resetForm(){
        	 	$scope.formObj = {};

        	 	$scope.formObj = {
        			email_offers : []
        		};
              //  $scope.pswdValid=false;
                $scope.hideInfo = true;
        	    $scope.inputType = 'password';
        	 	$scope.finalFormObj = {};
        	    $scope.onConfirm = false;
        	    $scope.isUS = true;
        		$scope.offer$scopeheckBoxvalue = false;
        		$scope.signupmessage = undefined;
        		$scope.uidSuggestions = undefined;
        		$scope.number=false;
        		$scope.lowercase=false;
        		$scope.special=false;
        		$scope.uppercase=false;
        		$scope.character=false;
        		$scope.noSpace=false;
        		$scope.noEmail=false;
        		$scope.noSpecialChar=false;
        		$scope.check=false;
        		$scope.isSocialLogin = false;
        		$scope.phoneType = ['Mobile','Home','Work','Other'];
        		$scope.type = ['Mobile','Home','Work','Other'];
        		$scope.tags = {
        	        templateUrl : 'userIdHintPopover.html',
        	        position : 'top'
        	    };

                $scope.passwordTags = {
        	        templateUrl : 'passwordHintPopover.html',
        	        position : 'top'
        	    };

                $scope.$watch('windowWidth', function(windowWidth){
                    if (windowWidth) {
                        if (windowWidth > 991) {
                            $scope.tags.position = 'right';
                            $scope.passwordTags.position = 'right';
                        } else {
                            $scope.tags.position = 'top';
                            $scope.passwordTags.position = 'top';
                        }
                    }
                });


        	}

    		// Social
        	$scope.myKeyPress = function($event) {
        		var keyCode = $event.which || $event.keyCode;
        		if(keyCode === 13) {
        			$scope.socialNetworkingForms();
        		}
        	};
        	// Function start
        	$scope.submitForm = function(isValid, form){
        		if (isValid) {
        			UtilService.mockServiceCalls({urlString: submitRequestURL}, function(response){
        				var obj = response.data;
        				if(obj.errorCode){
        					notification.handleError(obj);
        				} else {
        					notification.handleError();
        					if(obj.uid.indexOf($scope.formObj.userId)!==-1){
        						$scope.uidIsValid = true;
        						$scope.uidSuggestions = undefined;
        						$scope.uidCheck = false;
        						$scope.finalFormObj = UtilService.mergeNames($scope.formObj); // copy values to final obj
        						$rootScope.finalFormObj = $scope.finalFormObj;
								if ($scope.nonUniqueEmailPanel) {
        							$scope.finalFormObj.nonUniqueEmailConfirmation = true;
								}
        						if($rootScope.finalFormObj.email === 'test@email.com' && !$rootScope.finalFormObj.isSocialLogin){
        							$rootScope.finalFormObj.isNonUniqueEmail = true;
        						}else{
        							$rootScope.finalFormObj.isNonUniqueEmail = false;
        						}

        						if($location.path() ===  '/signup'){
        							$location.path('/signup/confirmation');
        						} else{
        							ModalService.next({
    			    					title: 'Welcome, '+ $scope.finalFormObj.first_name +'.',
    			    					content: '/app_assets/templates/ups.doa-ConfirmationModal.html'
    			        			});
        						}
        					}else{
        						if($scope.uidsuccess===true){
        							$scope.uidIsValid = true;
        							$scope.uidSuggestions = undefined;
        							$scope.uidCheck = false;
        							$scope.finalFormObj = UtilService.mergeNames($scope.formObj); // copy values  to final obj
        							ModalService.next({
    			    					title: 'Welcome, '+ $scope.finalFormObj.first_name +'.',
    			    					content: '/app_assets/templates/ups.doa-ConfirmationModal.html',
        								data: 'confirm'
    			        			});
        						}else{
        							$scope.uidSuggestions = obj.uid;
        							$scope.uidIsValid = false;
        							$scope.uidCheck = false;
        						}
        					}
        				}
        				if (form) {
        			    	form.$setPristine();
        			    	form.$setUntouched();
        			    }
        			});
        		} else{
        			// invalid form
        		}
        	};

        	$scope.toggleUID = function(uidCheck){
        		if(!uidCheck){
        			$scope.uidIsValid = false;
        			$scope.formObj.userId = undefined;
        		}
        	};

        	//userID selected and value form is set as valid
        	$scope.userIdChanged = function(){
        		if($scope.formObj.userId!==undefined){
        			$scope.uidIsValid = true;
        		}
        	};

			$scope.standaloneNonUniqueEmailPanel = function() {
				if($scope.Standalone === true){
					$scope.nonUniqueEmailPanel = true;
				}
			};

        	$scope.selectFocus = function($event){
        		if($event.currentTarget.tagName === 'SELECT'){
        			$event.currentTarget.parentElement.classList.add('selectFocus');
        		}else{
        			$('.ups-dropdown_wrapper.ups-input_wrapper').removeClass('selectFocus');
        		}
        	};

        	$scope.redirectToProfile = function(obj){

        		localStorageService.set('Redirect',{'RedirectFrom':obj});
        		var url = 'http://' + $window.location.host +'/ppcProfile.html#/profilePage';
        			$window.location = url;
        	};

        	$scope.offerscheckBox = function(val, code){
        		if (val === true && code === 13) {
        			$scope.offerscheckBoxvalue = true;
        			for(var i in $scope.formObj.email_offers){
        				$scope.formObj.email_offers[i] =true;
        			}
        		}else{
        			$scope.offerscheckBoxvalue = false;
        		}
        	};

        	$scope.openTermsAndConditions = function(){
        		UtilService.openTearmsAndConditions($scope.signupDefault.tnc);
        	};

        	// user id check
        	$scope.validEmailContent=true;

            $scope.useridCheck = function(userId){

				//Experimenting with Standalone and making the check marks appear
				if($scope.Standalone === true){
					$scope.noSpace = true;
					$scope.noEmail = true;
					$scope.noSpecialChar = true;
				} else {
					$scope.noSpace = false;
					$scope.noEmail = false;
					$scope.noSpecialChar = false;
				}

                var userIdVal= userId.target.value;
                $scope.errorEmail='';
        		$scope.noSpace=false;
                $scope.noSpecialChar=false;
                $scope.noEmail=false;
                $scope.emptyVal=false;
                if(userId.target.value===''|| userId.target.value.length===0){
                    $scope.emptyVal=false;
                }else{
                    $scope.emptyVal=true;
                }
                if (userIdVal === '' || /^[_a-zA-Z0-9-]+(\.[_a-zA-Z0-9-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{1,})$/.test(userIdVal)) {
    				$scope.noEmail=false;
    			}else{
    				$scope.noEmail=true;
        		}
        		if(!$scope.emptyVal || userIdVal.indexOf(' ')>-1 )
				{ // 4!==-1
                    $scope.noSpace=false;
                }else{
                    $scope.noSpace=true;
                }
        		if(userIdVal === '' || /[:;<>"&%\\]/.test(userIdVal)) {
                    $scope.noSpecialChar=false;
                }else{
                    $scope.noSpecialChar=true;
                }
                if( $scope.noSpecialChar===true && $scope.noSpace===true && $scope.noEmail===true && $scope.emptyVal===true){
                    $scope.validEmailContent=true;
                    //$scope.errorEmail='';
                }else{
                    $scope.validEmailContent=false;
                }
        	};

            $scope.errorEmail='User ID is required.';
            $scope.errorMsg=function(userId){
                if(userId.target.value.length===0){
                    $scope.errorEmail='User ID is required.';
                }else if($scope.validEmailContent===false){
                    $scope.errorEmail='Please enter a valid user ID.';
                }else{
                    $scope.errorEmail='';
                }
            };
        	$scope.redirectToLoginForm = function(){
        		var url = '';
        		if($location.path() ===  '/signup'){
        			url = 'http://' + $window.location.host +'/ppcProfile.html#/login';
        			$window.location = url;
        		}else{
        			url = 'http://' + $window.location.host +'/ppcProfile.html#/login';
        			$window.location = url;
        		}
        	};

        	// password
            $scope.validContent=true;
            $scope.passwordValidation = function(pswd){
                var passwordVal= pswd.target.value;
                $scope.pswdLength=true;
                $scope.emptyPswd=true;
                $scope.number=false;
                $scope.lowercase=false;
                $scope.uppercase=false;
                $scope.special=false;
                var isValidChar=true;
                if(passwordVal==='' || passwordVal.length ===0){
                    $scope.emptyPswd=false;
                }else{
                    $scope.emptyPswd=true;
                }
                if (passwordVal !== '' && /[0-9]/.test(passwordVal)) {
                    $scope.number=true;
                }else{
                    $scope.number=false;
                }
                if (passwordVal !== '' && /[a-z]/.test(passwordVal)) {
                    $scope.lowercase=true;
                }else{
                    $scope.lowercase=false;
                }
                if (passwordVal !== '' && /[A-Z]/.test(passwordVal)) {
                    $scope.uppercase=true;
                }else{
                    $scope.uppercase=false;
                }
                if (passwordVal !== '' && /[!@#$*&%]/.test(passwordVal)) {
                    $scope.special=true;
                }else{
                    $scope.special=false;
                }
                if(passwordVal === '' || /[`~^()_+={}|:';\[\]\\"<>,.?/-]/.test(passwordVal)){
                    $scope.special=false;
                    isValidChar=false;
                }
                if(passwordVal.length <7 || passwordVal.length >26){
                    $scope.pswdLength=false;
                }else{
                    $scope.pswdLength=true;
                }
                if(isValidChar===true && $scope.pswdLength===true && $scope.emptyPswd===true && (
                    ($scope.number===true && $scope.lowercase===true && $scope.uppercase===true) ||
                    ($scope.number===true && $scope.lowercase===true && $scope.special===true) ||
                    ($scope.number===true && $scope.special===true && $scope.uppercase===true) ||
                    ($scope.lowercase===true && $scope.special===true && $scope.uppercase===true) )){
                    $scope.validContent=true;
                }else{
                    $scope.validContent=false;
                }

                if(passwordVal.indexOf($scope.formObj.first_name) !== -1 ){
                    $scope.check=true;
                }else if(passwordVal.indexOf($scope.formObj.email) !== -1 ){
                    $scope.check=true;
                }else if(passwordVal.indexOf($scope.formObj.last_name) !== -1 ){
                    $scope.check=true;
                }else if(passwordVal.indexOf($scope.formObj.userId) !== -1 ){
                    $scope.check=true;
                }else{
                    $scope.check=false;
                }
            };

                $scope.errorPswd='Password is required.';
            $scope.errorPassword=function(password){
                var passwordVal= password.target.value;
                if(passwordVal.length===0){
                    $scope.errorPswd='Password is required.';
                }else if($scope.validContent===false){
                    $scope.errorPswd='Please enter a valid password.';
                }else{
                    $scope.errorPswd='';
                }
            };

        	$scope.redirectToProfile = function(obj){
        		console.log(obj);
        		localStorageService.set('Redirect',{'RedirectFrom':obj});
        		var url = 'http://' + $window.location.host +'/ppcProfile.html#/profilePage';
    			$window.location = url;
        	};

        	$scope.showHide= function($event){

        		var element= $($event.currentTarget);
        		if(element.text()==='Show'){
					element.parent().find('.ups-readerTxt').text('password');
					element.parent().find('input[type=password]').prop('type','text');
					element.text('Hide');
        			$scope.inputType ='text';
        		}
        		else{
					element.parent().find('.ups-readerTxt').text('password in plain text');
					element.parent().find('input[type=text]').prop('type','password');
					element.text('Show');
        			$scope.inputType ='password';
        		}
        	};

        	//Init
        	(function(){

                $scope.hideHeader = true;
        		$scope.formObj = {
        			email_offers : []
        		};
                $scope.inputType = 'password';

                $scope.uidsuccess=false;
        		// reset all values
        		$rootScope.socialFail = false;
        	 	resetForm();

        	 	if(!$scope.formInputType){
        	 		$scope.formInputType = 'us';
        	 	}
        	 	$scope.isEU = false;
        	 	switch($scope.formInputType){
        	 		case 'us':
        			break;
        			case 'us-fail':
        	    		submitRequestURL = 'ups.doa-fail-onsubmit.json';
        			break;
        			case 'nonus':
        				$scope.isUS = false;
        			break;
        			case 'eu':
        				$scope.isUS = false;
        				$scope.isEU = true;
        			break;
        			case 'nonus-fail':
        	    		$scope.isUS = false;
        	    		submitRequestURL = 'ups.doa-fail-onsubmit.json';
        			break;
        			case 'uid':
        				$scope.uidsuccess=true;
        			break;
        			case 'social-fail':
        				$rootScope.socialFail = true;
        			break;
        			case 'social':
        			break;
					case 'nonUniqueEmail':
						$scope.nonUniqueEmailPanel = true;
					break;
					case 'onboardingFlowSignUp':
						$scope.onboardingFlowSignUp = true;
					break;
        		}

                if($location.path() ===  '/signup'){
            		$scope.Standalone = true;
            		resetForm();
            	}else {
            		$scope.Standalone = false;
            	}
        		UtilService.mockServiceCalls({urlString: signUpValuesURL}, function(response){
            		var obj = response.data;
            		if(obj.errorCode){
            			notification.handleError(obj);
            		} else{
            			$scope.signupDefault = obj.default;
            			$scope.socialData = obj.social;
            			$scope.suffixVals = obj.default.suffix_options;
            		}
            	});

        	})();

		}]);

/**
 * @controller
 * @name upsDOApp.controllers.controller : guestCtrl
 * @description Controls Guest Shipping Controller.
 * @template : ups.doa-FromGuestShipping.html and ups.doa-openAccount-fail.html
 */
	app.controller('guestCtrl', ['$scope','ModalService', function ($scope,ModalService) {
		$scope.ModalService = ModalService;
		$scope.toggleModal = function(){
			ModalService.open({
				title:'Welcome, John.',
				content: '/app_assets/templates/ups.doa-guestShippingModal.html',
				controller:'ConfirmationCtrl',
				component: 'doa'}, function(sc){
				console.log(sc);
			});
		};
	}]);
/**
 * @controller
 * @name upsDOApp.controllers.controller : AddressValidationErrorCtrl
 * @description Controls Address Validation Error Controller.
 * @template : ups.doa-upsaddressvalidationerror.html
 */
    	app.controller('AddressValidationErrorCtrl', ['$scope','ModalService', function ($scope,ModalService) {
    		$scope.ModalService = ModalService;
    		$scope.toggleModal = function(){
    			ModalService.open({
    				title:'We could not validate your address.',
    				content: '/app_assets/templates/ups.doa-addressValidationErrorModal.html',
    				//controller:'ConfirmationCtrl',
    				component: 'doa'}, function(sc){
    				console.log(sc);
    			});
    		};
    	}]);
/**
 * @controller
 * @name upsDOApp.controllers.controller : schedulePickupCtrl
 * @description Controls the Open Account flow
 * @template : ups.doa-FromGuestShipping.html and ups.doa-openAccount-fail.html
 */
    app.controller('schedulePickupCtrl', ['$scope','ModalService', function ($scope,ModalService) {
        $scope.ModalService = ModalService;
        $scope.toggleModal = function(){
            ModalService.open({
                title:'Welcome, John.',
                content: '/app_assets/templates/ups.doa-schedulePickupModal.html',
                controller:'ConfirmationCtrl',
                component: 'doa'}, function(sc){
                console.log(sc);
            });
        };
    }]);

/**
 * @controller
 * @name upsDOApp.controllers.controller : QuantumViewOptionsModalCtrl
 * @description Controls Quantum View Options Modal Controller.
 * @template : ups.doa-quantumViewOptionsModal.html
 */
    	app.controller('QuantumViewOptionsModalCtrl', ['$scope','ModalService', function ($scope,ModalService) {
    		$scope.toggleModal = function(){
    			ModalService.open({
    				title:'Set your Quantum View options.',
    				content: '/app_assets/templates/ups.doa-quantumViewOptionsModal.html',
    				component: 'doa'}, function(sc){
    				console.log(sc);

                    sc.quantumViewSelections = [
                        {
                            'id':'0',
                            'quantumViewSelectionsLabel':'Quantum View Manage',
                            'selected' : false
                        },
                        {
                            'id':'1',
                            'quantumViewSelectionsLabel':'Quantum View Data',
                            'selected' : false
                        },
                        {
                            'id':'2',
                            'quantumViewSelectionsLabel':'UPS Delivery Intercept (Available for US/PR accounts only.)',
                            'selected' : false
                        },
                        {
                            'id':'3',
                            'quantumViewSelectionsLabel':'Security Features',
                            'selected' : false
                        }
                    ];
                    // sc.closeModal = function () {
            		// 	ModalService.dismiss();
            		// };
                    /*sc.ups_quantumViewOptionModal = {
                        'ups_company_name_input':'',
                        quantumViewCheckboxes : ''
                    };*/
                    sc.formObj = {};
                    // sc.requestReactivationCodeModalForm = {
                    //     sendByRadio : ''
                    // };
                    sc.cancel = function() {
                        ModalService.dismiss();
                    };
                    sc.submitBtn = function(valid) {
                        sc.clicked = true;
                        if(valid) {
                            ModalService.dismiss();
                        }
                    };
                    sc.checkFormErrors = function() {
                        if (!sc.formObj.ups_quantumViewOptionModalForm.$valid || !sc.checkOneQVAppServiceChecked()) {
                            return true;
                        }

                        return false;
                        /*if (sc.formObj.ups_quantumViewOptionModal.quantumViewCheckboxes == '') {
                            return true;
                        }*/
                    }

                    //check if at least one of the quantum view checkboxes is checked
                    sc.checkOneQVAppServiceChecked = function () {
                        for (var m = 0; m < sc.quantumViewSelections.length; m++) {
                            if (sc.quantumViewSelections[m].selected) {
                                return true;
                            }
                        }

                        return false;
                    }

                    //check if at least one of the quantum view checkboxes was touched
                    sc.checkOneQVAppServiceTouched = function () {
                        //console.log(sc.quantumViewSelections);
                        //console.log(sc.formObj);
                        for (var v = 0; v < sc.quantumViewSelections.length; v++) {
                            if (sc.formObj.ups_quantumViewOptionModalForm['ups_quantumViewOption' + v].$touched) {
                                return true;
                            }
                        }

                        return false;
                    }

    			});
    		};
    	}]);
/**
 * @controller
 * @name upsDOApp.controllers.controller : fromExistingUserCtrl
 * @description Controls the Open Account flow
 * @template : ups.doa-FromExistingUser.html
 */
    app.controller('fromExistingUserCtrl', ['$scope','ModalService', function ($scope,ModalService) {
        $scope.ModalService = ModalService;
        $scope.toggleModal = function(){
            ModalService.open({
                title:'Your account is ready to use, John.',
                content: '/app_assets/templates/ups.doa-existingUserModal.html',
                controller:'ConfirmationCtrl',
                component: 'doa'}, function(sc){
                console.log(sc);
            });
        };
    }]);

/**
 * @controller
 * @name upsDOApp.controllers.controller : schedulePickupCtrl
 * @description Controls the Open Account flow
 * @template : ups.doa-FromGuestShipping.html and ups.doa-openAccount-fail.html
 */
    app.controller('newpasswordCtrl', ['$window','$scope','ModalService', function ($window, $scope,ModalService) {
        $scope.ModalService = ModalService;
        $scope.toggleModal = function(){
            ModalService.open({
                title:'Please enter a new password.',
                content: '/app_assets/templates/ups.doa-newPasswordModal.html',
                component: 'doa'}, function(sc){
                    var count =0;
            /**
            * @function
            * @name showHidePwd;
            * @description to show or hide password field.
            */
            function showHidePwd(ev){
                var element= $(ev.currentTarget);
                if(element.text()==='Show'){
                element.parent().find('.ups-readerTxt').text('password');
                element.parent().find('input[type=password]').prop('type','text');
                element.text('Hide');
                }
                else{
                element.parent().find('.ups-readerTxt').text('password in plain text');
                element.parent().find('input[type=text]').prop('type','password');
                element.text('Show');
                }
            }
            /**
            * @function
            * @name showHide;
            * @description to show or hide password field.
            */
            sc.showHide= function($event){
                showHidePwd($event);
            };
            sc.Continue= function(){
                count++;
                if(count===3){
                    console.log('inside');
                }
                else{
                    var url = 'http://' + $window.location.host +'/ppcProfile.html#/informationPage/securityPage';
                    $window.location = url;
                }
            };

                });
            };
    }]);
