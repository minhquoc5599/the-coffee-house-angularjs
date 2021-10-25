
(function () {
  'use strict';

  angular
    .module('coffeeApp')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider'];

  function configFunction($routeProvider) {

    $routeProvider
      .when('/admin', {
        resolve: {
          check: function ($location) {
            if (localStorage.getItem('user')) {
              $location.path('/admin/home')
            }
          }
        },
        template: '<login-component></login-component>'
      })
      .when('/admin/home', {
        resolve: {
          check: function ($location) {
            if (!localStorage.getItem('user')) {
              $location.path('/admin')
            }
          }
        },
        template: '<home-component></home-component>'
      })
      .when('/admin/account-mgmt', {
        resolve: {
          check: function ($location) {
            if (!localStorage.getItem('user')) {
              $location.path('/admin')
            }
          }
        },
        template: '<account-component></account-component>'
      })
      .otherwise({
        redirectTo: '/admin'
      });
  }
})();