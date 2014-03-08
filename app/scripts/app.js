'use strict';

angular.module('freedomNewsApp', [
  'ngRoute',
  'firebase',
  'angularfire.firebase',
  'angularfire.login',
  'simpleLoginTools'
])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        redirectTo: '/articles'
      })
      .when('/login', {
        authRequired: false, // if true, must log in before viewing this page
        templateUrl: 'views/login.html',
        controller: 'LoginController'
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
  