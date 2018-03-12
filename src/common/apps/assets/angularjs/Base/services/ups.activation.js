'use strict';

/**
 * @ angular module
 * @name upsDOApp.services
 */

angular.module('upsDoApp.services')

/**
* @services
* @name activationCodeService
* @description provides the address values required for activation
*/

.service('activationCodeService', function() {
	var activationService = this;
	activationService.pendingnumber = [];
	activationService.pendingActivation = [];
	activationService.codeCount = 0;

	activationService.saveMethods = function(data) {
			var value = 'Pending Enrollment '+ (activationService.pendingActivation.length + 1);
			activationService.pendingnumber.push(value);
			activationService.pendingActivation.push(data);
			//activationService.requestCode.push(1);
			//console.log(activationService.pendingActivation);
	};
	activationService.requestCount = function(){
		activationService.codeCount ++;
	}; 
	return activationService;
});