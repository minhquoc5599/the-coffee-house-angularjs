(function () {
  'use strict';

  angular
    .module('home')
    .component('homeComponent', {
      templateUrl: 'app/home/home.template.html',
      controller: ('HomeController', HomeController)
    });

  HomeController.$inject = ['$scope'];

  function HomeController($scope) {
    $scope.message = 'Welcome Home'
  }
})();