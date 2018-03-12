'use strict';

/**
 * @ angular module
 * @name upsDOApp.services
 */

angular.module('upsDoApp.services')

/**
* @services
* @name addressServices
* @description Controls the address service for various controllers
*/

.service('addressServices', [function() {
	var addressServices = this;
	addressServices.addressJson =[{
        _id : Date.now(),
        address1 : 'xxxxxxx Main Street',
        city : 'Boston',
        country : 'us',
        check : false,
        tagId : ['friends','business'],
        email : 'ups@sapient.com',
        first_name : 'ups',
        last_name : 'ups',
        state_select : 'CA',
        zipcode : '30307',
        defaultAddressBtn : 'Make Default',
        isdefaultAddressBtn : false
     }
     ];
     addressServices.addrsSample=addressServices.addressJson[0];
     addressServices.parentFormObj = [ {
        _id : Date.now(),
        address1 : '1234 Main Street',
        city : 'Boston',
        country : 'us',
        check : false,
        tagId : ['friends','My Address'],
        email : 'ups@sapient.com',
        first_name : 'John',
        last_name : 'Smith',
        state_select : 'CA',
        zipcode : '30307',
        defaultAddressBtn : 'Default Address',
        isdefaultAddressBtn : true
    } ];
	
	/*addressServices.profileAddressFormObj = [ {
        _id : Date.now(),
        address1 : '5678 Parent Street',
        city : 'Boston',
        country : 'us',
        check : false,
        tagId : ['friends','My Address'],
        email : 'ups@sapient.com',
        first_name : 'Stacie',
        last_name : 'Smith',
        state_select : 'CA',
        zipcode : '30307',
		defaultAddressBtn : 'Default Address',
        isdefaultAddressBtn : true
    } ];*/

    addressServices.dist = [ {
        name : 'John',
        id : Date.now(),
        list : [addressServices.parentFormObj[0]]
    } ];
    addressServices.tags = {
        content : [ {
            name : 'My Address',
            type: 'default'
        }, {
            name : 'Ship From',
            type: 'default'
        }, {
            name : 'Family',
            type: 'default'
        }, {
            name : 'Friends',
            type: 'default'
        }, {
            name : 'Business',
            type: 'default'
        }],
        title : 'Tags',
        position : $('html').hasClass('ups-rtl')? 'bottom-left':'bottom-right',
        edit: function(item, index){
            if (item) {
            	var tags = addressServices.tags.content;
            	var flag = false;
            	for(var i=0;i<tags.length;i++){
            		if(i!==index && tags[i].name.toLowerCase() === item.name.toLowerCase()){
            			flag=true;
            			break;
            		}
            	}
            	if(flag===true){
            		//show err
            	}else{
            		addressServices.tags.content[index] = item;
            	}
            	return flag;
            }
        },
        remove: function(item){
            if (item) {
            	for(var i=0;i<addressServices.tags.content.length;i++){
            		if(addressServices.tags.content[i].name.toLowerCase() === item.name.toLowerCase()){
            			addressServices.tags.content.splice(i,1);
            			break;
            		}
            	}
            }
        }
    };

    addressServices.addAddress = function(option) {
        option._id = Date.now();
        addressServices.parentFormObj.push(option);
    };
    addressServices.addImportAddress = function(option) {
        addressServices.parentFormObj.push(option);
    };
    addressServices.deleteData = function(){
      addressServices.parentFormObj=[];
    };

    addressServices.setAddress = function(obj) {
        addressServices.parentFormObj = angular.copy(obj);
    };

    addressServices.editAddress = function(option) {
    	var obj = addressServices.parentFormObj;
    	for(var i=0;i<obj.length;i++){
    		if(obj[i]._id === option._id){
    			obj[i] = option;
    			break;
    		}
    	}
    	addressServices.parentFormObj = obj;
    };
    addressServices.getAddress = function() {
    	//console.log(addressServices.parentFormObj);
        return addressServices.parentFormObj;
    };

    addressServices.addDistribution = function(option) {
        option.id = Date.now();
        addressServices.dist.push(option);
    };
    addressServices.editDistribution = function(option) {
    	var obj = addressServices.dist;
    	for(var i=0;i<obj.length;i++){
    		if(obj[i].id === option.id){
    			obj[i] = option;
    			break;
    		}
    	}
    };
    addressServices.setDistribution = function(obj) {
        addressServices.dist = obj;
    };
    addressServices.getDistribution = function() {
        return addressServices.dist;
    };

    addressServices.getTags = function() {
        return addressServices.tags;
    };
    addressServices.addTag = function(option) {
        if (option) {
        	var flag = false;
        	var tags = addressServices.tags.content;
        	for(var i=0;i<tags.length;i++){
        		if(tags[i].name.toLowerCase() === option.name.toLowerCase()){
        			flag=true;
        			break;
        		}
        	}
        	if(flag===false){
		        addressServices.tags.content.push({
		        	name: option.name,
		            type: 'custom'
		        });
        	}
        	return flag;
        }else{
        	return true;
        }
    };
    /**
	* @function
	* @name closeClickingElsewhere
	* @description close tag popup on clciking anywher else in page
	*/
    this.closeClickingElsewhere = function($rootScope, event, callbackOnClose) {
    	$rootScope.clickedSaveEdit = false;

        var element = event.target;
        if (!element) {
        	return;
        }

        var clickedOnSearchDrawer = false;

        for(var i=1;i<10;i++){
        	var elem = $(element).parents()[i];
        	if($(element).hasClass('ups-tag-link') || $(element).hasClass('ups-tag-link') || ($(elem) && $(elem).hasClass('ups-tag-close'))){
        		clickedOnSearchDrawer = true;
        		break;
        	}
        }

        if (!clickedOnSearchDrawer) {
            callbackOnClose();
            return;
        }
	};
    return addressServices;
}])

/**
* @services
* @name AccountServices
* @description Controls the account service for various controllers
*/

.service('AccountServices', [ function() {
    var self = this;

    self.users = [ {
        user_name : 'John Doe',
        email : 'john@email.com',
        _id: '111'
    }, {
        user_name : 'Mike Rowling',
        email : 'mike@email.com',
        _id: '222'
    } ];

    self.getUsers = function() {
        return self.users;
    };
    self.addUsers = function(obj) {
        var number = Date.now() + Math.random();
    	obj._id=number;
    	self.users.push(obj);
    };
    self.removeUsers = function(obj) {
    	var user = self.users, tempArr = [];
    	for(var i=0;i<user.length;i++){
			 if(user[i]._id!== obj._id){
				 tempArr.push(user[i]);
			 }
		 }
    	self.users = tempArr;
    };
} ])

/**
* @services
* @name addnameService
* @description Controls the first name change in preference -add first name variation
*/
.service('addnameService', [ function() {
    var addnameService = this;

    addnameService.nameReceiver=[ {
        'nameVar' : ''
    }];

    addnameService.addName = function(option) {
        addnameService.nameReceiver=option;
    };

    addnameService.getNames = function() {
        return addnameService.nameReceiver;
    };

} ]);
