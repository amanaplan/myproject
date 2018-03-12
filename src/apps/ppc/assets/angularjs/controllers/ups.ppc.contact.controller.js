'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module
 */
var ContactModule = angular.module('upsDOApp.controllers');

/**
 * @controller
 * @name upsDOApp.controllers.controller : contactCtrl
 * @description This controller contains the contacts table and distribution object that is visible on UI as tables
 * @template : ups.doa-openAccount-fail.html and ups.doa-openAccount-failModal.html
 */
	ContactModule.controller('contactCtrl',['$scope','$location','UtilService','addressServices','$rootScope','$interval','progressBarService','$timeout','$window','ModalService','MappingService', '$filter', '$document', function($scope,$location,UtilService,addressServices,$rootScope,$interval,progressBarService,$timeout, $window, ModalService,MappingService,$filter, $document){
		$scope.ModalService = ModalService;
	    $scope.fetchURL = MappingService.getURLMap();
		$scope.tabContentId = $rootScope.tabContentId;
        $scope.tagsTemplateUrl = '/app_assets/templates/ups.ppc-tagPopover-filter.html';

	    //Window SVP logic
		$scope.viewPortHtml= 'ups.ppc-contactLVP.html';
		$scope.portObjContact = {
			back: function(){
				$scope.selectedValueContent = undefined;
				$scope.viewPortHtml = 'ups.ppc-contactSVP.html';
			},
			next: function(item){
				$scope.toggleView = true;
				$scope.selectedContact = item;
				$scope.safeApply();
			},
			cancel: function(){
				$scope.toggleView = false;
				$scope.safeApply();
			}
		};
		$scope.portObj = {
			content: [
			 {
				type: 'addresses',
				title: 'My Addresses'
			 }, {
				type: 'contact',
				title: 'My Contacts'
			}, {
				type: 'distribution',
				title: 'Distribution Lists'
			}],
			next: function(value){
				$scope.selectedValueContent = value;
		    	if(value.type === 'contact'){
			    	$scope.viewPortHtml = 'ups.ppc-contactSVP-contact.html';
		    	}else if (value.type === 'distribution') {
			    	$scope.viewPortHtml = 'ups.ppc-contactSVP-distribution.html';
		    	} else {
					$scope.viewPortHtml = 'ups.ppc-contactSVP-addresses.html';
				}
			}
		};

		//Port view change logic - width defined for svp is 769
		$scope.$watch('windowWidth', function(windowWidth){
		     if(windowWidth && windowWidth <= 769){
		    	 if(!$scope.isSVP){
			    	 $scope.isSVP = true;
			    	 $scope.viewPortHtml = 'ups.ppc-contactSVP.html';
		    	 }
		     }else{
		    	 $scope.isSVP = false;
		    	 $scope.viewPortHtml = 'ups.ppc-contactLVP.html';
		     }
		 });

		//TO be moved to util function
		$scope.safeApply = function(fn) {
            if (!this.$root.$$phase) {
                return;
            }
            
		    var phase = this.$root.$$phase;
		    if (phase === '$apply' || phase === '$digest') {
		        if (fn && (typeof(fn) === 'function')) {
		            fn();
		        }
		    } else {
		        this.$apply(fn);
		    }
		};

		//DEFINE VARIABLES
		var i=0, j=0;
		//END DEFINE VARIABLES

		$scope.search = function(){
			$scope.contacts.searchValue = $scope.contacts.search.first_name;
		};

		$scope.reset = function(){
			$scope.contacts.searchValue = '';
			$scope.contacts.search.first_name = '';
		};
		$scope.searchList = function(){
			$scope.distribution.searchValue = $scope.distribution.search.name;
		};

		$scope.resetList = function(){
			$scope.distribution.searchValue = '';
			$scope.distribution.search.name = '';
		};

		$scope.percent = 0;
		$rootScope.errorState = false;

		var config = {
			sortType: 'name',
			sortReverse: false,
			search: '',
			list: [],
			selectedAll: false,
			add: function(){},
			getSelected: function(list){
				var selectedList = [];
				angular.forEach(list, function (item) {
		            if(item.Selected){
		            	selectedList.push(item);
		            }
		        });
				return selectedList.length === 0 ? true: false;
			},
			checkAll: function(selectedAll, list){
				if (selectedAll) {
					selectedAll = true;
		        } else {
		        	selectedAll = false;
		        }
		        angular.forEach(list, function (item) {
		            item.Selected = selectedAll;
		        });
			},
			setCheckParent: function(selectedAll,list){
	      	var checkLength = $filter('filter')(list, { Selected: false }).length;
	      	if(checkLength!==0){
	      		$scope.contacts.selectedAll = false;
	      	}else{
	      		$scope.contacts.selectedAll = true;
	      	}


			}
		};

		 $scope.add = function(){
		 	$rootScope.lastPage	='contact';
			$rootScope.isAddContact = true;
		 	$location.path('/contactPage/open');
		 };

		 $scope.editAddressInfo = function(index){
		 	$rootScope.indexVal = index;
		 	$rootScope.lastPage ='contact';
			$rootScope.isAddContact = false;
		 	$location.path('/contactPage/edit');
		 };
		 
		 $scope.myChoiceInfo = function(index){
		 	$rootScope.indexVal = index;
		 	$rootScope.lastPage ='contact';
			$rootScope.isAddContact = false;
		 	$location.path('/preferencePage/mychoicePreference');
		 };
	
		 /**
	* @function
	* @name toggleDeafultAddress
	* @description Toggle address text for default and make default address
	*/
    $scope.toggleDefaultAddress=function(index){
        /* angular.forEach($scope.parentFormObj, function(value) {
            if(value.defaultAddressBtn==='Default Address'){
                value.defaultAddressBtn='Make Default'; 
            }
        });
        $scope.parentFormObj[index].defaultAddressBtn = 'Default Address'; */
		 		 
		var ppcMakeDefault = function(){
			for(var i = 0; i < $scope.contacts.list.length; i++) {
				$scope.contacts.list[i].isdefaultAddressBtn = false;
			}
			$scope.contacts.list[index].isdefaultAddressBtn = true;
		};
		 
		if ($scope.contacts.list[index].phone) {
			 new ppcMakeDefault();
		} else {
			ModalService.open({
				title: 'Enter your phone number.',
				content: '/app_assets/templates/ups.doa-homephoneModal.html'
			}, function(modalScope) {
                modalScope.phone_number = '';
				modalScope.ppcVerifyPhone = true;
				
				modalScope.defaultPhoneNumber = function(){
					$scope.contacts.list[index].phone = modalScope.phone_number;
					console.log($scope.contacts.list);
					console.log(modalScope);
					new ppcMakeDefault();
					
					ModalService.close();
				};
				
			});	
		}
		
	};
		
		$scope.searchTable = function(){
			var tags = addressServices.getTags();
			$scope.tags = angular.copy(tags);
		};



		$scope.exportContacts = function(disabled){
			if(!disabled){
				ModalService.open({
	 	            title: 'Export Contacts',
		            content: '/app_assets/templates/ups.ppc-roundProgressBarModal.html',
					component: 'ppc'
		        },function(sc){
					var promise;
					sc.percent = 0;
					sc.overError = false;
					$rootScope.errorState = false;

					function resetInterval(){
						$interval.cancel(promise);
						sc.percent = 0;
					}
					resetInterval();

					sc.stopProgressBar = function(){
						sc.percent=0;
					};

					sc.btnText='Next';
					sc.message='Please wait while your contacts are exported.';
					promise = $interval( function(){
						sc.percent = progressBarService.startProgressBar(sc.percent);
					}, 1000);

					sc.stopProgressBar = function(){
						$interval.cancel(promise);
					};
					sc.openExportContacts = function(btnText){
						if(btnText === 'Next'){
							sc.cancel();
							$location.path('/contactPage/exportContacts');
						}else{
							$interval.cancel(promise);
						}
					};
				});
			}
		};

		$scope.$on('hidePopover', function(){
			$scope.togglePopover();
		});
        
        $scope.closePopover = function (focusElem) {
            //bootstrap popover workaround
            $document[0].body.click();
            
            if (focusElem) {
                angular.element('#' + focusElem).focus();
            }
        };

		$scope.togglePopover = function() {
			$scope.isTagsOpen = !$scope.isTagsOpen;
			$rootScope.linkClicked = 'filterByTags';

			if ($scope.isTagsOpen) {
				/*$rootScope.callWindowEvent('contact', function(event) {
					addressServices.closeClickingElsewhere($rootScope, event, $scope.closePopover);
			    });*/
			} else {
				  $scope.isTagsOpen = false;
				  $scope.safeApply();
			}
		};
		/*END Tag show-hide functionality*/

		/**
		* @function
		* @name init
		* @description Used to initialize the variables
		*/
		function init(){
			$scope.isDisabled = false;
			$scope.sortType= 'name'; // set the default sort type
			$scope.sortReverse  = false;  // set the default sort order
			$scope.searchContact   = '';     // set the default search/filter
												// term
			var tags = addressServices.getTags();
			$scope.tags = angular.copy(tags);
            
            $scope.isTagsOpen = false;


			// Create the Contacts Object
			var list = addressServices.getAddress();
			$scope.contacts = angular.copy(config);
			$scope.contacts.sortType = 'first_name';
			$scope.contacts.list = angular.copy(list);

			/**
			* @function
			* @name contacts.remove
			* @description Delets row from the contact table
			*/
			$scope.contacts.remove = function(index) {
				if(index!==undefined){
					$scope.rowDeleted = index;
				}else{
					$scope.rowDeleted = undefined;
				}
			 	$scope.rowIndex = index;
		        $scope.shiping=false;

		        var modalInstance = ModalService.open({
		        	content:'/app_assets/templates/ups.ppc-edit-account-confirmation-box.html',
		        	title:'Are you sure?',
					component: 'ppc'
		        },function(sc){
	  				 sc.okText = 'Yes';
	   				 sc.cancelText = 'No';
	   				 sc.cancelClass = 'ups-cta_tertiary';
	   	             sc.pageSubTitle = 'If you continue, we\'ll permanently remove this information from your profile.';
	   		 	});
		   	    modalInstance.result.then(function() {
		   			// Send Service request delete TODO

				 	var tempArr = [];
		   	    	if($scope.rowDeleted!==undefined){
						 for(i=0;i<$scope.contacts.list.length;i++){
							 if($scope.contacts.list[i]._id!==$scope.rowDeleted){
								 tempArr.push($scope.contacts.list[i]);
							 }
						 }
					 }else{
						 for(i=0;i<$scope.contacts.list.length;i++){
							 if(!$scope.contacts.list[i].Selected){
								 tempArr.push($scope.contacts.list[i]);
							 }
						 }
					 }
					 addressServices.setAddress(tempArr);
					 $scope.contacts.list = tempArr;
					 if($scope.contacts.list.length === 0){$scope.isDisabled = true;}

		   	    }, function() {
		   	        // Cancel
		   	    });
			};

			// Create the distribution Object
			var distList = addressServices.getDistribution();
			$scope.distribution = angular.copy(config);
			$scope.distribution.list= angular.copy(distList);

			/**
			* @function
			* @name distribution.add
			* @description Add distribution list
			*/
			$scope.distribution.add = function() {
				$rootScope.lastPage	='contact';
				$rootScope.isAddDistribution = true;
			 	$location.path('/contactPage/addDistribution');
			};

			/**
			* @function
			* @name distribution.edit
			* @description Edit distribution list
			*/
			$scope.distribution.edit = function(index) {
				$rootScope.lastPage	='contact';
				$rootScope.indexVal = index;
				$rootScope.isAddDistribution = false;
			 	$location.path('/contactPage/editDistribution');
			};

			/**
			* @function
			* @name distribution.remove
			* @description Remove distribution list
			*/
			$scope.distribution.remove = function(index) {
				if(index!==undefined){
					$scope.rowDeleted=index;
				}else{
					$scope.rowDeleted = undefined;
				}

				var modalInstance = ModalService.open({
		            content: '/app_assets/templates/ups.ppc-edit-account-confirmation-box.html',
		            title:'Are you sure?',
					component: 'ppc'
		        },function(sc){
				 sc.okText = 'Yes';
	   				 sc.cancelText = 'No';
	             sc.pageSubTitle = 'If you continue, we\'ll permanently remove this information from your profile.';
	   		 	});


	   	   	    modalInstance.result.then(function() {
	   	   			// Send Service request delete TODO

	   			 	var tempArr = [];
					 if($scope.rowDeleted!==undefined){
						 for(i=0;i<$scope.distribution.list.length;i++){
							 if($scope.distribution.list[i].id!==$scope.rowDeleted){
								 tempArr.push($scope.distribution.list[i]);
							 }
						 }
					 }else{
						 for(j=0;j<$scope.distribution.list.length;j++){
							 if(!$scope.distribution.list[j].Selected){
								 tempArr.push($scope.distribution.list[j]);
							 }
						 }
					 }
					 addressServices.setDistribution(tempArr);
					 $scope.distribution.list = tempArr;
	   	   	    }, function() {
	   	   	        // Cancel
	   	   	    });
			};
		}

		init();
	}]);

