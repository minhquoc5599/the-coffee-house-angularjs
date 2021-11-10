(function () {
  'use strict';

  angular
    .module('coffeeApp')
    .directive('deleteModal', deleteModal);

  function deleteModal() {
    return {
      restrict: 'EA',
      templateUrl: 'app/shared/directives/deleteModal/deleteModal.template.html',
      scope: {
        type: '@',
        newItem: '=',
        error: '=',

        // Action
        showItem: '=',
        deleteItem: '='
      }
    }
  }
})();