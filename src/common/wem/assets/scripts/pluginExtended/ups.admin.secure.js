
 /* Define authentication credentials in a secure way using module pattern
 * Author: psanjeevi
 * Date: 10/13/2015 
 * 
 */

// ERPT-Live credentials

/*var authentication = (function(){
	
	var secureObj = {};
	secureObj.uname = "wems-erpt";
	secureObj.upwd = "Widget1234";
	secureObj.akey = "FCFAFDE187D4BF86";	
	
	return secureObj;
	
}());

var upsAuth = "false";*/


//Prod credentials 

/*var authentication = (function(){

var secureObj = {};
secureObj.uname = "prathi18sach";
secureObj.upwd = "Test1234";
secureObj.akey = "5CF902C3D568A5F5";	

return secureObj;

}());

var upsAuth = "false";*/



//var authToken = $('#ups-header').data('upstoken'),
var upsAuth = $('#ups-header').data('islogged');
if(upsAuth === 'undefined' || upsAuth === ''){
	upsAuth = false;
}
/**
This authentication is used for Widgets Purpose.
Do not remove.
**/
var authentication = (function(){
	var secureObj = {};
	secureObj.uname = "";
	secureObj.upwd = "";
	secureObj.akey = "";
	return secureObj;
}());

/*var authentication = (function(){
    var secureObj = {};
    secureObj.uname = "hament901990";
    secureObj.upwd = "Test@123";
    secureObj.akey = "5CF902C3D568A5F5";    
    //console.log('Token not found using default: '+secureObj);
    return secureObj;
})();*/
/*var authentication = (function(){
	var secureObj = {};
	secureObj.uname = "prathi18sach";
	secureObj.upwd = "Test1234";
	secureObj.akey = "5CF902C3D568A5F5";	
	//console.log('Token not found using default: '+secureObj);
	return secureObj;
})();*/

//var stubDataAuth = { users : "prathi18sach,"};






// staging Personal credentials
 /*var authentication = (function(){
	
	var secureObj = {};
	secureObj.uname = "JCOLEV";
	secureObj.upwd = "JCOLEV";
	secureObj.akey = "EC858403EAECDE9B";	
	
	return secureObj;
	
}()); */

// MHD credentials by Bala
/*var authentication = (function(){
	
	var secureObj = {};
	secureObj.uname = "balatkrs";
	secureObj.upwd = "D88e93f8";
	secureObj.akey = "5CF902C3D568A5F5";	
	
	return secureObj;
	
}());*/


/**
	Author: Hament Aggarwal
	Purpose: Secure credentials for Search ... Please don't comment it
	Date: 17/10/2016
	Modified On : 10/1/2017 comment as using right credentials for search


var UPSSecurity = {
    "UsernameToken": {
      "Username": "wems-erpt",
      "Password": "Widget1234"
    },
    "ServiceAccessToken": {
        "AccessLicenseNumber": "FCFAFDE187D4BF86"
    }
};
**/
/**End Here**/