(function () {
  'use strict';

  angular
    .module('coffeeApp')
    .directive('updateModal', updateModal);

  function updateModal() {
    return {
      restrict: 'EA',
      templateUrl: 'app/shared/updateModal/updateModal.template.html',
      scope: {
        type: '@',
        item: '=',
        newItem: '=',
        categories: '=',
        sizes: '=',

        // Action
        showItem: '=',
        updateItem: '=',
        addAttributeRow: '='
      }
    }
  }
})();