(function () {
  'use strict';

  angular
    .module('coffeeApp')
    .directive('updateModal', updateModal);

  function updateModal() {
    return {
      restrict: 'EA',
      templateUrl: 'app/shared/directives/updateModal/updateModal.template.html',
      scope: {
        type: '@',
        newItem: '=',
        categories: '=',
        sizes: '=',

        // Action
        updateItem: '=',
        addAttributeRow: '='
      }
    }
  }
})();