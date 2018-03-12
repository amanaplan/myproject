'use strict';

/**
 * @module
 * @name upsDOApp.controllers
 * @description Initialize the module and store in the variable 'Controller'
 */
var PreferenceII = angular.module('upsDOApp.controllers');

/**
 * @controller
 * @name upsDOApp.controllers.controller : QuantumViewPreferenceCtrl
 * @description Quantum View Preference Controller for the Quantum View Notifications "Inbound, Outbound, and ThirdParty"
 * @template : ups.ppc-quantumView-preference.html
 */
	PreferenceII.controller('QuantumViewPreferenceCtrl',['$scope','UtilService','ModalService','UserService','MappingService', function($scope,UtilService,ModalService,UserService,MappingService){
    $scope.alerts=[{
        key: 'Ship',
        value:'ship',
        checkbox:{
            email:false,
            sms:false
        }
    },{
        key:'Day Before Delivery',
        value:'day_before',
        checkbox:{
            email:false,
            sms:true
        }
    },{
        key:'Day of Delivery',
        value:'day_delivery',
        checkbox:{
            email:false,
            sms:false
        }
    },{
        key: 'Exception',
        value:'exception',
        checkbox:{
            email:false,
            sms:false
        }
    },{
        key:'Delivered',
        value:'delivery_confirm',
        checkbox:{
            email:false,
            sms:false
        }
    }];

    $scope.addClicked = true;
    $scope.user=UserService.getActiveUserInfo();
    //$scope.ups_phone_number=$scope.user.phone;

    //Making The Email and Name Error Handling
    $scope.emailRequired=false;
    $scope.checkEmail=function(isFirst){
        var counter=0;
        if(isFirst===true){
            angular.forEach($scope.alerts,function(obj){
                if(obj.checkbox.email===true){
                    counter++;
                }
            });
        }
        if($scope.formObj.email!==undefined){
            Object.keys($scope.formObj.email).forEach(function(key){
                if($scope.formObj.email.hasOwnProperty(key) && $scope.formObj.email[key]===true){
                    counter++;
                }
            });
        }
        if(counter>0){
            $scope.emailRequired=true;
        }else{
            $scope.emailRequired=false;
        }
    };

    //Making The Phone Number/Text Error Handling
    $scope.smsRequired=false;

    $scope.smsCheck=function(){
        var counter=0;
        Object.keys($scope.formObj.sms).forEach(function(key){
            if($scope.formObj.sms.hasOwnProperty(key) && $scope.formObj.sms[key]===true){
                counter++;
            }
        });
        if(counter>0){
            $scope.smsRequired=true;
        }else{
            $scope.smsRequired=false;
        }
    };

    $scope.mailReceiver=[{
        valueTo:'emailAddr',
        valueFrom:'sendEmail'
    }];

    $scope.formObj={};

    $scope.checkFormErrors = function() {
        if ($scope.formObj.ups_email_address0.$invalid) {
            return true;
        }
        if ($scope.formObj.ups_name_input0.$invalid) {
            return true;
        }
        if ($scope.formObj.ups_phone_number.$invalid) {
            return true;
        }
    }

    $scope.deleteRow=function(index){
        $scope.mailReceiver.splice(index,1);
    };
    $scope.addMoreMailers=function(){
        $scope.addClicked = false;
        if($scope.mailReceiver.length<5){
            $scope.mailReceiver.push({
                keyTo:'Email Address',
                valueTo:'emailAddr',
                keyFrom:'Send To Email',
                valueFrom:'sendEmail'
            });
        }
    };
    // Submit function saveAlertOption
    $scope.saveAlertOption=function(valid){
        //this.formObj.$setPristine();
        $scope.addClicked = true;
        $scope.clicked = true;
    };

	}])

    /**
     * @controller
     * @name upsDOApp.controllers.controller : QuantumViewPreferenceAccordionCtrl
     * @description Quantum View Preference Accordion Controller; Calls in the Mapping Service explicitly
     * @template : ups.ppc-quantumView-preference.html
     */

    PreferenceII.controller('QuantumViewPreferenceAccordionCtrl',['$scope','MappingService', function($scope, MappingService){

    var mapdata;
    function init(){

        mapdata = MappingService.getQuantumViewMap();
        $scope.groupOne = mapdata.groupOne;
        $scope.groupTwo = mapdata.groupTwo;
    }
    init();

    }])

    /**
     * @controller
     * @name upsDOApp.controllers.controller : quantumViewAdministrationCompanyInfoCtrl
     * @description Quantum View Preference Controller for the Quantum View Administration's Company Info Accordion
     * @template : ups.ppc-quantumView-companyInformation.html
     */

    PreferenceII.controller('quantumViewAdministrationCompanyInfoCtrl',['$scope','DashboardService','MockJSONCalls', function($scope,DashboardService,MockJSONCalls){
    $scope.ups_quantumViewCompanyInfo;
    $scope.upsCACForm;

    $scope.addressFormObj = {};

    MockJSONCalls.getJson(
        {urlString: 'ups.ppc-privacy_cac.json'}
    )
    // then() called when response gets back
    .then(function(data) {
        // promise fulfilled TODO set metadata
        DashboardService.setMetaData(data);
        $scope.countryList = data.countries;
        $scope.statesList = data.states;
        $scope.addressFormObj.country= $scope.countryList[0].code;
        $scope.addressFormObj.countryName = 'United States';

    }, function() {
        // promise rejected
    });


    $scope.ups_quantumViewCompanyInfoAccordion = {
        'ups_company_name_input':'',
        'ups_company_contact':'',
        'ups_support_email_address':'',
        'ups_support_telephone_number':'',
        'ups_company_email_address':'',
        'ups_telephone':''
    };

    $scope.checkFormErrors = function() {
        if ($scope.ups_quantumViewCompanyInfo.ups_company_name.$invalid) {
            return true;
        }
        if ($scope.ups_quantumViewCompanyInfo.ups_contact.$invalid) {
            return true;
        }
        if ($scope.ups_quantumViewCompanyInfo.ups_telephone.$invalid) {
            return true;
        }
        if ($scope.ups_quantumViewCompanyInfo.ups_company_email.$invalid) {
            return true;
        }
        if ($scope.ups_quantumViewCompanyInfo.ups_support_email.$invalid) {
            return true;
        }
        if ($scope.ups_quantumViewCompanyInfo.ups_support_telephone.$invalid) {
            return true;
        }

        //Errors from CAC
        if ($scope.upsCACForm.address0.$invalid) {
            return true;
        }
        if ($scope.upsCACForm.city.$invalid) {
            return true;
        }
        if ($scope.upsCACForm.state.$invalid) {
            return true;
        }
        if ($scope.upsCACForm.zipCode.$invalid) {
            return true;
        }
    }

    $scope.saveCompanyInformationButton = function(valid) {
        $scope.clicked = true;
     };

    }])

    /**
     * @controller
     * @name upsDOApp.controllers.controller : quantumViewAdministrationCompanyServicesCtrl
     * @description Quantum View Preference Controller for the Quantum View Administration's Company Services Accordion
     * @template : ups.ppc-quantumView-companyServices.html
     */

    PreferenceII.controller('quantumViewAdministrationCompanyServicesCtrl',['$scope','$location', function($scope,$location){
	/**Quantum View Administration**/

    /**Company Services Accordion**/
    $scope.companyServices=[
        {
            serviceLabel: 'Outbound',
            viewButton: true,
            viewLink: '#/preferencePage/quantumView/viewOutbound',
            createButton:false
        },
        {
            serviceLabel: 'Inbound Locations IDs',
            viewButton: true,
            viewLink: '#/preferencePage/quantumView/viewInbound',
            createButton:true
        },
        {
            serviceLabel: 'Inbound Receiving Addresses',
            viewButton: true,
            viewLink: '#/preferencePage/quantumView/viewInbound',
            createButton:false
        },
        {
            serviceLabel: 'Third Party',
            viewButton: true,
            viewLink: '#/preferencePage/quantumView/viewThirdParty',
            createButton:false
        },
        {
            serviceLabel: 'Imports',
            viewButton: true,
            viewLink: '#/preferencePage/quantumView/viewImportAccounts',
            createButton:false
        },
        {
            serviceLabel: 'Claims',
            viewButton: false,
            createButton:false
        }
    ];

    }])

    /**
     * @controller
     * @name upsDOApp.controllers.controller : quantumViewAdminViewOutBoundCtrl
     * @description Quantum View Preference Controller for the Quantum View Administration's Outbound
     * @template : ups.ppc-quantumView-viewOutbound.html
     */

    PreferenceII.controller('quantumViewAdminViewOutBoundCtrl',['$scope','ModalService','$rootScope','DashboardService','MockJSONCalls', function($scope,ModalService,$rootScope,DashboardService,MockJSONCalls){
    /**View Outbound Accts Table**/
    var outBoundAccts=[
        {
            upsAccountLabel: 'ABC123 - Account Nickname',
            countryLabel: 'US'
        },
        {
            upsAccountLabel: 'DEF456',
            countryLabel: 'UK'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        }
    ];

    $scope.propertyName = 'outBoundAcctName';
    $scope.reverse = true;
    $scope.outBoundAccts = outBoundAccts;

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    $scope.toggleModal=function(){
        var modalInstance = ModalService.open({
            title: 'Add an Existing Account to your profile.',
            content: '/app_assets/templates/ups.ppc-addorauthenticateaccountModal.html',
            component: 'ppc'
        },function(sc){
            callAIAflow(sc);
        });
    };

    function callAIAflow(sc){
        sc.showAuthenticateModal = false;
        sc.showAIAModal = false;
        sc.displayCID = true;
        sc.parentFormObj=[];
        sc.formObj = {};
        sc.accountType = [
            {'type':'Documents and Packages','isSelected':'true'},
            {'type':'Air Freight','isSelected':'false'}
        ];
        $rootScope.isUPS = true;
        sc.valueEntered = false;

        // Date Picker
        sc.popup1 = {};
        sc.popup1.opened = false;
        sc.format = 'MM/dd/yyyy';
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);

        sc.resetFormFields = function(){
            this.ups_addAuthAccform.$setPristine();
        sc.formObj.acc_number = '';
        sc.formObj.acc_name = '';
        sc.formObj.pcode = '1';
        };

        var initializeAuthenticatevalues = function(Val){
            $rootScope.authenticateFormObj = {};
            if(Val !== undefined){
                $rootScope.authenticateFormObj.countryName = Val.countryName;
                $rootScope.authenticateFormObj.acc_num = Val.acc_number;
                $rootScope.authenticateFormObj.accName = Val.acc_name;
                if(($rootScope.isUPS === true) && (Val.country === 'us' || Val.country === 'ca' || Val.country === 'pr' || Val.country === 'vi')){
                    $rootScope.displayCID = true;
                }else{
                    $rootScope.displayCID = false;
                }
            }
        };
        sc.openAuthenticateModal = function(){
            ModalService.next({
                title: 'Authenticate This Account',
                content: '/app_assets/templates/ups.ppc-authenticateModal.html',
                data: sc.formObj
            });
            initializeAuthenticatevalues(sc.formObj.data);
            $rootScope.formObj = {};
            $rootScope.formObj.tnc = sc.formObj.tnc;
        };



        // Function called on initialize and will call the meta data information
        //Call meta data json for country and other dropdown data
        MockJSONCalls.getJson({urlString: 'ups.doa-metaData.json'})
        // then() called when response gets back
        .then(function(data) {
            // promise fulfilled TODO set metadata
            if(data.errorCode){
            }else{
                sc.countryList = data.countries;
                sc.formObj.country = sc.countryList[0].code;
            }
        }, function() {
            // promise rejected
        });
        sc.backtoAIA = function(){
			ModalService.back();
			if($rootScope.radioIndex===0){
				sc.accountType=[{'type':'Documents and Shipping','isSelected':'true'},
								{'type':'Air Freight','isSelected':'false'}];
				}else{
					sc.accountType=[{'type':'Documents and Shipping','isSelected':'false'},
									{'type':'Air Freight','isSelected':'true'}];
				}
		};
    }

    $scope.removeAccountModal=function(){
        var modalInstance = ModalService.open({
            title: 'Are You Sure?',
            content: '/app_assets/templates/ups.ppc-quantumView-remove-account-or-inbound-loc-modal.html',
            component: 'ppc'
        }, function(sc){
            sc.removeAccountLabels = true;
            sc.instructional_content = "If you continue, we'll permanently remove this account from the company, and you'll no longer be able to view shipment information for the account.";
            sc.continueButton =function(){
                ModalService.dismiss();
            };
        });
    };
    }])

    /**
     * @controller
     * @name upsDOApp.controllers.controller : quantumViewAdminViewThirdPartyCtrl
     * @description Quantum View Preference Controller for the Quantum View Administration's View Third Party
     * @template : ups.ppc-quantumView-viewThirdParty.html
     */

    PreferenceII.controller('quantumViewAdminViewThirdPartyCtrl',['$scope','ModalService','$rootScope','DashboardService','MockJSONCalls', function($scope,ModalService,$rootScope,DashboardService,MockJSONCalls){
    /**View Third Party Accts Table**/
    var thirdPartyAccts=[
        {
            upsAccountLabel: 'ABC123 - Account Nickname',
            countryLabel: 'US'
        },
        {
            upsAccountLabel: 'DEF456',
            countryLabel: 'UK'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        }
    ];

    $scope.propertyName = 'billToAccount';
    $scope.reverse = true;
    $scope.thirdPartyAccts = thirdPartyAccts;

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    $scope.toggleModal=function(){
        var modalInstance = ModalService.open({
            title: 'Add an Existing Account to your profile.',
            content: '/app_assets/templates/ups.ppc-addorauthenticateaccountModal.html',
            component: 'ppc'
        },function(sc){
            callAIAflow(sc);
        });
    };

    function callAIAflow(sc){
        sc.showAuthenticateModal = false;
        sc.showAIAModal = false;
        sc.displayCID = true;
        sc.parentFormObj=[];
        sc.formObj = {};
        sc.accountType = [
            {'type':'Documents and Packages','isSelected':'true'},
            {'type':'Air Freight','isSelected':'false'}
        ];
        $rootScope.isUPS = true;
        sc.valueEntered = false;

        // Date Picker
        sc.popup1 = {};
        sc.popup1.opened = false;
        sc.format = 'MM/dd/yyyy';
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);

        sc.resetFormFields = function(){
            this.ups_addAuthAccform.$setPristine();
        sc.formObj.acc_number = '';
        sc.formObj.acc_name = '';
        sc.formObj.pcode = '1';
        };

        var initializeAuthenticatevalues = function(Val){
            $rootScope.authenticateFormObj = {};
            if(Val !== undefined){
                $rootScope.authenticateFormObj.countryName = Val.countryName;
                $rootScope.authenticateFormObj.acc_num = Val.acc_number;
                $rootScope.authenticateFormObj.accName = Val.acc_name;
                if(($rootScope.isUPS === true) && (Val.country === 'us' || Val.country === 'ca' || Val.country === 'pr' || Val.country === 'vi')){
                    $rootScope.displayCID = true;
                }else{
                    $rootScope.displayCID = false;
                }
            }
        };
        sc.openAuthenticateModal = function(){
            ModalService.next({
                title: 'Authenticate This Account',
                content: '/app_assets/templates/ups.ppc-authenticateModal.html',
                data: sc.formObj
            });
            initializeAuthenticatevalues(sc.formObj.data);
            $rootScope.formObj = {};
            $rootScope.formObj.tnc = sc.formObj.tnc;
        };



        // Function called on initialize and will call the meta data information
        //Call meta data json for country and other dropdown data
        MockJSONCalls.getJson({urlString: 'ups.doa-metaData.json'})
        // then() called when response gets back
        .then(function(data) {
            // promise fulfilled TODO set metadata
            if(data.errorCode){
            }else{
                sc.countryList = data.countries;
                sc.formObj.country = sc.countryList[0].code;
            }
        }, function() {
            // promise rejected
        });
        sc.backtoAIA = function(){
			ModalService.back();
			if($rootScope.radioIndex===0){
				sc.accountType=[{'type':'Documents and Shipping','isSelected':'true'},
								{'type':'Air Freight','isSelected':'false'}];
				}else{
					sc.accountType=[{'type':'Documents and Shipping','isSelected':'false'},
									{'type':'Air Freight','isSelected':'true'}];
				}
		};
    }

    $scope.removeAccountModal=function(){
        var modalInstance = ModalService.open({
            title: 'Are You Sure?',
            content: '/app_assets/templates/ups.ppc-quantumView-remove-account-or-inbound-loc-modal.html',
            component: 'ppc'
        }, function(sc){
            sc.removeAccountLabels = true;
            sc.instructional_content = "If you continue, we'll permanently remove this account from the company, and you'll no longer be able to view shipment information for the account.";
            sc.continueButton =function(){
                ModalService.dismiss();
            };
        });
    };

    }])

    /**
     * @controller
     * @name upsDOApp.controllers.controller : quantumViewAdminViewImportAcctsCtrl
     * @description Quantum View Preference Controller for the Quantum View Administration's View Import Accounts
     * @template : ups.ppc-quantumView-viewImports.html
     */

    PreferenceII.controller('quantumViewAdminViewImportAcctsCtrl',['$scope','$rootScope','$location','$window','DashboardService','MockJSONCalls','ModalService',function($scope,$rootScope,$location,$window,DashboardService,MockJSONCalls,ModalService){
        $scope.$back = function() {
            $window.history.back();
         };
    /**View Import Accts Table**/
    var importAccts=[
        {
            upsAccountLabel: 'ABC123 - Account Nickname',
            countryLabel: 'US'
        },
        {
            upsAccountLabel: 'DEF456',
            countryLabel: 'UK'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        },
        {
            upsAccountLabel: 'Account Number - Account Nickname',
            countryLabel: 'Country Code'
        }
    ];

    $scope.propertyName = 'importAcctNumber';
    $scope.reverse = true;
    $scope.importAccts = importAccts;

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    $scope.toggleModal=function(){
        var modalInstance = ModalService.open({
            title: 'Add an Existing Account to your profile.',
            content: '/app_assets/templates/ups.ppc-addorauthenticateaccountModal.html',
            component: 'ppc'
        },function(sc){
            callAIAflow(sc);
        });
    };

    function callAIAflow(sc){
        sc.showAuthenticateModal = false;
        sc.showAIAModal = false;
        sc.displayCID = true;
        sc.parentFormObj=[];
        sc.formObj = {};
        sc.accountType = [
            {'type':'Documents and Packages','isSelected':'true'},
            {'type':'Air Freight','isSelected':'false'}
        ];
        $rootScope.isUPS = true;
        sc.valueEntered = false;

        // Date Picker
        sc.popup1 = {};
        sc.popup1.opened = false;
        sc.format = 'MM/dd/yyyy';
        var tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        var afterTomorrow = new Date();
        afterTomorrow.setDate(tomorrow.getDate() + 1);

        sc.resetFormFields = function(){
            this.ups_addAuthAccform.$setPristine();
        sc.formObj.acc_number = '';
        sc.formObj.acc_name = '';
        sc.formObj.pcode = '1';
        };

        var initializeAuthenticatevalues = function(Val){
            $rootScope.authenticateFormObj = {};
            if(Val !== undefined){
                $rootScope.authenticateFormObj.countryName = Val.countryName;
                $rootScope.authenticateFormObj.acc_num = Val.acc_number;
                $rootScope.authenticateFormObj.accName = Val.acc_name;
                if(($rootScope.isUPS === true) && (Val.country === 'us' || Val.country === 'ca' || Val.country === 'pr' || Val.country === 'vi')){
                    $rootScope.displayCID = true;
                }else{
                    $rootScope.displayCID = false;
                }
            }
        };
        sc.openAuthenticateModal = function(){
            ModalService.next({
                title: 'Authenticate This Account',
                content: '/app_assets/templates/ups.ppc-authenticateModal.html',
                data: sc.formObj
            });
            initializeAuthenticatevalues(sc.formObj.data);
            $rootScope.formObj = {};
            $rootScope.formObj.tnc = sc.formObj.tnc;
        };



        // Function called on initialize and will call the meta data information
        //Call meta data json for country and other dropdown data
        MockJSONCalls.getJson({urlString: 'ups.doa-metaData.json'})
        // then() called when response gets back
        .then(function(data) {
            // promise fulfilled TODO set metadata
            if(data.errorCode){
            }else{
                sc.countryList = data.countries;
                sc.formObj.country = sc.countryList[0].code;
            }
        }, function() {
            // promise rejected
        });
        sc.backtoAIA = function(){
			ModalService.back();
			if($rootScope.radioIndex===0){
				sc.accountType=[{'type':'Documents and Shipping','isSelected':'true'},
								{'type':'Air Freight','isSelected':'false'}];
				}else{
					sc.accountType=[{'type':'Documents and Shipping','isSelected':'false'},
									{'type':'Air Freight','isSelected':'true'}];
				}
		};
    }

    $scope.removeAccountModal=function(){
        var modalInstance = ModalService.open({
            title: 'Are You Sure?',
            content: '/app_assets/templates/ups.ppc-quantumView-remove-account-or-inbound-loc-modal.html',
            component: 'ppc'
        }, function(sc){
            sc.removeAccountLabels = true;
            sc.instructional_content = "If you continue, we'll permanently remove this account from the company, and you'll no longer be able to view shipment information for the account.";
            sc.continueButton =function(){
                ModalService.dismiss();
            };
        });
    };

    }])

    /**
     * @controller
     * @name upsDOApp.controllers.controller : quantumViewAdminViewInboundCtrl
     * @description Quantum View Preference Controller for the Quantum View Administration's View Loc IDs
     * @template : ups.ppc-quantumView-viewInbound.html
     */

    PreferenceII.controller('quantumViewAdminViewInboundCtrl',['$scope','ModalService', function($scope,ModalService){
    /**View Inbound Location IDs and Receiving Addresses Table**/
    var inboundLocIDsAccts=[
        {
            locIDLabel: '123ABC4567',
            companyNameLabel: 'ABC Inc.',
            street_address: '1234 Main Street',
            city_and_state: 'Roswell, GA',
            postal_code: '30076',
            countryLabel: 'US'
        },
        {
            locIDLabel: 'LocationID',
            companyNameLabel: 'Company Name',
            street_address: 'ADDRESS_LINE_1',
            city_and_state: 'CITY, ST',
            postal_code: 'POSTAL_CODE',
            countryLabel: 'CO'
        },
        {
            locIDLabel: 'LocationID',
            companyNameLabel: 'Company Name',
            street_address: 'ADDRESS_LINE_1',
            city_and_state: 'CITY, ST',
            postal_code: 'POSTAL_CODE',
            countryLabel: 'CO'
        },
        {
            locIDLabel: 'LocationID',
            companyNameLabel: 'Company Name',
            street_address: 'ADDRESS_LINE_1',
            city_and_state: 'CITY, ST',
            postal_code: 'POSTAL_CODE',
            countryLabel: 'CO'
        },
        {
            locIDLabel: 'LocationID',
            companyNameLabel: 'Company Name',
            street_address: 'ADDRESS_LINE_1',
            city_and_state: 'CITY, ST',
            postal_code: 'POSTAL_CODE',
            countryLabel: 'CO'
        },
        {
            locIDLabel: 'LocationID',
            companyNameLabel: 'Company Name',
            street_address: 'ADDRESS_LINE_1',
            city_and_state: 'CITY, ST',
            postal_code: 'POSTAL_CODE',
            countryLabel: 'CO'
        },
        {
            locIDLabel: 'LocationID',
            companyNameLabel: 'Company Name',
            street_address: 'ADDRESS_LINE_1',
            city_and_state: 'CITY, ST',
            postal_code: 'POSTAL_CODE',
            countryLabel: 'CO'
        },
        {
            locIDLabel: 'LocationID',
            companyNameLabel: 'Company Name',
            street_address: 'ADDRESS_LINE_1',
            city_and_state: 'CITY, ST',
            postal_code: 'POSTAL_CODE',
            countryLabel: 'CO'
        }
    ];

    $scope.propertyName = 'locationIDName';
    $scope.reverse = true;
    $scope.inboundLocIDsAccts = inboundLocIDsAccts;

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    $scope.removeInboundLocModal=function(){
        var modalInstance = ModalService.open({
            title: 'Are You Sure?',
            content: '/app_assets/templates/ups.ppc-quantumView-remove-account-or-inbound-loc-modal.html',
            component: 'ppc'
        }, function(sc){
            sc.removeInboundLabels = true;
            sc.instructional_content = "If you continue, we'll permanently remove this inbound location.";
            sc.continueButton =function(){
                ModalService.dismiss();
            };
        });
    };

    $scope.continue =function(){
        ModalService.dismiss();
    }
    }])

    /**
     * @controller
     * @name upsDOApp.controllers.controller : quantumViewAdministrationCreateInboundLocCtrl
     * @description Quantum View Preference Controller for the QVA's Create Inbound Location Ctrl
     * @template : ups.ppc-preference-quantumView-createInboundLocation.html
     */

    PreferenceII.controller('quantumViewAdministrationCreateInboundLocCtrl',['$scope', function($scope){
    $scope.ups_quantumViewCreateInbound;
    $scope.upsCACForm;

    $scope.createInbound = {
        'ups_company_name_input':'',
        'ups_location_id_input':''
    };

    $scope.checkFormErrors = function() {
        if ($scope.ups_quantumViewCreateInbound.ups_location_id_two.$invalid) {
            return true;
        }
        if ($scope.ups_quantumViewCreateInbound.ups_company_name.$invalid) {
            return true;
        }
        //Errors from CAC
        if ($scope.upsCACForm.address0.$invalid) {
            return true;
        }
        if ($scope.upsCACForm.city.$invalid) {
            return true;
        }
        if ($scope.upsCACForm.state.$invalid) {
            return true;
        }
        if ($scope.upsCACForm.zipCode.$invalid) {
            return true;
        }
    }

    $scope.saveButton = function(valid) {
        $scope.clicked = true;
     };

    }])

    /**
     * @controller
     * @name upsDOApp.controllers.controller : quantumViewAdministrationUsersCtrl
     * @description Quantum View Preference Controller for the Quantum View Administration's Users Accordion
     * @template : ups.ppc-quantumView-users.html
     */

    PreferenceII.controller('quantumViewAdministrationUsersCtrl',['$scope','$location', function($scope,$location){
	/**Quantum View Administration**/

    /**Users Accordion**/
    var qvmUsers=[
        {
            usersName: 'Abigail Smith',
            userID: 'asmith',
            resetPasswordButton:true,
            removeUserButton: true,
            transferPrivilegesButton: true
        },
        {
            usersName: 'Agness Jones',
            userID: 'ajones',
            resetPasswordButton:false,
            removeUserButton: false,
            transferPrivilegesButton: false
        },
        {
            usersName: 'Bartleby Quince',
            userID: 'bquince',
            resetPasswordButton:false,
            removeUserButton: false,
            transferPrivilegesButton: false
        },
        {
            usersName: '{User Name}',
            userID: '{User ID}',
            resetPasswordButton:false,
            removeUserButton: false,
            transferPrivilegesButton: false
        },
        {
            usersName: '{User Name}',
            userID: '{User ID}',
            resetPasswordButton:false,
            removeUserButton: false,
            transferPrivilegesButton: false
        },
        {
            usersName: '{User Name}',
            userID: '{User ID}',
            resetPasswordButton:false,
            removeUserButton: false,
            transferPrivilegesButton: false
        },
        {
            usersName: '{User Name}',
            userID: '{User ID}',
            resetPasswordButton:false,
            removeUserButton: false,
            transferPrivilegesButton: false
        },
        {
            usersName: '{User Name}',
            userID: '{User ID}',
            resetPasswordButton:false,
            removeUserButton: false,
            transferPrivilegesButton: false
        },
        {
            usersName: '{User Name}',
            userID: '{User ID}',
            resetPasswordButton:false,
            removeUserButton: false,
            transferPrivilegesButton: false
        },
        {
            usersName: '{User Name}',
            userID: '{User ID}',
            resetPasswordButton:false,
            removeUserButton: false,
            transferPrivilegesButton: false
        }
    ];

    $scope.showOptionSearchCriteriaButton = function() {
        $scope.showOptionSearchCriteria = !$scope.showOptionSearchCriteria;
    };

    $scope.propertyName = 'name';
    $scope.reverse = true;
    $scope.qvmUsers = qvmUsers;

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

    /**
      * @function
      * @name createUserButton
      * @description Sends you to Create User Page
      */
    $scope.createUserButton = function () {
           $location.path('/preferencePage/quantumView/createUser');
    };

    /**
      * @function
      * @name inviteUserButton
      * @description Sends you to Invite User Page
      */
    $scope.inviteUserButton = function () {
           $location.path('/preferencePage/quantumView/inviteUser');
    };

    }])
    /**
     * @controller
     * @name upsDOApp.controllers.controller : QuantumViewUserAdministrationCtrl
     * @description Quantum View User Administration Controller; Calls in the Mapping Service explicitly
     * @template : ups.ppc-quantumView-userAdministration-preference.html
     */

    PreferenceII.controller('QuantumViewUserAdministrationCtrl',['$scope','MappingService', function($scope, MappingService){


    function init(){
        $scope.groups = MappingService.getQuantumViewUserAdministrationMap();
    }
    init();

    }])

    /**
     * @controller
     * @name upsDOApp.controllers.controller : quantumViewAdministrationUserInfoCtrl
     * @description Quantum View User Administration User Information Controller;
     * @template : ups.ppc-preference-quantumView-userInformation.html
     */

    PreferenceII.controller('quantumViewAdministrationUserInfoCtrl',['$scope', function($scope){
        $scope.ups_quantumViewUserInformationForm;
        $scope.upsCACForm;

        $scope.checkFormErrors = function() {

            //Errors from CAC
            if ($scope.upsCACForm.address0.$invalid) {
                return true;
            }
            if ($scope.upsCACForm.city.$invalid) {
                return true;
            }
            if ($scope.upsCACForm.state.$invalid) {
                return true;
            }
            if ($scope.upsCACForm.zipCode.$invalid) {
                return true;
            }
        }

        $scope.saveUserInformationButton = function(valid) {
            $scope.clicked = true;
         };

        $scope.userAccessOptions = [
            {
                userAccessName: 'ups-quantum_view_manage',
                userAccessValue: 0,
                userAccessLabel: 'Quantum View Manage',
                suspendButton: true
            },
            {
                userAccessName: 'ups-quantum_view_data',
                userAccessValue: 1,
                userAccessLabel: 'Quantum View Data',
                suspendButton: false
            },
            {
                userAccessName: 'ups-delivery_interceptsm',
                userAccessValue: 2,
                userAccessLabel: 'UPS Delivery InterceptSM (US/PR Packages Only)',
                suspendButton: false
            },
            {
                userAccessName: 'ups-company_admin_privileges',
                userAccessValue: 3,
                userAccessLabel: 'UPS Company Administrator Privileges',
                suspendButton: false
            },
            {
                userAccessName: 'ups-batch_claim_privileges',
                userAccessValue: 4,
                userAccessLabel: 'UPS Batch Claim Privileges',
                suspendButton: false
            }

        ];


    }])

    /**
     * @controller
     * @name upsDOApp.controllers.controller : quantumViewAdministrationManageUserServicesCtrl
     * @description Quantum View User Administration Manage User Services Controller;
     * @template : ups.ppc-preference-quantumView-manageUserServices.html
     */

    PreferenceII.controller('quantumViewAdministrationManageUserServicesCtrl',['$scope','ModalService', function($scope,ModalService){
        /**Manage User Services Accordion**/


        /**Quantum View Manage Table**/
        $scope.manageUserServices=[
            {
                serviceLabel: 'Outbound',
                link: '#/preferencePage/quantumView/userAdministration/editAccountPrivileges',
                activeStatus: true,
                editButton: true,
                suspendButton:true
            },
            {
                serviceLabel: 'Inbound Locations ID',
                link: '#/preferencePage/quantumView/userAdministration/editLocationPrivileges',
                noneStatus: true,
                editButton: true,
                suspendButton:false
            },
            {
                serviceLabel: 'Inbound Receiving Addresses',
                link: '#/preferencePage/quantumView/userAdministration/editLocationPrivileges',
                noneStatus: true,
                editButton: true,
                suspendButton:false
            },
            {
                serviceLabel: 'Third Party',
                link: '#/preferencePage/quantumView/userAdministration/editAccountPrivileges',
                noneStatus: true,
                editButton: true,
                suspendButton:false
            },
            {
                serviceLabel: 'Imports',
                link: '#/preferencePage/quantumView/userAdministration/editAccountPrivileges',
                noneStatus: true,
                editButton: true,
                suspendButton:false
            }
        ];
    }])

    /**
     * @controller
     * @name upsDOApp.controllers.controller : quantumViewAdministrationManageDataSubscriptionsCtrl
     * @description Quantum View User Administration Manage Data Subscriptions Controller;
     * @template : ups.ppc-preference-quantumView-manageDataSubscriptions.html
     */

    PreferenceII.controller('quantumViewAdministrationManageDataSubscriptionsCtrl',['$scope','ModalService', function($scope,ModalService){
        var manageDataSubscriptions = [
            {
                subscriptionName: 'outbound01',
                type: 'Outbound',
                editButton: true,
                deleteButton: true
            },
            {
                subscriptionName: 'ibiocid_atl_01',
                type: 'Inbound Locations ID',
                editButton: true,
                deleteButton: true

            },
            {
                subscriptionName: '1234 Main Atlanta',
                type: 'Inbound Receiving Address',
                editButton: true,
                deleteButton: true

            },
            {
                subscriptionName: 'thirdparty01',
                type: 'Inbound Receiving Addresses',
                editButton: true,
                deleteButton: true
            },
            {
                subscriptionName: 'imports01',
                type: 'Imports',
                editButton: true,
                deleteButton: true
            }
        ];

        $scope.propertyName = 'subscriptionName';
        $scope.reverse = true;
        $scope.manageDataSubscriptions = manageDataSubscriptions;

        $scope.sortBy = function(propertyName) {
            $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
            $scope.propertyName = propertyName;
        };

        $scope.deleteSubscriptionConfirmation=function(){
            var modalInstance = ModalService.open({
                title: 'Are You Sure?',
                content: '/app_assets/templates/ups.ppc-quantumView-remove-account-or-inbound-loc-modal.html',
                component: 'ppc'
            }, function(sc){
                sc.subscriptionLabels = true;
                sc.deleteUser = false;
                sc.instructional_content = "If you continue, we'll permanently remove this data subscription.";
                sc.continueButton =function(){
                    ModalService.dismiss();
                };
            });
        };


    }])

    /**
     * @controller
     * @name upsDOApp.controllers.controller : quantumViewAdminEditAccountPrivileges
     * @description Quantum View User Administration Edit Account Privileges Controller;
     * @template : ups.ppc-preference-quantumView-editAccountPrivileges.html
     */

    PreferenceII.controller('quantumViewAdminEditAccountPrivileges',['$scope','$location', function($scope,$location){
        /**Edit Account Privileges Table**/
        $scope.editAccountPrivileges=[
            {
                editAccountLabel: 'ABC123',
                nicknameLabel: 'My Account',
                countryLabel: 'US'
            },
            {
                editAccountLabel: 'ACCOUNT_NUMBER',
                nicknameLabel: 'ACCT_NICKNAME',
                countryLabel: 'CO'
            },
            {
                editAccountLabel: 'ACCOUNT_NUMBER',
                nicknameLabel: 'ACCT_NICKNAME',
                countryLabel: 'CO'
            },
            {
                editAccountLabel: 'ACCOUNT_NUMBER',
                nicknameLabel: 'ACCT_NICKNAME',
                countryLabel: 'CO'
            },
            {
                editAccountLabel: 'ACCOUNT_NUMBER',
                nicknameLabel: 'ACCT_NICKNAME',
                countryLabel: 'CO'
            }
        ];

        /**
          * @function
          * @name checkAll
          * @description Checks all of the checkboxes at once when header checkbox is checked
          */
          $scope.checkAll = function () {
             if ($scope.selectedAll) {
                 $scope.selectedAll = true;
             } else {
                 $scope.selectedAll = false;
             }
             angular.forEach($scope.editAccountPrivileges, function (account) {
                 account.Selected = $scope.selectedAll;
             });

         };

         /**
           * @function
           * @name saveButton
           * @description Sends you back to User Administration Page
           */
         $scope.saveButton = function () {
             	$location.path('/preferencePage/quantumView/userAdministration');
         };

    }])

    /**
     * @controller
     * @name upsDOApp.controllers.controller : quantumViewAdminEditLocationPrivileges
     * @description Quantum View User Administration Edit Location Privileges Controller;
     * @template : ups.ppc-preference-quantumView-editLocationPrivileges.html
     */

    PreferenceII.controller('quantumViewAdminEditLocationPrivileges',['$scope', function($scope){

        /**Quantum View Manage Table**/
        $scope.editPrivileges=[
            {
                locationID: '123ABC4567',
                companyName: 'ABC Inc',
                streetAddress: '1234 Main Street',
                cityState: 'Roswell, GA',
                postalCode: '30076',
                country: 'US',
                activeStatus: true
            },
            {
                locationID: 'LocationID',
                companyName: 'Company Name',
                streetAddress: 'ADDRESS_LINE_1',
                cityState: 'CITY, ST',
                postalCode: 'POSTAL_CODE',
                country: 'CO',
                activeStatus: true
            },
            {
                locationID: 'LocationID',
                companyName: 'Company Name',
                streetAddress: 'ADDRESS_LINE_1',
                cityState: 'CITY, ST',
                postalCode: 'POSTAL_CODE',
                country: 'CO',
                activeStatus: true
            },
            {
                locationID: 'LocationID',
                companyName: 'Company Name',
                streetAddress: 'ADDRESS_LINE_1',
                cityState: 'CITY, ST',
                postalCode: 'POSTAL_CODE',
                country: 'CO',
                activeStatus: true
            },
            {
                locationID: 'LocationID',
                companyName: 'Company Name',
                streetAddress: 'ADDRESS_LINE_1',
                cityState: 'CITY, ST',
                postalCode: 'POSTAL_CODE',
                country: 'CO',
                activeStatus: true
            }
        ];

        /**
          * @function
          * @name toggleSelect
          * @description Checks all of the checkboxes at once when header checkbox is checked
          */
          $scope.toggleSelect = function(){
                angular.forEach($scope.editPrivileges, function(item){
                    item.selected = event.target.checked;
                });
          }



    }]);

    /**
     * @controller
     * @name upsDOApp.controllers.controller : quantumViewAdministrationEditDataSubscription
     * @description Quantum View User Administration Edit Data Subscription Controller;
     * @template : ups.ppc-preference-quantumView-editDataSubscription.html
     */

    PreferenceII.controller('quantumViewAdminEditDataSubscription',['$scope', function($scope){

        $scope.ups_quantumDataSubscription;
        $scope.dataSubscription = {
            'ups_subscription_name_input':'',
            'ups_subscription_type': '0'
        };

        $scope.checkFormErrors = function() {
            if ($scope.ups_quantumDataSubscription.ups_subscription_name.$invalid) {
                return true;
            }
            if ($scope.dataSubscription.ups_subscription_type == '0') {
                return true;
            }

        }

        $scope.saveSubscriptionButton = function(valid) {
            $scope.clicked = true;
         };

         $scope.notificationOptionsOne = [
             {
                 typeOfNotification: 'ups-outbound_notification',
                 notifcationValue: 0,
                 notificationLabel: 'Outbound Notification'
             },
             {
                 typeOfNotification: 'ups-exception_notificiation',
                 notifcationValue: 1,
                 notificationLabel: 'Exception Notification'
             },
             {
                 typeOfNotification: 'ups-delivery_notification',
                 notifcationValue: 2,
                 notificationLabel: 'Delivery Notification'
             }

         ];

         $scope.notificationOptionsTwo = [
             {
                 typeOfNotification: 'ups-inbound_notification',
                 notifcationValue: 0,
                 notificationLabel: 'Inbound Notification'
             },
             {
                 typeOfNotification: 'ups-delivery_notification',
                 notifcationValue: 1,
                 notificationLabel: 'Delivery Notification'
             }

         ];

         $scope.includeManifestOrigin = [
             {
                name: 'ups-include_manifest',
                value: 0,
                label: 'Include complete manifest information'
            },
            {
                name: 'ups-include_origin',
                value: 1,
                label: 'Include complete origin information'
            }
        ];

        $scope.includeTable=[
            {
                accountLabel: 'ABC123',
                locationIDLabel: 'ABCD123456',
                nicknameLabel: 'ABC Company SW',
                selected: false
            },
            {
                accountLabel: 'ACCT_NUM',
                locationIDLabel: 'LOCID',
                nicknameLabel: 'LOCID_NICKNAME',
                selected: false
            },
            {
                accountLabel: 'ACCT_NUM',
                locationIDLabel: 'LOCID',
                nicknameLabel: 'LOCID_NICKNAME',
                selected: false
            },
            {
                accountLabel: 'ACCT_NUM',
                locationIDLabel: 'LOCID',
                nicknameLabel: 'LOCID_NICKNAME',
                selected: false
            },
            {
                accountLabel: 'ACCT_NUM',
                locationIDLabel: 'LOCID',
                nicknameLabel: 'LOCID_NICKNAME',
                selected: false
            }
        ];

        /**
          * @function
          * @name toggleSelect
          * @description Checks all of the checkboxes at once when header checkbox is checked
          */
          $scope.toggleSelect = function(){
                angular.forEach($scope.includeTable, function(item){
                    item.selected = event.target.checked;
                });
          }

         $scope.fileFormat=[
             {
                 fileFormatName: 'ups-file_format',
                 fileFormatLabel: 'CSV (Comma-separated values file)'
             },
             {
                 fileFormatName: 'ups-file_format',
                 fileFormatLabel: 'XML'
             },
             {
                 fileFormatName: 'ups-file_format',
                 fileFormatLabel: 'Flat File'
             }
         ];
    }])

    /**
     * @controller
     * @name upsDOApp.controllers.controller : quantumViewTransferUserPrivileges
     * @description Quantum View Transfer User Privileges Controller;
     * @template : ups.ppc-preference-quantumView-transferUserPrivileges.html
     */

    PreferenceII.controller('quantumViewTransferUserPrivileges',['$scope','$location','ModalService', function($scope,$location,ModalService){

        $scope.ups_quantumTransferUserPrivileges;

        $scope.checkFormErrors = function() {
            if ($scope.ups_quantumTransferUserPrivileges.ups_user_id1.$invalid) {
                return true;
            }
            if ($scope.ups_quantumTransferUserPrivileges.ups_user_id2.$invalid) {
                return true;
            }

        }

        $scope.transferUserPrivilegesButton = function() {
            $scope.clicked = true;

            if($scope.ups_quantumTransferUserPrivileges.$valid) {
                $location.path('/preferencePage/quantumView/');
            }

         };

         /**
           * @function
           * @name searchButton
           * @description The Search Users dialog is di`splayed.
           */
         $scope.searchButton = function () {
             	$location.path('/preferencePage/quantumView/');
         };

         $scope.searchUsersDialog=function(){
             var modalInstance = ModalService.open({
                 title: 'Search for a user.',
                 content: '/app_assets/templates/ups.ppc-preference-quantumView-searchUsersDialog.html',
                 component: 'ppc',
                 controller: 'quantumViewSearchUsersDialog'
             }, function(sc){
                 sc.cancelButton =function(){
                     ModalService.dismiss();
                 };

                 sc.selectActionsButton = function(){
                     $location.path('/preferencePage/quantumView/userAdministration');
                     ModalService.dismiss();
                 };
             });
         };

    }])

    PreferenceII.controller('quantumViewSearchUsersDialog',['$scope','$location','ModalService', function($scope,$location,ModalService){
	/**Quantum View Search Users Dialog**/

    /**Search Users**/
    var qvmSearchUsers=[
        {
            usersName: 'Abigail Smith',
            userID: 'asmith',
            selectUserButton: true
        },
        {
            usersName: 'Agness Jones',
            userID: 'ajones',
            selectUserButton: true
        },
        {
            usersName: 'Bartleby Quince',
            userID: 'bquince',
            selectUserButton: true
        },
        {
            usersName: '{User Name}',
            userID: '{User ID}',
            selectUserButton: true
        },
        {
            usersName: '{User Name}',
            userID: '{User ID}',
            selectUserButton: true
        },
        {
            usersName: '{User Name}',
            userID: '{User ID}',
            selectUserButton: true
        },
        {
            usersName: '{User Name}',
            userID: '{User ID}',
            resetPasswordButton:false,
            removeUserButton: false,
            selectUserButton: true
        },
        {
            usersName: '{User Name}',
            userID: '{User ID}',
            selectUserButton: true
        },
        {
            usersName: '{User Name}',
            userID: '{User ID}',
            resetPasswordButton:false,
            removeUserButton: false,
            selectUserButton: true
        },
        {
            usersName: '{User Name}',
            userID: '{User ID}',
            selectUserButton: true
        }
    ];

    $scope.showOptionSearchCriteriaButton = function() {
        $scope.showOptionSearchCriteria = !$scope.showOptionSearchCriteria;
    };

    $scope.propertyName = 'name';
    $scope.reverse = true;
    $scope.qvmSearchUsers = qvmSearchUsers;

    $scope.sortBy = function(propertyName) {
        $scope.reverse = ($scope.propertyName === propertyName) ? !$scope.reverse : false;
        $scope.propertyName = propertyName;
    };

}])

