(function () {
  'use strict';

  angular
    .module('product')
    .component('productComponent', {
      templateUrl: 'app/product/product.template.html',
      controller: ('ProductController', ProductController)
    });

  ProductController.$inject = ['$scope', 'apiService'];

  function ProductController($scope, apiService) {
    const pathProduct = 'https://601924d6971d850017a40c07.mockapi.io/api/products/'
    const pathCategory = 'https://601924d6971d850017a40c07.mockapi.io/api/categories/'
    const pathSize = 'https://601924d6971d850017a40c07.mockapi.io/api/sizes/'

    // Get product
    $scope.products = [];
    apiService.get(
      pathProduct,
      function (data) {
        $scope.products = data;
      }, function () {
        alert('Sever error');
      });

    // Get category
    $scope.categories = [];
    apiService.get(
      pathCategory,
      function (data) {
        $scope.categories = data;
      }, function () {
        alert('Server error');
      }
    )

    // Get size
    $scope.sizes = [];
    apiService.get(
      pathSize,
      function (data) {
        $scope.sizes = data;
      },
      function () {
        alert('Server error');
      }
    )


    // Reload products
    $scope.reloadProduct = function () {
      apiService.get(
        pathProduct,
        function (data) {
          $scope.products = data;
        }, function () {
          alert('Sever error');
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
      apiService.post(pathProduct, $scope.newProduct, function () {
        $scope.products.push($scope.newProduct);
        $scope.resetForm();
      }, function () {
        alert('Server error');
      })

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
      apiService.put(pathProduct, product, function () {
        if (Object.keys(product).length !== 0) {
          const index = $scope.products.findIndex(item => item.id === product.id);
          if (index > -1 && index < $scope.products.length) {
            $scope.products[index] = JSON.parse(JSON.stringify(product));
          } else {
            alert('Can not find product');
          }
        }
      }, function () {
        alert('Server error');
      })

    }

    // Delete Product
    $scope.deleteProduct = function (id) {
      apiService.del(pathProduct, id, function () {
        const index = $scope.products.findIndex(product => product.id === id);
        if (index > -1 && index < $scope.products.length) {
          $scope.products.splice(index, 1);
        } else {
          alert('Can not find product');
        }
      }, function () {
        alert('Server error');
      })

    }

    // Add Attribute Size Row
    $scope.addAttributeRow = function (product) {
      product.sizes.push({
        name: $scope.sizes.length > 0 ? $scope.sizes[0].name : 'S',
      });
    }
  }
})();