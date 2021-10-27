
(function () {
  'use strict';

  angular
    .module('coffeeApp')
    .config(configFunction);

  configFunction.$inject = ['$routeProvider', '$locationProvider'];

  function configFunction($routeProvider,$locationProvider) {

    $locationProvider.html5Mode(true);

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
      .when('/admin/product-mgmt', {
        resolve: {
          check: function ($location) {
            if (!localStorage.getItem('user')) {
              $location.path('/admin')
            }
          }
        },
        template: '<product-component></product-component>'
      })
      .otherwise({
        redirectTo: '/admin'
      });
  }
})();