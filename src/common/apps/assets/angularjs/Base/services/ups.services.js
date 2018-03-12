'use strict';
/**
 * @ angular module
 * @name upsDOApp.services
 */
 
var servicesModule = angular.module('upsDoApp.services');

/**
* @services
* @name MockJSONCalls
* @description provides the mock json calls for various controllers
*/

servicesModule.factory('MockJSONCalls', ['$http','$q', function ($http, $q) {
    return {
        getJson: function(obj) {
        	var baseURL = 'app_assets/mocks/';
            // the $http API is based on the deferred/promise APIs exposed by the $q service
            // so it returns a promise for us by default
            return $http({
					method: obj.type || 'GET',
					url: baseURL + obj.urlString
				}).then(function(response) {
                    if (typeof response.data === 'object') {
                        return response.data;
                    } else {
                        // invalid response
                        return $q.reject(response.data);
                    }
                }, function(response) {
                    // something went wrong
                    return $q.reject(response.data);
                });
        }
    };
}]);

/**
* @services
* @name DashboardService
* @description Controls the dashboard service for various controllers
*/

servicesModule.service('DashboardService', [function(){
	var self = this;
	self.countryList = [];

	self.getCountry = function(){
		return self.countryList;
	};
	self.setCountry = function(obj){
		self.countryList = obj;
	};
	
	this.MetaData = {};
	this.setMetaData = function(obj){
		this.MetaData = obj;
	};
	this.getMetaData = function(){
		return this.MetaData;
	};
}]);

/**
* @services
* @name PPCService
* @description Controls the PPC service for various controllers
*/

servicesModule
.service(
		'PPCService',[function(){
			this.MetaData = {};
			this.setMetaData = function(obj){
				this.MetaData = obj;
			};
			this.getMetaData = function(){
				return this.MetaData;
			};
		}]);
		
/**
* @services
* @name UtilService
* @description Controls the UTIL service for various controllers
*/

