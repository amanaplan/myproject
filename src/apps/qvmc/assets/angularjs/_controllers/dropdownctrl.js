 // Dropdown controller       
 QvmcApp.controller('DropdownCtrl', ['$scope', '$http', function($scope, $http) {
     $scope.data = {
         singleSelect: null,
         multipleSelect: [],
         option1: 'option-1',
     };

     $scope.forceUnknownOption = function() {
         $scope.data.singleSelect = 'nonsense';
     };
 }]);