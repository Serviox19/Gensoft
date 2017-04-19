const app = angular.module('gensoft', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise("/");

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/partials/login.html",
      controller: ""
    })

  $locationProvider.html5Mode(true);
});
