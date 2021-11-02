(function () {
  'use strict';

  angular
    .module('coffeeApp')
    .directive('pagination', pagination);

  function pagination() {
    return {
      restrict: 'EA',
      templateUrl: 'app/shared/pagination/pagination.template.html',
      scope: {
        config: '=',
        length: '='
      }
    }
  }
})();