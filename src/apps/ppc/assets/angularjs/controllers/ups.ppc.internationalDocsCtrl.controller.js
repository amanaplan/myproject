'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module and store in the variable 'Controller'
 */
var PrefrenceModule = angular.module('upsDOApp.controllers');

/**
 * @controller
 * @name upsDOApp.controllers.controller : InternationalDocCtrl
 * @description International Documentation Preferences  Controller
 * @template : ups.ppc-internationalDocs.html and ups.ppc-internationalDoc-preference.html
 */
	PrefrenceModule.controller('InternationalDocCtrl',['$scope','UtilService','ModalService',function($scope,UtilService,ModalService){
	/**International Documentation Navigation**/
		$scope.ModalService =ModalService;
		var referenceData='ups.international-DocsPreference.json';
		
		/**
		* @function
		* @name init
		* @description Used to initialize the variables
		*/
		function init(){
			$scope.IDType = [];
			$scope.EEIRole = [];
			$scope.formObj = {};
			$scope.isDisabled = false;
		}
		
		/** Array stores the Accordion headings and content **/
		$scope.groups = [
			{
				title: 'Forms','content':'app_assets/templates/ups.ppc-internationalDocs.html',
				active: true
			}, {
				title: 'Declaration Statement Library','content':'app_assets/templates/ups.ppc-declarationStatementLib.html'
			}, {
				title: 'Paperless Shipping Lanes','content':'app_assets/templates/ups.ppc-paperlessShippingLane.html'
			}
		]; 
		
		init();
		
		/**
		* @function
		* @name UtilService.mockServiceCalls
		* @description Service to fetch the data from JSON
		*/
		UtilService.mockServiceCalls({urlString: referenceData}, function(response){
			var obj = response.data;
			if(obj.errorCode){
				console.log('error');
			} else {
				$scope.IDType = obj.IntlDocsPreferences.IntlDocsPref.IDType;
				$scope.EEIRole = obj.IntlDocsPreferences.IntlDocsPref.EEIRole;
				
				$scope.EEIRole.unshift({'type': 'Select EEI Role'});
				$scope.formObj.EEIRole = $scope.EEIRole[0].type;
				
				$scope.IDType.unshift({'type': 'Select ID Type'});
				$scope.formObj.IDType = $scope.IDType[0].type;
			}
		});
		
		/**
		* @function
		* @name saveIntlDocsData
		* @description Make the form Pristine when form opens up 
		*/
		$scope.saveIntlDocsData = function(){
			$scope.isDisabled = true;
			this.ups_intlDocsform.$setPristine();
		};
	}]);

