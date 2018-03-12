'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module
 */
angular.module('upsDOApp.controllers')

/**
 * @controller
 * @name upsDOApp.controllers.controller : fileUploadController
 * @description Controls the File Upload flow
 */
	.controller('fileUploadController', [
	    '$scope', '$http', '$filter', '$window',
	    function ($scope, $http) {
	        $scope.options = {
	            url: 'https://angular-file-upload-cors-srv.appspot.com/upload'
	        };
	        
	        $scope.loadingFiles = true;
	        $http.get($scope.options.url)
	            .then(
	                function (response) {
	                    $scope.loadingFiles = false;
	                    $scope.queue = response.data.files || [];
	                },
	                function () {
	                    $scope.loadingFiles = false;
	                }
	            );
	    }
	]);