'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module
 */
	angular.module('upsDOApp.controllers')
 
/**
 * @controller
 * @name upsDOApp.controllers.controller : securityCtrl
 * @description Controls the Security Questions flow. This controller contains security questions
 * @template ups.ppc-edit-security-questions.html and ups.ppc-security-questions.html
 */
	.controller('securityCtrl',['$scope', '$timeout', 'localStorageService', '$location','UtilService','NotificationService', 'securityServices','$rootScope','ModalService',function($scope,$timeout,localStorageService,$location,UtilService,notification,securityService,$rootScope,ModalService){
	    


		$scope.proceedToAdd = function(){
			//ModalService.open
			$location.path('/informationPage/securityPage');
		};


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
		$scope.showHide= function($event){
			showHidePwd($event);
		};
		$scope.ShowOrNot=true;
	    var addressInfoURL='ups.ppc-security-questions.json';
		UtilService.mockServiceCalls({urlString: addressInfoURL}, function(response){
			var obj = response.data;
			if(obj.errorCode){
				notification.handleError(obj);
			}else{
				if(securityService.savedQuestions.length>0){
					$scope.values=securityService.savedQuestions;
				}
				else{
					$scope.values=obj.data;
				}
			}		
		});
		addressInfoURL='ups.ppc-security-questionOptions.json';
		UtilService.mockServiceCalls({urlString: addressInfoURL}, function(response){
			var obj = response.data;
			if(obj.errorCode){
				notification.handleError(obj);
			}else{
				$scope.Qustions=obj.data;
			}		
		});
	
		// setting the default values.
		 $scope.editAddressModalBox=false;
		 $scope.WrongPass = false;
		 $scope.UseSecurity=true;
		/**
		* @function
		* @description a self invoking function to determine if editting question or adding question is required.
		*/
		(function() {
		if(securityService.savedQuestions.length===0){
			$scope.AddQuestions = true;
		}
		else{
			$scope.AddQuestions = false;
		}
	
		})();
		/**
		* @function
		* @name cancel;
		* @description to cancel submitting the security questions.
		*/
		$scope.cancel= function(){
			$location.path('/informationPage');
		};
		/**
		* @function
		* @name SaveQuestions
		* @description to save the questions in the edit security questions.
		*/
		$scope.SaveQuestions= function(){
			var i=0;
			for(i=0; i<$scope.values.length; i++){
				
			}
			securityService.saveMethods($scope.values);
			$location.path('/informationPage');
		};
		var rendrDup=[];
		var reset=false;
		var capture =[];
		var i,j;
		/**
		* @function
		* @name checkTotal
		* @description check duplicay in the whole code.
		*/
		function checkTotal(){
			for(i =0 ; i<5; i++){
				capture[i] = $scope.values[i].SelectQuestions;
			}
			for(i =0;i<5;i++){
				var temp = capture[i];
				if(temp){
					for(j=0;j<5;j++){
					if(i!==j){
						if(temp === capture[j]){
							return false;
						}
					}
					}
				}
				
			}
			return true;
		}
		/**
		* @function
		* @name checkDuplicay
		* @description check the duplicacy with any other question.
		*/
		function checkDuplicay(question, ind){
			for(i =0 ; i<5; i++){
				capture[i] = $scope.values[i].SelectQuestions;
			}
			for(i = 0; i<5; i++){
				if(question){
					if(i!==ind){
					if(capture[i] === question){
						return false;
						}
					}
				}
				
			}
			return true;
		}
		/**
		* @function
		* @name preventDuplicats
		* @description check if the questions selected are duplicated by combining two conditions together.
		*/
		$scope.preventDuplicats = function(obj,$index){
			$scope.indx=0;		
			 	rendrDup[$index]=obj;
			 	$scope.indx=$index;
			 	var check1 = !checkDuplicay(obj,$index);
			 	var check2 = !checkTotal();

			 	if(check1 || check2){
			 		$scope.duplicate = true;
			 	}
			 	else{
			 		$scope.duplicate = false;
			 	}
			
		};
		var modal={};
		$scope.wrongAttempts = false;
		$scope.failMsgAfterNotify = false;
		/**
		* @function
		* @name reset
		* @description check the password before continue to edit the security questions.
		*/
		$scope.checkPassword= function(){
			if ($scope.wrongAttempts) {
				ModalService.open({
					title: 'Please try again later.',
					content: '/app_assets/templates/ups.ppc-retrySecurity.html'
				}, function(sc) {
					sc.ok = ModalService.dismiss();
				});
				
				$scope.failMsgAfterNotify = true;
			} else {
			
			
			
			
				modal={
					title:'Please re-enter your password.',	
					content: '/app_assets/templates/ups.ppc-password-confirm.html',
					component: 'ppc'
				};
				 var modalInstance = ModalService.open(modal,function(sc) {
					//sc.abc= $rootScope.show;
					sc.count = 0;
					sc.showHide= function($event){
							showHidePwd($event);
						};
					sc.cancel = function(){
						ModalService.dismiss();
					};
						 sc.PasswordCheck = function(){
							//console.log(localStorageService.get('active_user').password);
							if(sc.formObj.password=== localStorageService.get('active_user').password){
								sc.ok();
								if(reset === true){
									$scope.AddQuestions=true;
									reset=false;
								}
								else{
									$timeout(function(){
										$rootScope.fromSecurityQuestions = true;
										$location.path('/informationPage/securityPage');
									}, 300);
								}
							}else{
								sc.isType='error';
								// sc.count ++;
								// if(sc.count === 3){
								// 	$rootScope.wrongAttempts = true;
								// 	//ModalService.dismiss();
								// 	 ModalService.next({
					// 					title: 'Please try again later.',
								// 		content: '/app_assets/templates/ups.ppc-retrySecurity.html'
								// 	});
								// }
								// else{
								// 	$rootScope.wrongAttempts = false;
								// }
								//console.log(sc.isType);
							}
						};
				 });
				 modalInstance.result.then(function() {
				   }, function() {
					  // Cancel
				  });
			}
	    };
	   	/**
		* @function
		* @name reset
		* @description reset the questions and their respective answers.
		*/
		$scope.reset=function(){
			securityService.savedQuestions=[];
			$scope.values=[];
			reset=true;
			$scope.checkPassword();
		};
		/**
		* @function
		* @name checking
		* @description check if selected question type is 'Custom' to show the type your question input box.
		*/
		$scope.checking= function(index) {
			var p=$scope.values[index].SelectQuestions;
			if(p==='Custom'){
				$scope.values[index].ShowOrHide=true;
			}
			else{
				$scope.values[index].ShowOrHide=false;
			}
		};
	}  ]);