/**
 * @controller
 * @name upsDOApp.controllers.controller : contactEditCtrl
 * @description Controls Edit contact Page flow
 * @template : ups.doa-openAccount-fail.html and ups.doa-openAccount-failModal.html
 */
ContactModule.controller('contactEditCtrl',['$scope','$location','$window','UtilService','$rootScope','addressServices','MockJSONCalls','DashboardService','$filter', '$document', function($scope,$location,$window,UtilService,$rootScope,addressServices,MockJSONCalls,DashboardService,$filter, $document){
	$scope.tagFilter = {
		type: 'custom'
	};

	/**
	* @function
	* @name addTag
	* @description Add new tag maximum upto Default5 + 20custom length  -> 25
	*/
	$scope.tagsTemplateUrl = '/app_assets/templates/ups.ppc-tagPopover.html';
	$scope.addTag = function(newTag){
		if(!newTag){
			$scope.newTag = undefined;
			$scope.notEdited = false;
			return;
		}
		if($scope.tags.content.length<25){
			var flag = addressServices.addTag({name:newTag});
			if(!flag){
				$scope.tags.content.push({
					name:newTag,
		            type: 'custom'
		        });
				$scope.newTag = undefined;
				$scope.notEdited = false;
			}else{
				$scope.notEdited = true;
			}
		}
	};
	$scope.removeTag = function(item){
		addressServices.tags.remove(item);

		var tags = addressServices.getTags();
		$scope.tags = angular.copy(tags);
	};
	$scope.editTag = function(item, index){

		$rootScope.clickedSaveEdit = true;
		for(var i=0;i<$scope.tags.content.length;i++){
			$scope.tags.content[i].editable = false;
		}

		item.editable = true;
		$scope.notEdited = false;
		$scope.isOpen = true;


        setTimeout(function(){
            $('#ups-tag_' + index + '_edit').focus();
            console.log('input: ' + '#ups-tag_' + index + '_edit');
        }, 50);
	};
	$scope.saveTag = function(item, index){

		$rootScope.clickedSaveEdit = true;
		$scope.isOpen = true;

		for(var i=0;i<$scope.tags.content.length;i++){
			$scope.tags.content[i].editable = false;
		}
		if(!item.name){
			$scope.notEdited = false;
			for(i=0;i<$scope.tags.content.length;i++){
				$scope.tags.content[i].notEdited = false;
			}
			return;
		}
		if(item.editable === false){
			item.notEdited = addressServices.tags.edit(item, index);

			var tags = addressServices.getTags();
			$scope.tags = angular.copy(tags);
		}
	};

	/**
	* @function
	* @name filterChanged
	* @description Filter based on tag
	*/
	$scope.filterChanged = function(){
		var filter = angular.copy($scope.tags.content);
		var selectedList = [];
		$scope.isOpen = true;
	    angular.forEach(filter, function (filtervalue) {
		    if(filtervalue.Selected === true){
		      selectedList.push(filtervalue.name);
		    }
		});
	    $scope.formObj.tagId = selectedList;
	};

	/**
	* @function
	* @name safeApply
	* @description TAG Popover functionality
	*/
	$scope.safeApply = function(fn) {
        if (!this.$root.$$phase) {
            return;
        }
        var phase = this.$root.$$phase;
        if (phase === '$apply' || phase === '$digest') {
            if (fn && (typeof(fn) === 'function')) {
                fn();
            }
        } else {
            this.$apply(fn);
        }
	};


    $scope.$on('hidePopover', function(){
		//$scope.togglePopover();
        //console.log('g');
    });
    
    /*$scope.$watch('windowWidth', function (windowWidth) {
        if(windowWidth && windowWidth <= 992) {
            $scope.tags.position = 'bottom-right';
        } else {
            $scope.tags.position = 'bottom-left';
        }
    });*/
    
    //bootstrap popover workaround
    $scope.closePopover = function (focusElem) {
        //$document[0].body.click();
        
        $scope.tagPopoverOpen = false;
        
        if (focusElem) {
            angular.element('#' + focusElem).focus();
        }
        
        
    };
    
    /*$scope.$watch('tagPopoverOpen', function (newValue) {
        if (newValue === true) {
            angular.element('#popoverTagTitle').focus();
        }
    });*/

	/**
	* @function
	* @name togglePopover
	* @description TAG Popover hide show functionality
	*/
	$scope.togglePopover = function(){
		/*$scope.isOpen = !$scope.isOpen;
		$rootScope.linkClicked = 'addTags';

		if ($scope.isOpen) {
			if($rootScope.clickedSaveEdit){
				$scope.isOpen = false;
	              $scope.safeApply();
			}else{*/
				/*$rootScope.callWindowEvent('contactedit', function(event) {
					addressServices.closeClickingElsewhere($rootScope, event, $scope.togglePopover);
			    });*/
			/*}
		  } else {
			  $scope.isOpen = false;
              $scope.safeApply();
		  }*/
	};
	/*END Tag show-hide functionality*/
	//End Tags

	/**
	* @function
	* @name changeCountryVal
	* @description Changing state value based on country
	*/
	$scope.changeCountryVal=function(){
		if($scope.formObj.country==='us'){
			$scope.formObj.state_select= 'Select One';
		}
		else{
			$scope.formObj.state_select= '';
		}
	};

	/**
	* @function
	* @name checkArrayTag
	* @description filter to check for my address tag
	*/
	function checkArrayTag(){
		return $filter('filter')(addressServices.parentFormObj, { tagId: 'My Address' });
	}

	/**
	* @function
	* @name submitForm
	* @description Sumitting add/edit contact form
	*/
	$scope.submitForm = function(){
		$scope.filterChanged();
		//Check for my information
        var myaddressTagCheck =($scope.formObj.tagId.indexOf('My Address')!==-1);
		var obj = checkArrayTag();
        if(myaddressTagCheck && obj.length>=5){
        	//Error scroll to top
        	$scope.errorList = [{
        		errorCode: '1223',
        		errorMessage: 'Limit of Tag - My address is 5.'
        	}];
        	return;
        }

		if($location.path() === '/contactPage/open'){
        	$scope.formObj.isdefaultAddressBtn = false;
        	$scope.formObj.defaultAddressBtn='Make Default';
        	addressServices.addAddress($scope.formObj);
        }
        else if($location.path() === '/contactPage/edit'){
        	addressServices.editAddress($scope.formObj);
        	$scope.parentFormObj[$rootScope.addressIndex] = $scope.formObj;
        }

        if($rootScope.lastPage==='contact'){
           $location.path('/contactPage');
           $window.scrollTo(0, 0);
        }else if($rootScope.lastPage==='information'){
        	$location.path('/informationPage');
        }
        else{
        	$location.path('/contactPage');
        }
	};

	/**
	* @function
	* @name onEditName
	* @description changing text content based on edit condition
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
	* @name resetForm
	* @description Resets the form
	*/
    function resetForm(){
        $scope.formObj = {};
        $scope.formObj.phoneType = ['Mobile','Home','Work','Other'];
        $scope.formObj.phone_type = $scope.formObj.phoneType[0];
    }

    /**
	* @function
	* @name setAddress
	* @description Setting placeholders and address value
	*/
    function setAddress(data){
        $scope.countryList = data.countries;
        $scope.statesList = data.states;
        $scope.termsAndConditionsURL = data.tncUrl;
        $scope.ups_placeholder = data.placeholder;// add // placeholders
        $scope.referenceList1= data.referenceType1;
        $scope.referenceList2= data.referenceType2;
        $scope.helpCBUrl= data.helpCBUrl;
    }

	/**
	* @function
	* @name init
	* @description Used to initialize the variables
	*/
    function init(){
    	var tags = addressServices.getTags();
    	$scope.tags = angular.copy(tags);
    	$scope.isOpen= false;
        
        $scope.tagPopoverOpen = false;

    	$scope.parentFormObj= addressServices.parentFormObj;
        $scope.editNameJson={firstName: 'John',lastName: 'Smith',middleName: '',suffix: 'Jr'};
        $scope.formObj={};
        $scope.phoneObj={};
        $scope.editAddressModalBox= false;
        $scope.deleteAddressModalBox=false;
        $scope.editName = false;
        $scope.addPhoneBtn=true;

        // resetForm();

		var metaData = DashboardService.getMetaData();
 	 	if(metaData.countries){
 	 		setAddress(metaData);
 	 	}else{
 			MockJSONCalls.getJson({urlString: 'ups.doa-metaData.json'})
 	        // then() called when response gets back
 	        .then(function(data) {
 	            // promise fulfilled TODO set metadata
 	        	DashboardService.setMetaData(data);
 	 	 		setAddress(metaData);
 	        }, function() {
 	            // promise rejected
 	        });
 	 	}

        if($location.path() === '/contactPage/edit') {
        	resetForm();
        	angular.forEach($scope.parentFormObj, function (filtervalue) {
    		    if(filtervalue._id === $rootScope.indexVal){
		     		angular.extend($scope.formObj,filtervalue);

    		    }
    		});
            if(!$scope.formObj){
            	$scope.formObj={};
            }
			
			if ($scope.parentFormObj.length < 2) {
				$scope.phoneRequired = true;
			}
			
			
            $scope.formObj.pageheading='Edit this contact';
	        $scope.formObj.phoneType = ['Mobile','Home','Work','Other'];
	        $scope.formObj.phone_type = $scope.formObj.phoneType[0];
			
			
			 


	        angular.forEach($scope.tags.content, function (filtervalue) {
    		    if($scope.formObj.tagId && $scope.formObj.tagId.indexOf(filtervalue.name)!==-1){
    		    	filtervalue.Selected = true;
    		    }
    		});
        }
        else if($location.path() === '/contactPage/open'){
        	$scope.formObj = {};
        	resetForm();
        	if(!$scope.formObj){
            	$scope.formObj={};
            }
        	$scope.formObj.pageheading='Add a contact';
        	$scope.formObj.country = $scope.countryList[0].code;
        	$scope.formObj.state_select = 'Select One';
        	//Change selection for tags
        	if($rootScope.lastPage!=='contact'){
        		$scope.tags.content[0].Selected = true;
        	}
        	if($rootScope.lastPage==='information'){
        		$scope.formObj.first_name= $scope.editNameJson.firstName+' '+$scope.editNameJson.lastName;
        	}
			
			if ($scope.parentFormObj.length < 1) {
				$scope.phoneRequired = true;
			}
        }
    }

    

     /**
	* @function
	* @name deleteAddress
	* @description Deletes current value
	*/
    $scope.deleteAddress = function(){
        $scope.parentFormObj.splice($scope.currentIndex, 1);
    };

    /**
	* @function
	* @name helpLink
	* @description Help link for location id
	*/
	$scope.helpLink = function(){
		UtilService.openTearmsAndConditions('https://www.ups.com/content/us/en/myups/address/consigneebillable.html');
	};

	 /**
	* @function
	* @name helpLink
	* @description Help link for Consignee Billing
	*/
	$scope.helpConsigneeBillingUrl = function(){
		UtilService.openTearmsAndConditions($scope.helpCBUrl);
	};

	$scope.$on('$routeChangeStart', function() {
	        init(0);
		 });
    // INIT function
    init(0);
}]);

