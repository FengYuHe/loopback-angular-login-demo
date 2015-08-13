var app = angular.module('myapp');

app.controller('login',['$scope','$location','Usertable',function($scope,$location,Usertable){
	$scope.login = function(){
    Usertable.find()
      .$promise
      .then(function(results) {
        $scope.all = results;
        if($scope.all.length==0){
          $scope.loginErr=true;
        }
        for(var i=0;i<$scope.all.length;i++){
          if($scope.all[i].name==$scope.user.name&&$scope.all[i].password==$scope.user.password){
            $location.path('/content');
            break;
          }
          if(i==$scope.all.length-1){
            $scope.loginErr=true;
          }
        }
      });
  }
  $scope.goSignup = function () {
      $location.path('/signup');
  }
}]);

app.controller('signup',['$scope','$location','Usertable',function($scope,$location,Usertable){
  $scope.signup = function () {
    Usertable.create($scope.newUser)
      .$promise
      .then(function(usertable) {
        $scope.newUser = '';
        $location.path('/success');
      });
  }
  $scope.return = function () {
    $location.path('/');
  }
}]);

app.controller('success',['$scope','$location',function($scope,$location){
  $scope.goLogin = function(){
    $location.path('/');
  }
}]);

app.controller('content',['$scope','$location',function($scope,$location){
    $scope.return = function(){
      $location.path('/');
    }
}])
