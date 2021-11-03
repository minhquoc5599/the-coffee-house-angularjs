
(function () {
  'use strict';
  angular.
    module('login').
    component('loginComponent', {
      templateUrl: 'app/login/login.template.html',
      controller: ('LoginController', LoginController)
      // controllerAs: 'vm',
      // bindings: {}
    });

  LoginController.$inject = ['$scope', '$location', 'loginService'];

  function LoginController($scope, $location, loginService) {
    $scope.loginData = {
      username: '',
      password: ''
    };

    $scope.loginSubmit = function () {
      loginService.login($scope.loginData.username, $scope.loginData.password)
        .then(function (response) {
          if (response.isSuccess) {
            localStorage.setItem('user', JSON.stringify(response.user));
            $location.path('/admin/home');
          } else {
            alert(response.message);
          }
        });
    }
    // $scope.login = function () {
    //   // Get account and check login
    //   const username = $scope.username;
    //   const password = $scope.password;

    //   $http.get('app/data/account.json')
    //     .then(function (response) {
    //       const data = response.data;
    //       const user = data.find(item =>
    //         item.username === username &&
    //         item.password === password &&
    //         item.role === 'admin');
    //       if (user) {
    //         localStorage.setItem('user', JSON.stringify({
    //           username: user.username,
    //           role: user.role
    //         }));
    //         $location.path('/admin/home');

    //       } else {
    //         alert('Wrong username and password')
    //       }
    //     }
    //       , function (error) {
    //         alert('server error');
    //       });
    // }
  }
})();