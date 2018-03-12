'use strict';/** * @module * @name upsDOApp.controllers * @description Initialize the module and store in the variable 'controllers' */var controllers = angular.module('upsDOApp.controllers');/** * @method Edit Account Module controller * @desc This module contains the accordion data and internal functions *//** * @controller * @name upsDOApp.controllers.controller : editAccountCtrl * @description Controls the Edit account accordiofuploadFilesn flow * @template : ups.doa-openAccount-fail.html and ups.doa-openAccount-failModal.html */controllers.controller('editAccountCtrl',['$scope','$rootScope', 'UtilService','uploadServices', '$location', 'paymentService','AccountServices','NotificationService','MappingService','ModalService','MockJSONCalls','DashboardService','UserService', function($scope,$rootScope,UtilService,uploadServices, $location, paymentService,AccountServices,notification,MappingService,ModalService,MockJSONCalls,DashboardService,UserService){		$scope.checkAll=function(item){		if(item.Selected){			angular.forEach(item.subCheckbox, function(value){				value.Selected = true;			});		}		else{			angular.forEach(item.subCheckbox, function(value){				value.Selected = false;			});		}	};	$scope.uncheck=function(item){		var flag=false;		for(var i=0;i<item.subCheckbox.length;i++){			if(item.subCheckbox[i].Selected === true){				flag=true;				break;			}		}		if(!flag){			item.Selected = false;		}	};	/** Array stores the letterhead table content **/	$scope.letterheadTable = [{		_id : Date.now(),		imageUrl : 'assets/resources/images/components/list/list1.jpg',		imageName : 'list1.jpg',		invoice : {		package: true,		airfreight:false		},		packingList:{		package: true,		airfreight:false		}	}];	/** Array stores the signature Table content **/	$scope.signatureTable = [{		_id : Date.now(),		imageName : 'list1.jpg',		invoice : {		package: true,		airfreight:false		},		packingList:{		package: true,		airfreight:false		}	}];	  	$scope.pic=['assets/resources/images/components/list/list1.jpg'];	      $scope.picSig =['assets/resources/images/components/list/list2.jpg'];	/**	* @function	* @name addSignatureRow	* @description Add row in signature table	*/	$scope.addSignatureRow=function(picFile){	  	$scope.picSig.push(picFile);	     $scope.signatureTable.push({ 	      _id : Date.now(),	      imageName : picFile.name,	      invoice : {	        package: true,	        airfreight:false	      },	      packingList:{	        package: true,	        airfreight:false	      }	    });	};	/**	* @function	* @name removeRow	* @description Removes row from the table	*/	$scope.removeRow = function(index,type){		$scope.currentIndex=index;		$scope.type=type;		var modalInstance = ModalService.open({			title: 'Delete Image',			content: '/app_assets/templates/ups.ppc-deleteImage.html',			component: 'ppc'		},function(sc){			sc.deleteSignatureImg = function() {				if($scope.type==='signature'){					$scope.signatureTable.splice($scope.currentIndex,1);			   		$scope.picSig.splice($scope.currentIndex,1);				}				else{					$scope.letterheadTable.splice($scope.currentIndex,1);			  		$scope.pic.splice($scope.currentIndex,1);				}				modalInstance.dismiss();			};				sc.back=function(){				modalInstance.dismiss();			};		});	};	/**	* @function	* @name addImage	* @description Upload new image in the table	*/	$scope.addImage = function(str){	  	$scope.f=[];	  	$scope.progressDone=false;	  	$scope.sigHead=false;	  	$scope.letterHead=false;	  	$scope.f.progress=0;	  	if(str==='sigHead'){	  		$scope.sigHead=true;	  	}else{	  		$scope.letterHead=true;	  	}	  	var modalInstance = ModalService.open({				title: 'Select an Image',				content: '/app_assets/templates/ups.ppc-paperless-invoice-upload.html',				component: 'ppc'					        },function(sc){				sc.sigHead = $scope.sigHead;				sc.letterHead = $scope.letterHead;	        	sc.form={};	        	sc.maxSize='2MB';	        	sc.progressDone=false;				sc.selectAnImage=true;	        	sc.verifyYourImage=false;								        	sc.uploadFiles = function(file, errFiles) {	        		if(file){	        			sc.invalidExt = false;	        			sc.invalidFile = false;	        			var ext = file.name.split('.')[1];	        			if(ext.toUpperCase() === 'JPEG' || ext.toUpperCase() === 'JPG' || ext.toUpperCase() === 'GIF' || ext.toUpperCase() === 'TIFF'){	        				sc.invalidExt = false;	        			}else{	        				sc.invalidExt = true;	        				return;  	        			}	        		}	        		if(file){	        			sc.picFile = file;	        		  	sc.fileName= file.name;	        		    sc.f = file;	        		    sc.errFile = errFiles && errFiles[0];	        		}	        		if(errFiles.length){	        			sc.invalidFile = true;	        			sc.invalidExt = false;	        		}	        		var callBackForUpload = function callBackUpload(){	        			sc.progressDone=true;						sc.imageError = false;	        		};	        		file = uploadServices.uploadFile(file,callBackForUpload);                	        	};	 	        	sc.nextToImagePreview = function(){	        	  	sc.form.Selected0=true;	        	  	sc.form.Selected1=true;	        	  	sc.form.Selected2=true;	        	  	sc.form.Selected3=true;					if(!sc.progressDone) {						sc.imageError = true;						return;					}	        	  	/* ModalService.next({						 	    				title: 'Verify your Image',        				content: '/app_assets/templates/ups.ppc-paperless-invoice-image-preview.html'											}); */					sc.verifyYourImage=true;					sc.selectAnImage=false;	        	  };	        	  sc.backtoImageUpload = function(){        		  	/* ModalService.next({        				title: 'Select an Image',        				content: '/app_assets/templates/ups.ppc-paperless-invoice-upload.html'        			}); */					sc.verifyYourImage=false;					sc.selectAnImage=true;        		  };        		          		  sc.addheadRow=function(){        			  sc.formObj = {    					  picFile: sc.picFile,    					  form: sc.form        			  };        			  sc.ok(sc.formObj);        			};						});		modalInstance.result.then(function(formObj) {	        // Send Service request TODO			$scope.fileName='';		  	if($scope.letterHead){		  	$scope.pic.push(formObj.picFile);		     $scope.letterheadTable.push({		      _id : Date.now(),		      imageUrl : formObj.picFile,		      imageName : formObj.picFile.name,		      isfileValid:true,		      invoice : {		        package: formObj.form.Selected0,		        airfreight: formObj.form.Selected1		      },		      packingList:{		        package: formObj.form.Selected2,		        airfreight: formObj.form.Selected3		      }		    });		  }			if($scope.sigHead){				$scope.addSignatureRow(formObj.picFile, formObj.form);			}	    }, function() {	        // Cancel	    });	};	/**	* @function	* @name openLetterAgreement	* @description Opens letter of agreement modal	*/	$scope.openLetterAgreement = function(){		ModalService.open({        	content:'/app_assets/templates/ups.ppc-acknowledgmentModal.html',        	title:'Acknowledgment for UPS Paperless Invoice and/or UPS Paperless NAFTA',			component: 'ppc'        });	};	/**	* @function	* @name openSampleInvoice	* @description URL for sample invoice	*/	$scope.openSampleInvoice = function(){		UtilService.openTearmsAndConditions('https://www.ups.com/content/us/en/shipping/international/documents/intl_forms/comm_invoice.html');	};	$scope.picDisplay = function(pic){	  ModalService.open({		content:'/app_assets/templates/ups.ppc-paperless-imageDisplay.html',		title:'Image Display',		component: 'ppc'	  }, function(sc){		  sc.picPreview=pic;	  });	};	  	$scope.nextToImagePreview = function(){		$scope.form.Selected0=true;		$scope.form.Selected1=true;		$scope.form.Selected2=true;		$scope.form.Selected3=true;	};	  /* SAVE Account Functionality */	$scope.saveAccount= function(formName){		//if form valid				if (formName) {			if (!formName.$valid) {				console.log(formName);				return;			}		}					paymentService.edit($scope.formObj);		$scope.formObj = undefined;		$location.path('/paymentPage');	};	  	  	  	  /** Account Type */	  // FUNTION IF THE BUSINESS BUTTON IS SELECTED	  $scope.isUS=false;		$scope.toggleAccountType=function(index){			if(index===1){				$scope.isBusiness= true;			}			else{				$scope.isBusiness= false;			}		};		// FUNCTION FOR HAZARDOUS MATERIAL SHIPPING REQUEST BEING CHECKED		$scope.privelegesCheck =function(){			if( $scope.isChecked===true){				 $scope.isChecked= false;			}			else{				 $scope.isChecked= true;			}		};		// FUNCTION TO ENABLE THE SUBMIT BUTTON		$scope.choosePrivelege =function(){			if($scope.formObj.shipping_priveleges.hazardous_material || $scope.formObj.shipping_priveleges.lithium_battery){				$scope.sumbitReq = true;			}			else{				$scope.sumbitReq = false;				$scope.confirmSubmit=false;			}		};		// FUNTION TO DISPLAY THE CONFIRMATION OF REQUEST.		$scope.submitRequest= function(){			if($scope.sumbitReq === true){				$scope.confirmSubmit=true;				$scope.isHazSelected = $scope.formObj.shipping_priveleges.hazardous_material;				if($scope.isHazSelected){					$scope.formObj.pickup.selectedOption = '1';				   	}else{				   		$scope.formObj.pickup.selectedOption = '0';				   	}				}			else{				$scope.confirmSubmit=false;			}		};				$scope.openpopup = function(flag){			switch(flag){				case 'idg':				UtilService.openTearmsAndConditions('https://www.ups.com/content/en/us/resources/ship/idg/index.html');				break;				case 'hazardousHelp':				UtilService.openTearmsAndConditions(' https://www.ups.com/cc/ll/help-center/packaging-and-supplies/special-care-shipments/hazardous-materials.html');				break;				case 'industryHelp':				UtilService.openTearmsAndConditions('https://www.ups.com/content/us/en/myups/manage/industry.html');				break;			}					};		$scope.changeState = function(country){			if(country === 'us'){				$scope.formObj.address.state_select = 'Select One';						}else{				$scope.formObj.address.state_select = '';				}		};		/**		 * @method openBillMyAccTnc - will open window for bill my acc help		 */		$scope.openBillMyAccTnc = function(){			UtilService.openTearmsAndConditions('https://www.ups.com/media/en/letter_of_agreement.pdf');		};						/**	    * @function	    * @name variableInitialization	    * @description Function to initialize model variables which gets called whenever		  switches the radio button choices		 */		function variableInitialization(){		    /** Weekday components Variables Initialization * */		    $scope.formObj.pickup.earlyTime = $scope.Hours[0];		    $scope.formObj.pickup.earlyMeridian = $scope.Meridian[0];		    $scope.formObj.pickup.latestTime = $scope.Hours[4];		    $scope.formObj.pickup.latestMeridian = $scope.Meridian[0];		    $scope.formObj.pickup.preferredTime = $scope.Hours[2];		    $scope.formObj.pickup.preferredMeridian = $scope.Meridian[0];		    $scope.formObj.pickup.pickupLocation = 'Select One';		    $scope.errorPreferred = false;		    $scope.errorLatest = false;   		    $scope.errorEarly = false;		    /** Weekday components Variables Initialization * */		    /** Weekend components Variables Initialization * */		    $scope.formObj.pickup.earlyTimeSat = $scope.Hours[0];		    $scope.formObj.pickup.earlyMeridianSat = $scope.Meridian[0];		    $scope.formObj.pickup.latestTimeSat = $scope.Hours[4];		    $scope.formObj.pickup.latestMeridianSat = $scope.Meridian[0];		    $scope.formObj.pickup.preferredTimeSat = $scope.Hours[2];		    $scope.formObj.pickup.preferredMeridianSat = $scope.Meridian[0];		    $scope.formObj.pickup.pickupLocationSat = 'Select One';		    $scope.errorPreferredSat = false;		    $scope.errorLatestSat = false;   		    $scope.errorEarlySat = false;		    /** Weekend components Variables Initialization * */		  }		  		  		/**	      * @function	      * @name togglePickUp	      * @description Function called whenever user switches the radio button choices and basis show relevant components		 */		  $scope.togglePickUp = function(){		    variableInitialization();		  };		  /**			* @function			* @name saveIntlDocsData			* @description Make the form Pristine when form opens up 			*/			$scope.savePickupData = function(){				this.ups_editAccount.$setPristine();			};		/**		* @function		* @name pickupOpenpopup		* @description Function to open the WEM styled POPUP		*/		  $scope.pickupOpenpopup = function(){		    UtilService.openTearmsAndConditions('https://www.ups.com/content/us/en/shipping/account/account/notifytime.html');		  };		  /**		    * @function		    * @name toggleselectText		    * @description Function to toggle between the weekdays and basis apply CSS classes			 */		  $scope.toggleselectText = function(index){		    angular.forEach($scope.specificDays, function(value, key) {		      if(key === index){		        if(value.isSelected === true){		          value.isSelected = false;		        }		        else{		          value.isSelected = true;		        }		      }		    });		  };		  /**		    * @function		    * @name captureText		    * @description Function to captures the additional instructions text		    */		$scope.captureText = function(){		    var str = event.target.value;		    var len = str.length;		    if(len === 0){		      $scope.isEmptyValue = true;		    }else{		      $scope.isEmptyValue = false;		    }		};		/**		* @function		* @name editPref		* @description Function to edit paperless invoice		*/		$scope.editPref = function(){			$scope.accordionVal[5].content='app_assets/templates/ups.ppc-paperless-invoice.html';		};		/**		* @function		* @name editPref		* @description Function to save paperless invoice		*/		$scope.savePaperlessInvoice=function(sForm){			if (sForm) {				if(!sForm.$valid) {					return;				}			}						$scope.enrollmentArray = [];			angular.forEach($scope.checkboxList, function(outer){				if (outer.Selected) {					$scope.enrollmentArray.push(outer.labelText);					angular.forEach(outer.subCheckbox, function(inner){						if (inner.Selected) {							$scope.enrollmentArray.push(inner.labelText);						}					});				}			});					if(($scope.letterheadTable.length===0) || ($scope.signatureTable.length===0)){				$scope.enrollAttentionReq=true;				$scope.enrolledType=false;			}			else{				$scope.enrollAttentionReq=false;				$scope.enrolledType=true;			}			$scope.accordionVal[5].content='app_assets/templates/ups.ppc-paperlessInvoice-enrollment.html';		};		/**		* @function		* @name getTodayDate		* @description Function to fetch the today's date		*/		function getTodayDate(){		    var today = new Date();		    var month = today.getMonth();		    var date = today.getDate();		    var year = today.getFullYear();		    return month+'/'+date+'/'+year;		}		  		  /**		    * @function		    * @name weekdayErrorValidations @params aDate,bDate,cDate,e		    * @description Error validations on Timing dropdowns for weekdays		    */		function weekdayErrorValidations(aDate,bDate,cDate,e){		  	if(aDate < bDate){		        if(aDate < cDate && bDate > cDate)		        {		          $scope.errorPreferred = false;		          $scope.errorLatest = false;   		          $scope.errorEarly = false; 		        }		        else if(aDate === cDate){		        	$scope.errorPreferred = false;		        }else if(bDate === cDate){		        	$scope.errorPreferred = false;		        }else{		          $scope.errorPreferred = true;		          $scope.errorLatest = false;   		          $scope.errorEarly = false;   		        }		    }else if (aDate > bDate){		        if(e === true){		          $scope.errorPreferred = false;		          $scope.errorLatest = false;   		          $scope.errorEarly = true;   		        }		        else{		          $scope.errorPreferred = false;		          $scope.errorLatest = true;   		          $scope.errorEarly = false;		        }		    }else{		        if(aDate === bDate && bDate === cDate && aDate === cDate){		          $scope.errorLatest = true;   		          $scope.errorEarly = true;		          $scope.errorPreferred = true;		        }else		        if(aDate === bDate){		          $scope.errorLatest = true;   		          $scope.errorEarly = true;		          $scope.errorPreferred = false;		        }else		         if(bDate === cDate){		        	 $scope.errorPreferred = false;		        }else		         if(cDate === aDate){		        	 $scope.errorPreferred = false; 		        }		    }		  }		  /**		    * @function		    * @name weekendErrorValidations @params aDate,bDate,cDate,e		    * @description Error validations on Timing dropdowns for weekends		    */		  function weekendErrorValidations(aDate,bDate,cDate,e){		  	if(aDate < bDate){		        if(aDate < cDate && bDate > cDate)		        {		          $scope.errorPreferredSat = false;		          $scope.errorLatestSat = false;   		          $scope.errorEarlySat = false; 		        }		        else if(aDate === cDate){		        	$scope.errorPreferredSat = false;		        }else if(bDate === cDate){		        	$scope.errorPreferredSat = false;		        }else{		          $scope.errorPreferredSat = true;		          $scope.errorLatestSat = false;   		          $scope.errorEarlySat = false;   		        }		    }else if (aDate > bDate){		        if(e === true){		          $scope.errorPreferredSat = false;		          $scope.errorLatestSat = false;   		          $scope.errorEarlySat = true;   		        }		        else{		          $scope.errorPreferredSat = false;		          $scope.errorLatestSat = true;   		          $scope.errorEarlySat = false;		        }		    }else{		        console.log('a and b happened at the same time');		        if(aDate === bDate && bDate === cDate && aDate === cDate){		          $scope.errorLatestSat = true;   		          $scope.errorEarlySat = true;		          $scope.errorPreferredSat = true;		        }else		        if(aDate === bDate){		          $scope.errorLatestSat = true;   		          $scope.errorEarlySat = true;		          $scope.errorPreferredSat = false;		        }else		         if(bDate === cDate){		        	 $scope.errorPreferredSat = false;		        }else		         if(cDate === aDate){		        	 $scope.errorPreferredSat = false;		        }		    }		  }		  		  /**	    * @function	    * @name calTimingDifference	    * @params firstDate,secondDate,betweenDate,e,l,whichday	    * @description Function to show the errors basis the timing differences for timing dropdown 			 */		function calTimingDifference(firstDate,secondDate,betweenDate,e,l,whichday){		  var aDate = new Date(firstDate).getTime();		  var bDate = new Date(secondDate).getTime();		  var cDate = new Date(betweenDate).getTime();		  switch(whichday){		  	case 'weekday':		  	weekdayErrorValidations(aDate,bDate,cDate,e,l);		  	break;		  	case 'weekend':		  	weekendErrorValidations(aDate,bDate,cDate,e,l);		  	break;		  	default:		  	console.log('Caught in default');		  }		}		/**		  * @function		  * @name calculateTimings		  * @params firstDate,secondDate,betweenDate,e,l,whichday		  * @description Function to show the comparison between selected timings 		  */		$scope.calculateTimings = function(whichTime,modelVal,whichday){		    var todayDate = getTodayDate();		    var et,em,lt,lm,pt,pm,early,latest,preferred;		    switch(whichTime){		        case 'early':		          $scope.eTime = true;		          $scope.lTime = false;		        break;		        case 'latest':		          $scope.lTime = true;		          $scope.eTime = false;		        break;		        default:		          console.log('Default');		    }		    if(whichday === 'weekday'){			    et = $scope.formObj.pickup.earlyTime;			    em = $scope.formObj.pickup.earlyMeridian;			    lt = $scope.formObj.pickup.latestTime;			    lm = $scope.formObj.pickup.latestMeridian;			    pt = $scope.formObj.pickup.preferredTime;			    pm = $scope.formObj.pickup.preferredMeridian;			}else{				et = $scope.formObj.pickup.earlyTimeSat;			    em = $scope.formObj.pickup.earlyMeridianSat;			    lt = $scope.formObj.pickup.latestTimeSat;			    lm = $scope.formObj.pickup.latestMeridianSat;			    pt = $scope.formObj.pickup.preferredTimeSat;			    pm = $scope.formObj.pickup.preferredMeridianSat;			}		    early = todayDate +' '+ et +' '+ em;		    latest = todayDate +' '+ lt +' '+ lm;		    preferred = todayDate +' '+ pt +' '+ pm;		    		    calTimingDifference(early,latest,preferred,$scope.eTime,$scope.lTime,whichday);		  };		  /**			 * END PICK UP			 */				/**		 * Invite User		 */		var config = {};		$scope.changeSorting = function(column) {            if ($scope.users.sortType === column) {           	 $scope.users.sortReverse = !$scope.users.sortReverse;            } else {           	 $scope.users.sortType = column;           	 $scope.users.sortReverse = false;            }       };				/* INIT function */   	   	function initAccordion(){   		$scope.oneAtATime = true;   		$scope.status = {   		    isFirstOpen: true,   		    isFirstDisabled: false   		  };   		$scope.groups = MappingService.getEditAccountMap();   	}   	   	function initPickupOption(){   		$scope.ifNoPickup= true;   		  $scope.ifDailyPickup= true;   		  $scope.ifDailyOnRoutePickup= true;   		  $scope.ifUpsSmart= true;   		  $scope.ifSpecificDays= true;   		  $scope.account = 'NXXXX';   		  $scope.Discount={   			'name':'Discount Name',   			'details':'This is discount description. This is discount description.',   			'date':'MM/DD/YY'   		  };   		  $scope.inlineConfirm={   	        'NoPickup':'No PickUp Needed',   	        'Daily':'Daily Pickup',   	        'DailyOnRoute': 'Daily On-Route Pickup',   	        'DailyOnRouteDetails':'Your driver will start daily on-route pickups on',   	        'UpsSmart': 'UPS Smart Pickup',   	        'UpsSmartDetails': 'A pickup will be scheduled each time you create a shipment.',   	        'SpecificDays': 'Pickup on Specific Days',   	        'SpecificDaysDetails':'Mon,Thurs Your driver will start daily pickups on'   		  };   		  if(!$scope.formObj.pickup.selectedOption){    			  $scope.formObj.pickup.selectedOption = '0';	   	  }   		     		       		    $scope.Hours = [];   		    $scope.Meridian = ['AM','PM'];   		    $scope.optionVariables = [false,true,true,true,true];   		    /**			 * Function to call the values like Days,Pickup Options and			 * Locations from JSON*			 */   		    function setData(data){   		    	$scope.specificDays = data.WeekDays;	              $scope.pickupLocation = data.pickUpLocations;	              /**					 * Self Invoking function to generate the timing array					 * values*					 */		  		    (function(){		  		      for(var i=1;i<=12;i++){		  		        if(i<=9){		  		          $scope.Hours.push('0'+i+':00','0'+i+':30');		  		        }else{		  		          $scope.Hours.push(i+':00',i+':30');		  		        }		  		      }		  		    })();		  		    variableInitialization();   		    }   		    var metaData = DashboardService.getMetaData();	 	 	if(metaData.countries){	 	 		setData(metaData);	 	 	}else{	 			MockJSONCalls.getJson({urlString: 'ups.doa-metaData.json'})	 	        // then() called when response gets back	 	        .then(function(data) {	 	            // promise fulfilled TODO set metadata	 	        	DashboardService.setMetaData(data);	 	        	setData(data);	 	        }, function() {	 	            // promise rejected	 	        });		 		 	 	}    		   	}   	   	function initPaperless(){   		$scope.account = 'NXXXX';   		   		$scope.showPaperlessInvoice =  false;        	$scope.checkboxList=[        		{        			labelText:'UPS Paperless Invoice for Package Shipping',        			subCheckbox:[{        					labelText:'UPS Paperless Packing List for Package Shipping',        				},        				{        					labelText:'UPS Paperless Worldwide Express Freight Packing List (for Palletized International Air Freight)'        				},        				{        					labelText:'UPS Paperless NAFTA Certificate of Origin for Package Shipping'        				}        			]        		},        		{        			labelText:'UPS Paperless Invoice for Air Freight Shipping',        			subCheckbox:[{        				labelText:'UPS Paperless NAFTA Certificate of Origin for Air Freight Shipping'        			}]        		},        		{        			labelText:'Upload my own forms',        			idVal:'ups-upload-form',        			val:1,        			isChecked:'false'        		}        	];   	}   	   	function initAccountType(){   		$scope.phType = ['Mobile','Home','Work','Other'];   	   	$scope.sumbitReq = false;   	    $scope.isChecked=false;   	    $scope.isBusiness=false;   	    $scope.formObj.address.country = $scope.countryList[0].code;   	       	    var country='us';   	    if(country==='us'){   		$scope.accountType=[{'type':'Personal','isSelected':'true','isDisabled': 'false'},   							{'type':'Business','isSelected':'false','isDisabled': 'false'}];   		}   		// if default is business and personal non-selectable   		else{	   		$scope.accountType=[{'type':'Personal','isSelected':'false','isDisabled': 'true'},	   							{'type':'Business','isSelected':'true','isDisabled': 'false'}];	   		$scope.formObj.account_type.type='Business';   		}   		$scope.industry = ['Consumer Services','Automotive','Government','HealthCare','High Tech','industrial Manufacturing','Professional Services','Retail and Consumer goods'];	   		$scope.employee = ['less than 1000','1000-8000','Above 8000'];   		           $scope.accountInfo = $rootScope.editItem;   	}    	   	function initInviteUser(){   		// Create the Account users Object           var list = AccountServices.getUsers();           $scope.users = angular.copy(config);           $scope.users.sortType = 'user_name';           $scope.users.sortReverse = false;           $scope.users.list = angular.copy(list);           $scope.additionalUsers = angular.copy(config);           $scope.additionalUsers.list = [ {               user_name : 'Name1',               validated : 'Unknown',               email : 'a@aa.cc'           } ];           $scope.additionalUsers.remove = function(index){           	// Send Service request TODO   			$scope.additionalUsers.list.splice(index, 1);           };   	}   	/**	* @function	* @name init	* @description Used to initialize the variables	*/	function init(){		// Set the base values that will be visible in the edit form		if(!$rootScope.editItem){			$location.path('/paymentPage');			return;		}		$scope.formObj = angular.copy($rootScope.editItem);		$scope.enrollAttentionReq=false;		$scope.payementData.paymentMethods=paymentService.getData();		$scope.accntNumer=$scope.payementData.paymentMethods[$rootScope.index].Number;		var userInfo=UserService.getUser();		$scope.enrolledType=userInfo? userInfo.paperlessEnrolled:false;		$scope.accordionVal=MappingService.getEditAccountMap();		$scope.accordionVal[5].content='app_assets/templates/ups.ppc-paperlessInvoice-enrollment.html';			/*		 * Initialize accordion for edit account ups.ppc-editCard.html		 */		initAccordion();		/**		 * @method Initialize Account type		 * @template		 */		initAccountType();		initPickupOption();		initPaperless();				/*		 * Edit Account - Invite User controller		 * ups.ppc-edit-account-invite-user.html		 */		initInviteUser();	}		config = {                list : [],                add : function() {                	var modalInstance = ModalService.open({            			content:'/app_assets/templates/ups.ppc-edit-account-add-user.html',            			title:'Add users to your account.',            			component: 'ppc'            		  }, function(sc){                      	var maxLength = 5;                    	sc.length = (maxLength - $scope.users.list.length);                        sc.formObj = [ {                        } ];                        sc.add = function() {                            sc.formObj.push({});                            sc.length--;                        };                        sc.remove = function(index) {                            sc.formObj.splice(index,1);                            sc.length++;                        };                        sc.sendInvite = function(sForm) {							//validate form							if (sForm) {								if (!sForm.$valid) {									return;								}							}							                        	// Send invite service TODO                        	if($scope.users.list.length<5){                        		for(var i=0;i<sc.formObj.length;i++){                        			AccountServices.addUsers(sc.formObj[i]);                        		}                        	}	                        sc.ok();                        };                        sc.helpLink = function(){                    		UtilService.openTearmsAndConditions('http://www.ups.com/content/us/en/shipping/create/shipping/create/ext_address_book.html');                    	};                    });                	modalInstance.result.then(function() {                        // Send Service request TODO                		initInviteUser();                    }, function() {                        // Cancel                    });                },                remove : function(item) {                	var modalInstance = ModalService.open({            			content:'/app_assets/templates/ups.ppc-edit-account-confirmation-box.html',            			title:'Remove Authorized User',            			component: 'ppc'            		  }, function(sc){                          sc.okText = 'Remove';                          sc.pageTitle = 'Remove Authorized User';                          sc.pageSubTitle = 'Are you sure you want to remove this authorized user from access to the account?';                          sc.data = [                                  {                                      title : 'Account',                                      value : $scope.accountInfo.Number                                  },                                  {                                      title : 'Remove User',                                      value : item.user_name+', '+item.email                                  } ];                      });                    modalInstance.result.then(function() {            			// Send Service request delete TODO                    	AccountServices.removeUsers(item);                    	var tempArr = AccountServices.getUsers();                    	$scope.users.list = angular.copy(tempArr);                    }, function() {                        // Cancel                    });                },                transfer : function(item) {                	var modalInstance = ModalService.open({            			content:'/app_assets/templates/ups.ppc-edit-account-confirmation-box.html',            			title:'Transfer Account Ownership',            			component: 'ppc'             		  },function(sc) {                          sc.okText = 'Transfer';                          sc.pageTitle = 'Transfer Account Ownership';                          sc.pageSubTitle = 'Are you sure you want to transfer ownership of this account?';                          sc.data = [                                  {                                      title : 'Account',                                      value : $scope.accountInfo.Number                                  },                                  {                                      title : 'Transfer To',                                      value : item.user_name+', '+item.email                                  } ];                      });                    modalInstance.result.then(function() {            			// Send Service request delete TODO                    }, function() {                        // Cancel                    });                }            };		init();		/* END INIT function */	}]).controller('cancelMembershipCtrl',['$scope','$window',function($scope,$window){		$scope.address = {			address1:'32 Sand Court',			address2:'innovative way',			address3:'',			city:'Destin',			state:'FL',			zip:32451,			house:'Beach House'		};		$scope.cancelMembership=function(){			var url = 'http://' + $window.location.host +'/ppcProfile.html';			$window.location = url;		};	}]);