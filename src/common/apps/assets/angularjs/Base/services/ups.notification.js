'use strict';

/**
 * @ angular module
 * @name upsDOApp.services
 */

angular.module('upsDoApp.services')

/**
* @services
* @name gateSecurityCodeServices
* @description provides gate or building security in leave Instruction for the driver.
*/

.service('notificationServices', function() {
	var notificationService = this;
	notificationService.notificationValue = [
		{
			'send_To':'Shipper',
			'email':'jsmith@email.com',
			'alert_Type':[
							{'type':'Shipped','Selected':true},
							{'type':'Exception','Selected':true},
							{'type':'Delivery','Selected':true}
						],
			'type_string':''	
		},
		{
			'send_To':'Receiver',
			'email':'Use the Ship To Email',
			'alert_Type':[
							{'type':'Shipped','Selected':true},
							{'type':'Exception','Selected':true},
							{'type':'Delivery','Selected':true}
						],
			'type_string':''			
		}
	];
	notificationService.notificationDummy = 
		{
			'send_To':'',
			'email':'',
			'alert_Type':[
							{'type':'Shipped','Selected':true},
							{'type':'Exception','Selected':true},
							{'type':'Delivery','Selected':true}
						],
			'type_string':''	
		};

	notificationService.getDummy = function(){
		notificationService.notificationDummy = 
		{
			'send_To':'',
			'email':'',
			'alert_Type':[
							{'type':'Shipped','Selected':false},
							{'type':'Exception','Selected':false},
							{'type':'Delivery','Selected':false}
						],
			'type_string':''	
		};
	};

	notificationService.editMethods = function(ind,val) {
			notificationService.notificationValue[ind]=val;
			//console.log(notificationService.notificationValue);
	};
	notificationService.saveMethods = function(val) {
			notificationService.notificationValue.push(val);
			//console.log(notificationService.notificationValue);
	};
	return notificationService;
});