//QVMC tabs angular module
var QvmcApp = angular.module('QvmcApp', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'ngTouch', 'ui.grid', 'ui.grid.pinning', 'ui.grid.selection', 'ui.grid.pagination']);

QvmcApp.config(function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider
	// route for Default page
	.when("", "/inbound").when("outbound", "/outbound").when("import", "/import").when("thirdparty", "/thirdparty").when("combined", "/combined").when("shpdetailinb", "/shpdetailinb");

	$stateProvider.state("inbound", {
		url : "/inbound",
		templateUrl : "/assets/resources/scripts/legacy_spa_ent/qvmc/_templates/inbound.html"
	}).state("outbound", {
		url : "/outbound",
		templateUrl : "/assets/resources/scripts/legacy_spa_ent/qvmc/_templates/outbound.html"
	}).state("import", {
		url : "/import",
		templateUrl : "/assets/resources/scripts/legacy_spa_ent/qvmc/_templates/import.html"
	}).state("thirdparty", {
		url : "/thirdparty",
		templateUrl : "/assets/resources/scripts/legacy_spa_ent/qvmc/_templates/thirdparty.html"
	}).state("combined", {
		url : "/combined",
		templateUrl : "/assets/resources/scripts/legacy_spa_ent/qvmc/_templates/combined.html"
	}).state("shpdetailinb", {
		url : "/shpdetailinb",
		templateUrl : "/assets/resources/scripts/legacy_spa_ent/qvmc/_templates/shpdetail_inb.html"
	}).state("shpdetailinb.shipinfo", {
		url : "/shipinfo",
		templateUrl : "/assets/resources/scripts/legacy_spa_ent/qvmc/_templates/shpinformation.html"
	}).state("shpdetailinb.packshipment", {
		url : "/packshipment",
		templateUrl : "/assets/resources/scripts/legacy_spa_ent/qvmc/_templates/packshipment.html"
	});

})
.controller('CheckboxCtrl', ['$scope',
function($scope) {
	$scope.content = '';

	$scope.isChecked = function(id) {
		var match = false;
		for (var i = 0; i < $scope.data.length; i++) {
			if ($scope.data[i].id == id) {
				match = true;
				alert("hi");
			}
		}
		return match;
	};

}]);

