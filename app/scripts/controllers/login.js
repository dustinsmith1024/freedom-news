'use strict';

angular.module('freedomNewsApp')
  .controller('LoginController', function($rootScope, $scope, simpleLogin) {
    $scope.pass = null;
    $scope.err = null;
    $scope.user = null;

    $scope.login = function(service) {
      simpleLogin.login(service, function(err, data) {
        $scope.err = err? err + '' : null;
        $rootScope.user = data;
      });
    };

    $scope.logout = function(service) {
      console.log('logout!');
      simpleLogin.logout(service, function(err) {
        $scope.err = err? err + '' : null;
      });
    };

  });
