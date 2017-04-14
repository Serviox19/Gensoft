var app = angular.module("gensoft", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/public/partials/login.html',
      controller: 'HomeCtrl'
    })
    .when('/signup', {
      templateUrl: '/public/partials/signup.html',
      controller: 'SignUpCtrl'
    })
    .when('/dashboard', {
      templateUrl: '/public/partials/dashboard.html',
      resolve: {
        logincheck: checkLoggedin
      }
    })
    .otherwise({
      redirectTo: '/'
    })
});

var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
  var deferred = $q.defer();

  $http.get('/loggedin').success(function(user) {
    $rootScope.errorMessage = null;
    //User is Authenticated
    if (user !== '0') {
      $rootScope.currentUser = user;
      deferred.resolve();
    } else { //User is not Authenticated
      $rootScope.errorMessage = 'You need to log in.';
      deferred.reject();
      $location.url('/login');
    }
  });
  return deferred.promise;
}

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
