angular.module( 'ngBoilerplate.login', [
  'ui.state',
  'placeholders',
  'ui.bootstrap',
  'titleService'
])

.config(function config( $stateProvider ) {
  $stateProvider.state( 'login', {
    url: '/login',
    views: {
      "main": {
        controller: 'LoginCtrl',
        templateUrl: 'login/login.tpl.html'
      },
      "menu": {
        controller: 'MenuCtrl',
        templateUrl: 'menu/menu.tpl.html'
      }
    }
  });
})

.controller( 'LoginCtrl', function AboutCtrl( $scope, titleService, $http, $location, $timeout ) {
  
  titleService.setTitle( 'Login' );
  
  $scope.login = {email: "", password: ""};
    $scope.checkLogin = function(){
        $scope.alert = 'alert';
        $scope.reply = "Would you kindly please wait for the response.";
        $http({
            method: 'POST',
            url: '../api/login',
            data: $scope.login,
            headers: {'Content-Type': 'application/x-www-form-urlencoded'}
        }).
            success(function(response) {
        
                if (response.message === 'Login Successful.'){
                    $scope.alert = 'alert alert-success';
                    $scope.reply = 'Login in was successful. Please stand by for teleporter sequence.';
                    $timeout(function () {
                        $location.path('/admin');
                    },3000);
                }
                else {
                    $scope.alert = 'alert alert-error';
                    $scope.reply = 'Sorry, Login Failed! Please Try Again';
                }
            }).
            error(function(response) {
                $scope.reply = response || "Request failed";
                $scope.alert = 'alert alert-error';
            });
    };    
    
    
})

;
