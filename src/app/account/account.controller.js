
function AccountController(apiService) {
  const path = 'https://601924d6971d850017a40c07.mockapi.io/api/accounts/';
  const pathd = 'https://601924d6971d850017a40c07.mdockapi.io/api/accounts/';

  var vm = this;

  vm.accounts = [];
  vm.newAccount = {};
  vm.error = '';
  // Field
  vm.fields = [
    {
      name: 'name',
      sorted: true
    },
    {
      name: 'gender',
      sorted: true
    },
    {
      name: 'role',
      sorted: true
    },
    {
      name: 'phone',
      sorted: true
    },
    {
      name: 'email',
      sorted: true
    }
  ]
  //Pagination
  vm.config = {
    type: 'account',
    currentPage: 1,
    pageSize: 5
  }

  // Get accounts
  apiService.get(
    path,
    function (data) {
      vm.accounts = data;
    }, function (err) {
      alert('Sever error');
    });

  // Reload accounts
  vm.reloadAccount = function () {
    apiService.get(
      path,
      function (data) {
        vm.accounts = data;
      }, function (err) {
        alert('Sever error');
      });
  }

  // Update account
  vm.showAccount = function (account) {
    if (Object.keys(account).length !== 0) {
      vm.newAccount = JSON.parse(JSON.stringify(account));
    }
    vm.error = '';
  }
  vm.updateAccount = function (account) {
    apiService.put(pathd, account, function () {
      if (Object.keys(account).length !== 0) {
        const index = vm.accounts.findIndex(item => item.id === account.id);
        if (index > -1 && index < vm.accounts.length) {
          vm.accounts[index] = JSON.parse(JSON.stringify(account));
          const modal = '#updateModal' + account.id;
          vm.error = '';
          $(modal).modal('hide');
        } else {
          vm.error = 'Can not find account!';
        }
      }
    }, function () {
      vm.error = 'Server error!';
    })

  }

  // Delete account
  vm.deleteAccount = function (id) {
    apiService.del(pathd, id,
      function () {
        const index = vm.accounts.findIndex(account => account.id === id);
        if (index > -1 && index < vm.accounts.length) {
          vm.accounts.splice(index, 1);
          const modal = '#deleteModal' + id;
          vm.error = '';
          $(modal).modal('hide');
        } else {
          vm.error = 'Can not find account!';
        }
      }, function () {
        vm.error = 'Server error!';
      })
  }
}