/**
 * @controller
 * @name upsDOApp.controllers.controller : quantumViewCreateUser
 * @description Quantum View Create User Controller;
 * @template : ups.ppc-preference-quantumView-createUser.html
 */

PreferenceII.controller('quantumViewCreateUser',['$scope','$location', function($scope,$location){

    $scope.ups_quantumCreateUser;

    $scope.checkFormErrors = function() {
        if ($scope.ups_quantumCreateUser.ups_user_name.$invalid) {
            return true;
        }
        if ($scope.ups_quantumCreateUser.ups_user_id.$invalid) {
            return true;
        }
        if ($scope.ups_quantumCreateUser.ups_telephone.$invalid) {
            return true;
        }
        if ($scope.ups_quantumCreateUser.ups_company_email.$invalid) {
            return true;
        }
        if ($scope.ups_quantumCreateUser.ups_support_email.$invalid) {
            return true;
        }
        if ($scope.ups_quantumCreateUser.ups_support_telephone.$invalid) {
            return true;
        }

        //Errors from CAC
        if ($scope.upsCACForm.address0.$invalid) {
            return true;
        }
        if ($scope.upsCACForm.city.$invalid) {
            return true;
        }
        if ($scope.upsCACForm.state.$invalid) {
            return true;
        }
        if ($scope.upsCACForm.zipCode.$invalid) {
            return true;
        }

    };

    $scope.saveUserButton = function() {
        $scope.clicked = true;

        if($scope.ups_quantumCreateUser.$valid) {
            $location.path('/preferencePage/quantumView/userAdministration');
        }

     };

     $scope.userAccessOptions = [
         {
             userAccessName: 'ups-quantum_view_manage',
             userAccessValue: 0,
             userAccessLabel: 'Quantum View Manage'
         },
         {
             userAccessName: 'ups-quantum_view_data',
             userAccessValue: 1,
             userAccessLabel: 'Quantum View Data'
         },
         {
             userAccessName: 'ups-delivery_interceptsm',
             userAccessValue: 2,
             userAccessLabel: 'UPS Delivery InterceptSM (US/PR Packages Only)'
         },
         {
             userAccessName: 'ups-company_admin_privileges',
             userAccessValue: 3,
             userAccessLabel: 'Company Administrator Privileges'
         }

     ];

}])

PreferenceII.controller('quantumViewInviteUser',['$scope','$location', function($scope,$location){

    $scope.ups_quantumInviteUser;

    $scope.checkFormErrors = function() {
        if ($scope.ups_quantumInviteUser.ups_user_id.$invalid) {
            return true;
        }
        if ($scope.ups_quantumInviteUser.ups_user_email.$invalid) {
            return true;
        }
    };

    $scope.sendInvitationButton = function() {
        $scope.clicked = true;

        if($scope.ups_quantumInviteUser.$valid) {
            $location.path('/preferencePage/quantumView/userAdministration');
        }

     };

}]);
