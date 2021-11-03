
(function () {
  'use strict';

  angular
    .module('account')
    .component('accountComponent', {
      templateUrl: 'app/account/account.template.html',
      controller: ('AccountController', AccountController)
    });

  AccountController.$inject = ['$scope', 'apiService'];

  function AccountController($scope, apiService) {
    const path = 'https://601924d6971d850017a40c07.mockapi.io/api/accounts/';

    // Get accounts
    $scope.accounts = [];
    apiService.get(
      path,
      function (data) {
        $scope.accounts = data;
      }, function (err) {
        alert('Sever error');
      });

    // Reload accounts
    $scope.reloadAccount = function () {
      apiService.get(
        path,
        function (data) {
          $scope.accounts = data;
        }, function (err) {
          alert('Sever error');
        });
    }

    // Update account
    $scope.newAccount = {};
    $scope.showAccount = function (account) {
      if (Object.keys(account).length !== 0) {
        $scope.newAccount = JSON.parse(JSON.stringify(account));
      }
    }
    $scope.updateAccount = function (account) {
      apiService.put(path, account, function () {
        if (Object.keys(account).length !== 0) {
          const index = $scope.accounts.findIndex(item => item.id === account.id);
          if (index > -1 && index < $scope.accounts.length) {
            $scope.accounts[index] = JSON.parse(JSON.stringify(account));
          } else {
            alert('Can not find account');
          }
        }
      }, function () {
        alert('Server error')
      })

    }

    // Delete account
    $scope.deleteAccount = function (id) {
      apiService.del(path, id,
        function () {
          const index = $scope.accounts.findIndex(account => account.id === id);
          if (index > -1 && index < $scope.accounts.length) {
            $scope.accounts.splice(index, 1);
          } else {
            alert('Can not find account');
          }
        }, function () {
          alert('Server error')
        })

    }

    // Field
    $scope.fields = [
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
    $scope.config = {
      currentPage: 1,
      pageSize: 5
    }
  }
})();