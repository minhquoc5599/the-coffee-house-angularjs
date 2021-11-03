(function () {
  'use strict';

  angular
    .module('coffeeApp')
    .service('loginService', loginService);

  loginService.$inject = ['$http', '$q'];

  function loginService($http, $q) {
    var deferred;
    this.login = function (username, password) {
      deferred = $q.defer();
      $http.get('https://601924d6971d850017a40c07.mockapi.io/api/accounts/')
        .then(function (response) {
          const user = response.data.find(item =>
            item.username === username &&
            item.password === password &&
            item.role === 'admin');
          if (user) {
            const response = {
              isSuccess: true,
              user: {
                username: user.username,
                role: user.role
              }
            }
            deferred.resolve(response);
          } else {
            const result = {
              isSuccess: false,
              message: 'Wrong username and password'
            }
            deferred.resolve(result);
          }
        }, function (err) {
          const result = {
            isSuccess: false,
            message: err.status
          }
          deferred.resolve(result);
        });

      return deferred.promise;
    }
  }
})();