(function () {
    var pickupPointHistoryApp = angular.module('pickupPointHistoryApp', ['ui.grid']);
    pickupPointHistoryApp.controller('pickupPointCtrl', ['$scope', function (scope) {
        scope.testData = [
            {
                'pickup_point_id' : '[000000000]',
                'nickname': '[user data]',
                'pickup_status': '[status]',
                'how_serviced': 'Smart',
                'subscribe_to_alerts': false,
                'address': '[0000 Street Name][Suite 0000]',
                'postal_code': '[00000]',
                'city': '[City value]',
                'state': '[State]',
                'discard': ''
            },{
                'pickup_point_id' : '[000000000]',
                'nickname': '[user data]',
                'pickup_status': '[status]',
                'how_serviced': 'Daily',
                'subscribe_to_alerts': true,
                'address': '[0000 Street Name][Suite 0000]',
                'postal_code': '[00000]',
                'city': '[City value]',
                'state': '[State]',
                'discard': ''
            },{
                'pickup_point_id' : '[000000000]',
                'nickname': '[user data]',
                'pickup_status': '[status]',
                'how_serviced': 'On-Demand',
                'subscribe_to_alerts': false,
                'address': '[0000 Street Name][Suite 0000]',
                'postal_code': '[00000]',
                'city': '[City value]',
                'state': '[State]',
                'discard': ''
            },{
                'pickup_point_id' : '[000000000]',
                'nickname': '[user data]',
                'pickup_status': '[status]',
                'how_serviced': 'Smart',
                'subscribe_to_alerts': true,
                'address': '[0000 Street Name][Suite 0000]',
                'postal_code': '[00000]',
                'city': '[City value]',
                'state': '[State]',
                'discard': ''
            },{
                'pickup_point_id' : '[000000000]',
                'nickname': '[user data]',
                'pickup_status': '[status]',
                'how_serviced': 'Smart',
                'subscribe_to_alerts': false,
                'address': '[0000 Street Name][Suite 0000]',
                'postal_code': '[00000]',
                'city': '[City value]',
                'state': '[State]',
                'discard': ''
            },{
                'pickup_point_id' : '[000000000]',
                'nickname': '[user data]',
                'pickup_status': '[status]',
                'how_serviced': 'Daily',
                'subscribe_to_alerts': true,
                'address': '[0000 Street Name][Suite 0000]',
                'postal_code': '[00000]',
                'city': '[City value]',
                'state': '[State]',
                'discard': ''
            },{
                'pickup_point_id' : '[000000000]',
                'nickname': '[user data]',
                'pickup_status': '[status]',
                'how_serviced': 'On-Demand',
                'subscribe_to_alerts': true,
                'address': '[0000 Street Name][Suite 0000]',
                'postal_code': '[00000]',
                'city': '[City value]',
                'state': '[State]',
                'discard': ''
            }
        ];

        scope.testBlankData = [];

        scope.gridSummaryOptions = {
            columnDefs: [
                {
                    field: 'pickup_point_id',
                    displayName: 'Pickup Point ID',
                    width: '12%'
                },{
                    field: 'nickname',
                    displayName: 'Nickname',
                    width: '10%'
                },{
                    field: 'pickup_status',
                    displayName: 'Pickup Status',
                    width: '11%'
                },{
                    field: 'how_serviced',
                    displayName: 'How Serviced?',
                    width: '10%'
                },{
                    field: 'subscribe_to_alerts',
                    displayName: 'Subscribe to Alerts?',
                    width: '14%',
                    cellTemplate: '<div class="ui-grid-cell-contents"><span ng-if="row.entity.subscribe_to_alerts"><button type="button" class="ups-link">Edit</button> | <button type="button" class="ups-link">Stop</button></span><span ng-if="!row.entity.subscribe_to_alerts"><button type="button" class="ups-link">Subscribe</button></span></div>'
                },{
                    field: 'address',
                    displayName: 'Address',
                    width: '15%'
                },{
                    field: 'postal_code',
                    displayName: 'Postal Code',
                    width: '10%'
                },{
                    field: 'city',
                    displayName: 'City',
                    width: '10%'
                },{
                    field: 'state',
                    displayName: 'State',
                    width: '7%'
                },{
                    field: 'discard',
                    displayName: '',
                    width: '10%',
                    cellTemplate: '<div class="ui-grid-cell-contents"><button type="button" class="ups-link">Discard</button></div>'
                }
            ],
            data: scope.testBlankData
        };

        scope.gridSelectOptions = {
            columnDefs: [
                {
                    field: 'id',
                    displayName: '',
                    headerCellTemplate: '<div class="ups-form_group"><div class="ups-checkbox ups-input_wrapper"><input id="gridPSelectAll" class="ups-checkbox-custom" name="gridPSelectAll" type="checkbox"> <label for="gridPSelectAll" class="ups-checkbox-custom-label"><span class="ups-readerTxt">Select All</span></label></div></div>',
                    width: '5%',
                    cellTemplate: '<div class="ups-form_group"><div class="ups-checkbox ups-input_wrapper"><input class="ups-checkbox-custom" ng-attr-id="{{ \'pickupSel\' + row.entity.id }}" ng-attr-name="{{ \'pickupSel\' + row.entity.id }}" type="checkbox"> <label ng-attr-for="{{ \'pickupSel\' + row.entity.id }}" class="ups-checkbox-custom-label"><span class="ups-readerTxt">Select</span></label></div></div>'
                },{
                    field: 'pickup_point_id',
                    displayName: 'Pickup Point ID',
                    width: '12%'
                },{
                    field: 'nickname',
                    displayName: 'Nickname',
                    width: '12%'
                },{
                    field: 'address',
                    displayName: 'Address',
                    width: '22%'
                },{
                    field: 'postal_code',
                    displayName: 'Postal Code',
                    width: '12%'
                },{
                    field: 'city',
                    displayName: 'City',
                    width: '12%'
                },{
                    field: 'state',
                    displayName: 'State',
                    width: '12%'
                },{
                    field: 'how_serviced',
                    displayName: 'How Serviced?',
                    width: '12%'
                }
            ],
            data: [
                {
                    'id': '1',
                    'pickup_point_id': '[00000000000]',
                    'nickname': '[user data]',
                    'address': '[0000 Street Name][Suite 0000]',
                    'postal_code': '[00000]',
                    'city': '[city value]',
                    'state': '[State]',
                    'how_serviced': 'Smart'
                },
                {
                    'id': '2',
                    'pickup_point_id': '[00000000000]',
                    'nickname': '[user data]',
                    'address': '[0000 Street Name][Suite 0000]',
                    'postal_code': '[00000]',
                    'city': '[city value]',
                    'state': '[State]',
                    'how_serviced': 'Daily'
                },
                {
                    'id': '3',
                    'pickup_point_id': '[00000000000]',
                    'nickname': '[user data]',
                    'address': '[0000 Street Name][Suite 0000]',
                    'postal_code': '[00000]',
                    'city': '[city value]',
                    'state': '[State]',
                    'how_serviced': 'On-Demand'
                },
                {
                    'id': '4',
                    'pickup_point_id': '[00000000000]',
                    'nickname': '[user data]',
                    'address': '[0000 Street Name][Suite 0000]',
                    'postal_code': '[00000]',
                    'city': '[city value]',
                    'state': '[State]',
                    'how_serviced': 'Smart'
                },
                {
                    'id': '5',
                    'pickup_point_id': '[00000000000]',
                    'nickname': '[user data]',
                    'address': '[0000 Street Name][Suite 0000]',
                    'postal_code': '[00000]',
                    'city': '[city value]',
                    'state': '[State]',
                    'how_serviced': 'Smart'
                },
                {
                    'id': '6',
                    'pickup_point_id': '[00000000000]',
                    'nickname': '[user data]',
                    'address': '[0000 Street Name][Suite 0000]',
                    'postal_code': '[00000]',
                    'city': '[city value]',
                    'state': '[State]',
                    'how_serviced': 'Daily'
                },
                {
                    'id': '7',
                    'pickup_point_id': '[00000000000]',
                    'nickname': '[user data]',
                    'address': '[0000 Street Name][Suite 0000]',
                    'postal_code': '[00000]',
                    'city': '[city value]',
                    'state': '[State]',
                    'how_serviced': 'On-Demand'
                }
            ]
        };
    }]);
})();
