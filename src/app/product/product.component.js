(function () {
  'use strict';

  angular
    .module('product')
    .component('productComponent', {
      templateUrl: 'app/product/product.template.html',
      controller: ('ProductController', ProductController)
    });

  ProductController.$inject = ['$scope', '$http'];

  function ProductController($scope, $http) {

    // Get product
    $scope.products = [];
    $http.get('app/data/product.json')
      .then(
        function (response) {
          $scope.products = response.data;
        },
        function (error) {
          alert('Server error');
        });

    // Get category
    $scope.categories = [];
    $http.get('app/data/category.json')
      .then(
        function (response) {
          $scope.categories = response.data;
        },
        function (error) {
          alert('Server error');
        });

    // Get size
    $scope.sizes = [];
    $http.get('app/data/size.json')
      .then(
        function (response) {
          $scope.sizes = response.data;
        },
        function (error) {
          alert('Server error');
        });


    // Reload products
    $scope.reloadProduct = function () {
      $http.get('app/data/product.json')
        .then(
          function (response) {
            $scope.products = response.data;
          },
          function (error) {
            alert('Server error');
          });
    }

    // Fields 
    $scope.fields = [
      {
        name: 'name',
        sorted: true
      },
      {
        name: 'image',
        sorted: false
      },
      {
        name: 'category',
        sorted: true
      },
      {
        name: 'sizes',
        sorted: false
      }
    ]

    //Pagination
    $scope.config = {
      currentPage: 1,
      pageSize: 5
    }

    // Reset Form
    $scope.newProduct = {}
    $scope.resetForm = function () {
      $scope.newProduct = {
        id: $scope.products.length + 1,
        category: $scope.categories.length > 0 ? $scope.categories[0].name : 'Coffee',
        sizes: [
          {
            name: $scope.sizes.length > 0 ? $scope.sizes[0].name : 'S'
          }
        ],
      }
    }

    // Create Product
    $scope.createProduct = function () {
      $scope.products.push($scope.newProduct);
      $scope.resetForm();
    }


    // Update Product
    $scope.showProduct = function (product) {
      if (Object.keys(product).length !== 0) {
        $scope.newProduct = JSON.parse(JSON.stringify(product));
        if (typeof $scope.newProduct.sizes === 'undefined' || $scope.newProduct.sizes.length === 0) {
          $scope.newProduct.sizes = [
            {
              name: $scope.sizes.length > 0 ? $scope.sizes[0].name : 'S'
            }
          ]
        }
      }
    }

    $scope.updateProduct = function (product) {
      if (Object.keys(product).length !== 0) {
        const index = $scope.products.findIndex(item => item.id === product.id);
        if (index > -1 && index < $scope.products.length) {
          $scope.products[index] = JSON.parse(JSON.stringify(product));
        } else {
          alert('Can not find product');
        }
      }
    }

    // Delete Product
    $scope.deleteProduct = function (id) {
      const index = $scope.products.findIndex(product => product.id === id);
      if (index > -1 && index < $scope.products.length) {
        $scope.products.splice(index, 1);
      } else {
        alert('Can not find product');
      }
    }

    // Add Attribute Size Row
    $scope.addAttributeRow = function (product) {
      product.sizes.push({
        name: $scope.sizes.length > 0 ? $scope.sizes[0].name : 'S',
      });
    }
  }
})();