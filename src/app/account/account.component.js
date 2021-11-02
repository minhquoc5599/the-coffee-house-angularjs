(function () {
  'use strict';

  angular
    .module('account')
    .component('accountComponent', {
      templateUrl: 'app/account/account.template.html',
      controller: ('AccountController', AccountController)
    });

  AccountController.$inject = ['$scope', '$http'];

  function AccountController($scope, $http) {

    // Get accounts
    $scope.accounts = [];
    $http.get('app/data/account.json')
      .then(
        function (response) {
          $scope.accounts = response.data;
        },
        function (error) {
          alert('Server error');
        });

    // Reload accounts
    $scope.reloadAccount = function () {
      $http.get('app/data/account.json')
        .then(
          function (response) {
            $scope.accounts = response.data;
          },
          function (error) {
            alert('Server error');
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
      if (Object.keys(account).length !== 0) {
        const index = $scope.accounts.findIndex(item => item.id === account.id);
        if (index > -1 && index < $scope.accounts.length) {
          $scope.accounts[index] = JSON.parse(JSON.stringify(account));
        } else {
          alert('Can not find account');
        }
      }
    }

    // Delete account
    $scope.deleteAccount = function (id) {
      const index = $scope.accounts.findIndex(account => account.id === id);
      if (index > -1 && index < $scope.accounts.length) {
        $scope.accounts.splice(index, 1);
      } else {
        alert('Can not find account');
      }
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