/**
 * @controller
 * @name upsDOApp.controllers.controller : distributionAddCtrl
 * @description Controls Distribution Contacts Page flow
 * @template : ups.doa-openAccount-fail.html and ups.doa-openAccount-failModal.html
 */
	ContactModule.controller('distributionAddCtrl',['$scope','$location','UtilService','$rootScope','addressServices',function($scope,$location,UtilService,$rootScope,addressServices){
		var config = {
			search: '',
			sortType: 'first_name',
			list: [],
			getSelected: function(list){
				var selectedList = [];
				angular.forEach(list, function (item) {
		            if(item.Selected){
		            	selectedList.push(item);
		            }
		        });
				return selectedList.length === 0 ? true: false;
			}
		};
		$scope.selected = false;
		$scope.checkUncheck = function(){
			var list = $scope.contacts.list;
			for(var i=0;i<list.length;i++) {
	            if(list[i].Selected){
	            	$scope.selected = true;
	            	break;
	            }else{
	            	$scope.selected = false;
	            }
	        }
		};
		$scope.submitForm = function(goBack) {
			if(goBack){
				// Create distribution list elements
				var selectedList = [];
				var list = $scope.contacts.list;
				for(var i=0;i<list.length;i++) {
		            if(list[i].Selected){
		            	list[i].Selected = false;
		            	selectedList.push(list[i]);
		            }
		        }


				if($location.path() === '/contactPage/editDistribution') {
					addressServices.editDistribution({
						id: $scope.formObj.id,
						name: $scope.formObj.nick_name,
						list: selectedList
					});
				}else{
					addressServices.addDistribution({
						name: $scope.formObj.nick_name,
						list: selectedList
					});
				}
			}
			$location.path('/contactPage');
		};
		// init
		function init(){

			var list = addressServices.getAddress();
			 $scope.contacts = angular.copy(config);
			 $scope.contacts.list = angular.copy(list);

			if($location.path() === '/contactPage/editDistribution') {
				var list1 = addressServices.getDistribution();

				for(var k=0;k<list1.length;k++){
					if(list1[k].id === $rootScope.indexVal){
			            $scope.formObj.nick_name= list1[k].name;
			            $scope.formObj.id= list1[k].id;

			            for(var i=0;i<$scope.contacts.list.length;i++){
			            	for(var j=0;j<list1[k].list.length;j++){
			                	if($scope.contacts.list[i]._id===list1[k].list[j]._id){
			                		$scope.contacts.list[i].Selected = true;
			                	}
			                }
			            }
						break;
					}

				}
				$scope.checkUncheck();


	            $scope.pageheading='Edit Distribution List';
	        }
	        else if($location.path() === '/contactPage/addDistribution'){
	        	$scope.formObj = {};
	        	$scope.pageheading='Add Distribution List';
	        }


		}
		init();
	}]);

