//Import Summary shipment controller       
QvmcApp.controller('ImportCtrl', ['$scope', '$interval', 'uiGridConstants', '$http', '$log', function($scope, $interval, uiGridConstants, $http, $log) {
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
        field: 'UPS Import Account Number',
        displayName: 'UPS Import Account Number',
        footerCellTemplate: '<div class="ui-grid-cell-contents">Totals </div>',
        width: '25%',
        pinnedLeft: true
    }, {
        field: 'NumberofShipments ',
        cellTemplate: '<div class=grid-an-jst>' + '<a href="#">{{ row.entity.NumberofShipments }}</a>' + '</div>',
        displayName: 'Number of Shipments',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '20%'
    }, {
        field: 'TransportationCharges',
        cellTemplate: '<div class=grid-an-jst>{{ row.entity.TransportationCharges }}</div>',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '20%'
    }, {
        field: 'TotalDuties',
        cellTemplate: '<div class=grid-an-jst>{{ row.entity.TotalDuties }}</div>',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '15%'
    }, {
        field: 'TotalTaxes',
        cellTemplate: '<div class=grid-an-jst>{{ row.entity.TotalTaxes }}</div>',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '15%'
    }, {
        field: 'TotalFees',
        cellTemplate: '<div class=grid-an-jst>{{ row.entity.TotalFees }}</div>',
        aggregationType: uiGridConstants.aggregationTypes.sum,
        aggregationHideLabel: true,
        width: '20%'
    }];

    $http.get("assets/resources/scripts/legacy_spa_ent/qvmc/_mocks/imports.json")
        .success(function(data) {
            $scope.gridOptions.data = data;

            $interval(function() {
                $scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);
            }, 0, 1);
        });
}]);
//Import shipment details controller       
QvmcApp.controller('ImportshipDetCtrl', ['$scope', '$http', '$log', function($scope, $http, $log) {
    $scope.gridOptions = {};
    $scope.gridOptions.columnDefs = [{
        name: 'UPS Import Account Number',
        displayName: 'UPS Import Account Number',
        width: '25%'
    }, {
        name: 'Entry Filed Date',
        width: '17%'
    }, {
        name: 'LeadTrackingNumber',
        cellTemplate: '<div class=grid-anchor>' + '<a href="#">{{ row.entity.LeadTrackingNumber }}</a>' + '</div>',
        width: '18%'
    }, {
        name: 'Entry Number',
        width: '13%'
    }, {
        name: 'Images',
        cellTemplate: '<div class=grid-anchor>' + '<a href="#">{{ row.entity.Images }}</a>' + '</div>',
        width: '13%'
    }, {
        name: 'Shipper Name',
        width: '25%'
    }, {
        name: 'Transportation Charges',
        width: '22%'
    }, {
        name: 'Amount',
        width: '13%'
    }, {
        name: 'Total Duties Amount',
        width: '20%'
    }, {
        name: 'Tax Amount',
        width: '13%'
    }, {
        name: 'Total Fee Amount',
        width: '20%'
    }];

    $http.get("assets/resources/scripts/legacy_spa_ent/qvmc/_mocks/import-ship-details.json")
        .success(function(data) {
            $scope.gridOptions.data = data;
        });
}]);