'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module and store in the variable 'Controller'
 */
angular.module('upsDOApp.controllers')

/**
 * @controller
 * @name upsDOApp.controllers.controller : OpenAccountFailCtrl
 * @description Controls the Login Settings Flow in PPC. This controller helps you change password, edit user name/email, link
 *       unlink social links
 * @template ups.ppc-login-settings.html
 */
	.controller('loginsettingsCtrl',['$scope','$timeout','$window','$location','UtilService','ModalService','localStorageService', function($scope,$timeout,$window,$location,UtilService,ModalService,localStorageService){

		var userInfo = localStorageService.get('active_user_info');
	    // init
	    $scope.showDeleteProfile = false;
	    $scope.isLinked = false;
	    $scope.linkedMediaList = [];
	    $scope.linkedMediaClassList = [];
	    $scope.editNameJson={
    		firstName: userInfo.first_name,
    		lastName: userInfo.last_name,
    		middleName: userInfo.middle_name,
    		suffix: userInfo.suffix
    	};
	    $scope.linkedSocialMediaBtn = ['Facebook','Twitter','','Amazon'];
        //$scope.linkedSocialMediaBtn = [ {'network' : 'Facebook'}, {'network' : 'Twitter'}, {'readerTxt' : 'Google'}, {'network' : 'Amazon'} ];
	    $scope.socialMediaClasses = ['ups-icon-facebook','ups-icon-twitter','ups-icon-google','ups-icon-amazon'];
	    $scope.isExtInvalid = true;
	    var signUpValuesURL = 'ups.doa-signup.json';
	    $scope.isUS = true;
	    $scope.isMatching = false;
		$scope.verificationEmailNotice = false;
		$scope.verifyMyEmailBtn = true;
	    // End init

	    /**
	    * @function
	    * @name resetForm
	    * @description Reset the form fields
	    */
	    function resetForm(){
	    	$scope.currentUserID= userInfo.user_id;
		 	$scope.currentEmail= userInfo.user_email;
		 	$scope.currentUserEmailStorage= userInfo.user_email;
		}

		resetForm();

		 /**
		   * @function
		   * @name UtilService.mockServiceCalls
		   * @description Fetch the suffix dropdown values from JSON using service
		   */
		UtilService.mockServiceCalls({urlString: signUpValuesURL}, function(response){
			var obj = response.data;
			if(obj.errorCode){
			} else{
				$scope.suffixVals = obj.default.suffix_options;
			}
		});

		/**
		  * @function
		  * @name getSocialMediaClass
		  * @params index
		  * @description Get social media classes for social media buttons
		  */
		$scope.getSocialMediaClass = function(index){
			return $scope.socialMediaClasses[index];
		};

		/**
		  * @function
		  * @name onEditName
		  * @description On Click of edit open the editable version of Name
		  */
		$scope.onEditName = function(){
	        $scope.editName = !($scope.editName );
	    };

	    /**
		  * @function
		  * @name toggleshowDeleteProfileModal
		  * @description Open Delete Profile Modal
		  */
	    $scope.toggleshowDeleteProfileModal = function(){
			resetForm();

			var modalInstance = ModalService.open({
		         title: 'Are You Sure?',
		         content: '/app_assets/templates/ups.ppc-delete-profile-modal.html',
		         component: 'ppc'
		     },function(sc) {
	             sc.data = [];
	             sc.goToProfilePage = function(){
	            	 ModalService.close();
	            	 $location.path('/profilePage');
	         	};
	         });
			modalInstance.result.then(function() {
				$location.path('/profilePage');
	        }, function() {
	            // Cancel
	        });


		};

		/**
		  * @function
		  * @name redirectToEmailVerification
		  * @params redirectToEmailVerification
		  * @description Checks whether entered mail ID is duplicate or not
		  */
		$scope.redirectToEmailVerification = function(cmail){
			cmail = angular.lowercase(cmail);
			$scope.currentEmail = cmail;

			if($scope.currentEmail === $scope.currentUserEmailStorage){
				var isDirty = this.ups_signupform.email_input.$dirty;
				if(isDirty){
					$scope.isMatching = true;
				}else{
					$scope.isMatching = false;
					$scope.editName = false;
					this.ups_signupform.$setPristine();
				}
			} else{
				$scope.isMatching = false;
				$scope.editName = false;
				this.ups_signupform.$setPristine();
			}
		};

		/**
		  * @function
		  * @name linkSocialMedia
		  * @params evt and index
		  * @description Deletes Social media buttons from the initial list and adds under Linked Heading
		  */
		$scope.linkSocialMedia = function(evt,index){
			$scope.isLinked = true;
			$scope.linkedMediaName = evt.target.innerText;
			$scope.linkedMediaList.push($scope.linkedMediaName);

			$scope.linkedMediaClassList.push($scope.socialMediaClasses[index]);
			$scope.socialMediaClasses.splice(index,1);

			$scope.linkedSocialMediaBtn.splice(index,1);
            //$scope.linkedSocialMediaReaderTxtBtn.splice(index,1);

			if ($scope.linkedSocialMediaBtn.length ===0) {
				$scope.isLinked = false;
			}
		};

		/**
		  * @function
		  * @name unlinkSocialMedia
		  * @params index and linkedSocialMediaBtn
		  * @description Deletes Social media from Linked Heading and unlink them
		  */
		$scope.unlinkSocialMedia = function(index,linkedSocialMediaBtn){
			linkedSocialMediaBtn.push($scope.linkedMediaList[index]);
			$scope.linkedMediaList.splice(index,1);

			$scope.socialMediaClasses.push($scope.linkedMediaClassList[index]);
			$scope.linkedMediaClassList.splice(index,1);

			$scope.isLinked = true;
			if ($scope.linkedMediaList.length === 0) {
					$scope.isLinked = false;
			}
		};

		/**
		  * @function
		  * @name checkExtLen
		  * @params evt
		  * @description Deletes Social media from Linked Heading and unlink them
		  */
		$scope.checkExtLen = function(evt){
			if(evt.target.value === ''){
				$scope.isExtInvalid = true;
			}else{
				$scope.isExtInvalid = false;
			}
		};

		/**
		  * @function
		  * @name openPasswordSSOPage
		  * @description Open the UPS provide URL on Change Password Link
		  */
		$scope.openPasswordSSOPage = function(){
			UtilService.openTearmsAndConditions('https://www.campusship.ups.com/csadmin/changepassword');
		};

		/**
		  * @function
		  * @name verifyMyEmail
		  * @description Changes button text from "Verify Now" to "Pending Verification" and makes the Notice appear
		  */
		$scope.buttonText = 'Verify Now';
			$scope.verifyMyEmail = function() {
				$scope.verifyMyEmailBtn = false;
				$scope.staticText = 'Pending Verification';
				$scope.tab = '0';
				$scope.verificationEmailNotice = true;
			};

	}]);
