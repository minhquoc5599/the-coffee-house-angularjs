
function ProductController(apiService) {
  const pathProduct = 'https://601924d6971d850017a40c07.mockapi.io/api/products/'
  const pathCategory = 'https://601924d6971d850017a40c07.mockapi.io/api/categories/'
  const pathSize = 'https://601924d6971d850017a40c07.mockapi.io/api/sizes/'

  var vm = this;

  vm.products = [];
  vm.categories = [];
  vm.sizes = [];
  vm.newProduct = {}
  vm.error = '';
  // Fields 
  vm.fields = [
    {
      name: 'name',
      sorted: true
    },
    {
      name: 'image',
      sorted: false,
      templateUrl: 'app/product/image.template.html'
    },
    {
      name: 'category',
      sorted: true
    },
    {
      name: 'sizes',
      sorted: false,
      templateUrl: 'app/product/size.template.html'
    }
  ]

  //Pagination
  vm.config = {
    type: 'product',
    currentPage: 1,
    pageSize: 5
  }

  // Get product
  apiService.get(
    pathProduct,
    function (data) {
      vm.products = data;
    }, function () {
      alert('Sever error');
    });

  // Get category
  apiService.get(
    pathCategory,
    function (data) {
      vm.categories = data;
    }, function () {
      alert('Server error');
    }
  )

  // Get size
  apiService.get(
    pathSize,
    function (data) {
      vm.sizes = data;
    },
    function () {
      alert('Server error');
    }
  )


  // Reload products
  vm.reloadProduct = function () {
    apiService.get(
      pathProduct,
      function (data) {
        vm.products = data;
      }, function () {
        alert('Sever error');
      });
  }



  // Reset Form
  vm.resetForm = function () {
    vm.newProduct = {
      id: vm.products.length + 1,
      category: vm.categories.length > 0 ? vm.categories[0].name : 'Coffee',
      sizes: [
        {
          name: vm.sizes.length > 0 ? vm.sizes[0].name : 'S'
        }
      ],
    }
    vm.error = '';
  }

  // Create Product
  vm.createProduct = function () {
    apiService.post(pathProduct, vm.newProduct, function () {
      vm.products.push(vm.newProduct);
      vm.resetForm();
    }, function () {
      vm.error = 'Server error';
    })
  }


  // Update Product
  vm.showProduct = function (product) {
    if (Object.keys(product).length !== 0) {
      vm.newProduct = JSON.parse(JSON.stringify(product));
      if (typeof vm.newProduct.sizes === 'undefined' || vm.newProduct.sizes.length === 0) {
        vm.newProduct.sizes = [
          {
            name: vm.sizes.length > 0 ? vm.sizes[0].name : 'S'
          }
        ]
      }
    }
    vm.error = '';
  }

  vm.updateProduct = function (product) {
    apiService.put(pathProduct, product, function () {
      if (Object.keys(product).length !== 0) {
        const index = vm.products.findIndex(item => item.id === product.id);
        if (index > -1 && index < vm.products.length) {
          vm.products[index] = JSON.parse(JSON.stringify(product));
          const modal = '#updateModal' + product.id;
          vm.error = '';
          $(modal).modal('hide');
        } else {
          vm.error = 'Can not find product';
        }
      }
    }, function () {
      vm.error = 'Server error';
    })

  }

  // Delete Product
  vm.deleteProduct = function (id) {
    apiService.del(pathProduct, id, function () {
      const index = vm.products.findIndex(product => product.id === id);
      if (index > -1 && index < vm.products.length) {
        vm.products.splice(index, 1);
        const modal = '#deleteModal' + id;
        vm.error = '';
        $(modal).modal('hide');
      } else {
        vm.error = 'Can not find product';
      }
    }, function () {
      vm.error = 'Server error!';
    })
  }

  // Add Attribute Size Row
  vm.addAttributeRow = function (product) {
    product.sizes.push({
      name: vm.sizes.length > 0 ? vm.sizes[0].name : 'S',
    });
  }
}