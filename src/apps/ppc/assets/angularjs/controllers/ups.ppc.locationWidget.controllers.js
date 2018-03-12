'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module and store in the variable 'Controller'
 */
angular.module('upsDOApp.controllers')

 
/**
 * @controller
 * @name upsDOApp.controllers.controller : selectAPLocation
 * @description Controls the Select AP Location flow
 * @template : ups.ppc-locationWidget.html
 */
	.controller('selectAPLocation', ['$scope', 'ModalService', function($scope, ModalService){
		$scope.toggleModalForAP = function(){
			ModalService.open({
				title: 'Select UPS Access Point Location',
				content: '/app_assets/templates/ups.ppc-accessPointLocationModal.html',
				component: 'ppc'
			});
		};
	}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : findLocationCtrl
 * @description Controls the Find location flow
 * @template : ups.ppc-accessPointLocationModal.html
 */
	.controller('findLocationCtrl', [function(){
	}]);