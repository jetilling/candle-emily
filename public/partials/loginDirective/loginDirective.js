angular.module('candle').directive('loginDirective', function(){
  return {
    restrict: 'AE',
    templateUrl: './partials/loginDirective/loginDirective.html',
    controller: function($scope, mainService, $auth, $state){

      $scope.logIn = function(email, password) {
        console.log('hey from login ctrl');
        $auth.login({
          email: email,
          password: password,
        }).then(function (response) {
          console.log("loginCtrl:", response);
          if(response.status === 200){
            $auth.setToken(response);
            $scope.loginDirective = false;
            if ($auth.isAuthenticated()){
              mainService.userData()
              .then(function(response){
                console.log(response[0])
                $scope.name = response[0].first_name
              })
              $scope.accountName = true;
              $scope.logoutBtn = true;
              $scope.loginBtn = false;
              $scope.signUpBtn = false;

            }
          }
        }).catch(function (response) {
          console.log("loginCtrl Error:", response);
        });
      };

    }
  }
})