/**
 * @controller
 * @name upsDOApp.controllers.controller : DeclarationStatementLibCtrl
 * @description This controller contains the declaration statement library preferences controller and their details
 * @template : ups.ppc-declarationStatementLib.html, ups.ppc-add-statement-Dec-modal.html and ups.ppc-preview-statement-modal.html
 */
	PrefrenceModule.controller('DeclarationStatementLibCtrl',['$scope','paymentService','ModalService','$rootScope',function($scope,paymentService,ModalService,$rootScope){
		
		$scope.myForm={};
		var setData = function(obj) {
	    	$scope.statementData.statementInfo = obj;
	    };
	
		/**
		* @function
		* @name makeOtherNonDefault
		* @description Makes the other statements as MAKE DEFAULT
		*/
		  function makeOtherNonDefault(){
	      var data = $scope.statementData.statementInfo;
	      angular.forEach(data, function(value, key) {
	         data[key].Default='MAKE DEFAULT';
	         data[key].makeDefault=false; 
	      });
		  }
		  
		$scope.info = [ {
	    	_id: 1,
	        'name' : 'Statement 1 Name',
	        'preview' : 'Preview first xx characters...',
	        'previewDetail' : '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	        'Default' : 'DEFAULT METHOD',
	        'makeDefault' : true,
	        'SameAddr' : true,
	        'diffAddr' : false
	    },{
	    	_id: 2,
	        'name' : 'Statement 2 Name',
	        'preview' : 'Preview first xx characters...',
	        'previewDetail' : '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	        'Default' : 'MAKE DEFAULT',
	        'makeDefault' : false,
	        'SameAddr' : true,
	        'diffAddr' : false
	    },{
	    	_id: 3,
	        'name' : 'Statement 3 Name',
	        'preview' : 'Preview first xx characters...',
	        'previewDetail' : '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	        'Default' : 'MAKE DEFAULT',
	        'makeDefault' : false,
	        'SameAddr' : true,
	        'diffAddr' : false
	    },{
	    	_id: 4,
	        'name' : 'Statement 4 Name',
	        'preview' : 'Preview first xx characters...',
	        'previewDetail' : '4. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	        'Default' : 'MAKE DEFAULT',
	        'makeDefault' : false,
	        'SameAddr' : true,
	        'diffAddr' : false
	    },{
	    	_id: 5,
	        'name' : 'Statement 5 Name',
	        'preview' : 'Preview first xx characters...',
	        'previewDetail' : '5. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
	        'Default' : 'MAKE DEFAULT',
	        'makeDefault' : false,
	        'SameAddr' : true,
	        'diffAddr' : false
	    }];
		
		/**
		* @function
		* @name init
		* @description Initialize the variables when controller loaded
		*/
		function init(){
			$scope.isEditModal = false;
			$scope.isEdModal = false;
			$scope.newStatementChecked = false;
			$scope.statementData = {};
			$scope.statementData.statementInfo = $scope.info;
			$scope.noRecords = false;
			$rootScope.isAddDisabled=false;
			$scope.editIndex = null;
			$scope.isDupName = false;
			$scope.isSaveDisable = true;
		}
		
		/**
		  * @function
		  * @name openPreview
		  * @params index, detText and name
		  * @description Open up the preview Modal for the selected statement
		  */
		$scope.openPreview = function(index,detText,name){
			var modalInstance = ModalService.open({
		        content :'/app_assets/templates/ups.ppc-preview-statement-modal.html',
		        title : 'Declaration Statement Name',
				component: 'ppc'
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
		            sc.previewContent = detText;
					sc.statementName = name;
		        });
			modalInstance.result.then(function() {
		        }, function() {
		        // Cancel
		    });
		};
		
		/**
		  * @function
		  * @name openAddStatement
		  * @description Open up the Add or Edit statement Declaration Statement Modal
		  */
		$scope.openAddStatement = function(){			
			var modalInstance = ModalService.open({
		        content :'/app_assets/templates/ups.ppc-add-statement-Dec-modal.html',
		        title : 'Add a declaration statement.',
				component: 'ppc'
			},
		        function(sc) {
				sc.init = function(){
					sc.isEditModal = false;
					sc.isEdModal = false;
					sc.newStatementChecked = false;
					sc.editIndex = null;
					sc.isDupName = false;
				};
				sc.init();
		            sc.data = [ {
		            	title: 'Vacation Dates',
		            	value: '07/10/2016 - 09/10/2016'
		            }, {
		            	title: 'Vacation Settings',
		            	value: 'Reschedule delivery for 07/10/2016'
		            } ];
		            sc.okText = 'Yes';
		            sc.cancelText = 'No';
		            sc.isEditModal = false;
					sc.isEdModal = false;
					sc.isDupName = false;
					sc.formObj ={};
					//sc.myForm.ups_addStatementDecForm.$setPristine();
					
					/**
					  * @function
					  * @name changeDefault
					  * @params data and index
					  * @description Makes the clicked Statement as DEFAULT, moved it to top and makes others and already existing DEFAULT as 
					 				MAKE DEFAULT
					  */
					sc.changeDefault = function(data,index){
				       angular.forEach(data, function(value, key) {
				        if(key=== index){
				          data[index].Default='DEFAULT METHOD';
				          data[key].makeDefault=true;
				        }else{
				           data[key].Default='MAKE DEFAULT';
				           data[key].makeDefault=false; 
				        }
				        });
				       $scope.statementData.statementInfo = data.sortBy('Default');
				       $scope.statementData.statementInfo = paymentService.sortWithoutDefault($scope.statementData.statementInfo,'name',true);
				       setData($scope.statementData.statementInfo);
				       $scope.isSaveDisable = false;
				    };
				    
				    
				    /**
					  * @function
					  * @name saveStatement
					  * @params name,content and isDefault
					  * @description Saves the statement and added in the Table
					  */
					sc.saveStatement = function(name,content,isDefault){
						var option = {};
						sc.isDupName = false;
						  
						  if(sc.newStatementChecked === true || sc.isEditModal === false){
							  option.name= name; 
							  
							  angular.forEach($scope.statementData.statementInfo, function (item) {
						            if(item.name.toLowerCase() === option.name.toLowerCase()){
						            	sc.isDupName = true;
						            }
						       });
						  }else{
							  option.name = sc.statementName;
						  }
						  
					      option.previewDetail= content;
					      option.makeDefault=isDefault;
						  option.preview= 'Preview first xx characters...';
					      
				
					      if(option.makeDefault){
					            option.Default='DEFAULT METHOD';
					            if(sc.editIndex === null){
					              if(sc.isDupName === false){
						              makeOtherNonDefault();
						              $scope.statementData.statementInfo.push(option);
						    	      sc.changeDefault($scope.statementData.statementInfo,$scope.statementData.statementInfo.length-1);
					              }
					            }else{
					            	makeOtherNonDefault();
					            	sc.statementData.statementInfo[sc.editIndex].name = option.name;
						  			sc.statementData.statementInfo[sc.editIndex].previewDetail = option.previewDetail;
						  			sc.statementData.statementInfo[sc.editIndex].makeDefault = option.makeDefault;
						  			sc.statementData.statementInfo[sc.editIndex].preview = option.preview;
						  			sc.statementData.statementInfo[sc.editIndex].Default = option.Default;
						  			sc.changeDefault($scope.statementData.statementInfo,sc.editIndex);
					            }
					        }else{
						          option.Default='MAKE DEFAULT';
						          if(sc.newStatementChecked === true || sc.isEditModal === false){
						        	  if(sc.isDupName === false){	
						        		  $scope.statementData.statementInfo.push(option);
						        	  }
						  		  }else{
							  			sc.statementData.statementInfo[sc.editIndex].name = option.name;
							  			sc.statementData.statementInfo[sc.editIndex].previewDetail = option.previewDetail;
							  			sc.statementData.statementInfo[sc.editIndex].makeDefault = option.makeDefault;
							  			sc.statementData.statementInfo[sc.editIndex].preview = option.preview;
							  			sc.statementData.statementInfo[sc.editIndex].Default = option.Default;
						  		  }
					        }
					      if(sc.isDupName === false || sc.editIndex !== null){
						      $scope.statementData.statementInfo = paymentService.sortWithoutDefault($scope.statementData.statementInfo,'name',true);
						      $scope.noRecords = false;
						      
						      if($scope.statementData.statementInfo.length === 10){
						    	  $rootScope.isAddDisabled=true;
						      }
					      }
					      
					      sc.editIndex = null;
					      $scope.isSaveDisable = false;
					      if(!sc.isDupName){sc.ok();}
					};
		        });
			modalInstance.result.then(function() {
				}, function() {
		        // Cancel
		    });
		};
		
		/**
		  * @function
		  * @name openEditStatement
		  * @params index,detText,name and defaultValue
		  * @description Open up the Edit statement Declaration Statement Modal
		  */
		$scope.openEditStatement = function(index,detText,name,defaultValue){
			var modalInstance = ModalService.open({
		        content :'/app_assets/templates/ups.ppc-add-statement-Dec-modal.html',
		        title : 'Edit your declaration statement.',
				component: 'ppc'
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
		            $scope.saveDisabled= true;
					sc.isEditModal = true;
					sc.isEdModal = true;
					sc.statementName = name;
					sc.formObj.statementContent = detText;
					sc.newStatementChecked = false;
					sc.formObj.cBoxNewStatement = false;
					sc.isDupName = false;
					sc.editIndex = null;
					if(defaultValue === 'DEFAULT METHOD'){
						sc.formObj.Default = true;
					}else{
						sc.formObj.Default = '';
					}
					
					sc.editIndex = index;					
					/**
					  * @function
					  * @name saveNewStatement
					  * @params check
					  * @description When new statement checkbox is clicked
					  */
				    sc.saveNewStatement = function(check){
				    	sc.newStatementChecked = check;
				    	sc.formObj.statement_name = '';
				    	sc.isEdModal = !check;
				    };
				    
				    /**
					  * @function
					  * @name changeDefault
					  * @params data and index
					  * @description Makes the clicked Statement as DEFAULT, moved it to top and makes others and already existing DEFAULT as 
					 				MAKE DEFAULT
					  */
					sc.changeDefault = function(data,index){
				       angular.forEach(data, function(value, key) {
				        if(key=== index){
				          data[index].Default='DEFAULT METHOD';
				          data[key].makeDefault=true;
				        }else{
				           data[key].Default='MAKE DEFAULT';
				           data[key].makeDefault=false; 
				        }
				        });
				       $scope.statementData.statementInfo = data.sortBy('Default');
				       $scope.statementData.statementInfo = paymentService.sortWithoutDefault($scope.statementData.statementInfo,'name',true);
				       setData($scope.statementData.statementInfo);
				       $scope.isSaveDisable = false;
				    };
				    
				    
				    /**
					  * @function
					  * @name saveStatement
					  * @params name,content and isDefault
					  * @description Saves the statement and added in the Table
					  */
					sc.saveStatement = function(name,content,isDefault){
						var option = {};
						sc.isDupName = false;
						  
						  if(sc.newStatementChecked === true || sc.isEditModal === false){
							  option.name= name; 
							  
							  angular.forEach($scope.statementData.statementInfo, function (item) {
						            if(item.name.toLowerCase() === option.name.toLowerCase()){
						            	sc.isDupName = true;
						            }
						       });
						  }else{
							  option.name = sc.statementName;
						  }
						  
					      option.previewDetail= content;
					      option.makeDefault=isDefault;
						  option.preview= 'Preview first xx characters...';
					      
				
					      if(option.makeDefault){
					            option.Default='DEFAULT METHOD';
					            if(sc.editIndex === null){
					              if(sc.isDupName === false){
						              makeOtherNonDefault();
						              $scope.statementData.statementInfo.push(option);
						    	      sc.changeDefault($scope.statementData.statementInfo,$scope.statementData.statementInfo.length-1);
					              }
					            }else{
					            	makeOtherNonDefault();
					            	$scope.statementData.statementInfo[sc.editIndex].name = option.name;
					            	$scope.statementData.statementInfo[sc.editIndex].previewDetail = option.previewDetail;
					            	$scope.statementData.statementInfo[sc.editIndex].makeDefault = option.makeDefault;
					            	$scope.statementData.statementInfo[sc.editIndex].preview = option.preview;
					            	$scope.statementData.statementInfo[sc.editIndex].Default = option.Default;
						  			sc.changeDefault($scope.statementData.statementInfo,sc.editIndex);
					            }
					        }else{
						          option.Default='MAKE DEFAULT';
						          if(sc.newStatementChecked === true || sc.isEditModal === false){
						        	  if(sc.isDupName === false){	
						        		  $scope.statementData.statementInfo.push(option);
						        	  }
						  		  }else{
						  			$scope.statementData.statementInfo[sc.editIndex].name = option.name;
						  			$scope.statementData.statementInfo[sc.editIndex].previewDetail = option.previewDetail;
						  			$scope.statementData.statementInfo[sc.editIndex].makeDefault = option.makeDefault;
						  			$scope.statementData.statementInfo[sc.editIndex].preview = option.preview;
						  			$scope.statementData.statementInfo[sc.editIndex].Default = option.Default;
						  		  }
					        }
					      if(sc.isDupName === false || sc.editIndex !== null){
						      $scope.statementData.statementInfo = paymentService.sortWithoutDefault($scope.statementData.statementInfo,'name',true);
						      $scope.noRecords = false;
						      
						      if($scope.statementData.statementInfo.length === 10){
						    	  $rootScope.isAddDisabled=true;
						      }
					      }
					      
					      sc.editIndex = null;
					      $scope.isSaveDisable = false;
					      if(!sc.isDupName){sc.ok();}
					};
		        });
			modalInstance.result.then(function() {
		        }, function() {
		        // Cancel
		    });
			
		};
		
		/**
		  * @function
		  * @name changeDefault
		  * @params data and index
		  * @description Makes the clicked Statement as DEFAULT, moved it to top and makes others and already existing DEFAULT as 
		 				MAKE DEFAULT
		  */
		$scope.changeDefault = function(data,index){
	       angular.forEach(data, function(value, key) {
	        if(key=== index){
	          data[index].Default='DEFAULT METHOD';
	          data[key].makeDefault=true;
	        }else{
	           data[key].Default='MAKE DEFAULT';
	           data[key].makeDefault=false; 
	        }
	        });
	       $scope.statementData.statementInfo = data.sortBy('Default');
	       $scope.statementData.statementInfo = paymentService.sortWithoutDefault($scope.statementData.statementInfo,'name',true);
	       setData($scope.statementData.statementInfo);
	       $scope.isSaveDisable = false;
	    };
	    
	    Array.prototype.sortBy = function(p) {
	        return this.slice(0).sort(function(a,b) {
	        return (a[p] > b[p]) ? 1 : (a[p] < b[p]) ? -1 : 0;
	        });
	    };
	    	    
	    /**
		  * @function
		  * @name getSelected
		  * @params list
		  * @description Pushed the selected rows into an array and basis set the variables value
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
				 for(var i=0;i<$scope.statementData.statementInfo.length;i++){
					 if($scope.statementData.statementInfo[i]._id!==$scope.rowDeleted){
						 tempArr.push($scope.statementData.statementInfo[i]);	 
					 }
				 }
			 }else{
				 for(var j=0;j<$scope.statementData.statementInfo.length;j++){
					 if(!$scope.statementData.statementInfo[j].Selected){
						 tempArr.push($scope.statementData.statementInfo[j]);	 
					 }
				 }
			 }
		
			 $scope.statementData.statementInfo = tempArr;
			 if($scope.statementData.statementInfo.length === 0){
				 $scope.noRecords = true;
				 $rootScope.isAddDisabled=false;
			}else if($scope.statementData.statementInfo.length < 10){
		    	  $rootScope.isAddDisabled=false;
		      	}
			 
			 $scope.isSaveDisable = false;
		};
		  /**
			* @function
			* @name saveDecStatementLibData
			* @description Governs the disability of Save Changes Button
			*/
		  $scope.saveDecStatementLibData = function(){
				this.ups_decStatementLibform.$setPristine();
			};
			
		init();	
			
	}]);

