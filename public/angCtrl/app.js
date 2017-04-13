var app = angular.module('gensoft', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "/public/partials/login.html",
      controller: ""
    })
    .state('dash', {
      url: "/dashboard",
      templateUrl: "/public/partials/dashboard.html",
      controller: ""
    })
    .state('signup', {
      url: "/signup",
      templateUrl: "/public/partials/signup.html",
      controller: ""
    })


  $locationProvider.html5Mode(true);
});
