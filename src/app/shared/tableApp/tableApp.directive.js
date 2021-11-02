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
        fields: '=',
        tableData: '=',
        type: '@',
        config: '=',
        title: '@',

        // action
        showItem: '=',
        reloadData: '=',
        resetForm: '='
      },
      link: linkFunction
    }

    function linkFunction($scope, elem, attrs) {
      $scope.sort = function (keyname, sorted) {
        if (sorted) {
          $scope.sortKey = keyname;
          $scope.reverse = !$scope.reverse;
        }
      }
    }
  }
})();