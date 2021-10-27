const angular = require('angular');
require('angular-route');

(function () {
  'use strict';

  angular.module('IndexApp', [
    'ngRoute',
    'coffeeApp'
  ]);
})();
