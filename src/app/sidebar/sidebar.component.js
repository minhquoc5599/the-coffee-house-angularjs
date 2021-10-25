(function () {
  'use strict';

  angular
    .module('sidebar')
    .component('sidebarComponent', {
      templateUrl: 'app/sidebar/sidebar.template.html',
      controller: ('sidebarController', sidebarController)
    });

  sidebarController.$inject = ['$scope', '$location'];

  function sidebarController($scope, $location) {
    $scope.activeItem = function (path) {
      return ($location.path() === path) ? 'sidebar__item--active' : ''
    }
  }
})();