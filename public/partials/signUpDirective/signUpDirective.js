angular.module('candle').directive('signUpDirective', function(){
  return {
    restrict: 'AE',
    templateUrl: './partials/signUpDirective/signUpDirective.html',
    controller: function($scope, mainService, $auth){

      $scope.mismatchedPasswords = false;
      $scope.existingEmail = false;

      $scope.closeModal = function(){
        $scope.signUpDirective = false;
      }

      $scope.switchToLogin = function(){
        $scope.signUpDirective = false;
        $scope.loginDirective = true;
      }

      $scope.create = function(firstName, lastName, email, password, confirmPassword){
        if (password === confirmPassword){
          $auth.signup({
            firstName: firstName,
            lastName: lastName,
            password: password,
            email: email
          }).then(function (response) {
            console.log("signUpCtrl:", response);
            $auth.setToken(response);
            $scope.signUpDirective = false;
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
          }).catch(function (response) {
            console.log("signUpCtrl Error:", response);
            $scope.existingEmail = true
          });
        }
        else $scope.mismatchedPasswords = true
      }

    }
  }
})
