'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module
 */
	angular.module('upsDOApp.controllers')
 
/**
 * @controller
 * @name upsDOApp.controllers.controller : utaCtrl
 * @description Controls the UTA terms and conditions flow
 * @template ups.doa-uta.html
 */
	.controller('utaCtrl',['$scope',function($scope){
		$scope.goBack = function(){
			$scope.$emit('changePage');
		};
		$scope.next = function(){
			$scope.$emit('changePage');
		};
	}]);