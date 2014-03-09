'use strict';

var app = angular.module('freedomNewsApp', [
  'ngRoute',
  'firebase',
  'angularfire.firebase',
  'angularfire.login',
  'simpleLoginTools'
]);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/articles'
      })
      //.when('/login', {
      //  authRequired: false, // if true, must log in before viewing this page
      //  templateUrl: 'views/login.html',
      //  controller: 'LoginController'
      //})
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'AuthCtrl'
      })
      .when('/me', {
        authRequired: true, // if true, must log in before viewing this page
        templateUrl: 'views/articles.html',
        controller: 'ArticlesCtrl'
      })
      .when('/articles', {
        templateUrl: 'views/articles.html',
        controller: 'ArticlesCtrl'
      })
      .when('/articles/:article_id', {
        templateUrl: 'views/article.html',
        controller: 'ArticleCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });

/* Where is the right place for this?
  It is needed to log a user in after refresh
  and I don't want to put it in EVERY controller
*/
app.controller('appCtrl', function($scope) {
  $scope.$on('$firebaseSimpleLogin:login', function (provider, user) {
    console.log('firebase loging from authctrl', user);
    if(user) {
      $scope.currentUser = user;
    }
  });
});