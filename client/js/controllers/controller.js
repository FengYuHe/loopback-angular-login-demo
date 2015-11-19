var app = angular.module('myapp');

var token = "stok-eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7ImlkIjoiNDQ4YzE1NDAtNWFjMC0xMWU1LWJlNGQtMWRiY2I0MmE5ZmU2IiwidXNlcm5hbWUiOiJib2IiLCJlbWFpbCI6ImJAYmFyLmNvbSIsImFjY2Vzc1Rva2VuIjoid2NNRVM0NTRHdmM0YnJKOTM4Vm03OXZwYThwZWJ5algifSwiaWF0IjoxNDQ3OTAwNjIzLCJleHAiOjE0NDc5ODcwMjMsImlzcyI6ImNsb3VkLXNlcnZpY2UtYmFjayJ9.O-Ay5F0kamjARe4xVFvKbYGT__B2kBAkgu3v5DTt0Ms";

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

app.controller('content',['$scope','$location','$http', '$stateParams',function($scope,$location,$http,$stateParams){
  $scope.message = [];
    var pubnub = PUBNUB({
        subscribe_key: 'sub-c-98573afe-399d-11e5-9689-0619f8945a4f',
        publish_key: 'pub-c-dca488be-114d-44d0-b561-0049b670bb29'
    });
    pubnub.subscribe({
        channel: '0246f876c755f96e3334a38a97dd9fe03e4a0ac9',
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

  $scope.deviceId = $stateParams.deviceId;
  $scope.method = $stateParams.method;
  $scope.params = '{"test" : "test"}';

  var getChannelUrl = 'http://localhost:6001/rest/v1/user/getPushChannel?access_token='+token;
  $http.get(getChannelUrl).success(function(result){
    $scope.channelId = result.data.pushSettings.channel;
  })

    $scope.pushMsg = function(){
      var req = {
         method: 'POST',
         url: 'http://localhost:6001/rest/v1/remcall/device/'+$scope.deviceId+'/channel/'+$scope.channelId+'?access_token='+token,
         data: {
            "method": $scope.method,
            "params": JSON.parse($scope.params)
          },
        };
      $http(req).
      success(function(data, status, headers, config) {
        console.log(data);
        alert('success');
      }).
      error(function(data, status, headers, config) {
        console.log(data);
        alert('err');
      });
    }

    $scope.returnDevice = function(){
      $location.path('/device');
    }
}]);

app.controller('device', ['$scope','$http', '$state', function($scope, $http, $state){
  $scope.listDevice = [];
  var url = 'http://localhost:6001/rest/v1/devices?access_token='+token;
  $http.get(url).success(function(res){
    for(var i = 0; i < res.data.length; i++){
      $scope.listDevice[i] = {};
      $scope.listDevice[i].deviceId = res.data[i].id;
      $scope.listDevice[i].channel = [];
      for(var j = 0; j < res.data[i].channels.length; j++){
        $scope.listDevice[i].channel = $scope.listDevice[i].channel.concat(res.data[i].channels[j].supportedMethods);
      }
    }
  });

  $scope.goPushMsg = function(deviceId){
    console.log($scope.selectdChannel[deviceId]);
    $state.go('content', {deviceId: deviceId, method: $scope.selectdChannel[deviceId]});
  }
  $scope.selectdChannel = {};
}])
