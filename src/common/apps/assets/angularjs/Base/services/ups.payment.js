'use strict';

/**
 * @ angular module
 * @name upsDOApp.services
 */

angular.module('upsDoApp.services')

/**
* @services
* @name paymentService
* @description Controls the payment service for various controllers
*/

.service(
        'paymentService',
        function() {
            var PaymentService = this;
            PaymentService.savedMethods = [ {
            	_id: 1,
                'payementNickName' : 'Abc123',
                'accountType' : 'Payment Card',
                'Method' : 'Payment Card-VISA',
                'displayAccount':'VISA-XXXXXXXXXXXXX1234',
                'Number' : 'XXXXXXXXXXXXX123',
                'Default' : 'Make Default Method',
                'IsThisAccountActive' : true,
                'Cardtype' : 'Visa',
                'cardNumber' : '4444444444441234',
                'month' : 'Feb',
                'monthId' : 2,
                'year' : '2017',
                'verify' : '3456',
                'makeDefault' : false,
                'SameAddr' : true,
                'diffAddr' : false,
                 'address' : {
                    'address2' : '1234 main street',
                    'address1' : 'Rosewall, GA 30076',
                    'country' : 'US',
                    'state_select': 'GA',
                    'city' : 'GA',
                    'zipcode': 'ga12345',
                    'phone' : '123456789'
                 }
                },
                {
            	_id:2,
                'payementNickName' : 'XYZ13',
                'accountType' : 'Account',
                'Method' : 'Account',
                'displayAccount':'12345-AccountName',
                'Number' : 'DEF456',
                'Default' : 'DEFAULT METHOD',
                'IsThisAccountActive' : true,
                'Cardtype' : '',
                'cardNumber' : '4444444444444444',
                'month' : 'Feb',
                'monthId' : 2,
                'year' : '2017',
                'verify' : '3456',
                'makeDefault' : true,
                'SameAddr' : true,
                'diffAddr' : false,
                'address' : {
                    'address2' : '1234 main street',
                    'address1' : 'Rosewall, GA 30076',
                    'country' : 'US',
                    'state_select': 'GA',
                    'city' : 'GA',
                    'zipcode': 'ga12345',
                    'phone' : '123456789'
                },
                'invite_users':{

                },
                'pickup':{
                	pickupOptions:[
						{'option':'Not right now','isSelected':true,'id':'option0'},
        			    {'option':'Automatically when I create a shipment online with UPS Smart Pickup®','isSelected':false,'id':'option1'},
        	   		    {'option':'Same time every weekday with Daily Pickup','isSelected':false,'id':'option2'},
        			    {'option':'Every weekday, whenever it\'s convenient for the driver, with Daily On-Route Pickup','isSelected':false,'id':'option3'},
        			    {'option':'Specific days only with Day-Specific Pickup','isSelected':false,'id':'option4'}
        	        ]
                },
                'payment':{
                	'active': true,
                	'user_email': 'test@email.com'
                },
                'account_type':{
                	'type': 'Personal'
                },
                'shipping_priveleges':{
                	active: false
                },
                'paperless' : {

                }
            },
            {
            	_id:3,
                'payementNickName' : 'JS Ent',
                'payementCompanyName' : 'JS Enterprises',
                'payementCompanyEmail' : 'jsmith@jsenterprises.com',
                'accountType' : 'Account',
                'Method' : 'Account',
                'displayAccount':'12345-AccountName',
                'Number' : 'DEF789',
                'Default' : 'DEFAULT METHOD',
                'IsThisAccountActive' : true,
                'Cardtype' : '',
                'cardNumber' : '4444444444444444',
                'month' : 'Feb',
                'monthId' : 2,
                'year' : '2017',
                'verify' : '3456',
                'makeDefault' : false,
                'SameAddr' : true,
                'diffAddr' : false,
                'address' : {
                    'address1' : '1234 Main Street',
                    'address2' : 'Apt 505',
                    'country' : 'US',
                    'state_select': 'GA',
                    'city' : 'Atlanta',
                    'zipcode': '30332',
                    'phone' : '123456789'
                },
                'invite_users':{

                },
                'pickup':{
                	pickupOptions:[
						{'option':'Not right now','isSelected':true,'id':'option0'},
        			    {'option':'Automatically when I create a shipment online with UPS Smart Pickup®','isSelected':false,'id':'option1'},
        	   		    {'option':'Same time every weekday with Daily Pickup','isSelected':false,'id':'option2'},
        			    {'option':'Every weekday, whenever it\'s convenient for the driver, with Daily On-Route Pickup','isSelected':false,'id':'option3'},
        			    {'option':'Specific days only with Day-Specific Pickup','isSelected':false,'id':'option4'}
        	        ]
                },
                'payment':{
                	'active': true,
                	'user_email': 'jssmith@jsenterprises.com'
                },
                'account_type':{
                	'type': 'Business'
                },
                'shipping_priveleges':{
                	active: false
                },
                'paperless' : {

                }
            },
            {
            	_id:4,
                'payementNickName' : 'G12BE7',
                'payementCompanyName' : 'G12 INC',
                'payementCompanyEmail' : 'G12@G12incoporated.com',
                'accountType' : 'Account',
                'Method' : 'Account',
                'displayAccount':'12345-AccountName',
                'Number' : 'G12BE7',
                'ExtraInfo' : 'Inactive',
                'Default' : '',
                'IsThisAccountActive' : false,
                'Cardtype' : '',
                'cardNumber' : '4444444444444444',
                'month' : 'Feb',
                'monthId' : 2,
                'year' : '2017',
                'verify' : '3456',
                'makeDefault' : false,
                'SameAddr' : true,
                'diffAddr' : false,
                'address' : {
                    'address1' : '1234 Main Street',
                    'address2' : 'Apt 505',
                    'country' : 'US',
                    'state_select': 'GA',
                    'city' : 'Atlanta',
                    'zipcode': '30332',
                    'phone' : '123456789'
                },
                'invite_users':{

                },
                'pickup':{
                	pickupOptions:[
						{'option':'Not right now','isSelected':true,'id':'option0'},
        			    {'option':'Automatically when I create a shipment online with UPS Smart Pickup®','isSelected':false,'id':'option1'},
        	   		    {'option':'Same time every weekday with Daily Pickup','isSelected':false,'id':'option2'},
        			    {'option':'Every weekday, whenever it\'s convenient for the driver, with Daily On-Route Pickup','isSelected':false,'id':'option3'},
        			    {'option':'Specific days only with Day-Specific Pickup','isSelected':false,'id':'option4'}
        	        ]
                },
                'payment':{
                	'active': true,
                	'user_email': 'jssmith@jsenterprises.com'
                },
                'account_type':{
                	'type': 'Business'
                },
                'shipping_priveleges':{
                	active: false
                },
                'paperless' : {

                }
            }];
            PaymentService.Method = [ {
                'Account' : 'Payment Card',
                'maxlimit':10
            }, {
                'Account' : 'Shipping Account',
                'maxlimit':100
            }, {
                'Account' : 'PayPal',
                'maxlimit':1
            } ];

            PaymentService.promotionMethods = [
                    {
                        'Name' : 'Promo Name',
                        'Description' : 'Promotion Description Goes here...includes',
                        'DateAdded' : '12/22/2016',
                        'Expiration' : '12/30/2016',
                    },
                    {
                        'Name' : 'Other Promo Name',
                        'Description' : 'Other Promotion Description Goes here...includes',
                        'DateAdded' : '12/22/2016',
                        'Expiration' : '12/30/2016',
                    } ];

            PaymentService.cardOptions = [ 'Visa', 'MasterCard',
                    'American Express', 'Discover', 'Alipay', 'Bancontact Mistercash', 'Carte Bleue',
                    'Dankort', 'Dotpay', 'EFT', 'Giropay', 'iDEAL', 'JCB', 'Maestro', 'Paypal', 'Postepay', 'SafetyPay',
                    'Sepa', 'Sofort', 'Unionpay', 'Visa Electron', 'VPay' ];

            PaymentService.cardCountries = {
                'ar' : ['Visa', 'MasterCard', 'Discover', 'Maestro', 'Visa Electron'],
                'at' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'VPay', 'Sofort', 'Paypal'],
                'au' : ['Visa', 'MasterCard', 'Discover', 'Maestro'],
                'be' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'VPay', 'Bancontact Mistercash', 'Sofort', 'Paypal'],
                'br' : ['Visa', 'MasterCard', 'Discover', 'Maestro', 'Visa Electron'],
                'ca' : ['Visa', 'MasterCard', 'American Express', 'Paypal'],
                'ch' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'Sofort', 'Paypal'],
                'cn' : ['Visa', 'MasterCard', 'Maestro', 'Visa Electron', 'Unionpay', 'Alipay'],
                'co' : ['Visa', 'MasterCard', 'Discover', 'Maestro', 'Visa Electron'],
                'cr' : ['Visa', 'MasterCard', 'Discover', 'Maestro', 'Visa Electron'],
                'cz' : ['Visa', 'MasterCard', 'Discover', 'Maestro', 'Visa Electron', 'VPay'],
                'de' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'VPay', 'Sofort', 'Giropay','Paypal'],
                'dk' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'VPay', 'Paypal'],
                'do' : ['Visa', 'MasterCard', 'Discover', 'Maestro', 'Visa Electron'],
                'es' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'VPay', 'Paypal'],
                'fi' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'VPay', 'Paypal'],
                'fr' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'VPay', 'Carte Bleue', 'Paypal'],
                'gb' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'VPay', 'Paypal'],
                'gr' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'VPay'],
                'hk' : ['Visa', 'MasterCard', 'Discover', 'Maestro', 'Visa Electron', 'Unionpay', 'Paypal'],
                'hu' : ['Visa', 'MasterCard', 'Maestro', 'Visa Electron', 'VPay'],
                'in' : ['Visa', 'MasterCard', 'Discover', 'Maestro', 'Visa Electron'],
                'id' : ['Visa', 'MasterCard', 'Maestro', 'Visa Electron'],
                'ie' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'Paypal'],
                'it' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'VPay', 'Postepay'],
                'jp' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'JCB'],
                'kr' : ['Visa', 'MasterCard', 'Maestro', 'Visa Electron'],
                'lu' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'VPay'],
                'mo' : ['Visa', 'MasterCard', 'Discover', 'Maestro', 'Visa Electron'],
                'my' : ['Visa', 'MasterCard', 'American Express', 'Maestro', 'Visa Electron'],
                'mx' : ['Visa', 'MasterCard', 'Maestro', 'Visa Electron', 'SafetyPay'],
                'nl' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'VPay', 'iDEAL', 'Paypal'],
                'nz' : ['Visa', 'MasterCard', 'Discover', 'Maestro', 'Visa Electron'],
                'no' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'VPay', 'Paypal'],
                'ph' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron'],
                'pl' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'VPay', 'Dotpay'],
                'pr' : ['Visa', 'MasterCard', 'American Express'],
                'pt' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'VPay', 'Paypal'],
                'ro' : ['Visa', 'MasterCard', 'Discover', 'Maestro', 'Visa Electron', 'VPay'],
                'ru' : ['Visa', 'MasterCard', 'Discover', 'Maestro', 'Visa Electron'],
                'se' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron', 'VPay', 'Paypal'],
                'sg' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron'],
                'th' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Maestro', 'Visa Electron'],
                'tw' : ['Visa', 'MasterCard', 'American Express', 'Maestro', 'Visa Electron'],
                'us' : ['Visa', 'MasterCard', 'American Express', 'Discover', 'Paypal'],
                'vn' : ['Visa', 'MasterCard', 'Maestro', 'Visa Electron'],
                'za' : ['Visa', 'MasterCard', 'Discover', 'Maestro', 'Visa Electron']
            };

            PaymentService.address = {
                    'address2' : '1234 main street',
                    'address1' : 'Rosewall, GA 30076',
                    'country' : 'US',
                    'state_select': 'GA',
                    'city' : 'GA',
                    'zipcode': 'ga12345',
                    'phone' : '123456789'
                };

            PaymentService.saveMethods = function(option) {
            	var _self= this;
                if(!option.address){
                option.address = {
                    'address2' : '1234 main street',
                    'address1' : 'Rosewall, GA 30076',
                    'country' : 'US',
                    'state_select': 'GA',
                    'city' : 'GA',
                    'zipcode': 'ga12345',
                    'phone' : '123456789'
            	};
            }
            	option.invite_users={
                };
            	option.pickup={
                	pickupOptions:[{'option':'Not right now','isSelected':true,'id':'option0'},
        	   		    {'option':'Same time every weekday with Daily Pickup','isSelected':false,'id':'option1'},
        			    {'option':'Every weekday, whenever it\'s convenient for the driver, with Daily On-Route Pickup','isSelected':false,'id':'option2'},
        			    {'option':'Automatically when I create a shipment online with UPS Smart Pickup®','isSelected':false,'id':'option3'},
        			    {'option':'Specific days only with Day-Specific Pickup','isSelected':false,'id':'option4'}
        	        ]
                };
            	option.payment={
                	'active': true,
                	'user_email': 'test@email.com'
                };
            	option.account_type={
                	'type': 'Personal'
                };
            	option.shipping_priveleges={
                	active: false
                };
            	option.paperless={

                };
                var sustainData=[];
                for(var payment=0;payment < _self.savedMethods.length;payment++){
                    sustainData.push(_self.savedMethods[payment]);
                }
                sustainData.push(option);
                _self.reSort(sustainData);
            };

            PaymentService.reSort=function(data){
                var _self=this;
                var sortedData=_self.sortWithoutDefault(data,'payementNickName',true);
                _self.savedMethods.splice(0,_self.savedMethods.length);
                sortedData.forEach(function(a,b){
                    _self.savedMethods.push(sortedData[b]);
                });
            };

            PaymentService.edit = function(option) {
            	for(var i=0;i<PaymentService.savedMethods.length;i++){
            		if(PaymentService.savedMethods[i]._id === option._id){
            			PaymentService.savedMethods[i] = option;
            		}
            	}
            };

            PaymentService.getData = function() {
                return PaymentService.savedMethods;
            };

            PaymentService.setData = function(obj) {
                PaymentService.savedMethods = obj;
            };

            PaymentService.sortWithoutDefault=function(arrayToSort, sortByKey,sortInOrder){
                if(sortByKey){
                    var $newSortableArray =[];
                    for(var i=0; i<arrayToSort.length;i++){
                        if(arrayToSort[i] && arrayToSort[i].makeDefault){
                            $newSortableArray.push(arrayToSort[i]);
                            delete arrayToSort[i];
                            break;
                        }
                    }
                    var sortableArray= arrayToSort;
                    sortableArray = sortableArray.sort( function (a,b) {
                        var result;
                        if(sortInOrder){
                            if(typeof a[sortByKey] === 'string' && typeof b[sortByKey] === 'string'){
                                result = a[sortByKey].toLowerCase().localeCompare(b[sortByKey].toLowerCase());
                            }else{
                                result = (a[sortByKey] < b[sortByKey]) ? -1 : (a[sortByKey] > b[sortByKey]) ? 1 : 0;
                            }
                        }else{
                            if(typeof a[sortByKey] === 'string' && typeof b[sortByKey] === 'string'){
                                result = b[sortByKey].toLowerCase().localeCompare(a[sortByKey].toLowerCase());
                            }else{
                                result = (b[sortByKey] < a[sortByKey]) ? -1 : (b[sortByKey] > a[sortByKey]) ? 1 : 0;
                            }
                        }
                        return result;
                    });
                    sortableArray.forEach(function(a,b){
                        $newSortableArray.push(sortableArray[b]);
                    });
                    arrayToSort = $newSortableArray;
                    return arrayToSort;
                    //PaymentService.setData(arrayToSort);
                }
            };
            return PaymentService;
        });
