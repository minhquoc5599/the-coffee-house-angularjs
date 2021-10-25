
(function () {
  'use strict';

  angular
    .module('coffeeApp')
    .controller('coffeeAppController', coffeeAppController);

  coffeeAppController.$inject = ['$scope'];

  function coffeeAppController($scope) {
    $scope.isLoggedIn = function () {
      return localStorage.getItem('user') ? true : false;
    }
  }
})();