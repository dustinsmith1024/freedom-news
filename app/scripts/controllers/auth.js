'use strict';
 
app.controller('AuthCtrl',
  function ($rootScope, $scope, $location, Auth) {
    if (Auth.signedIn()) {
      console.log('already logged in');
      $location.path('/');
    }
 
    /*$scope.$on('$firebaseSimpleLogin:login', function (provider, user) {
      console.log('firebase loging from authctrl', user);
      $rootScope.currentUser = user;
      $location.path('/');
    });*/
 
    $scope.login = function () {
      Auth.login($scope.user).then(function () {
        //User.create(authUser, $scope.user.username);
        $location.path('/');
      }, function (error) {
        $scope.error = error.toString();
      });
    };
 
    $scope.register = function () {
      Auth.register($scope.user).then(function (authUser) {
        User.create(authUser, $scope.user.username);
        $location.path('/');
      }, function (error) {
        $scope.error = error.toString();
      });
    };

  });