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
        url: '/content',
        templateUrl: 'views/content.html',
        controller: 'content'
      });
  $urlRouterProvider.otherwise('/');
}]);