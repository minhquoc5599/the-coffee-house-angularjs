(function () {
  'use strict';

  angular
    .module('product')
    .component('productComponent', {
      templateUrl: 'app/product/product.template.html',
      controller: ('ProductController', ProductController),
      controllerAs: 'vm'
    });

  ProductController.$inject = ['apiService'];

 
})();