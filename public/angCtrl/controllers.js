

app.controller("HomeCtrl", function($location, $scope, $http, $rootScope) {
  $scope.login = function(user) {
    $http.post('/login', user)
      .success(function(response) {
        $rootScope.currentUser = response;
        $location.url("/dashboard");
      });
  }

  $scope.logout = function() {
    $http.post("/logout")
      .success(function() {
        $rootScope.currentUser = null;
        $location.url("/");
      });
  }
});

app.controller("SignUpCtrl", function($scope, $http, $rootScope, $location) {
  $scope.signup = function(user) {

    if (user.password == user.password2) {
      $http.post('/signup', user)
        .success(function(user) {
          $rootScope.currentUser = user;
          $location.url("/dashboard");
        });
    }
  }
});