servicesModule
		.service(
				'UtilService',
				[
						'API_SERVICE',
						'$http',
						'$window',
						'$uibModal',
						function(API_SERVICE, $http, $window, $uibModal){
							this.urllist = {

							}; // will have obj for urls
							var baseURL = '';
							return {
								getTemplateURL: function(type){
									var templateURL = this.urlList[type];
									return templateURL;
								},
								openTearmsAndConditions: function(tnc){
									var href = tnc;
									var w = Math.round(UPS.configs.viewport.width * 0.8), h = Math
											.round(UPS.configs.viewport.height * 0.8), dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft
											: screen.left, dualScreenTop = window.screenTop !== undefined ? window.screenTop
											: screen.top, width = window.innerWidth ? window.innerWidth
											: document.documentElement.clientWidth ? document.documentElement.clientWidth
													: screen.width, height = window.innerHeight ? window.innerHeight
											: document.documentElement.clientHeight ? document.documentElement.clientHeight
													: screen.height;

									var left = ((width / 2) - (w / 2)) + dualScreenLeft;
									var top = ((height / 2) - (h / 2)) + dualScreenTop;

									var newWindow = $window.open(href, '_blank', 'scrollbars=yes, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);

									// Puts focus on the newWindow
									if (window.focus){
										newWindow.focus();
									}
								},
								mergeNames: function(obj){
									var returnObj = angular.copy(obj);
									var middle_name = obj.middle_name ? ' ' + obj.middle_name + ' ' : ' ';

									var str = obj.first_name + middle_name + obj.last_name;
									if (str.length > 35){
										str = obj.first_name + ' ' + obj.last_name;
										if (str.length > 35){
											str = obj.first_name.trim() + ' ' + obj.last_name.trim();
											if (str.length > 35){
												str = obj.first_name.trim() + ' ' + obj.last_name.trim();
												str = str.slice(0, 35);
											}
										}
									}
									returnObj.name = str;
									//console.log(returnObj);
									return returnObj;
								},
								mockServiceCalls: function(obj, successCallback, errCallback){
									if (API_SERVICE === 'server'){
										// call server
										baseURL = '';
									} else{
										// mock
										baseURL = 'app_assets/mocks/';
									}
									$http({
										method: obj.type || 'GET',
										url: baseURL + obj.urlString
									}).then(successCallback, errCallback);
								},
								getLocation: function(newLatLng, callback){
									var currentLocation = 'United States';
									callback(currentLocation);
								},
								openModal: function(templateUrl, callback, design){
									var urlString = templateUrl || '/app_assets/templates/ups.component-popup.html';

									var modalInstance = $uibModal.open({
										templateUrl: urlString,
										controller: (design && design.controller) ? design.controller: 'popupCtrl',
										size: 'lg',
										windowTopClass: 'ups-application_wrapper',
										resolve: {
											callback: function(){
												return callback;
											},
											design: function(){
												return design;
											}
										}
									});
									return modalInstance;
								},
								isRTL: function(){
									var value = $('html').hasClass('ups-rtl');
									return value;
								}
							};
						}]);
// Notification Service

/**
* @services
* @name NotificationService
* @description Controls the Notification service for various controllers
*/

servicesModule.service('NotificationService', ['$window', '$rootScope',
		function($window, $rootScope){
			var errors = [];
			var _UI_ERRORS = {
				'UPS_ERR_01': {
					'errorCode': 404,
					'errorMessage': 'File not found',
					'errorDetail': 'File not found'
				}
			};

			return {
				handleError: function(errs, message){
					if (!errs){
						errors = [];
					} else if (typeof errs === 'object'){
						if (errs.length > 0){
							if (errs[0].errorCode && errs[0].errorMessage){
								errors = errs;
							}
						} else{
							errors = [errs];
						}
					} else{
						var errCode = _UI_ERRORS[errs];
						if (errCode){
							errs = {
								id: errs,
								msg: errCode.message
							};
						} else{
							errs = {
								id: errs,
								msg: message
							};
						}
						errors = errs;
					}
					$rootScope.$broadcast('handleError', errors);
				}
			};
		}]);
		
/**
* @services
* @name uploadServices
* @description Controls the upload service for various controllers
*/

servicesModule.service('uploadServices', ['$timeout', 'Upload','UPLOAD_URL', function($timeout, Upload, UPLOAD_URL){
	var uploadServices = this;
	uploadServices.uploadFile = function(file, callback){
		if (file){
			file.upload = Upload.upload({
				url: UPLOAD_URL,
				data: {
					file: file
				}
			});
			file.upload.then(function(response){
				file.result = response.data;
				callback();
			}, function(response){
				if (response.status > 0){
					file.errorMsg = response.status + ': ' + response.data;
				}
			}, function(evt){
				file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
				if (file.csv){
					callback();
				}
			});
		}
		return file;
	};
	return uploadServices;
}]);

/**
* @services
* @name progressBarService
* @description Controls the progress bar service for various controllers
*/

servicesModule.service('progressBarService', [function(){
	var progress = {
		interval: 10,
		min: 0,
		max: 100,
		offset: 270
	};
	var progressbarService = this;

	progressbarService.startProgressBar = function(percent){
		if (percent < progress.max){
			percent += progress.interval;
		}
		return percent;
	};
	return progressbarService;
}])

/** *** Modal Service **** */

/**
* @services
* @name ModalService
* @description Controls the modal service for various controllers
*/

.service('ModalService', ['$uibModal', '$rootScope', function($uibModal, $rootScope) {
    var self = this;
    self.Modal = {};
    self.modalInstance = null;
    self.modalList = [];
    self.designList = [];
    self.activeModal = undefined;
	    
    return {
		open: function(design, callback, templateURL){
			
			
			if (self.modalInstance){
				self.modalInstance.dismiss();
			if (typeof self.clearValues === 'function') { 
    				self.clearValues();
				 }
			}
			var urlString = templateURL || '/app_assets/templates/ups.component-popup-doa.html';
			if(design && design.component){
				urlString = '/app_assets/templates/ups.component-popup-'+design.component+'.html';
			}
			self.modalInstance = $uibModal.open({
				templateUrl: urlString,
				controller: 'popupCtrl',
				size: 'lg',
				windowTopClass: 'ups-application_wrapper',
				resolve: {
					callback: function(){
						setTimeout(function() {
							angular.element('button.ups-modal-close-icon').focus(); 
							angular.element('.modal-backdrop').attr('tabindex','-1');
							angular.element('.modal-backdrop').attr('aria-hidden',true);
							angular.element('.modal-content').attr('aria-labelledBy','ups-modal-heading');
							angular.element('.modal-dialog').append('<div class="ups-clear"></div>');
						}, 1000);				
						return callback;
					},
					design: function(){
						return design;
					}
				}
			});

			self.designList = [design];
			self.activeModal = design;
			return self.modalInstance;
		},
		changeSelfContent: function(obj){
			$rootScope.$broadcast('changeTitle', obj);
		},
		addPage: function(obj, callback){
			/**
			 * @desc This function will change view to obj but will not add element in the designList
			 * * */			
			self.activeModal = obj;
			$rootScope.$broadcast('changeDesign', obj, callback);
		},		
		next: function(obj, callback){
			/**
			 * @desc This function will add one element in the designList -> "obj" provided by user
			 * * */
			setTimeout(function() {
				angular.element('button.ups-modal-close-icon').focus(); 
			}, 1000);
			if(!obj){
				// Error, obj required
				return;
			}
			self.designList.push(obj);
			self.activeModal = obj;
			$rootScope.$broadcast('changeDesign', obj, callback);
		},
		back: function(obj){
			/**
			 * @desc If a user wants to go back a step in the modal
			 * This will delete the last element in the array of designList and change the view to the 
			 * second last element
			 * * */
			setTimeout(function() {
				angular.element('button.ups-modal-close-icon').focus(); 
			}, 1000);
			
			if (self.designList.length === 1){
				self.modalInstance.dismiss();
				self.designList = [];
				self.activeModal = undefined;
			} else{
				self.designList.splice(-1, 1);

				var lastValue = self.designList[self.designList.length - 1];
				self.activeModal = lastValue;
				//Check data values for back 
				if(obj){
					self.activeModal.data = obj.data;
				}
				$rootScope.$broadcast('changeDesign', lastValue);
			}
		},
		jumpToStep: function(step){
			if(step === undefined){
				//error, step required
				return;
			}
			if(typeof step === 'number'){
				self.designList.splice((step+1),self.designList.length);

				var lastValue = self.designList[step];
				self.activeModal = lastValue;
				$rootScope.$broadcast('changeDesign', lastValue);
			}else{
				//TODO
			}
		},
		getDesign: function(){
			return self;
		},
		clearValues: function(){
			self.Modal = {};
			self.modalInstance = null;
			self.modalList = [];
			self.designList = [];
			self.activeModal = undefined;
		},
		getActiveModal: function(){
			return self.activeModal;
		},
		close: function(value){
			if (self.modalInstance && self.modalInstance.opened.$$state.status){
				self.designList = [];
				self.modalInstance.close(value);
			}
		},
		dismiss: function(){
			if (self.modalInstance && self.modalInstance.opened.$$state.status){
				self.designList = [];
				self.modalInstance.dismiss();
			}
		}
	};
  }]);