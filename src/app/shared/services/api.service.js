
(function () {
  'use strict';

  angular
    .module('coffeeApp')
    .factory('apiService', apiService);

  apiService.$inject = ['$http'];

  function apiService($http) {
    const get = function (url, success, failure) {
      $http.get(url)
        .then(function (result) {
          success(result.data);
        }, function (error) {
          failure(error);
        });
    }

    const post = function (url, data, success, failure) {
      $http.post(url, data)
        .then(function (result) {
          success(result);
        }, function (error) {
          failure(error);
        })
    }

    const put = function (url, data, success, failure) {
      $http.put(url + data.id, data)
        .then(function (result) {
          success(result);
        },
          function (error) {
            failure(error);
          });
    }

    const del = function (url, id, success, failure) {
      $http.delete(url + id)
        .then(function (result) {
          success(result);
        },
          function (error) {
            failure(error);
          });
    }

    return {
      get: get,
      post: post,
      put: put,
      del: del
    }
  }
})();