(function(){
	'use strict';
	try {
	/**
	 * @ angular module
	 * @name global.directives
	 */
	angular.module('upsDOApp.directives')
		/*
		* @name Common Payment Component
		* @description directive calls in html block containing payment fields
		*/	
		.directive(
			'upsCpc', 
			function() { 
				return {
					templateUrl : '/app_assets/templates/ups.global-cpc.html', /** fetch page**/
					restrict : 'E', /** look for Element named ups-cpc and place fetched page within **/
					link : function (/*scope, element, attr*/){
						
				}
			};
		})
			
		/*
		* @name Common Address Component
		* @description directive calls in html block containing address fields
		*/	
		.directive(
			'upsCac', 
			function() { 
				return {
					templateUrl : '/app_assets/templates/ups.global-cac.html', /** fetch page**/
					restrict : 'E', /** look for Element named ups-cpc and place fetched page within **/
					link : function (/*scope, element, attr*/){
						
				}
			};
		});
	}
	catch(e) {
		//not loaded
	}
			
})();
	
        	 
		
		
		
		 
		
		
		
	
	
	
	
	
	
	