/**
 * @controller
 * @name upsDOApp.controllers.controller : exportContactsCtrl
 * @description This module contains the exported contacts and saving them on local system functionality
 * @template : ups.doa-openAccount-fail.html and ups.doa-openAccount-failModal.html
 */
	ContactModule.controller('exportContactsCtrl',['$scope',function($scope){

		function setFile( data, fileName, fileType ) {
		    // Set objects for file generation.
		    var blob, url, a, extension;

		    // Get time stamp for fileName.
		    var stamp = new Date().getTime();

		    // Set MIME type and encoding.
		    fileType = ( fileType || 'text/csv;charset=UTF-8' );
		    extension = fileType.split( '/' )[1].split( ';' )[0];
		    // Set file name.
		    fileName = ( fileName || 'ActiveVoice_' + stamp + '.' + extension );

		    // Set data on blob.
		    blob = new Blob( [ data ], { type: fileType } );

		    // Set view.
		    if ( blob ) {

		    	if (navigator.appVersion.toString().indexOf('.NET') > 0){
		            window.navigator.msSaveBlob(blob, fileName);
		    	}else{
		        // Read blob.
		        url = window.URL.createObjectURL( blob );
		        // Create link.
		        a = document.createElement( 'a' );
		        // Set link on DOM.
		        document.body.appendChild( a );
		        // Set link's visibility.
		        a.style = 'display: none';
		        // Set href on link.
		        a.href = url;
		        // Set file name on link.
		        a.download = fileName;

		        // Trigger click of link.
		        a.click();
		    	}


		    } else {
		        // Handle error.
		    }
		}
		function download( data ) {
		    var result = '',
		        headers = [],
		        header = '',
		        field = '';

		    // Process data.
		    $.each( data, function( index, rows ) {
		        // Set columns.
		        $.each( rows, function( name, column ) {
		            if ( column.value ) {
		                // Format header.
		                header = name;

		                // Set header if not already set.
		                if ( $.inArray( header, headers ) === -1 ) {
		                    // Set column header and delimiter.
		                    headers.push( header );
		                }

		                // Set field.
		                // Escape commas that will split value into columns.
		                field = ( column.value ).replace( /,/g, '' );

		                // Set column value and delimiter.
		                result += field + ',';
		            }
		        });

		        // Set new row.
		        result += '\n';
		    });

		    // Set headers.
		    headers = headers.join( ',' );

		    // Ready data for reading.
		    result = headers + '\n' + result;

		    setFile( result );
		}
		$scope.downloadExpContacts = function(){
			var data = [ { foo: 'bar', goo: 'gaa' }, { yep: 'yeah', nope: 'nah' } ];
	    	download( data );
		};
	}]);

