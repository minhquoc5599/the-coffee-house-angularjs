(function () {
  'use strict';

  angular
    .module('coffeeApp')
    .directive('addModal', addModal);

  function addModal() {
    return {
      restrict: 'EA',
      templateUrl: 'app/shared/addModal/addModal.template.html',
      scope: {
        type: '@',
        newItem: '=',
        categories: '=',
        sizes: '=',

        // Action
        resetForm: '=',
        createItem: '=',
        addAttributeRow: '='
      }
    }
  }
})();