const app = angular.module('gensoft', ['ui.router']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/partials/login.html",
      controller: ""
    })
    .state('dash', {
      url: "/dashboard",
      templateUrl: "views/partials/dashboard.html",
      controller: ""
    })
    .state('inbound', {
      url: "/dashboard/inbound",
      templateUrl: "views/partials/inbound.html",
      controller: ""
    })
    .state('outbound', {
      url: "/dashboard/outbound",
      templateUrl: "views/partials/outbound.html",
      controller: ""
    })
});
