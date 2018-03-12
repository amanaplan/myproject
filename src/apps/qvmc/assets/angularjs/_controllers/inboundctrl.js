//Inbound Summaary shipment controller
QvmcApp.controller('InboundCtrl', ['$scope', '$interval', 'uiGridConstants', '$http', '$log', function($scope, $interval, uiGridConstants, $http, $log) {
    $scope.gridOptions = {
        showColumnFooter: true,
        enableRowSelection: true,
        enableRowHeaderSelection: false,
        paginationPageSizes: [25, 50, 75],
        paginationPageSize: 25
    };
    $scope.gridOptions.multiSelect = false;
    $scope.gridOptions.modifierKeysToMultiSelect = false;
    $scope.gridOptions.noUnselect = false;
    $scope.gridOptions.onRegisterApi = function(gridApi) {
        $scope.gridApi = gridApi;
        scope.gridApi.core.handleWindowResize();
    };

    $scope.gridOptions.columnDefs = [{
        field: 'LocationId',
        cellTemplate: '<div class=grid-anchor>' + '<a href="#">{{ row.entity.LocationId }}</a>' + '</div>',
        displayName: 'Location ID',
        footerCellTemplate: '<div class="ui-grid-cell-contents">Total Shipments</div>' + '<div class="grid-foo-title"> Total Weight</div>',
        width: '13%',
        pinnedLeft: true
    }, {
        field: '01/22/2016',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        cellTemplate: '<div class="ui-grid-cell-contents">0</div>',
        width: '13%'
    }, {
        field: '01/21/2016',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '13%'
    }, {
        field: '01/20/2016',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '13%'
    }, {
        field: '01/19/2016',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '13%'
    }, {
        field: '01/18/2016',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '13%'
    }, {
        field: '01/17/2016',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '13%'
    }, {
        field: '01/16/2016',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '13%'
    }, {
        field: '01/15/2016',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '13%'
    }, {
        field: 'Total',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '13%'
    }];

    $http.get("assets/resources/scripts/legacy_spa_ent/qvmc/_mocks/inbound.json")
        .success(function(data) {
            $scope.gridOptions.data = data;

            $interval(function() {
                $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
            }, 0, 1);
        });
}]);
//Inbound shipment details controller
QvmcApp.controller('InshipDetCtrl', ['$scope', '$http', '$log', function($scope, $http, $log) {
    $scope.gridOptions = {};
    $scope.gridOptions.columnDefs = [{
        name: 'TrackingNumber',
        cellTemplate: '<div class=grid-anchor>' + '<a href="#shpdetailinb">{{ row.entity.TrackingNumber }}</a>' + '</div>',
        width: 150
    }, {
        name: 'PackageReferenceNo.1',
        displayName: 'Package Reference No.1',
        width: 180
    }, {
        name: 'Weight',
        width: 100
    }, {
        name: 'Status',
        width: 100
    }, {
        name: 'ManifestDate',
        width: 180
    }, {
        name: 'pickup_point_id',
        displayName: 'Pickup Point ID',
        width: 180
    }, {
        name: 'Nickname',
        width: 180
    }, {
        name: 'Schedule Delivery',
        width: 180
    }, {
        name: 'Service',
        width: 180
    }];

    $http.get("assets/resources/scripts/legacy_spa_ent/qvmc/_mocks/in-ship-details.json")
        .success(function(data) {
            $scope.gridOptions.data = data;
        });
}]);
