(function () {
  'use strict';

  angular
    .module('coffeeApp')
    .directive('addModal', addModal);

  function addModal() {
    return {
      restrict: 'EA',
      templateUrl: 'app/shared/directives/addModal/addModal.template.html',
      scope: {
        type: '@',
        newItem: '=',
        categories: '=',
        sizes: '=',
        error: '=',

        // Action
        resetForm: '=',
        createItem: '=',
        addAttributeRow: '='
      }
    }
  }
})();