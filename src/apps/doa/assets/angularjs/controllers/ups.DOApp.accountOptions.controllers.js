'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description
 * Initialize the module and store in the variable 'Controller'
 */
var Controller = angular.module('upsDOApp.controllers');

/**
 * @controller
 * @name upsDOApp.controllers.controller : AccountOptionsCtrl
 * @description Controls the Account options flow in DO
 * @template : ups.doa-account-options.html, ups.doa-accountOptionsModal.html, ups.doa-hazmatConfirmationModal.html,
 * ups.doa-specialShippingNeedsAlcoholModal.html and ups.doa-specialShippingNeedsModal.html
 */
	Controller.controller('AccountOptionsCtrl',['$scope','$http','$window','UtilService','$rootScope','ModalService','DashboardService','MockJSONCalls',function($scope,$http,$window,UtilService,$rootScope,ModalService,DashboardService,MockJSONCalls){
		$scope.ModalService = ModalService;

		/**
	       * @function
	       * @name toggleModal
	       * @description variables initialization and open modal on the conditional basis for US and NON-US
	       */
		$scope.toggleModal = function(country){
			var modalInstance = ModalService.open({
				title:'Set your payment account options.',
				content: '/app_assets/templates/ups.doa-accountOptionsModal.html',
				component: 'doa'
			},function(sc) {

				var metaData = DashboardService.getMetaData();
				sc.form = {};
				sc.setUS = true;
			 	if(metaData.countries){
			 		sc.countryList = metaData.countries;
			        sc.form.country='us';
			        sc.statesList = metaData.states;
			 	}else{
					MockJSONCalls.getJson({urlString: 'ups.doa-metaData.json'})
			        // then() called when response gets back
			        .then(function(data) {
			            // promise fulfilled TODO set metadata
			        	DashboardService.setMetaData(data);
			        	sc.countryList = data.countries;
			            sc.form.country='us';
			            sc.statesList = data.states;
			        }, function() {
			            // promise rejected
			        });
			 	}

				sc.$on('changePage', function(ev, obj){
					if(obj){
						sc.design = obj;
					}
				});

				/**
			      * @function
			      * @name selectCountry
			      * @description When US is selected in country dropdown
			      */
				sc.selectCountry = function(text){
			      if(text === 'us' || text==='pr'){
			        sc.setUS = true;
			      }else{
			        sc.setUS = false;
			      }
			    };

				//init
				sc.formObj = {};
				sc.isUS = true;
				sc.isCA = false;
				sc.isEU = false;
                sc.isPromo = false;
				sc.isPresSelected = false;
				sc.formObj.ShipProd2 = false;
				sc.formObj.ShipProd3 = false;
				sc.isBusinessSelected = false;

				sc.shipmentProducts = ['Alcoholic beverages or tobacco products','Hazardous materials [?]','Lithium batteries'];

				sc.userResponse = [{'type':'Yes','isSelected':'false'},
									{'type':'No','isSelected':'true'}];

				var resetFormFields = function(){
					sc.formObj.ShipProd1 = false;
					sc.formObj.ShipProd2 = false;
					sc.formObj.ShipProd3 = false;
				};
				resetFormFields();

				if(country === 'us'){
					sc.accountUsage=[{'type':'Personal','isSelected':'true','isDisabled': 'false'},{'type':'Business','isSelected':'false','isDisabled': 'false'}];
					sc.isUS = true;
					sc.isCA = false;
					sc.isEU = false;
				} else if(country === 'ca'){
					sc.accountUsage=[{'type':'Personal','isSelected':'true','isDisabled': 'false'},{'type':'Business','isSelected':'false','isDisabled': 'true'}];
					sc.isUS = false;
					sc.isCA = true;
					sc.isEU = false;
					sc.unitMeasurement = [{'type':'Imperial'},{'type':'Metric'}];
					sc.formObj.unitMeasurement = sc.unitMeasurement[0].type;
				} else if(country === 'eu'){
					sc.accountUsage=[{'type':'Personal','isSelected':'false','isDisabled': 'true'},{'type':'Business','isSelected':'true','isDisabled': 'false'}];
					sc.isUS = false;
					sc.isCA = false;
					sc.isEU = true;
					sc.unitMeasurement = [{'type':'Imperial'},{'type':'Metric'}];
					sc.formObj.unitMeasurement = sc.unitMeasurement[0].type;
                } else if(country === 'promo'){
                    sc.accountUsage=[{'type':'Personal','isSelected':'true','isDisabled': 'false'},{'type':'Business','isSelected':'true','isDisabled': 'false'}];
                    sc.isUS = true;
                    sc.isCA = false;
                    sc.isEU = false;
                    sc.isPromo = true;
                    sc.unitMeasurement = [{'type':'Imperial'},{'type':'Metric'}];
                    sc.formObj.unitMeasurement = sc.unitMeasurement[0].type;
				}else{
					sc.accountUsage=[{'type':'Personal','isSelected':'false','isDisabled': 'true'},{'type':'Business','isSelected':'true','isDisabled': 'false'}];
					sc.isUS = false;
					sc.isCA = false;
					sc.isEU = false;
				}
				$rootScope.isUS = sc.isUS;
				$rootScope.lastTitle='Set your payment account options.';
				$rootScope.lastUrl = '/app_assets/templates/ups.doa-accountOptionsModal.html';


				/**
			       * @function
			       * @name backUpload
			       * @description back button Functionality
			       */
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

			      /**
			       * @function
			       * @name openpopup @params flag
			       * @description open the 3rd part Popups based on parameters
			       */
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

			  	 /**
			       * @function
			       * @name togglePrescriptionResponse
			       * @description Prescription radio selected in Personal Business type otherwise not
			       */
			  	sc.togglePrescriptionResponse = function(index){
			  		if (index === 0) {
			  			sc.isPresSelected = true;
			  		}else{
			  			sc.isPresSelected = false;
			  		}
			  	};

				 /**
			       * @function
			       * @name toggleBusinessResponse
			       * @description When Business radio selected, Company Name and Company Email inputs appear
			       */
			  	sc.toggleBusinessResponse = function(index){
			  		if (index === 0) {
			  			sc.isBusinessSelected = false;
			  		}else{
			  			sc.isBusinessSelected = true;
			  		}
			  	};

			  	/**
			       * @function
			       * @name toggleImportBrokerage
			       * @description Import Brokerage radio selected in Personal Business type otherwise not
			       */
			  	sc.toggleImportBrokerage = function(index){
			  		if (index === 0) {
			  			sc.isBrokerType = true;
			  			sc.brokerType = [{'type':'UPS as Import Broker'},{'type':'Existing Broker'},{'type':'N/A (Do not know)'}];
			  			sc.formObj.brokerType = sc.brokerType[0].type;
			  		}else{
			  			sc.isBrokerType = false;
			  		}
			  	};

			  	/**
			       * @function
			       * @name nextStep
			       * @description Next button functionality
			       */
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
			  			$rootScope.isHazmat = sc.formObj.ShipProd2;

			      	}
			      	else{
			      		ModalService.next({
		    				title: 'Upload your required documents.',
							content: '/app_assets/templates/ups.doa-uploadRequiredDocs.html',
				              data: 'Add Documents'
						});
			          $rootScope.lastTitle='Set your payment account options.';
			  		  $rootScope.lastUrl = '/app_assets/templates/ups.doa-accountOptionsModal.html';
			  		  $rootScope.isHazmat = sc.formObj.ShipProd2;
			      	}
			  	};

			  	/**
			       * @function
			       * @name nextShippingStep
			       * @description Next button functionality if no shipping check box selected
			       */
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

			  	/**
			       * @function
			       * @name moveToAPAC
			       * @description Next button functionality if no shipping check box selected
			       */
			  	sc.moveToAPAC = function(){

		      		ModalService.next({
						title: 'Upload your required documents.',
						content: '/app_assets/templates/ups.doa-uploadRequiredDocs.html',
						data: 'Add Documents'
					});

			        $rootScope.lastUrl = '/app_assets/templates/ups.doa-hazmatConfirmationModal.html';
			  	};


			  	/**
			       * @function
			       * @name moveToAPAC
			       * @description Back button functionality
			       */
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
			});

	    	modalInstance.result.then(function() {
	            // Send Service request TODO
	        }, function() {
	            // Cancel
	        });
		};
	}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : accountCtrl
 * @description Controls the Account options flow in PPC
 */
	.controller('accountCtrl', ['$scope','$http','$window','$location','$rootScope','ModalService',function($scope,$http,$window,$location,$rootScope,ModalService){
		$scope.ModalService = ModalService;
		// This is the one
		$scope.accountUsage=[{'type':'Personal','isSelected':'true','isDisabled': 'false'},{'type':'Business','isSelected':'false','isDisabled': 'true'}];
		     // $scope.isUS = true;
		/**
	       * @function
	       * @name resetFormFields
	       * @description reset the form objects.
	       */
		  var resetFormFields = function(){
		    $scope.formObj.ShipProd1 = false;
		    $scope.formObj.ShipProd2 = false;
		    $scope.formObj.ShipProd3 = false;
		  };

		  $scope.toggleModal = function(country){
		    resetFormFields();

		    if(country === 'us'){
		      $scope.accountUsage=[{'type':'Personal','isSelected':'true','isDisabled': 'false'},{'type':'Business','isSelected':'false','isDisabled': 'true'}];
		      $scope.isUS = true;
		    }
		    else{
		      $scope.accountUsage=[{'type':'Personal','isSelected':'false','isDisabled': 'true'},{'type':'Business','isSelected':'true','isDisabled': 'false'}];
		      $scope.isUS = false;
		    }
		    $rootScope.lastTitle='Set your payment account options.';
		    $rootScope.lastUrl = '/app_assets/templates/ups.doa-accountOptionsModal.html';
		  };

		  //$scope.toggleModal('us');

	      $scope.backUpload = function(){
	    	  //TODO
	  	  };

		  $scope.nextStep = function(){
		    if($scope.formObj.ShipProd2 === true || $scope.formObj.ShipProd3 === true){

		    	if($scope.formObj.ShipProd1 === true){

		      		ModalService.next({
	    				title: 'Please call us to finish opening your payment account.',
						content: '/app_assets/templates/ups.doa-specialShippingNeedsAlcoholModal.html'
					});
		  			$rootScope.lastTitle='Please call us to finish opening your payment account.';
		  			$rootScope.lastUrl = '/app_assets/templates/ups.doa-specialShippingNeedsAlcoholModal.html';
		      	}else{
			    	if($scope.formObj.ShipProd2 === true){
			        $rootScope.SpecialHazardous =true;
			        // console.log($rootScope.SpecialHazardous);
			      }
			      if($scope.formObj.ShipProd3 === true){
			        $rootScope.SpecialLithium =true;
			        // console.log($rootScope.SpecialLithium);
			      }
			      $rootScope.$broadcast('changePage',{
		        	  title: 'Review our requirements for shipping dangerous goods.',
		        	  content: '/app_assets/templates/ups.doa-specialShippingNeedsModal.html'
		    	  });
			      $rootScope.lastTitle='Review our requirements for shipping dangerous goods.';
			      $rootScope.lastUrl = '/app_assets/templates/ups.doa-specialShippingNeedsModal.html';
			    }
		    }
		      else if($scope.formObj.ShipProd1 === true){
		       $rootScope.$broadcast('changePage',{
		          title: 'Please call us to finish opening your payment account.',
		          content: '/app_assets/templates/ups.doa-specialShippingNeedsAlcoholModal.html'
		        });
		      $rootScope.lastTitle='Please call us to finish opening your payment account.';
		      $rootScope.lastUrl = '/app_assets/templates/ups.doa-specialShippingNeedsAlcoholModal.html';

		      }
		      else{
		        $rootScope.$broadcast('changePage',{
		          title: 'Upload your required documents.',
		          content: '/app_assets/templates/ups.doa-uploadRequiredDocs.html',
		          data: 'Add Documents'
		        });
		        $rootScope.lastTitle='Set your payment account options.';
		        $rootScope.lastUrl = '/app_assets/templates/ups.doa-accountOptionsModal.html';
		      }
		    $rootScope.isHazmat = $scope.formObj.ShipProd2;
		  };

			/**
	       * @function
	       * @name nextShippingStep
	       * @description on click of next in account options.
	       */
		  $scope.nextShippingStep = function(){
		    if($scope.formObj.shipNeed3 !== true || $scope.formObj.shipNeed4 !== true ||
		       $scope.formObj.shipNeed5 !== true || $scope.formObj.shipNeed6 !== true ||
		       $scope.formObj.shipNeed8 !== true){

		      $rootScope.$broadcast('changePage',{
		          title: 'Confirmation',
		          content: '/app_assets/templates/ups.doa-hazmatConfirmationModal.html'
		        });
		    }
		      else{
		        $rootScope.$broadcast('changePage',{
		          title: 'Upload your required documents.',
		          content: '/app_assets/templates/ups.doa-uploadRequiredDocs.html',
		            data: 'Add Documents'
		        });
		      }
		  };

		  $scope.moveToAPAC = function(){
				  $rootScope.fromPaymentPage = true;
				  $rootScope.$broadcast('changePage',{
			        title: 'Upload your required documents.',
			        content: '/app_assets/templates/ups.doa-uploadRequiredDocs.html',
			        data: 'Add Documents'
			    });

		  };
			/**
	       * @function
	       * @name backToPrev
	       * @description to handle the back and next.
	       */

		  $scope.backToPrev = function(flag){
		    switch(flag){
		      case 'AO':
		        $rootScope.$broadcast('changePage',{
		          title: 'Set your payment account options.',
		          content: '/app_assets/templates/ups.doa-accountOptionsModal.html'
		        });
		      break;

		      case 'SN':
		        $rootScope.$broadcast('changePage',{
		          title: 'Review our requirements for shipping dangerous goods.',
		          content: '/app_assets/templates/ups.doa-specialShippingNeedsModal.html'
		        });
		      break;

		      case 'ID':
		    	  if($location.path()==='/paymentPage'){
			    	  if($rootScope.parentPage === 'IDSuccess'){
			    		  $scope.$emit('changePage', {
			    			  title: 'Verify your identity.',
			    			  content: '/app_assets/templates/ups.doa-id-verification.html'
							});
			    	  }
		    	  }
		      break;
		    }
		  };
		}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : openAccountDocs
 * @description
 * Controls the Upload Required Document flow in PPC
 */
	.controller('openAccountDocs',['$scope','$http','$window','$location','$rootScope','UtilService','NotificationService','paymentService','$timeout','uploadServices','ModalService',function($scope,$http,$window,$location,$rootScope,UtilService,NotificationService,paymentService,$timeout,uploadServices,ModalService){
		$scope.ModalService = ModalService;

		$scope.isEnable=false;
		  function checkEnable(){
			      $scope.isEnable=true;
			       angular.forEach($scope.documents, function(value) {
			            if(!value.isUpload){
			              $scope.isEnable=false;
			            }
			     });
			     }
		       $scope.maxHeight='10000000';
		       $scope.maxSize='100MB';
		       $scope.f=[];
		       $scope.uploadFiles = function(file, errFiles,index) {
		       	if(file){
		        $scope.documents[index].isPercent=true;
		        $scope.documents[index].isUpload=false;
		        $scope.documents[index].isError=false;
		       	}
		        $scope.errFile = errFiles && errFiles[0];
		        if($scope.errFile){
		          $scope.documents[index].isError=true;
		          $scope.documents[index].isUpload=false;
		          $scope.documents[index].isPercent=false;
		           checkEnable();
		        }
		        var callBackForUpload = function callBackUpload(){
		           if(file.result){
		                $scope.documents[index].isPercent=false;
		                $scope.documents[index].isUpload=true;
		                checkEnable();
		            }
		        };
		        if(file){
		        	file = uploadServices.uploadFile(file,callBackForUpload);
		       	 	$scope.f[index]=file ;
		        }
		    };

		     $scope.toggleDocsModel = function(){

		     };
		      $scope.cancelModel = function(){
		          angular.forEach($scope.documents, function(value) {
		            value.isPercent=false;
		            value.isUpload=false;
		            value.isError=false;
		         });
		           $scope.isEnable=false;
		     };

		    $scope.nextUpload = function(){
		    	ModalService.next({
					title: 'Enter your tax information.',
					content: '/app_assets/templates/ups.doa-APAC-TaxInfoModal.html'
			   });
		    };

		  if($rootScope.uploadCheckVal===undefined){
		    $scope.documents=[
		     {'name':'document1','isUpload':false,'isPercent':false,'isError':false},
		     {'name':'document2','isUpload':false,'isPercent':false,'isError':false},
		     {'name':'document3','isUpload':false,'isPercent':false,'isError':false}
		     ];
		  }
		  else if($rootScope.uploadCheckVal===true){
		    $scope.documents=[
		     {'name':'document1','isUpload':true,'isPercent':false,'isError':false},
		     {'name':'document2','isUpload':true,'isPercent':false,'isError':false},
		     {'name':'document3','isUpload':true,'isPercent':false,'isError':false}
		     ];
		     $scope.isEnable=true;
		    }
		}]);
