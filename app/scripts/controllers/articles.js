'use strict';

angular.module('freedomNewsApp')
  .controller('ArticlesCtrl', function ($rootScope, $scope, $firebase) {
    var ref = new Firebase("https://torid-fire-615.firebaseio.com/articles");
    $scope.articles = $firebase(ref);

    console.log($rootScope.auth, $rootScope.user);
    $scope.addArticle = function(e) {
      if (e.keyCode != 13) return;
      $scope.articles
        .$add({name: $scope.name, url: $scope.url, kudos: 0});
      $scope.url = "";
      $scope.name = "";
    };

    $scope.upVote = function(id){
      console.log(id);
      var ref = new Firebase("https://torid-fire-615.firebaseio.com/articles/" + id + '/kudos');
      ref.transaction(function(kudos) {
        return kudos + 1;
      });
    };

})
  .controller('ArticleCtrl', function ($scope, $firebase, $routeParams) {
    console.log($routeParams);
    var ref = new Firebase("https://torid-fire-615.firebaseio.com/articles");
    //var ref = new Firebase("https://th9gcxvk9q5.firebaseio-demo.com/articles/" + $routeParams.article_id);
    $scope.articles = $firebase(ref);
    
    $scope.articles.$on("loaded", function() {
      $scope.article = $scope.articles[$routeParams.article_id];
      console.log($scope.article);
    });

    $scope.articles.$on("change", function() {
      $scope.article = $scope.articles[$routeParams.article_id];
      console.log($scope.article);
    });

    $scope.addArticle = function(e) {
      if (e.keyCode != 13) return;
      $scope.articles
        .$add({name: $scope.name, url: $scope.url, kudos: 0});
      $scope.url = "";
      $scope.name = "";
    };

    $scope.upVote = function(id){
      console.log(id);
      var ref = new Firebase("https://torid-fire-615.firebaseio.com/articles/" + id + '/kudos');
      ref.transaction(function(kudos) {
        return kudos + 1;
      });
    };

})
  .controller('CommentsCtrl', function ($scope, $firebase) {

    console.log('Comments: ', $scope.$parent.article.$id);
    var ref = new Firebase("https://torid-fire-615.firebaseio.com/articles/" + $scope.$parent.article.$id + '/comments');
    $scope.comments = $firebase(ref);
    
    $scope.addComment = function(e){
      if (e.keyCode != 13) return;
      $scope.comments.$add({body: $scope.body, kudos: 0});

    };
    
    $scope.upVote = function(id){
      var ref = new Firebase("https://torid-fire-615.firebaseio.com/articles/" + $scope.$parent.article.$id + '/comments/' + id + '/kudos');
      ref.transaction(function(kudos) {
        return kudos + 1;
      });
    };
  });
