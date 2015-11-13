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

app.controller('content',['$scope','$location','$http',function($scope,$location,$http){
  $scope.message = [];
    var pubnub = PUBNUB({
        subscribe_key: 'sub-c-98573afe-399d-11e5-9689-0619f8945a4f',
        publish_key: 'pub-c-dca488be-114d-44d0-b561-0049b670bb29'
    });
    pubnub.subscribe({
        channel: '622136652f29fe1d3727f4a686eb4b8373f06562',
        message: function(m){
          console.log(m);
          $scope.$apply(function(){
            $scope.message.push(m);
          })
        },
        error: function (error) {
          console.log(JSON.stringify(error));
        }
     });

    $scope.deviceMsg = function(){
      var req = {
         method: 'POST',
         url: 'http://localhost:3000/api/deviceTests/test',
         data: { "device": $scope.device },
        };

      $http(req).
      success(function(data, status, headers, config) {
        //alert(data);
      }).
      error(function(data, status, headers, config) {
        //alert('======');
      });
    }

    $scope.return = function(){
      $location.path('/');
    }
}])
