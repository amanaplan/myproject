'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description
 * Initialize the module and store in the variable 'Controller'
 */
	angular.module('upsDOApp.controllers')

/**
 * @controller
 * @name upsDOApp.controllers.controller : doaChoosePickupOptionsCtrl
 * @description Controls the Pickup options flow(DO)
 * @template : ups.doa-choosePickupOptions.html and ups.doa-choosePickupOptionsModal.html
 */
	.controller('doaChoosePickupOptionsCtrl',['$scope','$http','$window','UtilService','NotificationService','$rootScope','MockJSONCalls','DashboardService','paymentService','ModalService',function($scope,$http,$window,UtilService,notification,$rootScope,MockJSONCalls,DashboardService,paymentService, ModalService){
	
		var active = ModalService.getActiveModal();
		$scope.data = active.data;
				
		    /**
		    * @function
		    * @name variableInitialization
		    * @description Function to initialize model variables which gets called whenever
			  switches the radio button choices
		    */
			function variableInitialization(){
			    /** Weekday components Variables Initialization * */
			    $scope.formObj.pickup.earlyTime = $scope.Hours[0];
			    $scope.formObj.pickup.earlyMeridian = $scope.Meridian[0];
			    $scope.formObj.pickup.latestTime = $scope.Hours[4];
			    $scope.formObj.pickup.latestMeridian = $scope.Meridian[0];
			    $scope.formObj.pickup.preferredTime = $scope.Hours[2];
			    $scope.formObj.pickup.preferredMeridian = $scope.Meridian[0];
			    $scope.formObj.pickup.pickupLocation = $scope.pickupLocation[0];
			
			    $scope.errorPreferred = false;
			    $scope.errorLatest = false;   
			    $scope.errorEarly = false;
			    /** Weekday components Variables Initialization * */
			
			    /** Weekend components Variables Initialization * */
			    $scope.formObj.pickup.earlyTimeSat = $scope.Hours[0];
			    $scope.formObj.pickup.earlyMeridianSat = $scope.Meridian[0];
			    $scope.formObj.pickup.latestTimeSat = $scope.Hours[4];
			    $scope.formObj.pickup.latestMeridianSat = $scope.Meridian[0];
			    $scope.formObj.pickup.preferredTimeSat = $scope.Hours[2];
			    $scope.formObj.pickup.preferredMeridianSat = $scope.Meridian[0];
			    $scope.formObj.pickup.pickupLocationSat = 'Select One';
			
			    $scope.errorPreferredSat = false;
			    $scope.errorLatestSat = false;   
			    $scope.errorEarlySat = false;
			    /** Weekend components Variables Initialization * */
			    
			    $scope.tempDaysHolder=[];
			  } 

			 //var addressInfoURL = '';
			/**
			  * @function
			  * @name UtilService.mockServiceCalls
			  * @description Service call to fetch Pickup options initial values from JSON and save into arrays
			  */
			function setPickUpdata(data){

	              $scope.specificDays = data.WeekDays;
	              $scope.pickupLocation = data.pickUpLocations;
	              $scope.pickupLocation.unshift('Select One');
	              $scope.formObj.pickup.pickupOptions= data.pickupOptions;
	              	/**
					 * Self Invoking function to generate the timing array
					 * values*
				 	*/
		  		    (function(){
		  		      for(var i=1;i<=12;i++){
		  		        if(i<=9){
		  		          $scope.Hours.push('0'+i+':00','0'+i+':15','0'+i+':30','0'+i+':45');
		  		        }else{
		  		          $scope.Hours.push(i+':00',i+':15',i+':30',i+':45');
		  		        }
		  		      }
		  		    })();

		  		    variableInitialization();
			}
			
			function fetchData(){
				var metaData = DashboardService.getMetaData();
		 	 	if(!metaData.countries){
		 			MockJSONCalls.getJson({urlString: 'ups.doa-metaData.json'})
		 	        // then() called when response gets back
		 	        .then(function(data) {
		 	            // promise fulfilled TODO set metadata
		 	        	DashboardService.setMetaData(data);
		 	        	setPickUpdata(data);
			        
		 	        }, function() {
		 	            // promise rejected
		 	        });		 	
		 	 	}else{
		 	 		setPickUpdata(metaData);
		 	 	}
			}
			
			/**
			  * @function
			  * @name init
			  * @description Initializes the variables
			  */
			function init(){
				$scope.formObj = {};
				$scope.formObj.pickup = {};
			    if($rootScope.isHazmat === true){
			    	$scope.formObj.pickup.selectedOption = '2';
			    	$rootScope.chosenField=2;
			    }else{
			    	$scope.formObj.pickup.selectedOption = '0';	
			    	$rootScope.chosenField=0;
			    }
				    
				    $scope.Hours = [];
				    $scope.Meridian = ['AM','PM'];
				    fetchData();
			}
			
			
			if($scope.data.isNextClicked){
				init();
			}else{
				init();
				for(var k in $scope.data.retainVal.tempObj) {$scope.formObj.pickup[k]=$scope.data.retainVal.tempObj[k];}
			}

      /**
      * @function
      * @name togglePickUp
      * @description Function called whenever user switches the radio button choices and basis show relevant components
      */

	   $scope.togglePickUp = function(ind){
	    //console.log(ind);
	    $rootScope.chosenField=ind;
	    variableInitialization();
	  };
	
	  	/**
	    * @function
	    * @name pickupOpenpopup
	    * @description Function to open the WEM styled POPUP
	    */
	  $scope.pickupOpenpopup = function(key){
		switch (key) {
		case 'PI':
			if($rootScope.isUS){
					UtilService.openTearmsAndConditions('https://www.ups.com/content/us/en/shipping/time/service/value_added/pickup_pricing.html');
				}else{
					UtilService.openTearmsAndConditions('https://www.ups.com/xx/xx/shipping/zones-and-rates/value-added/index.html');
					}
			break;
	
		case 'PT':
			UtilService.openTearmsAndConditions('https://www.ups.com/content/us/en/shipping/account/account/notifytime.html');	
			break;
		default:
			break;
		}
	  };
	
	  
	  /**
	    * @function
	    * @name toggleselectText
	    * @description Function to toggle between the weekdays and basis apply CSS classes
	    */
	  $scope.toggleselectText = function(index){
		angular.forEach($scope.specificDays, function(value, key) {
	      if(key === index){
	        if(value.isSelected === true){
	          value.isSelected = false;
	          $scope.isdaySelected = false;
	          $scope.tempDaysHolder[index] = false;
	        }
	        else{
	          value.isSelected = true;
	          $scope.isdaySelected = true;
	          $scope.tempDaysHolder[index] = true;
	        }
	      }
	    });
	  };
	
	  /**
	    * @function
	    * @name captureText
	    * @description Function to captures the additional instructions text
	    */
	  $scope.captureText = function(){
	    var str = event.target.value;
	    var len = str.length;
	    if(len === 0){
	      $scope.isEmptyValue = true;
	    }else{
	      $scope.isEmptyValue = false;
	    }
	  };
	
	  /**
	    * @function
	    * @name getTodayDate
	    * @description Function to fetch the today's date
	    */
	  function getTodayDate(){
	    var today = new Date();
	    var month = today.getMonth();
	    var date = today.getDate();
	    var year = today.getFullYear();
	
	    return month+'/'+date+'/'+year;
	  }
	
	  /**
	    * @function
	    * @name weekdayErrorValidations @params aDate,bDate,cDate,e
	    * @description Error validations on Timing dropdowns for weekdays
	    */
	  function weekdayErrorValidations(aDate,bDate,cDate,e){
	  	if(aDate < bDate){
	        if(aDate < cDate && bDate > cDate)
	        {
	          $scope.errorPreferred = false;
	          $scope.errorLatest = false;   
	          $scope.errorEarly = false; 
	        }
	        else if(aDate === cDate){
	         /*$scope.errorPreferred = true;
	         $scope.errorLatest = false;   
	         $scope.errorEarly = true;   */
	         $scope.errorPreferred = false;
	        }else if(bDate === cDate){
	         /*$scope.errorPreferred = true;
	         $scope.errorLatest = true;   
	         $scope.errorEarly = false;   */
	         $scope.errorPreferred = false;
	        }else{
	          $scope.errorPreferred = true;
	          $scope.errorLatest = false;   
	          $scope.errorEarly = false;   
	        }
	    }else if (aDate > bDate){
	        if(e === true){
	          $scope.errorPreferred = false;
	          $scope.errorLatest = false;   
	          $scope.errorEarly = true;   
	        }
	        else{
	          $scope.errorPreferred = false;
	          $scope.errorLatest = true;   
	          $scope.errorEarly = false;
	        }
	    }else{
	        console.log('a and b happened at the same time');
	        if(aDate === bDate && bDate === cDate && aDate === cDate){
	          $scope.errorLatest = true;   
	          $scope.errorEarly = true;
	          $scope.errorPreferred = true;
	        }else
	        if(aDate === bDate){
	          $scope.errorLatest = true;   
	          $scope.errorEarly = true;
	          $scope.errorPreferred = false;
	        }else
	         if(bDate === cDate){
	          /*$scope.errorLatest = true;   
	          $scope.errorPreferred = true;
	          $scope.errorEarly = false;*/
	        	 $scope.errorPreferred = false;
	        }else
	         if(cDate === aDate){
	          /*$scope.errorEarly = true;
	          $scope.errorPreferred = true;
	          $scope.errorLatest = false;*/   
	        	 $scope.errorPreferred = false;
	        }
	
	    }
	  }
	
	  /**
	    * @function
	    * @name weekendErrorValidations @params aDate,bDate,cDate,e
	    * @description Error validations on Timing dropdowns for weekends
	    */
	  function weekendErrorValidations(aDate,bDate,cDate,e){
	  	if(aDate < bDate){
	        if(aDate < cDate && bDate > cDate)
	        {
	          $scope.errorPreferredSat = false;
	          $scope.errorLatestSat = false;   
	          $scope.errorEarlySat = false; 
	        }
	        else if(aDate === cDate){
	        	$scope.errorPreferredSat = false;
	        }else if(bDate === cDate){
	         $scope.errorPreferredSat = false;
	        }else{
	          $scope.errorPreferredSat = true;
	          $scope.errorLatestSat = false;   
	          $scope.errorEarlySat = false;   
	        }
	    }else if (aDate > bDate){
	        if(e === true){
	          $scope.errorPreferredSat = false;
	          $scope.errorLatestSat = false;   
	          $scope.errorEarlySat = true;   
	        }
	        else{
	          $scope.errorPreferredSat = false;
	          $scope.errorLatestSat = true;   
	          $scope.errorEarlySat = false;
	        }
	    }else{
	        console.log('a and b happened at the same time');
	        if(aDate === bDate && bDate === cDate && aDate === cDate){
	          $scope.errorLatestSat = true;   
	          $scope.errorEarlySat = true;
	          $scope.errorPreferredSat = true;
	        }else
	        if(aDate === bDate){
	          $scope.errorLatestSat = true;   
	          $scope.errorEarlySat = true;
	          $scope.errorPreferredSat = false;
	        }else
	         if(bDate === cDate){
	          $scope.errorPreferredSat = false;
	        }else
	         if(cDate === aDate){
	          $scope.errorPreferredSat = false;
	        }
	
	    }
	  }
	  

  /**
    * @function
    * @name calTimingDifference
    * @params firstDate,secondDate,betweenDate,e,l,whichday
    * @description Function to show the errors basis the timing differences for timing dropdown 
    */
	function calTimingDifference(firstDate,secondDate,betweenDate,e,l,whichday){
	  var aDate = new Date(firstDate).getTime();
	  var bDate = new Date(secondDate).getTime();
	  var cDate = new Date(betweenDate).getTime();
	
	  switch(whichday){
	  	case 'weekday':
	  	weekdayErrorValidations(aDate,bDate,cDate,e,l);
	  	break;
	
	  	case 'weekend':
	  	weekendErrorValidations(aDate,bDate,cDate,e,l);
	  	break;
	
	  	default:
	  	console.log('Caught in default');
	  }
	}
	
	/**
	  * @function
	  * @name calculateTimings
	  * @params firstDate,secondDate,betweenDate,e,l,whichday
	  * @description Function to show the comparison between selected timings 
	  */
	  $scope.calculateTimings = function(whichTime,modelVal,whichday){
	    var todayDate = getTodayDate();
	    var et,em,lt,lm,pt,pm,early,latest,preferred;
	
	    switch(whichTime){
	        case 'early':
	          $scope.eTime = true;
	          $scope.lTime = false;
	        break;
	        case 'latest':
	          $scope.lTime = true;
	          $scope.eTime = false;
	        break;
	        default:
	          console.log('Default');
	    }
	
	    if(whichday === 'weekday'){
		    et = $scope.formObj.pickup.earlyTime;
		    em = $scope.formObj.pickup.earlyMeridian;
		    lt = $scope.formObj.pickup.latestTime;
		    lm = $scope.formObj.pickup.latestMeridian;
		    pt = $scope.formObj.pickup.preferredTime;
		    pm = $scope.formObj.pickup.preferredMeridian;
		}else{
			et = $scope.formObj.pickup.earlyTimeSat;
		    em = $scope.formObj.pickup.earlyMeridianSat;
		    lt = $scope.formObj.pickup.latestTimeSat;
		    lm = $scope.formObj.pickup.latestMeridianSat;
		    pt = $scope.formObj.pickup.preferredTimeSat;
		    pm = $scope.formObj.pickup.preferredMeridianSat;
		}
	
	    early = todayDate +' '+ et +' '+ em;
	    latest = todayDate +' '+ lt +' '+ lm;
	    preferred = todayDate +' '+ pt +' '+ pm;
	    
	    calTimingDifference(early,latest,preferred,$scope.eTime,$scope.lTime,whichday);
	  };
	  
	  /**
		* @function
		* @name goback
		* @description Back Button Functionality
		*/
		$scope.goback = function(){
			$rootScope.$broadcast('changePage',{
		        title: 'Enter your tax information.',
		        content: '/app_assets/templates/ups.doa-APAC-TaxInfoModal.html'
		   });
			
		};
	
	/**
	* @function
	* @name goback
	* @description Next Button Funationality
	*/
	$scope.nextPickupOptionStep=function(obj){
	    if($rootScope.chosenField===4){
	      $rootScope.daysSelected='';
	         angular.forEach($scope.specificDays, function(value) {
	            if(value.isSelected === true){
	              if($rootScope.daysSelected){
	                $rootScope.daysSelected=$rootScope.daysSelected.substring(0,3)+', '+value.day.substring(0,3);
	              }
	              else{
	                $rootScope.daysSelected=value.day.substring(0,3);
	              }
	              
	            }
	        });
	    }
	
	    if((!$rootScope.SpecialHazardous)&&($rootScope.chosenField===0)){
	    	ModalService.next({
	    		title: 'Your account is ready to use, John.',
		        content: '/app_assets/templates/ups.doa-inline-confirm-openAccount.html'
	        });
	   } 
	   else{
		   ModalService.next({
			   title: 'Now pick your start date.',
			   content: '/app_assets/templates/ups.doa-choosePickupStartModal.html',
			   data: {
				   tempObj:obj
			   }
			});
	   }	    
	  };
	  
	  /**
		* @function
		* @name checkFormValues
		* @params option
		* @description Generates the values to enable or disable the Next button
		*/
	  $scope.checkFormValues = function(option){
		  var result,result1,result2,result3,result4;
		  if(option === '0'){
			  result = true;
		  }else{
			  if($scope.errorPreferred === false && $scope.errorLatest === false && $scope.errorEarly === false && $scope.errorPreferredSat === false && $scope.errorLatestSat === false && $scope.errorEarlySat === false){
				  result1=true;
			  }
			  if($scope.formObj.pickup.pickupLocation !== 'Select One'){
				  result2=true;
			  }
			  if(this.ups_choosePickupOptionsform.$valid){
				  result3 = true;
			  }
			  if(option === '4'){
				  if($scope.isdaySelected === true){
				  result4 = true;
				  result = result1 && result2 && result3 && result4;
				  }else{
					    angular.forEach($scope.tempDaysHolder, function(value, key) {
					      console.log(key);
					    	if(value === true){
					    	  result4 = true;
					      }
					    });
					  if(result4 === 'undefined'){result4 = false;}
					    result = result1 && result2 && result3 && result4;
				  }
			  }else{
				  result = result1 && result2 && result3;
			  }
		  }
		  return !result;
	  };
	  /**
	 * setting up the calendar datepicker
	 * @copied partly from ups.ppc.addorAuthetnicateaccount.controllers.js
	 */
	$scope.ModalService = ModalService;
	$scope.data = active.data;
	$scope.authenticateFormObj = active.data;
	
	function initiatlize(){
		$scope.authenticateFormObj.pickupStartDate = '';
		$scope.authenticateFormObj.charges = '';
		$scope.authenticateFormObj.CID = '';
	}
	initiatlize();
	//--USE this for data
	$scope.$on('changePage', function(ev, obj){
		if(obj){
		}
	});

	// Date Picker
	$scope.popup1 = {};
	$scope.popup1.opened = false;
	$scope.format = 'MM/dd/yyyy';
	var tomorrow = new Date();
	tomorrow.setDate(tomorrow.getDate() + 1);
	var afterTomorrow = new Date();
	afterTomorrow.setDate(tomorrow.getDate() + 1);
	$scope.dateOptions = {
	    formatYear: 'yy',
	    maxDate: new Date(2020, 5, 22),
	    minDate: new Date(),
	    startingDay: 1
    };

	  $scope.events = [
		{
		  date: tomorrow,
		  status: 'full'
		}, {
		  date: afterTomorrow,
		  status: 'partially'
		}
	  ];
  /**
	  * @function
	  * @name openCalender
	  * @description Open the DatePicker on click of the button
	  */
  	$scope.openCalender = function(){
		$scope.popup1.opened = true;
	};
	/**
	  * @function
	  * @name setDate @params year, month and day
	  * @description Set the date format
	  */
	$scope.setDate = function(year, month, day) {
	    $scope.authenticateFormObj.pickupStartDate = new Date(year, month, day);
	  };

	}]);
	
	