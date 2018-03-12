'use strict';
/**
 * @module
 * @name upsDOApp.controllers
 * @description
 * Initialize the module
 */
angular.module('upsDOApp.controllers')
/**
 * @controller
 * @name upsDOApp.controllers.controller : apacTaxInfoCtrl
 * @description
 * Controls the APAC Tax Info Flow
 */
	.controller('apacTaxInfoCtrl', ['$scope','$rootScope','ModalService', function($scope,$rootScope,ModalService){
		/**
		* @function
		* @name init
		* @description Used to initialize the variables
		*/
		function init(){
			$scope.ModalService = ModalService;
			$scope.formObj = {};
			$scope.formObj.vatCertified = 'true';
			$scope.vatCertifiedCountry=false;
			$scope.cityFound = false;
		}

		/** Array stores VAT certified cities **/
		$scope.vatCertifiedCityList=[
			{'city' : 'Beijing'},
			{'city' : 'Changzhou'},
			{'city' : 'Chengdu'},
			{'city' : 'Dalian'},
			{'city' : 'Dongguan'},
			{'city' : 'Foshan'},
			{'city' : 'Fuzhou'},
			{'city' : 'Guangzhou'},
			{'city' : 'Hangzhou'},
			{'city' : 'Hefei'},
			{'city' : 'Huizhou'},
			{'city' : 'Jiangmen'},
			{'city' : 'Jiaxing'},
			{'city' : 'Kunshan'},
			{'city' : 'Nanjing'},
			{'city' : 'Nantong'},
			{'city' : 'Ningbo'},
			{'city' : 'Qingdao'},
			{'city' : 'Quanzhou'},
			{'city' : 'Shanghai'},
			{'city' : 'Shaoxing'},
			{'city' : 'Shenyang'},
			{'city' : 'Shenzhen'},
			{'city' : 'Suzhou'},
			{'city' : 'Tianjin'},
			{'city' : 'Wenzhou'},
			{'city' : 'Wuhan'},
			{'city' : 'Wuxi'},
			{'city' : 'Xiamen'},
			{'city' : 'Zhengzhou'},
			{'city' : 'Zhongshan'},
			{'city' : 'Zhuhai'}
		];
	
		/** Array checks VAT certified cities **/
		$scope.vatCertified = [ {
				'text' : 'Yes',
				'value' : true
			},
			{
				'text' : 'No',
				'value' : false
			}];
	
		/**
		* @function
		* @name checkCity
		* @description Checks for vat certified cities in array
		*/
		function checkCity(enteredCity){
			for(var i=0;i<$scope.vatCertifiedCityList.length;i++){
				if(enteredCity === angular.lowercase($scope.vatCertifiedCityList[i].city)){
					$scope.cityFound = true;
					return;
				}
				else{
					$scope.cityFound = false;  
				}
			}
		}
	
		/**
		* @function
		* @name countryVal
		* @description Checks for vat certified cities and country on blur 
		*/
		$scope.countryVal=function(val){
			$scope.formObj.city;
			val = angular.lowercase(val);
			$scope.vatCertifiedCountry=false;
			if(val==='china' && $scope.formObj.city !== undefined){
				var city = angular.lowercase($scope.formObj.city);
				checkCity(city);
				if($scope.cityFound){
					$scope.formObj.vatCertified ='true';
					$scope.vatCertifiedCountry=true;
				}
			}
		};
	
		/**
		* @function
		* @name backBtn
		* @description Move to previous page - Upload Your required Documents
		*/
		$scope.backBtn=function(){
			$rootScope.uploadCheckVal=true;
			ModalService.back();
		};

		/**
		* @function
		* @name nextApacTaxInfoStep
		* @description Move to next page -Choose your pickup type.
		*/
		$scope.nextApacTaxInfoStep=function(){
			ModalService.next({
				title: 'Choose your pickup type.',
				content: '/app_assets/templates/ups.doa-choosePickupOptionsModal.html',
				data: {
					isNextClicked:true
				}
			});
		};

		init();
	} ]);