//ThirdParty Summary shipment controller       
QvmcApp.controller('ThirdPartyCtrl', ['$scope', '$interval', 'uiGridConstants', '$http', '$log', function($scope, $interval, uiGridConstants, $http, $log) {
    $scope.gridOptions = {
        showColumnFooter: true,
        enableRowSelection: true,
        enableRowHeaderSelection: false
    };
    $scope.gridOptions.multiSelect = false;
    $scope.gridOptions.modifierKeysToMultiSelect = false;
    $scope.gridOptions.noUnselect = false;
    $scope.gridOptions.onRegisterApi = function(gridApi) {
        $scope.gridApi = gridApi;
        scope.gridApi.core.handleWindowResize();
    };

    $scope.gridOptions.columnDefs = [{
        field: 'UPSAccount',
        cellTemplate: '<div class=grid-anchor>' + '<a href="#">{{ row.entity.UPSAccount }}</a>' + '</div>',
        displayName: 'UPS Account',
        footerCellTemplate: '<div class="ui-grid-cell-contents">Total: </div>',
        width: '13%',
        pinnedLeft: true
    }, {
        field: 'Manifest',
        cellTemplate: '<div class=grid-anchor>' + '<a href="#">{{ row.entity.Manifest }}</a>' + '</div>',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '13%'
    }, {
        field: 'InTransit',
        cellTemplate: '<div class=grid-anchor>' + '<a href="#">{{ row.entity.InTransit }}</a>' + '</div>',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '13%'
    }, {
        field: 'Out for Delivery',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '15%'
    }, {
        field: 'Ready for Pickup',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '15%'
    }, {
        field: 'Exception',
        cellTemplate: '<div class=grid-anchor>' + '<a href="#">{{ row.entity.Exception }}</a>' + '</div>',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '13%'
    }, {
        field: 'Delivered',
        cellTemplate: '<div class=grid-anchor>' + '<a href="#">{{ row.entity.Delivered }}</a>' + '</div>',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '13%'
    }, {
        field: 'Void',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '13%'
    }, {
        field: 'Total',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '13%'
    }];

    $http.get("assets/resources/scripts/legacy_spa_ent/qvmc/_mocks/third-party.json")
        .success(function(data) {
            $scope.gridOptions.data = data;

            $interval(function() {
                $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
            }, 0, 1);
        });
}]);
//Third Party shipment details controller       
QvmcApp.controller('thirdpshipDetCtrl', ['$scope', '$http', '$log', function($scope, $http, $log) {
    $scope.gridOptions = {};
    $scope.gridOptions.columnDefs = [{
        name: 'TrackingNumber',
        cellTemplate: '<div class=grid-anchor>' + '<a href="#">{{ row.entity.TrackingNumber }}</a>' + '</div>',
        width: '15%'
    }, {
        name: 'ReferenceNumbers',
        displayName: 'ReferenceNumber(s)',
        width: '17%'
    }, {
        name: 'Status',
        width: '13%'
    }, {
        name: 'ManifestDate',
        width: '13%'
    }, {
        name: 'Shipper',
        width: '25%'
    }, {
        name: 'Ship To',
        width: '35%'
    }, {
        name: 'Service',
        width: '13%'
    }, {
        name: 'Schedule Delivery',
        width: '15%'
    }, {
        name: 'Images',
        cellTemplate: '<div class=grid-anchor>' + '<a href="#">{{ row.entity.Images }}</a>' + '</div>',
        width: '13%'
    }];

    $http.get("assets/resources/scripts/legacy_spa_ent/qvmc/_mocks/third-par-ship-details.json")
        .success(function(data) {
            $scope.gridOptions.data = data;
        });
}]);