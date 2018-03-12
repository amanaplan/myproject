//Package in this shipment details controller
QvmcApp.controller('PackInship', ['$scope', '$http', '$log',
function($scope, $http, $log) {
	$scope.gridOptions = {};
	$scope.gridOptions.columnDefs = [{
		name : 'TrackingNumber',
		displayName : 'Tracking Number',
		width : 150
	}, {
		name : 'ReferencesNumbers',
		displayName : 'References Number(s)',
		width : 180
	}, {
		name : 'Status',
		displayName : 'Status',
		width : 100
	}, {
		name : 'Manifestdate',
		displayName : 'Manifest Date',
		width : 110
	}, {
		name : 'ScheduleDelivery',
		displayName : 'Schedule Delivery',
		width : 170
	}, {
		name : 'Service',
		displayName : 'Service',
		width : 100
	}, {
		name : 'Weight',
		displayName : 'Weight',
		width : 100
	}];

	$http.get("assets/resources/scripts/legacy_spa_ent/qvmc/_mocks/packages-in-shipment.json").success(function(data) {
		$scope.gridOptions.data = data;
	});
}]); 