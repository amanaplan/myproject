var app = angular.module('AlertsApp', ['ngDialog', 'ngAnimate', 'ui.bootstrap', 'ngTouch', 'ui.grid', 'ui.grid.pinning', 'ui.grid.selection', 'ui.grid.pagination']);

app.controller('MainCtrl', function($scope, ngDialog) {
	$scope.combAlerts = function($event) {
		var dialog = ngDialog.open({
			template : 'assets/resources/scripts/legacy_spa_ent/qvmc/_templates/alt-combined.html',
			scope : $scope,
			$event : $event,
			className : 'ngdialog-theme-plain'
		});
	};
	$scope.delCustView = function($event) {
		var dialog = ngDialog.open({
			template : 'assets/resources/scripts/legacy_spa_ent/qvmc/_templates/alt-delete-view.html',
			scope : $scope,
			$event : $event,
			className : 'ngdialog-theme-plain'
		});
	};
	$scope.emailConfirmation = function($event) {
		var dialog = ngDialog.open({
			template : 'assets/resources/scripts/legacy_spa_ent/qvmc/_templates/alt-email-confirm.html',
			scope : $scope,
			$event : $event,
			className : 'ngdialog-theme-plain'
		});
	};
	$scope.deleteAlerts = function($event) {
		var dialog = ngDialog.open({
			template : 'assets/resources/scripts/legacy_spa_ent/qvmc/_templates/alt-delete.html',
			scope : $scope,
			$event : $event,
			className : 'ngdialog-theme-plain'
		});
	};
	$scope.dateRangePicker = function($event) {
		var dialog = ngDialog.open({
			template : 'assets/resources/scripts/legacy_spa_ent/qvmc/_templates/alt-date-picker.html',
			scope : $scope,
			$event : $event,
			className : 'ngdialog-theme-plain'
		});
	};
	$scope.viewImage = function($event) {
		var dialog = ngDialog.open({
			template : 'assets/resources/scripts/legacy_spa_ent/qvmc/_templates/alt-view-image.html',
			scope : $scope,
			$event : $event,
			className : 'ngdialog-theme-plain'
		});
	};
	$scope.alertPopup1 = function($event) {
		var dialog = ngDialog.open({
			template : 'assets/resources/scripts/legacy_spa_ent/qvmc/_templates/alt-alert-popup1.html',
			scope : $scope,
			controller : 'Alertpop1ctrl',
			$event : $event,
			className : 'ngdialog-theme-plain'
		});
	};
	$scope.alertPopup2 = function($event) {
		var dialog = ngDialog.open({
			template : 'assets/resources/scripts/legacy_spa_ent/qvmc/_templates/alt-alert-popup2.html',
			scope : $scope,
			controller : 'Alertpop2ctrl',
			$event : $event,
			className : 'ngdialog-theme-plain'
		});
	};
	$scope.emailStep1 = function($event) {
		var dialog = ngDialog.open({
			template : 'assets/resources/scripts/legacy_spa_ent/qvmc/_templates/alt-email-step1.html',
			scope : $scope,
			controller : 'EmailshipD1',
			$event : $event,
			className : 'ngdialog-theme-plain'
		});
	};
	$scope.emailStep2 = function($event) {
		var dialog = ngDialog.open({
			template : 'assets/resources/scripts/legacy_spa_ent/qvmc/_templates/alt-email-step2.html',
			scope : $scope,
			controller : 'Alertpop2ctrl',		
			$event : $event,
			className : 'ngdialog-theme-plain'
		});
	};

});
app.controller('Alertpop1ctrl', function($scope) {
	$scope.allVars = [{
		"fid" : "1",
		"environment" : "0",
		"text_short" : "UPS Frieght Forwarding",
		"text_long" : "No Existing Alerts"
	}, {
		"fid" : "1",
		"environment" : "0",
		"text_short" : "Clearance Exception",
		"text_long" : "No Existing Alerts"
	}, {
		"fid" : "1",
		"environment" : "0",
		"text_short" : "Clearance Exception Resolution",
		"text_long" : "No Existing Alerts"
	}, {
		"fid" : "1",
		"environment" : "0",
		"text_short" : "Exception",
		"text_long" : "Exception"
	}, {
		"fid" : "1",
		"environment" : "0",
		"text_short" : "Shipment Registered",
		"text_long" : "No Existing Alerts"
	}, {
		"fid" : "1",
		"environment" : "0",
		"text_short" : "Shipment Released",
		"text_long" : "No Existing Alerts"
	}];
});
app.controller('Alertpop2ctrl', function($scope) {
	$scope.Items = [{
		Name : "Damages"
	}, {
		Name : "Holds"
	}, {
		Name : "Incorrect/Incomplte Data"
	}, {
		Name : "Pickup/Appointment/Delivery Attempted"
	}, {
		Name : "Prohibited/Restricted"
	}, {
		Name : "Returns"
	}, {
		Name : "Service Disruptions"
	}, {
		Name : "Weather Delay/Emergency"
	}];
	$scope.checkAll = function() {
		if ($scope.selectedAll) {
			$scope.selectedAll = true;
		}
		angular.forEach($scope.Items, function(item) {
			item.Selected = $scope.selectedAll;
		});
	};
	$scope.clearAll = function() {

		angular.forEach($scope.Items, function(item) {
			item.Selected = false;
		});
	};
	$scope.states = [{
		name : 'Albania - English'
	}, {
		name : 'Algerica - French'
	}, {
		name : 'Algeria - English'
	}, {
		name : 'Argentina - English'
	}, {
		name : 'United States - English	'
	}, {
		name : 'United Kingdom - English'
	}, {
		name : 'India - English'
	}, {
		name : 'China - English'
	}];
	$scope.selectedState = $scope.states[4];

});
app.controller('EmailshipD1', ['$scope', '$http', '$log',
function($scope, $http, $log) {
	$scope.gridOptions = {};
	$scope.gridOptions.columnDefs = [{
		name : 'Trackingnumber',
		displayName : 'Tracking Number',
		width : 150
	}, {
		name : 'Referencenumbers',
		displayName : 'Reference Number(s)',
		width : 180
	}, {
		name : 'Status',
		width : 100
	}, {
		name : 'Scheduledelivery',
		displayName : 'Schedule Delivery',
		width : 180
	}, {
		name : 'Shipper',
		width : 100
	}, {
		name : 'Service',
		width : 180
	}, {
		name : 'Manifestdate',
		displayName : 'Manifest Date',
		width : 180
	}];

	$http.get("assets/resources/scripts/legacy_spa_ent/qvmc/_mocks/email-shipment-details.json").success(function(data) {
		$scope.gridOptions.data = data;
	});
}]);
app.controller('EmailshipD2', ['$scope', '$http', '$log',
function($scope, $http, $log) {

}]);

