'use strict';

var UPS_DO_APP = angular.module('upsDOApp', [
    'ngRoute',
    'ui.bootstrap',
    'upsDOApp.controllers',
    'upsDOApp.directives',
    'upsDoApp.filters',
    'upsDoApp.services',
    'LocalStorageModule',
    'ngFileUpload',
    'ngSanitize',
	'upsApp',
    'ngAnimate'
]);

//CONSTANTS
UPS_DO_APP.constant('API_SERVICE', 'local');
UPS_DO_APP.constant('MOCK_BASE_URL', 'app_assets/mocks/');
UPS_DO_APP.constant('TEMPLATE_URL', 'app_assets/templates/');
UPS_DO_APP.constant('UPLOAD_URL','https://angular-file-upload-cors-srv.appspot.com/upload');

//CONFIG
UPS_DO_APP.config(['localStorageServiceProvider','$routeProvider', '$locationProvider', function(localStorageServiceProvider, $routeProvider, $locationProvider){
  localStorageServiceProvider.setPrefix('ls');


/**
* @routing
* @description Controls the routing logic for hash urls
*/
  $routeProvider
  .when('/signup', {
    templateUrl: '/app_assets/templates/ups.doa-signupModal.html',
    controller: 'StandaloneSignupCtrl'
  }).when('/signup/confirmation', {
    templateUrl: '/app_assets/templates/ups.doa-ConfirmationModal.html',
    controller: 'SignupCtrl'
  }).when('/login', {
    templateUrl: '/app_assets/templates/ups.ppc-LoginModal.html',
    controller: 'loginCtrl'
  })
  /*.when('/cancelMembership', {
    templateUrl: '/app_assets/templates/ups.ppc-cancelMembershipModal.html',
    controller: 'cancelMembershipCtrl'
  })*/
  .when('/profilePage', {
    templateUrl: '/app_assets/templates/ups.ppc-profilePage.html',
    controller: 'profileCtrl'
    //title: 'Profile'
  }).when('/informationPage', {
    templateUrl: '/app_assets/templates/ups.ppc-myinformation.html',
    controller: 'profileCtrl'
    //title: 'My Information'
  }).when('/informationPage/changePassword', {
    templateUrl: '/app_assets/templates/ups.ppc-change-password.html',
    controller: 'profileCtrl'
  }).when('/informationPage/securityPage', {
    templateUrl: '/app_assets/templates/ups.ppc-edit-security-questions.html',
    controller: 'securityCtrl'
  }).when('/informationPage/editCommunicationPreferences', {
    templateUrl: '/app_assets/templates/ups.ppc-editCommunicationPref.html',
    controller: 'editCommunicationPrefCtrl'
  })


  //Contacts Start
  .when('/contactPage', {
    templateUrl: '/app_assets/templates/ups.ppc-contact.html',
    controller: 'contactCtrl'
    //title: 'Contacts'
  }).when('/contactPage/open', {
    templateUrl: '/app_assets/templates/ups.ppc-contact-edit.html',
    controller: 'contactEditCtrl'
    //title: 'Add a contact.'
  }).when('/contactPage/edit', {
    templateUrl: '/app_assets/templates/ups.ppc-contact-edit.html',
    controller: 'contactEditCtrl'
    //title: 'Edit this contact.'
  }).when('/contactPage/importContacts', {
    templateUrl: '/app_assets/templates/ups.ppc-import-contacts.html',
    controller: 'importContactsCtrl'
    //title: 'Import your contacts.'
  }).when('/contactPage/exportContacts', {
    templateUrl: '/app_assets/templates/ups.ppc-export-contacts.html',
    controller: 'exportContactsCtrl'
    //title: 'Export your contacts.'
  }).when('/contactPage/addDistribution', {
    templateUrl: '/app_assets/templates/ups.ppc-distribution-add.html',
    controller: 'distributionAddCtrl'
    //title: 'Add a distribution list.'
  }).when('/contactPage/editDistribution', {
    templateUrl: '/app_assets/templates/ups.ppc-distribution-add.html',
    controller: 'distributionAddCtrl'
    //title: 'Edit a distribution list.'
  })
  //Contacts End

  //Payment card
  .when('/paymentPage', {
    templateUrl: '/app_assets/templates/ups.ppc-payment.html',
    controller: 'paymentCtrl'
    //title: 'Payment Options'
  }).when('/paymentPage/EditCardAccount', {
    templateUrl: '/app_assets/templates/ups.ppc-edit-account.html',
    controller: 'paymentCtrl'
    //title: 'Edit this payment account.'
  }).when('/paymentPage/AddPaymentCard', {
    templateUrl: '/app_assets/templates/ups.ppc-payment-card.html'
    //title: 'Add a payment card.'
  }).when('/paymentPage/EditPaymentCard', {
    templateUrl: '/app_assets/templates/ups.ppc-payment-card.html'
    //title: 'Edit a payment card.'
  }).when('/paymentPage/AddPayPal', {
    templateUrl: '/app_assets/templates/ups.ppc-add-paypal.html'
    //title: 'Add a PayPal account.'
  }).when('/paymentPage/EditPayPal', {
    templateUrl: '/app_assets/templates/ups.ppc-add-paypal.html'
    //title: 'Edit this PayPal account.'
    // this will remove once preference page implemented.
  })//.when('/preferencePage/paymentMethod', {
    //templateUrl: '/app_assets/templates/ups.ppc-preference-paymentMethod.html'
    //***************************************************
 // })
  //Payment card End
  .when('/preferencePage', {
    templateUrl: '/app_assets/templates/ups.ppc-preference.html',
    controller: 'preferenceCtrl'
    //title: 'Preferences'
  }).when('/preferencePage/ShippingPreference', {
    templateUrl: '/app_assets/templates/ups.ppc-shipping-preference.html',
    controller: 'shippingPreferenceCtrl'
    //title: 'Shipping'
  }).when('/preferencePage/RatingPreference', {
    templateUrl: '/app_assets/templates/ups.ppc-rating-preference.html',
    controller: 'ratingPreferenceCtrl'
    //title: 'Calculate Time & Cost'
  }).when('/preferencePage/InternationalDocs', {
      templateUrl: '/app_assets/templates/ups.ppc-internationalDoc-preference.html',
      controller: 'InternationalDocCtrl'
      //title: 'International Documentation'
  }).when('/preferencePage/FreightPreference', {
    templateUrl: '/app_assets/templates/ups.ppc-FreightShipping-preference.html',
    controller: 'FreightShipingPreferenceCtrl'
    //title: 'Freight Shipping'
  //}).when('/viewAndPayBill', { //this page does exist anymore?
    //templateUrl: '/app_assets/templates/ups.ppc-viewAndPayBill.html'
  }).when('/autoRenewValidation', {
    templateUrl: '/app_assets/templates/ups.ppc-autoRenewvalidation.html',
    controller: 'autoRenewValidationCtrl'
  }).when('/notYetEnrolled', {//this is the myc upsell page that is TBD
    templateUrl: '/app_assets/templates/ups.ppc-notYetEnrolled.html',
  }).when('/preferencePage/mychoicePreference', {
      templateUrl: '/app_assets/templates/ups.ppc-mychoice-preference.html',
      controller: 'mychoicePreferenceCtrl'
      //title: 'UPS My Choice Preferences'
  }).when('/preferencePage/mychoice/membershipRenewal',{
      templateUrl:'/app_assets/templates/ups.ppc-mychoice-preference-manageMembershipRenewal.html',
      controller:'myChoiceManageRenewCtrl'
  }).when('/preferencePage/mychoice/pendingActivation',{
      templateUrl:'/app_assets/templates/ups.ppc-pendingActivation.html',
      controller:'activationCodeCtrl'
  }).when('/preferencePage/mychoice/ActivationExistingUsers',{
      templateUrl:'/app_assets/templates/ups.ppc-activationCode_step2_existingUsers.html',
      controller:'activationCodeCtrl'
  }).when('/preferencePage/mychoice/codeConfirm',{
      templateUrl:'/app_assets/templates/ups.ppc-activation-code-confirm.html',
      controller:'activationCodeCtrl'
  }).when('/preferencePage/mychoice/activationCodeStep2',{
      templateUrl:'/app_assets/templates/ups.ppc-activation-code-step2.html',
      controller:'activationCodeCtrl'
  }).when('/preferencePage/mychoice/activationCodeStep1',{
      templateUrl:'/app_assets/templates/ups.ppc-activation-code-step1.html',
      controller:'activationCodeCtrl'
  }).when('/preferencePage/mychoice/membershipConfirmation',{
      templateUrl:'/app_assets/templates/ups.ppc-mychoice-preference-confirmationRenewal.html',
      controller:'myChoiceConfirmRenewCtrl'
  }).when('/preferencePage/mychoice/editADL',{
      templateUrl:'/app_assets/templates/ups.ppc-mychoice-preference-editADL.html',
      controller:'myChoiceSetAltDelievryCtrl'
  }).when('/preferencePage/mychoice/authenticate',{
      templateUrl:'/app_assets/templates/ups.ppc-myChoice-verifyAuth.html',
      controller:'verifyCurrentAuthCtrl'
  }).when('/preferencePage/mychoice/authenticate_birthday',{
      templateUrl:'/app_assets/templates/ups.ppc-myChoice-verifyAuthentication_process.html',
      controller:'verifyAuthenticationCheckCtrl'
  }).when('/preferencePage/mychoice/authenticate_mailprocess',{
      templateUrl:'/app_assets/templates/ups.ppc-myChoice-verifyAuthentication_mailProcess.html',
      controller:'verifyAuthenticationMailCtrl'
  }).when('/preferencePage/mychoice/authenticate_mailverify',{
      templateUrl:'/app_assets/templates/ups.ppc-myChoice-verifyAuthentication_mailVerify.html',
      controller:'verifyAuthenticationMailVerifyCtrl'
  }).when('/preferencePage/mychoice/authenticate_failed',{
      templateUrl:'/app_assets/templates/ups.ppc-myChoice-verifyAuthentication_failed.html',
      controller:'verifyAuthenticationFailedCtrl'
  }).when('/preferencePage/mychoice/membershipReactivate',{
      templateUrl:'/app_assets/templates/ups.ppc-mychoice-preference-membershipReactivate.html',
      controller:'myChoiceReactivate'
  }).when('/preferencePage/mychoice/membershipCancelBasic',{
      templateUrl:'/app_assets/templates/ups.ppc-mychoice-preference-membershipCancelBasic.html',
      controller:'myChoiceCancelBasic'
  }).when('/preferencePage/mychoice/membershipCancelPremium',{
      templateUrl:'/app_assets/templates/ups.ppc-mychoice-preference-membershipCancelPremium.html',
      controller:'myChoiceCancelPremium'
  }).when('/membershipInfo',{
      templateUrl:'/app_assets/templates/ups.ppc-mychoice-preference-manageAddress.html',
      controller:'myChoiceManageMembershipAddCtrl'
  }).when('/preferencePage/quantumView', {
      templateUrl: '/app_assets/templates/ups.ppc-quantumView-preference.html'
  }).when('/preferencePage/quantumView/viewOutbound', {
      templateUrl: '/app_assets/templates/ups.ppc-preference-quantumView-viewOutbound.html'
  }).when('/preferencePage/quantumView/viewThirdParty', {
      templateUrl: '/app_assets/templates/ups.ppc-preference-quantumView-viewThirdParty.html'
  }).when('/preferencePage/quantumView/viewImportAccounts', {
      templateUrl: '/app_assets/templates/ups.ppc-preference-quantumView-viewImports.html'
  }).when('/preferencePage/quantumView/viewInbound', {
      templateUrl: '/app_assets/templates/ups.ppc-preference-quantumView-viewInbound.html'
  }).when('/preferencePage/quantumView/updateAcctNickname', {
      templateUrl: '/app_assets/templates/ups.ppc-preference-quantumView-updateAccountNickname.html'
  }).when('/preferencePage/quantumView/viewInbound/createInboundLocation', {
      templateUrl: '/app_assets/templates/ups.ppc-preference-quantumView-createInboundLocation.html'
  }).when('/preferencePage/quantumView/userAdministration', {
      templateUrl: '/app_assets/templates/ups.ppc-quantumView-userAdmin-preference.html'
  }).when('/preferencePage/quantumView/userAdministration/editAccountPrivileges', {
      templateUrl: '/app_assets/templates/ups.ppc-preference-quantumView-editAccountPrivileges.html'
  }).when('/preferencePage/quantumView/userAdministration/editLocationPrivileges', {
      templateUrl: '/app_assets/templates/ups.ppc-preference-quantumView-editLocationPrivileges.html'
  }).when('/preferencePage/quantumView/userAdministration/editDataSubscription', {
      templateUrl: '/app_assets/templates/ups.ppc-preference-quantumView-editDataSubscription.html'
  }).when('/preferencePage/quantumView/transferUserPrivileges', {
      templateUrl: '/app_assets/templates/ups.ppc-preference-quantumView-transferUserPrivileges.html'
  }).when('/saveChanges',{
      templateUrl:'/app_assets/templates/ups.ppc-changessave.html',
      controller:'saveChangesCtrl'
  }).when('/preferencePage/quantumView/searchUsersDialog',{
      templateUrl:'/app_assets/templates/ups.ppc-preference-quantumView-searchUsersDialog.html',
  }).when('/preferencePage/quantumView/createUser',{
      templateUrl:'/app_assets/templates/ups.ppc-preference-quantumView-createUser.html',
  }).when('/preferencePage/quantumView/inviteUser',{
      templateUrl:'/app_assets/templates/ups.ppc-preference-quantumView-inviteUser.html',
  }).otherwise({
    redirectTo: '/profilePage'
  });

  $locationProvider.hashPrefix('');
}]);


/*UPS_DO_APP.directive('pageTitle', function () {
	return {
		restrict: 'A',
		link: function(scope, elem, attr) {
			document.title = attr.pageTitle;
		}
	};
});*/
