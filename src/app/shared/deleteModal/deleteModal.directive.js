(function () {
  'use strict';

  angular
    .module('coffeeApp')
    .directive('deleteModal', deleteModal);

  function deleteModal() {
    return {
      restrict: 'EA',
      templateUrl: 'app/shared/deleteModal/deleteModal.template.html',
      scope: {
        type: '@',
        newItem: '=',

        // Action
        showItem: '=',
        deleteItem: '='
      }
    }
  }
})();