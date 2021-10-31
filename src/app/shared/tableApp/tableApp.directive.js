(function () {
  'use strict';

  angular
    .module('coffeeApp')
    .directive('tableApp', tableApp);

  function tableApp() {
    return {
      restrict: 'EA',
      templateUrl: 'app/shared/tableApp/tableApp.template.html',
      scope: {
        tableData: '=',
        type: '@',
        currentPage: '=',
        pageSize: '=',
        search: '=',
        newItem: '=',
        categories: '=',
        sizes: '=',

        // action
        showItem: '=',
        updateItem: '=',
        deleteItem: '=',
        addAttributeRow: '='
      },
      link: linkFunction
    }

    function linkFunction($scope, elem, attrs) {
      $scope.sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
      }
    }
  }
})();