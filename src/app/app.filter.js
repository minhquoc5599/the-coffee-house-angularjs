(function () {
  'use strict';

  angular
    .module('coffeeApp')
    .filter('filterApp', filterApp);

  function filterApp() {
    return function (input, start) {
      start = parseInt(start);
      return input.slice(start)
    }
  }
})();