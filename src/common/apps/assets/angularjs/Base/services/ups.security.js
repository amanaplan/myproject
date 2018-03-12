'use strict';

/**
 * @ angular module
 * @name upsDOApp.services
 */
 
angular.module('upsDoApp.services')

/**
* @services
* @name securityServices
* @description Controls the security service for various controllers
*/
.service('securityServices', function() {
	var securityServices = this;
	securityServices.savedQuestions = [];

	securityServices.saveMethods = function(option) {
		if (option) {
			securityServices.savedQuestions = option;
		}
	};
	return securityServices;
});