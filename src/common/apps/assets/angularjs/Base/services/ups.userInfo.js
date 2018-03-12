'use strict';
/**
 * @ angular module
 * @name upsDOApp.services
 */
 
var userInfoModule = angular.module('upsDoApp.services');

/**
* @services
* @name UserService
* @description Controls the UserService service for various controllers
*/

userInfoModule.service('UserService',['UtilService','localStorageService', function(UtilService,localStorageService){
	var _self = this;
	
	_self.userList = undefined;
	_self.activeUser = undefined;
	
	
	_self.fbURL='ups.doa-success-social-fb.json';
    _self.twURL='ups.doa-success-social-tw.json';
    _self.lnURL='ups.doa-success-social-ln.json';
    _self.gmURL='ups.doa-success-social-gm.json';
	_self.setLoggedUser=function(type){
	    var url;
		if(type==='LinkedIn'){
			url= _self.lnURL;
			}
		else if(type==='Google'){
			url= _self.gmURL;
			}
		else if(type==='Facebook'){
			url= _self.fbURL;
			}
		else{
			url= _self.twURL;}

		UtilService.mockServiceCalls({
	        urlString : url
	    }, function(response) {
	        _self.setUser(response.data);
	    });
	};
	_self.setUser=function(obj){
        localStorageService.set('userInfo',obj);
	};
	_self.getUser=function(){
	    return localStorageService.get('userInfo');
	};

	_self.settUserAttr=function(obj){
		var userJson=_self.getUser();

		angular.extend(userJson,obj);
		_self.setUser(userJson);
	};
	
	// Call for User info data
	_self.callUserData = function(url){
		UtilService.mockServiceCalls({
            urlString : 'ups.doa-success-social-'+url+'.json'
        }, function(response) {
            var obj = response.data;
            if (!obj.errorCode) {
                localStorageService.set('active_user_info',obj);
            }
        });
	};
	
	//User list
	_self.setUserList =function(obj){
    	_self.userList = obj;
	};
	_self.getUserList =function(){
    	return _self.userList;
	};
	_self.setActiveUser =function(obj){
        localStorageService.set('active_user',obj);		
		_self.activeUser = obj;
	};
	_self.getActiveUser =function(){
		var local_user = localStorageService.get('active_user');
		if(!_self.activeUser){
			if(local_user){
				_self.activeUser = local_user;				
			}
		}
		return _self.activeUser;
	};

	_self.getActiveUserInfo=function(){
		return localStorageService.get('active_user_info');
	};
	_self.checkLogin = function(obj){
		var index, data = _self.userList;
    	for(var i=0;i<data.length;i++){
   			if(data[i].user_name === obj.email && data[i].password === obj.password){
   				index = i;
   				break;
   			}
   		}
    	if(index!==undefined){
    		_self.setActiveUser(_self.userList[index]);
    		_self.callUserData(_self.userList[index].network);
    		return _self.userList[index];
    	}else{
    		return undefined;
    	}
	};
    return _self;

}]);