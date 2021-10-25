(function () {
  'use strict';

  angular.module('navbar')
    .component('navbarComponent', {
      templateUrl: 'app/navbar/navbar.template.html',
      controller: ('NavbarController', NavbarController)
    });

  NavbarController.$inject = ['$scope', '$location'];

  function NavbarController($scope, $location) {
    $scope.logout = function () {
      localStorage.removeItem('user');
      $location.path('/admin');
    }
  }
})();