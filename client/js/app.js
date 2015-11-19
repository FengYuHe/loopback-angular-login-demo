var app = angular.module('myapp',['lbServices','ui.router']);

app.config(['$stateProvider', '$urlRouterProvider',function($stateProvider,
      $urlRouterProvider){
  $stateProvider
      .state('login', {
        url: '/',
        templateUrl: 'views/login.html',
        controller: 'login',
      }).state('signup', {
        url: '/signup',
        templateUrl: 'views/signup.html',
        controller: 'signup'
      }).state('success', {
        url: '/success',
        templateUrl: 'views/success.html',
        controller: 'success'
      }).state('content', {
        url: '/content?deviceId&method',
        templateUrl: 'views/content.html',
        controller: 'content'
      }).state('device', {
        url: '/device',
        templateUrl: 'views/device.html',
        controller: 'device'
      });
  $urlRouterProvider.otherwise('/');
}]);