(function () {
  'use strict';

  angular.module('account')
    .component('accountComponent', {
      templateUrl: 'app/account/account.template.html',
      controller: ('AccountController', AccountController)
    });

  AccountController.$inject = [];

  function AccountController() {

  }
})();