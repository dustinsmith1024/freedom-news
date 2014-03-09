'use strict';
 
app.factory('User', function ($rootScope, $firebase, FBURL, Auth) {
  //var ref = new Firebase(FBURL + 'users');
 
  //var users = $firebase(ref);
  var users = [];
 
  var User = {
    create: function (authUser, username) {
      users[username] = {
        md5_hash: authUser.md5_hash,
        username: username,
        $priority: authUser.uid
      };
     
      users.$save(username).then(function () {
        setCurrentUser(username);
      });
    },

    findByUsername: function (username) {
      if (username) {
        return users.$child(username);
      }
    },

    getCurrent: function () {
      return $rootScope.currentUser;
    },

    signedIn: function () {
      return $rootScope.currentUser !== undefined;
    }

  };

  function setCurrentUser (user) {
    //$rootScope.currentUser = User.findByUsername(username);
    $rootScope.currentUser = user;
  }
  //console.log('herrre');

  $rootScope.$on('$firebaseSimpleLogin:login', function (e, authUser) {
    console.log('scoped firebase login!');
    var query = $firebase(ref.startAt(authUser.uid).endAt(authUser.uid));
   
    query.$on('loaded', function () {
      setCurrentUser(query.$getIndex()[0]);
    });
  });

  $rootScope.$on('$firebaseSimpleLogin:logout', function() {
    delete $rootScope.currentUser;
  });
 
  return User;
});