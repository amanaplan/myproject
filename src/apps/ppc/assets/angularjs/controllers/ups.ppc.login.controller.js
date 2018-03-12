'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module and store in the variable 'app'
 */
var app = angular.module('upsDOApp.controllers');

/**
 * @controller
 * @name upsDOApp.controllers.controller : loginCtrl
 * @description Controls the Login flow
 * @template ups.ppc-login.html and ups.ppc-LoginModal.html
 */
app.controller('loginCtrl', ['$scope', 'localStorageService','$window','UtilService','$rootScope','$interval','progressBarService','$location','ModalService','NotificationService','UserService','MockJSONCalls', 
                             function ($scope, localStorageService,$window,UtilService,$rootScope,$interval,progressBarService,$location,ModalService,notification,UserService, MockJSONCalls) {	
    
	$scope.hideInfo = true;
    $rootScope.errorState = true;
    $scope.isPassBlank =  false;
    $scope.isInvalid = false;
    $scope.inputType = 'password';
	var signUpValuesURL = 'ups.doa-signup.json';
	$scope.formObj={email:'',password:''};
	localStorageService.set('Login',{'userName':'ups@sapient.com','password':'@Ups12345'});
	localStorageService.set('Redirect','');
	var promise;
	$scope.percent = 0;
	
	$scope.$on('handleError', function(ev, errors){
    	// Handle Errors
    	$scope.errorList = errors;
    });
	$scope.showMore = function() {
        $scope.NonUS=false; 
    }; 
	

	/**
	* @function
	* @name resetInterval
	* @description Reset the interval for Export progress error Flow
	*/
	function resetInterval(){
		$interval.cancel(promise);
		$scope.percent = 0;
	}

	/**
	* @function
	* @name stopProgressBar
	* @description Stop the progress bar object when error happens
	*/
	$scope.stopProgressBar = function(){
		$interval.cancel(promise);
	};

	/**
	* @function
	* @name toggleProgressBarModal
	* @description Open the Export Error Progress Modal 
	*/
	$scope.toggleProgressBarModal = function(){
		resetInterval();
		ModalService.open({
			title: 'Export Contacts',
			content: '/app_assets/templates/ups.ppc-roundProgressBarModal.html',
			component: 'ppc'
	    },function(sc){ 
	    	sc.btnText='Next';
			sc.message='Please wait while your contacts are exported.';
			sc.overError = false;
			
			sc.closeModal = function(){
				ModalService.dismiss();
				sc.overError = false;
			};
			promise = $interval( function(){
			     sc.percent = progressBarService.startProgressBar(sc.percent);
			     if(sc.percent === 50){
			     	$interval.cancel(promise);
			     	sc.btnText='Close';
			     	sc.message='We had a problem exporting your contacts. Please wait a few minutes and try again.';
			     	sc.overError = true;
			     }
			    }, 1000);
	    });
	};

	$scope.toggleModal = function(str){
		if(str!=='US'){
	     localStorageService.set('nonUsMember',true);
		}else{
	     localStorageService.set('nonUsMember',false);
		}
	ModalService.open({
        title:'Log in.',
        content: '/app_assets/templates/ups.ppc-LoginModal.html',
		component: 'ppc'
    },function(sc){
    		sc.nextStepAgreement = function(){
			var url = 'http://' + $window.location.host +'/ppcProfile.html';
			$window.location = url;
		};
		sc.backStepAgreement = function(){
			$scope.NonUS=true;
			ModalService.next({
				title: 'Please review the UPS Technology Agreement.',
				content: '/app_assets/templates/ups.ppc-LoginModal.html'
			});
		};
    });

		if(str==='US'){
            $scope.NonUS=false;
		}else{
            $scope.NonUS=true;
		}
	};
    
    $scope.checkAgr = false;
    $scope.NonUS = true;

	
	
	$scope.setCheckBox = function(obj){
		$rootScope.Agrement = obj;
	};
	$scope.submitForm = function(){
    	var obj = UserService.checkLogin($scope.formObj);
    	if(obj){
    		if($scope.formObj.Agrement){
				if($rootScope.Agrement){
					$scope.formObj.Agrement=$rootScope.Agrement;
				 }
				ModalService.next({
					title: 'Please review the UPS Technology Agreement.',
					content: '/app_assets/templates/ups.ppc-utaModal.html'
				});
			}else{
				var url = 'http://' + $window.location.host +'/ppcProfile.html';
				$window.location = url;
			}
			$scope.isInvalid = true;// why is this used
    	}else{
			notification.handleError({
				'errorCode': 500,
				'errorMessage': 'Incorrect UserId or Password.',
				'errorDetail': 'Incorrect UserId or Password.'
			});
			$scope.isInvalid = true;
			console.log('Inavlid User');
    	}
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


	$scope.openAddressTermsAndConditions = function(){
		UtilService.openTearmsAndConditions($scope.signupDefault.tnc);
	};

	// Social
	$scope.$on('socialDataLoaded', function(ev, obj){
		var list = UserService.getUserList();
		if(obj){
			for(var i=0;i<list.length;i++){
				if(list[i].networkName.toLowerCase() === obj.type.toLowerCase()){
					
					var temp = angular.copy(list[i]);
					temp.email = temp.user_name;
					$scope.formObj = temp;
					break;
				}
			}
		}
	});
	$scope.$on('hideSocial', function(){
		$scope.hideInfo =false;
		$scope.formObj.Agrement = $rootScope.Agrement;
	});
	// End Social

	UtilService.mockServiceCalls({urlString: signUpValuesURL}, function(response){
		var obj = response.data;
		if(obj.errorCode){
			// error
		} else{
			$scope.signupDefault = obj.default;
			$scope.socialData = obj.social;
		}
	});
	
	$scope.signUpLink = function(){
		var url = '';
		if($location.path() ===  '/login'){
			url = 'http://' + $window.location.host +'/doa.html#/signup';
			$window.location = url;
		}else{
			url = 'http://' + $window.location.host +'/doaSignup.html';
			$window.location = url;
		}
	};
	
	$scope.forgotPassword = function(){
		UtilService.openTearmsAndConditions('https://www.campusship.ups.com/csadmin/changepassword');	
	};
	
	$scope.checkValidation = function(password){
		if(password === ''){
			$scope.isPassBlank =  true;
		}else{
			$scope.isPassBlank =  false;
		}
	};
	
	
	(function(){
		MockJSONCalls.getJson({urlString: 'ups.ppc-userList.json'})
	    // then() called when response gets back
	    .then(function(data) {
	    	UserService.setUserList(data);
	    }, function() {
	        // promise rejected
	    });
	})();	
}]);