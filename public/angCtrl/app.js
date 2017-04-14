const app = angular.module('gensoft', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "partials/login.html",
      controller: "HomeCtrl"
    })
    .state('register', {
      url: "/register",
      templateUrl: "partials/signup.html",
      controller: "SignUpCtrl"
    })
    .state('dash', {
      url: "/dashboard",
      templateUrl: "partials/dashboard.html",
      resolve: {
        logincheck: checkLoggedin
      },
      controller: ""
    })
});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
  var deferred = $q.defer();

  $http.get('loggedin').success(function(user) {
    $rootScope.errorMessage = null;
    //User is Authenticated
    if (user !== '0') {
      $rootScope.currentUser = user;
      deferred.resolve();
    } else { //User is not Authenticated
      $rootScope.errorMessage = 'You need to log in.';
      deferred.reject();
      $location.path('/');
    }
  });
  return deferred.promise;
}

app.controller("HomeCtrl", function($location, $scope, $http, $rootScope) {
  $scope.login = function(user) {
    $http.post('/login', user)
      .success(function(response) {
        $rootScope.currentUser = response;
        $location.path("/dashboard");
      });
  }

  $scope.logout = function() {
    $http.post("/logout")
      .success(function() {
        $rootScope.currentUser = null;
        $location.path("/");
      });
  }
});

app.controller("SignUpCtrl", function($scope, $http, $rootScope, $location) {
  $scope.signup = function(user) {
    if (user.password == user.password2) {
      $http.post('/signup', user)
        .success(function(user) {
          $rootScope.currentUser = user;
          $location.path("/dashboard");
        });
    }
  }
});
