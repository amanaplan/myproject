'use strict';

/**
 * @ angular module
 * @name upsDOApp.directives
 */
 
angular.module('upsDOApp.directives')

/**
* @directives
* @name modal
* @params $timeout
* @description Initialize and controls the functionality of the modal popups
*/

//Modal
.directive('modal', ['$timeout', function ($timeout) {
    return {
      templateUrl:'/app_assets/templates/ups.Modal.html',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function (scope, element, attrs) {

        scope.$on('scrollTop',function(){
          $(element).animate({'scrollTop':0}, 300);
        });
        //Check URL for modal
        scope.$watch(attrs.value, function(value){
		 $timeout(function(){
			$(element[0]).find('button:first').focus(); 
		 }, 800); 
          if(value){
            if(value.title){
            	scope.headertitle = value.title;
            }
            if(value.url){         
            	scope.url = value.url;
            }
            if(value.data){ 
            	scope.data = value.data;
            }
          }
          $(element).animate({'scrollTop':0}, 300);
        });

        scope.$watch(attrs.visible, function(value){
          if(value === true) {
            $(element).modal('show');
             $timeout(function(){
                $(element[0]).find('button:first').focus(); 
            }, 600); 
          } else {
            $(element).modal('hide');
          }
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;            
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  }]);