/**
 * @controller
 * @name upsDOApp.controllers.controller : PaperlessShippingLanesCtrl
 * @description This controller contains the paperless shipping lanes controller and their details
 * @template : ups.ppc-paperlessShippingLane.html and ups.ppc-manage-paperless-shipping-modal.html
 */
	PrefrenceModule.controller('PaperlessShippingLanesCtrl',['$scope','UtilService','ModalService',function($scope,UtilService,ModalService){
		
		var referenceData='ups.international-DocsPreference.json';
		
		/** Used to initialize the variables **/
		function init(){
			$scope.accountType = [];
			$scope.formObj = {};
			$scope.enableManageLane = true;
		}
		
		/**
		* @function
		* @name UtilService.mockServiceCalls
		* @description Service to fetch the data from JSON
		*/
		UtilService.mockServiceCalls({urlString: referenceData}, function(response){
			var obj = response.data;
			if(obj.errorCode){
				console.log('error');
			} else {
				$scope.accountType = obj.IntlDocsPreferences.IntlDocsPref.paperlessAccount;
				$scope.accountType.unshift({'type': 'Select One'});
				$scope.formObj.accountType = $scope.accountType[0].type;
				
				$scope.prefCountry = obj.IntlDocsPreferences.IntlDocsPref.formsPrefCountry;
				$scope.formPref = obj.IntlDocsPreferences.IntlDocsPref.formsPreference;
			}
		});
		
		/**
		* @function
		* @name enablemanageLaneBtn
		* @params item
		* @description Enables the manage lane button
		*/
		$scope.enablemanageLaneBtn = function(item){
			if(item !== 'Select One'){
				$scope.enableManageLane = false;
			}else{
				$scope.enableManageLane = true;
			}
		};
		
		/**
		* @function
		* @name initialiseRadioValues
		* @description Initializes the Radio buttons in manage lane Modal
		*/
		function initialiseRadioValues(){
			$scope.formObj.prefType =[];
			for(var i = 0; i<$scope.prefCountry.length;i++){
				if(i % 2 === 0){
					$scope.formObj.prefType[i] = 0;
				}else{
					$scope.formObj.prefType[i] = 1;
				}
			}
		}
		
		/**
		* @function
		* @name openmanageLanesPopup
		* @description Opens up the manage lane Modal
		*/
		$scope.openmanageLanesPopup = function(){
			var modalInstance = ModalService.open({
		        content :'/app_assets/templates/ups.ppc-manage-paperless-shipping-modal.html',
		        title : 'Manage your Invoice by shipping lane.',
				component: 'ppc'
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
		            sc.accountNumber = $scope.formObj.accountType;
					sc.originCountry = 'United States';
					sc.prefCountry = $scope.prefCountry;
					sc.formPref = $scope.formPref;
					initialiseRadioValues();
					sc.formObj.prefType = $scope.formObj.prefType;
		            sc.submit = function (){
		            	sc.ok();
		            };
		        });
			modalInstance.result.then(function() {
		        }, function() {
		        // Cancel
		    });
		};
			
		/**
		* @function
		* @name saveManageShippingLanesData
		* @description Save button functionality
		*/
		$scope.saveManageShippingLanesData = function(){
			this.ups_plessShippinglaneform.$setPristine();
		};
		
		init();
		
	}]);