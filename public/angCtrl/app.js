var app = angular.module("gensoft", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/public/partials/login.html',
      controller: 'HomeCtrl'
    })
    .when('/register', {
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
    } else {
      //User is not Authenticated
      $rootScope.errorMessage = 'You need to log in.';
      deferred.reject();
      $location.url('/');
    }
  });
  return deferred.promise;
}