/**
 * @controller
 * @name upsDOApp.controllers.controller : importContactsCtrl
 * @description This module selects the imported contacts file from local system and adds them in the application
 * @template : ups.doa-openAccount-fail.html and ups.doa-openAccount-failModal.html
 */
	ContactModule.controller('importContactsCtrl',['$scope','$interval','$location','$timeout','Upload','uploadServices','addressServices','UtilService','ModalService',function($scope,$interval,$location,$timeout,Upload,uploadServices,addressServices,UtilService, ModalService){
		 $scope.fileName='No file selected';
		 $scope.maxSize='12MB';
		 $scope.form={};
		 $scope.orignalFileFormat =['UPS Contacts',
		 'UPS WorldShip',
		 'UPS WorldShip International',
		 'DHL.com Address Book',
		 'DHL EasyShip® Address Book',
		 'DHL CorporateShip Address Book',
		 'FedEx.com Address Book',
		 'FedEx Ship Manager®  Address Book'];
		 /**
	* @function
	* @name openAddressTermsAndConditions;
	* @description open the window for my upload your contacts.
	*/
	$scope.openAddressTermsAndConditions = function(){
		UtilService.openTearmsAndConditions('https://www.ups.com/content/us/en/myups/address/import_addresses.html');
	};


		 $scope.addFil = function(file){
		 	if(file){
			   var name= file.name;
			   var ext = file.name.split('.')[1];
			    if(ext==='csv'){
			    	$scope.fileError = false;
				 	$scope.fileName = name;
				 	$scope.picFile=file;
				 	$scope.fileCopy=$scope.picFile;
				}else{
					$scope.fileError = true;
					$scope.picFile =null;
					$scope.fileName='No file selected';
				}
		 	}
		 	else{
		 		$timeout(function() {
		 			$scope.picFile = $scope.fileCopy;
		 		}, 10);

		 	}
		 };


		 $scope.uploadFiles = function(file) {

			 var modalInstance = ModalService.open({
					title: 'Import Contacts',
		            content: '/app_assets/templates/ups.ppc-roundProgressBarModal.html',
					component: 'ppc'
		        },function(sc){
		        	sc.overError = false;
					var callBackForUpload = function(){
				           sc.percent=file.progress;
				           sc.fileCopy = file;
					 	 };
					 	 file.csv = true;
					 	 file = uploadServices.uploadFile(file,callBackForUpload);
					 	 sc.message='Please wait while your contacts are imported.';
				        sc.btnText='Done';
					sc.openExportContacts = function(btnType){
						sc.ok(btnType);
					};
				});

	   	    modalInstance.result.then(function() {
	   			// Send Service request delete TODO
	   			var i;
	   	     	if($scope.form.contact === 'Add'){
	   	     		for(i =0;i<10;i++){
	   	     			var obj ={};
	   	     			addressServices.addrsSample._id = addressServices.addrsSample._id +i+1 ;
	   	     			angular.extend(obj,addressServices.addrsSample);
	   	     			addressServices.addImportAddress(obj);
	   	     		}
	   	     	}
	   	     	if($scope.form.contact==='Replace'){
	   	     		addressServices.deleteData();

	   	     		for(var j =0;j<10;j++){
	   	     			var obj1 ={};
	   	     			addressServices.addrsSample._id = addressServices.addrsSample._id +j+1 ;
	   	     			angular.extend(obj1,addressServices.addrsSample);
	   	     			addressServices.addImportAddress(obj1);
	   	     		}
	   	     	}
	   	     	$location.path('/contactPage');

	   	    }, function() {
	   	        // Cancel
	   	    });
	    };
	    $scope.cancel = function(){
	    	$location.path('/contactPage');
	    };
	}]);
