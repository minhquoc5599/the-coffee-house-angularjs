(function () {
  'use strict';

  angular
    .module('account')
    .component('accountComponent', {
      templateUrl: 'app/account/account.template.html',
      controller: ('AccountController', AccountController)
    })
    .filter('AccountsFilter', AccountsFilter);

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
    $scope.sort = function (keyname) {
      $scope.sortKey = keyname;
      $scope.reverse = !$scope.reverse;
    }

    // Update account
    $scope.cloneAccount = {};
    $scope.showAccount = function (account) {
      if (Object.keys(account).length !== 0) {
        $scope.cloneAccount = JSON.parse(JSON.stringify(account));
      }
    }
    $scope.updateAccount = function () {
      if (Object.keys($scope.cloneAccount).length !== 0) {
        const index = $scope.accounts.findIndex(account => account.id === $scope.cloneAccount.id);
        $scope.accounts[index] = JSON.parse(JSON.stringify($scope.cloneAccount));
        $scope.cloneAccount = {};
      }
    }

    // Delete account
    $scope.deleteAccount = function (id) {
      const index = $scope.accounts.findIndex(account => account.id === id);
      $scope.accounts.splice(index, 1);
    }

    //Pagination
    $scope.currentPage = 1;
    $scope.pageSize = 5;
    $scope.numberOfPages = function () {
      return Math.ceil($scope.accounts.length / $scope.pageSize);
    }
  }

  // Filter Pagination
  function AccountsFilter() {
    return function (input, start) {
      start = parseInt(start);
      return input.slice(start)
    }
  }
})();